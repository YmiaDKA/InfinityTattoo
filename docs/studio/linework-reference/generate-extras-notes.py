"""Generate capture appendix for states126–163 only from local observations."""
import json,re
from pathlib import Path
BASE=Path(__file__).resolve().parent
DATA=[x for x in json.loads((BASE/'observations.json').read_text()) if 126<=int(x['name'].split('-')[0])<=163]
GROUPS=[
(126,126,'Notifications · loaded empty state','Shows studio notifications.','Bell overlay over calendar; screenshot provides notification text absent from DOM.','Current studio notification history; empty.'),
(127,129,'Tattoo requests · sort and archive','Sorts tattoo enquiries and separates canceled/declined outcomes.','Complementary request panel overlays calendar; Display preferences opens another dialog; Archive nests Booked/Canceled/Declined tabs.','Existing requests needed for populated results; trial contains none. No display preference applied.'),
(130,131,'Reports · loaded recaptures','Summarizes revenue and expenses for day or month.','Period/date toolbar above summary rows; download controls at end.','Recorded rent/sales/fees/VAT; all values are zero. No download performed.'),
(132,135,'Clients · loaded list and filters','Filters client deposits and form submissions.','Clients/Deposits/Forms tabs; toolbar menus above empty tables and footer totals/actions.','Existing clients, deposits and submitted forms; trial remains empty.'),
(136,140,'Gift Cards · loaded filters and editors','Filters gift cards and configures validity and purchase terms.','Gift-card table and summary; source/status popup menus; store settings overlay contains validity dropdown or editable term rows.','Payments needed to enable store; no cards sold and no settings saved.'),
(141,143,'Settlements · invoice list and filters','Lists studio-rent invoices by date and status.','Separate Invoices page with ISSUED/TO/WITH STATUS/search toolbar, invoice table and selection/totals footer.','Company/payment setup needed to create invoices; no invoices exist.'),
(144,145,'Sales · custom period','Lists sales within a custom date range.','Custom period/date toolbar; calendar date-range popup above usual sale filters/table.','Recorded sales and selected range; only viewing controls used.'),
(146,149,'Artists · fixed-rent options','Configures the interval, invoice day, VAT and due date for artist rent.','Invite artist dialog over empty artist list; one combobox expanded per state.','An artist invitation would establish the arrangement; none sent. Defaults are observations, not approved terms.'),
(150,150,'Account dashboard launcher','Lists accessible artist/studio accounts for launching.','Account-level welcome page with separate artist and studio cards, Launch buttons and New Studio Account.','Current user account memberships. This is the launcher only; the Test artist account was not opened or inspected.'),
]
GROUPS.append((151,158,'Services · custom categories and preset editors','Edits category descriptions and inspects preset service constraints.','Service list with category dialogs and full Edit service overlay; section navigation exposes general settings, pricing, duration and online requests.','Industry-tailored presets lock some fields; active artists required for artist-specific requests. No category or service saved.'))

GROUPS.extend([
(159,159,'Online booking · lower request settings recapture','Documents the lower tattoo-request fields and mandatory questions.','Tattoo requests tab with stacked customizable fields and explanatory copy below.','Open Requests remain OFF; no active artists; no setting changed.'),
(160,160,'Instructions · loaded empty landing','Lists instructions shared before and after appointments.','Separate before/after sections with Add Instructions actions and counters.','No created or enabled instructions; confirms earlier template exploration stayed unsaved.'),
(161,163,'Subscription invoices · filters and billing email','Filters subscription invoices and inspects the invoice-recipient editor.','Invoices tab with type/product menus; Change opens billing-email dialog.','Billing account and invoice history; list is empty and no email saved.'),
])

