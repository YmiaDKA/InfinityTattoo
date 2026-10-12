import { raw } from "hono/html";
import type { Child } from "hono/jsx";

import type { StaffUser } from "../lib/auth";
import type { FeatureKey } from "../lib/features";

export const css = `
:root{--bg:#0b0b0c;--panel:#141416;--line:#26262a;--text:#f4f4f5;--muted:#a1a1aa;--accent:#dc2626;--ok:#22c55e;--warn:#f59e0b;--panel2:#111113;--field:#0e0e10;--hover:#ffffff0a;--sel:#27272a;--faint:#52525b;--btn:var(--accent);--soft:var(--panel);--okbg:#14532d;--errbg:#7f1d1d}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:inherit}header{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;padding:.75rem 1rem;border-bottom:1px solid var(--line);position:sticky;top:0;background:var(--bg);z-index:1}
header strong{margin-right:auto}nav{display:flex;gap:.25rem;flex-wrap:wrap}nav a{padding:.35rem .7rem;border-radius:999px;text-decoration:none;color:var(--muted)}nav a[aria-current]{background:var(--panel);color:var(--text)}
main{max-width:1100px;margin:0 auto;padding:1rem}h1{font-size:1.4rem;margin:.5rem 0 1rem}h2{font-size:1.05rem;margin:1.5rem 0 .5rem;color:var(--muted)}
.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:1rem;margin-bottom:1rem}
.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:.55rem .5rem;border-bottom:1px solid var(--line);vertical-align:top}th{color:var(--muted);font-weight:500;font-size:.82rem}td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
label{display:block;font-size:.85rem;color:var(--muted);margin-bottom:.6rem}input,select,textarea{display:block;width:100%;margin-top:.2rem;padding:.55rem .7rem;border-radius:8px;border:1px solid var(--line);background:var(--field);color:var(--text);font:inherit}
button,.button{display:inline-flex;align-items:center;gap:.4rem;padding:.55rem 1rem;border-radius:8px;border:0;background:var(--btn);color:#fff;font:inherit;font-weight:600;cursor:pointer;text-decoration:none;font-size:.92rem}
button:disabled{opacity:.4;cursor:not-allowed}button.secondary,.button.secondary{background:var(--soft);border:1px solid var(--line);color:var(--text)}
.pill{white-space:nowrap;display:inline-block;padding:.1rem .55rem;border-radius:999px;font-size:.78rem;border:1px solid var(--line)}
.pill.requested{color:var(--warn);border-color:var(--warn)}.pill.confirmed{color:var(--ok);border-color:var(--ok)}.pill.cancelled,.pill.no_show{color:var(--muted)}
.muted{color:var(--muted)}.big{font-size:1.6rem;font-weight:700}.row{display:flex;gap:.5rem;flex-wrap:wrap;align-items:end}.row>*{flex:1 1 160px}
.dot{display:inline-block;width:.6rem;height:.6rem;border-radius:50%;margin-right:.4rem}.flash{padding:.6rem 1rem;border-radius:10px;background:var(--okbg);margin-bottom:1rem}.flash.error{background:var(--errbg)}
input[type=checkbox],input[type=radio]{display:inline-block;width:auto;margin:0 .4rem 0 0;vertical-align:middle;accent-color:var(--text)}.check{display:flex;gap:.4rem;align-items:flex-start;color:var(--text);font-size:.95rem}.check input{margin-top:.3rem}
fieldset{border:1px solid var(--line);border-radius:12px;padding:.75rem 1rem;margin:0 0 1rem}legend{color:var(--muted);font-size:.85rem;padding:0 .3rem}
.scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
@media (max-width:700px){header{padding:.5rem .75rem calc(.5rem) .75rem;padding-top:max(.5rem,env(safe-area-inset-top));gap:.5rem}nav{flex-wrap:nowrap;overflow-x:auto;width:100%;order:3;scrollbar-width:none;-webkit-overflow-scrolling:touch}nav::-webkit-scrollbar{display:none}nav a{white-space:nowrap}main{padding:.75rem}table{display:block;overflow-x:auto;white-space:nowrap}input,select,textarea{font-size:16px}button,.button{padding:.7rem 1.1rem}}
body.app{height:100vh;height:100dvh;display:flex;flex-direction:column;overflow:hidden}
.icon{flex:0 0 auto}
.topbar{display:flex;align-items:center;gap:.6rem;padding:0 .6rem 0 1.25rem;padding-top:env(safe-area-inset-top);height:4rem;flex:0 0 auto}
.logo{font-weight:800;letter-spacing:.12em;font-size:1.15rem;text-decoration:none;width:calc(11.25rem - 1.25rem)}
.top-link{display:inline-flex;align-items:center;gap:.5rem;padding:.45rem .75rem;border-radius:8px;text-decoration:none;color:var(--text);font-size:.92rem}
.top-link:hover,.top-link.active{background:var(--panel)}.spacer{flex:1}
.top-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem .8rem;border-radius:8px;border:1px solid var(--line);background:var(--panel);text-decoration:none;font-size:.92rem}
.top-cta{display:inline-flex;align-items:center;padding:.55rem .9rem;border-radius:8px;background:var(--accent);color:#fff;text-decoration:none;font-weight:600;font-size:.92rem}
.badge{background:var(--accent);color:#fff;border-radius:999px;font-size:.72rem;font-weight:700;padding:0 .45rem;line-height:1.4rem;min-width:1.4rem;text-align:center}
.iconbtn{background:none;border:0;color:var(--text);padding:.4rem;border-radius:8px;display:none}
.shell{flex:1;display:flex;min-height:0}
.side{width:11.25rem;flex:0 0 11.25rem;display:flex;flex-direction:column;padding:.25rem 1rem 1rem 0;overflow-y:auto}
.studio{display:flex;align-items:center;gap:.6rem;padding:.4rem 0 1.2rem .9rem}.studio strong{display:block;font-size:.85rem;font-weight:500}.studio .muted{display:block;font-size:.75rem}
.studio-avatar{width:2.2rem;height:2.2rem;flex:0 0 2.2rem;border-radius:8px;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:.85rem;font-weight:600}
.sidenav{display:flex;flex-direction:column;flex:1}.navgroup{margin-bottom:1.4rem}.navgroup.bottom{margin-top:auto;margin-bottom:.5rem}.navhead{font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);padding:.2rem 1.4rem .5rem}
.sidenav a{display:flex;align-items:center;gap:.9rem;padding:.55rem 1.4rem;border-radius:0 10px 10px 0;text-decoration:none;color:#d4d4d8;font-size:.9rem}
.sidenav a:hover{background:#18181b}.sidenav a[aria-current]{background:#2a2a2d;color:#fff}
.side-user{padding:.25rem 1.4rem;font-size:.78rem}
.content{--bg:#f5f7f7;--panel:#fff;--panel2:#f5f7f7;--line:#e3e6e8;--text:#1b1b1f;--muted:#6b7280;--field:#eceff1;--hover:#eef1f3;--sel:#e1e5e8;--faint:#a1a7ae;--btn:#27272a;--soft:#e9ecee;--okbg:#dcfce7;--errbg:#fee2e2;color-scheme:light}
.content,.drawer{color:var(--text)}
.content{max-width:none;flex:1;min-width:0;overflow-y:auto;background:var(--bg);border-radius:10px;margin:0 10px 10px 0;padding:2rem 2rem 2.5rem}
.content>*{max-width:none}.content>form:not(.toolbar):not(.filters),.content>.card{max-width:70rem}
.content h1{font-size:1.75rem;font-weight:600;margin:0 0 .35rem;letter-spacing:-.01em}.content h2{color:var(--text);font-weight:600}
.scrim{display:none}
@media (max-width:860px){.iconbtn{display:inline-flex}.logo{width:auto;margin-right:.25rem}.top-link span,.top-btn span{display:none}.top-link .badge{display:inline-block}.top-cta{display:none}.topbar{padding:0 .5rem;padding-top:env(safe-area-inset-top)}
.side{position:fixed;top:0;bottom:0;left:0;z-index:20;background:var(--bg);transform:translateX(-100%);transition:transform .2s ease-out;padding-top:max(1rem,env(safe-area-inset-top));border-right:1px solid var(--line);width:15rem}
body.nav-open .side{transform:none}body.nav-open .scrim{display:block;position:fixed;inset:0;background:#0008;z-index:10}
.content{border-radius:10px 10px 0 0;margin:0;padding:1.1rem .9rem calc(1rem + env(safe-area-inset-bottom))}.content h1{font-size:1.4rem}}
.iconbtn.show{display:inline-flex;align-items:center;justify-content:center;text-decoration:none}.iconbtn.show:hover{background:var(--hover)}
.button.small,button.small{padding:.4rem .8rem;font-size:.85rem}
.seg{display:inline-flex;background:var(--soft);border-radius:10px;padding:3px;gap:2px}.seg a{display:inline-flex;align-items:center;gap:.4rem;padding:.3rem .8rem;border-radius:8px;text-decoration:none;color:var(--muted);font-size:.88rem;font-weight:500}.seg a[aria-current]{background:var(--panel);color:var(--text);box-shadow:0 1px 2px #0000001a}
.seg .count{font-size:.72rem;background:var(--panel);border:1px solid var(--line);border-radius:999px;padding:0 .4rem;color:var(--muted)}
/* Page header, tabs, empty states and toolbars shared by every page (Linework's page pattern). */
.page-head{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1.5rem}.page-head>div:first-child{flex:1;min-width:0}.page-head p{margin:0;color:var(--muted)}.page-actions{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:flex-end}
.tabs{flex-wrap:nowrap;overflow-x:auto;display:flex;gap:1.5rem;border-bottom:1px solid var(--line);margin-bottom:1.5rem;align-items:flex-end}.tabs a{border-radius:0;white-space:nowrap;padding:.4rem 0 .65rem;text-decoration:none;color:var(--muted);font-weight:500;border-bottom:2px solid transparent;margin-bottom:-1px}.tabs a[aria-current]{color:var(--text);border-color:var(--text)}.tabs .page-actions{margin-left:auto;padding-bottom:.5rem}
.empty{display:flex;flex-direction:column;align-items:center;gap:.75rem;padding:5rem 1rem;color:var(--muted);text-align:center}.empty .icon{color:var(--faint)}.empty strong{font-size:1.3rem;font-weight:500;color:#4b5563}
.toolbar{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;margin-bottom:1rem}
.period{display:inline-flex;align-items:stretch;border:1px solid var(--line);border-radius:8px;background:var(--soft);overflow:hidden}.period>a,.period>label{display:inline-flex;align-items:center;gap:.45rem;padding:.45rem .7rem;text-decoration:none;color:var(--text);font-size:.88rem;font-weight:500;margin:0;cursor:pointer;position:relative}.period>a+label,.period>label+a{border-left:1px solid var(--line)}.period>a:hover,.period>label:hover{background:var(--hover)}
.period input{position:absolute;inset:0;opacity:0;margin:0;padding:0;border:0;cursor:pointer}
.unit{field-sizing:content;width:auto;display:inline-block;margin:0;padding:.45rem 1.8rem .45rem .7rem;background:var(--soft);font-size:.88rem;font-weight:500;border-radius:8px}
.filters{display:flex;gap:.25rem;flex-wrap:wrap;margin-bottom:.5rem}.filters select{field-sizing:content;width:auto;display:inline-block;margin:0;background:transparent;border:0;font-weight:500;font-size:.9rem;padding:.35rem 1.6rem .35rem .6rem;border-radius:8px}.filters select:hover{background:var(--hover)}
.search{position:relative;display:inline-block;margin:0}.search input{width:14rem;margin:0;padding-left:2rem;border:0;background:var(--field)}.search .icon{position:absolute;left:.6rem;top:50%;transform:translateY(-50%);color:var(--muted)}
.list{margin:0 -2rem}.list table th:first-child,.list table td:first-child{padding-left:2rem}.list table th:last-child,.list table td:last-child{padding-right:2rem}.list tbody tr:hover{background:var(--hover)}.list td a{text-decoration:none}.list td a:hover{text-decoration:underline}
@media (max-width:860px){.list{margin:0 -.9rem}.list table th:first-child,.list table td:first-child{padding-left:.9rem}.list table th:last-child,.list table td:last-child{padding-right:.9rem}.search input{width:100%}}
.stat{display:flex;align-items:center;gap:.75rem;background:var(--soft);border-radius:10px;padding:.8rem 1rem}.stat strong{display:block;font-size:1.15rem;font-weight:600}.stat span{color:var(--muted);font-size:.85rem}
.lines{width:100%}.lines td{border-bottom:1px dashed var(--line);padding:.85rem 0}.lines tr.total td{font-weight:600;border-bottom-style:solid}.lines td.num{text-align:right}
.sumbar{position:sticky;bottom:0;margin:2rem auto 0;width:max-content;max-width:100%;display:flex;align-items:center;gap:1.25rem;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:.7rem 1rem;box-shadow:0 4px 18px #0000000f;flex-wrap:wrap}.sumbar>span+span{border-left:1px solid var(--line);padding-left:1.25rem}
/* Settings: sub-menu on the left like Linework's settings tree. */
.content:has(.settings){padding:0;display:flex}.settings{display:flex;flex:1;min-height:100%;max-width:none!important}
.settings-nav{display:block;width:15.5rem;flex:0 0 15.5rem;background:#edf0f1;padding:2rem 1.25rem 2rem 2rem;border-radius:10px 0 0 10px}.settings-nav h1{margin-bottom:1.25rem}.settings-nav a{display:flex;align-items:center;gap:.65rem;padding:.42rem .65rem;border-radius:8px;text-decoration:none;font-size:.9rem;color:#3f3f46}.settings-nav a:hover{background:#e3e7e9}.settings-nav a[aria-current]{background:#e1e5e8;color:var(--text);font-weight:500}
.settings-body{flex:1;min-width:0;padding:2rem 2rem 3rem;overflow-y:auto}.settings-body>*{max-width:62rem}
.settings-title{display:flex;align-items:center;gap:.9rem;margin-bottom:.4rem}.settings-title span.ico{width:2.6rem;height:2.6rem;border-radius:8px;background:var(--panel);border:1px solid var(--line);display:grid;place-items:center}.settings-title h2{margin:0;font-size:1.3rem}
.settings-sub{color:var(--muted);margin:0 0 1.5rem;padding-bottom:1.5rem;border-bottom:1px solid var(--line)}
@media (max-width:860px){.content:has(.settings){display:block;padding:0}.settings{display:block}.settings-nav{width:auto;border-radius:10px 10px 0 0;padding:1rem .9rem;display:flex;gap:.25rem;overflow-x:auto;white-space:nowrap}.settings-nav h1{display:none}.settings-body{padding:1.1rem .9rem 2rem}}
/* Right-hand side panel (Tattoo-forespørsler, Nytt depositum, Nytt salg), like Linework's drawers. */
.drawer{--bg:#f5f7f7;--panel:#fff;--panel2:#f5f7f7;--line:#e3e6e8;--text:#1b1b1f;--muted:#6b7280;--field:#eceff1;--hover:#eef1f3;--sel:#e1e5e8;--faint:#a1a7ae;--btn:#27272a;--soft:#e9ecee;--okbg:#dcfce7;--errbg:#fee2e2;color-scheme:light;position:fixed;top:4rem;right:10px;bottom:10px;width:min(20rem,calc(100vw - 20px));background:var(--bg);border-radius:10px;z-index:30;display:none;flex-direction:column;box-shadow:0 10px 40px #0006}
body.drawer-open .drawer{display:flex}body.drawer-open .content{filter:brightness(.55)}
.drawer-head{display:flex;align-items:center;padding:1rem 1rem .75rem 1.1rem}.drawer-head strong{flex:1;font-size:1.05rem;font-weight:600}.drawer-body{flex:1;overflow-y:auto;padding:0 1.1rem 1.1rem}.drawer-body .page-head,.drawer-body>h1{display:none}.drawer .iconbtn{display:inline-flex;color:var(--text)}
.drawer .row>*{flex-basis:100%}
.req{display:block;text-decoration:none;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:.7rem .8rem;margin-bottom:.5rem}.req:hover{border-color:var(--faint)}.req.toolbar{display:flex;flex-wrap:nowrap}.req strong{font-weight:600}.req .muted{font-size:.82rem}
.sectionhead{font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:1.25rem 0 .5rem;font-weight:500}
.content.wide:has(.cal){padding:0;overflow:hidden;display:flex}
.cal{display:flex;flex:1;min-height:0;min-width:0}
.cal-side{width:15.5rem;flex:0 0 15.5rem;padding:1rem;border-right:1px solid var(--line);overflow-y:auto}.cal.no-side .cal-side{display:none}
.mini-head{display:flex;align-items:center;gap:.25rem;margin-bottom:.4rem}.mini-head strong{flex:1;font-weight:500;font-size:.92rem}
.mini table{font-size:.8rem;text-align:center}.mini th,.mini td{border:0;padding:.15rem 0;text-align:center;color:var(--muted)}.mini td a{display:block;width:1.75rem;height:1.75rem;line-height:1.75rem;margin:auto;border-radius:50%;text-decoration:none;color:var(--text)}
.mini td.wk{color:var(--faint);font-size:.7rem}.mini td.out a{color:var(--faint)}.mini td.today a{color:var(--accent);font-weight:700}.mini td.on a,.mini tr.sel td:not(.wk) a{background:var(--sel)}.mini td a:hover{background:var(--hover)}
.cal-legend{margin-top:1.25rem;display:grid;gap:.15rem}.cal-legend a{padding:.4rem .5rem;border-radius:8px;text-decoration:none;font-size:.9rem;color:var(--muted)}.cal-legend a[aria-current]{background:var(--sel);color:var(--text)}
.cal-main{flex:1;display:flex;flex-direction:column;min-width:0;min-height:0}
.cal-toolbar{display:flex;align-items:center;gap:.4rem;padding:.7rem 1rem;border-bottom:1px solid var(--line);flex-wrap:wrap}.cal-toolbar h1{font-size:1.15rem;margin:0 .25rem 0 .5rem;font-weight:600}.cal-week{font-size:.85rem}
.cal-grid{flex:1;overflow:auto;position:relative}
.cal-head{display:grid;grid-template-columns:3.5rem repeat(var(--cols),minmax(7.5rem,1fr));position:sticky;top:0;z-index:3;background:var(--panel2);border-bottom:1px solid var(--line)}
.cal-colhead{padding:.55rem .6rem;text-decoration:none;border-left:1px solid var(--line);display:flex;flex-direction:column;font-size:.85rem;border-top:3px solid transparent}.cal-colhead strong{font-weight:600}.cal-colhead span{color:var(--muted)}.cal-colhead .dot{margin-bottom:.2rem}
.cal-colhead.today{border-top-color:var(--text)}.cal-colhead.today strong{color:var(--text)}
.cal-body{display:grid;grid-template-columns:3.5rem repeat(var(--cols),minmax(6.5rem,1fr))}
.cal-gutter{position:relative}.cal-gutter span{position:absolute;right:.45rem;transform:translateY(-.55em);font-size:.72rem;color:var(--muted)}.cal-gutter span:first-child{transform:none}
.cal-col{position:relative;border-left:1px solid var(--line);background-image:repeating-linear-gradient(to bottom,var(--line) 0 1px,transparent 1px 64px)}
.cal-slot{position:absolute;left:0;right:0;height:64px;z-index:0}.cal-slot:hover{background:var(--hover)}
.cal-closed{position:absolute;left:0;right:0;z-index:1;pointer-events:none;background:repeating-linear-gradient(135deg,#00000005 0 6px,#0000000c 6px 12px)}.cal-closed span{position:absolute;top:.3rem;left:.4rem;font-size:.72rem;color:var(--muted)}
.cal-now{position:absolute;left:0;right:0;height:2px;background:var(--accent);z-index:4}.cal-now::before{content:"";position:absolute;left:-4px;top:-3px;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.cal-event{position:absolute;left:3px;width:calc(100% - 6px);z-index:2;overflow:hidden;border-radius:8px;padding:.25rem .45rem;font-size:.78rem;line-height:1.3;text-decoration:none;display:flex;flex-direction:column;background:color-mix(in srgb,var(--c) 16%,var(--panel));border-left:3px solid var(--c)}
.cal-event:hover{background:color-mix(in srgb,var(--c) 26%,var(--panel))}.cal-event .t{color:var(--muted);font-size:.72rem}.cal-event strong{font-weight:600}.cal-event .pill{align-self:flex-start;margin-top:.15rem;font-size:.66rem}
.cal-event.requested{border-left-style:dashed;background:var(--panel)}.cal-event.completed{opacity:.75}.cal-event.no_show{opacity:.5;text-decoration:line-through}
.setup{width:21rem;flex:0 0 21rem;border-left:1px solid var(--line);padding:1rem;overflow-y:auto}.setup-head{display:flex;align-items:center}.setup-head h2{flex:1;margin:0;color:var(--text);font-size:1.25rem;font-weight:500}.setup-count{margin:.2rem 0 1rem;font-size:.85rem}
.setup .navhead{padding-left:0}.setup-item{display:flex;align-items:center;gap:.75rem;padding:.6rem .5rem;border-radius:10px;text-decoration:none}.setup-item:hover{background:var(--hover)}.setup-item>span:nth-child(2){flex:1}.setup-item strong{display:block;font-weight:500;font-size:.92rem}.setup-item .muted{display:block;font-size:.78rem;line-height:1.35}
.setup-check{width:2.1rem;height:2.1rem;flex:0 0 2.1rem;border-radius:8px;border:1px dashed var(--faint);display:grid;place-items:center}.setup-item.done .setup-check{background:var(--ok);border:0;color:#052e16}.setup-item.done strong{color:var(--muted);text-decoration:line-through}
@media (max-width:1560px){.cal:has(.setup) .cal-side{display:none}}@media (max-width:1200px){.setup{display:none}}
@media (max-width:860px){.cal-side{display:none}.cal-toolbar{padding:.5rem .6rem}.cal-toolbar h1{font-size:1rem;margin-left:.2rem}.cal-week{display:none}.cal-toolbar>.iconbtn:first-child{display:none}.cal-head,.cal-body{grid-template-columns:2.75rem repeat(var(--cols),minmax(6.5rem,1fr))}}
.filecard{display:flex;flex-direction:column;gap:.25rem;text-decoration:none}.filecard:hover{border-color:var(--faint)}.filecard strong{font-weight:600}.filecard .muted{font-size:.85rem}
@media print{body.app{display:block;height:auto;overflow:visible}.topbar,.side,.drawer,.settings-nav{display:none!important}.content{overflow:visible;border:0;padding:0;margin:0}}
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
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  forms: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  booking: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M8 14h3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/>',
  plug: '<path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0zM12 17v5"/>',
  ledger: '<path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M8 9h8M8 13h8"/>',
  toggles:
    '<rect x="2" y="5" width="20" height="6" rx="3"/><circle cx="16" cy="8" r="1.5"/><rect x="2" y="13" width="20" height="6" rx="3"/><circle cx="8" cy="16" r="1.5"/>',
  away: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  register: '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V5h10v6M10 8h4M7 15h2M11 15h2M15 15h2"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  share: '<path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg class="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      {raw(ICONS[name] ?? "")}
    </svg>
  );
}

type NavItem = {
  href: string;
  label: string;
  icon: string;
  feature?: FeatureKey;
  owner?: boolean;
  also?: string[];
};

/** Menu in the same order and grouping as Linework's studio dashboard, so the switch feels familiar. */
const NAV: { heading?: string; bottom?: boolean; items: NavItem[] }[] = [
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
      { href: "/admin/invoices", label: "Fakturaer", icon: "ledger", feature: "invoices" },
      {
        href: "/admin/gift-cards",
        label: "Gavekort",
        icon: "gift",
        feature: "gift_cards",
      },
      {
        href: "/admin/settlements",
        label: "Oppgjør",
        icon: "settle",
        feature: "settlements",
      },
      { href: "/admin/reports", label: "Rapporter", icon: "reports", also: ["/admin/report", "/admin/accounting"] },
    ],
  },
  {
    bottom: true,
    items: [
      { href: "/admin/artists", label: "Artister", icon: "artists" },
      { href: "/admin/managers", label: "Ledere", icon: "managers" },
      { href: "/admin/shifts", label: "Personalliste", icon: "shifts" },
      {
        href: "/admin/inks",
        label: "Produkter",
        icon: "products",
        feature: "inks",
      },
      { href: "/admin/settings", label: "Innstillinger", icon: "settings" },
    ],
  },
];

/**
 * Links marked data-drawer open in the right-hand panel on wide screens, like Linework's
 * Tattoo requests, New deposit and New sale. The server answers X-Drawer requests with just
 * the page body; on phones (or without JS) the link opens as a normal page.
 */
const DRAWER_JS = `document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('a'),b=document.body,a=t&&(t.hasAttribute('data-drawer')||(t.closest('.drawer-body')&&t.pathname===window.__dp))?t:null;if(!a){if(b.classList.contains('drawer-open')&&!e.target.closest('.drawer')){e.preventDefault();b.classList.remove('drawer-open')}return}if(innerWidth<860||e.metaKey||e.ctrlKey)return;e.preventDefault();var d=document.querySelector('.drawer');window.__dp=a.pathname;fetch(a.href,{headers:{'X-Drawer':'1'},credentials:'same-origin'}).then(function(r){d.querySelector('strong').textContent=decodeURIComponent(r.headers.get('X-Title')||'');return r.text()}).then(function(h){d.querySelector('.drawer-body').innerHTML=h;document.body.classList.add('drawer-open')})});document.addEventListener('keydown',function(e){if(e.key==='Escape')document.body.classList.remove('drawer-open')});`;

export const STUDIO_NAME = "Infinity Tattoo";
export const STUDIO_ADDRESS = "Skårersletta 48c";

export function Layout(props: { title: string; path: string; user: StaffUser; flash?: string; error?: string; wide?: boolean; children: Child }) {
  const on = (item: NavItem) => !item.feature || props.user.features?.[item.feature] !== false;
  const current = (href: string) => props.path === href || props.path.startsWith(`${href}/`);
  const requests = props.user.openRequests ?? 0;
  return (
    <>
      {raw("<!doctype html>")}
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
            <a class={`top-link${current("/admin/requests") ? " active" : ""}`} href="/admin/requests" data-drawer>
              <Icon name="inbox" size={18} />
              <span>Tattoo-forespørsler</span>
              {requests > 0 && <span class="badge">{requests}</span>}
            </a>
            <span class="spacer" />
            <a class="top-link" href="/admin/deposits/new" data-drawer>
              <Icon name="deposit" size={18} />
              <span>Nytt depositum</span>
            </a>
            <a class="top-btn" href="/admin/payments/new" data-drawer>
              <Icon name="basket" size={18} />
              <span>Nytt salg</span>
            </a>
            {props.user.role === "owner" && (
              <a class="top-cta" href="/admin/setup/show">
                Kom i gang
              </a>
            )}
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
                    <div class={group.bottom ? "navgroup bottom" : "navgroup"}>
                      {group.heading && <div class="navhead">{group.heading}</div>}
                      {items.map((item) => (
                        <a href={item.href} aria-current={current(item.href) || item.also?.some(current) ? "page" : undefined}>
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
          <aside class="drawer" aria-live="polite">
            <div class="drawer-head">
              <strong />
              <button type="button" class="iconbtn" aria-label="Lukk" onclick="document.body.classList.remove('drawer-open')">
                <Icon name="close" />
              </button>
            </div>
            <div class="drawer-body" />
          </aside>
          <script dangerouslySetInnerHTML={{ __html: DRAWER_JS }} />
        </body>
      </html>
    </>
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
    <>
      {raw("<!doctype html>")}
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
    </>
  );
}
