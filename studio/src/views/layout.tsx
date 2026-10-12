import { raw } from "hono/html";
import type { Child } from "hono/jsx";

import type { StaffUser } from "../lib/auth";
import type { FeatureKey } from "../lib/features";

export const css = `
:root{--bg:#0b0b0c;--panel:#141416;--line:#26262a;--text:#f4f4f5;--muted:#a1a1aa;--accent:#dc2626;--ok:#22c55e;--warn:#f59e0b;--panel2:#111113}
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
body.app{height:100vh;height:100dvh;display:flex;flex-direction:column;overflow:hidden}
.icon{flex:0 0 auto}
.topbar{display:flex;align-items:center;gap:.5rem;padding:.6rem 1.25rem;padding-top:max(.6rem,env(safe-area-inset-top));min-height:3.6rem}
.logo{font-weight:800;letter-spacing:.12em;font-size:1.15rem;text-decoration:none;width:calc(14.5rem - 1.25rem)}
.top-link{display:inline-flex;align-items:center;gap:.5rem;padding:.45rem .75rem;border-radius:10px;text-decoration:none;color:var(--text)}
.top-link:hover,.top-link.active{background:var(--panel)}.spacer{flex:1}
.top-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem .9rem;border-radius:10px;border:1px solid var(--line);background:var(--panel);text-decoration:none}
.badge{background:var(--accent);color:#fff;border-radius:999px;font-size:.72rem;font-weight:700;padding:0 .45rem;line-height:1.4rem;min-width:1.4rem;text-align:center}
.iconbtn{background:none;border:0;color:var(--text);padding:.4rem;border-radius:10px;display:none}
.shell{flex:1;display:flex;min-height:0}
.side{width:14.5rem;flex:0 0 14.5rem;display:flex;flex-direction:column;padding:.25rem .75rem 1rem;overflow-y:auto}
.studio{display:flex;align-items:center;gap:.7rem;padding:.6rem .5rem 1rem}.studio strong{display:block;font-size:.92rem;font-weight:500}.studio .muted{display:block;font-size:.8rem}
.studio-avatar{width:2.4rem;height:2.4rem;border-radius:8px;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:.85rem;font-weight:600}
.sidenav{display:block}.navgroup{margin-bottom:1.1rem}.navhead{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);padding:.2rem .75rem .45rem}
.sidenav a{display:flex;align-items:center;gap:.8rem;padding:.55rem .75rem;border-radius:10px;text-decoration:none;color:var(--text);font-size:.95rem}
.sidenav a:hover{background:#18181b}.sidenav a[aria-current]{background:var(--panel)}
.side-user{margin-top:auto;padding:.5rem .75rem;font-size:.8rem}
.content{max-width:none;margin:0;flex:1;min-width:0;overflow-y:auto;background:var(--panel2);border:1px solid var(--line);border-radius:16px 0 0 0;padding:1.25rem 1.5rem}
.content>*{max-width:1100px}.content.wide>*{max-width:none}
.content .card{background:var(--panel)}
.scrim{display:none}
@media (max-width:860px){.iconbtn{display:inline-flex}.logo{width:auto;margin-right:.25rem}.top-link span,.top-btn span{display:none}.top-link .badge{display:inline-block}
.side{position:fixed;top:0;bottom:0;left:0;z-index:20;background:var(--bg);transform:translateX(-100%);transition:transform .2s ease-out;padding-top:max(1rem,env(safe-area-inset-top));border-right:1px solid var(--line)}
body.nav-open .side{transform:none}body.nav-open .scrim{display:block;position:fixed;inset:0;background:#0008;z-index:10}
.content{border-radius:0;border-left:0;border-right:0;padding:.9rem .75rem calc(1rem + env(safe-area-inset-bottom))}.topbar{padding-left:.5rem;padding-right:.75rem}}
.iconbtn.show{display:inline-flex;align-items:center;justify-content:center;text-decoration:none}.iconbtn.show:hover{background:var(--panel)}
.button.small{padding:.4rem .85rem;font-size:.9rem}
.seg{display:inline-flex;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:2px}.seg a{padding:.3rem .8rem;border-radius:8px;text-decoration:none;color:var(--muted);font-size:.9rem}.seg a[aria-current]{background:var(--panel);color:var(--text)}
.content.wide:has(.cal){padding:0;overflow:hidden;display:flex}
.cal{display:flex;flex:1;min-height:0;min-width:0}
.cal-side{width:15.5rem;flex:0 0 15.5rem;padding:1rem;border-right:1px solid var(--line);overflow-y:auto}.cal.no-side .cal-side{display:none}
.mini-head{display:flex;align-items:center;gap:.25rem;margin-bottom:.4rem}.mini-head strong{flex:1;font-weight:500;font-size:.92rem}
.mini table{font-size:.8rem;text-align:center}.mini th,.mini td{border:0;padding:.15rem 0;text-align:center;color:var(--muted)}.mini td a{display:block;width:1.75rem;height:1.75rem;line-height:1.75rem;margin:auto;border-radius:50%;text-decoration:none;color:var(--text)}
.mini td.wk{color:#52525b;font-size:.7rem}.mini td.out a{color:#52525b}.mini td.today a{color:var(--accent);font-weight:700}.mini td.on a,.mini tr.sel td:not(.wk) a{background:#27272a}.mini td a:hover{background:#3f3f46}
.cal-legend{margin-top:1.25rem;display:grid;gap:.15rem}.cal-legend a{padding:.4rem .5rem;border-radius:8px;text-decoration:none;font-size:.9rem;color:var(--muted)}.cal-legend a[aria-current]{background:var(--panel);color:var(--text)}
.cal-main{flex:1;display:flex;flex-direction:column;min-width:0;min-height:0}
.cal-toolbar{display:flex;align-items:center;gap:.4rem;padding:.7rem 1rem;border-bottom:1px solid var(--line);flex-wrap:wrap}.cal-toolbar h1{font-size:1.15rem;margin:0 .25rem 0 .5rem;font-weight:600}.cal-week{font-size:.85rem}
.cal-grid{flex:1;overflow:auto;position:relative}
.cal-head{display:grid;grid-template-columns:3.5rem repeat(var(--cols),minmax(7.5rem,1fr));position:sticky;top:0;z-index:3;background:var(--panel2);border-bottom:1px solid var(--line)}
.cal-colhead{padding:.55rem .6rem;text-decoration:none;border-left:1px solid var(--line);display:flex;flex-direction:column;font-size:.85rem;border-top:3px solid transparent}.cal-colhead strong{font-weight:600}.cal-colhead span{color:var(--muted)}.cal-colhead .dot{margin-bottom:.2rem}
.cal-colhead.today{border-top-color:var(--accent)}.cal-colhead.today strong{color:var(--accent)}
.cal-body{display:grid;grid-template-columns:3.5rem repeat(var(--cols),minmax(6.5rem,1fr))}
.cal-gutter{position:relative}.cal-gutter span{position:absolute;right:.45rem;transform:translateY(-.55em);font-size:.72rem;color:var(--muted)}.cal-gutter span:first-child{transform:none}
.cal-col{position:relative;border-left:1px solid var(--line);background-image:repeating-linear-gradient(to bottom,var(--line) 0 1px,transparent 1px 64px)}
.cal-slot{position:absolute;left:0;right:0;height:64px;z-index:0}.cal-slot:hover{background:#ffffff08}
.cal-closed{position:absolute;left:0;right:0;z-index:1;pointer-events:none;background:repeating-linear-gradient(135deg,#ffffff05 0 6px,#ffffff0d 6px 12px)}.cal-closed span{position:absolute;top:.3rem;left:.4rem;font-size:.72rem;color:var(--muted)}
.cal-now{position:absolute;left:0;right:0;height:2px;background:var(--accent);z-index:4}.cal-now::before{content:"";position:absolute;left:-4px;top:-3px;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.cal-event{position:absolute;left:3px;width:calc(100% - 6px);z-index:2;overflow:hidden;border-radius:8px;padding:.25rem .45rem;font-size:.78rem;line-height:1.3;text-decoration:none;display:flex;flex-direction:column;background:color-mix(in srgb,var(--c) 22%,#141416);border-left:3px solid var(--c)}
.cal-event:hover{background:color-mix(in srgb,var(--c) 34%,#141416)}.cal-event .t{color:var(--muted);font-size:.72rem}.cal-event strong{font-weight:600}.cal-event .pill{align-self:flex-start;margin-top:.15rem;font-size:.66rem}
.cal-event.requested{border-left-style:dashed;background:#1c1c1f}.cal-event.completed{opacity:.75}.cal-event.no_show{opacity:.5;text-decoration:line-through}
.setup{width:21rem;flex:0 0 21rem;border-left:1px solid var(--line);padding:1rem;overflow-y:auto}.setup-head{display:flex;align-items:center}.setup-head h2{flex:1;margin:0;color:var(--text);font-size:1.25rem;font-weight:500}.setup-count{margin:.2rem 0 1rem;font-size:.85rem}
.setup .navhead{padding-left:0}.setup-item{display:flex;align-items:center;gap:.75rem;padding:.6rem .5rem;border-radius:10px;text-decoration:none}.setup-item:hover{background:var(--panel)}.setup-item>span:nth-child(2){flex:1}.setup-item strong{display:block;font-weight:500;font-size:.92rem}.setup-item .muted{display:block;font-size:.78rem;line-height:1.35}
.setup-check{width:2.1rem;height:2.1rem;flex:0 0 2.1rem;border-radius:8px;border:1px dashed #52525b;display:grid;place-items:center}.setup-item.done .setup-check{background:var(--ok);border:0;color:#052e16}.setup-item.done strong{color:var(--muted);text-decoration:line-through}
@media (max-width:1560px){.cal:has(.setup) .cal-side{display:none}}@media (max-width:1200px){.setup{display:none}}
@media (max-width:860px){.cal-side{display:none}.cal-toolbar{padding:.5rem .6rem}.cal-toolbar h1{font-size:1rem;margin-left:.2rem}.cal-week{display:none}.cal-toolbar>.iconbtn:first-child{display:none}.cal-head,.cal-body{grid-template-columns:2.75rem repeat(var(--cols),minmax(6.5rem,1fr))}}
@media print{body.app{display:block;height:auto;overflow:visible}.topbar,.side{display:none!important}.content{overflow:visible;border:0;padding:0}}
@media print{header,form,.noprint{display:none!important}body{background:#fff;color:#000}.card{border-color:#ccc;background:#fff}th{color:#333}}
`;

