# Linework capture notes · states 79–125

Continuation of [states 01–78](CAPTURE-NOTES.md), generated from the captured browser DOM in [observations.json](observations.json). These are observations, not exported Linework source code. No private application source or backend implementation was exported.

**Widths and layout:** desktop screenshots are approximately 1440 px. Phone screenshots are actual 390×844 captures. The app often retains desktop geometry and clips horizontally at this width, as verified in state 99; a phone image does not establish a responsive redesign. Screenshots remain the visual authority, and exact accessible labels/field metadata are transcribed below.

**Read-only boundary:** Save changes, Save, Done, Update URL, integration/payment connection, deletion, paid seat/plan actions and uploads were not used to persist data. Preview 109 was blocked by “Form is not valid”; state 113 is a loading attempt superseded by 114. Notifications 125 are screenshot-derived because accessible DOM lacks overlay text.

**Field metadata:** Native required:false means the HTML required attribute was absent, not that the business field is optional. Missing associated labels are reported explicitly; visible neighboring labels and placeholders remain in the exact DOM block. Types missing from INPUT default to text. Closed option menus do not prove their undisplayed options. Button order follows DOM reading order, not necessarily physical alignment. Shared global/settings navigation is transcribed in [the earlier appendix](CAPTURE-NOTES.md).


## Services · Add category

Purpose: Adds a preset or custom service category.

Layout and behavior: Dialog over services list with category choices and a custom-category action.

Dependencies: Available categories and existing services; nothing was added.


### 79-settings-service-category

[Desktop](screens/79-settings-service-category-desktop.png) · [Phone](screens/79-settings-service-category-phone.png)

