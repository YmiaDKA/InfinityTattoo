"""Build DOM-backed notes for capture states 01–78 only; never accesses Linework."""
import json, re
from pathlib import Path
BASE = Path(__file__).resolve().parent
DATA = [x for x in json.loads((BASE/'observations.json').read_text()) if 1 <= int(x['name'].split('-')[0]) <= 78]
GROUPS = [
(1,11,'Complete your setup','Explains the steps needed to prepare the studio for clients.','A complementary setup panel overlays the calendar; each checklist item expands an inline region with its call to action.','Each item leads to its relevant studio/payment/artist/booking/form/instruction/service/skin/product/gift-card settings.'),
(12,13,'Calendar','Shows appointments and availability by calendar period.','Calendar toolbar, complementary month selector and seven date/time columns; screenshots show the desktop and narrow-width treatment.','Active artists are required to inspect real booking and artist availability flows.'),
(14,16,'Tattoo requests','Organizes tattoo enquiries by response and booking outcome.','Request view appears over the existing calendar; tablist and selected tabpanel hold the empty-state content.','Requests and artist availability; trial contains no requests.'),
(17,17,'New deposit','Assigns a payment deposit to client credit.','Overlay retains calendar background; client section precedes amount and summary, with closing/payment actions.','A client is required; payments setup is a separate prerequisite.'),
(18,19,'New sale','Builds a cart from products or gift cards before payment.','Overlay contains cart/total and Add to cart area with Products/Gift Cards tabs.','Products must exist; payment collection requires configured payment methods.'),
(20,23,'Clients','Lists clients, client deposits and completed/requested forms.','Tabs and search/filter toolbar above a table; Add new client is a complementary side panel.','Client data, deposit payments and configured forms; no client records exist in this trial.'),
(24,30,'Sales','Lists recorded sales by period, seller, payment type, provider and cashier.','Period/date controls and five filters above sales table; opened filters display option buttons in place.','Recorded sales, sellers/service providers and payment configuration; trial is empty.'),
(31,35,'Gift Cards','Manages issued gift cards and the online gift-card store.','Dashboard table with search/filter toolbar, store status and totals; share/settings open overlays with internal settings tabs.','Online store requires payments; logo visibility depends on Settings → Skins.'),
(36,38,'Settlements','Tracks rent invoices and studio commissions.','Invoice summaries above Studio commissions period/filter area; New invoice opens an invoicing-setup gate.','Company and payment information must be completed before invoicing.'),
(39,40,'Company details','Collects company identification needed for financial features.','Settings secondary navigation beside main content; company-setup dialog asks for organization number.','Required to unlock payments, cash register and invoicing; setup was not submitted.'),
(41,44,'Reports','Summarizes studio revenue and expenses for the selected period.','Revenue/period/date controls above summary values and CSV/Sales report download controls.','Recorded rent, service/product sales, fees and VAT; empty trial provides zero or loading/blank states.'),
(45,45,'Flash','Selects artist-shared flash sheets to appear on the booking page.','Settings-style secondary navigation and main empty-state content with Copy link.','Artists must share flash with studio; none have shared any.'),
(46,46,'Reviews','Offers studio Google review management.','Promotional main content with availability message and call to action.','Feature is unavailable for this trial studio; contact support is shown.'),
(47,56,'Artists','Connects artists and configures sales, commissions, rent and shared scheduling.','Active/Invited/Inactive/All Artists tabs; invitation overlay contains arrangement controls, conditional financial fields and explanatory accordions.','Active artist account/invitation, company/payment setup and selected seller/payment arrangement.'),
(57,59,'Managers','Manages studio access and manager subscription seats.','Seat summary above Name/Role/Status table; invite overlay includes email, role and paid-seat warning.','Additional invite would add a paid subscription seat; final invitation action was not used.'),
(60,63,'Products','Maintains products available for studio sales.','Category choices and table; Add new product is a complementary side panel; Manage categories opens an overlay.','Product name/price, tax rate and optional categories; catalog is empty.'),
(64,67,'Settings · Studio setup','Edits studio identity, SMS sender and location.','Secondary settings navigation plus main stacked logo/name/SMS/location sections; individual Edit dialogs.','Logo upload and changes were not performed; address search depends on location lookup.'),
(68,68,'Settings · Theme','Selects the current user’s dashboard appearance.','Light/Dark radio choices and theme color-preset buttons in main area.','Per-user preference synced across devices; no selection was changed.'),
(69,69,'Settings · Skins','Configures the appearance of client-facing pages.','Brand/avatar controls, preview and color preset buttons in main settings content.','Avatar needed for logo display; client-facing booking and gift-card pages use these settings.'),
(70,71,'Settings · Payment methods','Starts online payment setup and introduces physical terminals.','Main introduction and Dintero terminal section; Start now opens company-information prerequisite overlay.','Company details are required; payment connection was not completed.'),
(72,78,'Settings · Services','Configures service definitions, providers, pricing, duration, imagery and booking.','Services list with category controls; Create service editor overlays it with persistent Cancel/Save changes actions and section navigation.','Providers require active artists; pricing/VAT, duration, images and online booking are service-level settings. No service saved.'),
]
EXTRA = {
12:'Observed week range: 12 - 18. Oct 2026, Week 42. Empty calendar includes an internal-looking “dummyForBug” event; do not treat this as a genuine client booking.',
13:'**Attempted day state only.** This capture still shows 12 - 18. Oct 2026, Week 42 and seven weekday links; desktop DOM is identical to state 12. Successful day rendering is not evidenced.',
16:'Archive exposes Booked, Canceled and Declined subtabs; only Booked is selected in this state. Other subtabs are labels, not independently captured results.',
17:'Client required is explicit; Add payment is disabled. Name, optional email, telephone/country code and number amount are visible.',
19:'Gift Card and Custom amount: are visible; no cart item or completed checkout is evidenced.',
21:'“A client requires a name” and disabled Create client establish a name requirement even though the extracted input has no native required attribute.',
26:'Sale-type menu options: All Sales → Sales With Products → Sales With Services.',
27:'Seller menu options: All sellers → Infinity test.',
28:'Payment-method options: All payment methods → Online payments → Cash payments.',
29:'Attempted service-provider filter state: no expanded options are exposed in the DOM. Do not infer a populated menu.',
30:'Cashier menu options: All cashiers → Artists → Managers → Self checkout.',
33:'Enable online gift card store is gated by payments. Store URL slug and customer-facing information are editable; Open Skins points to logo configuration.',
34:'Visible defaults: minimum 500; maximum 10000; duration 1 år. Automatic expired-card payout is explained; other duration options were not opened in this state.',
37:'New invoice stops at Complete invoicing setup, with Complete setup and Maybe Later. No invoice was created.',
38:'**Transition/incomplete state.** Main content is empty in the captured DOM; this is not a completed invoice setup or rendered invoice form. State 39 shows the stable company prerequisite.',
40:'Organization number is requested; Go! would continue company lookup/setup and was not submitted.',
42:'Attempted report-type menu: capture remains Revenue with no expanded alternative report types. Do not infer other tabs or options.',
43:'Opened report-period menu exposes Day → Month only.',
44:'Month and October, 2026 are visible; summary body is blank in captured DOM. Treat as captured incomplete/month state, not evidence of a populated monthly report.',
46:'“Google Reviews feature is not available for your studio” and “Contact support for more information” are explicit. No connected review dashboard was accessible.',
51:'Commission setup exposes seller identity choices, 40% Studio / 60% Artist slider and checked Auto-charge for online payments. No invitation sent.',
52:'Fixed-rent fields show Monthly interval, invoice day 1, rent amount 0, VAT 25%, due 14 days. These are visible defaults, not an approved financial arrangement.',
54:'Payment explainer still mentions 60% artist / 40% studio although fixed-rent fields remain visible. Record the displayed copy without assuming it correctly describes the selected arrangement.',
55:'Studio settlement explainer still describes 40% commission in this fixed-rent-state capture; preserve as observed, not validated business behavior.',
58:'Invitation warning quotes an additional 350,00 kr per month. Confirm seat upgrade and send invitation is disabled; no upgrade or invite occurred.',
59:'Role popup exposes Owner while Manager is the current display. Do not assume other undisplayed roles exist.',
62:'VAT menu options in observed order: 25% → 15% → 12% → 0%.',
66:'SMS handler dialog displays “Edit Studio Name” while its textbox value is Linework. Preserve this mismatched UI title exactly.',
70:'Calls to action appear in order: Start now → I\'m interested. No terminal inquiry was submitted.',
71:'Payment setup stops at company-details gate; Add company details → Cancel are visible.',
73:'Editor section labels: General settings, Service Providers, Pricing & Taxes, Service duration, Service images, Online booking. English/Norwegian names and descriptions, service category and tips are visible.',
74:'“You have no active service providers in the studio.” Manage artists is offered. Rent-settlement VAT searchbox is disabled and shows 0.',
75:'Pricing choices visible: Variable pricing, Fixed pricing, Free of charge. Set pricing including VAT is checked. Provider pricing table is empty.',
76:'Duration choices: Variable duration / Fixed duration; hour/minute buttons show 1 hour and 0 Minutes. Combining services is a checkbox.',
77:'Upload UI only: Drag & drop here / Select from files. Formats listed .jpg, .png, .heic, .webp, .avif; no image selected or uploaded.',
78:'Online booking choices visible: Enable Direct Online Booking / Disable Online Booking; no service saved.',
}
# Preserve exact lines. Remove only the repeated global shell and verbose calendar grid when
# collecting a state-specific excerpt. Raw desktop/phone DOM remains in observations.json.
def content(x, key):
 s=x[key]
 n=int(x['name'].split('-')[0])
 if n<=11:
  marker='- complementary:\n  - generic: Complete your setup'
  if marker in s: s=s[s.index(marker):]
 elif n<=19:
  markers={14:'- generic: Tattoo requests',15:'- generic: Tattoo requests',16:'- generic: Tattoo requests',17:'- generic: New payment deposit',18:'- generic: New sale',19:'- generic: New sale'}
  marker=markers.get(n)
  if marker and marker in s: s=s[s.index(marker):]
  elif n in [12,13]:
   s=s[s.index('- button "Complete your setup"'):]
   # Full calendar is available in raw snapshot; excerpt retains header and event state.
   s='\n'.join(l for l in s.splitlines() if not re.search(r'gridcell|rowgroup|row "\d|generic: \d\d:\d\d|row "M T W',l))
 elif '- main:' in s:
  s=s.split('- main:',1)[1]
 elif '- main\n' in s:
  s=s.split('- main\n',1)[1]
 elif '- button "Complete your setup":' in s:
  s=s.split('- button "Complete your setup":',1)[1]
  s=s.split('\n',2)[-1]
 s='\n'.join(l for l in s.splitlines() if 'intercom-frame' not in l and 'Open Intercom Messenger' not in l and l.strip()!='- progressbar')
 return s.strip() or '(No main content exposed in captured DOM.)'