EXTRA={126:'**Screenshot-only notification text:** “Notifications” / “No notifications yet”. Accessible DOM contains underlying calendar only, so overlay semantics cannot be inferred from its snapshot.',
127:'Sort choices: Time submitted, Appointment time, Estimated project cost; order: Newest first / Oldest first. Cancel → Apply. No Apply action used.',
128:'Canceled archive subtab selected; “Nothing to see here”.',129:'Declined archive subtab selected; “Nothing to see here”.',
130:'Loaded Day report with eight zero-valued rows: Studio rent, Service sales, Product sales, Total sales, Fees, Total expenses, VAT, Net total. CSV → Sales report.',
131:'Loaded Month report for October, 2026 supersedes the blank state44. Download buttons: CSV → Sales report → Month report.',
132:'Stable empty client list: “No clients added yet”, Add client appears both above table and below empty state. No client detail exists to inspect.',
133:'Deposit statuses: All statuses → Pending → Valid → Redeemed → Forfeited → Refunded. “No deposits yet”; 0 active deposits; 0,00 kr.',
134:'Form statuses: All statuses → Completed → Pending. No data to display; Export disabled.',
135:'Form period options: All time → Day → Week → Month → Year → Custom.',
136:'Loaded empty gift-card list recapture. Gift card store remains offline.',
137:'Sources: All sources → At studio → Online.',138:'Statuses: All statuses → Valid → Expired → Paid out → Redeemed.',
139:'Validity options in observed order: 6 måneder → 1 år (selected) → 2 år. Min500 / max10000 remain displayed.',
140:'Customize terms exposes three editable text rows with per-row unnamed buttons; Add term → Reset to defaults → Use default terms → Cancel → Save settings. No row added, removed, reset or saved.',
141:'Invoice page is a distinct route /manager/settlement/invoiced/all. Selection count and invoiced/paid totals are zero.',
142:'Issued-period options: Today, Yesterday, This week, Last week, This month, Last month, This year, Last year, All time. No invoices found.',
143:'Invoice statuses: All → Paid → Unpaid → Overdue → Pending → Credit Note.',
144:'Custom sales mode selected with October 12th, 2026 date control; state145 exposes the range picker.',
145:'Date-range calendar grid visible; captured disabled dates and selected state are retained exactly below. “No sales recorded for this time period”.',
146:'Invoicing interval options: Weekly → Monthly (selected).',
147:'Invoice day-of-month list exposes 1 through31;1 selected.',
148:'Rent VAT options:0% →12% →15% →25% (selected). This differs in order from product VAT menu.',
149:'Payment due options:7 days →14 days (selected) →30 days.',
150:'Welcome back, Ibrahim. Test / Artist account and Infinity test / Myrveien17B Ski / Primary-owner each have Launch. **No Test artist account dashboard, booking, settings or payouts were inspected.** New Studio Account visible but not used.',
}
EXTRA.update({
151:'Custom-category dialog has bilingual names and description; Cancel → Add category. No category added.',
152:'Preset Tattoo category states “This category is preset by LINEWORK”; category name displayed, bilingual description editable. Cancel → Save changes; neither persisted.',
153:'**Unsuccessful edit attempt:** snapshot shows only services list; the text click did not open an editor. State155 is the successful Tattoo preset editor.',
154:'Consultation preset editor: category and names Consultation/Konsultasjon disabled. Description and tips control visible; preset warns some features cannot be changed.',
155:'Tattoo preset editor: category/name Tattoo/Tatovering disabled; description Appointments scheduled on request; tips checked. No Service images navigation item in this preset.',
156:'Tattoo pricing is variable; Fixed pricing and Free of charge explicitly not supported for preset. Use hourly pricing rates checked/disabled. VAT0; inclusive VAT checked; empty hourly-provider-rate table.',
157:'Tattoo duration variable; Fixed duration not supported. Minimum duration1 hour:0 Minutes.',
158:'Tattoo Online booking contains artist-specific and open request settings, no active artists, Open Requests OFF, and the same size/color/skin/budget/reference-field editors seen in states80–86. No requests enabled or settings saved.',
})

