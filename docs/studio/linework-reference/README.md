# Linework studio reference

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

## Complete your setup

**Purpose:** Explains the studio preparation checklist.

**Layout and behavior:** Right complementary panel with expandable items, action buttons inside each item. Hide this guide forever was not used.

**Dependencies and boundaries:** Logo, payments, artists, requests, forms, instructions, services, skins, products and gift-card setup.

### 01-setup-panel

[Desktop](screens/01-setup-panel-desktop.png) · [Phone](screens/01-setup-panel-phone.png) · [Detailed notes](CAPTURE-NOTES.md#01-setup-panel)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 02-setup-logo

[Desktop](screens/02-setup-logo-desktop.png) · [Phone](screens/02-setup-logo-phone.png) · [Detailed notes](CAPTURE-NOTES.md#02-setup-logo)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 03-setup-get-started-with-payments

[Desktop](screens/03-setup-get-started-with-payments-desktop.png) · [Phone](screens/03-setup-get-started-with-payments-phone.png) · [Detailed notes](CAPTURE-NOTES.md#03-setup-get-started-with-payments)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 04-setup-invite-your-artists

[Desktop](screens/04-setup-invite-your-artists-desktop.png) · [Phone](screens/04-setup-invite-your-artists-phone.png) · [Detailed notes](CAPTURE-NOTES.md#04-setup-invite-your-artists)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 05-setup-start-accepting-requests

[Desktop](screens/05-setup-start-accepting-requests-desktop.png) · [Phone](screens/05-setup-start-accepting-requests-phone.png) · [Detailed notes](CAPTURE-NOTES.md#05-setup-start-accepting-requests)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 06-setup-stay-protected-with-forms

[Desktop](screens/06-setup-stay-protected-with-forms-desktop.png) · [Phone](screens/06-setup-stay-protected-with-forms-phone.png) · [Detailed notes](CAPTURE-NOTES.md#06-setup-stay-protected-with-forms)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 07-setup-inform-with-instructions

[Desktop](screens/07-setup-inform-with-instructions-desktop.png) · [Phone](screens/07-setup-inform-with-instructions-phone.png) · [Detailed notes](CAPTURE-NOTES.md#07-setup-inform-with-instructions)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 08-setup-add-more-services

[Desktop](screens/08-setup-add-more-services-desktop.png) · [Phone](screens/08-setup-add-more-services-phone.png) · [Detailed notes](CAPTURE-NOTES.md#08-setup-add-more-services)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 09-setup-make-it-yours

[Desktop](screens/09-setup-make-it-yours-desktop.png) · [Phone](screens/09-setup-make-it-yours-phone.png) · [Detailed notes](CAPTURE-NOTES.md#09-setup-make-it-yours)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 10-setup-add-products-to-sell

[Desktop](screens/10-setup-add-products-to-sell-desktop.png) · [Phone](screens/10-setup-add-products-to-sell-phone.png) · [Detailed notes](CAPTURE-NOTES.md#10-setup-add-products-to-sell)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 11-setup-start-selling-gift-cards

[Desktop](screens/11-setup-start-selling-gift-cards-desktop.png) · [Phone](screens/11-setup-start-selling-gift-cards-phone.png) · [Detailed notes](CAPTURE-NOTES.md#11-setup-start-selling-gift-cards)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

## Calendar

**Purpose:** Schedules artist appointments.

**Layout and behavior:** Mini calendar and filters at left, week time grid at right. The no-active-artists overlay blocks working booking controls; state 13 is an attempted day switch and still shows the week grid.

**Dependencies and boundaries:** Active artists are required. Day view, genuine booking/time-slot detail and new-booking last step could not be reached in this trial.

### 12-calendar-week

[Desktop](screens/12-calendar-week-desktop.png) · [Phone](screens/12-calendar-week-phone.png) · [Detailed notes](CAPTURE-NOTES.md#12-calendar-week)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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
```

</details>

### 13-calendar-day

[Desktop](screens/13-calendar-day-desktop.png) · [Phone](screens/13-calendar-day-phone.png) · [Detailed notes](CAPTURE-NOTES.md#13-calendar-day)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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
```

</details>

## Tattoo requests

**Purpose:** Reviews incoming tattoo booking requests.

**Layout and behavior:** Full page with Unreplied, Pending and Archive tabs; archive subdivides Booked, Canceled and Declined. Display preferences open a dialog with sorting and ascending/descending choices.

**Dependencies and boundaries:** Online booking request acceptance and artist availability; no request detail exists in the empty trial.

### 14-tattoo-requests

[Desktop](screens/14-tattoo-requests-desktop.png) · [Phone](screens/14-tattoo-requests-phone.png) · [Detailed notes](CAPTURE-NOTES.md#14-tattoo-requests)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 15-requests-pending

[Desktop](screens/15-requests-pending-desktop.png) · [Phone](screens/15-requests-pending-phone.png) · [Detailed notes](CAPTURE-NOTES.md#15-requests-pending)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 16-requests-archive

[Desktop](screens/16-requests-archive-desktop.png) · [Phone](screens/16-requests-archive-phone.png) · [Detailed notes](CAPTURE-NOTES.md#16-requests-archive)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 127-requests-sort

[Desktop](screens/127-requests-sort-desktop.png) · [Phone](screens/127-requests-sort-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#127-requests-sort)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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
    - button "By Time submitted, Newest first" [active]:
      - generic: By Time submitted, Newest first
    - separator
    - generic: Nothing to see here
- button:
- banner:
  - generic: Display preferences
- generic: "Sort requests by:"
- radio "Time submitted Estimated project cost" [checked]
- generic: Time submitted
- radio "Appointment time"
- generic: Appointment time
- radio
- generic: Estimated project cost
- generic: "Order by:"
- radio "Newest first" [checked]
- generic: Newest first
- radio "Oldest first"
- generic: Oldest first
- button "Cancel":
  - generic: Cancel
- button "Apply":
  - generic: Apply
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

### 128-requests-archive-canceled

[Desktop](screens/128-requests-archive-canceled-desktop.png) · [Phone](screens/128-requests-archive-canceled-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#128-requests-archive-canceled)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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
    - tab "Archive" [selected]:
      - generic: Archive
  - tabpanel "Archive":
    - tablist:
      - tab "Booked":
        - generic: Booked
      - tab "Canceled" [active] [selected]:
        - generic: Canceled
      - tab "Declined":
        - generic: Declined
    - tabpanel "Canceled":
      - generic: Nothing to see here
```

</details>

### 129-requests-archive-declined

[Desktop](screens/129-requests-archive-declined-desktop.png) · [Phone](screens/129-requests-archive-declined-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#129-requests-archive-declined)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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
    - tab "Archive" [selected]:
      - generic: Archive
  - tabpanel "Archive":
    - tablist:
      - tab "Booked":
        - generic: Booked
      - tab "Canceled":
        - generic: Canceled
      - tab "Declined" [active] [selected]:
        - generic: Declined
    - tabpanel "Declined":
      - generic: Nothing to see here
```

</details>

## Notifications

**Purpose:** Shows studio notifications.

**Layout and behavior:** Bell opens a floating panel; screenshot text is Notifications and No notifications yet. This text is absent from the accessible DOM.

**Dependencies and boundaries:** Studio events; no notification item available.

### 125-notifications

[Desktop](screens/125-notifications-desktop.png) · [Phone](screens/125-notifications-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#125-notifications)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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
```

</details>

### 126-notifications-empty-loaded

[Desktop](screens/126-notifications-empty-loaded-desktop.png) · [Phone](screens/126-notifications-empty-loaded-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#126-notifications-empty-loaded)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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
```

</details>

## New deposit

**Purpose:** Creates a client deposit/payment.

**Layout and behavior:** Right side panel headed New payment with client Name, Email (optional), telephone/country selector, amount, Close and disabled Add payment.

**Dependencies and boundaries:** A client and amount; final creation never clicked.

### 17-new-deposit

[Desktop](screens/17-new-deposit-desktop.png) · [Phone](screens/17-new-deposit-phone.png) · [Detailed notes](CAPTURE-NOTES.md#17-new-deposit)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Name",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Email (optional)",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "+47 917 45 834",
    "required": false,
    "tag": "INPUT",
    "type": "tel"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  }
]
```

</details>

## New sale

**Purpose:** Builds a sale cart for products or gift cards.

**Layout and behavior:** Complementary sale/cart and Add to cart panels; Products and Gift Cards tabs. No item was added to the cart.

**Dependencies and boundaries:** Retail products, gift-card configuration and payment setup; no checkout transaction inspected.

### 18-new-sale-products

[Desktop](screens/18-new-sale-products-desktop.png) · [Phone](screens/18-new-sale-products-phone.png) · [Detailed notes](CAPTURE-NOTES.md#18-new-sale-products)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

### 19-new-sale-gift-cards

[Desktop](screens/19-new-sale-gift-cards-desktop.png) · [Phone](screens/19-new-sale-gift-cards-phone.png) · [Detailed notes](CAPTURE-NOTES.md#19-new-sale-gift-cards)

Observed URL: `https://app.linework.com/manager/calendar`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
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

## Clients

**Purpose:** Manages client records, deposits and submitted forms.

**Layout and behavior:** List/table page with client search and tabs; Add new client opens a right side panel with name, email, phone and disabled Create client. Deposit and form filters open dropdown menus.

**Dependencies and boundaries:** Client records and form/deposit history; there are no clients to open.

### 20-clients-list

[Desktop](screens/20-clients-list-desktop.png) · [Phone](screens/20-clients-list-phone.png) · [Detailed notes](CAPTURE-NOTES.md#20-clients-list)

Observed URL: `https://app.linework.com/manager/clients`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 21-clients-add

[Desktop](screens/21-clients-add-desktop.png) · [Phone](screens/21-clients-add-phone.png) · [Detailed notes](CAPTURE-NOTES.md#21-clients-add)

Observed URL: `https://app.linework.com/manager/clients`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter client name",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter client email",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "+47 917 45 834",
    "required": false,
    "tag": "INPUT",
    "type": "tel"
  }
]
```

</details>

### 22-clients-deposits

[Desktop](screens/22-clients-deposits-desktop.png) · [Phone](screens/22-clients-deposits-phone.png) · [Detailed notes](CAPTURE-NOTES.md#22-clients-deposits)

Observed URL: `https://app.linework.com/manager/clients/deposits`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 23-clients-forms

[Desktop](screens/23-clients-forms-desktop.png) · [Phone](screens/23-clients-forms-phone.png) · [Detailed notes](CAPTURE-NOTES.md#23-clients-forms)

Observed URL: `https://app.linework.com/manager/clients/releases`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 132-clients-loaded-empty

[Desktop](screens/132-clients-loaded-empty-desktop.png) · [Phone](screens/132-clients-loaded-empty-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#132-clients-loaded-empty)

Observed URL: `https://app.linework.com/manager/clients`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 133-clients-deposit-status

[Desktop](screens/133-clients-deposit-status-desktop.png) · [Phone](screens/133-clients-deposit-status-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#133-clients-deposit-status)

Observed URL: `https://app.linework.com/manager/clients/deposits`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- tablist:
  - tab "Clients"
  - tab "Deposits" [selected]
  - tab "Forms"
- banner:
  - textbox "Search"
  - generic: All statuses
  - button "All statuses":
    - generic: All statuses
  - button "Pending":
    - generic: Pending
  - button "Valid":
    - generic: Valid
  - button "Redeemed":
    - generic: Redeemed
  - button "Forfeited":
    - generic: Forfeited
  - button "Refunded":
    - generic: Refunded
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 134-clients-form-status

[Desktop](screens/134-clients-form-status-desktop.png) · [Phone](screens/134-clients-form-status-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#134-clients-form-status)

Observed URL: `https://app.linework.com/manager/clients/releases`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
  - button "All statuses":
    - generic: All statuses
  - button "Completed":
    - generic: Completed
  - button "Pending":
    - generic: Pending
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 135-clients-form-time

[Desktop](screens/135-clients-form-time-desktop.png) · [Phone](screens/135-clients-form-time-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#135-clients-form-time)

Observed URL: `https://app.linework.com/manager/clients/releases`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- tablist:
  - tab "Clients"
  - tab "Deposits"
  - tab "Forms" [selected]
- button "Export" [disabled]
- banner:
  - generic: All time
  - button "All time":
    - generic: All time
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

## Sales

**Purpose:** Lists recorded sales by period and seller/payment filters.

**Layout and behavior:** Toolbar above a table; columns Sale, Payment Type, Time, Seller, Service provider, Client, Amount. Empty copy: No sales recorded this day. Day/Week/Month/Year/Custom and custom date picker captured.

**Dependencies and boundaries:** Sales, providers and cashiers; All service providers exposes no populated menu with no active artists.

### 24-sales-day

[Desktop](screens/24-sales-day-desktop.png) · [Phone](screens/24-sales-day-phone.png) · [Detailed notes](CAPTURE-NOTES.md#24-sales-day)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 25-sales-range-options

[Desktop](screens/25-sales-range-options-desktop.png) · [Phone](screens/25-sales-range-options-phone.png) · [Detailed notes](CAPTURE-NOTES.md#25-sales-range-options)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 26-sales-filter-0

[Desktop](screens/26-sales-filter-0-desktop.png) · [Phone](screens/26-sales-filter-0-phone.png) · [Detailed notes](CAPTURE-NOTES.md#26-sales-filter-0)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 27-sales-filter-1

[Desktop](screens/27-sales-filter-1-desktop.png) · [Phone](screens/27-sales-filter-1-phone.png) · [Detailed notes](CAPTURE-NOTES.md#27-sales-filter-1)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 28-sales-filter-2

[Desktop](screens/28-sales-filter-2-desktop.png) · [Phone](screens/28-sales-filter-2-phone.png) · [Detailed notes](CAPTURE-NOTES.md#28-sales-filter-2)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 29-sales-filter-3

[Desktop](screens/29-sales-filter-3-desktop.png) · [Phone](screens/29-sales-filter-3-phone.png) · [Detailed notes](CAPTURE-NOTES.md#29-sales-filter-3)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 30-sales-filter-4

[Desktop](screens/30-sales-filter-4-desktop.png) · [Phone](screens/30-sales-filter-4-phone.png) · [Detailed notes](CAPTURE-NOTES.md#30-sales-filter-4)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 144-sales-custom-period

[Desktop](screens/144-sales-custom-period-desktop.png) · [Phone](screens/144-sales-custom-period-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#144-sales-custom-period)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- generic: Sales
- generic: Custom
- button "October 12th, 2026":
  - text: October 12th, 2026
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
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 145-sales-custom-date-picker

[Desktop](screens/145-sales-custom-date-picker-desktop.png) · [Phone](screens/145-sales-custom-date-picker-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#145-sales-custom-date-picker)

Observed URL: `https://app.linework.com/manager/sales`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- generic: Sales
- generic: Custom
- button "October 12th, 2026" [active]:
  - text: October 12th, 2026
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
    - row "40 Mon Sep 28 2026 Tue Sep 29 2026 Wed Sep 30 2026 Thu Oct 01 2026 Fri Oct 02 2026 Sat Oct 03 2026 Sun Oct 04 2026":
      - gridcell "40"
      - gridcell "Mon Sep 28 2026" [disabled]: "28"
      - gridcell "Tue Sep 29 2026" [disabled]: "29"
      - gridcell "Wed Sep 30 2026" [disabled]: "30"
      - gridcell "Thu Oct 01 2026": "1"
      - gridcell "Fri Oct 02 2026": "2"
      - gridcell "Sat Oct 03 2026": "3"
      - gridcell "Sun Oct 04 2026": "4"
    - row "41 Mon Oct 05 2026 Tue Oct 06 2026 Wed Oct 07 2026 Thu Oct 08 2026 Fri Oct 09 2026 Sat Oct 10 2026 Sun Oct 11 2026":
      - gridcell "41"
      - gridcell "Mon Oct 05 2026": "5"
      - gridcell "Tue Oct 06 2026": "6"
      - gridcell "Wed Oct 07 2026": "7"
      - gridcell "Thu Oct 08 2026": "8"
      - gridcell "Fri Oct 09 2026": "9"
      - gridcell "Sat Oct 10 2026": "10"
      - gridcell "Sun Oct 11 2026": "11"
    - row "42 Mon Oct 12 2026 Tue Oct 13 2026 Wed Oct 14 2026 Thu Oct 15 2026 Fri Oct 16 2026 Sat Oct 17 2026 Sun Oct 18 2026":
      - gridcell "42"
      - gridcell "Mon Oct 12 2026": "12"
      - gridcell "Tue Oct 13 2026" [disabled]: "13"
      - gridcell "Wed Oct 14 2026" [disabled]: "14"
      - gridcell "Thu Oct 15 2026" [disabled]: "15"
      - gridcell "Fri Oct 16 2026" [disabled]: "16"
      - gridcell "Sat Oct 17 2026" [disabled]: "17"
      - gridcell "Sun Oct 18 2026" [disabled]: "18"
    - row "43 Mon Oct 19 2026 Tue Oct 20 2026 Wed Oct 21 2026 Thu Oct 22 2026 Fri Oct 23 2026 Sat Oct 24 2026 Sun Oct 25 2026":
      - gridcell "43"
      - gridcell "Mon Oct 19 2026" [disabled]: "19"
      - gridcell "Tue Oct 20 2026" [disabled]: "20"
      - gridcell "Wed Oct 21 2026" [disabled]: "21"
      - gridcell "Thu Oct 22 2026" [disabled]: "22"
      - gridcell "Fri Oct 23 2026" [disabled]: "23"
      - gridcell "Sat Oct 24 2026" [disabled]: "24"
      - gridcell "Sun Oct 25 2026" [disabled]: "25"
    - row "44 Mon Oct 26 2026 Tue Oct 27 2026 Wed Oct 28 2026 Thu Oct 29 2026 Fri Oct 30 2026 Sat Oct 31 2026 Sun Nov 01 2026":
      - gridcell "44"
      - gridcell "Mon Oct 26 2026" [disabled]: "26"
      - gridcell "Tue Oct 27 2026" [disabled]: "27"
      - gridcell "Wed Oct 28 2026" [disabled]: "28"
      - gridcell "Thu Oct 29 2026" [disabled]: "29"
      - gridcell "Fri Oct 30 2026" [disabled]: "30"
      - gridcell "Sat Oct 31 2026" [disabled]: "31"
      - gridcell "Sun Nov 01 2026" [disabled]: "1"
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
- generic: No sales recorded for this time period
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Gift Cards

**Purpose:** Tracks gift cards and configures their online store.

**Layout and behavior:** Summary and list; Share gift store opens a modal with URL/QR. Store settings, card settings and terms are tabs; Customize terms opens an editor with existing textboxes.

**Dependencies and boundaries:** Payment setup gates Enable store. Minimum/maximum value, validity6 months/1year/2years and expired-card payout setting observed without editing.

### 31-gift-cards-dashboard

[Desktop](screens/31-gift-cards-dashboard-desktop.png) · [Phone](screens/31-gift-cards-dashboard-phone.png) · [Detailed notes](CAPTURE-NOTES.md#31-gift-cards-dashboard)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 32-gift-cards-share

[Desktop](screens/32-gift-cards-share-desktop.png) · [Phone](screens/32-gift-cards-share-phone.png) · [Detailed notes](CAPTURE-NOTES.md#32-gift-cards-share)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 33-gift-cards-store-settings

[Desktop](screens/33-gift-cards-store-settings-desktop.png) · [Phone](screens/33-gift-cards-store-settings-phone.png) · [Detailed notes](CAPTURE-NOTES.md#33-gift-cards-store-settings)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 34-gift-cards-card-settings

[Desktop](screens/34-gift-cards-card-settings-desktop.png) · [Phone](screens/34-gift-cards-card-settings-phone.png) · [Detailed notes](CAPTURE-NOTES.md#34-gift-cards-card-settings)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 35-gift-cards-terms

[Desktop](screens/35-gift-cards-terms-desktop.png) · [Phone](screens/35-gift-cards-terms-phone.png) · [Detailed notes](CAPTURE-NOTES.md#35-gift-cards-terms)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 136-gift-cards-loaded

[Desktop](screens/136-gift-cards-loaded-desktop.png) · [Phone](screens/136-gift-cards-loaded-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#136-gift-cards-loaded)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 137-gift-cards-sources

[Desktop](screens/137-gift-cards-sources-desktop.png) · [Phone](screens/137-gift-cards-sources-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#137-gift-cards-sources)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
  - button "All sources":
    - generic: All sources
  - button "At studio":
    - generic: At studio
  - button "Online":
    - generic: Online
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 138-gift-cards-status

[Desktop](screens/138-gift-cards-status-desktop.png) · [Phone](screens/138-gift-cards-status-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#138-gift-cards-status)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
  - button "All statuses":
    - generic: All statuses
  - button "Valid":
    - generic: Valid
  - button "Expired":
    - generic: Expired
  - button "Paid out":
    - generic: Paid out
  - button "Redeemed":
    - generic: Redeemed
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 139-gift-cards-duration-options

[Desktop](screens/139-gift-cards-duration-options-desktop.png) · [Phone](screens/139-gift-cards-duration-options-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#139-gift-cards-duration-options)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
  - button "Terms & conditions"
- generic: Minimum allowed Gift Card value
- textbox "Minimum allowed Gift Card value": "500"
- generic: Maximum allowed Gift Card value
- textbox "Maximum allowed Gift Card value": "10000"
- separator
- generic: Valid duration from time of purchase
- combobox [expanded]:
  - searchbox [active]: 1 år
  - listbox:
    - option "6 måneder"
    - option "1 år" [selected]
    - option "2 år"
- separator
- generic: Pay out expired gift cards automatically
- generic: When an unused gift card expires, automatically pay the remaining balance out to the studio. When off, the card is marked expired and you're notified so you can pay it out manually or contact the client.
- button "Cancel"
- button "Save settings"
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 140-gift-cards-custom-terms

[Desktop](screens/140-gift-cards-custom-terms-desktop.png) · [Phone](screens/140-gift-cards-custom-terms-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#140-gift-cards-custom-terms)

Observed URL: `https://app.linework.com/manager/giftcards`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
  - button "Terms & conditions"
- generic: Gift card terms
- generic: Shown to the buyer before they complete their purchase. The bullet about the gift card's duration is added automatically.
- textbox: Gavekortet er ikke refunderbart og kan kun brukes som betalingsmiddel for tjenester på studioet.
- button:
- textbox: Hvis gavekortet ikke dekker hele beløpet som skal betales for tjenestene, kan resten betales med andre betalingsmetoder.
- button:
- textbox: Når betalingen av gavekortet er fullført og gavekortdetaljene er sendt til den oppgitte e-postadressen, er studioet fritatt for ansvar. Studioet er ikke ansvarlig for tap av gavekortdetaljer eller hvis det havner i feil hender.
- button:
- button "Add term":
  - generic: Add term
- button "Reset to defaults":
  - generic: Reset to defaults
- button "Use default terms":
  - generic: Use default terms
- button "Cancel"
- button "Save settings"
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Settlements

**Purpose:** Tracks studio rent invoices and artist commissions.

**Layout and behavior:** Summary cards and monthly commissions; All invoices opens a new full-page table. New invoice opens Complete invoicing setup gate. Invoice period and status dropdowns captured.

**Dependencies and boundaries:** Company/invoicing setup and artist commission/rent agreements. No payout execution or populated commission detail available.

### 36-settlements-dashboard

[Desktop](screens/36-settlements-dashboard-desktop.png) · [Phone](screens/36-settlements-dashboard-phone.png) · [Detailed notes](CAPTURE-NOTES.md#36-settlements-dashboard)

Observed URL: `https://app.linework.com/manager/settlement`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 37-settlements-new-invoice

[Desktop](screens/37-settlements-new-invoice-desktop.png) · [Phone](screens/37-settlements-new-invoice-phone.png) · [Detailed notes](CAPTURE-NOTES.md#37-settlements-new-invoice)

Observed URL: `https://app.linework.com/manager/settlement`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 38-settlements-invoice-setup

[Desktop](screens/38-settlements-invoice-setup-desktop.png) · [Phone](screens/38-settlements-invoice-setup-phone.png) · [Detailed notes](CAPTURE-NOTES.md#38-settlements-invoice-setup)

Observed URL: `https://app.linework.com/manager/settings/company`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- banner:
- banner:
  - img "Infinity test":
    - generic: IT
- generic: Infinity test
- generic: Myrveien 17B
- text: Calendar
- text: Clients
- generic: Financials
- text: Sales
- text: Gift Cards
- text: Settlements
- text: Reports
- generic: News
- text: Flash
- generic: NEW
- generic: Marketing
- text: Reviews
- contentinfo:
  - text: Artists
  - text: Managers
  - text: Products
  - text: Settings
  - text: Get help
- complementary:
  - generic: Settings
  - button "Studio setup":
    - generic: Studio setup
  - button "Theme":
    - generic: Theme
  - button "Skins":
    - generic: Skins
  - button "Payment methods":
    - generic: Payment methods
  - button "Services":
    - generic: Services
  - button "Flash":
    - generic: Flash
  - button "Online booking":
    - generic: Online booking
  - button "Forms":
    - generic: Forms
  - button "Instructions":
    - generic: Instructions
  - button "Cash Register":
    - generic: Cash Register
  - button "Company details":
    - generic: Company details
  - button "Integrations":
    - generic: Integrations
  - button "Client support":
    - generic: Client support
  - button "Subscription & Billing":
    - generic: Subscription & Billing
- main
```

</details>

### 141-settlements-all-invoices

[Desktop](screens/141-settlements-all-invoices-desktop.png) · [Phone](screens/141-settlements-all-invoices-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#141-settlements-all-invoices)

Observed URL: `https://app.linework.com/manager/settlement/invoiced/all`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- button:
- generic: Invoices
- button "New invoice":
  - text: New invoice
- generic: ISSUED
- generic: This year
- generic: TO
- generic: All
- generic: WITH STATUS
- generic: All
- textbox "Search"
- table:
  - rowgroup:
    - row "Artist Invoice no. Invoice status Date issued Date due Paid amount Invoice amount":
      - columnheader "Artist":
        - generic: Artist
      - columnheader "Invoice no.":
        - generic: Invoice no.
      - columnheader "Invoice status":
        - text: Invoice status
      - columnheader "Date issued":
        - text: Date issued
      - columnheader "Date due":
        - text: Date due
      - columnheader "Paid amount":
        - generic: Paid amount
      - columnheader "Invoice amount":
        - generic: Invoice amount
- generic: 0 selected
- button "Select all":
  - generic: Select all
- generic: 0,00 kr invoiced
- generic: 0,00 kr paid
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 142-settlements-invoice-period

[Desktop](screens/142-settlements-invoice-period-desktop.png) · [Phone](screens/142-settlements-invoice-period-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#142-settlements-invoice-period)

Observed URL: `https://app.linework.com/manager/settlement/invoiced/all`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- button:
- generic: Invoices
- button "New invoice":
  - text: New invoice
- generic: ISSUED
- generic: This year
- button "Today":
  - generic: Today
- button "Yesterday":
  - generic: Yesterday
- button "This week":
  - generic: This week
- button "Last week":
  - generic: Last week
- button "This month":
  - generic: This month
- button "Last month":
  - generic: Last month
- button "This year":
  - generic: This year
- button "Last year":
  - generic: Last year
- button "All time":
  - generic: All time
- generic: TO
- generic: All
- generic: WITH STATUS
- generic: All
- textbox "Search"
- table:
  - rowgroup:
    - row "Artist Invoice no. Invoice status Date issued Date due Paid amount Invoice amount":
      - columnheader "Artist":
        - generic: Artist
      - columnheader "Invoice no.":
        - generic: Invoice no.
      - columnheader "Invoice status":
        - text: Invoice status
      - columnheader "Date issued":
        - text: Date issued
      - columnheader "Date due":
        - text: Date due
      - columnheader "Paid amount":
        - generic: Paid amount
      - columnheader "Invoice amount":
        - generic: Invoice amount
- generic: No invoices found
- generic: 0 selected
- button "Select all":
  - generic: Select all
- generic: 0,00 kr invoiced
- generic: 0,00 kr paid
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 143-settlements-invoice-status

[Desktop](screens/143-settlements-invoice-status-desktop.png) · [Phone](screens/143-settlements-invoice-status-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#143-settlements-invoice-status)

Observed URL: `https://app.linework.com/manager/settlement/invoiced/all`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- button:
- generic: Invoices
- button "New invoice":
  - text: New invoice
- generic: ISSUED
- generic: This year
- generic: TO
- generic: All
- generic: WITH STATUS
- generic: All
- button "All":
  - generic: All
- button "Paid":
  - generic: Paid
- button "Unpaid":
  - generic: Unpaid
- button "Overdue":
  - generic: Overdue
- button "Pending":
  - generic: Pending
- button "Credit Note":
  - generic: Credit Note
- textbox "Search"
- table:
  - rowgroup:
    - row "Artist Invoice no. Invoice status Date issued Date due Paid amount Invoice amount":
      - columnheader "Artist":
        - generic: Artist
      - columnheader "Invoice no.":
        - generic: Invoice no.
      - columnheader "Invoice status":
        - text: Invoice status
      - columnheader "Date issued":
        - text: Date issued
      - columnheader "Date due":
        - text: Date due
      - columnheader "Paid amount":
        - generic: Paid amount
      - columnheader "Invoice amount":
        - generic: Invoice amount
- generic: No invoices found
- generic: 0 selected
- button "Select all":
  - generic: Select all
- generic: 0,00 kr invoiced
- generic: 0,00 kr paid
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Reports

**Purpose:** Summarizes revenue and provides report downloads.

**Layout and behavior:** Full-page summary cards and report actions. Revenue is the only observed report type; range menu offers Day and Month. Loaded states130/131 supersede early loading captures. CSV, Sales report and Month report labels recorded; downloads were not triggered.

**Dependencies and boundaries:** Recorded sales; no alternate report tab/type was exposed by this trial.

### 41-reports-revenue-day

[Desktop](screens/41-reports-revenue-day-desktop.png) · [Phone](screens/41-reports-revenue-day-phone.png) · [Detailed notes](CAPTURE-NOTES.md#41-reports-revenue-day)

Observed URL: `https://app.linework.com/manager/reports`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 42-reports-type-menu

[Desktop](screens/42-reports-type-menu-desktop.png) · [Phone](screens/42-reports-type-menu-phone.png) · [Detailed notes](CAPTURE-NOTES.md#42-reports-type-menu)

Observed URL: `https://app.linework.com/manager/reports`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 43-reports-range-options

[Desktop](screens/43-reports-range-options-desktop.png) · [Phone](screens/43-reports-range-options-phone.png) · [Detailed notes](CAPTURE-NOTES.md#43-reports-range-options)

Observed URL: `https://app.linework.com/manager/reports`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 44-reports-revenue-month

[Desktop](screens/44-reports-revenue-month-desktop.png) · [Phone](screens/44-reports-revenue-month-phone.png) · [Detailed notes](CAPTURE-NOTES.md#44-reports-revenue-month)

Observed URL: `https://app.linework.com/manager/reports`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 130-reports-loaded

[Desktop](screens/130-reports-loaded-desktop.png) · [Phone](screens/130-reports-loaded-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#130-reports-loaded)

Observed URL: `https://app.linework.com/manager/reports`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 131-reports-month-loaded

[Desktop](screens/131-reports-month-loaded-desktop.png) · [Phone](screens/131-reports-month-loaded-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#131-reports-month-loaded)

Observed URL: `https://app.linework.com/manager/reports`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- generic: Reports
- generic: Revenue
- generic: Month
- button:
- button "October, 2026":
  - text: October, 2026
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
- button "Month report":
  - text: Month report
```

</details>

## Flash

**Purpose:** Manages shared tattoo flash designs.

**Layout and behavior:** Left nav Flash opens Settings > Flash; empty shared-flashes area and Copy link.

**Dependencies and boundaries:** Artist/shared flash content; no flash item available.

### 45-flash-empty

[Desktop](screens/45-flash-empty-desktop.png) · [Phone](screens/45-flash-empty-phone.png) · [Detailed notes](CAPTURE-NOTES.md#45-flash-empty)

Observed URL: `https://app.linework.com/manager/settings/flash`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Flash
  - generic: Flash sheets artists have shared with your studio. Choose which appear on your booking page.
  - button "Copy link":
    - generic: Copy link
  - generic: Nothing shared yet
  - generic: When artists share flash with your studio, it will show up here.
```

</details>

## Reviews

**Purpose:** Connects review promotion to Google Reviews.

**Layout and behavior:** Feature unavailable page with support/promotional actions. Contact support and I’m ready were not submitted.

**Dependencies and boundaries:** Studio eligibility; unavailable for Infinity test.

### 46-reviews-unavailable

[Desktop](screens/46-reviews-unavailable-desktop.png) · [Phone](screens/46-reviews-unavailable-phone.png) · [Detailed notes](CAPTURE-NOTES.md#46-reviews-unavailable)

Observed URL: `https://app.linework.com/manager/googlereview`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

## Artists

**Purpose:** Manages artist membership and commercial agreements.

**Layout and behavior:** Active, Invited, Inactive and All Artists list tabs; invitation modal includes email/name/nickname, Commission based or Fixed rent, seller selection and explanatory accordions. Fixed rent interval, invoice day, VAT and due-period menus captured.

**Dependencies and boundaries:** No active artists. Commission slider40%studio/60%artist, monthly/weekly rent, day1–31, VAT0/12/15/25%, due7/14/30days. Invitation was never sent; existing artist commission/rent/payout detail unavailable.

### 47-artists-active

[Desktop](screens/47-artists-active-desktop.png) · [Phone](screens/47-artists-active-phone.png) · [Detailed notes](CAPTURE-NOTES.md#47-artists-active)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 48-artists-invited-0

[Desktop](screens/48-artists-invited-0-desktop.png) · [Phone](screens/48-artists-invited-0-phone.png) · [Detailed notes](CAPTURE-NOTES.md#48-artists-invited-0)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 49-artists-inactive-0

[Desktop](screens/49-artists-inactive-0-desktop.png) · [Phone](screens/49-artists-inactive-0-phone.png) · [Detailed notes](CAPTURE-NOTES.md#49-artists-inactive-0)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 50-artists-all-artists

[Desktop](screens/50-artists-all-artists-desktop.png) · [Phone](screens/50-artists-all-artists-phone.png) · [Detailed notes](CAPTURE-NOTES.md#50-artists-all-artists)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 51-artists-invite

[Desktop](screens/51-artists-invite-desktop.png) · [Phone](screens/51-artists-invite-phone.png) · [Detailed notes](CAPTURE-NOTES.md#51-artists-invite)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 52-artists-fixed-rent

[Desktop](screens/52-artists-fixed-rent-desktop.png) · [Phone](screens/52-artists-fixed-rent-phone.png) · [Detailed notes](CAPTURE-NOTES.md#52-artists-fixed-rent)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  }
]
```

</details>

### 53-artists-explainer-0

[Desktop](screens/53-artists-explainer-0-desktop.png) · [Phone](screens/53-artists-explainer-0-phone.png) · [Detailed notes](CAPTURE-NOTES.md#53-artists-explainer-0)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  }
]
```

</details>

### 54-artists-explainer-1

[Desktop](screens/54-artists-explainer-1-desktop.png) · [Phone](screens/54-artists-explainer-1-phone.png) · [Detailed notes](CAPTURE-NOTES.md#54-artists-explainer-1)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  }
]
```

</details>

### 55-artists-explainer-2

[Desktop](screens/55-artists-explainer-2-desktop.png) · [Phone](screens/55-artists-explainer-2-phone.png) · [Detailed notes](CAPTURE-NOTES.md#55-artists-explainer-2)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  }
]
```

</details>

### 56-artists-explainer-3

[Desktop](screens/56-artists-explainer-3-desktop.png) · [Phone](screens/56-artists-explainer-3-phone.png) · [Detailed notes](CAPTURE-NOTES.md#56-artists-explainer-3)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  }
]
```

</details>

### 146-artists-rent-interval-options

[Desktop](screens/146-artists-rent-interval-options-desktop.png) · [Phone](screens/146-artists-rent-interval-options-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#146-artists-rent-interval-options)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
- combobox [expanded]:
  - searchbox [active]: Monthly
  - listbox:
    - option "Weekly"
    - option "Monthly" [selected]
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 147-artists-rent-options-1

[Desktop](screens/147-artists-rent-options-1-desktop.png) · [Phone](screens/147-artists-rent-options-1-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#147-artists-rent-options-1)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
- combobox [expanded]:
  - searchbox [active]: "1"
  - listbox:
    - option "1" [selected]
    - option "2"
    - option "3"
    - option "4"
    - option "5"
    - option "6"
    - option "7"
    - option "8"
    - option "9"
    - option "10"
    - option "11"
    - option "12"
    - option "13"
    - option "14"
    - option "15"
    - option "16"
    - option "17"
    - option "18"
    - option "19"
    - option "20"
    - option "21"
    - option "22"
    - option "23"
    - option "24"
    - option "25"
    - option "26"
    - option "27"
    - option "28"
    - option "29"
    - option "30"
    - option "31"
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 148-artists-rent-options-2

[Desktop](screens/148-artists-rent-options-2-desktop.png) · [Phone](screens/148-artists-rent-options-2-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#148-artists-rent-options-2)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
- combobox [expanded]:
  - searchbox [active]: 25%
  - listbox:
    - option "0%"
    - option "12%"
    - option "15%"
    - option "25%" [selected]
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 149-artists-rent-options-3

[Desktop](screens/149-artists-rent-options-3-desktop.png) · [Phone](screens/149-artists-rent-options-3-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#149-artists-rent-options-3)

Observed URL: `https://app.linework.com/manager/artists/`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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
- combobox [expanded]:
  - searchbox [active]: 14 days
  - listbox:
    - option "7 days"
    - option "14 days" [selected]
    - option "30 days"
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter artist's email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter artist name or nickname",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter rent amount",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Managers

**Purpose:** Manages studio administrator access and seats.

**Layout and behavior:** Manager list with one primary owner; Invite manager opens seat-upgrade invitation dialog. Role dropdown shows Owner/Manager.

**Dependencies and boundaries:** Paid extra manager seats; Confirm seat upgrade and send invitation not clicked.

### 57-managers-list

[Desktop](screens/57-managers-list-desktop.png) · [Phone](screens/57-managers-list-phone.png) · [Detailed notes](CAPTURE-NOTES.md#57-managers-list)

Observed URL: `https://app.linework.com/manager/management`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 58-managers-invite

[Desktop](screens/58-managers-invite-desktop.png) · [Phone](screens/58-managers-invite-phone.png) · [Detailed notes](CAPTURE-NOTES.md#58-managers-invite)

Observed URL: `https://app.linework.com/manager/management`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter manager email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 59-managers-role-options

[Desktop](screens/59-managers-role-options-desktop.png) · [Phone](screens/59-managers-role-options-phone.png) · [Detailed notes](CAPTURE-NOTES.md#59-managers-role-options)

Observed URL: `https://app.linework.com/manager/management`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter manager email address",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

## Products

**Purpose:** Manages sellable retail products and categories.

**Layout and behavior:** List page; Add new product opens side panel with name, price including MVA, VAT and category. Manage categories opens a separate modal. VAT options25/15/12/0.

**Dependencies and boundaries:** Product categories and sale/payment setup; no product or category created.

### 60-products-list

[Desktop](screens/60-products-list-desktop.png) · [Phone](screens/60-products-list-phone.png) · [Detailed notes](CAPTURE-NOTES.md#60-products-list)

Observed URL: `https://app.linework.com/manager/products`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

### 61-products-add

[Desktop](screens/61-products-add-desktop.png) · [Phone](screens/61-products-add-phone.png) · [Detailed notes](CAPTURE-NOTES.md#61-products-add)

Observed URL: `https://app.linework.com/manager/products`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Product Name",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  }
]
```

</details>

### 62-products-vat-options

[Desktop](screens/62-products-vat-options-desktop.png) · [Phone](screens/62-products-vat-options-phone.png) · [Detailed notes](CAPTURE-NOTES.md#62-products-vat-options)

Observed URL: `https://app.linework.com/manager/products`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Product Name",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  }
]
```

</details>

### 63-products-categories

[Desktop](screens/63-products-categories-desktop.png) · [Phone](screens/63-products-categories-phone.png) · [Detailed notes](CAPTURE-NOTES.md#63-products-categories)

Observed URL: `https://app.linework.com/manager/products`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "New category name",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

## Settings > Studio setup

**Purpose:** Edits studio identity, SMS sender and address.

**Layout and behavior:** Settings subnav at left, content right; Edit opens dialogs for Studio Name, SMS handler and Studio location. SMS editor incorrectly displays Edit Studio Name; preserve observed copy.

**Dependencies and boundaries:** Studio identity and client communications. No upload, address search or save performed.

### 64-settings-studio-setup

[Desktop](screens/64-settings-studio-setup-desktop.png) · [Phone](screens/64-settings-studio-setup-phone.png) · [Detailed notes](CAPTURE-NOTES.md#64-settings-studio-setup)

Observed URL: `https://app.linework.com/manager/settings`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

### 65-settings-studio-name

[Desktop](screens/65-settings-studio-name-desktop.png) · [Phone](screens/65-settings-studio-name-phone.png) · [Detailed notes](CAPTURE-NOTES.md#65-settings-studio-name)

Observed URL: `https://app.linework.com/manager/settings`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  }
]
```

</details>

### 66-settings-sms-handler

[Desktop](screens/66-settings-sms-handler-desktop.png) · [Phone](screens/66-settings-sms-handler-phone.png) · [Detailed notes](CAPTURE-NOTES.md#66-settings-sms-handler)

Observed URL: `https://app.linework.com/manager/settings`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  }
]
```

</details>

### 67-settings-location

[Desktop](screens/67-settings-location-desktop.png) · [Phone](screens/67-settings-location-phone.png) · [Detailed notes](CAPTURE-NOTES.md#67-settings-location)

Observed URL: `https://app.linework.com/manager/settings`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Search for your address",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

## Settings > Theme

**Purpose:** Selects the current user’s admin appearance.

**Layout and behavior:** Light/Dark and color choices with hex values; observed Light selection.

**Dependencies and boundaries:** Per-user preference saves immediately, so no theme option was changed.

### 68-settings-theme

[Desktop](screens/68-settings-theme-desktop.png) · [Phone](screens/68-settings-theme-phone.png) · [Detailed notes](CAPTURE-NOTES.md#68-settings-theme)

Observed URL: `https://app.linework.com/manager/settings/theme`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

## Settings > Skins

**Purpose:** Styles client-facing booking and payment pages.

**Layout and behavior:** Palette/logo controls and preview, with explicit save action.

**Dependencies and boundaries:** Client booking/payment pages; no skin selected and no logo uploaded.

### 69-settings-skins

[Desktop](screens/69-settings-skins-desktop.png) · [Phone](screens/69-settings-skins-phone.png) · [Detailed notes](CAPTURE-NOTES.md#69-settings-skins)

Observed URL: `https://app.linework.com/manager/settings/skins`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "file"
  }
]
```

</details>

## Settings > Payment methods

**Purpose:** Starts payment-provider onboarding.

**Layout and behavior:** Provider cards, Start now and Dintero interest action. Start now opens Add company details prerequisite dialog.

**Dependencies and boundaries:** Company details and provider connection. No external connection or interest submission performed.

### 70-settings-payment-methods

[Desktop](screens/70-settings-payment-methods-desktop.png) · [Phone](screens/70-settings-payment-methods-phone.png) · [Detailed notes](CAPTURE-NOTES.md#70-settings-payment-methods)

Observed URL: `https://app.linework.com/manager/settings/paymentmethods`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

### 71-settings-payments-start

[Desktop](screens/71-settings-payments-start-desktop.png) · [Phone](screens/71-settings-payments-start-phone.png) · [Detailed notes](CAPTURE-NOTES.md#71-settings-payments-start)

Observed URL: `https://app.linework.com/manager/settings/paymentmethods`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

## Settings > Services

**Purpose:** Defines bookable services, price, duration and providers.

**Layout and behavior:** Catalog grouped by category; new/custom service editor has General settings, Service providers, Pricing and taxes, Service duration, Service images and Online booking. Preset Consultation and Tattoo editors captured; Tattoo has no image section and restricts fixed/free pricing and fixed duration. Category creation/edit is modal. State153 did not open an editor;154/155 provide the successful editors.

**Dependencies and boundaries:** Artists, categories, tax, tips and online booking. Native controls and exact bilingual labels are below; no service/category saved.

### 72-settings-services

[Desktop](screens/72-settings-services-desktop.png) · [Phone](screens/72-settings-services-phone.png) · [Detailed notes](CAPTURE-NOTES.md#72-settings-services)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

### 73-settings-service-add

[Desktop](screens/73-settings-service-add-desktop.png) · [Phone](screens/73-settings-service-add-phone.png) · [Detailed notes](CAPTURE-NOTES.md#73-settings-service-add)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter english service name",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": "Enter norwegian service name",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 74-settings-service-service-providers

[Desktop](screens/74-settings-service-service-providers-desktop.png) · [Phone](screens/74-settings-service-service-providers-phone.png) · [Detailed notes](CAPTURE-NOTES.md#74-settings-service-service-providers)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  }
]
```

</details>

### 75-settings-service-pricing-and-taxes

[Desktop](screens/75-settings-service-pricing-and-taxes-desktop.png) · [Phone](screens/75-settings-service-pricing-and-taxes-phone.png) · [Detailed notes](CAPTURE-NOTES.md#75-settings-service-pricing-and-taxes)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 76-settings-service-service-duration

[Desktop](screens/76-settings-service-service-duration-desktop.png) · [Phone](screens/76-settings-service-service-duration-phone.png) · [Detailed notes](CAPTURE-NOTES.md#76-settings-service-service-duration)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 77-settings-service-service-images

[Desktop](screens/77-settings-service-service-images-desktop.png) · [Phone](screens/77-settings-service-service-images-phone.png) · [Detailed notes](CAPTURE-NOTES.md#77-settings-service-service-images)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "file"
  }
]
```

</details>

### 78-settings-service-online-booking

[Desktop](screens/78-settings-service-online-booking-desktop.png) · [Phone](screens/78-settings-service-online-booking-phone.png) · [Detailed notes](CAPTURE-NOTES.md#78-settings-service-online-booking)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

### 79-settings-service-category

[Desktop](screens/79-settings-service-category-desktop.png) · [Phone](screens/79-settings-service-category-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#79-settings-service-category)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category" [active]:
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
- button:
- banner:
  - generic: Add category
- generic: "Select a category to add:"
- generic: Tattoo
- generic: Piercing
- generic: Tattoo removal
- generic: Medical piercing
- separator
- generic: Can’t find your category?
- button "Add a custom category":
  - generic: Add a custom category
- button "Cancel":
  - generic: Cancel
```

</details>

### 151-settings-service-custom-category

[Desktop](screens/151-settings-service-custom-category-desktop.png) · [Phone](screens/151-settings-service-custom-category-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#151-settings-service-custom-category)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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
- button:
- banner:
  - generic: Add category
- generic: "Select a category to add:"
- generic: Tattoo
- generic: Piercing
- generic: Tattoo removal
- generic: Medical piercing
- separator
- generic: Can’t find your category?
- button "Add a custom category" [active]:
  - generic: Add a custom category
- button "Cancel":
  - generic: Cancel
- button:
- banner:
  - generic: Add category
- generic: Category name
- generic: 🇺🇸 English Name
- textbox "Enter english service name"
- generic: Will be displayed in Linework and client messages in english.
- generic: 🇳🇴 Norwegian Name
- textbox "Enter norwegian service name"
- separator
- generic: Category description
- banner:
  - button "🇺🇸 English"
  - button "🇳🇴 Norwegian"
- button:
- button:
- button:
- button:
- button:
- button:
- button:
- paragraph
- text: "Visit URL: EditRemove"
- generic: Will be displayed in your online booking page.
- button "Cancel":
  - generic: Cancel
- button "Add category":
  - generic: Add category
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter english service name",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": "Enter norwegian service name",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 152-settings-service-edit-category

[Desktop](screens/152-settings-service-edit-category-desktop.png) · [Phone](screens/152-settings-service-edit-category-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#152-settings-service-edit-category)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Services
  - generic: Manage services provided at the studio.
  - generic: 2 Services
  - button "Add category":
    - generic: Add category
  - generic: Tattoo
  - button "Edit category" [active]:
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
- button:
- banner:
  - generic: Edit category
- generic: This category is preset by LINEWORK
- generic: Category name
- generic: Tattoo
- separator
- generic: Category description
- banner:
  - button "🇺🇸 English"
  - button "🇳🇴 Norwegian"
- button:
- button:
- button:
- button:
- button:
- button:
- button:
- paragraph
- text: "Visit URL: EditRemove"
- generic: Will be displayed in your online booking page.
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 153-settings-service-tattoo-edit

[Desktop](screens/153-settings-service-tattoo-edit-desktop.png) · [Phone](screens/153-settings-service-tattoo-edit-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#153-settings-service-tattoo-edit)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 154-settings-consultation-preset

[Desktop](screens/154-settings-consultation-preset-desktop.png) · [Phone](screens/154-settings-consultation-preset-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#154-settings-consultation-preset)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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
  - button [active]:
- banner:
  - generic: Edit service
  - generic: Tattoo
  - generic: /
  - generic: Consultation
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
  - generic: This service is an industry-tailored preset by LINEWORK
  - generic: Some features cannot be changed
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Service images
- generic: Online booking
- generic: General settings
- text: Service Category
- combobox:
  - searchbox [disabled]: Tattoo
- separator
- text: Service Name
- generic: 🇺🇸 English Name
- textbox "Enter english service name" [disabled]: Consultation
- generic: Will be displayed in Linework and client messages in english.
- generic: 🇳🇴 Norwegian Name
- textbox "Enter norwegian service name" [disabled]: Konsultasjon
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter english service name",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": "Enter norwegian service name",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 155-settings-tattoo-preset

[Desktop](screens/155-settings-tattoo-preset-desktop.png) · [Phone](screens/155-settings-tattoo-preset-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#155-settings-tattoo-preset)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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
  - button [active]:
  - generic: Consultation
  - generic: PRESET BY LINEWORK
  - generic: 30min
  - button:
- banner:
  - generic: Edit service
  - generic: Tattoo
  - generic: /
  - generic: Tattoo
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
  - generic: This service is an industry-tailored preset by LINEWORK
  - generic: Some features cannot be changed
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Online booking
- generic: General settings
- text: Service Category
- combobox:
  - searchbox [disabled]: Tattoo
- separator
- text: Service Name
- generic: 🇺🇸 English Name
- textbox "Enter english service name" [disabled]: Tattoo
- generic: Will be displayed in Linework and client messages in english.
- generic: 🇳🇴 Norwegian Name
- textbox "Enter norwegian service name" [disabled]: Tatovering
- separator
- text: Service Description
- banner:
  - button "🇺🇸 English"
  - button "🇳🇴 Norwegian"
- textbox: Appointments scheduled on request
- generic: Will be displayed in your online booking page.
- separator
- text: Tips
- checkbox "Allow tips on checkout" [checked]
- generic: Allow tips on checkout
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter english service name",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": "Enter norwegian service name",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 156-settings-tattoo-0

[Desktop](screens/156-settings-tattoo-0-desktop.png) · [Phone](screens/156-settings-tattoo-0-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#156-settings-tattoo-0)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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
  - generic: Edit service
  - generic: Tattoo
  - generic: /
  - generic: Tattoo
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
  - generic: This service is an industry-tailored preset by LINEWORK
  - generic: Some features cannot be changed
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Online booking
- generic: Pricing & Taxes
- generic: Set the pricing scheme for this service.
- generic: Variable pricing
- generic: Pricing of this service can be set on a per-appointment basis.
- generic: Fixed pricing
- generic: Not supported for this service preset.
- generic: Free of charge
- generic: Not supported for this service preset.
- separator
- generic: VAT rate
- combobox:
  - searchbox: "0"
- separator
- generic: Pricing
- checkbox "Use hourly pricing rates" [checked] [disabled]
- generic: Use hourly pricing rates
- checkbox "Set pricing including VAT" [checked]
- generic: Set pricing including VAT
- table:
  - rowgroup:
    - row "Service provider Hourly rate ex. VAT VAT Hourly rate inc. VAT":
      - columnheader "Service provider"
      - columnheader "Hourly rate ex. VAT"
      - columnheader "VAT"
      - columnheader "Hourly rate inc. VAT"
  - rowgroup
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 157-settings-tattoo-1

[Desktop](screens/157-settings-tattoo-1-desktop.png) · [Phone](screens/157-settings-tattoo-1-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#157-settings-tattoo-1)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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
  - generic: Edit service
  - generic: Tattoo
  - generic: /
  - generic: Tattoo
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
  - generic: This service is an industry-tailored preset by LINEWORK
  - generic: Some features cannot be changed
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Online booking
- generic: Service duration
- generic: Set the duration of this service.
- generic: Variable duration
- generic: Duration of this service varies and can be set per appointment.
- generic: Fixed duration
- generic: Not supported for this service preset.
- separator
- text: Minimum duration of service
- button "1 hour":
  - generic: 1 hour
- generic: ":"
- button "0 Minutes":
  - generic: 0 Minutes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 158-settings-tattoo-2

[Desktop](screens/158-settings-tattoo-2-desktop.png) · [Phone](screens/158-settings-tattoo-2-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#158-settings-tattoo-2)

Observed URL: `https://app.linework.com/manager/settings/services`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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
  - generic: Edit service
  - generic: Tattoo
  - generic: /
  - generic: Tattoo
  - button "Cancel":
    - generic: Cancel
  - button "Save changes":
    - generic: Save changes
  - generic: This service is an industry-tailored preset by LINEWORK
  - generic: Some features cannot be changed
- generic: General settings
- generic: Service Providers
- generic: Pricing & Taxes
- generic: Service duration
- generic: Online booking
- generic: Online booking
- generic: Settings for online booking capabilities for this service.
- generic: Enable booking requests for specific artists
- generic: Switch on to allow people to request tattoo projects with the specific artist. Studio managers and the specified artists will be able to manage these requests.
- separator
- generic: You have no active artists in your studio
- button "Manage artists":
  - generic: Manage artists
- separator
- generic: Enable open booking requests
- generic: Switch on to allow people to submit requests for tattoo projects without having to specify artist. Only managers will be able to see and manage these requests.
- separator
- banner:
  - img "Infinity test":
    - generic: IT
- generic: Open Requests
- generic: Artist assigned by manager
- generic: Not accepting requests
- button "OFF":
  - generic: "OFF"
- separator
- generic: Customize form for Open Requests
- text: Configure which information to ask for and the options available to clients when filling out their form for Open Requests.
- separator
- generic: Tattoo size options
- generic: Tiny
- generic: Small
- generic: Medium
- generic: Medium +
- generic: Large
- generic: Half Sleeve
- generic: Three-fourths sleeve
- generic: Full arm sleeve
- generic: Full back piece
- generic: Full chest piece
- generic: Full body suit
- generic: Width x Height
- button "Edit":
  - generic: Edit
- separator
- generic: Color theme options
- generic: Color
- generic: Black & gray
- button "Edit":
  - generic: Edit
- separator
- generic: Skin tones
- generic: Don't ask for skin tone
- button "Edit":
  - generic: Edit
- separator
- generic: Budget
- generic: Don't ask client for their budget
- button "Edit":
  - generic: Edit
- separator
- generic: Reference Images
- generic: Reference images are optional
- button "Edit":
  - generic: Edit
- separator
- generic: Questions that are always visible and required in your form
- paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
- generic: Is it a cover up?
- generic: If answered yes, the client is asked to upload images of their existing tattoo.
- generic: Body location of tattoo
- generic: Asks the client to describe where on their body they would like their tattoo.
- generic: Tattoo description
- generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
- generic: Availability and other details
- generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Settings > Online booking

**Purpose:** Configures tattoo requests, direct appointments and booking-page tracking.

**Layout and behavior:** Tattoo requests / Direct booking / Booking page tabs; Edit dialogs for terms, sizes, color, skin, budget, reference images, note, deposit,90-day maximum,3-day minimum,30-minute gaps, URL and Meta pixel.

**Dependencies and boundaries:** Open requests OFF, no active artists/direct-bookable providers. Always-required questions are coverup, body location, description and availability/other details. No toggles or settings saved.

### 80-settings-online-requests

[Desktop](screens/80-settings-online-requests-desktop.png) · [Phone](screens/80-settings-online-requests-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#80-settings-online-requests)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests" [selected]:
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Tattoo requests":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Accept open tattoo booking requests
    - banner:
      - img "Infinity test":
        - generic: IT
    - generic: Open Requests
    - generic: Not accepting requests
    - button "OFF":
      - generic: "OFF"
    - separator
    - generic: Accept tattoo booking requests for specific artists
    - generic: You have no active artists in the studio to accept tattoo requests for.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - generic: Customize form for Open Requests
    - generic: Tattoo size options
    - generic: Tiny
    - generic: Small
    - generic: Medium
    - generic: Medium +
    - generic: Large
    - generic: Half Sleeve
    - generic: Three-fourths sleeve
    - generic: Full arm sleeve
    - generic: Full back piece
    - generic: Full chest piece
    - generic: Full body suit
    - generic: Width x Height
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Color theme options
    - generic: Color
    - generic: Black & gray
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Skin tones
    - generic: Don't ask for skin tone
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Budget
    - generic: Don't ask client for their budget
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Questions that are always visible and required in your form
    - paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
    - generic: Is it a cover up?
    - generic: If answered yes, the client is asked to upload images of their existing tattoo.
    - generic: Body location of tattoo
    - generic: Asks the client to describe where on their body they would like their tattoo.
    - generic: Tattoo description
    - generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
    - generic: Availability and other details
    - generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
    - separator
```

</details>

### 81-settings-online-request-editor-0

[Desktop](screens/81-settings-online-request-editor-0-desktop.png) · [Phone](screens/81-settings-online-request-editor-0-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#81-settings-online-request-editor-0)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests" [selected]:
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Tattoo requests":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Accept open tattoo booking requests
    - banner:
      - img "Infinity test":
        - generic: IT
    - generic: Open Requests
    - generic: Not accepting requests
    - button "OFF":
      - generic: "OFF"
    - separator
    - generic: Accept tattoo booking requests for specific artists
    - generic: You have no active artists in the studio to accept tattoo requests for.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - generic: Customize form for Open Requests
    - generic: Tattoo size options
    - generic: Tiny
    - generic: Small
    - generic: Medium
    - generic: Medium +
    - generic: Large
    - generic: Half Sleeve
    - generic: Three-fourths sleeve
    - generic: Full arm sleeve
    - generic: Full back piece
    - generic: Full chest piece
    - generic: Full body suit
    - generic: Width x Height
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Color theme options
    - generic: Color
    - generic: Black & gray
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Skin tones
    - generic: Don't ask for skin tone
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Budget
    - generic: Don't ask client for their budget
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Questions that are always visible and required in your form
    - paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
    - generic: Is it a cover up?
    - generic: If answered yes, the client is asked to upload images of their existing tattoo.
    - generic: Body location of tattoo
    - generic: Asks the client to describe where on their body they would like their tattoo.
    - generic: Tattoo description
    - generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
    - generic: Availability and other details
    - generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
    - separator
- button:
- banner:
  - generic: Booking terms
  - generic: Set your own terms for direct bookings, separate from Linework’s.
- radio "No booking terms" [checked]
- generic: No booking terms
- radio "Link to terms on my own website"
- generic: Link to terms on my own website
- radio "Write my terms here"
- generic: Write my terms here
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

### 82-settings-online-request-editor-1

[Desktop](screens/82-settings-online-request-editor-1-desktop.png) · [Phone](screens/82-settings-online-request-editor-1-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#82-settings-online-request-editor-1)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests" [selected]:
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Tattoo requests":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Accept open tattoo booking requests
    - banner:
      - img "Infinity test":
        - generic: IT
    - generic: Open Requests
    - generic: Not accepting requests
    - button "OFF":
      - generic: "OFF"
    - separator
    - generic: Accept tattoo booking requests for specific artists
    - generic: You have no active artists in the studio to accept tattoo requests for.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - generic: Customize form for Open Requests
    - generic: Tattoo size options
    - generic: Tiny
    - generic: Small
    - generic: Medium
    - generic: Medium +
    - generic: Large
    - generic: Half Sleeve
    - generic: Three-fourths sleeve
    - generic: Full arm sleeve
    - generic: Full back piece
    - generic: Full chest piece
    - generic: Full body suit
    - generic: Width x Height
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Color theme options
    - generic: Color
    - generic: Black & gray
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Skin tones
    - generic: Don't ask for skin tone
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Budget
    - generic: Don't ask client for their budget
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Questions that are always visible and required in your form
    - paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
    - generic: Is it a cover up?
    - generic: If answered yes, the client is asked to upload images of their existing tattoo.
    - generic: Body location of tattoo
    - generic: Asks the client to describe where on their body they would like their tattoo.
    - generic: Tattoo description
    - generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
    - generic: Availability and other details
    - generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
    - separator
- button:
- banner:
  - generic: Tattoo size options
  - generic: What size options do you want clients to be able to choose from? In addition to the ones you enable, there will always be an option to specify the width and height of their tattoo.
- generic: Tiny
- generic: Size of a bug
- generic: Medium
- generic: Size of a fist
- generic: Large
- generic: Size of a sheet of paper or notebook
- generic: Three-fourths sleeve
- generic: Full back piece
- generic: Full body suit
- generic: Small
- generic: Size of a credit card
- generic: Medium +
- generic: Size of a hand
- generic: Half Sleeve
- generic: Entire upper arm from shoulder to elbow
- generic: Full arm sleeve
- generic: Full chest piece
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 83-settings-online-request-editor-2

[Desktop](screens/83-settings-online-request-editor-2-desktop.png) · [Phone](screens/83-settings-online-request-editor-2-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#83-settings-online-request-editor-2)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests" [selected]:
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Tattoo requests":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Accept open tattoo booking requests
    - banner:
      - img "Infinity test":
        - generic: IT
    - generic: Open Requests
    - generic: Not accepting requests
    - button "OFF":
      - generic: "OFF"
    - separator
    - generic: Accept tattoo booking requests for specific artists
    - generic: You have no active artists in the studio to accept tattoo requests for.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - generic: Customize form for Open Requests
    - generic: Tattoo size options
    - generic: Tiny
    - generic: Small
    - generic: Medium
    - generic: Medium +
    - generic: Large
    - generic: Half Sleeve
    - generic: Three-fourths sleeve
    - generic: Full arm sleeve
    - generic: Full back piece
    - generic: Full chest piece
    - generic: Full body suit
    - generic: Width x Height
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Color theme options
    - generic: Color
    - generic: Black & gray
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Skin tones
    - generic: Don't ask for skin tone
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Budget
    - generic: Don't ask client for their budget
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Questions that are always visible and required in your form
    - paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
    - generic: Is it a cover up?
    - generic: If answered yes, the client is asked to upload images of their existing tattoo.
    - generic: Body location of tattoo
    - generic: Asks the client to describe where on their body they would like their tattoo.
    - generic: Tattoo description
    - generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
    - generic: Availability and other details
    - generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
    - separator
- button:
- banner:
  - generic: Tattoo color options
- text: Which color options do you provide?
- generic: Color
- radio
- generic: Black & Gray
- radio
- generic: Both
- radio [checked]
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

### 84-settings-online-request-editor-3

[Desktop](screens/84-settings-online-request-editor-3-desktop.png) · [Phone](screens/84-settings-online-request-editor-3-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#84-settings-online-request-editor-3)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests" [selected]:
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Tattoo requests":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Accept open tattoo booking requests
    - banner:
      - img "Infinity test":
        - generic: IT
    - generic: Open Requests
    - generic: Not accepting requests
    - button "OFF":
      - generic: "OFF"
    - separator
    - generic: Accept tattoo booking requests for specific artists
    - generic: You have no active artists in the studio to accept tattoo requests for.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - generic: Customize form for Open Requests
    - generic: Tattoo size options
    - generic: Tiny
    - generic: Small
    - generic: Medium
    - generic: Medium +
    - generic: Large
    - generic: Half Sleeve
    - generic: Three-fourths sleeve
    - generic: Full arm sleeve
    - generic: Full back piece
    - generic: Full chest piece
    - generic: Full body suit
    - generic: Width x Height
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Color theme options
    - generic: Color
    - generic: Black & gray
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Skin tones
    - generic: Don't ask for skin tone
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Budget
    - generic: Don't ask client for their budget
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Questions that are always visible and required in your form
    - paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
    - generic: Is it a cover up?
    - generic: If answered yes, the client is asked to upload images of their existing tattoo.
    - generic: Body location of tattoo
    - generic: Asks the client to describe where on their body they would like their tattoo.
    - generic: Tattoo description
    - generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
    - generic: Availability and other details
    - generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
    - separator
- button:
- banner:
  - generic: Skin tone
- text: Do you want to ask for the client’s skin tone?
- generic: Ask for skin tone
- generic: Options are "Pale", "Olive", "Tan" or "Dark". This question is always optional for the client.
- radio
- generic: Don't ask for skin tone
- radio [checked]
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

### 85-settings-online-request-editor-4

[Desktop](screens/85-settings-online-request-editor-4-desktop.png) · [Phone](screens/85-settings-online-request-editor-4-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#85-settings-online-request-editor-4)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests" [selected]:
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Tattoo requests":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Accept open tattoo booking requests
    - banner:
      - img "Infinity test":
        - generic: IT
    - generic: Open Requests
    - generic: Not accepting requests
    - button "OFF":
      - generic: "OFF"
    - separator
    - generic: Accept tattoo booking requests for specific artists
    - generic: You have no active artists in the studio to accept tattoo requests for.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - generic: Customize form for Open Requests
    - generic: Tattoo size options
    - generic: Tiny
    - generic: Small
    - generic: Medium
    - generic: Medium +
    - generic: Large
    - generic: Half Sleeve
    - generic: Three-fourths sleeve
    - generic: Full arm sleeve
    - generic: Full back piece
    - generic: Full chest piece
    - generic: Full body suit
    - generic: Width x Height
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Color theme options
    - generic: Color
    - generic: Black & gray
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Skin tones
    - generic: Don't ask for skin tone
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Budget
    - generic: Don't ask client for their budget
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Questions that are always visible and required in your form
    - paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
    - generic: Is it a cover up?
    - generic: If answered yes, the client is asked to upload images of their existing tattoo.
    - generic: Body location of tattoo
    - generic: Asks the client to describe where on their body they would like their tattoo.
    - generic: Tattoo description
    - generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
    - generic: Availability and other details
    - generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
    - separator
- button:
- banner:
  - generic: Budget
- text: Do you want to ask for the client's budget?
- generic: Ask client for their budget
- radio
- generic: Don't ask client for their budget
- radio [checked]
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

### 86-settings-online-request-editor-5

[Desktop](screens/86-settings-online-request-editor-5-desktop.png) · [Phone](screens/86-settings-online-request-editor-5-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#86-settings-online-request-editor-5)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests" [selected]:
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Tattoo requests":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Accept open tattoo booking requests
    - banner:
      - img "Infinity test":
        - generic: IT
    - generic: Open Requests
    - generic: Not accepting requests
    - button "OFF":
      - generic: "OFF"
    - separator
    - generic: Accept tattoo booking requests for specific artists
    - generic: You have no active artists in the studio to accept tattoo requests for.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - generic: Customize form for Open Requests
    - generic: Tattoo size options
    - generic: Tiny
    - generic: Small
    - generic: Medium
    - generic: Medium +
    - generic: Large
    - generic: Half Sleeve
    - generic: Three-fourths sleeve
    - generic: Full arm sleeve
    - generic: Full back piece
    - generic: Full chest piece
    - generic: Full body suit
    - generic: Width x Height
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Color theme options
    - generic: Color
    - generic: Black & gray
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Skin tones
    - generic: Don't ask for skin tone
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Budget
    - generic: Don't ask client for their budget
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Questions that are always visible and required in your form
    - paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
    - generic: Is it a cover up?
    - generic: If answered yes, the client is asked to upload images of their existing tattoo.
    - generic: Body location of tattoo
    - generic: Asks the client to describe where on their body they would like their tattoo.
    - generic: Tattoo description
    - generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
    - generic: Availability and other details
    - generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
    - separator
- button:
- banner:
  - generic: Reference Images
- text: Do you want to ask for reference images?
- generic: Reference images are required
- radio
- generic: Reference images are optional
- radio [checked]
- generic: Don't ask for reference images
- radio
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

### 87-settings-direct-booking

[Desktop](screens/87-settings-direct-booking-desktop.png) · [Phone](screens/87-settings-direct-booking-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#87-settings-direct-booking)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tooltip "Manage availability for direct booking and how people can book these services.": Manage availability for direct booking and how people can book these services.
    - tab "Direct booking" [active] [selected]:
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Direct booking":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Enable direct booking
    - text: Services set with fixed duration
    - text: can be enabled for direct booking.
    - generic: Manage this for each service in
    - button "Services":
      - generic: Services
    - separator
    - generic: Availability for direct booking
    - generic: You have no service providers enabled for direct booking.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - text: Choose what people are asked for when they book directly.
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Note to the artist
    - generic: A note to the artist is optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Deposit
    - generic: No deposit required
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Maximum time in advance that an appointment can be booked
    - generic: 90 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time before appointment start that it can be booked
    - generic: 3 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time between appointments
    - generic: 30 Minutes
    - button "Edit":
      - generic: Edit
```

</details>

### 88-settings-booking-page

[Desktop](screens/88-settings-booking-page-desktop.png) · [Phone](screens/88-settings-booking-page-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#88-settings-booking-page)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page" [active] [selected]:
      - generic: Booking page
  - tabpanel "Booking page":
    - generic: Studio logo visibility
    - generic: Avatar visibility is now managed in Settings → Skins.
    - button "Open Skins":
      - generic: Open Skins
    - separator
    - generic: Ad tracking
    - generic: Add a Meta pixel to measure how well your ads perform. It only applies to your own booking page.
    - button "Add pixel":
      - generic: Add pixel
```

</details>

### 89-settings-booking-meta-pixel

[Desktop](screens/89-settings-booking-meta-pixel-desktop.png) · [Phone](screens/89-settings-booking-meta-pixel-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#89-settings-booking-meta-pixel)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tooltip "Control what people see on your booking page.": Control what people see on your booking page.
    - tab "Booking page" [selected]:
      - generic: Booking page
  - tabpanel "Booking page":
    - generic: Studio logo visibility
    - generic: Avatar visibility is now managed in Settings → Skins.
    - button "Open Skins":
      - generic: Open Skins
    - separator
    - generic: Ad tracking
    - generic: Add a Meta pixel to measure how well your ads perform. It only applies to your own booking page.
    - button "Add pixel" [active]:
      - generic: Add pixel
- button:
- banner:
  - generic: Add Meta pixel
  - generic: Paste your pixel ID from Meta Events Manager. Your booking page builds the rest.
- generic: Meta pixel ID
- textbox "123456789012345"
- generic: Link to your privacy policy
- textbox "https://"
- generic: Meta reads contact details from your booking form
- paragraph: With automatic advanced matching on, Meta collects your clients' name, email and phone from the booking form and hashes them. Turn it off in Meta Events Manager under Data sources if you do not want this.
- generic: I am responsible for this tracking and my privacy policy explains it to my clients.
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "123456789012345",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "https://",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 90-settings-booking-link

[Desktop](screens/90-settings-booking-link-desktop.png) · [Phone](screens/90-settings-booking-link-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#90-settings-booking-link)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link" [active]:
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page" [selected]:
      - generic: Booking page
  - tabpanel "Booking page":
    - generic: Studio logo visibility
    - generic: Avatar visibility is now managed in Settings → Skins.
    - button "Open Skins":
      - generic: Open Skins
    - separator
    - generic: Ad tracking
    - generic: Add a Meta pixel to measure how well your ads perform. It only applies to your own booking page.
    - button "Add pixel":
      - generic: Add pixel
- button:
- banner:
  - generic: Edit your booking page URL
- generic: https://booking.linework.com/
- textbox: infinity-test
- separator
- paragraph: Your URL can only include characters, numbers and "-". It cannot be longer than 30 characters.
- button "Update URL" [disabled]:
  - generic: Update URL
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  }
]
```

</details>

### 91-settings-direct-editor-1

[Desktop](screens/91-settings-direct-editor-1-desktop.png) · [Phone](screens/91-settings-direct-editor-1-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#91-settings-direct-editor-1)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking" [selected]:
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Direct booking":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Enable direct booking
    - text: Services set with fixed duration
    - text: can be enabled for direct booking.
    - generic: Manage this for each service in
    - button "Services":
      - generic: Services
    - separator
    - generic: Availability for direct booking
    - generic: You have no service providers enabled for direct booking.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - text: Choose what people are asked for when they book directly.
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Note to the artist
    - generic: A note to the artist is optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Deposit
    - generic: No deposit required
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Maximum time in advance that an appointment can be booked
    - generic: 90 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time before appointment start that it can be booked
    - generic: 3 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time between appointments
    - generic: 30 Minutes
    - button "Edit":
      - generic: Edit
- button:
- banner:
  - generic: Reference Images
- text: Do you want to ask for reference images?
- generic: Reference images are required
- radio
- generic: Reference images are optional
- radio [checked]
- generic: Don't ask for reference images
- radio
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

### 92-settings-direct-editor-2

[Desktop](screens/92-settings-direct-editor-2-desktop.png) · [Phone](screens/92-settings-direct-editor-2-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#92-settings-direct-editor-2)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking" [selected]:
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Direct booking":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Enable direct booking
    - text: Services set with fixed duration
    - text: can be enabled for direct booking.
    - generic: Manage this for each service in
    - button "Services":
      - generic: Services
    - separator
    - generic: Availability for direct booking
    - generic: You have no service providers enabled for direct booking.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - text: Choose what people are asked for when they book directly.
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Note to the artist
    - generic: A note to the artist is optional
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Deposit
    - generic: No deposit required
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Maximum time in advance that an appointment can be booked
    - generic: 90 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time before appointment start that it can be booked
    - generic: 3 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time between appointments
    - generic: 30 Minutes
    - button "Edit":
      - generic: Edit
- button:
- banner:
  - generic: Note to the artist
- text: Do you want to ask for a note to the artist?
- generic: A note to the artist is required
- radio
- generic: A note to the artist is optional
- radio [checked]
- generic: Don't ask for a note to the artist
- radio
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  }
]
```

</details>

### 93-settings-direct-editor-3

[Desktop](screens/93-settings-direct-editor-3-desktop.png) · [Phone](screens/93-settings-direct-editor-3-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#93-settings-direct-editor-3)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking" [selected]:
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Direct booking":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Enable direct booking
    - text: Services set with fixed duration
    - text: can be enabled for direct booking.
    - generic: Manage this for each service in
    - button "Services":
      - generic: Services
    - separator
    - generic: Availability for direct booking
    - generic: You have no service providers enabled for direct booking.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - text: Choose what people are asked for when they book directly.
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Note to the artist
    - generic: A note to the artist is optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Deposit
    - generic: No deposit required
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Maximum time in advance that an appointment can be booked
    - generic: 90 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time before appointment start that it can be booked
    - generic: 3 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time between appointments
    - generic: 30 Minutes
    - button "Edit":
      - generic: Edit
- button:
- banner:
  - generic: Deposit
  - generic: Decide whether people pay a deposit before their booking is confirmed.
- generic: Require a deposit before the booking is confirmed
- generic: Bookings are confirmed straight away, with nothing to pay up front.
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 94-settings-direct-editor-4

[Desktop](screens/94-settings-direct-editor-4-desktop.png) · [Phone](screens/94-settings-direct-editor-4-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#94-settings-direct-editor-4)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking" [selected]:
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Direct booking":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Enable direct booking
    - text: Services set with fixed duration
    - text: can be enabled for direct booking.
    - generic: Manage this for each service in
    - button "Services":
      - generic: Services
    - separator
    - generic: Availability for direct booking
    - generic: You have no service providers enabled for direct booking.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - text: Choose what people are asked for when they book directly.
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Note to the artist
    - generic: A note to the artist is optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Deposit
    - generic: No deposit required
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Maximum time in advance that an appointment can be booked
    - generic: 90 Days
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Minimum time before appointment start that it can be booked
    - generic: 3 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time between appointments
    - generic: 30 Minutes
    - button "Edit":
      - generic: Edit
- button:
- banner:
  - generic: Maximum time in advance that an appointment can be booked
  - generic: What is the maximum time into the future that someone can book an appointment?
- radio "Set in days Set in months" [checked]
- generic: Set in days
- radio
- generic: Set in months
- separator
- generic: days
- spinbutton: "90"
- separator
- paragraph: With the current setting, people can submit a request today for an appointment with you on Jan 10, 2027 at the latest.
- button "Cancel":
  - generic: Cancel
- button "Done":
  - generic: Done
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  }
]
```

</details>

### 95-settings-direct-editor-5

[Desktop](screens/95-settings-direct-editor-5-desktop.png) · [Phone](screens/95-settings-direct-editor-5-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#95-settings-direct-editor-5)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking" [selected]:
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Direct booking":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Enable direct booking
    - text: Services set with fixed duration
    - text: can be enabled for direct booking.
    - generic: Manage this for each service in
    - button "Services":
      - generic: Services
    - separator
    - generic: Availability for direct booking
    - generic: You have no service providers enabled for direct booking.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - text: Choose what people are asked for when they book directly.
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Note to the artist
    - generic: A note to the artist is optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Deposit
    - generic: No deposit required
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Maximum time in advance that an appointment can be booked
    - generic: 90 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time before appointment start that it can be booked
    - generic: 3 Days
    - button "Edit" [active]:
      - generic: Edit
    - separator
    - generic: Minimum time between appointments
    - generic: 30 Minutes
    - button "Edit":
      - generic: Edit
- button:
- banner:
  - generic: Minimum time before an appointment that it can be booked
- radio "Set in days Set in hours" [checked]
- generic: Set in days
- radio
- generic: Set in hours
- separator
- generic: days
- spinbutton: "3"
- separator
- paragraph: With the current setting, people can book an appointment on Oct 15, 2026 at the earliest.
- button "Cancel":
  - generic: Cancel
- button "Done":
  - generic: Done
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  }
]
```

</details>

### 96-settings-direct-editor-6

[Desktop](screens/96-settings-direct-editor-6-desktop.png) · [Phone](screens/96-settings-direct-editor-6-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#96-settings-direct-editor-6)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking" [selected]:
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Direct booking":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Enable direct booking
    - text: Services set with fixed duration
    - text: can be enabled for direct booking.
    - generic: Manage this for each service in
    - button "Services":
      - generic: Services
    - separator
    - generic: Availability for direct booking
    - generic: You have no service providers enabled for direct booking.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - text: Choose what people are asked for when they book directly.
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Note to the artist
    - generic: A note to the artist is optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Deposit
    - generic: No deposit required
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Maximum time in advance that an appointment can be booked
    - generic: 90 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time before appointment start that it can be booked
    - generic: 3 Days
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Minimum time between appointments
    - generic: 30 Minutes
    - button "Edit" [active]:
      - generic: Edit
- button:
- banner:
  - generic: Minimum time between appointments
  - generic: How much time do you want to leave between appointments?
- button "30 Minutes":
  - generic: 30 Minutes
- separator
- paragraph: Linework will use this setting along with your availability when displaying possible time slots that the client can select as a suggestion for their appointment time.
- button "Cancel":
  - generic: Cancel
- button "Save changes":
  - generic: Save changes
```

</details>

### 159-settings-requests-lower

[Desktop](screens/159-settings-requests-lower-desktop.png) · [Phone](screens/159-settings-requests-lower-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#159-settings-requests-lower)

Observed URL: `https://app.linework.com/manager/settings/booking`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Online booking
  - generic: Manage settings for tattoo requests, direct booking and your online booking page.
  - separator
  - generic: https://booking.linework.com/infinity-test
  - generic: Link to your booking page
  - button "Edit link":
    - generic: Edit link
  - button "View":
    - generic: View
  - button "Copy link":
    - generic: Copy link
  - tablist:
    - tab "Tattoo requests" [selected]:
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tab "Booking page":
      - generic: Booking page
  - tabpanel "Tattoo requests":
    - generic: Booking terms
    - generic: No booking terms
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Accept open tattoo booking requests
    - banner:
      - img "Infinity test":
        - generic: IT
    - generic: Open Requests
    - generic: Not accepting requests
    - button "OFF":
      - generic: "OFF"
    - separator
    - generic: Accept tattoo booking requests for specific artists
    - generic: You have no active artists in the studio to accept tattoo requests for.
    - button "Manage artists":
      - generic: Manage artists
    - separator
    - generic: Customize form for Open Requests
    - generic: Tattoo size options
    - generic: Tiny
    - generic: Small
    - generic: Medium
    - generic: Medium +
    - generic: Large
    - generic: Half Sleeve
    - generic: Three-fourths sleeve
    - generic: Full arm sleeve
    - generic: Full back piece
    - generic: Full chest piece
    - generic: Full body suit
    - generic: Width x Height
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Color theme options
    - generic: Color
    - generic: Black & gray
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Skin tones
    - generic: Don't ask for skin tone
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Budget
    - generic: Don't ask client for their budget
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Reference Images
    - generic: Reference images are optional
    - button "Edit":
      - generic: Edit
    - separator
    - generic: Questions that are always visible and required in your form
    - paragraph: "In addition to the customizable questions above, clients are always asked to provide answers to the following:"
    - generic: Is it a cover up?
    - generic: If answered yes, the client is asked to upload images of their existing tattoo.
    - generic: Body location of tattoo
    - generic: Asks the client to describe where on their body they would like their tattoo.
    - generic: Tattoo description
    - generic: Asks the client to provide a detailed description of what they are looking for in their tattoo concept.
    - generic: Availability and other details
    - generic: Asks the client to provide dates and times for when they might be available for an appointment and if they have other things they want managers to know about when reviewing their request.
    - separator
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Settings > Forms

**Purpose:** Builds bilingual digital consent and intake forms.

**Layout and behavior:** 0/10 Created and0 Enabled; New form opens disclaimer then draft editor. Sections: General settings, Introduction, Personal details, Identification, Home address, Procedure information, Procedure description, Medical questionnaire, Required consents, Client signature. Form preview is blocked by Form is not valid.

**Dependencies and boundaries:** Required internal title and valid configuration; native required metadata alone is not proof of business optionality. Draft discarded without saving. No actual client consent completed.

### 97-settings-forms

[Desktop](screens/97-settings-forms-desktop.png) · [Phone](screens/97-settings-forms-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#97-settings-forms)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
```

</details>

### 98-settings-form-new

[Desktop](screens/98-settings-form-new-desktop.png) · [Phone](screens/98-settings-form-new-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#98-settings-form-new)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form" [active]:
    - text: New form
- generic: Disclaimer
- paragraph: Linework does not provide legal advice. This template only shows how a potential release form, waiver or consent form could look like. The template and the content of it is not a substitute for the advice of a lawyer. Law differs in each legal jurisdiction and may be interpreted or applied differently depending on your location or situation. You as a studio owner, manager or artist are responsible for consulting with your own legal adviser and apply necessary changes to make the content in this form applicable for your situation.
- button "I understand"
- button "Close editor"
```

</details>

### 99-settings-form-editor

[Desktop](screens/99-settings-form-editor-desktop.png) · [Phone](screens/99-settings-form-editor-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#99-settings-form-editor)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: General form settings
- text: Form title for internal use (required)
- textbox "Form title"
- text: This title is for internal use only and will not be seen by the client. Make it as descriptive as possible.
- separator
- text: Enable form languages
- generic: Norwegian 🇳🇴
- generic: English 🇺🇸
- text: Unless fields are pre-filled, you will need to translate all fields for each form section into every language you enable. If multiple languages are enabled, clients will be able to select their preferred language when filling in their submission.
- separator
- text: Location of procedure
- generic: Use studio address
- textbox: Myrveien 17B
- generic: Street 1
- textbox
- generic: Street 2
- textbox: Ski
- generic: City
- textbox: Akershus
- generic: State / Province / Region
- textbox: "1406"
- generic: ZIP code
- paragraph: If services are provided at different locations, create a form for each location.
- separator
- generic: Require staff member to complete form
- generic: When enabled, a staff member will need to review the client submission to complete the form.
- generic: Let staff member add additional details before completing
- generic: Require signature from staff member
- generic: "Form can be completed by:"
- radio "Studio managers"
- generic: Studio managers
- radio "Artist performing the service"
- generic: Artist performing the service
- radio "Both" [checked]
- generic: Both
- separator
- generic: Display logo
- generic: Include studio logo
- paragraph: If you upload an image or logo to your studio profile you can display it to this form.
- separator
- generic: Delete form
- generic: If you delete this form all submissions will still be kept in your records.
- button "Delete":
  - generic: Delete
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Form title",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "radio"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 100-settings-form-introduction

[Desktop](screens/100-settings-form-introduction-desktop.png) · [Phone](screens/100-settings-form-introduction-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#100-settings-form-introduction)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Introduction
- generic: Add an introduction to inform clients about the purpose of the form. This section cannot be disabled.
- separator
- banner:
  - button "🇳🇴 Norwegian"
  - button "🇺🇸 English"
- generic: Form title for client to see
- textbox "Title"
- text: This title will be displayed to clients when filling out their form and in the completed PDF.
- generic: Introduction text
- textbox "Introduction text"
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Title",
    "required": false,
    "tag": "INPUT",
    "type": "string"
  },
  {
    "label": null,
    "placeholder": "Introduction text",
    "required": false,
    "tag": "INPUT",
    "type": "string"
  }
]
```

</details>

### 101-settings-form-personal-details

[Desktop](screens/101-settings-form-personal-details-desktop.png) · [Phone](screens/101-settings-form-personal-details-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#101-settings-form-personal-details)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Personal details
- generic: Ask the client to fill in personal information about themselves. This section cannot be disabled.
- separator
- generic: Pre-fill known fields from client profile
- generic: Update client profile based on client submission
- separator
- generic: "Include fields:"
- generic: Full name (Always enabled)
- generic: Date of birth
- generic: Phone number
- generic: Email address
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 102-settings-form-identification

[Desktop](screens/102-settings-form-identification-desktop.png) · [Phone](screens/102-settings-form-identification-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#102-settings-form-identification)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Identification
- generic: Ask the client to disclose which type of identification they are providing as proof of age and identity.
- generic: Include section
- separator
- generic: "Include options:"
- generic: Drivers licence
- generic: Passport
- generic: National identification card
- generic: Payment card with photo
- generic: Military ID
- generic: State identification card
- generic: MitID
- generic: Birth certificate
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 103-settings-form-home-address

[Desktop](screens/103-settings-form-home-address-desktop.png) · [Phone](screens/103-settings-form-home-address-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#103-settings-form-home-address)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Home address
- generic: Ask clients to add their home address information.
- generic: Include section
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 104-settings-form-procedure-information

[Desktop](screens/104-settings-form-procedure-information-desktop.png) · [Phone](screens/104-settings-form-procedure-information-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#104-settings-form-procedure-information)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Procedure information
- generic: Inform the client about the procedure and disclose any potential risks to be aware of.
- generic: Include section
- separator
- generic: "Include service information:"
- generic: Name of service provider
- generic: Date of procedure
- generic: Location of procedure
- separator
- generic: Information about the procedure for the client to read
- banner:
  - button "🇳🇴 Norwegian"
  - button "🇺🇸 English"
- button:
- button:
- button:
- button:
- button:
- button:
- button:
- paragraph:
  - strong: "Hva du bør vite og forvente:"
- list:
  - text: • En tatovering kan ta noen minutter eller noen timer å bli ferdig, og det er
  - strong: permanent
  - text: . Husk å dobbelt sjekke om det er riktig stavet, betydning eller plassering, da Artisten og Tattoo Studio ikke er ansvarlige for det du gir dem som valgt design.
  - listitem: • En tatovering kan bare fjernes med laser eller kirurgiske metoder, som kan være skadelig og/eller kostbart. Dette vil sannsynligvis ikke resultere i at huden din blir tilbake til sin eksakte utseende før tatoveringen ble utført.
  - text: • Det er
  - strong: kjente og ukjente risikoer
  - text: "forbundet med å få en tatovering. Tatovering innebærer å bryte huden, en av kroppens viktigste barrierer. Dette betyr at du kan være mer sårbar for hud- og blodinfeksjoner. Tatovering kan også føre til skader inkludert men ikke begrenset til: skjering, vanskeligheter med å oppdage melanom og allergiske reaksjoner til tatoveringspigment, latexgummigenser og/eller såpe."
  - text: • Du vil få
  - strong: post-procedur-håndtering
  - text: instruksjoner om håndtering av tatoveringen og håndtering under helsestillingen. Det er mulig at tatoveringen blir infisert, spesielt hvis du ikke følger instruksjonene som er gitt til deg. Du må søke profesjonell medisinsk hjelp hvis tegn og symptomer av infeksjon oppstår.
  - listitem: • Det er også viktig å følge instruksjonene for å unngå at tatoveringen blir skadet i farger eller design under helsestillingen. Eventuelle tilbakekall av tatovering på grunn av min egen uaktsomhet, vil ikke bli dekket av Artisten eller Tattoo Studio.
  - text: •
  - strong: Variasjoner i farger og design
  - text: kan eksistere mellom det du har valgt som tatovering og den faktiske tatoveringen når den blir utført på kroppen din. Over tid vil fargene og klarheten av tatoveringen bli mindre på grunn av ubeskyttet eksponering for sol og den naturlige fordelingen av pigment under huden.
- text: "Visit URL: EditRemove"
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "text"
  }
]
```

</details>

### 105-settings-form-procedure-description

[Desktop](screens/105-settings-form-procedure-description-desktop.png) · [Phone](screens/105-settings-form-procedure-description-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#105-settings-form-procedure-description)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Procedure description
- generic: This section includes a text field for the client to describe the procedure in detail.
- generic: Include section
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 106-settings-form-medical-questionnaire

[Desktop](screens/106-settings-form-medical-questionnaire-desktop.png) · [Phone](screens/106-settings-form-medical-questionnaire-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#106-settings-form-medical-questionnaire)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Medical questionnaire
- generic: Ask client to disclose medical conditions to ensure they have the requirements needed to perform a service procedure. Their answers will be recorded in the generated PDF of their submission.
- generic: Include section
- generic: Enable or disable medical questions to ask
- separator
- generic: Allergies
- generic: Are you allergic to disinfectant or soap?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Are you allergic to Latex?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Are you allergic to inks, dyes or pigments?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Are you allergic to metals?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Do you have other allergies that might be relevant for the service provider to know?
- generic: If answered 'yes', a field will appear to disclose relevant allergies.
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- button "Add custom allergy":
  - generic: Add custom allergy
- generic: Medical conditions
- generic: Are you pregnant?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Are you nursing/breast-feeding?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Do you have history of epilepsy, seizures, fainting or narcolepsy?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Do you have history of heart disease?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Do you have history of skin diseases or lesions?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Do you have history with Hemophilia or other bleeding disorders?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Do you have Diabetes?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Do you have Human immunodeficiency virus (HIV)?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- generic: Are you currently using blood-thinning medication?
- button "Ask":
  - generic: Ask
- button "Don't ask":
  - generic: Don't ask
- button "Add custom medical condition":
  - generic: Add custom medical condition
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 107-settings-form-required-consents

[Desktop](screens/107-settings-form-required-consents-desktop.png) · [Phone](screens/107-settings-form-required-consents-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#107-settings-form-required-consents)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Required consents
- generic: Include checkboxes that the client is required to confirm in order to proceed to completing the form.
- generic: Include section
- separator
- generic: Checkboxes the client must confirm
- button "Add checkbox":
  - generic: Add checkbox
- banner:
  - button "🇳🇴 Norwegian"
  - button "🇺🇸 English"
- button "Jeg er den personen som har presentert ID som bevis for at jeg er minst 18 år gammel.":
  - textbox: Jeg er den personen som har presentert ID som bevis for at jeg er minst 18 år gammel.
- button "Jeg er ikke under påvirkning av alkohol eller stoffer og at jeg selv vil sende meg inn for å få kroppsmaleri uten press eller kraftoverføring.":
  - textbox: Jeg er ikke under påvirkning av alkohol eller stoffer og at jeg selv vil sende meg inn for å få kroppsmaleri uten press eller kraftoverføring.
- button "Jeg er klar over at informasjonen jeg har gitt i medisinsk undersøkelse er fullstendig og sann på beste kunnskap.":
  - textbox: Jeg er klar over at informasjonen jeg har gitt i medisinsk undersøkelse er fullstendig og sann på beste kunnskap.
- button "Jeg samtykker til å følge alle instruksjoner om helsestilling og oppsyn med kroppsmaleri, og at eventuelle tilbakekall av kroppsmaleri på grunn av min egen uaktsomhet vil bli gjort til min egen kostnad.":
  - textbox: Jeg samtykker til å følge alle instruksjoner om helsestilling og oppsyn med kroppsmaleri, og at eventuelle tilbakekall av kroppsmaleri på grunn av min egen uaktsomhet vil bli gjort til min egen kostnad.
- button "Jeg har blitt fullstendig informert om risikoene forbundet med kroppsmaleri, inkludert men ikke begrenset til infeksjon, skjering, vanskeligheter med å oppdage melanom, og allergiske reaksjoner til kroppsmaleri pigment, latexgummigenser og antibiotika. Etter å ha blitt informert om potensielle risikoer forbundet med en kroppsmaleri prosedyre, ønsker jeg å fortsette med kroppsmaleri prosedyren og jeg antar alle og alle risikoer som kan oppstå fra kroppsmaleri.":
  - textbox: Jeg har blitt fullstendig informert om risikoene forbundet med kroppsmaleri, inkludert men ikke begrenset til infeksjon, skjering, vanskeligheter med å oppdage melanom, og allergiske reaksjoner til kroppsmaleri pigment, latexgummigenser og antibiotika. Etter å ha blitt informert om potensielle risikoer forbundet med en kroppsmaleri prosedyre, ønsker jeg å fortsette med kroppsmaleri prosedyren og jeg antar alle og alle risikoer som kan oppstå fra kroppsmaleri.
- button "Jeg er klar over at jeg har fått tilstrekkelig mulighet til å lese og forstå dette dokumentet, og at det ikke ble presentert til meg sist. Jeg forstår at jeg er undertegnat en juridisk kontrakt som gir opp visse rettigheter til å reklamasjon for skader mot Artist eller Tattoo Studio.":
  - textbox: Jeg er klar over at jeg har fått tilstrekkelig mulighet til å lese og forstå dette dokumentet, og at det ikke ble presentert til meg sist. Jeg forstår at jeg er undertegnat en juridisk kontrakt som gir opp visse rettigheter til å reklamasjon for skader mot Artist eller Tattoo Studio.
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 108-settings-form-client-signature

[Desktop](screens/108-settings-form-client-signature-desktop.png) · [Phone](screens/108-settings-form-client-signature-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#108-settings-form-client-signature)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form":
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Client signature
- generic: Include a field for the applicant to add their signature to complete the form.
- generic: Include section
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

### 109-settings-form-preview

[Desktop](screens/109-settings-form-preview-desktop.png) · [Phone](screens/109-settings-form-preview-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#109-settings-form-preview)

Observed URL: `https://app.linework.com/manager/settings/forms`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form
- generic: Form is not valid
- banner:
  - generic: Create form
  - generic: /
  - button "Preview form" [active]:
    - generic: Preview form
  - button "Close":
    - generic: Close
  - button "Save changes":
    - generic: Save changes
- generic: General settings
- separator
- text: Edit form sections
- generic: i
- generic: Introduction
- generic: "1"
- generic: Personal details
- generic: "2"
- generic: Identification
- generic: "3"
- generic: Home address
- generic: "4"
- generic: Procedure information
- generic: "5"
- generic: Procedure description
- generic: "6"
- generic: Medical questionnaire
- generic: "7"
- generic: Required consents
- generic: "8"
- generic: Client signature
- generic: Form section
- generic: Client signature
- generic: Include a field for the applicant to add their signature to complete the form.
- generic: Include section
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "checkbox"
  }
]
```

</details>

## Settings > Instructions

**Purpose:** Builds instructions shared before or after appointments.

**Layout and behavior:** Two empty before/after sections,0/8 Created and0/8 Enabled. Add Instructions offers Clean Slate/Create From Scratch or Tattoo aftercare template. Editor contains content, name, sharing timing, SMS and email subject. Add content opens Unlayer iframe builder with Content/Blocks/Body tools.

**Dependencies and boundaries:** Services/appointment delivery and message templates. Cancel/discard affected only an unsaved draft; loaded state160 confirms no persisted instructions.

### 110-settings-instructions

[Desktop](screens/110-settings-instructions-desktop.png) · [Phone](screens/110-settings-instructions-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#110-settings-instructions)

Observed URL: `https://app.linework.com/manager/settings/instruction`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Instructions
  - generic: Create and manage instructions to share with clients before or after appointments.
  - generic: 0/8 Created
  - generic: 0/8 Enabled
```

</details>

### 111-settings-instructions-before

[Desktop](screens/111-settings-instructions-before-desktop.png) · [Phone](screens/111-settings-instructions-before-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#111-settings-instructions-before)

Observed URL: `https://app.linework.com/manager/settings/instruction`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Instructions
  - generic: Create and manage instructions to share with clients before or after appointments.
  - generic: 0/8 Created
  - generic: 0/8 Enabled
  - generic: Instructions before appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions" [active]:
    - text: Add Instructions
  - separator
  - generic: Instructions after appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
- button:
- banner:
  - generic: Add Instructions
- generic: Start With A Clean Slate
- generic: Create From Scratch
- generic: Start With A Template
- img "Standard instruction"
- generic: Tattoo aftercare
```

</details>

### 112-settings-instructions-editor

[Desktop](screens/112-settings-instructions-editor-desktop.png) · [Phone](screens/112-settings-instructions-editor-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#112-settings-instructions-editor)

Observed URL: `https://app.linework.com/manager/settings/instruction`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Instructions
  - generic: Create and manage instructions to share with clients before or after appointments.
  - generic: 0/8 Created
  - generic: 0/8 Enabled
  - generic: Instructions before appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
  - separator
  - generic: Instructions after appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
- button:
- banner:
  - generic: Add Instructions
- generic: Content
- generic: No content added
- button "Add content":
  - generic: Add content
- generic: Instructions name
- generic: 0/60
- textbox "Enter a descriptive name" [active]
- separator
- generic: When to share with clients
- combobox:
  - searchbox: Before appointments
- separator
- generic: SMS message
- generic: 0/120
- textbox "Enter message"
- separator
- generic: Email subject line
- generic: 0/50
- textbox "Enter email subject"
- button "Cancel":
  - generic: Cancel
- button "Save":
  - generic: Save
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter a descriptive name",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter message",
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter email subject",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 113-settings-instructions-content

[Desktop](screens/113-settings-instructions-content-desktop.png) · [Phone](screens/113-settings-instructions-content-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#113-settings-instructions-content)

Observed URL: `https://app.linework.com/manager/settings/instruction`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Instructions
  - generic: Create and manage instructions to share with clients before or after appointments.
  - generic: 0/8 Created
  - generic: 0/8 Enabled
  - generic: Instructions before appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
  - separator
  - generic: Instructions after appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
- button:
- banner:
  - generic: Add Instructions
- generic: Content
- generic: No content added
- button "Add content" [active]:
  - generic: Add content
- generic: Instructions name
- generic: 0/60
- textbox "Enter a descriptive name"
- separator
- generic: When to share with clients
- combobox:
  - searchbox: Before appointments
- separator
- generic: SMS message
- generic: 0/120
- textbox "Enter message"
- separator
- generic: Email subject line
- generic: 0/50
- textbox "Enter email subject"
- button "Cancel":
  - generic: Cancel
- button "Save":
  - generic: Save
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter a descriptive name",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter message",
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter email subject",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 114-settings-instructions-content-loaded

[Desktop](screens/114-settings-instructions-content-loaded-desktop.png) · [Phone](screens/114-settings-instructions-content-loaded-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#114-settings-instructions-content-loaded)

Observed URL: `https://app.linework.com/manager/settings/instruction`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Instructions
  - generic: Create and manage instructions to share with clients before or after appointments.
  - generic: 0/8 Created
  - generic: 0/8 Enabled
  - generic: Instructions before appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
  - separator
  - generic: Instructions after appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
- button:
- banner:
  - generic: Add Instructions
- generic: Content
- generic: No content added
- button "Add content" [active]:
  - generic: Add content
- generic: Instructions name
- generic: 0/60
- textbox "Enter a descriptive name"
- separator
- generic: When to share with clients
- combobox:
  - searchbox: Before appointments
- separator
- generic: SMS message
- generic: 0/120
- textbox "Enter message"
- separator
- generic: Email subject line
- generic: 0/50
- textbox "Enter email subject"
- button "Cancel":
  - generic: Cancel
- button "Save":
  - generic: Save
- banner:
  - generic: Edit content
  - generic: Untitled Instructions
  - button "Cancel"
  - button "Save changes"
- iframe:
  - toolbar:
    - button "Desktop":
    - separator
    - button "Preview":
  - generic: No content here. Drag content from right.
  - list:
    - button "Content":
      - generic: Content
    - button "Blocks":
      - generic: Blocks
    - button "Body":
      - generic: Body
  - button "Columns":
    - generic "Columns"
  - button "Button":
    - generic "Button"
  - button "Divider":
    - generic "Divider"
  - button "Heading":
    - generic "Heading"
  - button "Paragraph":
    - generic "Paragraph"
  - button "Image":
    - generic "Image"
  - button "Social":
    - generic "Social"
  - button "Menu":
    - generic "Menu"
  - button "HTML":
    - generic "HTML"
  - link "by Unlayer Editor":
    - /url: https://unlayer.com/?utm_medium=web-editor&utm_campaign=editor-referral
    - generic: by
    - generic: Unlayer Editor
  - button "Hide":
  - status
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter a descriptive name",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter message",
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter email subject",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 115-settings-instructions-aftercare-template

[Desktop](screens/115-settings-instructions-aftercare-template-desktop.png) · [Phone](screens/115-settings-instructions-aftercare-template-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#115-settings-instructions-aftercare-template)

Observed URL: `https://app.linework.com/manager/settings/instruction`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Instructions
  - generic: Create and manage instructions to share with clients before or after appointments.
  - generic: 0/8 Created
  - generic: 0/8 Enabled
  - generic: Instructions before appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
  - separator
  - generic: Instructions after appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
- button:
- banner:
  - generic: Add Instructions
- generic: Content
- img "Standard instruction"
- button "Edit content":
  - generic: Edit content
- generic: Instructions name
- generic: 16/60
- textbox "Enter a descriptive name" [active]: Tattoo aftercare
- separator
- generic: When to share with clients
- combobox:
  - searchbox: After appointments
- separator
- generic: SMS message
- generic: 99/120
- textbox "Enter message": Take good care of your new tattoo! Follow the aftercare instructions for the best possible healing.
- separator
- generic: Email subject line
- generic: 25/50
- textbox "Enter email subject": <redacted>
- separator
- generic: Title displayed after online payments
- textbox "Enter a title for clients to see": Tattoo aftercare
- button "Cancel":
  - generic: Cancel
- button "Save":
  - generic: Save
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "Enter a descriptive name",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "hidden"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "search"
  },
  {
    "label": null,
    "placeholder": "Enter message",
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter email subject",
    "required": false,
    "tag": "INPUT",
    "type": null
  },
  {
    "label": null,
    "placeholder": "Enter a title for clients to see",
    "required": false,
    "tag": "INPUT",
    "type": null
  }
]
```

</details>

### 160-settings-instructions-loaded

[Desktop](screens/160-settings-instructions-loaded-desktop.png) · [Phone](screens/160-settings-instructions-loaded-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#160-settings-instructions-loaded)

Observed URL: `https://app.linework.com/manager/settings/instruction`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Instructions
  - generic: Create and manage instructions to share with clients before or after appointments.
  - generic: 0/8 Created
  - generic: 0/8 Enabled
  - generic: Instructions before appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
  - separator
  - generic: Instructions after appointments
  - generic: No Instructions Added Yet
  - button "Add Instructions":
    - text: Add Instructions
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Settings > Cash Register

**Purpose:** Enables the studio cash register.

**Layout and behavior:** Prerequisite/disabled page.

**Dependencies and boundaries:** Payment methods must be enabled; operational register screens unavailable.

### 116-settings-cash-register

[Desktop](screens/116-settings-cash-register-desktop.png) · [Phone](screens/116-settings-cash-register-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#116-settings-cash-register)

Observed URL: `https://app.linework.com/manager/settings/cashregister`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Cash register
  - generic: Manage settings for your cash register.
  - generic: Cash register not enabled
  - generic: "Get started with payments to enable your cash register:"
  - button "Payment methods":
    - generic: Payment methods
```

</details>

## Settings > Company details

**Purpose:** Provides legal company details for payments, cash register and invoicing.

**Layout and behavior:** Start company setup opens organization-number dialog with Go!, explanation and Cancel.

**Dependencies and boundaries:** Company lookup/registration. No organization number submitted.

### 39-settings-company-details

[Desktop](screens/39-settings-company-details-desktop.png) · [Phone](screens/39-settings-company-details-phone.png) · [Detailed notes](CAPTURE-NOTES.md#39-settings-company-details)

Observed URL: `https://app.linework.com/manager/settings/company`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Company details
  - generic: Add details to unlock payments, cash register and invoicing.
  - button "Start company setup"
```

</details>

### 40-settings-company-setup

[Desktop](screens/40-settings-company-setup-desktop.png) · [Phone](screens/40-settings-company-setup-phone.png) · [Detailed notes](CAPTURE-NOTES.md#40-settings-company-setup)

Observed URL: `https://app.linework.com/manager/settings/company`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
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

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  }
]
```

</details>

## Settings > Integrations

**Purpose:** Connects accounting services and configures export accounts.

**Layout and behavior:** Fiken integration card and GBAT10 mapping fields; observed Service3000, Product3100, Fee6940, Bank1920, VATcodes3/3 and voucher1.

**Dependencies and boundaries:** External accounting credentials/connection; Start integration and Save settings not clicked.

### 117-settings-integrations

[Desktop](screens/117-settings-integrations-desktop.png) · [Phone](screens/117-settings-integrations-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#117-settings-integrations)

Observed URL: `https://app.linework.com/manager/settings/integrations`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Integrations
  - generic: Connect Linework with other applications.
  - generic: Fiken integration
  - generic: Fiken integration comes with an extra cost
  - paragraph: This extra cost is subtracted from your Fiken subscription and is not a cost from Linework. Fiken is a third party service and we do not control the pricing.
  - separator
  - button "Start integration":
    - generic: Start integration
  - generic: GBAT10 Export
  - generic: Configure account mappings for Mamut GBAT10 export to Tripletex and other accounting systems.
  - generic: Revenue Accounts
  - spinbutton: "3000"
  - generic: Service Revenue Account
  - generic: Tattoo, piercing, and other services
  - spinbutton: "3100"
  - generic: Product Sales Account
  - generic: Retail product sales
  - generic: Expense & Asset Accounts
  - spinbutton: "6940"
  - generic: Payment Processing Fees
  - generic: Dintero transaction fees
  - spinbutton: "1920"
  - generic: Bank account
  - generic: Dintero intermediate bank account
  - generic: VAT Settings
  - spinbutton: "3"
  - generic: Service VAT Code
  - generic: MVA code for services (3 = 25% output VAT)
  - spinbutton: "3"
  - generic: Product VAT Code
  - generic: MVA code for products
  - generic: Other
  - spinbutton: "1"
  - generic: Voucher Type (Bilagsart)
  - generic: Journal type number for Tripletex
  - button "Save settings":
    - generic: Save settings
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  }
]
```

</details>

## Settings > Client support

**Purpose:** Sets client-facing studio support contact details.

**Layout and behavior:** Phone/email fields with Save.

**Dependencies and boundaries:** Booking and client messages. Values untouched.

### 118-settings-client-support

[Desktop](screens/118-settings-client-support-desktop.png) · [Phone](screens/118-settings-client-support-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#118-settings-client-support)

Observed URL: `https://app.linework.com/manager/settings/clientsupport`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Client support
  - generic: Edit contact information displayed on emails sent to clients.
  - generic: Contact Information
  - generic: Phone number
  - textbox "+47 917 45 834": <redacted>
  - 'button "Norway: + 47"'
  - generic: Email address
  - textbox
  - separator
  - button "Save changes"
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "+47 917 45 834",
    "required": false,
    "tag": "INPUT",
    "type": "tel"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "string"
  }
]
```

</details>

## Settings > Subscription & Billing

**Purpose:** Manages subscription, manager seats and billing invoices.

**Layout and behavior:** Subscriptions / Invoices tabs. Change plan opens monthly/yearly billing choice; discount code editor, seat adjustment, invoice type/products filters and billing email dialog captured.

**Dependencies and boundaries:** Trial Studio Plan790NOK+25%VAT=987.50NOK monthly,0 extra seats, no card. Update Card and Cancel Trial were not clicked; no billing changes or verifications submitted.

### 119-settings-subscription

[Desktop](screens/119-settings-subscription-desktop.png) · [Phone](screens/119-settings-subscription-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#119-settings-subscription)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions" [selected]:
      - generic: Subscriptions
    - tab "Invoices":
      - generic: Invoices
  - tabpanel "Subscriptions":
    - generic: Payment method
    - button "Update Card"
    - generic: No card on file
    - separator
    - generic: Main subscription
    - button "Change plan"
    - button "Add discount code"
    - button "Cancel Trial"
    - generic: Trialing
    - text: Plan details
    - generic: Plan
    - generic: Studio Plan
    - generic: Billing
    - generic: Monthly
    - generic: Amount
    - generic: 790.00 NOK
    - generic: Next Billing Date
    - generic: 19/10/2026
    - generic: Trial Ends
    - generic: 19/10/2026
    - generic: Extra Seats
    - generic: 0 manager
    - button "Adjust"
    - separator
    - text: Price breakdown
    - text: Monthly charge
    - generic: Studio Plan
    - generic: 790.00 NOK
    - generic: Subtotal
    - generic: 790.00 NOK
    - generic: VAT (25%)
    - generic: 197.50 NOK
    - generic: Total
    - generic: 987.50 NOK
```

</details>

### 120-settings-subscription-invoices

[Desktop](screens/120-settings-subscription-invoices-desktop.png) · [Phone](screens/120-settings-subscription-invoices-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#120-settings-subscription-invoices)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions":
      - generic: Subscriptions
    - tab "Invoices" [active] [selected]:
      - generic: Invoices
  - tabpanel "Invoices":
    - generic: All types
    - generic: All products
    - generic: Invoices are sent to
    - generic: ymia2005@gmail.com
    - button "Change"
    - text: No invoices match the current filter.
```

</details>

### 121-settings-plan-options

[Desktop](screens/121-settings-plan-options-desktop.png) · [Phone](screens/121-settings-plan-options-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#121-settings-plan-options)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions" [selected]:
      - generic: Subscriptions
    - tab "Invoices":
      - generic: Invoices
  - tabpanel "Subscriptions":
    - generic: Payment method
    - button "Update Card"
    - generic: No card on file
    - separator
    - generic: Main subscription
    - button "Change plan" [active]
    - button "Add discount code"
    - button "Cancel Trial"
    - generic: Trialing
    - text: Plan details
    - generic: Plan
    - generic: Studio Plan
    - generic: Billing
    - generic: Monthly
    - generic: Amount
    - generic: 790.00 NOK
    - generic: Next Billing Date
    - generic: 19/10/2026
    - generic: Trial Ends
    - generic: 19/10/2026
    - generic: Extra Seats
    - generic: 0 manager
    - button "Adjust"
    - separator
    - text: Price breakdown
    - text: Monthly charge
    - generic: Studio Plan
    - generic: 790.00 NOK
    - generic: Subtotal
    - generic: 790.00 NOK
    - generic: VAT (25%)
    - generic: 197.50 NOK
    - generic: Total
    - generic: 987.50 NOK
- button:
- banner:
  - generic: Change Billing Frequency
- generic: Select your preferred billing frequency. The change will take effect at the start of your next billing period.
- button "Monthly"
- button "Yearly"
- button "Save" [disabled]
```

</details>

### 122-settings-discount

[Desktop](screens/122-settings-discount-desktop.png) · [Phone](screens/122-settings-discount-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#122-settings-discount)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions" [selected]:
      - generic: Subscriptions
    - tab "Invoices":
      - generic: Invoices
  - tabpanel "Subscriptions":
    - generic: Payment method
    - button "Update Card"
    - generic: No card on file
    - separator
    - generic: Main subscription
    - button "Change plan"
    - button "Add discount code" [active]
    - button "Cancel Trial"
    - generic: Trialing
    - text: Plan details
    - generic: Plan
    - generic: Studio Plan
    - generic: Billing
    - generic: Monthly
    - generic: Amount
    - generic: 790.00 NOK
    - generic: Next Billing Date
    - generic: 19/10/2026
    - generic: Trial Ends
    - generic: 19/10/2026
    - generic: Extra Seats
    - generic: 0 manager
    - button "Adjust"
    - separator
    - text: Price breakdown
    - text: Monthly charge
    - generic: Studio Plan
    - generic: 790.00 NOK
    - generic: Subtotal
    - generic: 790.00 NOK
    - generic: VAT (25%)
    - generic: 197.50 NOK
    - generic: Total
    - generic: 987.50 NOK
- button:
- banner:
  - generic: Redeem discount code
- generic: Enter the discount code you received to see what it includes before applying it to your subscription.
- textbox "SUMMER25"
- generic: Discount code
- button "Cancel"
- button "Verify" [disabled]
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": "SUMMER25",
    "required": false,
    "tag": "INPUT",
    "type": "text"
  }
]
```

</details>

### 123-settings-seats

[Desktop](screens/123-settings-seats-desktop.png) · [Phone](screens/123-settings-seats-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#123-settings-seats)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions" [selected]:
      - generic: Subscriptions
    - tab "Invoices":
      - generic: Invoices
  - tabpanel "Subscriptions":
    - generic: Payment method
    - button "Update Card"
    - generic: No card on file
    - separator
    - generic: Main subscription
    - button "Change plan"
    - button "Add discount code"
    - button "Cancel Trial"
    - generic: Trialing
    - text: Plan details
    - generic: Plan
    - generic: Studio Plan
    - generic: Billing
    - generic: Monthly
    - generic: Amount
    - generic: 790.00 NOK
    - generic: Next Billing Date
    - generic: 19/10/2026
    - generic: Trial Ends
    - generic: 19/10/2026
    - generic: Extra Seats
    - generic: 0 manager
    - button "Adjust" [active]
    - separator
    - text: Price breakdown
    - text: Monthly charge
    - generic: Studio Plan
    - generic: 790.00 NOK
    - generic: Subtotal
    - generic: 790.00 NOK
    - generic: VAT (25%)
    - generic: 197.50 NOK
    - generic: Total
    - generic: 987.50 NOK
- button:
- banner:
  - generic: Adjust Seats
- generic: Adjust the number of extra manager seats for your studio.
- generic: Extra Manager Seats
- button "-" [disabled]
- spinbutton: "0"
- button "+"
- button "Next" [disabled]
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "number"
  }
]
```

</details>

### 161-settings-invoice-type-filter

[Desktop](screens/161-settings-invoice-type-filter-desktop.png) · [Phone](screens/161-settings-invoice-type-filter-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#161-settings-invoice-type-filter)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions":
      - generic: Subscriptions
    - tab "Invoices" [selected]:
      - generic: Invoices
  - tabpanel "Invoices":
    - generic: All types
    - button "All types":
      - generic: All types
    - button "Subscription":
      - generic: Subscription
    - button "SMS":
      - generic: SMS
    - generic: All products
    - generic: Invoices are sent to
    - generic: ymia2005@gmail.com
    - button "Change"
    - text: No invoices match the current filter.
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 162-settings-invoice-products-filter

[Desktop](screens/162-settings-invoice-products-filter-desktop.png) · [Phone](screens/162-settings-invoice-products-filter-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#162-settings-invoice-products-filter)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions":
      - generic: Subscriptions
    - tab "Invoices" [selected]:
      - generic: Invoices
  - tabpanel "Invoices":
    - generic: All types
    - generic: All products
    - button "All products":
      - generic: All products
    - generic: Invoices are sent to
    - generic: ymia2005@gmail.com
    - button "Change"
    - text: No invoices match the current filter.
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

### 163-settings-billing-email

[Desktop](screens/163-settings-billing-email-desktop.png) · [Phone](screens/163-settings-billing-email-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#163-settings-billing-email)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions":
      - generic: Subscriptions
    - tab "Invoices" [selected]:
      - generic: Invoices
  - tabpanel "Invoices":
    - generic: All types
    - generic: All products
    - generic: Invoices are sent to
    - generic: ymia2005@gmail.com
    - button "Change" [active]
    - text: No invoices match the current filter.
- button:
- banner:
  - generic: Change billing email
- generic: Invoices, receipts and payment reminders are sent to this address.
- textbox: <redacted>
- generic: Email
- button "Save" [disabled]
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "INPUT",
    "type": "email"
  },
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Studio switcher and account dashboard

**Purpose:** Switches between studio/account workspaces.

**Layout and behavior:** Top-left identity opens account menu with Go Dashboard and Logout. Dashboard shows Welcome back, Ibrahim, artist and studio account cards with Launch, New Studio Account and Learning center.

**Dependencies and boundaries:** Current user membership. Only Infinity test studio was launched; unrelated Test artist account and New Studio Account were not opened.

### 124-studio-switcher

[Desktop](screens/124-studio-switcher-desktop.png) · [Phone](screens/124-studio-switcher-phone.png) · [Detailed notes](CAPTURE-NOTES-SETTINGS.md#124-studio-switcher)

Observed URL: `https://app.linework.com/manager/settings/subscription`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- main:
  - generic: Subscription & Billing
  - generic: Manage your Linework subscription.
  - tablist:
    - tab "Subscriptions" [selected]:
      - generic: Subscriptions
    - tab "Invoices":
      - generic: Invoices
  - tabpanel "Subscriptions":
    - generic: Payment method
    - button "Update Card"
    - generic: No card on file
    - separator
    - generic: Main subscription
    - button "Change plan"
    - button "Add discount code"
    - button "Cancel Trial"
    - generic: Trialing
    - text: Plan details
    - generic: Plan
    - generic: Studio Plan
    - generic: Billing
    - generic: Monthly
    - generic: Amount
    - generic: 790.00 NOK
    - generic: Next Billing Date
    - generic: 19/10/2026
    - generic: Trial Ends
    - generic: 19/10/2026
    - generic: Extra Seats
    - generic: 0 manager
    - button "Adjust"
    - separator
    - text: Price breakdown
    - text: Monthly charge
    - generic: Studio Plan
    - generic: 790.00 NOK
    - generic: Subtotal
    - generic: 790.00 NOK
    - generic: VAT (25%)
    - generic: 197.50 NOK
    - generic: Total
    - generic: 987.50 NOK
- banner:
  - generic: Ibrahim Albab
  - generic: ymia2005@gmail.com
- separator
- main:
  - generic: Studio management
  - button "Infinity test":
    - img "Infinity test":
      - generic: IT
  - generic: Infinity test
  - generic: Myrveien 17B Ski
- separator
- contentinfo:
  - generic: Go to Dashboard
  - generic: Log out
```

</details>

### 150-account-dashboard

[Desktop](screens/150-account-dashboard-desktop.png) · [Phone](screens/150-account-dashboard-phone.png) · [Detailed notes](CAPTURE-NOTES-EXTRAS.md#150-account-dashboard)

Observed URL: `https://app.linework.com/dashboard`

<details><summary>Exact labels, headings, tabs, table columns, buttons, options and empty-state text</summary>

```yaml
- button:
  - banner:
    - img "Ibrahim Albab":
      - generic: IA
- link "Learning center":
  - /url: https://intercom.help/linework/en/
  - button "Learning center":
    - generic: Learning center
- generic: Welcome back, Ibrahim
- generic: This is your Linework dashboard where you can create, manage and launch your accounts
- generic: "Manage your artist work:"
- banner:
  - img "Test":
    - generic: T
- generic: Test
- generic: Artist account
- button "Launch"
- generic: "Manage your studio:"
- banner:
  - img "Infinity test":
    - generic: IT
- generic: Infinity test
- generic: Myrveien 17B Ski
- text: Primary-owner
- button "Launch"
- button "New Studio Account":
  - text: New Studio Account
```

</details>

<details><summary>Observed native field types, required attributes and select options</summary>

```json
[
  {
    "label": null,
    "placeholder": null,
    "required": false,
    "tag": "TEXTAREA",
    "type": null
  }
]
```

</details>

## Mapping to Infinity Studio

Source snapshot `47b1ea6bd96f531b135fba1c3d1a56a2c1cd9582`. This compares source routes, not a running visual render. `different layout` means an analogous capability exists without established UI parity; `missing` means no equivalent functioning page was found. No unsupported `match` claims. Full route inventory and field comparison: [studio-route-map.md](studio-route-map.md). Recheck source after the other agent’s changes.

| Linework page / state | Existing Studio destination | Status | Source evidence / practical difference |
| --- | --- | --- | --- |
| Calendar week/day | `/admin/calendar?view=week` / `?view=day`; optional `date`, `staff` | different layout | [admin-calendar.tsx:39](../../../studio/src/routes/admin-calendar.tsx#L39), [toolbar:143](../../../studio/src/routes/admin-calendar.tsx#L143). Mini-month and artist filters on left, time grid on right; I dag, previous/next, Ny avtale, Dag/Uke. |
| Calendar empty time slot | `/admin/bookings/new?date=…&time=…&staff=…` | different layout | [slot links:212](../../../studio/src/routes/admin-calendar.tsx#L212). Opens a whole page with date/time/artist prefilled. |
| Booking opened | `/admin/bookings/:id` | different layout | [admin.tsx:254](../../../studio/src/routes/admin.tsx#L254). Whole page, rather than an established matching Linework panel. Client/contact, consent, reference photos, editable appointment, sessions/inks, messages and payments. |
| New booking flow | `/admin/bookings/new` | different layout | [admin.tsx:136](../../../studio/src/routes/admin.tsx#L136). Single form ending in Lagre avtale; no multi-step review/last-step screen. |
| Clients list / detail | `/admin/clients?q=…`, `/admin/clients/:id` | different layout | [list:572](../../../studio/src/routes/admin.tsx#L572), [detail:613](../../../studio/src/routes/admin.tsx#L613). Search and compact table; detail is an editable form plus booking history. Empty list has no dedicated empty-state copy. |
| Add client | No independent route/form | missing | Clients are created as part of booking entry; [booking POST:213](../../../studio/src/routes/admin.tsx#L213). No `/clients/new` GET exists. |
| Sales | `/admin/payments?date=…` | different layout | [admin.tsx:838](../../../studio/src/routes/admin.tsx#L838). Daily payment register, CSV export, optional Zettle import and inline registration form, not a complete POS sale/cart system. |
| Gift Cards list / sell / detail | `/admin/gift-cards?q=…`, `/admin/gift-cards/:id` | different layout | [admin-extra.tsx:631](../../../studio/src/routes/admin-extra.tsx#L631), [detail:756](../../../studio/src/routes/admin-extra.tsx#L756). Search/filter table, inline sale form, code/balance/movement detail; module can be disabled. |
| Settlements | `/admin/settlements?month=YYYY-MM` or `?year=YYYY` | different layout | [admin-extra.tsx:1036](../../../studio/src/routes/admin-extra.tsx#L1036). Monthly/yearly artist revenue, studio share, rent and artist remainder. Owner sees all; artists see themselves. No transfer/payout execution. |
| Reports and tabs/filters | `/admin/report?date=…`, `/admin/report/:seq`; `/admin/export.csv?from=…&to=…` | different layout | [admin.tsx:1090](../../../studio/src/routes/admin.tsx#L1090), [closed report:1197](../../../studio/src/routes/admin.tsx#L1197), [CSV:931](../../../studio/src/routes/admin.tsx#L931). Daily settlement and previous reports, print/PDF; no general tabbed analytics/report catalog found. |
| Flash | None | missing | No Flash page, catalog or route found in `studio/src`. CSS `flash` means success/error message, not tattoo Flash. |
| Reviews | None | missing | No review-management admin route found. |
| Artists | Nav `/admin/artists`; nearest functioning page `/admin/settings` and `/admin/settings/staff/:id` | missing | [nav:132](../../../studio/src/views/layout.tsx#L132), [staff editor:280](../../../studio/src/routes/admin-extra.tsx#L280). The advertised artists page has no handler. Staff editor provides underlying artist setup. |
| Managers | Nav `/admin/managers`; nearest staff editor | missing | [nav:133](../../../studio/src/views/layout.tsx#L133), [roles:14](../../../studio/src/routes/admin-extra.tsx#L14). No managers handler. Staff roles: Eier, Tatovør, Piercer, Gjesteartist, Resepsjon; no dedicated manager role. |
| Products | Nav Produkter → `/admin/inks` | different layout | [admin-studio.tsx:206](../../../studio/src/routes/admin-studio.tsx#L206). This is an ink/batch traceability register, not a retail product catalog. |
| Settings landing / sub-pages | `/admin/settings` | different layout | [admin-extra.tsx:70](../../../studio/src/routes/admin-extra.tsx#L70). One long page with sections, rather than a known equivalent settings tree/tabs. |
| Settings > services | `/admin/settings` → `/admin/settings/services/new` or `/:id` | different layout | [services table:132](../../../studio/src/routes/admin-extra.tsx#L132), [editor:448](../../../studio/src/routes/admin-extra.tsx#L448). Separate whole-page editor for each treatment. |
| Settings > forms / consent | No admin form-template editor; `/skjema/:publicId` is client-facing | missing | [client.tsx:36](../../../studio/src/routes/client.tsx#L36), [fixed questions](../../../studio/src/lib/consent.ts#L1). Built-in bilingual health/consent form; service can require it. No configurable form builder/templates/settings page. |
| Settings > instructions | Service aftercare fields; fixed messaging templates | different layout | [admin-extra.tsx:518](../../../studio/src/routes/admin-extra.tsx#L518), [messages.ts:80](../../../studio/src/lib/messages.ts#L80). Per-service Norwegian/English aftercare text sent on completion; no independent pre/post instructions page or editor for email templates. |
| Settings > payments | Settings Tilkoblinger status; secrets/env configuration | different layout | [admin-extra.tsx:83](../../../studio/src/routes/admin-extra.tsx#L83), [README integrations](../../../studio/README.md#L34). Stripe/Zettle configuration is deployed secrets, not a connection wizard in admin. |
| Settings > booking page | Service visibility/bookability configuration; public APIs | different layout | [service public checkbox:506](../../../studio/src/routes/admin-extra.tsx#L506), [staff bookability:344](../../../studio/src/routes/admin-extra.tsx#L344), [public.ts:40](../../../studio/src/routes/public.ts#L40). No admin booking-page design/branding/URL editor found. |
| Artist commission / studio share | `/admin/settings/staff/:id` | different layout | [admin-extra.tsx:321](../../../studio/src/routes/admin-extra.tsx#L321). One `Studioandel av omsetning (%)` field; settlement computes artist gross minus studio share. No commission-plan/version/tier UI found. |
| Artist rent | `/admin/settings/staff/:id`; `/admin/settlements` | different layout | [admin-extra.tsx:325](../../../studio/src/routes/admin-extra.tsx#L325). `Fast stolleie per måned (kr)` multiplied by selected period; optional rent feature. |
| Artist payouts | Settlement totals only | missing | [calculation:1070](../../../studio/src/routes/admin-extra.tsx#L1070). No bank account, payout schedule, payout ledger or payout action/route found. |
| Tattoo requests | `/admin/requests` | different layout | [admin.tsx:123](../../../studio/src/routes/admin.tsx#L123). Table of requested bookings; opens whole booking page to set time/price/deposit and confirm. |
| Notifications bell | None | missing | [topbar:164](../../../studio/src/views/layout.tsx#L164) has no bell or notification inbox. New-request badge exists; external notification integration status is not an inbox. |
| New deposit | `/admin/deposits/new` | different layout | [admin.tsx:813](../../../studio/src/routes/admin.tsx#L813). Instructions and bookings waiting for deposits; new booking link. Not a standalone deposit checkout form. |
| New sale | `/admin/payments/new` → `/admin/payments#ny` | different layout | [admin.tsx:810](../../../studio/src/routes/admin.tsx#L810), [payment form:736](../../../studio/src/routes/admin.tsx#L736). Inline registration of payment received in till, not a sale modal/cart. |
| Studio switcher | Fixed studio identity only | missing | [layout.tsx:141](../../../studio/src/views/layout.tsx#L141), [identity block:187](../../../studio/src/views/layout.tsx#L187). No multi-studio selector, studio creation or switch route. |
| Complete your setup panel / items | No checklist UI | missing | Nearest analog is [Tilkoblinger:252](../../../studio/src/routes/admin-extra.tsx#L252), a read-only integration status table. First-login owner bootstrap in [auth.ts:53](../../../studio/src/lib/auth.ts#L53) is not onboarding/checklist UI. |
| Other Linework settings sub-pages/tabs found during capture | No uninspected equivalent implied | missing | Treat as missing unless mapped to a specific handler below. Source inspection must not infer UI just from database fields or API support. |
