# Popover changelog

## Unreleased

- Completed the 13-step owner verification and package gate; legacy Core
  retirement remains separately blocked by Sidebar.
- Upgraded to Atom 0.6.10 so touch and pen scrolling keeps Popover open while
  genuine outside taps retain dismissal behavior.
- Upgraded to Atom 0.6.9 so portalled content preserves the trigger's logical
  text direction, including RTL examples.
- Upgraded to Atom 0.6.8 and moved surface scrolling to its internal viewport
  so extreme zoom keeps actions reachable without clipping the Arrow.
- Upgraded to Atom 0.6.7 so modal Popover uses root/body overflow locking
  without fixed-body repositioning or unlock-time scroll restoration on iOS
  Safari.
- Added the strict frozen twelve-part Popover namespace.
- Added click/press/keyboard-only activation, native ARIA naming, controlled
  initial/final focus, modal and non-modal modes, and exact Atom 0.4.0 behavior.
- Added one elevated recipe with bounded `sm`, `md`, and `lg` widths,
  presentational structure, explicit Close, and shared Arrow styling.
- Added SSR, component, type, browser, playground, Consumer, documentation,
  manual-protocol, and workbook evidence.