const ICONS: Record<string, string> = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clients: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  sales: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  gift: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m9 15 6-6"/>',
  settle: '<path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M12 11v6M10 13.5c0-.8.9-1.5 2-1.5s2 .7 2 1.5-.9 1.5-2 1.5-2 .7-2 1.5.9 1.5 2 1.5 2-.7 2-1.5"/>',
  reports: '<path d="M3 3v18h18"/><path d="M8 17v-4M13 17V9M18 17V5"/>',
  artists: '<circle cx="7" cy="6" r="3"/><path d="M2 20c0-3 2.2-5 5-5s5 2 5 5M14 14l7-7M17 17l4-4"/>',
  managers: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a6 6 0 0 1 9-5.2M16 19l2 2 4-4"/>',
  shifts: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  products: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  deposit: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  basket: '<path d="m5 11 4-7M19 11l-4-7M2 11h20l-2 9H4z"/><path d="M9 15v2M15 15v2"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  sidebar: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg class="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      {raw(ICONS[name] ?? "")}
    </svg>
  );
}

type NavItem = { href: string; label: string; icon: string; feature?: FeatureKey; owner?: boolean };

/** Menu in the same order and grouping as Linework's studio dashboard, so the switch feels familiar. */
const NAV: { heading?: string; items: NavItem[] }[] = [
  {
    items: [
      { href: "/admin/calendar", label: "Kalender", icon: "calendar" },
      { href: "/admin/clients", label: "Kunder", icon: "clients" },
    ],
  },
  {
    heading: "Økonomi",
    items: [
      { href: "/admin/payments", label: "Salg", icon: "sales" },
      { href: "/admin/gift-cards", label: "Gavekort", icon: "gift", feature: "gift_cards" },
      { href: "/admin/settlements", label: "Oppgjør", icon: "settle", feature: "settlements" },
      { href: "/admin/report", label: "Rapporter", icon: "reports" },
    ],
  },
  {
    items: [
      { href: "/admin/artists", label: "Artister", icon: "artists" },
      { href: "/admin/managers", label: "Ledere", icon: "managers" },
      { href: "/admin/shifts", label: "Personalliste", icon: "shifts" },
      { href: "/admin/inks", label: "Produkter", icon: "products", feature: "inks" },
      { href: "/admin/settings", label: "Innstillinger", icon: "settings" },
    ],
  },
];

