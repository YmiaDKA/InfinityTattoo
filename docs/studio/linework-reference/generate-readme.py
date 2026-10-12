import json,re
from pathlib import Path
p=Path(__file__).parent
a=json.loads((p/'observations.json').read_text())
groups=[
('Complete your setup',list(range(1,12)),'Explains the studio preparation checklist.','Right complementary panel with expandable items, action buttons inside each item. Hide this guide forever was not used.','Logo, payments, artists, requests, forms, instructions, services, skins, products and gift-card setup.'),
('Calendar',[12,13],'Schedules artist appointments.','Mini calendar and filters at left, week time grid at right. The no-active-artists overlay blocks working booking controls; state 13 is an attempted day switch and still shows the week grid.','Active artists are required. Day view, genuine booking/time-slot detail and new-booking last step could not be reached in this trial.'),
('Tattoo requests',[14,15,16,127,128,129],'Reviews incoming tattoo booking requests.','Full page with Unreplied, Pending and Archive tabs; archive subdivides Booked, Canceled and Declined. Display preferences open a dialog with sorting and ascending/descending choices.','Online booking request acceptance and artist availability; no request detail exists in the empty trial.'),
('Notifications',[125,126],'Shows studio notifications.','Bell opens a floating panel; screenshot text is Notifications and No notifications yet. This text is absent from the accessible DOM.','Studio events; no notification item available.'),
('New deposit',[17],'Creates a client deposit/payment.','Right side panel headed New payment with client Name, Email (optional), telephone/country selector, amount, Close and disabled Add payment.','A client and amount; final creation never clicked.'),
('New sale',[18,19],'Builds a sale cart for products or gift cards.','Complementary sale/cart and Add to cart panels; Products and Gift Cards tabs. No item was added to the cart.','Retail products, gift-card configuration and payment setup; no checkout transaction inspected.'),
('Clients',[20,21,22,23,132,133,134,135],'Manages client records, deposits and submitted forms.','List/table page with client search and tabs; Add new client opens a right side panel with name, email, phone and disabled Create client. Deposit and form filters open dropdown menus.','Client records and form/deposit history; there are no clients to open.'),
('Sales',[24,25,26,27,28,29,30,144,145],'Lists recorded sales by period and seller/payment filters.','Toolbar above a table; columns Sale, Payment Type, Time, Seller, Service provider, Client, Amount. Empty copy: No sales recorded this day. Day/Week/Month/Year/Custom and custom date picker captured.','Sales, providers and cashiers; All service providers exposes no populated menu with no active artists.'),
('Gift Cards',[31,32,33,34,35,136,137,138,139,140],'Tracks gift cards and configures their online store.','Summary and list; Share gift store opens a modal with URL/QR. Store settings, card settings and terms are tabs; Customize terms opens an editor with existing textboxes.','Payment setup gates Enable store. Minimum/maximum value, validity6 months/1year/2years and expired-card payout setting observed without editing.'),
('Settlements',[36,37,38,141,142,143],'Tracks studio rent invoices and artist commissions.','Summary cards and monthly commissions; All invoices opens a new full-page table. New invoice opens Complete invoicing setup gate. Invoice period and status dropdowns captured.','Company/invoicing setup and artist commission/rent agreements. No payout execution or populated commission detail available.'),
('Reports',[41,42,43,44,130,131],'Summarizes revenue and provides report downloads.','Full-page summary cards and report actions. Revenue is the only observed report type; range menu offers Day and Month. Loaded states130/131 supersede early loading captures. CSV, Sales report and Month report labels recorded; downloads were not triggered.','Recorded sales; no alternate report tab/type was exposed by this trial.'),
('Flash',[45],'Manages shared tattoo flash designs.','Left nav Flash opens Settings > Flash; empty shared-flashes area and Copy link.','Artist/shared flash content; no flash item available.'),
('Reviews',[46],'Connects review promotion to Google Reviews.','Feature unavailable page with support/promotional actions. Contact support and I’m ready were not submitted.','Studio eligibility; unavailable for Infinity test.'),
('Artists',[47,48,49,50,51,52,53,54,55,56,146,147,148,149],'Manages artist membership and commercial agreements.','Active, Invited, Inactive and All Artists list tabs; invitation modal includes email/name/nickname, Commission based or Fixed rent, seller selection and explanatory accordions. Fixed rent interval, invoice day, VAT and due-period menus captured.','No active artists. Commission slider40%studio/60%artist, monthly/weekly rent, day1–31, VAT0/12/15/25%, due7/14/30days. Invitation was never sent; existing artist commission/rent/payout detail unavailable.'),
('Managers',[57,58,59],'Manages studio administrator access and seats.','Manager list with one primary owner; Invite manager opens seat-upgrade invitation dialog. Role dropdown shows Owner/Manager.','Paid extra manager seats; Confirm seat upgrade and send invitation not clicked.'),
('Products',[60,61,62,63],'Manages sellable retail products and categories.','List page; Add new product opens side panel with name, price including MVA, VAT and category. Manage categories opens a separate modal. VAT options25/15/12/0.','Product categories and sale/payment setup; no product or category created.'),
('Settings > Studio setup',[64,65,66,67],'Edits studio identity, SMS sender and address.','Settings subnav at left, content right; Edit opens dialogs for Studio Name, SMS handler and Studio location. SMS editor incorrectly displays Edit Studio Name; preserve observed copy.','Studio identity and client communications. No upload, address search or save performed.'),
('Settings > Theme',[68],'Selects the current user’s admin appearance.','Light/Dark and color choices with hex values; observed Light selection.','Per-user preference saves immediately, so no theme option was changed.'),
('Settings > Skins',[69],'Styles client-facing booking and payment pages.','Palette/logo controls and preview, with explicit save action.','Client booking/payment pages; no skin selected and no logo uploaded.'),
('Settings > Payment methods',[70,71],'Starts payment-provider onboarding.','Provider cards, Start now and Dintero interest action. Start now opens Add company details prerequisite dialog.','Company details and provider connection. No external connection or interest submission performed.'),
('Settings > Services',[72,73,74,75,76,77,78,79,151,152,153,154,155,156,157,158],'Defines bookable services, price, duration and providers.','Catalog grouped by category; new/custom service editor has General settings, Service providers, Pricing and taxes, Service duration, Service images and Online booking. Preset Consultation and Tattoo editors captured; Tattoo has no image section and restricts fixed/free pricing and fixed duration. Category creation/edit is modal. State153 did not open an editor;154/155 provide the successful editors.','Artists, categories, tax, tips and online booking. Native controls and exact bilingual labels are below; no service/category saved.'),
('Settings > Online booking',[80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,159],'Configures tattoo requests, direct appointments and booking-page tracking.','Tattoo requests / Direct booking / Booking page tabs; Edit dialogs for terms, sizes, color, skin, budget, reference images, note, deposit,90-day maximum,3-day minimum,30-minute gaps, URL and Meta pixel.','Open requests OFF, no active artists/direct-bookable providers. Always-required questions are coverup, body location, description and availability/other details. No toggles or settings saved.'),
('Settings > Forms',[97,98,99,100,101,102,103,104,105,106,107,108,109],'Builds bilingual digital consent and intake forms.','0/10 Created and0 Enabled; New form opens disclaimer then draft editor. Sections: General settings, Introduction, Personal details, Identification, Home address, Procedure information, Procedure description, Medical questionnaire, Required consents, Client signature. Form preview is blocked by Form is not valid.','Required internal title and valid configuration; native required metadata alone is not proof of business optionality. Draft discarded without saving. No actual client consent completed.'),
('Settings > Instructions',[110,111,112,113,114,115,160],'Builds instructions shared before or after appointments.','Two empty before/after sections,0/8 Created and0/8 Enabled. Add Instructions offers Clean Slate/Create From Scratch or Tattoo aftercare template. Editor contains content, name, sharing timing, SMS and email subject. Add content opens Unlayer iframe builder with Content/Blocks/Body tools.','Services/appointment delivery and message templates. Cancel/discard affected only an unsaved draft; loaded state160 confirms no persisted instructions.'),
('Settings > Cash Register',[116],'Enables the studio cash register.','Prerequisite/disabled page.','Payment methods must be enabled; operational register screens unavailable.'),
('Settings > Company details',[39,40],'Provides legal company details for payments, cash register and invoicing.','Start company setup opens organization-number dialog with Go!, explanation and Cancel.','Company lookup/registration. No organization number submitted.'),
('Settings > Integrations',[117],'Connects accounting services and configures export accounts.','Fiken integration card and GBAT10 mapping fields; observed Service3000, Product3100, Fee6940, Bank1920, VATcodes3/3 and voucher1.','External accounting credentials/connection; Start integration and Save settings not clicked.'),
('Settings > Client support',[118],'Sets client-facing studio support contact details.','Phone/email fields with Save.','Booking and client messages. Values untouched.'),
('Settings > Subscription & Billing',[119,120,121,122,123,161,162,163],'Manages subscription, manager seats and billing invoices.','Subscriptions / Invoices tabs. Change plan opens monthly/yearly billing choice; discount code editor, seat adjustment, invoice type/products filters and billing email dialog captured.','Trial Studio Plan790NOK+25%VAT=987.50NOK monthly,0 extra seats, no card. Update Card and Cancel Trial were not clicked; no billing changes or verifications submitted.'),
('Studio switcher and account dashboard',[124,150],'Switches between studio/account workspaces.','Top-left identity opens account menu with Go Dashboard and Logout. Dashboard shows Welcome back, Ibrahim, artist and studio account cards with Launch, New Studio Account and Learning center.','Current user membership. Only Infinity test studio was launched; unrelated Test artist account and New Studio Account were not opened.')
]
text='''# Linework studio reference

Captured **12 October 2026**, signed-in **Infinity test** trial studio, through the user’s existing Chrome session. **163 recorded states / 326 PNG screenshots** at **1440×1000 desktop** and **390×844 phone**. These are viewport screenshots; long pages have DOM text beyond the viewport and selected supplementary scroll captures. Phone images show the actual narrow layout, including clipping/overflow, rather than a redesigned mobile mockup.

The browser work was read-only: no persisted data, settings, invitations, payment connections, uploads, purchases or billing changes were made. All opened drafts were closed/canceled. The original working checkout was preserved; this documentation was prepared in an isolated checkout of the requested PR branch.

## How to use this reference

Start with the page sections below. Each state has both screenshots and an expandable exact accessible UI transcript; form metadata supplies observed native type/required/options. Screenshots are the authority for visual placement. DOM order records control order, not necessarily horizontal visual order. `required: false` means no native HTML required attribute, not that business validation considers the field optional. Hidden inputs and unnamed controls are retained as evidence, not recommended implementation labels.

Detailed interpretation: [states01–78](CAPTURE-NOTES.md), [settings79–125](CAPTURE-NOTES-SETTINGS.md), [extras126–163](CAPTURE-NOTES-EXTRAS.md). Machine-readable rendered UI export: [observations.json](observations.json). A sampled geometry/font/color export from the Instructions page: [ui-metrics.json](ui-metrics.json). These exports describe the rendered UI; **Linework application/backend source code was not exported**.

Methods followed: [Appllama skills](https://github.com/Appllama/appllama-skills) (`appllama-usage`, research methods: page/flow inventory and visual evidence) and [REA](https://github.com/morluto/rea) (`reverse-engineer-anything`, runtime observation: separate observation, inference and unknowns). Their optional MCP services were not connected; browser computer use supplied the evidence. No decompilation or private API requests were used.

## Full observed navigation tree

```text
Account dashboard
  Learning center
  Artist account: Test → Launch (not opened)
  Studio account: Infinity test → Launch
  New Studio Account (not opened)
Studio shell
  Top-left studio/account menu → Go Dashboard, Logout
  Top bar → Tattoo requests, notifications bell, New deposit, New sale
  Complete your setup
    Add your studio logo
    Get started with payments
    Invite your artists
    Start accepting requests
    Stay protected with forms
    Inform with instructions
    Add more services
    Make it yours
    Add products to sell
    Start selling gift cards
  Calendar → week, day (blocked), booking/time slot (blocked)
  Clients → clients, deposits, forms
  Financials
    Sales
    Gift Cards → share/store settings/card settings/terms
    Settlements → all invoices/new invoice/studio commissions
    Reports → Revenue → Day, Month
  News → Flash (NEW) → Settings > Flash
  Marketing → Reviews
  Artists → Active, Invited, Inactive, All Artists → Invite artist
  Managers → Invite manager
  Products → Add new product, Manage categories
  Settings
    Studio setup → studio name/SMS handler/location edits
    Theme
    Skins
    Payment methods
    Services → category/create/custom/preset editors
      General settings, Service providers, Pricing and taxes
      Service duration, Service images (custom), Online booking
    Flash
    Online booking → Tattoo requests, Direct booking, Booking page
    Forms → new draft → 10 editor sections
    Instructions → before/after → new/template/content editor
    Cash Register
    Company details → company setup
    Integrations → Fiken, GBAT10
    Client support
    Subscription & Billing → Subscriptions, Invoices
  Get help / Intercom Messenger (support communication not opened)
```

## Coverage limits and evidence quality

- **Calendar day, booking/time-slot detail and complete new booking:** blocked by “You have no active artists in your studio”. State13 is an unsuccessful day-view attempt, not day-view evidence. No artist was created/invited to bypass this.
- **Existing client, request, gift-card, sale, invoice and artist detail:** no corresponding records in the trial. Empty states and reachable creation drafts/filter menus are documented instead. Artist payout execution and populated commission/rent detail remain unknown.
- **Payments, register, company/invoice setup and integrations:** captured prerequisite screens; onboarding/connection steps requiring submission were not taken. Update Card, Cancel Trial, Dintero interest and review-support requests were not submitted.
- **Reviews:** unavailable for this studio. **Form preview:** blocked by invalid blank draft; no valid saved form/client signature page captured.
- **Reports:** only Revenue with Day/Month was exposed; a click did not reveal other report types. No invented report tabs.
- Initial loading/unsuccessful captures remain traceable. Prefer loaded126,130,131,132,136,160 over125,41/44,20,31,110 respectively. State38 is an intermediate loading page;39/40 document company setup. State113 loads the editor shown in114. State153 leaves the service list;154/155 show actual preset editors.
- Viewport captures do not show every vertical row of long forms at once. Exact text is in the transcript, with all form sections individually opened. This is a reference for the reachable trial UI, not proof of inaccessible production features.

'''
for title,ids,purpose,layout,deps in groups:
 text+=f'## {title}\n\n**Purpose:** {purpose}\n\n**Layout and behavior:** {layout}\n\n**Dependencies and boundaries:** {deps}\n\n'
 for n in ids:
  x=a[n-1]; name=x['name']; notes='CAPTURE-NOTES.md' if n<=78 else 'CAPTURE-NOTES-SETTINGS.md' if n<=125 else 'CAPTURE-NOTES-EXTRAS.md'
  text+=f'### {name}\n\n[Desktop](screens/{name}-desktop.png) · [Phone](screens/{name}-phone.png) · [Detailed notes]({notes}#{name})\n\nObserved URL: `{x["url"]}`\n\n'
  snap=x['desktop']; start=snap.find('- main:')
  if start>=0:snap=snap[start:]
  elif '- button "Complete your setup":' in snap:
   start=snap.find('\n',snap.find('  - generic: Complete your setup',snap.find('- button "Complete your setup":')))
   if start>=0:snap=snap[start+1:]
  snap=re.sub(r'- progressbar\n|- iframe \[id="intercom-frame"\]\n|- button "Open Intercom Messenger":\n?','',snap)
  text+='<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>\n\n```yaml\n'+snap.strip()+'\n```\n\n</details>\n\n'
  if x.get('fields'):
   text+='<details><summary>Observed native field types, required attributes and select options</summary>\n\n```json\n'+json.dumps(x['fields'],ensure_ascii=False,indent=2)+'\n```\n\n</details>\n\n'
text+='## Mapping to Infinity Studio\n\nSource snapshot `47b1ea6bd96f531b135fba1c3d1a56a2c1cd9582`. This compares source routes, not a running visual render. `different layout` means an analogous capability exists without established UI parity; `missing` means no equivalent functioning page was found. No unsupported `match` claims. Full route inventory and field comparison: [studio-route-map.md](studio-route-map.md). Recheck source after the other agent’s changes.\n\n'
m=(p/'studio-route-map.md').read_text();text+=m.split('## Linework-to-Studio comparison\n\n')[1].split('\n## Complete GET route inventory')[0]+'\n'
(p/'README.md').write_text(text.rstrip()+'\n')
print('README sections',len(groups),'states',sum(len(g[1]) for g in groups),'bytes',len(text.encode()))
