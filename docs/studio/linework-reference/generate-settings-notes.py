"""Generate the separate settings appendix for states 79–125; local observations only."""
import json,re
from pathlib import Path
BASE=Path(__file__).resolve().parent
DATA=[x for x in json.loads((BASE/'observations.json').read_text()) if 79<=int(x['name'].split('-')[0])<=125]
GROUPS=[
(79,79,'Services · Add category','Adds a preset or custom service category.','Dialog over services list with category choices and a custom-category action.','Available categories and existing services; nothing was added.'),
(80,86,'Online booking · Tattoo requests','Controls open and artist-specific tattoo requests and the questions clients answer.','Settings secondary navigation plus main tablist; each Edit opens a focused dialog over the unchanged settings page.','Active artists needed for artist-specific requests; open requests currently OFF. Mandatory cover-up/body-location/description/availability questions remain fixed.'),
(87,96,'Online booking · Direct booking and Booking page','Configures direct-booking eligibility, timing, deposits and the public booking page.','Tattoo requests/Direct booking/Booking page tabs with stacked settings rows; URL, tracking and timing editors open dialogs.','Fixed-duration services and enabled service providers required for direct booking; Skins owns logo visibility; Meta pixel requires privacy-policy details.'),
(97,109,'Forms and digital consent','Creates bilingual forms for clients to fill out and digitally sign.','Forms landing counts and New form; disclaimer precedes large Create form editor, with persistent Preview form/Close/Save changes header, section navigation and main editor.','Up to 10 created forms; valid required titles/content needed for preview; active language settings determine translation work. No form saved.'),
(110,115,'Instructions','Creates content to share before or after appointments.','Landing separates before/after instructions; Add Instructions opens template chooser then message/settings dialog. Add content opens a larger iframe-based Unlayer content editor.','Up to eight created/enabled instructions; content and SMS/email details plus sharing timing. No instruction saved.'),
(116,116,'Cash Register','Configures studio cash-register features.','Settings main content contains prerequisite message and Payment methods action.','Cash register is not enabled; requires payments setup.'),
(117,117,'Integrations','Connects accounting tools and maps export ledger accounts.','Fiken integration information/action followed by grouped GBAT10 numeric account/VAT fields and Save settings.','Fiken service and external pricing; accounting export mappings. No integration started and no values saved.'),
(118,118,'Client support','Sets the contact information included in client emails.','Contact Information section with telephone/country and email fields, then Save changes.','Client email templates use this information. No values changed.'),
(119,123,'Subscription & Billing','Shows subscription, invoices, payment method, discounts and extra seats.','Subscriptions/Invoices tabs; subscription summary and price breakdown; billing frequency, discount and seat editors open overlays.','Trial subscription and manager-seat billing; no plan change, redemption, card update, cancellation or seat purchase performed.'),
(124,124,'Studio switcher','Shows accessible studios and account navigation.','Account/studio overlay retains underlying subscription page; account identity above Studio management and studio card, footer Go to Dashboard/Log out.','User memberships; only Infinity test is visible. No logout or studio creation performed.'),
(125,125,'Notifications','Shows the studio notification inbox.','Bell overlay over the calendar; screenshot text is authoritative because notification content is absent from DOM snapshot.','Notifications for current studio; inbox is empty.'),
]
EXTRA={
79:'Preset categories visible: Tattoo, Piercing, Tattoo removal, Medical piercing. Add a custom category and Cancel follow; no category creation performed.',
80:'Not accepting requests / OFF; no active artists. Tattoo size, color, skin-tone, budget and reference-image settings appear in that order.',
81:'Booking terms choices: No booking terms (checked), Link to terms on my own website, Write my terms here. Dialog copy says “direct bookings” although opened from Tattoo requests; preserve exactly.',
82:'Tattoo-size options include Tiny/Small/Medium/Medium +/Large, Half Sleeve, Three-fourths sleeve, Full arm sleeve, Full back piece, Full chest piece, Full body suit; Width x Height is always available by explanatory copy.',
83:'Color options: Color, Black & Gray, Both (checked).',
84:'Skin-tone choices: Ask for skin tone / Don\'t ask for skin tone (checked). Optional client values are Pale, Olive, Tan, Dark.',
85:'Budget choices: Ask client for their budget / Don\'t ask client for their budget (checked).',
86:'Reference-image choices: required / optional (checked) / don\'t ask.',
87:'No service providers enabled for direct booking. Visible defaults: no deposit, maximum 90 Days, minimum 3 Days before start, gap 30 Minutes.',
89:'Meta pixel ID, privacy policy URL and responsibility acknowledgement appear. No tracking was added or enabled.',
90:'URL slug is infinity-test; allowed characters/numbers/hyphen and maximum 30 characters. Update URL disabled.',
91:'Reference-image choices: required / optional (checked) / don\'t ask.',
92:'Note-to-artist choices: required / optional (checked) / don\'t ask.',
93:'Deposit dialog describes confirmation without upfront payment; no deposit requirement was toggled.',
94:'Maximum lead-time choices: Set in days / Set in months; current number 90. Cancel → Done. No Done click performed.',
95:'Minimum lead-time choices: Set in days / Set in hours; current number 3. Cancel → Done. No Done click performed.',
96:'Gap selector displays 30 Minutes; explanatory copy says availability plus gap determines suggested slots.',
98:'Disclaimer offers I understand → Close editor. This is a legal-template introduction, not a saved form.',
99:'General settings explicitly labels “Form title for internal use (required)”. Native required:false metadata must not be interpreted as optional. Languages, address, staff completion/review/signature, completing roles and logo settings are visible. **Phone screenshot is truly 390×844; Linework retains the desktop layout and clips horizontally rather than reflowing the editor.**',
100:'Introduction cannot be disabled. Norwegian/English language buttons, client-visible form title and introduction text are editable.',
101:'Personal details cannot be disabled; Full name is always enabled. DOB/phone/email, prefill and profile-update options appear.',
102:'Identification options: Drivers licence, Passport, National identification card, Payment card with photo, Military ID, State identification card, MitID, Birth certificate.',
104:'Procedure information includes provider/date/location and bilingual rich text about risks. Template text is captured as UI evidence, not legal or medical validation.',
106:'Medical-questionnaire editor exposes Ask/Don\'t ask per question, allergy and medical-condition sections, and custom-question actions. No question changed or added.',
107:'Required-consent statements are editable bilingual text; exact Norwegian template copy is retained below. No consent template was saved.',
109:'**Preview blocked:** “Form is not valid” appears after Preview form. This is a validation-error state, not a successfully rendered client preview. No missing content was entered just to bypass validation.',
110:'Early instructions landing snapshot contains counts only; later states 111–115 expose its loaded before/after sections.',
113:'**Loading/incomplete content-editor attempt.** This snapshot still contains only the instruction settings dialog. State 114 supersedes it with the loaded editor.',
114:'Loaded Unlayer editor: Desktop/Preview toolbar; Content/Blocks/Body; Columns, Button, Divider, Heading, Paragraph, Image, Social, Menu, HTML; blank canvas “No content here. Drag content from right.” Nothing inserted or saved.',
115:'Unsaved Tattoo aftercare template selected, After appointments timing; SMS text and title prefilled. Selecting a template exposed the editor only; no instruction was created.',
116:'“Cash register not enabled”; payment setup required.',
117:'Numeric defaults: service account 3000, product account 3100, fees 6940, bank 1920, service VAT code 3, product VAT code 3, voucher type 1. Save settings not used.',
119:'Observed trial: Studio Plan, Monthly, 790.00 NOK + VAT 197.50 NOK = 987.50 NOK; trial/end billing date 19/10/2026. Snapshot values may change; no billing mutation performed.',
120:'Invoice filters display All types/All products; “No invoices match the current filter.” Change recipient control is visible but not used.',
121:'Change plan opens Change Billing Frequency, with Monthly/Yearly and disabled Save; no price-plan catalog is evidenced.',
122:'Discount code textbox placeholder SUMMER25; Cancel → Verify (disabled). No verification or redemption performed.',
123:'Adjust Seats shows Extra Manager Seats 0; minus disabled, plus, Next disabled. No seat count changed.',
124:'Studio management lists Infinity test / Myrveien 17B Ski; Go to Dashboard and Log out are footer labels.',
125:'**Screenshot-derived labels:** “Notifications” and “No notifications yet”. These are visible in the screenshot but absent from the recorded accessible DOM. The DOM block below shows only the underlying calendar; it must not be interpreted as the notification inbox structure.',
}
def excerpt(x,key):
 s=x[key]; n=int(x['name'].split('-')[0])
 if n==124:
  marker='- banner:\n  - generic: Ibrahim Albab'
  if marker in s:s=s[s.index(marker):]
 elif n==125:
  return '(Notifications overlay exposes no text in the captured DOM. Screenshot shows “Notifications” / “No notifications yet”; underlying calendar omitted here. Full raw snapshot is in observations.json.)'
 elif '- main:' in s:s=s.split('- main:',1)[1]
 s='\n'.join(l for l in s.splitlines() if 'intercom-frame' not in l and 'Open Intercom Messenger' not in l and l.strip()!='- progressbar')
 return s.strip() or '(No main content exposed.)'