Observed URL: [https://app.linework.com/manager/settings/services](https://app.linework.com/manager/settings/services)

Preset categories visible: Tattoo, Piercing, Tattoo removal, Medical piercing. Add a custom category and Cancel follow; no category creation performed.

Buttons in DOM order: `button "Add category" [active]:` → `button "Edit category":` → `button "Add service":` → `button:` → `button:` → `button:` → `button "Add a custom category":` → `button "Cancel":`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Online booking · Tattoo requests

Purpose: Controls open and artist-specific tattoo requests and the questions clients answer.

Layout and behavior: Settings secondary navigation plus main tablist; each Edit opens a focused dialog over the unchanged settings page.

Dependencies: Active artists needed for artist-specific requests; open requests currently OFF. Mandatory cover-up/body-location/description/availability questions remain fixed.


### 80-settings-online-requests

[Desktop](screens/80-settings-online-requests-desktop.png) · [Phone](screens/80-settings-online-requests-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Not accepting requests / OFF; no active artists. Tattoo size, color, skin-tone, budget and reference-image settings appear in that order.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "OFF":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 81-settings-online-request-editor-0

[Desktop](screens/81-settings-online-request-editor-0-desktop.png) · [Phone](screens/81-settings-online-request-editor-0-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Booking terms choices: No booking terms (checked), Link to terms on my own website, Write my terms here. Dialog copy says “direct bookings” although opened from Tattoo requests; preserve exactly.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit" [active]:` → `button "OFF":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |

| 3 | not associated | — | INPUT / radio | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 82-settings-online-request-editor-1

[Desktop](screens/82-settings-online-request-editor-1-desktop.png) · [Phone](screens/82-settings-online-request-editor-1-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Tattoo-size options include Tiny/Small/Medium/Medium +/Large, Half Sleeve, Three-fourths sleeve, Full arm sleeve, Full back piece, Full chest piece, Full body suit; Width x Height is always available by explanatory copy.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "OFF":` → `button "Manage artists":` → `button "Edit" [active]:` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |

| 2 | not associated | — | INPUT / checkbox | false |

| 3 | not associated | — | INPUT / checkbox | false |

| 4 | not associated | — | INPUT / checkbox | false |

| 5 | not associated | — | INPUT / checkbox | false |

| 6 | not associated | — | INPUT / checkbox | false |

| 7 | not associated | — | INPUT / checkbox | false |

| 8 | not associated | — | INPUT / checkbox | false |

| 9 | not associated | — | INPUT / checkbox | false |

| 10 | not associated | — | INPUT / checkbox | false |

| 11 | not associated | — | INPUT / checkbox | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 83-settings-online-request-editor-2

[Desktop](screens/83-settings-online-request-editor-2-desktop.png) · [Phone](screens/83-settings-online-request-editor-2-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Color options: Color, Black & Gray, Both (checked).

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "OFF":` → `button "Manage artists":` → `button "Edit":` → `button "Edit" [active]:` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |

| 3 | not associated | — | INPUT / radio | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 84-settings-online-request-editor-3

[Desktop](screens/84-settings-online-request-editor-3-desktop.png) · [Phone](screens/84-settings-online-request-editor-3-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Skin-tone choices: Ask for skin tone / Don't ask for skin tone (checked). Optional client values are Pale, Olive, Tan, Dark.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "OFF":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit" [active]:` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 85-settings-online-request-editor-4

[Desktop](screens/85-settings-online-request-editor-4-desktop.png) · [Phone](screens/85-settings-online-request-editor-4-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Budget choices: Ask client for their budget / Don't ask client for their budget (checked).

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "OFF":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit" [active]:` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 86-settings-online-request-editor-5

[Desktop](screens/86-settings-online-request-editor-5-desktop.png) · [Phone](screens/86-settings-online-request-editor-5-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Reference-image choices: required / optional (checked) / don't ask.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "OFF":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit" [active]:` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |

| 3 | not associated | — | INPUT / radio | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Online booking · Direct booking and Booking page

Purpose: Configures direct-booking eligibility, timing, deposits and the public booking page.

Layout and behavior: Tattoo requests/Direct booking/Booking page tabs with stacked settings rows; URL, tracking and timing editors open dialogs.

Dependencies: Fixed-duration services and enabled service providers required for direct booking; Skins owns logo visibility; Meta pixel requires privacy-policy details.


### 87-settings-direct-booking

[Desktop](screens/87-settings-direct-booking-desktop.png) · [Phone](screens/87-settings-direct-booking-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

No service providers enabled for direct booking. Visible defaults: no deposit, maximum 90 Days, minimum 3 Days before start, gap 30 Minutes.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "Services":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 88-settings-booking-page

[Desktop](screens/88-settings-booking-page-desktop.png) · [Phone](screens/88-settings-booking-page-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Open Skins":` → `button "Add pixel":`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
    - tab "Tattoo requests":
      - generic: Tattoo requests
    - tab "Direct booking":
      - generic: Direct booking
    - tooltip "Control what people see on your booking page.": Control what people see on your booking page.
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

[Desktop](screens/89-settings-booking-meta-pixel-desktop.png) · [Phone](screens/89-settings-booking-meta-pixel-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Meta pixel ID, privacy policy URL and responsibility acknowledgement appear. No tracking was added or enabled.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Open Skins":` → `button "Add pixel" [active]:` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | 123456789012345 | INPUT / text (default) | false |

| 2 | not associated | https:// | INPUT / text (default) | false |

| 3 | not associated | — | INPUT / checkbox | false |


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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


### 90-settings-booking-link

[Desktop](screens/90-settings-booking-link-desktop.png) · [Phone](screens/90-settings-booking-link-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

URL slug is infinity-test; allowed characters/numbers/hyphen and maximum 30 characters. Update URL disabled.

Buttons in DOM order: `button "Edit link" [active]:` → `button "View":` → `button "Copy link":` → `button "Open Skins":` → `button "Add pixel":` → `button:` → `button "Update URL" [disabled]:`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / string | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 91-settings-direct-editor-1

[Desktop](screens/91-settings-direct-editor-1-desktop.png) · [Phone](screens/91-settings-direct-editor-1-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Reference-image choices: required / optional (checked) / don't ask.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "Services":` → `button "Manage artists":` → `button "Edit" [active]:` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |

| 3 | not associated | — | INPUT / radio | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 92-settings-direct-editor-2

[Desktop](screens/92-settings-direct-editor-2-desktop.png) · [Phone](screens/92-settings-direct-editor-2-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Note-to-artist choices: required / optional (checked) / don't ask.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "Services":` → `button "Manage artists":` → `button "Edit":` → `button "Edit" [active]:` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |

| 3 | not associated | — | INPUT / radio | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 93-settings-direct-editor-3

[Desktop](screens/93-settings-direct-editor-3-desktop.png) · [Phone](screens/93-settings-direct-editor-3-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Deposit dialog describes confirmation without upfront payment; no deposit requirement was toggled.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "Services":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit" [active]:` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 94-settings-direct-editor-4

[Desktop](screens/94-settings-direct-editor-4-desktop.png) · [Phone](screens/94-settings-direct-editor-4-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Maximum lead-time choices: Set in days / Set in months; current number 90. Cancel → Done. No Done click performed.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "Services":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit" [active]:` → `button "Edit":` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Done":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |

| 3 | not associated | — | INPUT / number | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 95-settings-direct-editor-5

[Desktop](screens/95-settings-direct-editor-5-desktop.png) · [Phone](screens/95-settings-direct-editor-5-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Minimum lead-time choices: Set in days / Set in hours; current number 3. Cancel → Done. No Done click performed.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "Services":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit" [active]:` → `button "Edit":` → `button:` → `button "Cancel":` → `button "Done":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / radio | false |

| 2 | not associated | — | INPUT / radio | false |

| 3 | not associated | — | INPUT / number | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 96-settings-direct-editor-6

[Desktop](screens/96-settings-direct-editor-6-desktop.png) · [Phone](screens/96-settings-direct-editor-6-phone.png)

Observed URL: [https://app.linework.com/manager/settings/booking](https://app.linework.com/manager/settings/booking)

Gap selector displays 30 Minutes; explanatory copy says availability plus gap determines suggested slots.

Buttons in DOM order: `button "Edit link":` → `button "View":` → `button "Copy link":` → `button "Edit":` → `button "Services":` → `button "Manage artists":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit":` → `button "Edit" [active]:` → `button:` → `button "30 Minutes":` → `button "Cancel":` → `button "Save changes":`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Forms and digital consent

Purpose: Creates bilingual forms for clients to fill out and digitally sign.

Layout and behavior: Forms landing counts and New form; disclaimer precedes large Create form editor, with persistent Preview form/Close/Save changes header, section navigation and main editor.

Dependencies: Up to 10 created forms; valid required titles/content needed for preview; active language settings determine translation work. No form saved.


### 97-settings-forms

[Desktop](screens/97-settings-forms-desktop.png) · [Phone](screens/97-settings-forms-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Buttons in DOM order: `button "New form":`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

- generic: Forms
  - generic: Create forms for clients to fill out and sign digitally.
  - generic: 0/10 Created
  - generic: 0 Enabled
  - button "New form":
    - text: New form

```

</details>

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 98-settings-form-new

[Desktop](screens/98-settings-form-new-desktop.png) · [Phone](screens/98-settings-form-new-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Disclaimer offers I understand → Close editor. This is a legal-template introduction, not a saved form.

Buttons in DOM order: `button "New form" [active]:` → `button "I understand"` → `button "Close editor"`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 99-settings-form-editor

[Desktop](screens/99-settings-form-editor-desktop.png) · [Phone](screens/99-settings-form-editor-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

General settings explicitly labels “Form title for internal use (required)”. Native required:false metadata must not be interpreted as optional. Languages, address, staff completion/review/signature, completing roles and logo settings are visible. **Phone screenshot is truly 390×844; Linework retains the desktop layout and clips horizontally rather than reflowing the editor.**

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":` → `button "Delete":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Form title | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / checkbox | false |

| 3 | not associated | — | INPUT / checkbox | false |

| 4 | not associated | — | INPUT / checkbox | false |

| 5 | not associated | — | INPUT / string | false |

| 6 | not associated | — | INPUT / string | false |

| 7 | not associated | — | INPUT / string | false |

| 8 | not associated | — | INPUT / string | false |

| 9 | not associated | — | INPUT / string | false |

| 10 | not associated | — | INPUT / checkbox | false |

| 11 | not associated | — | INPUT / checkbox | false |

| 12 | not associated | — | INPUT / checkbox | false |

| 13 | not associated | — | INPUT / radio | false |

| 14 | not associated | — | INPUT / radio | false |

| 15 | not associated | — | INPUT / radio | false |

| 16 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 100-settings-form-introduction

[Desktop](screens/100-settings-form-introduction-desktop.png) · [Phone](screens/100-settings-form-introduction-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Introduction cannot be disabled. Norwegian/English language buttons, client-visible form title and introduction text are editable.

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":` → `button "🇳🇴 Norwegian"` → `button "🇺🇸 English"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Title | INPUT / string | false |

| 2 | not associated | Introduction text | INPUT / string | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 101-settings-form-personal-details

[Desktop](screens/101-settings-form-personal-details-desktop.png) · [Phone](screens/101-settings-form-personal-details-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Personal details cannot be disabled; Full name is always enabled. DOB/phone/email, prefill and profile-update options appear.

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |

| 2 | not associated | — | INPUT / checkbox | false |

| 3 | not associated | — | INPUT / checkbox | false |

| 4 | not associated | — | INPUT / checkbox | false |

| 5 | not associated | — | INPUT / checkbox | false |

| 6 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 102-settings-form-identification

[Desktop](screens/102-settings-form-identification-desktop.png) · [Phone](screens/102-settings-form-identification-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Identification options: Drivers licence, Passport, National identification card, Payment card with photo, Military ID, State identification card, MitID, Birth certificate.

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |

| 2 | not associated | — | INPUT / checkbox | false |

| 3 | not associated | — | INPUT / checkbox | false |

| 4 | not associated | — | INPUT / checkbox | false |

| 5 | not associated | — | INPUT / checkbox | false |

| 6 | not associated | — | INPUT / checkbox | false |

| 7 | not associated | — | INPUT / checkbox | false |

| 8 | not associated | — | INPUT / checkbox | false |

| 9 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 103-settings-form-home-address

[Desktop](screens/103-settings-form-home-address-desktop.png) · [Phone](screens/103-settings-form-home-address-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 104-settings-form-procedure-information

[Desktop](screens/104-settings-form-procedure-information-desktop.png) · [Phone](screens/104-settings-form-procedure-information-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Procedure information includes provider/date/location and bilingual rich text about risks. Template text is captured as UI evidence, not legal or medical validation.

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":` → `button "🇳🇴 Norwegian"` → `button "🇺🇸 English"` → `button:` → `button:` → `button:` → `button:` → `button:` → `button:` → `button:`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |

| 2 | not associated | — | INPUT / checkbox | false |

| 3 | not associated | — | INPUT / checkbox | false |

| 4 | not associated | — | INPUT / checkbox | false |

| 5 | not associated | — | INPUT / text | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 105-settings-form-procedure-description

[Desktop](screens/105-settings-form-procedure-description-desktop.png) · [Phone](screens/105-settings-form-procedure-description-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 106-settings-form-medical-questionnaire

[Desktop](screens/106-settings-form-medical-questionnaire-desktop.png) · [Phone](screens/106-settings-form-medical-questionnaire-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Medical-questionnaire editor exposes Ask/Don't ask per question, allergy and medical-condition sections, and custom-question actions. No question changed or added.

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Add custom allergy":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Ask":` → `button "Don't ask":` → `button "Add custom medical condition":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 107-settings-form-required-consents

[Desktop](screens/107-settings-form-required-consents-desktop.png) · [Phone](screens/107-settings-form-required-consents-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Required-consent statements are editable bilingual text; exact Norwegian template copy is retained below. No consent template was saved.

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":` → `button "Add checkbox":` → `button "🇳🇴 Norwegian"` → `button "🇺🇸 English"` → `button "Jeg er den personen som har presentert ID som bevis for at jeg er minst 18 år gammel.":` → `button "Jeg er ikke under påvirkning av alkohol eller stoffer og at jeg selv vil sende meg inn for å få kroppsmaleri uten press eller kraftoverføring.":` → `button "Jeg er klar over at informasjonen jeg har gitt i medisinsk undersøkelse er fullstendig og sann på beste kunnskap.":` → `button "Jeg samtykker til å følge alle instruksjoner om helsestilling og oppsyn med kroppsmaleri, og at eventuelle tilbakekall av kroppsmaleri på grunn av min egen uaktsomhet vil bli gjort til min egen kostnad.":` → `button "Jeg har blitt fullstendig informert om risikoene forbundet med kroppsmaleri, inkludert men ikke begrenset til infeksjon, skjering, vanskeligheter med å oppdage melanom, og allergiske reaksjoner til kroppsmaleri pigment, latexgummigenser og antibiotika. Etter å ha blitt informert om potensielle risikoer forbundet med en kroppsmaleri prosedyre, ønsker jeg å fortsette med kroppsmaleri prosedyren og jeg antar alle og alle risikoer som kan oppstå fra kroppsmaleri.":` → `button "Jeg er klar over at jeg har fått tilstrekkelig mulighet til å lese og forstå dette dokumentet, og at det ikke ble presentert til meg sist. Jeg forstår at jeg er undertegnat en juridisk kontrakt som gir opp visse rettigheter til å reklamasjon for skader mot Artist eller Tattoo Studio.":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |

| 2 | not associated | — | INPUT / checkbox | false |

| 3 | not associated | — | TEXTAREA / not specified | false |

| 4 | not associated | — | INPUT / checkbox | false |

| 5 | not associated | — | TEXTAREA / not specified | false |

| 6 | not associated | — | INPUT / checkbox | false |

| 7 | not associated | — | TEXTAREA / not specified | false |

| 8 | not associated | — | INPUT / checkbox | false |

| 9 | not associated | — | TEXTAREA / not specified | false |

| 10 | not associated | — | INPUT / checkbox | false |

| 11 | not associated | — | TEXTAREA / not specified | false |

| 12 | not associated | — | INPUT / checkbox | false |

| 13 | not associated | — | TEXTAREA / not specified | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 108-settings-form-client-signature

[Desktop](screens/108-settings-form-client-signature-desktop.png) · [Phone](screens/108-settings-form-client-signature-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

Buttons in DOM order: `button "New form":` → `button "Preview form":` → `button "Close":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 109-settings-form-preview

[Desktop](screens/109-settings-form-preview-desktop.png) · [Phone](screens/109-settings-form-preview-phone.png)

Observed URL: [https://app.linework.com/manager/settings/forms](https://app.linework.com/manager/settings/forms)

**Preview blocked:** “Form is not valid” appears after Preview form. This is a validation-error state, not a successfully rendered client preview. No missing content was entered just to bypass validation.

Buttons in DOM order: `button "New form":` → `button "Preview form" [active]:` → `button "Close":` → `button "Save changes":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / checkbox | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Instructions

Purpose: Creates content to share before or after appointments.

Layout and behavior: Landing separates before/after instructions; Add Instructions opens template chooser then message/settings dialog. Add content opens a larger iframe-based Unlayer content editor.

Dependencies: Up to eight created/enabled instructions; content and SMS/email details plus sharing timing. No instruction saved.


### 110-settings-instructions

[Desktop](screens/110-settings-instructions-desktop.png) · [Phone](screens/110-settings-instructions-phone.png)

Observed URL: [https://app.linework.com/manager/settings/instruction](https://app.linework.com/manager/settings/instruction)

Early instructions landing snapshot contains counts only; later states 111–115 expose its loaded before/after sections.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

- generic: Instructions
  - generic: Create and manage instructions to share with clients before or after appointments.
  - generic: 0/8 Created
  - generic: 0/8 Enabled

```

</details>


<details><summary>Exact phone DOM (differs from desktop)</summary>


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


### 111-settings-instructions-before

[Desktop](screens/111-settings-instructions-before-desktop.png) · [Phone](screens/111-settings-instructions-before-phone.png)

Observed URL: [https://app.linework.com/manager/settings/instruction](https://app.linework.com/manager/settings/instruction)

Buttons in DOM order: `button "Add Instructions" [active]:` → `button "Add Instructions":` → `button:`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 112-settings-instructions-editor

[Desktop](screens/112-settings-instructions-editor-desktop.png) · [Phone](screens/112-settings-instructions-editor-phone.png)

Observed URL: [https://app.linework.com/manager/settings/instruction](https://app.linework.com/manager/settings/instruction)

Buttons in DOM order: `button "Add Instructions":` → `button "Add Instructions":` → `button:` → `button "Add content":` → `button "Cancel":` → `button "Save":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter a descriptive name | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / hidden | false |

| 3 | not associated | — | INPUT / search | false |

| 4 | not associated | Enter message | TEXTAREA / not specified | false |

| 5 | not associated | Enter email subject | INPUT / text (default) | false |


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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 113-settings-instructions-content

[Desktop](screens/113-settings-instructions-content-desktop.png) · [Phone](screens/113-settings-instructions-content-phone.png)

Observed URL: [https://app.linework.com/manager/settings/instruction](https://app.linework.com/manager/settings/instruction)

**Loading/incomplete content-editor attempt.** This snapshot still contains only the instruction settings dialog. State 114 supersedes it with the loaded editor.

Buttons in DOM order: `button "Add Instructions":` → `button "Add Instructions":` → `button:` → `button "Add content" [active]:` → `button "Cancel":` → `button "Save":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter a descriptive name | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / hidden | false |

| 3 | not associated | — | INPUT / search | false |

| 4 | not associated | Enter message | TEXTAREA / not specified | false |

| 5 | not associated | Enter email subject | INPUT / text (default) | false |


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
  - button "Cancel" [disabled]
  - button "Save changes" [disabled]
- iframe

```

</details>


### 114-settings-instructions-content-loaded

[Desktop](screens/114-settings-instructions-content-loaded-desktop.png) · [Phone](screens/114-settings-instructions-content-loaded-phone.png)

Observed URL: [https://app.linework.com/manager/settings/instruction](https://app.linework.com/manager/settings/instruction)

Loaded Unlayer editor: Desktop/Preview toolbar; Content/Blocks/Body; Columns, Button, Divider, Heading, Paragraph, Image, Social, Menu, HTML; blank canvas “No content here. Drag content from right.” Nothing inserted or saved.

Buttons in DOM order: `button "Add Instructions":` → `button "Add Instructions":` → `button:` → `button "Add content" [active]:` → `button "Cancel":` → `button "Save":` → `button "Cancel"` → `button "Save changes"` → `button "Desktop":` → `button "Preview":` → `button "Content":` → `button "Blocks":` → `button "Body":` → `button "Columns":` → `button "Button":` → `button "Divider":` → `button "Heading":` → `button "Paragraph":` → `button "Image":` → `button "Social":` → `button "Menu":` → `button "HTML":` → `button "Hide":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter a descriptive name | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / hidden | false |

| 3 | not associated | — | INPUT / search | false |

| 4 | not associated | Enter message | TEXTAREA / not specified | false |

| 5 | not associated | Enter email subject | INPUT / text (default) | false |


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
  - button "Show":
  - status

```

</details>


### 115-settings-instructions-aftercare-template

[Desktop](screens/115-settings-instructions-aftercare-template-desktop.png) · [Phone](screens/115-settings-instructions-aftercare-template-phone.png)

Observed URL: [https://app.linework.com/manager/settings/instruction](https://app.linework.com/manager/settings/instruction)

Unsaved Tattoo aftercare template selected, After appointments timing; SMS text and title prefilled. Selecting a template exposed the editor only; no instruction was created.

Buttons in DOM order: `button "Add Instructions":` → `button "Add Instructions":` → `button:` → `button "Edit content":` → `button "Cancel":` → `button "Save":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | Enter a descriptive name | INPUT / text (default) | false |

| 2 | not associated | — | INPUT / hidden | false |

| 3 | not associated | — | INPUT / search | false |

| 4 | not associated | Enter message | TEXTAREA / not specified | false |

| 5 | not associated | Enter email subject | INPUT / text (default) | false |

| 6 | not associated | Enter a title for clients to see | INPUT / text (default) | false |


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


<details><summary>Exact phone DOM (differs from desktop)</summary>


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
- tooltip "Set what you want the subject line to say when sharing instructions by email. The content will be displayed in the email itself.": Set what you want the subject line to say when sharing instructions by email. The content will be displayed in the email itself.
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


## Cash Register

Purpose: Configures studio cash-register features.

Layout and behavior: Settings main content contains prerequisite message and Payment methods action.

Dependencies: Cash register is not enabled; requires payments setup.


### 116-settings-cash-register

[Desktop](screens/116-settings-cash-register-desktop.png) · [Phone](screens/116-settings-cash-register-phone.png)

Observed URL: [https://app.linework.com/manager/settings/cashregister](https://app.linework.com/manager/settings/cashregister)

“Cash register not enabled”; payment setup required.

Buttons in DOM order: `button "Payment methods":`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

- generic: Cash register
  - generic: Manage settings for your cash register.
  - generic: Cash register not enabled
  - generic: "Get started with payments to enable your cash register:"
  - button "Payment methods":
    - generic: Payment methods

```

</details>

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Integrations

Purpose: Connects accounting tools and maps export ledger accounts.

Layout and behavior: Fiken integration information/action followed by grouped GBAT10 numeric account/VAT fields and Save settings.

Dependencies: Fiken service and external pricing; accounting export mappings. No integration started and no values saved.


### 117-settings-integrations

[Desktop](screens/117-settings-integrations-desktop.png) · [Phone](screens/117-settings-integrations-phone.png)

Observed URL: [https://app.linework.com/manager/settings/integrations](https://app.linework.com/manager/settings/integrations)

Numeric defaults: service account 3000, product account 3100, fees 6940, bank 1920, service VAT code 3, product VAT code 3, voucher type 1. Save settings not used.

Buttons in DOM order: `button "Start integration":` → `button "Save settings":`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / number | false |

| 2 | not associated | — | INPUT / number | false |

| 3 | not associated | — | INPUT / number | false |

| 4 | not associated | — | INPUT / number | false |

| 5 | not associated | — | INPUT / number | false |

| 6 | not associated | — | INPUT / number | false |

| 7 | not associated | — | INPUT / number | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Client support

Purpose: Sets the contact information included in client emails.

Layout and behavior: Contact Information section with telephone/country and email fields, then Save changes.

Dependencies: Client email templates use this information. No values changed.


### 118-settings-client-support

[Desktop](screens/118-settings-client-support-desktop.png) · [Phone](screens/118-settings-client-support-phone.png)

Observed URL: [https://app.linework.com/manager/settings/clientsupport](https://app.linework.com/manager/settings/clientsupport)

Buttons in DOM order: `button "Save changes"`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | +47 917 45 834 | INPUT / tel | false |

| 2 | not associated | — | INPUT / string | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Subscription & Billing

Purpose: Shows subscription, invoices, payment method, discounts and extra seats.

Layout and behavior: Subscriptions/Invoices tabs; subscription summary and price breakdown; billing frequency, discount and seat editors open overlays.

Dependencies: Trial subscription and manager-seat billing; no plan change, redemption, card update, cancellation or seat purchase performed.


### 119-settings-subscription

[Desktop](screens/119-settings-subscription-desktop.png) · [Phone](screens/119-settings-subscription-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Observed trial: Studio Plan, Monthly, 790.00 NOK + VAT 197.50 NOK = 987.50 NOK; trial/end billing date 19/10/2026. Snapshot values may change; no billing mutation performed.

Buttons in DOM order: `button "Update Card"` → `button "Change plan"` → `button "Add discount code"` → `button "Cancel Trial"` → `button "Adjust"`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 120-settings-subscription-invoices

[Desktop](screens/120-settings-subscription-invoices-desktop.png) · [Phone](screens/120-settings-subscription-invoices-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Invoice filters display All types/All products; “No invoices match the current filter.” Change recipient control is visible but not used.

Buttons in DOM order: `button "Change"`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 121-settings-plan-options

[Desktop](screens/121-settings-plan-options-desktop.png) · [Phone](screens/121-settings-plan-options-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Change plan opens Change Billing Frequency, with Monthly/Yearly and disabled Save; no price-plan catalog is evidenced.

Buttons in DOM order: `button "Update Card"` → `button "Change plan" [active]` → `button "Add discount code"` → `button "Cancel Trial"` → `button "Adjust"` → `button:` → `button "Monthly"` → `button "Yearly"` → `button "Save" [disabled]`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 122-settings-discount

[Desktop](screens/122-settings-discount-desktop.png) · [Phone](screens/122-settings-discount-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Discount code textbox placeholder SUMMER25; Cancel → Verify (disabled). No verification or redemption performed.

Buttons in DOM order: `button "Update Card"` → `button "Change plan"` → `button "Add discount code" [active]` → `button "Cancel Trial"` → `button "Adjust"` → `button:` → `button "Cancel"` → `button "Verify" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | SUMMER25 | INPUT / text | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


### 123-settings-seats

[Desktop](screens/123-settings-seats-desktop.png) · [Phone](screens/123-settings-seats-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Adjust Seats shows Extra Manager Seats 0; minus disabled, plus, Next disabled. No seat count changed.

Buttons in DOM order: `button "Update Card"` → `button "Change plan"` → `button "Add discount code"` → `button "Cancel Trial"` → `button "Adjust" [active]` → `button:` → `button "-" [disabled]` → `button "+"` → `button "Next" [disabled]`.


Native fields (recorded order):


| # | Associated HTML label | Placeholder | Element / input type | Native required |

| --- | --- | --- | --- | --- |

| 1 | not associated | — | INPUT / number | false |


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Studio switcher

Purpose: Shows accessible studios and account navigation.

Layout and behavior: Account/studio overlay retains underlying subscription page; account identity above Studio management and studio card, footer Go to Dashboard/Log out.

Dependencies: User memberships; only Infinity test is visible. No logout or studio creation performed.


### 124-studio-switcher

[Desktop](screens/124-studio-switcher-desktop.png) · [Phone](screens/124-studio-switcher-phone.png)

Observed URL: [https://app.linework.com/manager/settings/subscription](https://app.linework.com/manager/settings/subscription)

Studio management lists Infinity test / Myrveien 17B Ski; Go to Dashboard and Log out are footer labels.

Buttons in DOM order: `button "Infinity test":`.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

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

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Notifications

Purpose: Shows the studio notification inbox.

Layout and behavior: Bell overlay over the calendar; screenshot text is authoritative because notification content is absent from DOM snapshot.

Dependencies: Notifications for current studio; inbox is empty.


### 125-notifications

[Desktop](screens/125-notifications-desktop.png) · [Phone](screens/125-notifications-phone.png)

Observed URL: [https://app.linework.com/manager/calendar](https://app.linework.com/manager/calendar)

**Screenshot-derived labels:** “Notifications” and “No notifications yet”. These are visible in the screenshot but absent from the recorded accessible DOM. The DOM block below shows only the underlying calendar; it must not be interpreted as the notification inbox structure.

No native field metadata recorded for this state; accessible controls and neighboring labels follow.


<details><summary>Exact desktop labels, tabs, fields, options and empty-state copy</summary>


```yaml

(Notifications overlay exposes no text in the captured DOM. Screenshot shows “Notifications” / “No notifications yet”; underlying calendar omitted here. Full raw snapshot is in observations.json.)

```

</details>

Phone DOM has the same accessible labels/controls; screenshot shows the actual clipped or reflowed geometry.


## Coverage boundary

This appendix stops at state 125. Later observations belong in a subsequent appendix or the main README. Form preview, complete payment/company onboarding, existing artist detail and populated invoice/client/booking states remain outside the evidence unless separately captured.
