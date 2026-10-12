import type { Child } from "hono/jsx";

import type { StaffUser } from "../lib/auth";

export const css = `
:root{--bg:#0b0b0c;--panel:#141416;--line:#26262a;--text:#f4f4f5;--muted:#a1a1aa;--accent:#dc2626;--ok:#22c55e;--warn:#f59e0b}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:inherit}header{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;padding:.75rem 1rem;border-bottom:1px solid var(--line);position:sticky;top:0;background:var(--bg);z-index:1}
header strong{margin-right:auto}nav{display:flex;gap:.25rem;flex-wrap:wrap}nav a{padding:.35rem .7rem;border-radius:999px;text-decoration:none;color:var(--muted)}nav a[aria-current]{background:var(--panel);color:var(--text)}
main{max-width:1100px;margin:0 auto;padding:1rem}h1{font-size:1.4rem;margin:.5rem 0 1rem}h2{font-size:1.05rem;margin:1.5rem 0 .5rem;color:var(--muted)}
.card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:1rem;margin-bottom:1rem}
.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:.45rem .5rem;border-bottom:1px solid var(--line);vertical-align:top}th{color:var(--muted);font-weight:500;font-size:.85rem}td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
label{display:block;font-size:.85rem;color:var(--muted);margin-bottom:.6rem}input,select,textarea{display:block;width:100%;margin-top:.2rem;padding:.5rem .6rem;border-radius:10px;border:1px solid var(--line);background:#0e0e10;color:var(--text);font:inherit}
button,.button{display:inline-block;padding:.55rem 1rem;border-radius:999px;border:0;background:var(--accent);color:#fff;font:inherit;font-weight:600;cursor:pointer;text-decoration:none}
button.secondary,.button.secondary{background:var(--panel);border:1px solid var(--line)}
.pill{display:inline-block;padding:.1rem .55rem;border-radius:999px;font-size:.78rem;border:1px solid var(--line)}
.pill.requested{color:var(--warn);border-color:var(--warn)}.pill.confirmed{color:var(--ok);border-color:var(--ok)}.pill.cancelled,.pill.no_show{color:var(--muted)}
.muted{color:var(--muted)}.big{font-size:1.6rem;font-weight:700}.row{display:flex;gap:.5rem;flex-wrap:wrap;align-items:end}.row>*{flex:1 1 160px}
.dot{display:inline-block;width:.6rem;height:.6rem;border-radius:50%;margin-right:.4rem}.flash{padding:.6rem 1rem;border-radius:10px;background:#14532d;margin-bottom:1rem}.flash.error{background:#7f1d1d}
input[type=checkbox],input[type=radio]{display:inline-block;width:auto;margin:0 .4rem 0 0;vertical-align:middle}.check{display:flex;gap:.4rem;align-items:flex-start;color:var(--text);font-size:.95rem}.check input{margin-top:.3rem}
fieldset{border:1px solid var(--line);border-radius:12px;padding:.75rem 1rem;margin:0 0 1rem}legend{color:var(--muted);font-size:.85rem;padding:0 .3rem}
.scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
@media (max-width:700px){header{padding:.5rem .75rem calc(.5rem) .75rem;padding-top:max(.5rem,env(safe-area-inset-top));gap:.5rem}nav{flex-wrap:nowrap;overflow-x:auto;width:100%;order:3;scrollbar-width:none;-webkit-overflow-scrolling:touch}nav::-webkit-scrollbar{display:none}nav a{white-space:nowrap}main{padding:.75rem}table{display:block;overflow-x:auto;white-space:nowrap}input,select,textarea{font-size:16px}button,.button{padding:.7rem 1.1rem}}
@media print{header,form,.noprint{display:none!important}body{background:#fff;color:#000}.card{border-color:#ccc;background:#fff}th{color:#333}}
`;

const links = [
  ["/admin", "I dag"],
  ["/admin/requests", "Forespørsler"],
  ["/admin/calendar", "Kalender"],
  ["/admin/clients", "Kunder"],
  ["/admin/payments", "Betalinger"],
  ["/admin/report", "Dagsoppgjør"],
  ["/admin/settlements", "Artistoppgjør"],
  ["/admin/gift-cards", "Gavekort"],
  ["/admin/shifts", "Personalliste"],
  ["/admin/settings", "Innstillinger"],
] as const;

export function Layout(props: { title: string; path: string; user: StaffUser; flash?: string; error?: string; children: Child }) {
  return (
    <html lang="no">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#0b0b0c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Infinity" />
        <link rel="manifest" href="/admin/manifest.webmanifest" crossorigin="use-credentials" />
        <link rel="apple-touch-icon" href="/admin/icon-180.png" />
        <title>{`${props.title} · Infinity Studio`}</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <header>
          <strong>Infinity Studio</strong>
          <nav>
            {links.map(([href, label]) => (
              <a href={href} aria-current={(href === "/admin" ? props.path === href : props.path.startsWith(href)) ? "page" : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <span class="muted">{props.user.name}</span>
        </header>
        <main>
          {props.flash && <div class="flash">{props.flash}</div>}
          {props.error && <div class="flash error">{props.error}</div>}
          {props.children}
        </main>
      </body>
    </html>
  );
}

export function StatusPill({ status }: { status: string }) {
  const labels: Record<string, string> = {
    requested: "Forespørsel",
    confirmed: "Bekreftet",
    completed: "Fullført",
    cancelled: "Avlyst",
    no_show: "Møtte ikke",
  };
  return <span class={`pill ${status}`}>{labels[status] ?? status}</span>;
}

export function PublicLayout(props: { title: string; lang?: "no" | "en"; children: Child }) {
  return (
    <html lang={props.lang ?? "no"}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title>{`${props.title} · Infinity Tattoo`}</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <header>
          <strong>Infinity Tattoo</strong>
        </header>
        <main style="max-width:720px">{props.children}</main>
      </body>
    </html>
  );
}
