# Changelog

All notable public changes to `@flowstack-ui/brick` are recorded here.

## Unreleased

- Completed the fourteen-step Checkbox-family owner review after correcting
  validation presentation, focus/scroll behavior, responsive layout, RTL,
  invalid scope, and the rendered-adapter circle example. Physical touch and
  VoiceOver passed; Windows forced colors was unavailable and remains optional
  device evidence separate from the reviewed automated baseline.
- Upgraded the exact Atom dependency to 0.6.17 so explicit browser validation
  scrolling remains safe in non-browser DOM implementations.
- Upgraded the exact Atom dependency to 0.6.16 so inline validation explicitly
  scrolls its visible Checkbox and CheckboxGroup focus targets into view on
  real mobile Safari.
- Upgraded the exact Atom dependency to 0.6.15 and render validation-directed
  Checkbox and CheckboxGroup focus with the standard visible focus ring after
  pointer as well as keyboard submission.
- Scoped Checkbox invalid presentation to its control and row cue, and scoped
  shared CheckboxGroup failures to one group cue without coloring every option
  as wrong. Separately invalid group Items retain an individual cue, and the
  group cue uses the same rounded terminals as an invalid Checkbox.
- Made Fieldset Error separation independent of consumer paragraph-margin
  resets.
- Aligned Fieldset Legend typography and its first-content gap with Field Label
  while retaining the larger spacing inside related-control groups.
- Upgraded the exact Atom dependency to 0.6.14 so required Checkbox and
  CheckboxGroup remain neutral while untouched, then reveal inline invalid
  state after blur or final-selection removal and clear it on correction/reset.
- Upgraded the exact Atom dependency to 0.6.13 so Form, Field, Fieldset, and
  validity-owning controls expose inherited inline/native validation
  presentation, automatic authored errors, visible first-invalid focus, and
  correction/reset clearing without Brick-owned validation behavior.

- Upgraded the exact Atom dependency to 0.6.12 so required Checkbox and
  CheckboxGroup native validation messages align with and focus their visible
  controls instead of an unrelated transparent-input location.
- Restored direct workbench routes in the production preview server so the
  release browser matrix tests the intended component pages instead of 404s.
- Upgraded the exact Atom dependency to 0.6.11 so required Checkbox and
  CheckboxGroup inputs block empty native form submission as documented.
- Removed imposed Form-wide submission and validation outlines while retaining
  state hooks and application-owned inline or Toast feedback paths.
- Separated Form, Field, and Fieldset owner-review sections and tracker results
  within the shared Form Foundation workbench and verification protocol.
- Increased Field control-to-message clearance so focus outlines do not crowd
  an immediately following Description or Error.
- Made horizontal Fields stack at phone viewport widths, including the 440px
  iPhone Pro Max viewport, before long labels become cramped.
- Stabilized the playground's choice text weight across selection and replaced
  native Fieldset margin behavior with explicit group, description, and error
  rhythm.
- Normalized native Legend flow so Fieldset spacing remains identical in LTR
  and RTL while logical error borders follow the content direction.
- Made Checkbox invalid-row markers follow logical start so they move to the
  right in RTL instead of remaining physically left-aligned.
- Restored the Form Foundation choice-row hover surface while keeping Checkbox
  invalid control borders on their semantic error color during hover.
- Completed Popover's 13-step owner verification and package gate while keeping
  Sidebar-dependent legacy Core retirement separate.
- Upgraded the exact Atom dependency to 0.6.10 so touch and pen scrolling no
  longer dismisses Popover while genuine outside taps still close it.
- Upgraded the exact Atom dependency to 0.6.9 so portalled Popover, HoverCard,
  and Tooltip content preserves the trigger's logical text direction.
- Upgraded the exact Atom dependency to 0.6.8 and adopted its measured
  floating dimensions and non-clipping Popover viewport/Arrow structure.
- Upgraded the exact Atom dependency to 0.6.7 for safe HoverCard pointer/touch
  handling and root-overflow modal scroll locking without iOS fixed-body
  browser-toolbar transitions.
- Removed disruptive same-page HoverCard test hashes in favor of genuine
  playground destination routes and disabled hit testing during exit motion.
- Added rounded and pill Tooltip shapes and corrected initial positioning,
  plain hover persistence, and side-aware Arrow seams.
- Upgraded the exact Atom dependency to 0.6.1 for immediate Tooltip dismissal
  on outside touch and scrolling after long-press release.
- Added neutral and accent AppBar tones across solid, surface, and transparent
  variants, plus geometric center alignment and documented custom-color tokens.

### Added

