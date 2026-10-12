# Linework capture notes · states126–163

Continuation of [01–78](CAPTURE-NOTES.md) and [79–125](CAPTURE-NOTES-SETTINGS.md), based on recorded UI snapshots in [observations.json](observations.json). Paired PNG screenshots show desktop approximately1440px and true phone390×844. Linework frequently retains desktop layout and clips at phone width. No Linework application source code was exported.

Native required:false only means no HTML required attribute, not optional business input. Exact labels and controls below preserve DOM order; visual placement comes from screenshots. Snapshot-only duplicate values and unnamed buttons are retained. Navigation/filter exploration remained read-only; no save, submission, invitation, upload, checkout or integration connection was performed. State150 is an account launcher, not an inspected artist account.


## Notifications · loaded empty state

Purpose: Shows studio notifications.

Layout and behavior: Bell overlay over calendar; screenshot provides notification text absent from DOM.

Dependencies: Current studio notification history; empty.


### 126-notifications-empty-loaded

[Desktop](screens/126-notifications-empty-loaded-desktop.png) · [Phone](screens/126-notifications-empty-loaded-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

**Screenshot-only notification text:** “Notifications” / “No notifications yet”. Accessible DOM contains underlying calendar only, so overlay semantics cannot be inferred from its snapshot.

No native field metadata recorded; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

(Notification overlay text is absent from accessible DOM. Screenshot shows “Notifications” / “No notifications yet”. Underlying calendar omitted; full snapshot is in observations.json.)

```

</details>

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Tattoo requests · sort and archive

Purpose: Sorts tattoo enquiries and separates canceled/declined outcomes.

Layout and behavior: Complementary request panel overlays calendar; Display preferences opens another dialog; Archive nests Booked/Canceled/Declined tabs.

Dependencies: Existing requests needed for populated results; trial contains none. No display preference applied.


### 127-requests-sort

[Desktop](screens/127-requests-sort-desktop.png) · [Phone](screens/127-requests-sort-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Sort choices: Time submitted, Appointment time, Estimated project cost; order: Newest first / Oldest first. Cancel → Apply. No Apply action used.

Buttons in DOM order: `button:` → `button:` → `button "By Time submitted, Newest first" [active]:` → `button:` → `button "Cancel":` → `button "Apply":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |

| 3 | not associated | — | INPUT / radio | false |

| 4 | not associated | — | INPUT / radio | false |

| 5 | not associated | — | INPUT / radio | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 128-requests-archive-canceled

[Desktop](screens/128-requests-archive-canceled-desktop.png) · [Phone](screens/128-requests-archive-canceled-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Canceled archive subtab selected; “Nothing to see here”.

Buttons in DOM order: `button:` → `button:`.

No native field metadata recorded; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 129-requests-archive-declined

[Desktop](screens/129-requests-archive-declined-desktop.png) · [Phone](screens/129-requests-archive-declined-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

Declined archive subtab selected; “Nothing to see here”.

Buttons in DOM order: `button:` → `button:`.

No native field metadata recorded; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Reports · loaded recaptures

Purpose: Summarizes revenue and expenses for day or month.

Layout and behavior: Period/date toolbar above summary rows; download controls at end.

Dependencies: Recorded rent/sales/fees/VAT; all values are zero. No download performed.


### 130-reports-loaded

[Desktop](screens/130-reports-loaded-desktop.png) · [Phone](screens/130-reports-loaded-phone.png)

Observed URL: [https://app.linework.com/manager/reports](https://app.linework.com/manager/reports)

Loaded Day report with eight zero-valued rows: Studio rent, Service sales, Product sales, Total sales, Fees, Total expenses, VAT, Net total. CSV → Sales report.

Buttons in DOM order: `button:` → `button "Monday 12. Oct 2026":` → `button:` → `button "CSV":` → `button "Sales report":`.

No native field metadata recorded; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 131-reports-month-loaded

[Desktop](screens/131-reports-month-loaded-desktop.png) · [Phone](screens/131-reports-month-loaded-phone.png)

Observed URL: [https://app.linework.com/manager/reports](https://app.linework.com/manager/reports)

Loaded Month report for October, 2026 supersedes the blank state44. Download buttons: CSV → Sales report → Month report.

Buttons in DOM order: `button:` → `button "October, 2026":` → `button:` → `button "CSV":` → `button "Sales report":` → `button "Month report":`.

No native field metadata recorded; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Clients · loaded list and filters

Purpose: Filters client deposits and form submissions.

Layout and behavior: Clients/Deposits/Forms tabs; toolbar menus above empty tables and footer totals/actions.

Dependencies: Existing clients, deposits and submitted forms; trial remains empty.


### 132-clients-loaded-empty

[Desktop](screens/132-clients-loaded-empty-desktop.png) · [Phone](screens/132-clients-loaded-empty-phone.png)

Observed URL: [https://app.linework.com/manager/clients](https://app.linework.com/manager/clients)

Stable empty client list: “No clients added yet”, Add client appears both above table and below empty state. No client detail exists to inspect.

Buttons in DOM order: `button "Add client":` → `button "Add client":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 133-clients-deposit-status

[Desktop](screens/133-clients-deposit-status-desktop.png) · [Phone](screens/133-clients-deposit-status-phone.png)

Observed URL: [https://app.linework.com/manager/clients/deposits](https://app.linework.com/manager/clients/deposits)

Deposit statuses: All statuses → Pending → Valid → Redeemed → Forfeited → Refunded. “No deposits yet”; 0 active deposits; 0,00 kr.

Buttons in DOM order: `button "All statuses":` → `button "Pending":` → `button "Valid":` → `button "Redeemed":` → `button "Forfeited":` → `button "Refunded":` → `button "Export":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 134-clients-form-status

[Desktop](screens/134-clients-form-status-desktop.png) · [Phone](screens/134-clients-form-status-phone.png)

Observed URL: [https://app.linework.com/manager/clients/releases](https://app.linework.com/manager/clients/releases)

Form statuses: All statuses → Completed → Pending. No data to display; Export disabled.

Buttons in DOM order: `button "Export" [disabled]` → `button "All statuses":` → `button "Completed":` → `button "Pending":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 135-clients-form-time

[Desktop](screens/135-clients-form-time-desktop.png) · [Phone](screens/135-clients-form-time-phone.png)

Observed URL: [https://app.linework.com/manager/clients/releases](https://app.linework.com/manager/clients/releases)

Form period options: All time → Day → Week → Month → Year → Custom.

Buttons in DOM order: `button "Export" [disabled]` → `button "All time":` → `button "Day":` → `button "Week":` → `button "Month":` → `button "Year":` → `button "Custom":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Gift Cards · loaded filters and editors

Purpose: Filters gift cards and configures validity and purchase terms.

Layout and behavior: Gift-card table and summary; source/status popup menus; store settings overlay contains validity dropdown or editable term rows.

Dependencies: Payments needed to enable store; no cards sold and no settings saved.


### 136-gift-cards-loaded

[Desktop](screens/136-gift-cards-loaded-desktop.png) · [Phone](screens/136-gift-cards-loaded-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Loaded empty gift-card list recapture. Gift card store remains offline.

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings":` → `button "Export":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


### 137-gift-cards-sources

[Desktop](screens/137-gift-cards-sources-desktop.png) · [Phone](screens/137-gift-cards-sources-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Sources: All sources → At studio → Online.

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings":` → `button "All sources":` → `button "At studio":` → `button "Online":` → `button "Export":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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
  - button "All sources":
    - generic: All sources
  - button "At studio":
    - generic: At studio
  - button "Online":
    - generic: Online
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


### 138-gift-cards-status

[Desktop](screens/138-gift-cards-status-desktop.png) · [Phone](screens/138-gift-cards-status-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Statuses: All statuses → Valid → Expired → Paid out → Redeemed.

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings":` → `button "All statuses":` → `button "Valid":` → `button "Expired":` → `button "Paid out":` → `button "Redeemed":` → `button "Export":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


### 139-gift-cards-duration-options

[Desktop](screens/139-gift-cards-duration-options-desktop.png) · [Phone](screens/139-gift-cards-duration-options-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Validity options in observed order: 6 måneder → 1 år (selected) → 2 år. Min500 / max10000 remain displayed.

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings":` → `button "Export":` → `button:` → `button "Store settings"` → `button "Gift card settings"` → `button "Terms & conditions"` → `button "Cancel"` → `button "Save settings"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / text | false |

| 3 | not associated | — | INPUT / text | false |

| 4 | not associated | — | INPUT / hidden | false |

| 5 | not associated | — | INPUT / search | false |

| 6 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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
    - option "1 år"
    - option "2 år"
- separator
- generic: Pay out expired gift cards automatically
- generic: When an unused gift card expires, automatically pay the remaining balance out to the studio. When off, the card is marked expired and you're notified so you can pay it out manually or contact the client.
- button "Cancel"
- button "Save settings"

```

</details>


### 140-gift-cards-custom-terms

[Desktop](screens/140-gift-cards-custom-terms-desktop.png) · [Phone](screens/140-gift-cards-custom-terms-phone.png)

Observed URL: [https://app.linework.com/manager/giftcards](https://app.linework.com/manager/giftcards)

Customize terms exposes three editable text rows with per-row unnamed buttons; Add term → Reset to defaults → Use default terms → Cancel → Save settings. No row added, removed, reset or saved.

Buttons in DOM order: `button "Share gift card store":` → `button "Store settings":` → `button "Export":` → `button:` → `button "Store settings"` → `button "Gift card settings"` → `button "Terms & conditions"` → `button:` → `button:` → `button:` → `button "Add term":` → `button "Reset to defaults":` → `button "Use default terms":` → `button "Cancel"` → `button "Save settings"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | TEXTAREA / not specified | false |

| 3 | not associated | — | TEXTAREA / not specified | false |

| 4 | not associated | — | TEXTAREA / not specified | false |

| 5 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


## Settlements · invoice list and filters

Purpose: Lists studio-rent invoices by date and status.

Layout and behavior: Separate Invoices page with ISSUED/TO/WITH STATUS/search toolbar, invoice table and selection/totals footer.

Dependencies: Company/payment setup needed to create invoices; no invoices exist.


### 141-settlements-all-invoices

[Desktop](screens/141-settlements-all-invoices-desktop.png) · [Phone](screens/141-settlements-all-invoices-phone.png)

Observed URL: [https://app.linework.com/manager/settlement/invoiced/all](https://app.linework.com/manager/settlement/invoiced/all)

Invoice page is a distinct route /manager/settlement/invoiced/all. Selection count and invoiced/paid totals are zero.

Buttons in DOM order: `button:` → `button "New invoice":` → `button "Select all":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 142-settlements-invoice-period

[Desktop](screens/142-settlements-invoice-period-desktop.png) · [Phone](screens/142-settlements-invoice-period-phone.png)

Observed URL: [https://app.linework.com/manager/settlement/invoiced/all](https://app.linework.com/manager/settlement/invoiced/all)

Issued-period options: Today, Yesterday, This week, Last week, This month, Last month, This year, Last year, All time. No invoices found.

Buttons in DOM order: `button:` → `button "New invoice":` → `button "Today":` → `button "Yesterday":` → `button "This week":` → `button "Last week":` → `button "This month":` → `button "Last month":` → `button "This year":` → `button "Last year":` → `button "All time":` → `button "Select all":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 143-settlements-invoice-status

[Desktop](screens/143-settlements-invoice-status-desktop.png) · [Phone](screens/143-settlements-invoice-status-phone.png)

Observed URL: [https://app.linework.com/manager/settlement/invoiced/all](https://app.linework.com/manager/settlement/invoiced/all)

Invoice statuses: All → Paid → Unpaid → Overdue → Pending → Credit Note.

Buttons in DOM order: `button:` → `button "New invoice":` → `button "All":` → `button "Paid":` → `button "Unpaid":` → `button "Overdue":` → `button "Pending":` → `button "Credit Note":` → `button "Select all":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Search | INPUT / text (default) | false |

| 2 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Sales · custom period

Purpose: Lists sales within a custom date range.

Layout and behavior: Custom period/date toolbar; calendar date-range popup above usual sale filters/table.

Dependencies: Recorded sales and selected range; only viewing controls used.


### 144-sales-custom-period

[Desktop](screens/144-sales-custom-period-desktop.png) · [Phone](screens/144-sales-custom-period-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Custom sales mode selected with October 12th, 2026 date control; state145 exposes the range picker.

Buttons in DOM order: `button "October 12th, 2026":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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


### 145-sales-custom-date-picker

[Desktop](screens/145-sales-custom-date-picker-desktop.png) · [Phone](screens/145-sales-custom-date-picker-phone.png)

Observed URL: [https://app.linework.com/manager/sales](https://app.linework.com/manager/sales)

Date-range calendar grid visible; captured disabled dates and selected state are retained exactly below. “No sales recorded for this time period”.

Buttons in DOM order: `button "October 12th, 2026" [active]:` → `button:` → `button:`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
- generic: No sales recorded for this time period

```

</details>


## Artists · fixed-rent options

Purpose: Configures the interval, invoice day, VAT and due date for artist rent.

Layout and behavior: Invite artist dialog over empty artist list; one combobox expanded per state.

Dependencies: An artist invitation would establish the arrangement; none sent. Defaults are observations, not approved terms.


### 146-artists-rent-interval-options

[Desktop](screens/146-artists-rent-interval-options-desktop.png) · [Phone](screens/146-artists-rent-interval-options-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Invoicing interval options: Weekly → Monthly (selected).

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

| 12 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
    - option "Monthly"
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


### 147-artists-rent-options-1

[Desktop](screens/147-artists-rent-options-1-desktop.png) · [Phone](screens/147-artists-rent-options-1-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Invoice day-of-month list exposes 1 through31;1 selected.

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

| 12 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
    - option "1"
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


### 148-artists-rent-options-2

[Desktop](screens/148-artists-rent-options-2-desktop.png) · [Phone](screens/148-artists-rent-options-2-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Rent VAT options:0% →12% →15% →25% (selected). This differs in order from product VAT menu.

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

| 12 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
    - option "25%"
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


### 149-artists-rent-options-3

[Desktop](screens/149-artists-rent-options-3-desktop.png) · [Phone](screens/149-artists-rent-options-3-phone.png)

Observed URL: [https://app.linework.com/manager/artists/](https://app.linework.com/manager/artists/)

Payment due options:7 days →14 days (selected) →30 days.

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

| 12 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
    - option "14 days"
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


## Account dashboard launcher

Purpose: Lists accessible artist/studio accounts for launching.

Layout and behavior: Account-level welcome page with separate artist and studio cards, Launch buttons and New Studio Account.

Dependencies: Current user account memberships. This is the launcher only; the Test artist account was not opened or inspected.


### 150-account-dashboard

[Desktop](screens/150-account-dashboard-desktop.png) · [Phone](screens/150-account-dashboard-phone.png)

Observed URL: [https://app.linework.com/dashboard](https://app.linework.com/dashboard)

Welcome back, Ibrahim. Test / Artist account and Infinity test / Myrveien17B Ski / Primary-owner each have Launch. **No Test artist account dashboard, booking, settings or payouts were inspected.** New Studio Account visible but not used.

Buttons in DOM order: `button:` → `button "Learning center":` → `button "Launch"` → `button "Launch"` → `button "New Studio Account":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Services · custom categories and preset editors

Purpose: Edits category descriptions and inspects preset service constraints.

Layout and behavior: Service list with category dialogs and full Edit service overlay; section navigation exposes general settings, pricing, duration and online requests.

Dependencies: Industry-tailored presets lock some fields; active artists required for artist-specific requests. No category or service saved.


### 151-settings-service-custom-category

[Desktop](screens/151-settings-service-custom-category-desktop.png) · [Phone](screens/151-settings-service-custom-category-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Custom-category dialog has bilingual names and description; Cancel → Add category. No category added.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button:` → `button "Add a custom category" [active]:` → `button "Cancel":` → `button:` → `button "🇺🇸 English"` → `button "🇳🇴 Norwegian"` → `button:` → `button:` → `button:` → `button:` → `button:` → `button:` → `button:` → `button "Cancel":` → `button "Add category":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter english service name | INPUT / text | false |

| 2 | not associated | Enter norwegian service name | INPUT / text | false |

| 3 | not associated | — | INPUT / text | false |

| 4 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 152-settings-service-edit-category

[Desktop](screens/152-settings-service-edit-category-desktop.png) · [Phone](screens/152-settings-service-edit-category-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Preset Tattoo category states “This category is preset by LINEWORK”; category name displayed, bilingual description editable. Cancel → Save changes; neither persisted.

Buttons in DOM order: `button "Add category":` → `button "Edit category" [active]:` → `button "Add service":` → `button:` → `button:` → `button:` → `button "🇺🇸 English"` → `button "🇳🇴 Norwegian"` → `button:` → `button:` → `button:` → `button:` → `button:` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / text | false |

| 2 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 153-settings-service-tattoo-edit

[Desktop](screens/153-settings-service-tattoo-edit-desktop.png) · [Phone](screens/153-settings-service-tattoo-edit-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

**Unsuccessful edit attempt:** snapshot shows only services list; the text click did not open an editor. State155 is the successful Tattoo preset editor.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 154-settings-consultation-preset

[Desktop](screens/154-settings-consultation-preset-desktop.png) · [Phone](screens/154-settings-consultation-preset-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Consultation preset editor: category and names Consultation/Konsultasjon disabled. Description and tips control visible; preset warns some features cannot be changed.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button [active]:` → `button "Cancel":` → `button "Save changes":` → `button "🇺🇸 English"` → `button "🇳🇴 Norwegian"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / hidden | false |

| 2 | not associated | — | INPUT / search | false |

| 3 | not associated | Enter english service name | INPUT / text | false |

| 4 | not associated | Enter norwegian service name | INPUT / text | false |

| 5 | not associated | — | TEXTAREA / not specified | false |

| 6 | not associated | — | INPUT / checkbox | false |

| 7 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 155-settings-tattoo-preset

[Desktop](screens/155-settings-tattoo-preset-desktop.png) · [Phone](screens/155-settings-tattoo-preset-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Tattoo preset editor: category/name Tattoo/Tatovering disabled; description Appointments scheduled on request; tips checked. No Service images navigation item in this preset.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button [active]:` → `button:` → `button "Cancel":` → `button "Save changes":` → `button "🇺🇸 English"` → `button "🇳🇴 Norwegian"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / hidden | false |

| 2 | not associated | — | INPUT / search | false |

| 3 | not associated | Enter english service name | INPUT / text | false |

| 4 | not associated | Enter norwegian service name | INPUT / text | false |

| 5 | not associated | — | TEXTAREA / not specified | false |

| 6 | not associated | — | INPUT / checkbox | false |

| 7 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 156-settings-tattoo-0

[Desktop](screens/156-settings-tattoo-0-desktop.png) · [Phone](screens/156-settings-tattoo-0-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Tattoo pricing is variable; Fixed pricing and Free of charge explicitly not supported for preset. Use hourly pricing rates checked/disabled. VAT0; inclusive VAT checked; empty hourly-provider-rate table.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / hidden | false |

| 2 | not associated | — | INPUT / search | false |

| 3 | not associated | — | INPUT / checkbox | false |

| 4 | not associated | — | INPUT / checkbox | false |

| 5 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 157-settings-tattoo-1

[Desktop](screens/157-settings-tattoo-1-desktop.png) · [Phone](screens/157-settings-tattoo-1-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Tattoo duration variable; Fixed duration not supported. Minimum duration1 hour:0 Minutes.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":` → `button "1 hour":` → `button "0 Minutes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 158-settings-tattoo-2

[Desktop](screens/158-settings-tattoo-2-desktop.png) · [Phone](screens/158-settings-tattoo-2-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Tattoo Online booking contains artist-specific and open request settings, no active artists, Open Requests OFF, and the same size/color/skin/budget/reference-field editors seen in states80–86. No requests enabled or settings saved.

Buttons in DOM order: `button "Add category":` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button "Cancel":` → `button "Save changes":` → `button "Manage artists":` → `button "OFF":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Online booking · lower request settings recapture

Purpose: Documents the lower tattoo-request fields and mandatory questions.

Layout and behavior: Tattoo requests tab with stacked customizable fields and explanatory copy below.

Dependencies: Open Requests remain OFF; no active artists; no setting changed.


### 159-settings-requests-lower

[Desktop](screens/159-settings-requests-lower-desktop.png) · [Phone](screens/159-settings-requests-lower-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Lower settings recapture preserves mandatory questions: Is it a cover up?, Body location of tattoo, Tattoo description, Availability and other details. Customize options are unchanged; no requests enabled.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "OFF":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Instructions · loaded empty landing

Purpose: Lists instructions shared before and after appointments.

Layout and behavior: Separate before/after sections with Add Instructions actions and counters.

Dependencies: No created or enabled instructions; confirms earlier template exploration stayed unsaved.


### 160-settings-instructions-loaded

[Desktop](screens/160-settings-instructions-loaded-desktop.png) · [Phone](screens/160-settings-instructions-loaded-phone.png)

Observed URL: [https://app.linework.com/manager/settings/instruction](https://app.linework.com/manager/settings/instruction)

Loaded Instructions landing:0/8 Created and0/8 Enabled, No Instructions Added Yet under both before and after sections. Earlier editor/template selections did not persist instructions.

Buttons in DOM order: `button "Add Instructions":` → `button "Add Instructions":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


## Subscription invoices · filters and billing email

Purpose: Filters subscription invoices and inspects the invoice-recipient editor.

Layout and behavior: Invoices tab with type/product menus; Change opens billing-email dialog.

Dependencies: Billing account and invoice history; list is empty and no email saved.


### 161-settings-invoice-type-filter

[Desktop](screens/161-settings-invoice-type-filter-desktop.png) · [Phone](screens/161-settings-invoice-type-filter-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Invoice type options:All types → Subscription → SMS. No invoices match the current filter.

Buttons in DOM order: `button "All types":` → `button "Subscription":` → `button "SMS":` → `button "Change"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 162-settings-invoice-products-filter

[Desktop](screens/162-settings-invoice-products-filter-desktop.png) · [Phone](screens/162-settings-invoice-products-filter-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Product filter exposes only All products in this capture. Do not invent additional product options.

Buttons in DOM order: `button "All products":` → `button "Change"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.


### 163-settings-billing-email

[Desktop](screens/163-settings-billing-email-desktop.png) · [Phone](screens/163-settings-billing-email-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Change billing email dialog explains invoices/receipts/payment reminders are sent to this address. Email textbox displayed; Save disabled. Draft-only inspection, no recipient change persisted.

Buttons in DOM order: `button "Change" [active]` → `button:` → `button "Save" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / email | false |

| 2 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has same accessible labels/controls; use screenshot for actual narrow-width geometry.
