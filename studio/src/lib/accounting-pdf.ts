import { PROGRAMS, sourceTotals, type MonthData } from "./accounting";
import { A4, PdfDoc } from "./pdf";
import { formatOre } from "./report";

const MONTHS = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];

export function monthName(month: string) {
  return `${MONTHS[Number(month.slice(5, 7)) - 1]} ${month.slice(0, 4)}`;
}

/** One- or two-page month summary for the accountant: totals per source and artist, gift card and deposit balances, days. */
export function summaryPdf(d: MonthData, org: { name: string; number?: string }): Uint8Array {
  const M = 48;
  const R = A4.width - M;
  const doc = new PdfDoc(M, (n) => `${org.name} · Månedsoppsummering ${monthName(d.month)} · side ${n}`);

  doc.text({ x: M, text: `Månedsoppsummering for regnskap`, size: 18, bold: true }, 22);
  doc.text({ x: M, text: `${org.name}${org.number ? ` · org.nr. ${org.number}` : ""} · ${monthName(d.month)} (${d.from} – ${d.to})`, size: 10, gray: true }, 14);
  doc.text(
    {
      x: M,
      text: `${d.settings.vatRegistered ? "Mva-registrert" : "Ikke mva-registrert"} · regnskapsprogram: ${PROGRAMS[d.settings.program]} · kontonumre etter NS 4102, sjekk med regnskapsfører`,
      size: 9,
      gray: true,
    },
    26,
  );

  const heading = (t: string) => {
    doc.ensure(60);
    doc.text({ x: M, text: t, size: 12, bold: true }, 16);
  };
  const row = (cols: { text: string; x: number; right?: boolean; bold?: boolean; gray?: boolean }[], advance = 14) => {
    doc.ensure(advance + 4);
    for (const c of cols) doc.text({ x: c.x, text: c.text, size: 9, align: c.right ? "right" : "left", bold: c.bold, gray: c.gray });
    doc.gap(advance);
  };

  heading("Per kilde");
  row([{ text: "Kilde", x: M, gray: true }, { text: "Brutto", x: 400, right: true, gray: true }, { text: "Herav mva", x: R, right: true, gray: true }]);
  doc.rule();
  const totals = sourceTotals(d);
  for (const t of totals) row([{ text: t.post ? t.source : `${t.source} (bokføres fra Zettle)`, x: M }, { text: formatOre(t.gross), x: 400, right: true }, { text: formatOre(t.vat), x: R, right: true }]);
  if (!totals.length) row([{ text: "Ingen betalinger denne måneden.", x: M, gray: true }]);
  doc.gap(12);

  heading("Saldoer ved månedsslutt");
  row([{ text: "Gavekort som ikke er brukt (gjeld til kunder)", x: M }, { text: formatOre(d.giftCardLiability), x: R, right: true, bold: true }]);
  row([{ text: "Depositum betalt for timer som ikke har vært ennå", x: M }, { text: formatOre(d.depositsHeld), x: R, right: true, bold: true }]);
  doc.gap(12);

  heading("Per artist");
  const cols = [M, 250, 330, 410, R];
  row([
    { text: "Artist", x: cols[0], gray: true },
    { text: "Omsetning", x: cols[1], right: true, gray: true },
    { text: "Studioandel", x: cols[2], right: true, gray: true },
    { text: "Stolleie", x: cols[3], right: true, gray: true },
    { text: "Artistens andel", x: cols[4], right: true, gray: true },
  ]);
  doc.rule();
  for (const a of d.artists)
    row([
      { text: `${a.name} (${a.sharePct} %)`, x: cols[0] },
      { text: formatOre(a.gross), x: cols[1], right: true },
      { text: formatOre(a.studio), x: cols[2], right: true },
      { text: formatOre(a.rent), x: cols[3], right: true },
      { text: formatOre(a.artist), x: cols[4], right: true, bold: true },
    ]);
  if (!d.artists.length) row([{ text: "Ingen omsetning registrert på artister.", x: M, gray: true }]);
  row([{ text: "Negativ artistandel betyr at artisten skylder studioet.", x: M, gray: true }]);
  doc.gap(12);

  heading("Dag for dag");
  row([
    { text: "Dato", x: M, gray: true },
    { text: "Zettle (kassen)", x: 300, right: true, gray: true },
    { text: "Annet (nett, gavekort, for hånd)", x: 450, right: true, gray: true },
    { text: "Dagsoppgjør", x: R, right: true, gray: true },
  ]);
  doc.rule();
  for (const day of d.days)
    row([
      { text: day.date, x: M },
      { text: formatOre(day.zettle), x: 300, right: true },
      { text: formatOre(day.other), x: 450, right: true },
      { text: day.reportSeq ? `nr. ${day.reportSeq}` : "ikke avsluttet", x: R, right: true, gray: !day.reportSeq },
    ]);
  if (!d.days.length) row([{ text: "Ingen dager med betalinger.", x: M, gray: true }]);
  row([{ text: "Z-rapporten for hver dag tas ut i Zettle. Dagsoppgjøret her er studioets interne avstemming.", x: M, gray: true }]);

  return doc.finish(`Månedsoppsummering ${d.month}`);
}