- Checkbox and the complete five-part CheckboxGroup family with three shared
  sizes, built-in checked/mixed artwork, structured item relationships,
  deterministic Parent selection, native forms, Field/Fieldset composition,
  responsive logical layout, public tokens, and exact Atom 0.6.0 behavior.

- Checkbox-family package, type, SSR, component, browser, visual, playground,
  React 18/19 packed-consumer, and independent Consumer evidence.

- Popover with a strict twelve-part namespace, click/press/keyboard activation,
  native semantic relationships, modal/non-modal focus behavior, three bounded
  elevated sizes, explicit Close/Arrow, and exact Atom 0.4.0 behavior.

- HoverCard with a strict frozen five-part namespace, genuine-link trigger
  guidance, three bounded elevated sizes, optional shared Arrow, and direct
  Atom 0.3.5 hover/focus, Escape, timing, portal, and collision behavior.

- Tooltip with an eight-part compound namespace, plain and rich neutral
  recipes, optional shared arrow, responsive wrapping, and direct Atom 0.3.5
  hover, focus, keyboard, touch-hold, dismissal, timing, and positioning.

- Standardized strict development and browser-test ports for the Brick
  playground, added a matching LAN command, and added watch/comprehensive test
  command aliases.
- Static CSS, token, and optional reset entrypoints.
- Package test, playground, documentation, and release-verification foundation.
- Reviewed Chromium visual baselines and a desktop/mobile Playwright release
  matrix covering Chromium, Firefox, WebKit, Pixel, and iPhone profiles.
- Button with four variants, six semantic tones, five sizes, three shapes,
  loading presentation, icons, native links, and Atom composition support.
- Card with seven compound parts, three neutral surface variants, three sizes,
  controlled semantic container and heading choices, and static server output.
- Dialog with twelve public parts, three bounded responsive sizes, scrollable
  Body, scoped portal and Branch composition, and direct Atom modal behavior.
- Four reviewed Dialog visual baselines covering light, dark, mobile RTL, and
  forced colors.
- AlertDialog with twelve public parts, two bounded responsive sizes, required
  alert-message guidance, Cancel-safe autofocus, explicit outcomes, and
  permanently blocked backdrop dismissal.
- Four AlertDialog Chromium baselines covering light, dark, mobile RTL, and
  forced colors, plus desktop/mobile interaction, nesting, and axe evidence.
- Drawer with twelve public parts, four logical edge placements, four distinct
  mobile-aware sizes including full, bounded Body scrolling, Branch
  composition, and public CSS hooks.
- A named post-Drawer Gesture Drawer / Bottom Sheet capability audit so future
  swipe, drag, and snap behavior is decided at the Atom boundary rather than
  added as an untracked Brick workaround.
- A 218-pass, 82-intentional-skip desktop/mobile release matrix and clean
  packed-package verification on React 18 and React 19 after Drawer coverage.
- Badge and NotificationBadge with passive inline recipes, deterministic
  visual count/dot formatting, logical anchor placement, automatic circle-to-
  pill geometry, server-safe Atom composition, and explicit owning-context
  accessibility guidance.
- A 258-pass, 102-intentional-skip desktop/mobile release matrix, seven
  reviewed Chromium Badge-family baselines, 100% component-source coverage,
  clean React 18/19 consumers, and independent Consumer verification.

### Fixed

- Upgraded the exact Atom dependency to 0.6.0 for CheckboxGroup stable
  ItemLabel/ItemDescription relationships, allValues Parent aggregation, and
  complete form/state composition capabilities.
- Upgraded the exact Atom dependency to 0.3.4 so modal scroll locking preserves
  stable scrollbar gutters without shifting Consumer layouts.
- Increased the default AlertDialog medium surface to keep ordinary paired
  decision labels on one row without shortening consumer copy.
- Kept AlertDialog responses reachable under extreme width and height reflow by
  falling back to bounded whole-surface scrolling when fixed regions cannot fit.
- Upgraded the exact Atom dependency to 0.3.2 so nested Dialog cleanup restores
  the application root after animated child and parent exits.
- Upgraded the exact Atom dependency to 0.3.3 so the pure Badge subpath remains
  server-safe without a Brick workaround.
- Preserved explicit RTL direction across body portals and kept RTL Dialogs
  physically centered within the viewport.
- Button full-width sizing and intrinsic reflow without requiring the optional
  reset stylesheet.
- Clarified direct `href` as the normal Button navigation path and reserved
  `asChild` for custom permissive adapters.
- Strengthened dark elevated Card hierarchy without adding a theme runtime or
  new public token.