export const STUDIO_NAME = "Infinity Tattoo";
export const STUDIO_ADDRESS = "Skårersletta 48c";

export function Layout(props: { title: string; path: string; user: StaffUser; flash?: string; error?: string; wide?: boolean; children: Child }) {
  const on = (item: NavItem) => !item.feature || props.user.features?.[item.feature] !== false;
  const current = (href: string) => props.path === href || props.path.startsWith(`${href}/`);
  const requests = props.user.openRequests ?? 0;
  return (
    <html lang="no">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
      <body class="app">
        <div class="topbar">
          <button type="button" class="iconbtn menu-toggle" aria-label="Meny" onclick="document.body.classList.toggle('nav-open')">
            <Icon name="menu" />
          </button>
          <a class="logo" href="/admin/calendar">
            INFINITY
          </a>
          <a class={`top-link${current("/admin/requests") ? " active" : ""}`} href="/admin/requests">
            <Icon name="inbox" size={18} />
            <span>Tattoo-forespørsler</span>
            {requests > 0 && <span class="badge">{requests}</span>}
          </a>
          <span class="spacer" />
          <a class="top-link" href="/admin/deposits/new">
            <Icon name="deposit" size={18} />
            <span>Nytt depositum</span>
          </a>
          <a class="top-btn" href="/admin/payments/new">
            <Icon name="basket" size={18} />
            <span>Nytt salg</span>
          </a>
        </div>
        <div class="shell">
          <aside class="side">
            <div class="studio">
              <span class="studio-avatar">IT</span>
              <span>
                <strong>{STUDIO_NAME}</strong>
                <span class="muted">{STUDIO_ADDRESS}</span>
              </span>
            </div>
            <nav class="sidenav">
              {NAV.map((group) => {
                const items = group.items.filter(on);
                if (!items.length) return null;
                return (
                  <div class="navgroup">
                    {group.heading && <div class="navhead">{group.heading}</div>}
                    {items.map((item) => (
                      <a href={item.href} aria-current={current(item.href) ? "page" : undefined}>
                        <Icon name={item.icon} />
                        {item.label}
                      </a>
                    ))}
                  </div>
                );
              })}
            </nav>
            <div class="side-user muted">{props.user.name}</div>
          </aside>
          <div class="scrim" onclick="document.body.classList.remove('nav-open')" />
          <main class={props.wide ? "content wide" : "content"}>
            {props.flash && <div class="flash">{props.flash}</div>}
            {props.error && <div class="flash error">{props.error}</div>}
            {props.children}
          </main>
        </div>
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