def esc(v):return str(v).replace('|','\\|').replace('\n',' ')
out=['# Linework capture notes · states 79–125',
'Continuation of [states 01–78](CAPTURE-NOTES.md), generated from the captured browser DOM in [observations.json](observations.json). These are observations, not exported Linework source code. No private application source or backend implementation was exported.',
'**Widths and layout:** desktop screenshots are approximately 1440 px. Phone screenshots are actual 390×844 captures. The app often retains desktop geometry and clips horizontally at this width, as verified in state 99; a phone image does not establish a responsive redesign. Screenshots remain the visual authority, and exact accessible labels/field metadata are transcribed below.',
'**Read-only boundary:** Save changes, Save, Done, Update URL, integration/payment connection, deletion, paid seat/plan actions and uploads were not used to persist data. Preview 109 was blocked by “Form is not valid”; state 113 is a loading attempt superseded by 114. Notifications 125 are screenshot-derived because accessible DOM lacks overlay text.',
'**Field metadata:** Native required:false means the HTML required attribute was absent, not that the business field is optional. Missing associated labels are reported explicitly; visible neighboring labels and placeholders remain in the exact DOM block. Types missing from INPUT default to text. Closed option menus do not prove their undisplayed options. Button order follows DOM reading order, not necessarily physical alignment. Shared global/settings navigation is transcribed in [the earlier appendix](CAPTURE-NOTES.md).']
for lo,hi,title,purpose,layout,dep in GROUPS:
 out += [f'\n## {title}',f'Purpose: {purpose}',f'Layout and behavior: {layout}',f'Dependencies: {dep}']
 for x in DATA:
  n=int(x['name'].split('-')[0])
  if not lo<=n<=hi:continue
  name=x['name']; d=excerpt(x,'desktop');p=excerpt(x,'phone')
  out += [f'\n### {name}',f'[Desktop](screens/{name}-desktop.png) · [Phone](screens/{name}-phone.png)',f'Observed URL: [{x["url"]}]({x["url"]})']
  if n in EXTRA:out.append(EXTRA[n])
  buttons=[l.strip().removeprefix('- ') for l in d.splitlines() if re.match(r'\s*- button\b',l)]
  if buttons:out.append('Buttons in DOM order: '+' → '.join('`'+b.replace('`','\\`')+'`' for b in buttons)+'.')
  fields=x.get('fields',[])
  if fields:
   out += ['\nNative fields (recorded order):','\n| # | Associated HTML label | Placeholder | Element / input type | Native required |','| --- | --- | --- | --- | --- |']
   for j,f in enumerate(fields,1):
    typ=f.get('type') or ('text (default)' if f.get('tag')=='INPUT' else 'not specified')
    out.append(f'| {j} | {esc(f.get("label") or "not associated")} | {esc(f.get("placeholder") or "—")} | {f.get("tag")} / {typ} | {str(f.get("required",False)).lower()} |')
  else:out.append('No native field metadata recorded for this state; accessible controls and neighboring labels follow.')
  out += ['\n<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>','\n```yaml',d,'```','</details>']
  if p!=d:out += ['\n<details><summary>Exact phone DOM (differs from desktop)</summary>','\n```yaml',p,'```','</details>']
  else:out.append('Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.')
out += ['\n## Coverage boundary','This appendix stops at state 125. Later observations belong in a subsequent appendix or the main README. Form preview, complete payment/company onboarding, existing artist detail and populated invoice/client/booking states remain outside the evidence unless separately captured.']
(BASE/'CAPTURE-NOTES-SETTINGS.md').write_text('\n\n'.join(out)+'\n')
print(f'Wrote {len(DATA)} states')
