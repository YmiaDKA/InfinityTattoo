# Linework capture notes · states 01–78

These notes summarize the recorded browser DOM in [observations.json](observations.json). The screenshots are the authority for visual geometry. Desktop is approximately 1440 px; phone is approximately 390 px. State names describe attempted navigation and do not guarantee that the requested state finished rendering. No underlying Linework source code was exported.

**Booking blocker:** the studio shows “You have no active artists in your studio”. Consequently, successful artist day view, a genuine booking opened from the calendar, and the complete new-booking flow are not evidenced in states 01–78. No artist was invited merely to bypass this read-only limitation. State 13 still shows the week grid. No existing client can be opened because the client list is empty.

**Reading fields:** the tables reproduce native DOM field metadata. `required: false` means the HTML required attribute was absent, **not** that the business field is optional. A missing label means the extractor found no associated HTML label; nearby exact visible labels/placeholders remain in the DOM blocks. Input types absent from HTML default to text. Hidden inputs are implementation details; dropdown options are documented only when actually exposed. Button sequence below follows DOM order, which may differ from visual alignment.

**Shared shell labels:** Calendar; Clients; Financials → Sales, Gift Cards, Settlements, Reports; News → Flash (NEW); Marketing → Reviews; Artists; Managers; Products; Settings; Get help. Top actions: Tattoo requests → New deposit → New sale → Complete your setup. Settings sub-navigation: Studio setup → Theme → Skins → Payment methods → Services → Flash → Online booking → Forms → Instructions → Cash Register → Company details → Integrations → Client support → Subscription & Billing. These labels are exact; each state excerpt omits the repeated shared shell.


## Complete your setup

Purpose: Explains the steps needed to prepare the studio for clients.

Layout and behavior: A complementary setup panel overlays the calendar; each checklist item expands an inline region with its call to action.

Dependencies: Each item leads to its relevant studio/payment/artist/booking/form/instruction/service/skin/product/gift-card settings.


### 01-setup-panel

