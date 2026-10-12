/**
 * A tiny text-only PDF writer (A4, Helvetica, WinAnsi), enough for the month summary we email to
 * the accountant. Workers have no PDF library, and this keeps the bundle small.
 */

export type PdfText = { x: number; y: number; text: string; size?: number; bold?: boolean; align?: "left" | "right"; gray?: boolean };
export type PdfLine = { x1: number; y1: number; x2: number; y2: number };
export type PdfPage = { texts: PdfText[]; lines: PdfLine[] };

export const A4 = { width: 595, height: 842 };

// Helvetica advance widths (per 1000 em) for the characters our numbers use; others use 556.
const WIDTHS: Record<string, number> = { " ": 278, " ": 278, ",": 278, ".": 278, "-": 333, "%": 889, k: 500, r: 333, "–": 556 };
const BOLD_WIDTHS: Record<string, number> = { " ": 278, " ": 278, ",": 278, ".": 278, "-": 333, "%": 889, k: 556, r: 389, "–": 556 };

export function textWidth(text: string, size: number, bold = false): number {
  const table = bold ? BOLD_WIDTHS : WIDTHS;
  let w = 0;
  for (const ch of text) w += table[ch] ?? (/[A-ZÆØÅ]/.test(ch) ? 667 : /[il.,:;!|]/.test(ch) ? 278 : /[mwMW]/.test(ch) ? 833 : 556);
  return (w * size) / 1000;
}

/** Maps a string to WinAnsi bytes (as a latin1 string) and escapes PDF string syntax. */
function winAnsi(text: string): string {
  const special: Record<string, number> = { "–": 0x96, "—": 0x97, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95, "€": 0x80, "…": 0x85 };
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    const b = special[ch] ?? (code < 256 ? code : 0x3f);
    const c = String.fromCharCode(b);
    out += c === "(" || c === ")" || c === "\\" ? `\\${c}` : c;
  }
  return out;
}

export function renderPdf(pages: PdfPage[], title: string): Uint8Array {
  const objects: string[] = [];
  const add = (body: string) => {
    objects.push(body);
    return objects.length;
  };
  const catalog = add(""); // filled below
  const pagesObj = add("");
  const font = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  const fontBold = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
  const info = add(`<< /Title (${winAnsi(title)}) /Producer (Infinity Studio) >>`);
  const pageIds: number[] = [];

  for (const page of pages) {
    let stream = "";
    for (const l of page.lines) stream += `0.8 G 0.5 w ${l.x1} ${l.y1} m ${l.x2} ${l.y2} l S\n`;
    for (const t of page.texts) {
      const size = t.size ?? 9;
      const x = t.align === "right" ? t.x - textWidth(t.text, size, t.bold) : t.x;
      stream += `BT ${t.gray ? "0.4 g" : "0 g"} /${t.bold ? "F2" : "F1"} ${size} Tf ${x.toFixed(2)} ${t.y.toFixed(2)} Td (${winAnsi(t.text)}) Tj ET\n`;
    }
    const content = add(`<< /Length ${stream.length} >>\nstream\n${stream}endstream`);
    pageIds.push(
      add(
        `<< /Type /Page /Parent ${pagesObj} 0 R /MediaBox [0 0 ${A4.width} ${A4.height}] /Resources << /Font << /F1 ${font} 0 R /F2 ${fontBold} 0 R >> >> /Contents ${content} 0 R >>`,
      ),
    );
  }
  objects[catalog - 1] = `<< /Type /Catalog /Pages ${pagesObj} 0 R >>`;
  objects[pagesObj - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let out = "%PDF-1.4\n%\xe2\xe3\xcf\xd3\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}`;
  out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalog} 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

  const bytes = new Uint8Array(out.length);
  for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
  return bytes;
}

/** Lays out flowing rows top to bottom, starting a new page when one fills up. */
export class PdfDoc {
  pages: PdfPage[] = [];
  y = 0;
  constructor(
    private margin = 48,
    private footer?: (n: number) => string,
  ) {
    this.newPage();
  }
  get page() {
    return this.pages[this.pages.length - 1];
  }
  newPage() {
    this.pages.push({ texts: [], lines: [] });
    this.y = A4.height - this.margin;
  }
  ensure(height: number) {
    if (this.y - height < this.margin + 20) this.newPage();
  }
  text(t: Omit<PdfText, "y">, advance = 0) {
    this.page.texts.push({ ...t, y: this.y });
    this.y -= advance;
  }
  rule() {
    this.page.lines.push({ x1: this.margin, y1: this.y + 10, x2: A4.width - this.margin, y2: this.y + 10 });
  }
  gap(h: number) {
    this.y -= h;
  }
  finish(title: string) {
    if (this.footer) this.pages.forEach((p, i) => p.texts.push({ x: this.margin, y: 28, text: this.footer!(i + 1), size: 8, gray: true }));
    return renderPdf(this.pages, title);
  }
}