def esc(v): return str(v).replace('|','\\|').replace('\n',' ')
out=['# Linework capture notes · states 01–78',
'These notes summarize the recorded browser DOM in [observations.json](observations.json). The screenshots are the authority for visual geometry. Desktop is approximately 1440 px; phone is approximately 390 px. State names describe attempted navigation and do not guarantee that the requested state finished rendering. No underlying Linework source code was exported.',
'**Booking blocker:** the studio shows “You have no active artists in your studio”. Consequently, successful artist day view, a genuine booking opened from the calendar, and the complete new-booking flow are not evidenced in states 01–78. No artist was invited merely to bypass this read-only limitation. State 13 still shows the week grid. No existing client can be opened because the client list is empty.',
'**Reading fields:** the tables reproduce native DOM field metadata. `required: false` means the HTML required attribute was absent, **not** that the business field is optional. A missing label means the extractor found no associated HTML label; nearby exact visible labels/placeholders remain in the DOM blocks. Input types absent from HTML default to text. Hidden inputs are implementation details; dropdown options are documented only when actually exposed. Button sequence below follows DOM order, which may differ from visual alignment.',
'**Shared shell labels:** Calendar; Clients; Financials → Sales, Gift Cards, Settlements, Reports; News → Flash (NEW); Marketing → Reviews; Artists; Managers; Products; Settings; Get help. Top actions: Tattoo requests → New deposit → New sale → Complete your setup. Settings sub-navigation: Studio setup → Theme → Skins → Payment methods → Services → Flash → Online booking → Forms → Instructions → Cash Register → Company details → Integrations → Client support → Subscription & Billing. These labels are exact; each state excerpt omits the repeated shared shell.']
for low,high,title,purpose,layout,depends in GROUPS:
 out += [f'\n## {title}',f'Purpose: {purpose}',f'Layout and behavior: {layout}',f'Dependencies: {depends}']
 for x in DATA:
  n=int(x['name'].split('-')[0])
  if not low<=n<=high:continue
  name=x['name']; d=content(x,'desktop'); p=content(x,'phone')
  out += [f'\n### {name}',f'[Desktop](screens/{name}-desktop.png) · [Phone](screens/{name}-phone.png)',f'Observed URL: [{x["url"]}]({x["url"]})']
  if n in EXTRA: out.append(EXTRA[n])
  buttons=[]
  for l in d.splitlines():
   if re.search(r'^\s*- button\b',l): buttons.append(l.strip().removeprefix('- '))
  if buttons: out.append('Buttons in DOM order: '+' → '.join('`'+b.replace('`','\\`')+'`' for b in buttons)+'.')
  fields=x.get('fields',[])
  if fields:
   out += ['\nNative fields (recorded order):','\n| # | Associated HTML label | Placeholder | Element / input type | Native required |','| --- | --- | --- | --- | --- |']
   for j,f in enumerate(fields,1):
    typ=f.get('type') or ('text (default)' if f.get('tag')=='INPUT' else 'not specified')
    out.append(f'| {j} | {esc(f.get("label") or "not associated")} | {esc(f.get("placeholder") or "—")} | {f.get("tag")} / {typ} | {str(f.get("required",False)).lower()} |')
  else: out.append('No native field metadata recorded for this state; see exact accessible controls below.')
  out += ['\n<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>','\n```yaml',d,'```','</details>']
  if p!=d:
   out += ['\n<details><summary>Exact phone DOM (differs from desktop)</summary>','\n```yaml',p,'```','</details>']
  else: out.append('Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.')
out += ['\n## Coverage boundary','This file intentionally stops at state 78. Later observations belong in the main README or a subsequent capture appendix. Each linked screenshot pair is expected to be converted to PNG by the capture owner before delivery. Expanding a form or changing an unsaved local tab does not prove that saving, inviting, paying, uploading or connecting would succeed.']
(BASE/'CAPTURE-NOTES.md').write_text('\n\n'.join(out)+'\n')
print(f'Wrote {len(DATA)} states, {(BASE/"CAPTURE-NOTES.md").stat().st_size} bytes')