[Desktop](screens/01-setup-panel-desktop.png) · [Phone](screens/01-setup-panel-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button "Invite your artists":` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button "Add more services":` → `button "Make it yours":` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 02-setup-logo

[Desktop](screens/02-setup-logo-desktop.png) · [Phone](screens/02-setup-logo-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo" [expanded] [active]:` → `button "Let's do it"` → `button "Get started with payments":` → `button "Invite your artists":` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button "Add more services":` → `button "Make it yours":` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo" [expanded] [active]:
    - generic: Add your studio logo
  - region "Add your studio logo":
    - generic: Showcase your brand with your logo.
    - button "Let's do it"
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 03-setup-get-started-with-payments

[Desktop](screens/03-setup-get-started-with-payments-desktop.png) · [Phone](screens/03-setup-get-started-with-payments-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button: Let's do it` → `button "Get started with payments" [expanded] [active]:` → `button "Let's do it"` → `button "Invite your artists":` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button "Add more services":` → `button "Make it yours":` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - region:
    - generic: Showcase your brand with your logo.
    - button: Let's do it
  - button "Get started with payments" [expanded] [active]:
    - generic: Get started with payments
  - region "Get started with payments":
    - generic: Enable payment methods to start collecting payments.
    - button "Let's do it"
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments" [expanded] [active]:
    - generic: Get started with payments
  - region "Get started with payments":
    - generic: Enable payment methods to start collecting payments.
    - button "Let's do it"
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


### 04-setup-invite-your-artists

[Desktop](screens/04-setup-invite-your-artists-desktop.png) · [Phone](screens/04-setup-invite-your-artists-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button: Let's do it` → `button "Invite your artists" [expanded] [active]:` → `button "Let's do it"` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button "Add more services":` → `button "Make it yours":` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - region:
    - generic: Enable payment methods to start collecting payments.
    - button: Let's do it
  - button "Invite your artists" [expanded] [active]:
    - generic: Invite your artists
  - region "Invite your artists":
    - generic: Connect artists to co-manage appointments and collect payments for services provided at the studio.
    - button "Let's do it"
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists" [expanded] [active]:
    - generic: Invite your artists
  - region "Invite your artists":
    - generic: Connect artists to co-manage appointments and collect payments for services provided at the studio.
    - button "Let's do it"
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


### 05-setup-start-accepting-requests

[Desktop](screens/05-setup-start-accepting-requests-desktop.png) · [Phone](screens/05-setup-start-accepting-requests-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button "Invite your artists":` → `button: Let's do it` → `button "Start accepting requests" [expanded] [active]:` → `button "Let's do it"` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button "Add more services":` → `button "Make it yours":` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - region:
    - generic: Connect artists to co-manage appointments and collect payments for services provided at the studio.
    - button: Let's do it
  - button "Start accepting requests" [expanded] [active]:
    - generic: Start accepting requests
  - region "Start accepting requests":
    - generic: Share your booking link and get requests for tattoo appointments directly in the calendar.
    - button "Let's do it"
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests" [expanded] [active]:
    - generic: Start accepting requests
  - region "Start accepting requests":
    - generic: Share your booking link and get requests for tattoo appointments directly in the calendar.
    - button "Let's do it"
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


### 06-setup-stay-protected-with-forms

[Desktop](screens/06-setup-stay-protected-with-forms-desktop.png) · [Phone](screens/06-setup-stay-protected-with-forms-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button "Invite your artists":` → `button "Start accepting requests":` → `button: Let's do it` → `button "Stay protected with forms" [expanded] [active]:` → `button "Let's do it"` → `button "Inform with instructions":` → `button "Add more services":` → `button "Make it yours":` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - region:
    - generic: Share your booking link and get requests for tattoo appointments directly in the calendar.
    - button: Let's do it
  - button "Stay protected with forms" [expanded] [active]:
    - generic: Stay protected with forms
  - region "Stay protected with forms":
    - generic: Create a form for clients to complete before appointments.
    - button "Let's do it"
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms" [expanded] [active]:
    - generic: Stay protected with forms
  - region "Stay protected with forms":
    - generic: Create a form for clients to complete before appointments.
    - button "Let's do it"
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


### 07-setup-inform-with-instructions

[Desktop](screens/07-setup-inform-with-instructions-desktop.png) · [Phone](screens/07-setup-inform-with-instructions-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button "Invite your artists":` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button: Let's do it` → `button "Inform with instructions" [expanded] [active]:` → `button "Let's do it"` → `button "Add more services":` → `button "Make it yours":` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - region:
    - generic: Create a form for clients to complete before appointments.
    - button: Let's do it
  - button "Inform with instructions" [expanded] [active]:
    - generic: Inform with instructions
  - region "Inform with instructions":
    - generic: Create an instruction to send to clients after appointments.
    - button "Let's do it"
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - generic: Create a form for clients to complete before appointments.
  - button: Let's do it
  - button "Inform with instructions" [expanded] [active]:
    - generic: Inform with instructions
  - region "Inform with instructions":
    - generic: Create an instruction to send to clients after appointments.
    - button "Let's do it"
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


### 08-setup-add-more-services

[Desktop](screens/08-setup-add-more-services-desktop.png) · [Phone](screens/08-setup-add-more-services-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button "Invite your artists":` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button: Let's do it` → `button "Add more services" [expanded] [active]:` → `button "Let's do it"` → `button "Make it yours":` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - region:
    - generic: Create an instruction to send to clients after appointments.
    - button: Let's do it
  - button "Add more services" [expanded] [active]:
    - generic: Add more services
  - region "Add more services":
    - generic: Add the services you need to support your business.
    - button "Let's do it"
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services" [expanded] [active]:
    - generic: Add more services
  - region "Add more services":
    - generic: Add the services you need to support your business.
    - button "Let's do it"
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


### 09-setup-make-it-yours

[Desktop](screens/09-setup-make-it-yours-desktop.png) · [Phone](screens/09-setup-make-it-yours-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button "Invite your artists":` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button "Add more services":` → `button: Let's do it` → `button "Make it yours" [expanded] [active]:` → `button "Let's do it"` → `button "Add products to sell":` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - region:
    - generic: Add the services you need to support your business.
    - button: Let's do it
  - button "Make it yours" [expanded] [active]:
    - generic: Make it yours
  - region "Make it yours":
    - generic: Choose a theme for your dashboard. Changes apply only to you and sync across your devices.
    - button "Let's do it"
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours" [expanded] [active]:
    - generic: Make it yours
  - region "Make it yours":
    - generic: Choose a theme for your dashboard. Changes apply only to you and sync across your devices.
    - button "Let's do it"
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


### 10-setup-add-products-to-sell

[Desktop](screens/10-setup-add-products-to-sell-desktop.png) · [Phone](screens/10-setup-add-products-to-sell-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button "Invite your artists":` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button "Add more services":` → `button "Make it yours":` → `button: Let's do it` → `button "Add products to sell" [expanded] [active]:` → `button "Let's do it"` → `button "Start selling gift cards":` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - region:
    - generic: Choose a theme for your dashboard. Changes apply only to you and sync across your devices.
    - button: Let's do it
  - button "Add products to sell" [expanded] [active]:
    - generic: Add products to sell
  - region "Add products to sell":
    - generic: Add products to sell to your clients.
    - button "Let's do it"
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell" [expanded] [active]:
    - generic: Add products to sell
  - region "Add products to sell":
    - generic: Add products to sell to your clients.
    - button "Let's do it"
  - generic: What you can do next
  - button "Start selling gift cards":
    - generic: Start selling gift cards
  - button "Hide this guide forever"

```

</details>


### 11-setup-start-selling-gift-cards

[Desktop](screens/11-setup-start-selling-gift-cards-desktop.png) · [Phone](screens/11-setup-start-selling-gift-cards-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button:` → `button "Add your studio logo":` → `button "Get started with payments":` → `button "Invite your artists":` → `button "Start accepting requests":` → `button "Stay protected with forms":` → `button "Inform with instructions":` → `button "Add more services":` → `button "Make it yours":` → `button "Add products to sell":` → `button: Let's do it` → `button "Start selling gift cards" [expanded] [active]:` → `button "Get started with payments"` → `button "Hide this guide forever"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - region:
    - generic: Add products to sell to your clients.
    - button: Let's do it
  - generic: What you can do next
  - button "Start selling gift cards" [expanded] [active]:
    - generic: Start selling gift cards
  - region "Start selling gift cards":
    - generic: You need to set up payments before you can sell gift cards.
    - button "Get started with payments"
  - button "Hide this guide forever"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- complementary:
  - generic: Complete your setup
  - button:
  - generic: What you can do now
  - button "Add your studio logo":
    - generic: Add your studio logo
  - button "Get started with payments":
    - generic: Get started with payments
  - button "Invite your artists":
    - generic: Invite your artists
  - button "Start accepting requests":
    - generic: Start accepting requests
  - button "Stay protected with forms":
    - generic: Stay protected with forms
  - button "Inform with instructions":
    - generic: Inform with instructions
  - button "Add more services":
    - generic: Add more services
  - button "Make it yours":
    - generic: Make it yours
  - button "Add products to sell":
    - generic: Add products to sell
  - generic: What you can do next
  - button "Start selling gift cards" [expanded] [active]:
    - generic: Start selling gift cards
  - region "Start selling gift cards":
    - generic: You need to set up payments before you can sell gift cards.
    - button "Get started with payments"
  - button "Hide this guide forever"

```

</details>


## Calendar

Purpose: Shows appointments and availability by calendar period.

Layout and behavior: Calendar toolbar, complementary month selector and seven date/time columns; screenshots show the desktop and narrow-width treatment.

Dependencies: Active artists are required to inspect real booking and artist availability flows.


### 12-calendar-week

[Desktop](screens/12-calendar-week-desktop.png) · [Phone](screens/12-calendar-week-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Observed week range: 12 - 18. Oct 2026, Week 42. Empty calendar includes an internal-looking “dummyForBug” event; do not treat this as a genuine client booking.

Buttons in DOM order: `button "Complete your setup":` → `button "Invite and manage your artists"` → `button:` → `button "Today":` → `button:` → `button:` → `button "Day":` → `button "Week":` → `button:` → `button:` → `button "23:59 - 00:00":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- button "Complete your setup":
  - generic: Complete your setup
- generic: You have no active artists in your studio
- button "Invite and manage your artists"
- button:
- button "Today":
  - generic: Today
- button:
- button:
- generic: 12 - 18. Oct 2026
- generic: Week 42
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- complementary:
  - generic: October 2026
  - button:
  - button:
  - grid:
        - generic: M
        - generic: T
        - generic: W
        - generic: T
        - generic: F
        - generic: S
        - generic: S
- link "Monday 12. Oct":
  - /url: "#"
  - generic: Monday
  - generic: 12. Oct
- link "Tuesday 13. Oct":
  - /url: "#"
  - generic: Tuesday
  - generic: 13. Oct
- link "Wednesday 14. Oct":
  - /url: "#"
  - generic: Wednesday
  - generic: 14. Oct
- link "Thursday 15. Oct":
  - /url: "#"
  - generic: Thursday
  - generic: 15. Oct
- link "Friday 16. Oct":
  - /url: "#"
  - generic: Friday
  - generic: 16. Oct
- link "Saturday 17. Oct":
  - /url: "#"
  - generic: Saturday
  - generic: 17. Oct
- link "Sunday 18. Oct":
  - /url: "#"
  - generic: Sunday
  - generic: 18. Oct
- 'generic "23:59 – 23:59: dummyForBug"':
  - button "23:59 - 00:00":

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 13-calendar-day

[Desktop](screens/13-calendar-day-desktop.png) · [Phone](screens/13-calendar-day-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

**Attempted day state only.** This capture still shows 12 - 18. Oct 2026, Week 42 and seven weekday links; desktop DOM is identical to state 12. Successful day rendering is not evidenced.

Buttons in DOM order: `button "Complete your setup":` → `button "Invite and manage your artists"` → `button:` → `button "Today":` → `button:` → `button:` → `button "Day":` → `button "Week":` → `button:` → `button:` → `button "23:59 - 00:00":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- button "Complete your setup":
  - generic: Complete your setup
- generic: You have no active artists in your studio
- button "Invite and manage your artists"
- button:
- button "Today":
  - generic: Today
- button:
- button:
- generic: 12 - 18. Oct 2026
- generic: Week 42
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- complementary:
  - generic: October 2026
  - button:
  - button:
  - grid:
        - generic: M
        - generic: T
        - generic: W
        - generic: T
        - generic: F
        - generic: S
        - generic: S
- link "Monday 12. Oct":
  - /url: "#"
  - generic: Monday
  - generic: 12. Oct
- link "Tuesday 13. Oct":
  - /url: "#"
  - generic: Tuesday
  - generic: 13. Oct
- link "Wednesday 14. Oct":
  - /url: "#"
  - generic: Wednesday
  - generic: 14. Oct
- link "Thursday 15. Oct":
  - /url: "#"
  - generic: Thursday
  - generic: 15. Oct
- link "Friday 16. Oct":
  - /url: "#"
  - generic: Friday
  - generic: 16. Oct
- link "Saturday 17. Oct":
  - /url: "#"
  - generic: Saturday
  - generic: 17. Oct
- link "Sunday 18. Oct":
  - /url: "#"
  - generic: Sunday
  - generic: 18. Oct
- 'generic "23:59 – 23:59: dummyForBug"':
  - button "23:59 - 00:00":

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Tattoo requests

Purpose: Organizes tattoo enquiries by response and booking outcome.

Layout and behavior: Request view appears over the existing calendar; tablist and selected tabpanel hold the empty-state content.

Dependencies: Requests and artist availability; trial contains no requests.


### 14-tattoo-requests

[Desktop](screens/14-tattoo-requests-desktop.png) · [Phone](screens/14-tattoo-requests-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button "New deposit":` → `button "New sale":` → `button "Complete your setup":` → `button "Invite and manage your artists"` → `button:` → `button "Today":` → `button:` → `button:` → `button "Day":` → `button "Week":` → `button:` → `button:` → `button "23:59 - 00:00":` → `button:` → `button:` → `button "By Time submitted, Newest first":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Tattoo requests
- button "New deposit":
  - generic: New deposit
- button "New sale":
  - generic: New sale
- button "Complete your setup":
  - generic: Complete your setup
- generic: You have no active artists in your studio
- button "Invite and manage your artists"
- button:
- button "Today":
  - generic: Today
- button:
- button:
- generic: 12 - 18. Oct 2026
- generic: Week 42
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- complementary:
  - generic: October 2026
  - button:
  - button:
  - grid:
    - rowgroup:
      - row "M T W T F S S":
        - generic: M
        - generic: T
        - generic: W
        - generic: T
        - generic: F
        - generic: S
        - generic: S
    - rowgroup:
      - row "40 Monday, 28. September 2026 Tuesday, 29. September 2026 Wednesday, 30. September 2026 Thursday, 1. October 2026 Friday, 2. October 2026 Saturday, 3. October 2026 Sunday, 4. October 2026":
        - gridcell "40"
        - gridcell "Monday, 28. September 2026" [disabled]: "28"
        - gridcell "Tuesday, 29. September 2026" [disabled]: "29"
        - gridcell "Wednesday, 30. September 2026" [disabled]: "30"
        - gridcell "Thursday, 1. October 2026": "1"
        - gridcell "Friday, 2. October 2026": "2"
        - gridcell "Saturday, 3. October 2026": "3"
        - gridcell "Sunday, 4. October 2026": "4"
      - row "41 Monday, 5. October 2026 Tuesday, 6. October 2026 Wednesday, 7. October 2026 Thursday, 8. October 2026 Friday, 9. October 2026 Saturday, 10. October 2026 Sunday, 11. October 2026":
        - gridcell "41"
        - gridcell "Monday, 5. October 2026": "5"
        - gridcell "Tuesday, 6. October 2026": "6"
        - gridcell "Wednesday, 7. October 2026": "7"
        - gridcell "Thursday, 8. October 2026": "8"
        - gridcell "Friday, 9. October 2026": "9"
        - gridcell "Saturday, 10. October 2026": "10"
        - gridcell "Sunday, 11. October 2026": "11"
      - row "42 Monday, 12. October 2026 Tuesday, 13. October 2026 Wednesday, 14. October 2026 Thursday, 15. October 2026 Friday, 16. October 2026 Saturday, 17. October 2026 Sunday, 18. October 2026":
        - gridcell "42"
        - gridcell "Monday, 12. October 2026" [selected]: "12"
        - gridcell "Tuesday, 13. October 2026" [selected]: "13"
        - gridcell "Wednesday, 14. October 2026" [selected]: "14"
        - gridcell "Thursday, 15. October 2026" [selected]: "15"
        - gridcell "Friday, 16. October 2026" [selected]: "16"
        - gridcell "Saturday, 17. October 2026" [selected]: "17"
        - gridcell "Sunday, 18. October 2026" [selected]: "18"
      - row "43 Monday, 19. October 2026 Tuesday, 20. October 2026 Wednesday, 21. October 2026 Thursday, 22. October 2026 Friday, 23. October 2026 Saturday, 24. October 2026 Sunday, 25. October 2026":
        - gridcell "43"
        - gridcell "Monday, 19. October 2026": "19"
        - gridcell "Tuesday, 20. October 2026": "20"
        - gridcell "Wednesday, 21. October 2026": "21"
        - gridcell "Thursday, 22. October 2026": "22"
        - gridcell "Friday, 23. October 2026": "23"
        - gridcell "Saturday, 24. October 2026": "24"
        - gridcell "Sunday, 25. October 2026": "25"
      - row "44 Monday, 26. October 2026 Tuesday, 27. October 2026 Wednesday, 28. October 2026 Thursday, 29. October 2026 Friday, 30. October 2026 Saturday, 31. October 2026 Sunday, 1. November 2026":
        - gridcell "44"
        - gridcell "Monday, 26. October 2026": "26"
        - gridcell "Tuesday, 27. October 2026": "27"
        - gridcell "Wednesday, 28. October 2026": "28"
        - gridcell "Thursday, 29. October 2026": "29"
        - gridcell "Friday, 30. October 2026": "30"
        - gridcell "Saturday, 31. October 2026": "31"
        - gridcell "Sunday, 1. November 2026" [disabled]: "1"
- link "Monday 12. Oct":
  - /url: "#"
  - generic: Monday
  - generic: 12. Oct
- link "Tuesday 13. Oct":
  - /url: "#"
  - generic: Tuesday
  - generic: 13. Oct
- link "Wednesday 14. Oct":
  - /url: "#"
  - generic: Wednesday
  - generic: 14. Oct
- link "Thursday 15. Oct":
  - /url: "#"
  - generic: Thursday
  - generic: 15. Oct
- link "Friday 16. Oct":
  - /url: "#"
  - generic: Friday
  - generic: 16. Oct
- link "Saturday 17. Oct":
  - /url: "#"
  - generic: Saturday
  - generic: 17. Oct
- link "Sunday 18. Oct":
  - /url: "#"
  - generic: Sunday
  - generic: 18. Oct
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- 'generic "23:59 – 23:59: dummyForBug"':
  - button "23:59 - 00:00":
    - generic: 23:59 - 00:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- complementary:
  - generic: Tattoo requests
  - button:
  - button:
  - generic: All Requests
  - tablist:
    - tab "Unreplied 0" [selected]:
      - generic: Unreplied
      - generic: "0"
    - tab "Pending 0":
      - generic: Pending
      - generic: "0"
    - tab "Archive":
      - generic: Archive
  - tabpanel "Unreplied 0":
    - button "By Time submitted, Newest first":
      - generic: By Time submitted, Newest first
    - separator
    - generic: Nothing to see here

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 15-requests-pending

[Desktop](screens/15-requests-pending-desktop.png) · [Phone](screens/15-requests-pending-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button "New deposit":` → `button "New sale":` → `button "Complete your setup":` → `button "Invite and manage your artists"` → `button:` → `button "Today":` → `button:` → `button:` → `button "Day":` → `button "Week":` → `button:` → `button:` → `button "23:59 - 00:00":` → `button:` → `button:`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Tattoo requests
- button "New deposit":
  - generic: New deposit
- button "New sale":
  - generic: New sale
- button "Complete your setup":
  - generic: Complete your setup
- generic: You have no active artists in your studio
- button "Invite and manage your artists"
- button:
- button "Today":
  - generic: Today
- button:
- button:
- generic: 12 - 18. Oct 2026
- generic: Week 42
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- complementary:
  - generic: October 2026
  - button:
  - button:
  - grid:
    - rowgroup:
      - row "M T W T F S S":
        - generic: M
        - generic: T
        - generic: W
        - generic: T
        - generic: F
        - generic: S
        - generic: S
    - rowgroup:
      - row "40 Monday, 28. September 2026 Tuesday, 29. September 2026 Wednesday, 30. September 2026 Thursday, 1. October 2026 Friday, 2. October 2026 Saturday, 3. October 2026 Sunday, 4. October 2026":
        - gridcell "40"
        - gridcell "Monday, 28. September 2026" [disabled]: "28"
        - gridcell "Tuesday, 29. September 2026" [disabled]: "29"
        - gridcell "Wednesday, 30. September 2026" [disabled]: "30"
        - gridcell "Thursday, 1. October 2026": "1"
        - gridcell "Friday, 2. October 2026": "2"
        - gridcell "Saturday, 3. October 2026": "3"
        - gridcell "Sunday, 4. October 2026": "4"
      - row "41 Monday, 5. October 2026 Tuesday, 6. October 2026 Wednesday, 7. October 2026 Thursday, 8. October 2026 Friday, 9. October 2026 Saturday, 10. October 2026 Sunday, 11. October 2026":
        - gridcell "41"
        - gridcell "Monday, 5. October 2026": "5"
        - gridcell "Tuesday, 6. October 2026": "6"
        - gridcell "Wednesday, 7. October 2026": "7"
        - gridcell "Thursday, 8. October 2026": "8"
        - gridcell "Friday, 9. October 2026": "9"
        - gridcell "Saturday, 10. October 2026": "10"
        - gridcell "Sunday, 11. October 2026": "11"
      - row "42 Monday, 12. October 2026 Tuesday, 13. October 2026 Wednesday, 14. October 2026 Thursday, 15. October 2026 Friday, 16. October 2026 Saturday, 17. October 2026 Sunday, 18. October 2026":
        - gridcell "42"
        - gridcell "Monday, 12. October 2026" [selected]: "12"
        - gridcell "Tuesday, 13. October 2026" [selected]: "13"
        - gridcell "Wednesday, 14. October 2026" [selected]: "14"
        - gridcell "Thursday, 15. October 2026" [selected]: "15"
        - gridcell "Friday, 16. October 2026" [selected]: "16"
        - gridcell "Saturday, 17. October 2026" [selected]: "17"
        - gridcell "Sunday, 18. October 2026" [selected]: "18"
      - row "43 Monday, 19. October 2026 Tuesday, 20. October 2026 Wednesday, 21. October 2026 Thursday, 22. October 2026 Friday, 23. October 2026 Saturday, 24. October 2026 Sunday, 25. October 2026":
        - gridcell "43"
        - gridcell "Monday, 19. October 2026": "19"
        - gridcell "Tuesday, 20. October 2026": "20"
        - gridcell "Wednesday, 21. October 2026": "21"
        - gridcell "Thursday, 22. October 2026": "22"
        - gridcell "Friday, 23. October 2026": "23"
        - gridcell "Saturday, 24. October 2026": "24"
        - gridcell "Sunday, 25. October 2026": "25"
      - row "44 Monday, 26. October 2026 Tuesday, 27. October 2026 Wednesday, 28. October 2026 Thursday, 29. October 2026 Friday, 30. October 2026 Saturday, 31. October 2026 Sunday, 1. November 2026":
        - gridcell "44"
        - gridcell "Monday, 26. October 2026": "26"
        - gridcell "Tuesday, 27. October 2026": "27"
        - gridcell "Wednesday, 28. October 2026": "28"
        - gridcell "Thursday, 29. October 2026": "29"
        - gridcell "Friday, 30. October 2026": "30"
        - gridcell "Saturday, 31. October 2026": "31"
        - gridcell "Sunday, 1. November 2026" [disabled]: "1"
- link "Monday 12. Oct":
  - /url: "#"
  - generic: Monday
  - generic: 12. Oct
- link "Tuesday 13. Oct":
  - /url: "#"
  - generic: Tuesday
  - generic: 13. Oct
- link "Wednesday 14. Oct":
  - /url: "#"
  - generic: Wednesday
  - generic: 14. Oct
- link "Thursday 15. Oct":
  - /url: "#"
  - generic: Thursday
  - generic: 15. Oct
- link "Friday 16. Oct":
  - /url: "#"
  - generic: Friday
  - generic: 16. Oct
- link "Saturday 17. Oct":
  - /url: "#"
  - generic: Saturday
  - generic: 17. Oct
- link "Sunday 18. Oct":
  - /url: "#"
  - generic: Sunday
  - generic: 18. Oct
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- 'generic "23:59 – 23:59: dummyForBug"':
  - button "23:59 - 00:00":
    - generic: 23:59 - 00:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- complementary:
  - generic: Tattoo requests
  - button:
  - button:
  - generic: All Requests
  - tablist:
    - tab "Unreplied 0":
      - generic: Unreplied
      - generic: "0"
    - tab "Pending 0" [active] [selected]:
      - generic: Pending
      - generic: "0"
    - tab "Archive":
      - generic: Archive
  - tabpanel "Pending 0":
    - generic: Nothing to see here

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 16-requests-archive

[Desktop](screens/16-requests-archive-desktop.png) · [Phone](screens/16-requests-archive-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Archive exposes Booked, Canceled and Declined subtabs; only Booked is selected in this state. Other subtabs are labels, not independently captured results.

Buttons in DOM order: `button "New deposit":` → `button "New sale":` → `button "Complete your setup":` → `button "Invite and manage your artists"` → `button:` → `button "Today":` → `button:` → `button:` → `button "Day":` → `button "Week":` → `button:` → `button:` → `button "23:59 - 00:00":` → `button:` → `button:`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Tattoo requests
- button "New deposit":
  - generic: New deposit
- button "New sale":
  - generic: New sale
- button "Complete your setup":
  - generic: Complete your setup
- generic: You have no active artists in your studio
- button "Invite and manage your artists"
- button:
- button "Today":
  - generic: Today
- button:
- button:
- generic: 12 - 18. Oct 2026
- generic: Week 42
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- complementary:
  - generic: October 2026
  - button:
  - button:
  - grid:
    - rowgroup:
      - row "M T W T F S S":
        - generic: M
        - generic: T
        - generic: W
        - generic: T
        - generic: F
        - generic: S
        - generic: S
    - rowgroup:
      - row "40 Monday, 28. September 2026 Tuesday, 29. September 2026 Wednesday, 30. September 2026 Thursday, 1. October 2026 Friday, 2. October 2026 Saturday, 3. October 2026 Sunday, 4. October 2026":
        - gridcell "40"
        - gridcell "Monday, 28. September 2026" [disabled]: "28"
        - gridcell "Tuesday, 29. September 2026" [disabled]: "29"
        - gridcell "Wednesday, 30. September 2026" [disabled]: "30"
        - gridcell "Thursday, 1. October 2026": "1"
        - gridcell "Friday, 2. October 2026": "2"
        - gridcell "Saturday, 3. October 2026": "3"
        - gridcell "Sunday, 4. October 2026": "4"
      - row "41 Monday, 5. October 2026 Tuesday, 6. October 2026 Wednesday, 7. October 2026 Thursday, 8. October 2026 Friday, 9. October 2026 Saturday, 10. October 2026 Sunday, 11. October 2026":
        - gridcell "41"
        - gridcell "Monday, 5. October 2026": "5"
        - gridcell "Tuesday, 6. October 2026": "6"
        - gridcell "Wednesday, 7. October 2026": "7"
        - gridcell "Thursday, 8. October 2026": "8"
        - gridcell "Friday, 9. October 2026": "9"
        - gridcell "Saturday, 10. October 2026": "10"
        - gridcell "Sunday, 11. October 2026": "11"
      - row "42 Monday, 12. October 2026 Tuesday, 13. October 2026 Wednesday, 14. October 2026 Thursday, 15. October 2026 Friday, 16. October 2026 Saturday, 17. October 2026 Sunday, 18. October 2026":
        - gridcell "42"
        - gridcell "Monday, 12. October 2026" [selected]: "12"
        - gridcell "Tuesday, 13. October 2026" [selected]: "13"
        - gridcell "Wednesday, 14. October 2026" [selected]: "14"
        - gridcell "Thursday, 15. October 2026" [selected]: "15"
        - gridcell "Friday, 16. October 2026" [selected]: "16"
        - gridcell "Saturday, 17. October 2026" [selected]: "17"
        - gridcell "Sunday, 18. October 2026" [selected]: "18"
      - row "43 Monday, 19. October 2026 Tuesday, 20. October 2026 Wednesday, 21. October 2026 Thursday, 22. October 2026 Friday, 23. October 2026 Saturday, 24. October 2026 Sunday, 25. October 2026":
        - gridcell "43"
        - gridcell "Monday, 19. October 2026": "19"
        - gridcell "Tuesday, 20. October 2026": "20"
        - gridcell "Wednesday, 21. October 2026": "21"
        - gridcell "Thursday, 22. October 2026": "22"
        - gridcell "Friday, 23. October 2026": "23"
        - gridcell "Saturday, 24. October 2026": "24"
        - gridcell "Sunday, 25. October 2026": "25"
      - row "44 Monday, 26. October 2026 Tuesday, 27. October 2026 Wednesday, 28. October 2026 Thursday, 29. October 2026 Friday, 30. October 2026 Saturday, 31. October 2026 Sunday, 1. November 2026":
        - gridcell "44"
        - gridcell "Monday, 26. October 2026": "26"
        - gridcell "Tuesday, 27. October 2026": "27"
        - gridcell "Wednesday, 28. October 2026": "28"
        - gridcell "Thursday, 29. October 2026": "29"
        - gridcell "Friday, 30. October 2026": "30"
        - gridcell "Saturday, 31. October 2026": "31"
        - gridcell "Sunday, 1. November 2026" [disabled]: "1"
- link "Monday 12. Oct":
  - /url: "#"
  - generic: Monday
  - generic: 12. Oct
- link "Tuesday 13. Oct":
  - /url: "#"
  - generic: Tuesday
  - generic: 13. Oct
- link "Wednesday 14. Oct":
  - /url: "#"
  - generic: Wednesday
  - generic: 14. Oct
- link "Thursday 15. Oct":
  - /url: "#"
  - generic: Thursday
  - generic: 15. Oct
- link "Friday 16. Oct":
  - /url: "#"
  - generic: Friday
  - generic: 16. Oct
- link "Saturday 17. Oct":
  - /url: "#"
  - generic: Saturday
  - generic: 17. Oct
- link "Sunday 18. Oct":
  - /url: "#"
  - generic: Sunday
  - generic: 18. Oct
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- 'generic "23:59 – 23:59: dummyForBug"':
  - button "23:59 - 00:00":
    - generic: 23:59 - 00:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- complementary:
  - generic: Tattoo requests
  - button:
  - button:
  - generic: All Requests
  - tablist:
    - tab "Unreplied 0":
      - generic: Unreplied
      - generic: "0"
    - tab "Pending 0":
      - generic: Pending
      - generic: "0"
    - tab "Archive" [active] [selected]:
      - generic: Archive
  - tabpanel "Archive":
    - tablist:
      - tab "Booked" [selected]:
        - generic: Booked
      - tab "Canceled":
        - generic: Canceled
      - tab "Declined":
        - generic: Declined
    - tabpanel "Booked":
      - generic: Nothing to see here

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## New deposit

Purpose: Assigns a payment deposit to client credit.

Layout and behavior: Overlay retains calendar background; client section precedes amount and summary, with closing/payment actions.

Dependencies: A client is required; payments setup is a separate prerequisite.


### 17-new-deposit

[Desktop](screens/17-new-deposit-desktop.png) · [Phone](screens/17-new-deposit-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Client required is explicit; Add payment is disabled. Name, optional email, telephone/country code and number amount are visible.

Buttons in DOM order: `button:` → `button "Close":` → `button "Add payment" [disabled]:`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Name | INPUT / text (default) | false |

| 2 | not associated | Email (optional) | INPUT / text (default) | false |

| 3 | not associated | +47 917 45 834 | INPUT / tel | false |

| 4 | not associated | — | INPUT / number | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: New payment deposit
  - button:
  - separator
  - generic: Add client
  - textbox "Name"
  - textbox "Email (optional)"
  - textbox "+47 917 45 834": <redacted>
  - 'button "Norway: + 47"'
  - separator
  - generic: Deposit amount
  - generic: kr
  - spinbutton: "0"
  - generic: Client required
  - paragraph: You need to add a client to assign the deposit to. It will be added to the client's credit on payment.
  - generic: 0,00 kr
  - generic: Deposit amount
  - button "Close":
    - generic: Close
  - button "Add payment" [disabled]:
    - generic: Add payment

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## New sale

Purpose: Builds a cart from products or gift cards before payment.

Layout and behavior: Overlay contains cart/total and Add to cart area with Products/Gift Cards tabs.

Dependencies: Products must exist; payment collection requires configured payment methods.


### 18-new-sale-products

[Desktop](screens/18-new-sale-products-desktop.png) · [Phone](screens/18-new-sale-products-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Buttons in DOM order: `button "Complete your setup":` → `button "Invite and manage your artists"` → `button:` → `button "Today":` → `button:` → `button:` → `button "Day":` → `button "Week":` → `button:` → `button:` → `button "23:59 - 00:00":` → `button:` → `button "Add payment" [disabled]`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: New sale
- button "Complete your setup":
  - generic: Complete your setup
- generic: You have no active artists in your studio
- button "Invite and manage your artists"
- button:
- button "Today":
  - generic: Today
- button:
- button:
- generic: 12 - 18. Oct 2026
- generic: Week 42
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- complementary:
  - generic: October 2026
  - button:
  - button:
  - grid:
    - rowgroup:
      - row "M T W T F S S":
        - generic: M
        - generic: T
        - generic: W
        - generic: T
        - generic: F
        - generic: S
        - generic: S
    - rowgroup:
      - row "40 Monday, 28. September 2026 Tuesday, 29. September 2026 Wednesday, 30. September 2026 Thursday, 1. October 2026 Friday, 2. October 2026 Saturday, 3. October 2026 Sunday, 4. October 2026":
        - gridcell "40"
        - gridcell "Monday, 28. September 2026" [disabled]: "28"
        - gridcell "Tuesday, 29. September 2026" [disabled]: "29"
        - gridcell "Wednesday, 30. September 2026" [disabled]: "30"
        - gridcell "Thursday, 1. October 2026": "1"
        - gridcell "Friday, 2. October 2026": "2"
        - gridcell "Saturday, 3. October 2026": "3"
        - gridcell "Sunday, 4. October 2026": "4"
      - row "41 Monday, 5. October 2026 Tuesday, 6. October 2026 Wednesday, 7. October 2026 Thursday, 8. October 2026 Friday, 9. October 2026 Saturday, 10. October 2026 Sunday, 11. October 2026":
        - gridcell "41"
        - gridcell "Monday, 5. October 2026": "5"
        - gridcell "Tuesday, 6. October 2026": "6"
        - gridcell "Wednesday, 7. October 2026": "7"
        - gridcell "Thursday, 8. October 2026": "8"
        - gridcell "Friday, 9. October 2026": "9"
        - gridcell "Saturday, 10. October 2026": "10"
        - gridcell "Sunday, 11. October 2026": "11"
      - row "42 Monday, 12. October 2026 Tuesday, 13. October 2026 Wednesday, 14. October 2026 Thursday, 15. October 2026 Friday, 16. October 2026 Saturday, 17. October 2026 Sunday, 18. October 2026":
        - gridcell "42"
        - gridcell "Monday, 12. October 2026" [selected]: "12"
        - gridcell "Tuesday, 13. October 2026" [selected]: "13"
        - gridcell "Wednesday, 14. October 2026" [selected]: "14"
        - gridcell "Thursday, 15. October 2026" [selected]: "15"
        - gridcell "Friday, 16. October 2026" [selected]: "16"
        - gridcell "Saturday, 17. October 2026" [selected]: "17"
        - gridcell "Sunday, 18. October 2026" [selected]: "18"
      - row "43 Monday, 19. October 2026 Tuesday, 20. October 2026 Wednesday, 21. October 2026 Thursday, 22. October 2026 Friday, 23. October 2026 Saturday, 24. October 2026 Sunday, 25. October 2026":
        - gridcell "43"
        - gridcell "Monday, 19. October 2026": "19"
        - gridcell "Tuesday, 20. October 2026": "20"
        - gridcell "Wednesday, 21. October 2026": "21"
        - gridcell "Thursday, 22. October 2026": "22"
        - gridcell "Friday, 23. October 2026": "23"
        - gridcell "Saturday, 24. October 2026": "24"
        - gridcell "Sunday, 25. October 2026": "25"
      - row "44 Monday, 26. October 2026 Tuesday, 27. October 2026 Wednesday, 28. October 2026 Thursday, 29. October 2026 Friday, 30. October 2026 Saturday, 31. October 2026 Sunday, 1. November 2026":
        - gridcell "44"
        - gridcell "Monday, 26. October 2026": "26"
        - gridcell "Tuesday, 27. October 2026": "27"
        - gridcell "Wednesday, 28. October 2026": "28"
        - gridcell "Thursday, 29. October 2026": "29"
        - gridcell "Friday, 30. October 2026": "30"
        - gridcell "Saturday, 31. October 2026": "31"
        - gridcell "Sunday, 1. November 2026" [disabled]: "1"
- link "Monday 12. Oct":
  - /url: "#"
  - generic: Monday
  - generic: 12. Oct
- link "Tuesday 13. Oct":
  - /url: "#"
  - generic: Tuesday
  - generic: 13. Oct
- link "Wednesday 14. Oct":
  - /url: "#"
  - generic: Wednesday
  - generic: 14. Oct
- link "Thursday 15. Oct":
  - /url: "#"
  - generic: Thursday
  - generic: 15. Oct
- link "Friday 16. Oct":
  - /url: "#"
  - generic: Friday
  - generic: 16. Oct
- link "Saturday 17. Oct":
  - /url: "#"
  - generic: Saturday
  - generic: 17. Oct
- link "Sunday 18. Oct":
  - /url: "#"
  - generic: Sunday
  - generic: 18. Oct
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- 'generic "23:59 – 23:59: dummyForBug"':
  - button "23:59 - 00:00":
    - generic: 23:59 - 00:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- complementary:
  - generic: New sale
  - button:
  - banner:
    - img "Infinity test":
      - generic: IT
  - generic: Infinity test
  - generic: Cart is empty
  - generic: Add items to continue
  - generic: 0,00 kr
  - generic: Total
  - button "Add payment" [disabled]
- complementary:
  - generic: Add to cart
  - tablist:
    - tab "Products" [selected]:
      - generic: Products
    - tab "Gift Cards":
      - generic: Gift Cards
  - tabpanel "Products":
    - generic: You have no products for sale

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 19-new-sale-gift-cards

[Desktop](screens/19-new-sale-gift-cards-desktop.png) · [Phone](screens/19-new-sale-gift-cards-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Gift Card and Custom amount: are visible; no cart item or completed checkout is evidenced.

Buttons in DOM order: `button "Complete your setup":` → `button "Invite and manage your artists"` → `button:` → `button "Today":` → `button:` → `button:` → `button "Day":` → `button "Week":` → `button:` → `button:` → `button "23:59 - 00:00":` → `button:` → `button "Add payment" [disabled]`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: New sale
- button "Complete your setup":
  - generic: Complete your setup
- generic: You have no active artists in your studio
- button "Invite and manage your artists"
- button:
- button "Today":
  - generic: Today
- button:
- button:
- generic: 12 - 18. Oct 2026
- generic: Week 42
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- complementary:
  - generic: October 2026
  - button:
  - button:
  - grid:
    - rowgroup:
      - row "M T W T F S S":
        - generic: M
        - generic: T
        - generic: W
        - generic: T
        - generic: F
        - generic: S
        - generic: S
    - rowgroup:
      - row "40 Monday, 28. September 2026 Tuesday, 29. September 2026 Wednesday, 30. September 2026 Thursday, 1. October 2026 Friday, 2. October 2026 Saturday, 3. October 2026 Sunday, 4. October 2026":
        - gridcell "40"
        - gridcell "Monday, 28. September 2026" [disabled]: "28"
        - gridcell "Tuesday, 29. September 2026" [disabled]: "29"
        - gridcell "Wednesday, 30. September 2026" [disabled]: "30"
        - gridcell "Thursday, 1. October 2026": "1"
        - gridcell "Friday, 2. October 2026": "2"
        - gridcell "Saturday, 3. October 2026": "3"
        - gridcell "Sunday, 4. October 2026": "4"
      - row "41 Monday, 5. October 2026 Tuesday, 6. October 2026 Wednesday, 7. October 2026 Thursday, 8. October 2026 Friday, 9. October 2026 Saturday, 10. October 2026 Sunday, 11. October 2026":
        - gridcell "41"
        - gridcell "Monday, 5. October 2026": "5"
        - gridcell "Tuesday, 6. October 2026": "6"
        - gridcell "Wednesday, 7. October 2026": "7"
        - gridcell "Thursday, 8. October 2026": "8"
        - gridcell "Friday, 9. October 2026": "9"
        - gridcell "Saturday, 10. October 2026": "10"
        - gridcell "Sunday, 11. October 2026": "11"
      - row "42 Monday, 12. October 2026 Tuesday, 13. October 2026 Wednesday, 14. October 2026 Thursday, 15. October 2026 Friday, 16. October 2026 Saturday, 17. October 2026 Sunday, 18. October 2026":
        - gridcell "42"
        - gridcell "Monday, 12. October 2026" [selected]: "12"
        - gridcell "Tuesday, 13. October 2026" [selected]: "13"
        - gridcell "Wednesday, 14. October 2026" [selected]: "14"
        - gridcell "Thursday, 15. October 2026" [selected]: "15"
        - gridcell "Friday, 16. October 2026" [selected]: "16"
        - gridcell "Saturday, 17. October 2026" [selected]: "17"
        - gridcell "Sunday, 18. October 2026" [selected]: "18"
      - row "43 Monday, 19. October 2026 Tuesday, 20. October 2026 Wednesday, 21. October 2026 Thursday, 22. October 2026 Friday, 23. October 2026 Saturday, 24. October 2026 Sunday, 25. October 2026":
        - gridcell "43"
        - gridcell "Monday, 19. October 2026": "19"
        - gridcell "Tuesday, 20. October 2026": "20"
        - gridcell "Wednesday, 21. October 2026": "21"
        - gridcell "Thursday, 22. October 2026": "22"
        - gridcell "Friday, 23. October 2026": "23"
        - gridcell "Saturday, 24. October 2026": "24"
        - gridcell "Sunday, 25. October 2026": "25"
      - row "44 Monday, 26. October 2026 Tuesday, 27. October 2026 Wednesday, 28. October 2026 Thursday, 29. October 2026 Friday, 30. October 2026 Saturday, 31. October 2026 Sunday, 1. November 2026":
        - gridcell "44"
        - gridcell "Monday, 26. October 2026": "26"
        - gridcell "Tuesday, 27. October 2026": "27"
        - gridcell "Wednesday, 28. October 2026": "28"
        - gridcell "Thursday, 29. October 2026": "29"
        - gridcell "Friday, 30. October 2026": "30"
        - gridcell "Saturday, 31. October 2026": "31"
        - gridcell "Sunday, 1. November 2026" [disabled]: "1"
- link "Monday 12. Oct":
  - /url: "#"
  - generic: Monday
  - generic: 12. Oct
- link "Tuesday 13. Oct":
  - /url: "#"
  - generic: Tuesday
  - generic: 13. Oct
- link "Wednesday 14. Oct":
  - /url: "#"
  - generic: Wednesday
  - generic: 14. Oct
- link "Thursday 15. Oct":
  - /url: "#"
  - generic: Thursday
  - generic: 15. Oct
- link "Friday 16. Oct":
  - /url: "#"
  - generic: Friday
  - generic: 16. Oct
- link "Saturday 17. Oct":
  - /url: "#"
  - generic: Saturday
  - generic: 17. Oct
- link "Sunday 18. Oct":
  - /url: "#"
  - generic: Sunday
  - generic: 18. Oct
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- 'generic "23:59 – 23:59: dummyForBug"':
  - button "23:59 - 00:00":
    - generic: 23:59 - 00:00
- generic: 00:00
- generic: 01:00
- generic: 02:00
- generic: 03:00
- generic: 04:00
- generic: 05:00
- generic: 06:00
- generic: 07:00
- generic: 08:00
- generic: 09:00
- generic: 10:00
- generic: 11:00
- generic: 12:00
- generic: 13:00
- generic: 14:00
- generic: 15:00
- generic: 16:00
- generic: 17:00
- generic: 18:00
- generic: 19:00
- generic: 20:00
- generic: 21:00
- generic: 22:00
- generic: 23:00
- complementary:
  - generic: New sale
  - button:
  - banner:
    - img "Infinity test":
      - generic: IT
  - generic: Infinity test
  - generic: Cart is empty
  - generic: Add items to continue
  - generic: 0,00 kr
  - generic: Total
  - button "Add payment" [disabled]
- complementary:
  - generic: Add to cart
  - tablist:
    - tab "Products":
      - generic: Products
    - tab "Gift Cards" [active] [selected]:
      - generic: Gift Cards
  - tabpanel "Gift Cards":
    - generic: Gift Card
    - generic: "Custom amount:"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Clients

Purpose: Lists clients, client deposits and completed/requested forms.

Layout and behavior: Tabs and search/filter toolbar above a table; Add new client is a complementary side panel.

Dependencies: Client data, deposit payments and configured forms; no client records exist in this trial.


### 20-clients-list

[Desktop](screens/20-clients-list-desktop.png) · [Phone](screens/20-clients-list-phone.png)

Observed URL: [https://app.linework.com/manager/clients](https://app.linework.com/manager/clients)

Buttons in DOM order: `button "Add client":` → `button "Add client":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- tablist:
  - tab "Clients" [selected]
  - tab "Deposits"
  - tab "Forms"
- button "Add client":
  - text: Add client
- banner:
  - textbox "Search"
- table:
  - rowgroup:
    - row "Name Phone Email Introduced Last seen Artists visited Spent":
      - columnheader "Name":
        - text: Name
      - columnheader "Phone":
        - generic: Phone
      - columnheader "Email":
        - generic: Email
      - columnheader "Introduced":
        - text: Introduced
      - columnheader "Last seen":
        - generic: Last seen
      - columnheader "Artists visited":
        - generic: Artists visited
      - columnheader "Spent":
        - generic: Spent
- generic: No clients added yet
- button "Add client":
  - text: Add client

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 21-clients-add

[Desktop](screens/21-clients-add-desktop.png) · [Phone](screens/21-clients-add-phone.png)

Observed URL: [https://app.linework.com/manager/clients](https://app.linework.com/manager/clients)

“A client requires a name” and disabled Create client establish a name requirement even though the extracted input has no native required attribute.

Buttons in DOM order: `button "Add client" [active]:` → `button:` → `button "Create client" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | Enter client name | INPUT / text (default) | false |

| 3 | not associated | Enter client email | INPUT / text (default) | false |

| 4 | not associated | +47 917 45 834 | INPUT / tel | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- tablist:
  - tab "Clients" [selected]
  - tab "Deposits"
  - tab "Forms"
- button "Add client" [active]:
  - text: Add client
- banner:
  - textbox "Search"
- table:
  - rowgroup:
    - row "Name Phone Email Introduced Last seen Artists visited Spent":
      - columnheader "Name":
        - text: Name
      - columnheader "Phone":
        - generic: Phone
      - columnheader "Email":
        - generic: Email
      - columnheader "Introduced":
        - text: Introduced
      - columnheader "Last seen":
        - generic: Last seen
      - columnheader "Artists visited":
        - generic: Artists visited
      - columnheader "Spent":
        - generic: Spent
- complementary:
  - generic: Add new client
  - button:
  - textbox "Enter client name"
  - generic: Name
  - textbox "Enter client email"
  - generic: Email
  - textbox "+47 917 45 834": <redacted>
  - 'button "Norway: + 47"'
  - generic: Phone
  - text: A client requires a name
  - button "Create client" [disabled]

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 22-clients-deposits

[Desktop](screens/22-clients-deposits-desktop.png) · [Phone](screens/22-clients-deposits-phone.png)

Observed URL: [https://app.linework.com/manager/clients/deposits](https://app.linework.com/manager/clients/deposits)


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- tablist:
  - tab "Clients"
  - tab "Deposits" [selected]
  - tab "Forms"
- banner:
  - textbox "Search"
  - generic: All statuses
- table:
  - rowgroup:
    - row "Date Client Artist Payment method Status Last updated Amount":
      - columnheader "Date":
        - text: Date
      - columnheader "Client":
        - text: Client
      - columnheader "Artist":
        - generic: Artist
      - columnheader "Payment method":
        - generic: Payment method
      - columnheader "Status":
        - text: Status
      - columnheader "Last updated":
        - generic: Last updated
      - columnheader "Amount":
        - text: Amount

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- tablist:
  - tab "Clients"
  - tab "Deposits" [selected]
  - tab "Forms"
- banner:
  - textbox "Search"
  - generic: All statuses
- table:
  - rowgroup:
    - row "Date Client Artist Payment method Status Last updated Amount":
      - columnheader "Date":
        - text: Date
      - columnheader "Client":
        - text: Client
      - columnheader "Artist":
        - generic: Artist
      - columnheader "Payment method":
        - generic: Payment method
      - columnheader "Status":
        - text: Status
      - columnheader "Last updated":
        - generic: Last updated
      - columnheader "Amount":
        - text: Amount
- generic: No deposits yet
- generic: 0 active deposits
- generic: 0,00 kr
- button "Export":
  - text: Export

```

</details>


### 23-clients-forms

[Desktop](screens/23-clients-forms-desktop.png) · [Phone](screens/23-clients-forms-phone.png)

Observed URL: [https://app.linework.com/manager/clients/releases](https://app.linework.com/manager/clients/releases)

Buttons in DOM order: `button "Export" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- tablist:
  - tab "Clients"
  - tab "Deposits"
  - tab "Forms" [selected]
- button "Export" [disabled]
- banner:
  - generic: All time
  - textbox "Search"
  - generic: All statuses
- table:
  - rowgroup:
    - row "Created Status Completed Client name Artist Form":
      - columnheader
      - columnheader "Created":
        - text: Created
      - columnheader "Status":
        - generic: Status
      - columnheader "Completed":
        - text: Completed
      - columnheader "Client name":
        - generic: Client name
      - columnheader "Artist":
        - generic: Artist
      - columnheader "Form":
        - generic: Form
- generic: No data to display

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Sales

Purpose: Lists recorded sales by period, seller, payment type, provider and cashier.

Layout and behavior: Period/date controls and five filters above sales table; opened filters display option buttons in place.

Dependencies: Recorded sales, sellers/service providers and payment configuration; trial is empty.


### 24-sales-day

[Desktop](screens/24-sales-day-desktop.png) · [Phone](screens/24-sales-day-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Service provider Client Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Service provider":
        - text: Service provider
      - columnheader "Client":
        - generic: Client
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


### 25-sales-range-options

[Desktop](screens/25-sales-range-options-desktop.png) · [Phone](screens/25-sales-range-options-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Buttons in DOM order: `button "Day":` → `button "Week":` → `button "Month":` → `button "Year":` → `button "Custom":` → `button:` → `button "Monday 12. Oct 2026":` → `button:`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Sales
- generic: Day
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- button "Month":
  - generic: Month
- button "Year":
  - generic: Year
- button "Custom":
  - generic: Custom
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Service provider Client Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Service provider":
        - text: Service provider
      - columnheader "Client":
        - generic: Client
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Sales
- generic: Day
- button "Day":
  - generic: Day
- button "Week":
  - generic: Week
- button "Month":
  - generic: Month
- button "Year":
  - generic: Year
- button "Custom":
  - generic: Custom
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


### 26-sales-filter-0

[Desktop](screens/26-sales-filter-0-desktop.png) · [Phone](screens/26-sales-filter-0-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Sale-type menu options: All Sales → Sales With Products → Sales With Services.

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:` → `button "All Sales":` → `button "Sales With Products":` → `button "Sales With Services":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- button "All Sales":
  - generic: All Sales
- button "Sales With Products":
  - generic: Sales With Products
- button "Sales With Services":
  - generic: Sales With Services
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Service provider Client Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Service provider":
        - text: Service provider
      - columnheader "Client":
        - generic: Client
      - columnheader "Amount":
        - text: Amount

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- button "All Sales":
  - generic: All Sales
- button "Sales With Products":
  - generic: Sales With Products
- button "Sales With Services":
  - generic: Sales With Services
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Amount":
        - text: Amount

```

</details>


### 27-sales-filter-1

[Desktop](screens/27-sales-filter-1-desktop.png) · [Phone](screens/27-sales-filter-1-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Seller menu options: All sellers → Infinity test.

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:` → `button "All sellers":` → `button "Infinity test":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- button "All sellers":
  - generic: All sellers
- button "Infinity test":
  - banner:
    - img "Infinity test":
      - generic: IT
  - generic: Infinity test
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Service provider Client Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Service provider":
        - text: Service provider
      - columnheader "Client":
        - generic: Client
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- button "All sellers":
  - generic: All sellers
- button "Infinity test":
  - banner:
    - img "Infinity test":
      - generic: IT
  - generic: Infinity test
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


### 28-sales-filter-2

[Desktop](screens/28-sales-filter-2-desktop.png) · [Phone](screens/28-sales-filter-2-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Payment-method options: All payment methods → Online payments → Cash payments.

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:` → `button "All payment methods":` → `button "Online payments":` → `button "Cash payments":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- button "All payment methods":
  - generic: All payment methods
- button "Online payments":
  - generic: Online payments
- button "Cash payments":
  - generic: Cash payments
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Service provider Client Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Service provider":
        - text: Service provider
      - columnheader "Client":
        - generic: Client
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- button "All payment methods":
  - generic: All payment methods
- button "Online payments":
  - generic: Online payments
- button "Cash payments":
  - generic: Cash payments
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


### 29-sales-filter-3

[Desktop](screens/29-sales-filter-3-desktop.png) · [Phone](screens/29-sales-filter-3-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Attempted service-provider filter state: no expanded options are exposed in the DOM. Do not infer a populated menu.

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Service provider Client Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Service provider":
        - text: Service provider
      - columnheader "Client":
        - generic: Client
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


### 30-sales-filter-4

[Desktop](screens/30-sales-filter-4-desktop.png) · [Phone](screens/30-sales-filter-4-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Cashier menu options: All cashiers → Artists → Managers → Self checkout.

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:` → `button "All cashiers":` → `button "Artists":` → `button "Managers":` → `button "Self checkout":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- button "All cashiers":
  - generic: All cashiers
- button "Artists":
  - generic: Artists
- button "Managers":
  - generic: Managers
- button "Self checkout":
  - generic: Self checkout
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Service provider Client Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Service provider":
        - text: Service provider
      - columnheader "Client":
        - generic: Client
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Sales
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- generic: All Sales
- generic: All sellers
- generic: All payment methods
- generic: All service providers
- generic: All cashiers
- button "All cashiers":
  - generic: All cashiers
- button "Artists":
  - generic: Artists
- button "Managers":
  - generic: Managers
- button "Self checkout":
  - generic: Self checkout
- table:
  - rowgroup:
    - row "Sale Payment Type Time Seller Amount":
      - columnheader "Sale":
        - generic: Sale
      - columnheader "Payment Type":
        - generic: Payment Type
      - columnheader "Time":
        - text: Time
      - columnheader "Seller":
        - text: Seller
      - columnheader "Amount":
        - text: Amount
- generic: No sales recorded this day

```

</details>


## Gift Cards

Purpose: Manages issued gift cards and the online gift-card store.

Layout and behavior: Dashboard table with search/filter toolbar, store status and totals; share/settings open overlays with internal settings tabs.

Dependencies: Online store requires payments; logo visibility depends on Settings → Skins.


### 31-gift-cards-dashboard

[Desktop](screens/31-gift-cards-dashboard-desktop.png) · [Phone](screens/31-gift-cards-dashboard-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings":` → `button "Export":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store":
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings":
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Source Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Source":
        - generic: Source
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store":
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings":
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export

```

</details>


### 32-gift-cards-share

[Desktop](screens/32-gift-cards-share-desktop.png) · [Phone](screens/32-gift-cards-share-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Buttons in DOM order: `button "Share gift card store" [active]:` → `button "Store settings":` → `button "Export":` → `button:` → `button "https://giftcard.linework.com/infinity-test":` → `button "Download QR-code":` → `button "Open in new tab":` → `button "Open store settings":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store" [active]:
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings":
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Source Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Source":
        - generic: Source
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export
- button:
- banner:
  - strong: Share gift card store
- button "https://giftcard.linework.com/infinity-test":
  - generic: https://giftcard.linework.com/infinity-test
- generic: SCAN TO OPEN STORE
- button "Download QR-code":
  - generic: Download QR-code
- button "Open in new tab":
  - generic: Open in new tab
- generic: Your store is currently offline
- button "Open store settings":
  - generic: Open store settings

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store" [active]:
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings":
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export
- button:
- banner:
  - strong: Share gift card store
- button "https://giftcard.linework.com/infinity-test":
  - generic: https://giftcard.linework.com/infinity-test
- generic: SCAN TO OPEN STORE
- button "Download QR-code":
  - generic: Download QR-code
- button "Open in new tab":
  - generic: Open in new tab
- generic: Your store is currently offline
- button "Open store settings":
  - generic: Open store settings

```

</details>


### 33-gift-cards-store-settings

[Desktop](screens/33-gift-cards-store-settings-desktop.png) · [Phone](screens/33-gift-cards-store-settings-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Enable online gift card store is gated by payments. Store URL slug and customer-facing information are editable; Open Skins points to logo configuration.

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings" [active]:` → `button "Export":` → `button:` → `button "Store settings"` → `button "Gift card settings"` → `button "Terms & conditions"` → `button "Open Skins"` → `button "Cancel"` → `button "Save settings"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / checkbox | false |

| 3 | not associated | — | INPUT / text | false |

| 4 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store":
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings" [active]:
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Source Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Source":
        - generic: Source
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export
- button:
- banner:
  - strong: Gift card store settings
- banner:
  - button "Store settings"
  - button "Gift card settings"
  - button "Terms & conditions"
- generic: Enable online gift card store
- paragraph: Enable payments in Settings to enable your online gift card store.
- separator
- text: Store url
- generic: giftcard.linework.com/
- textbox: infinity-test
- separator
- separator
- paragraph: Logo visibility on the gift card page is now managed in Settings → Skins.
- button "Open Skins"
- separator
- text: Information to display to people when purchasing your gift card
- textbox
- button "Cancel"
- button "Save settings"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store":
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings" [active]:
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export
- button:
- banner:
  - strong: Gift card store settings
- banner:
  - button "Store settings"
  - button "Gift card settings"
  - button "Terms & conditions"
- generic: Enable online gift card store
- paragraph: Enable payments in Settings to enable your online gift card store.
- separator
- text: Store url
- generic: giftcard.linework.com/
- textbox: infinity-test
- separator
- separator
- paragraph: Logo visibility on the gift card page is now managed in Settings → Skins.
- button "Open Skins"
- separator
- text: Information to display to people when purchasing your gift card
- textbox
- button "Cancel"
- button "Save settings"

```

</details>


### 34-gift-cards-card-settings

[Desktop](screens/34-gift-cards-card-settings-desktop.png) · [Phone](screens/34-gift-cards-card-settings-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Visible defaults: minimum 500; maximum 10000; duration 1 år. Automatic expired-card payout is explained; other duration options were not opened in this state.

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings":` → `button "Export":` → `button:` → `button "Store settings"` → `button "Gift card settings" [active]` → `button "Terms & conditions"` → `button "Cancel"` → `button "Save settings"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / text | false |

| 3 | not associated | — | INPUT / text | false |

| 4 | not associated | — | INPUT / hidden | false |

| 5 | not associated | — | INPUT / search | false |

| 6 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store":
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings":
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Source Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Source":
        - generic: Source
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export
- button:
- banner:
  - strong: Gift card store settings
- banner:
  - button "Store settings"
  - button "Gift card settings" [active]
  - button "Terms & conditions"
- generic: Minimum allowed Gift Card value
- textbox "Minimum allowed Gift Card value": "500"
- generic: Maximum allowed Gift Card value
- textbox "Maximum allowed Gift Card value": "10000"
- separator
- generic: Valid duration from time of purchase
- combobox:
  - searchbox: 1 år
- separator
- generic: Pay out expired gift cards automatically
- generic: When an unused gift card expires, automatically pay the remaining balance out to the studio. When off, the card is marked expired and you're notified so you can pay it out manually or contact the client.
- button "Cancel"
- button "Save settings"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store":
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings":
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export
- button:
- banner:
  - strong: Gift card store settings
- banner:
  - button "Store settings"
  - button "Gift card settings" [active]
  - button "Terms & conditions"
- generic: Minimum allowed Gift Card value
- textbox "Minimum allowed Gift Card value": "500"
- generic: Maximum allowed Gift Card value
- textbox "Maximum allowed Gift Card value": "10000"
- separator
- generic: Valid duration from time of purchase
- combobox:
  - searchbox: 1 år
- separator
- generic: Pay out expired gift cards automatically
- generic: When an unused gift card expires, automatically pay the remaining balance out to the studio. When off, the card is marked expired and you're notified so you can pay it out manually or contact the client.
- button "Cancel"
- button "Save settings"

```

</details>


### 35-gift-cards-terms

[Desktop](screens/35-gift-cards-terms-desktop.png) · [Phone](screens/35-gift-cards-terms-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings":` → `button "Export":` → `button:` → `button "Store settings"` → `button "Gift card settings"` → `button "Terms & conditions" [active]` → `button "Customize terms":` → `button "Cancel"` → `button "Save settings"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store":
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings":
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Source Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Source":
        - generic: Source
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export
- button:
- banner:
  - strong: Gift card store settings
- banner:
  - button "Store settings"
  - button "Gift card settings"
  - button "Terms & conditions" [active]
- generic: Gift card terms
- generic: Shown to the buyer before they complete their purchase. The bullet about the gift card's duration is added automatically.
- list:
  - listitem: Gavekortet er ikke refunderbart og kan kun brukes som betalingsmiddel for tjenester på studioet.
  - listitem: Hvis gavekortet ikke dekker hele beløpet som skal betales for tjenestene, kan resten betales med andre betalingsmetoder.
  - listitem: Når betalingen av gavekortet er fullført og gavekortdetaljene er sendt til den oppgitte e-postadressen, er studioet fritatt for ansvar. Studioet er ikke ansvarlig for tap av gavekortdetaljer eller hvis det havner i feil hender.
- button "Customize terms":
  - generic: Customize terms
- button "Cancel"
- button "Save settings"

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Gift Cards
- button "Share gift card store":
  - generic: Share gift card store
- generic: See all your sold gift cards and manage your online gift card store.
- generic: Gift card store is offline
- button "Store settings":
  - generic: Store settings
- banner:
  - textbox "Search"
  - generic: All sources
  - generic: All statuses
- table:
  - rowgroup:
    - row "Code Status Purchase date Expiration Date Amount remaining Original value":
      - columnheader "Code":
        - text: Code
      - columnheader "Status":
        - generic: Status
      - columnheader "Purchase date":
        - text: Purchase date
      - columnheader "Expiration Date":
        - text: Expiration Date
      - columnheader "Amount remaining":
        - text: Amount remaining
      - columnheader "Original value":
        - text: Original value
- generic: No gift cards found
- generic: 0 sold
- generic: 0,00 kr
- generic: 0 valid
- button "Export":
  - text: Export
- button:
- banner:
  - strong: Gift card store settings
- banner:
  - button "Store settings"
  - button "Gift card settings"
  - button "Terms & conditions" [active]
- generic: Gift card terms
- generic: Shown to the buyer before they complete their purchase. The bullet about the gift card's duration is added automatically.
- list:
  - listitem: Gavekortet er ikke refunderbart og kan kun brukes som betalingsmiddel for tjenester på studioet.
  - listitem: Hvis gavekortet ikke dekker hele beløpet som skal betales for tjenestene, kan resten betales med andre betalingsmetoder.
  - listitem: Når betalingen av gavekortet er fullført og gavekortdetaljene er sendt til den oppgitte e-postadressen, er studioet fritatt for ansvar. Studioet er ikke ansvarlig for tap av gavekortdetaljer eller hvis det havner i feil hender.
- button "Customize terms":
  - generic: Customize terms
- button "Cancel"
- button "Save settings"

```

</details>


## Settlements

Purpose: Tracks rent invoices and studio commissions.

Layout and behavior: Invoice summaries above Studio commissions period/filter area; New invoice opens an invoicing-setup gate.

Dependencies: Company and payment information must be completed before invoicing.


### 36-settlements-dashboard

[Desktop](screens/36-settlements-dashboard-desktop.png) · [Phone](screens/36-settlements-dashboard-phone.png)

Observed URL: [https://app.linework.com/manager/settlement](https://app.linework.com/manager/settlement)

Buttons in DOM order: `button "New invoice":` → `button:` → `button "October, 2026":` → `button:`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Settlements
- button "New invoice":
  - text: New invoice
- generic: Create and manage invoices for studio rent.
- generic: All invoices
- generic: Unpaid invoices
- generic: 0,00 kr
- generic: Total outstanding
- generic: "0"
- generic: Invoices
- generic: "0"
- generic: Past due
- separator
- generic: Studio commissions
- generic: Month
- button:
- button "October, 2026":
  - text: October, 2026
- button:
- generic: Only show artists with recorded commissions
- generic: 0,00 kr
- generic: Total commissions
- generic: 0,00 kr
- generic: Uninvoiced commissions
- generic: No commissions have been recorded for this time period

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 37-settlements-new-invoice

[Desktop](screens/37-settlements-new-invoice-desktop.png) · [Phone](screens/37-settlements-new-invoice-phone.png)

Observed URL: [https://app.linework.com/manager/settlement](https://app.linework.com/manager/settlement)

New invoice stops at Complete invoicing setup, with Complete setup and Maybe Later. No invoice was created.

Buttons in DOM order: `button "New invoice" [active]:` → `button:` → `button "October, 2026":` → `button:` → `button:` → `button "Complete setup"` → `button "Maybe Later"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Settlements
- button "New invoice" [active]:
  - text: New invoice
- generic: Create and manage invoices for studio rent.
- generic: All invoices
- generic: Unpaid invoices
- generic: 0,00 kr
- generic: Total outstanding
- generic: "0"
- generic: Invoices
- generic: "0"
- generic: Past due
- separator
- generic: Studio commissions
- generic: Month
- button:
- button "October, 2026":
  - text: October, 2026
- button:
- generic: Only show artists with recorded commissions
- generic: 0,00 kr
- generic: Total commissions
- generic: 0,00 kr
- generic: Uninvoiced commissions
- generic: No commissions have been recorded for this time period
- button:
- banner:
  - strong: Complete invoicing setup
- generic: Add missing information to complete invoicing setup
- generic: Some information is missing. Add all the required information to display on the studio invoices, like the studio company details and payment information.
- button "Complete setup"
- button "Maybe Later"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 38-settlements-invoice-setup

[Desktop](screens/38-settlements-invoice-setup-desktop.png) · [Phone](screens/38-settlements-invoice-setup-phone.png)

Observed URL: [https://app.linework.com/manager/settings/company](https://app.linework.com/manager/settings/company)

**Transition/incomplete state.** Main content is empty in the captured DOM; this is not a completed invoice setup or rendered invoice form. State 39 shows the stable company prerequisite.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

(No main content exposed in captured DOM.)

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


```yaml

- generic: Company details
  - generic: Add details to unlock payments, cash register and invoicing.
  - button "Start company setup"

```

</details>


## Company details

Purpose: Collects company identification needed for financial features.

Layout and behavior: Settings secondary navigation beside main content; company-setup dialog asks for organization number.

Dependencies: Required to unlock payments, cash register and invoicing; setup was not submitted.


### 39-settings-company-details

[Desktop](screens/39-settings-company-details-desktop.png) · [Phone](screens/39-settings-company-details-phone.png)

Observed URL: [https://app.linework.com/manager/settings/company](https://app.linework.com/manager/settings/company)

Buttons in DOM order: `button "Start company setup"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Company details
  - generic: Add details to unlock payments, cash register and invoicing.
  - button "Start company setup"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 40-settings-company-setup

[Desktop](screens/40-settings-company-setup-desktop.png) · [Phone](screens/40-settings-company-setup-phone.png)

Observed URL: [https://app.linework.com/manager/settings/company](https://app.linework.com/manager/settings/company)

Organization number is requested; Go! would continue company lookup/setup and was not submitted.

Buttons in DOM order: `button "Start company setup"` → `button:` → `button "Go!"` → `button "Cancel"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / string | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Company details
  - generic: Add details to unlock payments, cash register and invoicing.
  - button "Start company setup"
- button:
- banner:
  - strong: Let's start with your company
- generic: Enter your organization number
- textbox [active]
- button "Go!"
- generic: Why do we need this?
- paragraph: Information about your company needs to be displayed on receipts and reports, and is required to get started with online payments.
- button "Cancel"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Reports

Purpose: Summarizes studio revenue and expenses for the selected period.

Layout and behavior: Revenue/period/date controls above summary values and CSV/Sales report download controls.

Dependencies: Recorded rent, service/product sales, fees and VAT; empty trial provides zero or loading/blank states.


### 41-reports-revenue-day

[Desktop](screens/41-reports-revenue-day-desktop.png) · [Phone](screens/41-reports-revenue-day-phone.png)

Observed URL: [https://app.linework.com/manager/reports](https://app.linework.com/manager/reports)

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:` → `button "CSV":` → `button "Sales report":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Reports
- generic: Revenue
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- separator
- generic: Studio rent
- generic: 0,00 kr
- separator
- generic: Service sales
- generic: 0,00 kr
- separator
- generic: Product sales
- generic: 0,00 kr
- separator
- generic: Total sales
- generic: 0,00 kr
- separator
- generic: Fees
- generic: 0,00 kr
- separator
- generic: Total expenses
- generic: 0,00 kr
- separator
- generic: VAT
- generic: 0,00 kr
- separator
- generic: Net total
- generic: 0,00 kr
- generic: Download
- button "CSV":
  - text: CSV
- button "Sales report":
  - text: Sales report

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 42-reports-type-menu

[Desktop](screens/42-reports-type-menu-desktop.png) · [Phone](screens/42-reports-type-menu-phone.png)

Observed URL: [https://app.linework.com/manager/reports](https://app.linework.com/manager/reports)

Attempted report-type menu: capture remains Revenue with no expanded alternative report types. Do not infer other tabs or options.

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:` → `button "CSV":` → `button "Sales report":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Reports
- generic: Revenue
- generic: Day
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- separator
- generic: Studio rent
- generic: 0,00 kr
- separator
- generic: Service sales
- generic: 0,00 kr
- separator
- generic: Product sales
- generic: 0,00 kr
- separator
- generic: Total sales
- generic: 0,00 kr
- separator
- generic: Fees
- generic: 0,00 kr
- separator
- generic: Total expenses
- generic: 0,00 kr
- separator
- generic: VAT
- generic: 0,00 kr
- separator
- generic: Net total
- generic: 0,00 kr
- generic: Download
- button "CSV":
  - text: CSV
- button "Sales report":
  - text: Sales report

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 43-reports-range-options

[Desktop](screens/43-reports-range-options-desktop.png) · [Phone](screens/43-reports-range-options-phone.png)

Observed URL: [https://app.linework.com/manager/reports](https://app.linework.com/manager/reports)

Opened report-period menu exposes Day → Month only.

Buttons in DOM order: `button "Day":` → `button "Month":` → `button:` → `button "Monday 12. Oct 2026":` → `button:` → `button "CSV":` → `button "Sales report":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Reports
- generic: Revenue
- generic: Day
- button "Day":
  - generic: Day
- button "Month":
  - generic: Month
- button:
- button "Monday 12. Oct 2026":
  - text: Monday 12. Oct 2026
- button:
- separator
- generic: Studio rent
- generic: 0,00 kr
- separator
- generic: Service sales
- generic: 0,00 kr
- separator
- generic: Product sales
- generic: 0,00 kr
- separator
- generic: Total sales
- generic: 0,00 kr
- separator
- generic: Fees
- generic: 0,00 kr
- separator
- generic: Total expenses
- generic: 0,00 kr
- separator
- generic: VAT
- generic: 0,00 kr
- separator
- generic: Net total
- generic: 0,00 kr
- generic: Download
- button "CSV":
  - text: CSV
- button "Sales report":
  - text: Sales report

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 44-reports-revenue-month

[Desktop](screens/44-reports-revenue-month-desktop.png) · [Phone](screens/44-reports-revenue-month-phone.png)

Observed URL: [https://app.linework.com/manager/reports](https://app.linework.com/manager/reports)

Month and October, 2026 are visible; summary body is blank in captured DOM. Treat as captured incomplete/month state, not evidence of a populated monthly report.

Buttons in DOM order: `button:` → `button "October, 2026":` → `button:`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Reports
- generic: Revenue
- generic: Month
- button:
- button "October, 2026":
  - text: October, 2026
- button:
- separator

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Flash

Purpose: Selects artist-shared flash sheets to appear on the booking page.

Layout and behavior: Settings-style secondary navigation and main empty-state content with Copy link.

Dependencies: Artists must share flash with studio; none have shared any.


### 45-flash-empty

[Desktop](screens/45-flash-empty-desktop.png) · [Phone](screens/45-flash-empty-phone.png)

Observed URL: [https://app.linework.com/manager/settings/flash](https://app.linework.com/manager/settings/flash)

Buttons in DOM order: `button "Copy link":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Flash
  - generic: Flash sheets artists have shared with your studio. Choose which appear on your booking page.
  - button "Copy link":
    - generic: Copy link
  - generic: Nothing shared yet
  - generic: When artists share flash with your studio, it will show up here.

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Reviews

Purpose: Offers studio Google review management.

Layout and behavior: Promotional main content with availability message and call to action.

Dependencies: Feature is unavailable for this trial studio; contact support is shown.


### 46-reviews-unavailable

[Desktop](screens/46-reviews-unavailable-desktop.png) · [Phone](screens/46-reviews-unavailable-phone.png)

Observed URL: [https://app.linework.com/manager/googlereview](https://app.linework.com/manager/googlereview)

“Google Reviews feature is not available for your studio” and “Contact support for more information” are explicit. No connected review dashboard was accessible.

Buttons in DOM order: `button "I'm ready"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Google Reviews
- generic: Manage and track your Google reviews in one place
- generic: Google Reviews feature is not available for your studio
- generic: Contact support for more information
- generic: Not the highest rated star on Google yet? Boost your Google reviews to skyrocket rankings, amplify visibility, and attract more clients.
- separator
- button "I'm ready"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Artists

Purpose: Connects artists and configures sales, commissions, rent and shared scheduling.

Layout and behavior: Active/Invited/Inactive/All Artists tabs; invitation overlay contains arrangement controls, conditional financial fields and explanatory accordions.

Dependencies: Active artist account/invitation, company/payment setup and selected seller/payment arrangement.


### 47-artists-active

[Desktop](screens/47-artists-active-desktop.png) · [Phone](screens/47-artists-active-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Buttons in DOM order: `button "Invite artist"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0" [selected]:
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists":
    - generic: All Artists
- button "Invite artist"
- tabpanel "Active 0":
  - generic: No artists have been invited to the studio yet

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 48-artists-invited-0

[Desktop](screens/48-artists-invited-0-desktop.png) · [Phone](screens/48-artists-invited-0-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Buttons in DOM order: `button "Invite artist"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0" [active] [selected]:
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists":
    - generic: All Artists
- button "Invite artist"
- tabpanel "Invited 0":
  - generic: Currently no invitations are pending

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 49-artists-inactive-0

[Desktop](screens/49-artists-inactive-0-desktop.png) · [Phone](screens/49-artists-inactive-0-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Buttons in DOM order: `button "Invite artist"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0" [active] [selected]:
    - generic: Inactive
    - generic: "0"
  - tab "All Artists":
    - generic: All Artists
- button "Invite artist"
- tabpanel "Inactive 0":
  - generic: Currently no inactive artists in the studio

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 50-artists-all-artists

[Desktop](screens/50-artists-all-artists-desktop.png) · [Phone](screens/50-artists-all-artists-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Buttons in DOM order: `button "Invite artist"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists" [active] [selected]:
    - generic: All Artists
- button "Invite artist"
- tabpanel "All Artists":
  - generic: Currently no artists in the studio

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 51-artists-invite

[Desktop](screens/51-artists-invite-desktop.png) · [Phone](screens/51-artists-invite-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Commission setup exposes seller identity choices, 40% Studio / 60% Artist slider and checked Auto-charge for online payments. No invitation sent.

Buttons in DOM order: `button "Invite artist"` → `button:` → `button "Sales":` → `button "Payments":` → `button "Studio settlement":` → `button "Scheduling & booking":` → `button "Cancel"` → `button "Send invitation"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter artist's email address | INPUT / text (default) | false |

| 2 | not associated | Enter artist name or nickname | INPUT / text (default) | false |

| 3 | not associated | — | INPUT / checkbox | false |

| 4 | not associated | — | INPUT / hidden | false |

| 5 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists" [selected]:
    - generic: All Artists
- button "Invite artist"
- tabpanel "All Artists":
  - generic: Currently no artists in the studio
- button:
- banner:
  - strong: Invite artist to join the studio
- generic: Email address
- textbox "Enter artist's email address" [active]
- generic: Artist name or nickname
- textbox "Enter artist name or nickname"
- generic: Payment arrangement
- generic: Commission based
- generic: Studio takes a percentage of the artist's sales as commission.
- generic: Fixed rent
- generic: Artist pays a fixed recurring amount to the studio and keeps 100% of their sales.
- generic: Who sells the artist's services?
- generic: Artist is the seller of their own services
- generic: Select if the artist is a sole proprietor providing services where their own business acts as the seller.
- generic: Studio is the seller of the artist's services
- generic: Select if the artist is an employee or contractor providing services where the studio business acts as the seller.
- generic: Enable commissions
- generic: 40%
- generic: Studio
- generic: 60%
- generic: Artist
- slider:
- checkbox "Auto-charge for online payments" [checked]
- generic: Auto-charge for online payments
- generic: "How things will work with this setup:"
- button "Sales":
  - generic: Sales
- button "Payments":
  - generic: Payments
- button "Studio settlement":
  - generic: Studio settlement
- button "Scheduling & booking":
  - generic: Scheduling & booking
- button "Cancel"
- button "Send invitation"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 52-artists-fixed-rent

[Desktop](screens/52-artists-fixed-rent-desktop.png) · [Phone](screens/52-artists-fixed-rent-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Fixed-rent fields show Monthly interval, invoice day 1, rent amount 0, VAT 25%, due 14 days. These are visible defaults, not an approved financial arrangement.

Buttons in DOM order: `button "Invite artist"` → `button:` → `button "Sales":` → `button "Payments":` → `button "Studio settlement":` → `button "Scheduling & booking":` → `button "Cancel"` → `button "Send invitation"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter artist's email address | INPUT / text (default) | false |

| 2 | not associated | Enter artist name or nickname | INPUT / text (default) | false |

| 3 | not associated | — | INPUT / hidden | false |

| 4 | not associated | — | INPUT / search | false |

| 5 | not associated | — | INPUT / hidden | false |

| 6 | not associated | — | INPUT / search | false |

| 7 | not associated | Enter rent amount | INPUT / text | false |

| 8 | not associated | — | INPUT / hidden | false |

| 9 | not associated | — | INPUT / search | false |

| 10 | not associated | — | INPUT / hidden | false |

| 11 | not associated | — | INPUT / search | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists" [selected]:
    - generic: All Artists
- button "Invite artist"
- tabpanel "All Artists":
  - generic: Currently no artists in the studio
- button:
- banner:
  - strong: Invite artist to join the studio
- generic: Email address
- textbox "Enter artist's email address"
- generic: Required
- generic: Artist name or nickname
- textbox "Enter artist name or nickname"
- generic: Payment arrangement
- generic: Commission based
- generic: Studio takes a percentage of the artist's sales as commission.
- generic: Fixed rent
- generic: Artist pays a fixed recurring amount to the studio and keeps 100% of their sales.
- text: Invoicing interval
- combobox:
  - searchbox: Monthly
- text: Invoice day of month
- combobox:
  - searchbox: "1"
- text: Rent amount (inc. MVA)
- textbox "Enter rent amount": "0"
- text: VAT Rate
- combobox:
  - searchbox: 25%
- text: Payment due
- combobox:
  - searchbox: 14 days
- generic: "How things will work with this setup:"
- button "Sales":
  - generic: Sales
- button "Payments":
  - generic: Payments
- button "Studio settlement":
  - generic: Studio settlement
- button "Scheduling & booking":
  - generic: Scheduling & booking
- button "Cancel"
- button "Send invitation"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 53-artists-explainer-0

[Desktop](screens/53-artists-explainer-0-desktop.png) · [Phone](screens/53-artists-explainer-0-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Buttons in DOM order: `button "Invite artist"` → `button:` → `button "Sales" [expanded] [active]:` → `button "Payments":` → `button "Studio settlement":` → `button "Scheduling & booking":` → `button "Cancel"` → `button "Send invitation"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter artist's email address | INPUT / text (default) | false |

| 2 | not associated | Enter artist name or nickname | INPUT / text (default) | false |

| 3 | not associated | — | INPUT / hidden | false |

| 4 | not associated | — | INPUT / search | false |

| 5 | not associated | — | INPUT / hidden | false |

| 6 | not associated | — | INPUT / search | false |

| 7 | not associated | Enter rent amount | INPUT / text | false |

| 8 | not associated | — | INPUT / hidden | false |

| 9 | not associated | — | INPUT / search | false |

| 10 | not associated | — | INPUT / hidden | false |

| 11 | not associated | — | INPUT / search | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists" [selected]:
    - generic: All Artists
- button "Invite artist"
- tabpanel "All Artists":
  - generic: Currently no artists in the studio
- button:
- banner:
  - strong: Invite artist to join the studio
- generic: Email address
- textbox "Enter artist's email address"
- generic: Required
- generic: Artist name or nickname
- textbox "Enter artist name or nickname"
- generic: Payment arrangement
- generic: Commission based
- generic: Studio takes a percentage of the artist's sales as commission.
- generic: Fixed rent
- generic: Artist pays a fixed recurring amount to the studio and keeps 100% of their sales.
- text: Invoicing interval
- combobox:
  - searchbox: Monthly
- text: Invoice day of month
- combobox:
  - searchbox: "1"
- text: Rent amount (inc. MVA)
- textbox "Enter rent amount": "0"
- text: VAT Rate
- combobox:
  - searchbox: 25%
- text: Payment due
- combobox:
  - searchbox: 14 days
- generic: "How things will work with this setup:"
- button "Sales" [expanded] [active]:
  - generic: Sales
- region "Sales":
  - generic: Sales for the artist's services records the artist as the seller. Appointment checkouts can be performed by the artist or studio managers.
  - generic: Receipts for service sales displays business details of the artist.
  - generic: Service sales and payment deposits are recorded in the artist’s cash register.
- button "Payments":
  - generic: Payments
- button "Studio settlement":
  - generic: Studio settlement
- button "Scheduling & booking":
  - generic: Scheduling & booking
- button "Cancel"
- button "Send invitation"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 54-artists-explainer-1

[Desktop](screens/54-artists-explainer-1-desktop.png) · [Phone](screens/54-artists-explainer-1-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Payment explainer still mentions 60% artist / 40% studio although fixed-rent fields remain visible. Record the displayed copy without assuming it correctly describes the selected arrangement.

Buttons in DOM order: `button "Invite artist"` → `button:` → `button "Sales":` → `button "Payments" [expanded] [active]:` → `button "Studio settlement":` → `button "Scheduling & booking":` → `button "Cancel"` → `button "Send invitation"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter artist's email address | INPUT / text (default) | false |

| 2 | not associated | Enter artist name or nickname | INPUT / text (default) | false |

| 3 | not associated | — | INPUT / hidden | false |

| 4 | not associated | — | INPUT / search | false |

| 5 | not associated | — | INPUT / hidden | false |

| 6 | not associated | — | INPUT / search | false |

| 7 | not associated | Enter rent amount | INPUT / text | false |

| 8 | not associated | — | INPUT / hidden | false |

| 9 | not associated | — | INPUT / search | false |

| 10 | not associated | — | INPUT / hidden | false |

| 11 | not associated | — | INPUT / search | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists" [selected]:
    - generic: All Artists
- button "Invite artist"
- tabpanel "All Artists":
  - generic: Currently no artists in the studio
- button:
- banner:
  - strong: Invite artist to join the studio
- generic: Email address
- textbox "Enter artist's email address"
- generic: Required
- generic: Artist name or nickname
- textbox "Enter artist name or nickname"
- generic: Payment arrangement
- generic: Commission based
- generic: Studio takes a percentage of the artist's sales as commission.
- generic: Fixed rent
- generic: Artist pays a fixed recurring amount to the studio and keeps 100% of their sales.
- text: Invoicing interval
- combobox:
  - searchbox: Monthly
- text: Invoice day of month
- combobox:
  - searchbox: "1"
- text: Rent amount (inc. MVA)
- textbox "Enter rent amount": "0"
- text: VAT Rate
- combobox:
  - searchbox: 25%
- text: Payment due
- combobox:
  - searchbox: 14 days
- generic: "How things will work with this setup:"
- button "Sales":
  - generic: Sales
- region:
  - generic: Sales for the artist's services records the artist as the seller. Appointment checkouts can be performed by the artist or studio managers.
  - generic: Receipts for service sales displays business details of the artist.
  - generic: Service sales and payment deposits are recorded in the artist’s cash register.
- button "Payments" [expanded] [active]:
  - generic: Payments
- region "Payments":
  - generic: When services sold at the studio are paid with online payment, 60% are sent to the artist and 40% is sent to the studio to cover studio rent.
  - generic: Linework assumes that cash payments are collected by the artist.
  - generic: Payment deposits and client credit are recorded on the artist, not the studio.
  - generic: Studio gift cards can be used as payment for artist’s service sales.
- button "Studio settlement":
  - generic: Studio settlement
- button "Scheduling & booking":
  - generic: Scheduling & booking
- button "Cancel"
- button "Send invitation"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 55-artists-explainer-2

[Desktop](screens/55-artists-explainer-2-desktop.png) · [Phone](screens/55-artists-explainer-2-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Studio settlement explainer still describes 40% commission in this fixed-rent-state capture; preserve as observed, not validated business behavior.

Buttons in DOM order: `button "Invite artist"` → `button:` → `button "Sales":` → `button "Payments":` → `button "Studio settlement" [expanded] [active]:` → `button "Scheduling & booking":` → `button "Cancel"` → `button "Send invitation"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter artist's email address | INPUT / text (default) | false |

| 2 | not associated | Enter artist name or nickname | INPUT / text (default) | false |

| 3 | not associated | — | INPUT / hidden | false |

| 4 | not associated | — | INPUT / search | false |

| 5 | not associated | — | INPUT / hidden | false |

| 6 | not associated | — | INPUT / search | false |

| 7 | not associated | Enter rent amount | INPUT / text | false |

| 8 | not associated | — | INPUT / hidden | false |

| 9 | not associated | — | INPUT / search | false |

| 10 | not associated | — | INPUT / hidden | false |

| 11 | not associated | — | INPUT / search | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists" [selected]:
    - generic: All Artists
- button "Invite artist"
- tabpanel "All Artists":
  - generic: Currently no artists in the studio
- button:
- banner:
  - strong: Invite artist to join the studio
- generic: Email address
- textbox "Enter artist's email address"
- generic: Required
- generic: Artist name or nickname
- textbox "Enter artist name or nickname"
- generic: Payment arrangement
- generic: Commission based
- generic: Studio takes a percentage of the artist's sales as commission.
- generic: Fixed rent
- generic: Artist pays a fixed recurring amount to the studio and keeps 100% of their sales.
- text: Invoicing interval
- combobox:
  - searchbox: Monthly
- text: Invoice day of month
- combobox:
  - searchbox: "1"
- text: Rent amount (inc. MVA)
- textbox "Enter rent amount": "0"
- text: VAT Rate
- combobox:
  - searchbox: 25%
- text: Payment due
- combobox:
  - searchbox: 14 days
- generic: "How things will work with this setup:"
- button "Sales":
  - generic: Sales
- button "Payments":
  - generic: Payments
- region:
  - generic: When services sold at the studio are paid with online payment, 60% are sent to the artist and 40% is sent to the studio to cover studio rent.
  - generic: Linework assumes that cash payments are collected by the artist.
  - generic: Payment deposits and client credit are recorded on the artist, not the studio.
  - generic: Studio gift cards can be used as payment for artist’s service sales.
- button "Studio settlement" [expanded] [active]:
  - generic: Studio settlement
- region "Studio settlement":
  - generic: When service sales are paid with online payment and gift cards, a 40% commission is automatically charged by the studio and invoiced as a rent payment.
  - generic: Managers can also invoice commissions that are not automatically charged, like for artist sales paid with cash.
- button "Scheduling & booking":
  - generic: Scheduling & booking
- button "Cancel"
- button "Send invitation"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 56-artists-explainer-3

[Desktop](screens/56-artists-explainer-3-desktop.png) · [Phone](screens/56-artists-explainer-3-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Buttons in DOM order: `button "Invite artist"` → `button:` → `button "Sales":` → `button "Payments":` → `button "Studio settlement":` → `button "Scheduling & booking" [expanded] [active]:` → `button "Cancel"` → `button "Send invitation"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter artist's email address | INPUT / text (default) | false |

| 2 | not associated | Enter artist name or nickname | INPUT / text (default) | false |

| 3 | not associated | — | INPUT / hidden | false |

| 4 | not associated | — | INPUT / search | false |

| 5 | not associated | — | INPUT / hidden | false |

| 6 | not associated | — | INPUT / search | false |

| 7 | not associated | Enter rent amount | INPUT / text | false |

| 8 | not associated | — | INPUT / hidden | false |

| 9 | not associated | — | INPUT / search | false |

| 10 | not associated | — | INPUT / hidden | false |

| 11 | not associated | — | INPUT / search | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Artists
- generic: Connect your artists and manage their studio settings.
- tablist:
  - tab "Active 0":
    - generic: Active
    - generic: "0"
  - tab "Invited 0":
    - generic: Invited
    - generic: "0"
  - tab "Inactive 0":
    - generic: Inactive
    - generic: "0"
  - tab "All Artists" [selected]:
    - generic: All Artists
- button "Invite artist"
- tabpanel "All Artists":
  - generic: Currently no artists in the studio
- button:
- banner:
  - strong: Invite artist to join the studio
- generic: Email address
- textbox "Enter artist's email address"
- generic: Required
- generic: Artist name or nickname
- textbox "Enter artist name or nickname"
- generic: Payment arrangement
- generic: Commission based
- generic: Studio takes a percentage of the artist's sales as commission.
- generic: Fixed rent
- generic: Artist pays a fixed recurring amount to the studio and keeps 100% of their sales.
- text: Invoicing interval
- combobox:
  - searchbox: Monthly
- text: Invoice day of month
- combobox:
  - searchbox: "1"
- text: Rent amount (inc. MVA)
- textbox "Enter rent amount": "0"
- text: VAT Rate
- combobox:
  - searchbox: 25%
- text: Payment due
- combobox:
  - searchbox: 14 days
- generic: "How things will work with this setup:"
- button "Sales":
  - generic: Sales
- button "Payments":
  - generic: Payments
- button "Studio settlement":
  - generic: Studio settlement
- region:
  - generic: When service sales are paid with online payment and gift cards, a 40% commission is automatically charged by the studio and invoiced as a rent payment.
  - generic: Managers can also invoice commissions that are not automatically charged, like for artist sales paid with cash.
- button "Scheduling & booking" [expanded] [active]:
  - generic: Scheduling & booking
- region "Scheduling & booking":
  - generic: Appointments for the artist can be managed by both the artist and managers.
  - generic: Bookable availability for the artist at the studio can be managed by both the artist and managers.
  - generic: Specific artist requests for tattoo appointments can be managed by both the artist and managers.
  - generic: Appointments that the artist might schedule outside of the studio will be displayed to managers as time blocks with a note that they are unavailable.
  - generic: Time blocks created by managers will be displayed to the artist with any notes that they might add.
- button "Cancel"
- button "Send invitation"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Managers

Purpose: Manages studio access and manager subscription seats.

Layout and behavior: Seat summary above Name/Role/Status table; invite overlay includes email, role and paid-seat warning.

Dependencies: Additional invite would add a paid subscription seat; final invitation action was not used.


### 57-managers-list

[Desktop](screens/57-managers-list-desktop.png) · [Phone](screens/57-managers-list-phone.png)

Observed URL: [https://app.linework.com/manager/management](https://app.linework.com/manager/management)

Buttons in DOM order: `button "Invite manager"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Studio managers
- generic: Invite managers to help manage your studio.
- separator
- banner:
  - generic: "1"
  - generic: Total seats
  - generic: "1"
  - generic: Occupied seats
  - generic: "0"
  - generic: empty seats
  - button "Invite manager"
- separator
- table:
  - rowgroup:
    - row "Name Role Status":
      - columnheader "Name":
        - generic: Name
      - columnheader "Role":
        - generic: Role
      - columnheader "Status":
        - generic: Status
      - columnheader
  - rowgroup:
    - row "Ibrahim Albab ymia2005@gmail.com Primary owner Active":
      - cell "Ibrahim Albab ymia2005@gmail.com":
        - banner:
          - img "Ibrahim Albab":
            - generic: IA
        - generic: Ibrahim Albab
        - generic: ymia2005@gmail.com
      - cell "Primary owner":
        - generic: Primary owner
      - cell "Active":
        - generic: Active
      - cell

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 58-managers-invite

[Desktop](screens/58-managers-invite-desktop.png) · [Phone](screens/58-managers-invite-phone.png)

Observed URL: [https://app.linework.com/manager/management](https://app.linework.com/manager/management)

Invitation warning quotes an additional 350,00 kr per month. Confirm seat upgrade and send invitation is disabled; no upgrade or invite occurred.

Buttons in DOM order: `button "Invite manager" [active]` → `button:` → `button "Cancel"` → `button "Confirm seat upgrade and send invitation" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter manager email address | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Studio managers
- generic: Invite managers to help manage your studio.
- separator
- banner:
  - generic: "1"
  - generic: Total seats
  - generic: "1"
  - generic: Occupied seats
  - generic: "0"
  - generic: empty seats
  - button "Invite manager" [active]
- separator
- table:
  - rowgroup:
    - row "Name Role Status":
      - columnheader "Name":
        - generic: Name
      - columnheader "Role":
        - generic: Role
      - columnheader "Status":
        - generic: Status
      - columnheader
  - rowgroup:
    - row "Ibrahim Albab ymia2005@gmail.com Primary owner Active":
      - cell "Ibrahim Albab ymia2005@gmail.com":
        - banner:
          - img "Ibrahim Albab":
            - generic: IA
        - generic: Ibrahim Albab
        - generic: ymia2005@gmail.com
      - cell "Primary owner":
        - generic: Primary owner
      - cell "Active":
        - generic: Active
      - cell
- button:
- banner:
  - generic: Invite studio managers
- generic: Email address
- textbox "Enter manager email address"
- generic: Invite as
- generic: Manager
- separator
- generic: Additional manager seat required
- paragraph: By inviting this manager, an additional manager seat will be added to the Studio subscription. You will be charged an additional 350,00 kr per month.
- button "Cancel"
- button "Confirm seat upgrade and send invitation" [disabled]

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 59-managers-role-options

[Desktop](screens/59-managers-role-options-desktop.png) · [Phone](screens/59-managers-role-options-phone.png)

Observed URL: [https://app.linework.com/manager/management](https://app.linework.com/manager/management)

Role popup exposes Owner while Manager is the current display. Do not assume other undisplayed roles exist.

Buttons in DOM order: `button "Invite manager"` → `button:` → `button "Owner":` → `button "Cancel"` → `button "Confirm seat upgrade and send invitation" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter manager email address | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Studio managers
- generic: Invite managers to help manage your studio.
- separator
- banner:
  - generic: "1"
  - generic: Total seats
  - generic: "1"
  - generic: Occupied seats
  - generic: "0"
  - generic: empty seats
  - button "Invite manager"
- separator
- table:
  - rowgroup:
    - row "Name Role Status":
      - columnheader "Name":
        - generic: Name
      - columnheader "Role":
        - generic: Role
      - columnheader "Status":
        - generic: Status
      - columnheader
  - rowgroup:
    - row "Ibrahim Albab ymia2005@gmail.com Primary owner Active":
      - cell "Ibrahim Albab ymia2005@gmail.com":
        - banner:
          - img "Ibrahim Albab":
            - generic: IA
        - generic: Ibrahim Albab
        - generic: ymia2005@gmail.com
      - cell "Primary owner":
        - generic: Primary owner
      - cell "Active":
        - generic: Active
      - cell
- button:
- banner:
  - generic: Invite studio managers
- generic: Email address
- textbox "Enter manager email address"
- generic: Invite as
- generic: Manager
- button "Owner":
  - generic: Owner
- separator
- generic: Additional manager seat required
- paragraph: By inviting this manager, an additional manager seat will be added to the Studio subscription. You will be charged an additional 350,00 kr per month.
- button "Cancel"
- button "Confirm seat upgrade and send invitation" [disabled]

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Products

Purpose: Maintains products available for studio sales.

Layout and behavior: Category choices and table; Add new product is a complementary side panel; Manage categories opens an overlay.

Dependencies: Product name/price, tax rate and optional categories; catalog is empty.


### 60-products-list

[Desktop](screens/60-products-list-desktop.png) · [Phone](screens/60-products-list-phone.png)

Observed URL: [https://app.linework.com/manager/products](https://app.linework.com/manager/products)

Buttons in DOM order: `button "Manage categories"` → `button "Add product":` → `button "All":` → `button "Uncategorized":` → `button "Add product":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Products
- button "Manage categories"
- button "Add product":
  - text: Add product
- generic: Category
- button "All":
  - generic: All
- button "Uncategorized":
  - generic: Uncategorized
- table:
  - rowgroup:
    - row "Product Name Category MVA (%) Price inc. MVA":
      - columnheader "Product Name":
        - text: Product Name
      - columnheader "Category":
        - generic: Category
      - columnheader "MVA (%)":
        - generic: MVA (%)
      - columnheader "Price inc. MVA":
        - generic: Price inc. MVA
- generic: No products added yet
- button "Add product":
  - text: Add product

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 61-products-add

[Desktop](screens/61-products-add-desktop.png) · [Phone](screens/61-products-add-phone.png)

Observed URL: [https://app.linework.com/manager/products](https://app.linework.com/manager/products)

Buttons in DOM order: `button "Manage categories"` → `button "Add product" [active]:` → `button "All":` → `button "Uncategorized":` → `button "Add product":` → `button:` → `button "Create product" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Product Name | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / number | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Products
- button "Manage categories"
- button "Add product" [active]:
  - text: Add product
- generic: Category
- button "All":
  - generic: All
- button "Uncategorized":
  - generic: Uncategorized
- table:
  - rowgroup:
    - row "Product Name Category MVA (%) Price inc. MVA":
      - columnheader "Product Name":
        - text: Product Name
      - columnheader "Category":
        - generic: Category
      - columnheader "MVA (%)":
        - generic: MVA (%)
      - columnheader "Price inc. MVA":
        - generic: Price inc. MVA
- generic: No products added yet
- button "Add product":
  - text: Add product
- complementary:
  - generic: Add new product
  - button:
  - text: Product Name
  - textbox "Product Name"
  - generic: Price incl. MVA
  - generic: kr
  - spinbutton: "0"
  - separator
  - generic: MVA (%)
  - generic: 25%
  - separator
  - text: Category
  - generic: Uncategorized
  - separator
  - generic: Price ex. MVA
  - generic: 0,00 kr
  - generic: MVA
  - generic: 0,00 kr
  - generic: Price incl. MVA
  - generic: 0,00 kr
  - separator
  - button "Create product" [disabled]

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 62-products-vat-options

[Desktop](screens/62-products-vat-options-desktop.png) · [Phone](screens/62-products-vat-options-phone.png)

Observed URL: [https://app.linework.com/manager/products](https://app.linework.com/manager/products)

VAT menu options in observed order: 25% → 15% → 12% → 0%.

Buttons in DOM order: `button "Manage categories"` → `button "Add product":` → `button "All":` → `button "Uncategorized":` → `button "Add product":` → `button:` → `button "25%":` → `button "15%":` → `button "12%":` → `button "0%":` → `button "Create product" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Product Name | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / number | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Products
- button "Manage categories"
- button "Add product":
  - text: Add product
- generic: Category
- button "All":
  - generic: All
- button "Uncategorized":
  - generic: Uncategorized
- table:
  - rowgroup:
    - row "Product Name Category MVA (%) Price inc. MVA":
      - columnheader "Product Name":
        - text: Product Name
      - columnheader "Category":
        - generic: Category
      - columnheader "MVA (%)":
        - generic: MVA (%)
      - columnheader "Price inc. MVA":
        - generic: Price inc. MVA
- generic: No products added yet
- button "Add product":
  - text: Add product
- complementary:
  - generic: Add new product
  - button:
  - text: Product Name
  - textbox "Product Name"
  - generic: Price incl. MVA
  - generic: kr
  - spinbutton: "0"
  - separator
  - generic: MVA (%)
  - generic: 25%
  - button "25%":
    - generic: 25%
  - button "15%":
    - generic: 15%
  - button "12%":
    - generic: 12%
  - button "0%":
    - generic: 0%
  - separator
  - text: Category
  - generic: Uncategorized
  - separator
  - generic: Price ex. MVA
  - generic: 0,00 kr
  - generic: MVA
  - generic: 0,00 kr
  - generic: Price incl. MVA
  - generic: 0,00 kr
  - separator
  - button "Create product" [disabled]

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 63-products-categories

[Desktop](screens/63-products-categories-desktop.png) · [Phone](screens/63-products-categories-phone.png)

Observed URL: [https://app.linework.com/manager/products](https://app.linework.com/manager/products)

Buttons in DOM order: `button "Manage categories" [active]` → `button "Add product":` → `button "All":` → `button "Uncategorized":` → `button "Add product":` → `button:` → `button "Add" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | New category name | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Products
- button "Manage categories" [active]
- button "Add product":
  - text: Add product
- generic: Category
- button "All":
  - generic: All
- button "Uncategorized":
  - generic: Uncategorized
- table:
  - rowgroup:
    - row "Product Name Category MVA (%) Price inc. MVA":
      - columnheader "Product Name":
        - text: Product Name
      - columnheader "Category":
        - generic: Category
      - columnheader "MVA (%)":
        - generic: MVA (%)
      - columnheader "Price inc. MVA":
        - generic: Price inc. MVA
- generic: No products added yet
- button "Add product":
  - text: Add product
- button:
- banner:
  - strong: Manage categories
- textbox "New category name"
- button "Add" [disabled]
- generic: No categories yet
- generic: Create your first category above to group your products. Products without a category stay uncategorized.

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Settings · Studio setup

Purpose: Edits studio identity, SMS sender and location.

Layout and behavior: Secondary settings navigation plus main stacked logo/name/SMS/location sections; individual Edit dialogs.

Dependencies: Logo upload and changes were not performed; address search depends on location lookup.


### 64-settings-studio-setup

[Desktop](screens/64-settings-studio-setup-desktop.png) · [Phone](screens/64-settings-studio-setup-phone.png)

Observed URL: [https://app.linework.com/manager/settings](https://app.linework.com/manager/settings)

Buttons in DOM order: `button:` → `button "Edit":` → `button "Edit":` → `button "Edit":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Studio setup
  - generic: Edit the general settings of the studio
  - generic: Logo
  - banner:
    - img "Infinity test":
      - generic: IT
  - button:
  - generic: Studio Name
  - generic: Infinity test
  - button "Edit":
    - generic: Edit
  - separator
  - generic: SMS handler
  - generic: Linework
  - button "Edit":
    - generic: Edit
  - separator
  - generic: Studio location
  - text: Infinity test
  - generic: Myrveien 17B, 1406 Ski
  - button "Edit":
    - generic: Edit
  - separator
  - separator
  - separator
  - separator
  - separator

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 65-settings-studio-name

[Desktop](screens/65-settings-studio-name-desktop.png) · [Phone](screens/65-settings-studio-name-phone.png)

Observed URL: [https://app.linework.com/manager/settings](https://app.linework.com/manager/settings)

Buttons in DOM order: `button:` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel"` → `button "Save changes" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / string | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Studio setup
  - generic: Edit the general settings of the studio
  - generic: Logo
  - banner:
    - img "Infinity test":
      - generic: IT
  - button:
  - generic: Studio Name
  - generic: Infinity test
  - button "Edit":
    - generic: Edit
  - separator
  - generic: SMS handler
  - generic: Linework
  - button "Edit":
    - generic: Edit
  - separator
  - generic: Studio location
  - text: Infinity test
  - generic: Myrveien 17B, 1406 Ski
  - button "Edit":
    - generic: Edit
  - separator
  - separator
  - separator
  - separator
  - separator
- button:
- banner:
  - strong: Edit Studio Name
- textbox [active]: Infinity test
- generic: Studio name
- button "Cancel"
- button "Save changes" [disabled]

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 66-settings-sms-handler

[Desktop](screens/66-settings-sms-handler-desktop.png) · [Phone](screens/66-settings-sms-handler-phone.png)

Observed URL: [https://app.linework.com/manager/settings](https://app.linework.com/manager/settings)

SMS handler dialog displays “Edit Studio Name” while its textbox value is Linework. Preserve this mismatched UI title exactly.

Buttons in DOM order: `button:` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel"` → `button "Save changes" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / string | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Studio setup
  - generic: Edit the general settings of the studio
  - generic: Logo
  - banner:
    - img "Infinity test":
      - generic: IT
  - button:
  - generic: Studio Name
  - generic: Infinity test
  - button "Edit":
    - generic: Edit
  - separator
  - generic: SMS handler
  - generic: Linework
  - button "Edit":
    - generic: Edit
  - separator
  - generic: Studio location
  - text: Infinity test
  - generic: Myrveien 17B, 1406 Ski
  - button "Edit":
    - generic: Edit
  - separator
  - separator
  - separator
  - separator
  - separator
- button:
- banner:
  - strong: Edit Studio Name
- textbox [active]: Linework
- generic: SMS handler
- button "Cancel"
- button "Save changes" [disabled]

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 67-settings-location

[Desktop](screens/67-settings-location-desktop.png) · [Phone](screens/67-settings-location-phone.png)

Observed URL: [https://app.linework.com/manager/settings](https://app.linework.com/manager/settings)

Buttons in DOM order: `button:` → `button "Edit":` → `button "Edit":` → `button "Edit" [active]:` → `button:` → `button "Cancel"` → `button "Save changes" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search for your address | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Studio setup
  - generic: Edit the general settings of the studio
  - generic: Logo
  - banner:
    - img "Infinity test":
      - generic: IT
  - button:
  - generic: Studio Name
  - generic: Infinity test
  - button "Edit":
    - generic: Edit
  - separator
  - generic: SMS handler
  - generic: Linework
  - button "Edit":
    - generic: Edit
  - separator
  - generic: Studio location
  - text: Infinity test
  - generic: Myrveien 17B, 1406 Ski
  - button "Edit" [active]:
    - generic: Edit
  - separator
  - separator
  - separator
  - separator
  - separator
- button:
- banner:
  - strong: Edit Studio Location
- textbox "Search for your address": <redacted>
- generic: Street name and number
- button "Cancel"
- button "Save changes" [disabled]

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Settings · Theme

Purpose: Selects the current user’s dashboard appearance.

Layout and behavior: Light/Dark radio choices and theme color-preset buttons in main area.

Dependencies: Per-user preference synced across devices; no selection was changed.


### 68-settings-theme

[Desktop](screens/68-settings-theme-desktop.png) · [Phone](screens/68-settings-theme-phone.png)

Observed URL: [https://app.linework.com/manager/settings/theme](https://app.linework.com/manager/settings/theme)


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Theme
  - generic: Choose a theme for your dashboard. Changes apply only to you and sync across your devices.
  - radio "Light" [checked]
  - generic: Light
  - radio "Dark"
  - generic: Dark
  - 'button "Onyx Primary #121212 Secondary #2c2c2c Tertiary #333333"':
    - generic: Onyx
    - generic: Primary
    - generic: "#121212"
    - generic: Secondary
    - generic: "#2c2c2c"
    - generic: Tertiary
    - generic: "#333333"
  - 'button "Deep Sea Primary #0f2f5e Secondary #1b4a8c Tertiary #2864b8"':
    - generic: Deep Sea
    - generic: Primary
    - generic: "#0f2f5e"
    - generic: Secondary
    - generic: "#1b4a8c"
    - generic: Tertiary
    - generic: "#2864b8"
  - 'button "Pine Primary #0f3b29 Secondary #185b3e Tertiary #237a54"':
    - generic: Pine
    - generic: Primary
    - generic: "#0f3b29"
    - generic: Secondary
    - generic: "#185b3e"
    - generic: Tertiary
    - generic: "#237a54"
  - 'button "Amethyst Primary #2b1457 Secondary #3f1f80 Tertiary #5730ab"':
    - generic: Amethyst
    - generic: Primary
    - generic: "#2b1457"
    - generic: Secondary
    - generic: "#3f1f80"
    - generic: Tertiary
    - generic: "#5730ab"
  - 'button "Mocha Primary #321f0f Secondary #4a2f18 Tertiary #6a4526"':
    - generic: Mocha
    - generic: Primary
    - generic: "#321f0f"
    - generic: Secondary
    - generic: "#4a2f18"
    - generic: Tertiary
    - generic: "#6a4526"
  - 'button "Custom Primary #121212 Secondary #2c2c2c Tertiary #333333"':
    - generic: Custom
    - generic: Primary
    - generic: "#121212"
    - generic: Secondary
    - generic: "#2c2c2c"
    - generic: Tertiary
    - generic: "#333333"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Settings · Skins

Purpose: Configures the appearance of client-facing pages.

Layout and behavior: Brand/avatar controls, preview and color preset buttons in main settings content.

Dependencies: Avatar needed for logo display; client-facing booking and gift-card pages use these settings.


### 69-settings-skins

[Desktop](screens/69-settings-skins-desktop.png) · [Phone](screens/69-settings-skins-phone.png)

Observed URL: [https://app.linework.com/manager/settings/skins](https://app.linework.com/manager/settings/skins)

Buttons in DOM order: `button "Reset" [disabled]` → `button "Save" [disabled]` → `button "Upload"` → `button "Book now"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |

| 2 | not associated | — | INPUT / file | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Skins
  - generic: Customize the look of your client-facing pages (booking, gift card, Google review). Primary drives the page header and dominant surfaces; secondary drives CTA buttons and accents. Changes only go live once you click Save.
  - button "Reset" [disabled]
  - button "Save" [disabled]
  - generic: Show avatar on client pages
  - generic: Upload an avatar to enable
  - generic: No image
  - generic: Client avatar
  - generic: Shown on your client-facing pages in place of your dashboard logo. Square images work best.
  - button "Upload"
  - generic: Preview
  - generic: Studio name
  - generic: Book a session
  - button "Book now"
  - 'button "Linework Primary #eff1f3 Secondary #333333 Tertiary #ffffff"':
    - generic: Linework
    - generic: Primary
    - generic: "#eff1f3"
    - generic: Secondary
    - generic: "#333333"
    - generic: Tertiary
    - generic: "#ffffff"
  - 'button "Coral Primary #111111 Secondary #ff5a36 Tertiary #ffebe7"':
    - generic: Coral
    - generic: Primary
    - generic: "#111111"
    - generic: Secondary
    - generic: "#ff5a36"
    - generic: Tertiary
    - generic: "#ffebe7"
  - 'button "Ocean Primary #0d2238 Secondary #1e88e5 Tertiary #e4f1fc"':
    - generic: Ocean
    - generic: Primary
    - generic: "#0d2238"
    - generic: Secondary
    - generic: "#1e88e5"
    - generic: Tertiary
    - generic: "#e4f1fc"
  - 'button "Emerald Primary #06281e Secondary #10b981 Tertiary #e2f7f0"':
    - generic: Emerald
    - generic: Primary
    - generic: "#06281e"
    - generic: Secondary
    - generic: "#10b981"
    - generic: Tertiary
    - generic: "#e2f7f0"
  - 'button "Amethyst Primary #1c1033 Secondary #8b5cf6 Tertiary #f1ebfe"':
    - generic: Amethyst
    - generic: Primary
    - generic: "#1c1033"
    - generic: Secondary
    - generic: "#8b5cf6"
    - generic: Tertiary
    - generic: "#f1ebfe"
  - 'button "Rose Primary #260c12 Secondary #e11d48 Tertiary #fbe4e9"':
    - generic: Rose
    - generic: Primary
    - generic: "#260c12"
    - generic: Secondary
    - generic: "#e11d48"
    - generic: Tertiary
    - generic: "#fbe4e9"
  - 'button "Midnight Amber Primary #0d1b2a Secondary #fbbf24 Tertiary #fff7e5"':
    - generic: Midnight Amber
    - generic: Primary
    - generic: "#0d1b2a"
    - generic: Secondary
    - generic: "#fbbf24"
    - generic: Tertiary
    - generic: "#fff7e5"
  - 'button "Onyx Cyan Primary #0a0a0a Secondary #0891b2 Tertiary #e1f2f6"':
    - generic: Onyx Cyan
    - generic: Primary
    - generic: "#0a0a0a"
    - generic: Secondary
    - generic: "#0891b2"
    - generic: Tertiary
    - generic: "#e1f2f6"
  - 'button "Mono Primary #1f1f1f Secondary #4f4f4f Tertiary #eaeaea"':
    - generic: Mono
    - generic: Primary
    - generic: "#1f1f1f"
    - generic: Secondary
    - generic: "#4f4f4f"
    - generic: Tertiary
    - generic: "#eaeaea"
  - 'button "Noir Gold Primary #171311 Secondary #eac451 Tertiary #fcf8ea"':
    - generic: Noir Gold
    - generic: Primary
    - generic: "#171311"
    - generic: Secondary
    - generic: "#eac451"
    - generic: Tertiary
    - generic: "#fcf8ea"
  - 'button "Sunset Primary #2a1410 Secondary #ff7043 Tertiary #ffeee8"':
    - generic: Sunset
    - generic: Primary
    - generic: "#2a1410"
    - generic: Secondary
    - generic: "#ff7043"
    - generic: Tertiary
    - generic: "#ffeee8"
  - 'button "Custom Primary #eff1f3 Secondary #333333 Tertiary #ffffff"':
    - generic: Custom
    - generic: Primary
    - generic: "#eff1f3"
    - generic: Secondary
    - generic: "#333333"
    - generic: Tertiary
    - generic: "#ffffff"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Settings · Payment methods

Purpose: Starts online payment setup and introduces physical terminals.

Layout and behavior: Main introduction and Dintero terminal section; Start now opens company-information prerequisite overlay.

Dependencies: Company details are required; payment connection was not completed.


### 70-settings-payment-methods

[Desktop](screens/70-settings-payment-methods-desktop.png) · [Phone](screens/70-settings-payment-methods-phone.png)

Observed URL: [https://app.linework.com/manager/settings/paymentmethods](https://app.linework.com/manager/settings/paymentmethods)

Calls to action appear in order: Start now → I'm interested. No terminal inquiry was submitted.

Buttons in DOM order: `button "Start now":` → `button "I'm interested":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Payment methods
  - generic: Manage your accepted payment methods.
  - generic: Get started with payments
  - generic: Get paid by clients online with payment links and QR-codes.
  - generic: Record cash payments.
  - generic: Protect against no-shows and cancelations with payment deposits.
  - generic: Get paid commissions from artists automatically when they accept payments.
  - button "Start now":
    - generic: Start now
  - separator
  - generic: Dintero terminal
  - generic: Connect physical Dintero card terminals to accept card payments directly in your studio.
  - button "I'm interested":
    - generic: I'm interested

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 71-settings-payments-start

[Desktop](screens/71-settings-payments-start-desktop.png) · [Phone](screens/71-settings-payments-start-phone.png)

Observed URL: [https://app.linework.com/manager/settings/paymentmethods](https://app.linework.com/manager/settings/paymentmethods)

Payment setup stops at company-details gate; Add company details → Cancel are visible.

Buttons in DOM order: `button "Start now" [active]:` → `button "I'm interested":` → `button:` → `button "Add company details"` → `button "Cancel"`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Payment methods
  - generic: Manage your accepted payment methods.
  - generic: Get started with payments
  - generic: Get paid by clients online with payment links and QR-codes.
  - generic: Record cash payments.
  - generic: Protect against no-shows and cancelations with payment deposits.
  - generic: Get paid commissions from artists automatically when they accept payments.
  - button "Start now" [active]:
    - generic: Start now
  - separator
  - generic: Dintero terminal
  - generic: Connect physical Dintero card terminals to accept card payments directly in your studio.
  - button "I'm interested":
    - generic: I'm interested
- button:
- banner:
  - strong: Get started with payments
- paragraph: Some details about your company is required to get started.
- button "Add company details"
- button "Cancel"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Settings · Services

Purpose: Configures service definitions, providers, pricing, duration, imagery and booking.

Layout and behavior: Services list with category controls; Create service editor overlays it with persistent Cancel/Save changes actions and section navigation.

Dependencies: Providers require active artists; pricing/VAT, duration, images and online booking are service-level settings. No service saved.


### 72-settings-services

[Desktop](screens/72-settings-services-desktop.png) · [Phone](screens/72-settings-services-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category":
    - generic: Add category
  - generic: Tattoo
  - button "Edit category":
    - generic: Edit category
  - button "Add service":
    - generic: Add service
  - generic: Tattoo
  - generic: PRESET BY LINEWORK
  - generic: From 1h
  - generic: Tips
  - button:
  - generic: Consultation
  - generic: PRESET BY LINEWORK
  - generic: 30min
  - button:

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 73-settings-service-add

[Desktop](screens/73-settings-service-add-desktop.png) · [Phone](screens/73-settings-service-add-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Editor section labels: General settings, Service Providers, Pricing & Taxes, Service duration, Service images, Online booking. English/Norwegian names and descriptions, service category and tips are visible.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service" [active]:` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":` → `button "🇺🇸 English"` → `button "🇳🇴 Norwegian"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / hidden | false |

| 2 | not associated | — | INPUT / search | false |

| 3 | not associated | Enter english service name | INPUT / text | false |

| 4 | not associated | Enter norwegian service name | INPUT / text | false |

| 5 | not associated | — | TEXTAREA / not specified | false |

| 6 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category":
    - generic: Add category
  - generic: Tattoo
  - button "Edit category":
    - generic: Edit category
  - button "Add service" [active]:
    - generic: Add service
  - generic: Tattoo
  - generic: PRESET BY LINEWORK
  - generic: From 1h
  - generic: Tips
  - button:
  - generic: Consultation
  - generic: PRESET BY LINEWORK
  - generic: 30min
  - button:
- banner:
  - generic: Create service
  - generic: Tattoo
  - generic: /
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Service images
- generic: Online booking
- generic: General settings
- text: Service Category
- combobox:
  - searchbox: Tattoo
- separator
- text: Service Name
- generic: 🇺🇸 English Name
- textbox "Enter english service name"
- generic: Will be displayed in Linework and client messages in english.
- generic: 🇳🇴 Norwegian Name
- textbox "Enter norwegian service name"
- separator
- text: Service Description
- banner:
  - button "🇺🇸 English"
  - button "🇳🇴 Norwegian"
- textbox
- generic: Will be displayed in your online booking page.
- separator
- text: Tips
- checkbox "Allow tips on checkout"
- generic: Allow tips on checkout

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 74-settings-service-service-providers

[Desktop](screens/74-settings-service-service-providers-desktop.png) · [Phone](screens/74-settings-service-service-providers-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

“You have no active service providers in the studio.” Manage artists is offered. Rent-settlement VAT searchbox is disabled and shows 0.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":` → `button "Manage artists":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / hidden | false |

| 2 | not associated | — | INPUT / search | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category":
    - generic: Add category
  - generic: Tattoo
  - button "Edit category":
    - generic: Edit category
  - button "Add service":
    - generic: Add service
  - generic: Tattoo
  - generic: PRESET BY LINEWORK
  - generic: From 1h
  - generic: Tips
  - button:
  - generic: Consultation
  - generic: PRESET BY LINEWORK
  - generic: 30min
  - button:
- banner:
  - generic: Create service
  - generic: Tattoo
  - generic: /
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Service images
- generic: Online booking
- generic: Service providers
- generic: Enable for the people providing this service. When enabled, the service provider can co-manage appointments with this service and edit some settings for studio based services.
- generic: You have no active service providers in the studio.
- button "Manage artists":
  - generic: Manage artists
- separator
- generic: VAT on commission-based rent settlements
- generic: Mirrors the VAT set in Pricing & Taxes. VAT will be added on top of the commission amount determined by your commission setting for each service provider.
- generic: VAT rate for rent settlements
- combobox:
  - searchbox [disabled]: "0"

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 75-settings-service-pricing-and-taxes

[Desktop](screens/75-settings-service-pricing-and-taxes-desktop.png) · [Phone](screens/75-settings-service-pricing-and-taxes-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Pricing choices visible: Variable pricing, Fixed pricing, Free of charge. Set pricing including VAT is checked. Provider pricing table is empty.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / hidden | false |

| 2 | not associated | — | INPUT / search | false |

| 3 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category":
    - generic: Add category
  - generic: Tattoo
  - button "Edit category":
    - generic: Edit category
  - button "Add service":
    - generic: Add service
  - generic: Tattoo
  - generic: PRESET BY LINEWORK
  - generic: From 1h
  - generic: Tips
  - button:
  - generic: Consultation
  - generic: PRESET BY LINEWORK
  - generic: 30min
  - button:
- banner:
  - generic: Create service
  - generic: Tattoo
  - generic: /
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Service images
- generic: Online booking
- generic: Pricing & Taxes
- generic: Set the pricing scheme for this service.
- generic: Variable pricing
- generic: Pricing of this service can be set on a per-appointment basis.
- generic: Fixed pricing
- generic: Set a static price that does not change.
- generic: Free of charge
- generic: Offer this service for free. This will disable checkout for this service.
- separator
- generic: VAT rate
- combobox:
  - searchbox: "0"
- separator
- generic: Pricing
- checkbox "Set pricing including VAT" [checked]
- generic: Set pricing including VAT
- table:
  - rowgroup:
    - row "Service provider Default rate ex. VAT VAT Default rate inc. VAT":
      - columnheader "Service provider"
      - columnheader "Default rate ex. VAT"
      - columnheader "VAT"
      - columnheader "Default rate inc. VAT"
  - rowgroup

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 76-settings-service-service-duration

[Desktop](screens/76-settings-service-service-duration-desktop.png) · [Phone](screens/76-settings-service-service-duration-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Duration choices: Variable duration / Fixed duration; hour/minute buttons show 1 hour and 0 Minutes. Combining services is a checkbox.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":` → `button "1 hour":` → `button "0 Minutes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category":
    - generic: Add category
  - generic: Tattoo
  - button "Edit category":
    - generic: Edit category
  - button "Add service":
    - generic: Add service
  - generic: Tattoo
  - generic: PRESET BY LINEWORK
  - generic: From 1h
  - generic: Tips
  - button:
  - generic: Consultation
  - generic: PRESET BY LINEWORK
  - generic: 30min
  - button:
- banner:
  - generic: Create service
  - generic: Tattoo
  - generic: /
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Service images
- generic: Online booking
- generic: Service duration
- generic: Set the duration of this service.
- generic: Variable duration
- generic: Duration of this service varies and can be set per appointment.
- generic: Fixed duration
- generic: Duration for this service is fixed.
- separator
- text: Duration of service
- button "1 hour":
  - generic: 1 hour
- generic: ":"
- button "0 Minutes":
  - generic: 0 Minutes
- separator
- checkbox
- generic: Allow combining with other services for same appointment
- generic: If enabled, this service can be combined with other services that have this enabled. This applies to service appointments set up by the service provider, managers and for clients booking online.

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 77-settings-service-service-images

[Desktop](screens/77-settings-service-service-images-desktop.png) · [Phone](screens/77-settings-service-service-images-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Upload UI only: Drag & drop here / Select from files. Formats listed .jpg, .png, .heic, .webp, .avif; no image selected or uploaded.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":` → `button "Select from files":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / file | false |


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category":
    - generic: Add category
  - generic: Tattoo
  - button "Edit category":
    - generic: Edit category
  - button "Add service":
    - generic: Add service
  - generic: Tattoo
  - generic: PRESET BY LINEWORK
  - generic: From 1h
  - generic: Tips
  - button:
  - generic: Consultation
  - generic: PRESET BY LINEWORK
  - generic: 30min
  - button:
- banner:
  - generic: Create service
  - generic: Tattoo
  - generic: /
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Service images
- generic: Online booking
- generic: Service images
- generic: Add images to your service to help your customers understand what they will get.
- generic: Drag & drop here
- generic: or
- button "Select from files":
  - generic: Select from files
- generic: "Formats: .jpg, .png, .heic, .webp, .avif"
- generic: max

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


### 78-settings-service-online-booking

[Desktop](screens/78-settings-service-online-booking-desktop.png) · [Phone](screens/78-settings-service-online-booking-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Online booking choices visible: Enable Direct Online Booking / Disable Online Booking; no service saved.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":`.

No native field metadata recorded for this state; see exact accessible controls below.


<details><summary>Exact desktop labels, tabs, headings, fields, options and empty-state copy</summary>


```yaml

- generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category":
    - generic: Add category
  - generic: Tattoo
  - button "Edit category":
    - generic: Edit category
  - button "Add service":
    - generic: Add service
  - generic: Tattoo
  - generic: PRESET BY LINEWORK
  - generic: From 1h
  - generic: Tips
  - button:
  - generic: Consultation
  - generic: PRESET BY LINEWORK
  - generic: 30min
  - button:
- banner:
  - generic: Create service
  - generic: Tattoo
  - generic: /
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Service images
- generic: Online booking
- generic: Online booking
- generic: Settings for online booking capabilities for this service.
- generic: Enable Direct Online Booking
- generic: Let people book appointments with this service directly from your studio booking page.
- generic: Disable Online Booking
- generic: Don’t allow online booking.

```

</details>

Phone DOM exposes the same state labels and controls; use the paired screenshot for its layout.


## Coverage boundary

This file intentionally stops at state 78. Later observations belong in the main README or a subsequent capture appendix. Each linked screenshot pair is expected to be converted to PNG by the capture owner before delivery. Expanding a form or changing an unsaved local tab does not prove that saving, inviting, paying, uploading or connecting would succeed.
