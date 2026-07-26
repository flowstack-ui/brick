# List adoption audit

Status: **Implemented**

Audited: July 26, 2026

## Decision rule

Use Brick List for static ordered or unordered content collections. Keep raw
list markup when another component owns navigation or collection behavior, or
when the example intentionally proves a native host without List styling.

## Implemented owners

| Owner | Decision |
| --- | --- |
| Consumer release checklist | List Root plus structured Item anatomy |
| Card `li` host evidence | List Root and composed List Item retain Card as the native `li` |
| Surface `li` host evidence | List Root and composed List Item retain Surface as the native `li` |

## Intentional raw list structures

| Owner | Reason retained |
| --- | --- |
| Stack semantic-host evidence | the route proves Stack itself rendering `ul` and authored `li` children |
| List rendered-output/composition evidence | the route must expose exact native and composed output |
| Nav List and Sidebar navigation | navigation state and disclosure belong to Nav List |
| scenario anchor navigation | application-shell navigation, not static content |
| documentation source examples | inert source text rather than runtime ownership |

Future runtime `ul`, `ol`, or `li` additions must either compose List or be
classified here with their behavioral or evidence owner.
