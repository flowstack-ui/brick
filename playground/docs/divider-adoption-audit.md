# Divider adoption audit

Status: **Implemented**

Audited: July 25, 2026

Divider replaces a line only when separation itself is the authored concept.
The playground currently contains no raw `hr` or static `role="separator"`
outside Divider's own route. Existing borders were classified as follows.

## Migrated owners

- The packed Consumer uses semantic Divider between workspace heading/tools
  and its project results.
- The Divider route uses Divider for every separator recipe and composition.

## Retained borders

- Surface, Card, App Bar, overlays, controls, badges, and fields retain their
  complete component-owned edges.
- specimen/evidence panel perimeters remain Surface ownership;
- Grid/Container/Surface measurement guides remain diagnostic;
- focus, invalid, selected, loading, and status boundaries remain state cues;
- scenario target markers, sidebar edges, sticky navigation, and drawer chrome
  remain application-shell state;
- code blocks and phone/viewport frames remain technical presentation pending
  their planned owners.

No retained border is a standalone content separator. Future migrations must
classify meaning before replacing CSS and must preserve DOM, layout, focus,
portal, and responsive behavior.