EXTRA.update({
159:'Lower settings recapture preserves mandatory questions: Is it a cover up?, Body location of tattoo, Tattoo description, Availability and other details. Customize options are unchanged; no requests enabled.',
160:'Loaded Instructions landing:0/8 Created and0/8 Enabled, No Instructions Added Yet under both before and after sections. Earlier editor/template selections did not persist instructions.',
161:'Invoice type options:All types → Subscription → SMS. No invoices match the current filter.',
162:'Product filter exposes only All products in this capture. Do not invent additional product options.',
163:'Change billing email dialog explains invoices/receipts/payment reminders are sent to this address. Email textbox displayed; Save disabled. Draft-only inspection, no recipient change persisted.',
})

def excerpt(x,key):
 s=x[key];n=int(x['name'].split('-')[0])
 if n==126:return '(Notification overlay text is absent from accessible DOM. Screenshot shows “Notifications” / “No notifications yet”. Underlying calendar omitted; full snapshot is in observations.json.)'
 if 127<=n<=129:
  marker='- complementary:\n  - generic: Tattoo requests'
  if marker in s:s=s[s.index(marker):]
 elif n!=150 and '- button "Complete your setup":' in s:
  s=s.split('- button "Complete your setup":',1)[1]
  s=s.split('\n',2)[-1]
 elif '- main:' in s:s=s.split('- main:',1)[1]
 return '\n'.join(l for l in s.splitlines() if 'intercom-frame' not in l and 'Open Intercom Messenger' not in l and l.strip()!='- progressbar').strip()
def esc(v):return str(v).replace('|','\\|').replace('\n',' ')
out=['# Linework capture notes · states126–163',
'Continuation of [01–78](CAPTURE-NOTES.md) and [79–125](CAPTURE-NOTES-SETTINGS.md), based on recorded UI snapshots in [observations.json](observations.json). Paired PNG screenshots show desktop approximately1440px and true phone390×844. Linework frequently retains desktop layout and clips at phone width. No Linework application source code was exported.',
'Native required:false only means no HTML required attribute, not optional business input. Exact labels and controls below preserve DOM order; visual placement comes from screenshots. Snapshot-only duplicate values and unnamed buttons are retained. Navigation/filter exploration remained read-only; no save, submission, invitation, upload, checkout or integration connection was performed. State150 is an account launcher, not an inspected artist account.']
for lo,hi,title,purpose,layout,dep in GROUPS:
 out += [f'\n## {title}',f'Purpose: {purpose}',f'Layout and behavior: {layout}',f'Dependencies: {dep}']
 for x in DATA:
  n=int(x['name'].split('-')[0])
  if not lo<=n<=hi:continue
  name=x['name'];d=excerpt(x,'desktop');p=excerpt(x,'phone')
  out += [f'\n### {name}',f'[Desktop](screens/{name}-desktop.png) · [Phone](screens/{name}-phone.png)',f'Observed URL: [{x["url"]}]({x["url"]})',EXTRA.get(n,'')]
  buttons=[l.strip().removeprefix('- ') for l in d.splitlines() if re.match(r'\s*- button\b',l)]
  if buttons:out.append('Buttons in DOM order: '+' → '.join('`'+b.replace('`','\\`')+'`' for b in buttons)+'.')
  fields=x.get('fields',[])
  if fields:
   out += ['\nNative fields (recorded order):','\n| # | Associated HTML label | Placeholder | Element / input type | Native required |','| --- | --- | --- | --- | --- |']
   for j,f in enumerate(fields,1):
    typ=f.get('type') or ('text (default)' if f.get('tag')=='INPUT' else 'not specified')
    out.append(f'| {j} | {esc(f.get("label") or "not associated")} | {esc(f.get("placeholder") or "—")} | {f.get("tag")} / {typ} | {str(f.get("required",False)).lower()} |')
  else:out.append('No native field metadata recorded; accessible controls and neighboring labels follow.')
  out += ['\n<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>','\n```yaml',d,'```','</details>']
  if p!=d:out += ['\n<details><summary>Exact phone DOM (differs from desktop)</summary>','\n```yaml',p,'```','</details>']
  else:out.append('Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.')
(BASE/'CAPTURE-NOTES-EXTRAS.md').write_text('\n\n'.join(out)+'\n')
print(f'Wrote {len(DATA)} states')
