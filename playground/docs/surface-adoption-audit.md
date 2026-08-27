# Surface adoption audit

Status: **Implemented**

Audited: July 25, 2026

Scope: every registered component route, shared playground evidence, and shell
CSS under `playground/src`.

## Decision rule

Use Brick Surface when one complete generic wrapper owns a neutral background,
optional border/elevation/radius, and inset. Surface owns only that paint.
Container continues to own measure; Stack and Grid continue to own layout.

Retain local CSS when it:

- belongs to the component under test;
- visualizes layout geometry, placement, overflow, or a diagnostic boundary;
- creates a portal/positioning containing block;
- simulates a device or constrained viewport;
- is part of playground navigation state;
- is native/output evidence that must not gain an extra wrapper; or
- belongs to a specialized component such as Code Block, Divider, Sidebar, or
  Nav List.

## Implemented repeated migration set

The following complete generic owners now use Surface while their existing
Stack/Grid arrangement remains unchanged:

| Owner | Surface responsibility | Layout retained by |
| --- | --- | --- |
| overview panel | raised level, border/radius, inset | existing Stack or authored content |
| specimen-grid shell | border/radius and separator stage | existing Grid |
| specimen cell | raised level and inset | existing Stack/cell layout |
| appearance scope | canvas/raised level, border and inset | local appearance scope and portal container |
| customization shell | border/radius and inset | existing Grid/article composition |
| customization preview | raised level, border/radius and inset | existing centering layout |
| stress panel | canvas/raised level, border/radius and inset | existing responsive/RTL layout |

Do not set paint on the Grid or Stack root after migration. When that root owns
layout, wrap it in Surface or place the layout root inside a semantic Surface.

## Route audit

`Migrate` lists complete generic Surface roles. `Retain` lists paint with a
different owner.

| Route | Migrate | Retain |
| --- | --- | --- |
| Button | `.button-overview`, specimen-grid shell/cells, appearance grid/panels, customization shell/preview, stress panel, width/form demo outer panels | Button recipes; full-width and native-form geometry; code block |
| Icon Button | `.icon-button-hero`, specimen-grid shell/cells, appearance grid, customization shell/preview, stress panel | Icon Button recipes; image/SVG diagnostic sizing; code block |
| Icon | overview, specimen cells, appearance scopes, customization shell/preview, and stress evidence | Icon recipe and SVG-source geometry; rendered-output fixture; code block |
| Image | overview, specimen cells, appearance scopes, and customization shell | Image frame/fallback paint, fit/focal geometry, exact output, and media constraints |
| Aspect Ratio | overview, appearance scopes, and customization shell | Aspect Ratio frame recipes, ratio geometry, clipping diagnostics, and semantic child evidence |
| App Bar | overview, specimen-grid shell/cells, appearance panels, customization shell/preview, stress panel, generic surface stage | App Bar roots; position containing block; position markers; phone frame; code block |
| Text | overview, grid shell/cells, appearance scopes, customization shell/preview, stress panel | typography constraint/overflow evidence; native ref target; code block |
| Stack | overview, grid shell/cells, appearance scopes, customization shell/preview, stress panel | demo items, wrapping/containment constraints, Stack geometry; code block |
| Group | overview, comparison cells, appearance scopes, customization shell, and stress panels | Group attachment geometry, shared control borders, and focus-state evidence |
| Grid | frame shells and customization shell where wrapping does not alter the grid being measured | grid cells, tracks, spans, placement markers, narrow/vertical geometry, code block |
| Container | generic appearance/customization stage only when Container remains the measured child | measure boundaries, dashed width guides, nesting, full-bleed, vertical-writing geometry |
| Section | contained paint examples where Surface remains the visual owner | page-region rhythm, semantic region choice, logical start/end spacing, and wrapper-free Surface composition |
| Frame | generic evidence surfaces around bounded content | logical size constraints, definite-parent percentage sizing, nested-variable isolation, and Scroll Area bounds |
| Surface | none of the recipe specimens; they intentionally isolate Surface against raw contrasting stages | all Surface recipe stages, inset marker, nesting and elevation contrast; code block |
| ZStack | overview, placement, composition, and stress evidence stages | ZStack overlap and placement geometry; the stage layer being positioned; source-order evidence |
| Appearance | overview, nested-scope, portal-action, and semantic-host evidence surfaces | Appearance boundaries themselves; explicit semantic-token scope and wrapper-free host composition |
| Divider | overview, appearance, customization, and generic specimen cells | Divider line recipes, measured inset/axis stages, and forced-color evidence |
| Scroll Area | generic specimen cells, appearance scopes, and customization shell | Scroll Area viewport boundaries, axis constraints, native scrollbar paint, and code sample |
| Code | generic overview/cell/appearance/customization stages | Code recipes, inline wrapping, native output, and technical literal paint |
| Code Block | generic outer evidence cells and appearance stages | Code Block recipes, technical surface paint, overflow, selection, and source anatomy |
| List | overview, specimen cells, appearance scopes, customization shell, and stress panel | List markers, dividers, borders, anatomy, nesting, and exact output |
| Data List | overview, comparison cells, appearance scopes, customization shell, and stress panels | Data List label/value semantics, orientation, dividers, and logical label-measure evidence |
| Table | overview, comparison cells, appearance scopes, customization shell, and stress explanation | Table boundaries, section paint, sticky/overflow geometry, and rendered native output |
| Data Grid | overview, comparison cells, appearance scopes, customization shell, and stress explanation | Data Grid boundaries, active/selection state paint, cell navigation geometry, and explicit overflow containment |
| Tree Grid | overview, comparison cells, appearance scopes, customization shell, and stress explanation | Tree Grid boundaries, hierarchy and active/selection state paint, cell geometry, rounded clipping, and explicit overflow containment |
| Tree | overview, comparison cells, appearance scopes, customization shell, and stress panels | Tree root/row boundaries, hierarchy guides, state paint, indentation, and focus geometry |
| Feed | overview, comparison cells, appearance scopes, customization shell, dynamic-state stage, and stress panels | Feed article surfaces, dividers, focus geometry, rounded outlines, and responsive/RTL stream layout |
| Swipeable Item | overview, comparison cells, appearance scopes, customization shell, controlled-state stage, and stress panels | Swipeable Item moving surface, action-panel paint, reveal geometry, shared rounded clipping, and responsive/RTL layout |
| Toolbar | overview, comparison cells, and appearance scopes | Toolbar surfaces, control states, separators, orientation, and overflow geometry |
| Chip | overview, comparison cells, appearance scopes, and customization shell | Chip recipes, authored value content, removal state, containment, and boundary examples |
| Pagination | overview, comparison cells, appearance scopes, customization shell, and stress panels | Pagination root/control recipes, current and disabled state paint, and inline overflow geometry |
| Reorderable List | overview, variant and size cells, appearance scopes, customization shell, and stress panels | Reorderable List item recipes, drag target paint, drop indicators, orientation, and movement geometry |
| Carousel | slide content and dark appearance scope | Carousel viewport, controls, picker state, snap geometry, and overflow behavior |
| Link | overview, specimen-grid cells, appearance scopes, customization shell/preview, stress panel | Link recipes, inline wrapping, composition output, and code block |
| Link Box | overview, comparison cells, and stress stages | Link Box target geometry, whole-region hover/focus paint, independent-action layering, and the Card surfaces used as its content |
| Nav List | overview, specimen cells, appearance scopes, customization shell, and stress panel | Nav List rows, current-state recipes, disclosure anatomy, and composition output |
| Sidebar | route evidence stages and customization shell | Sidebar Panel paint, state geometry, and desktop shell ownership |
| Breadcrumb | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, and stress panel | Breadcrumb trail recipes, wrapping, separators, current-page semantics, collapse composition, and exact output |
| Tabs | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Tabs list/trigger/content/indicator recipes, semantic orientation, overflow, and exact composition output |
| Card | overview stage, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Card roots and their variant backgrounds; code block |
| Skeleton | overview, comparison cells, appearance scopes, customization shell, and stress panels | Skeleton shape, motion, dimensions, line geometry, and loading-content paint |
| Dialog | overview/action/stress outer panels, specimen-grid shell/cells, appearance scopes, customization shell/preview | Dialog and overlay roots; static branch reconstruction; portal/positioning stages; code block |
| Alert Dialog | overview/action/stress outer panels, specimen-grid shell/cells, appearance scopes, customization shell/preview | Alert Dialog and overlay roots; decision/action evidence; portal stages; code block |
| Drawer | overview/action/stress outer panels, specimen-grid shell/cells, appearance scopes, customization shell/preview | Drawer and overlay roots; static branch reconstruction; edge/positioning stages; code block |
| Badge | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Badge recipes and inline-flow geometry; code block |
| Status | overview, comparison cells, appearance scopes, customization shell, and stress panels | Status indicator/label recipes, passive semantics, tones, and exact output |
| Notification Badge | overview/semantics/stress panels, specimen-grid shell/cells, appearance scopes, customization shell/preview | Notification Badge anchor, overlap, placement, and owning-control paint; code block |
| Avatar | overview/control/image-state/stress outer panels, specimen-grid shell/cells, appearance scopes, customization shell/preview | Avatar image/fallback/status paint and media crop diagnostics; code block |
| Toggle | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Toggle recipes and selected-state customization; code block |
| Toggle Group | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Toggle Group recipes, attachment geometry, and selected-state customization; code block |
| Segment Group | overview, size/layout cells, appearance scopes, customization shell/preview, and stress panel | Segment Group root/item/indicator recipes, measured selection geometry, and radio-state evidence; code block |
| Tooltip | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Tooltip content/arrow roots and portal positioning; code block |
| Hover Card | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Hover Card content/arrow roots, genuine-link preview positioning, document/profile internals; code block |
| Popover | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Popover content/arrow roots, anchor marker and positioning, Input/Field anatomy; code block |
| Input | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | Input control recipes, adornment positioning, validation and underline diagnostics; code block |
| Number Input | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | Number Input control/stepper recipes, numeric constraints, validation, native form evidence, and rendered relationship diagnostics; code block |
| OTP Field | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | OTP Field cell/group/separator recipes, segmented entry geometry, validation, native form evidence, and rendered relationship diagnostics; code block |
| Password Toggle Field | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | Password Toggle Field control/toggle recipes, visibility state, validation, native form evidence, and rendered relationship diagnostics; code block |
| Form | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | native submission/validation output, Form/Field anatomy and status readouts; code block |
| Field | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | relationship/attribute readouts, native control evidence and Field anatomy; code block |
| Fieldset | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | legend/control relationships, disabled/validation anatomy and attribute readouts; code block |
| Checkbox | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | Checkbox control/state paint and native form evidence; code block |
| Checkbox Group | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | group aggregation, parent state, Fieldset relationships and attribute readouts; code block |
| Radio Group | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | radio control/state paint, roving-focus evidence, Fieldset relationships, native form output, and composition output; code block |
| Switch | shared forms overview/grid/cells, appearance scopes, customization shell/preview, stress panel | Switch track/thumb/state paint, Field relationships, native form output, and composition output; code block |
| Select | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Select trigger/content/item recipes, portal positioning, option scrolling, native form evidence, and composition output; code block |
| Combobox | overview, comparison cells, appearance scopes, customization shell, and stress panel | Combobox control/content/item recipes, portal positioning, filtering, narrow and RTL geometry, and rendered output |
| Multi Select | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Multi Select trigger/content/item recipes, portal positioning, multiple-option scrolling, repeated-value native form evidence, and composition output; code block |
| Textarea | overview, specimen-grid shell/cells, appearance scopes, customization shell/preview, stress panel | Textarea control recipes, native resize geometry, auto-resize measurement, form output, and rendered relationship evidence; code block |
| Dropdown Menu | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Dropdown Menu trigger and popup recipes, portal positioning, nested command surfaces, and exact composition output |
| Context Menu | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Context Menu target geometry, pointer positioning, popup and submenu recipes, and exact composition output |
| Menubar | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Menubar root, trigger, popup and submenu recipes, explicit overflow geometry, and exact composition output |
| Navigation Menu | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Navigation Menu controls, active indicator, measured Viewport, rich Content, mobile replacement, and exact composition output |
| Bottom Navigation | overview, comparison cells, appearance scopes, customization shell, and stress panels | Bottom Navigation surface, item states, active icon indicator, safe-area geometry, Notification Badge composition, and exact output |
| Visually Hidden | overview, comparison cells, appearance scopes, and stress panels | Atom-owned inline hiding behavior, native-host composition, and exact rendered output |
| Skip Link | overview, comparison cells, appearance scopes, customization shell, and stress panels | Skip Link focus overlay, target semantics, sticky-layer geometry, and exact rendered output |
| Show | overview, breakpoint cells, semantic-host evidence, composition stage, mounted-state stage, and stress cards | Show responsive display behavior and authored descendant display values |
| Hide | overview, breakpoint cells, semantic-host evidence, composition stage, mounted-state stage, and stress cards | Hide responsive display behavior and authored descendant display values |
| Progress | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Progress track, buffer, indicator, orientation geometry, and exact rendered output |
| Progress Circle | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Progress Circle SVG track/indicator, ring geometry, centered value, and exact rendered output |
| Slider | overview, comparison cells, appearance scopes, customization shell, and stress panels | Slider track/range/thumb/marker/value-label paint, axis geometry, and exact rendered output |
| Rating | overview, comparison cells, appearance scopes, customization shell, and stress panels | Rating item/artwork paint, proportional fill, pointer-target geometry, and exact rendered output |
| File Upload | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | File Upload dropzone, trigger, file-item, drag/validation state, and narrow/RTL geometry |
| Toast | generic overview, queue, position, keyboard, and appearance stages | Toast card/viewport recipes, fixed placement, overlap, and narrow-screen diagnostic frame |
| Collapsible | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Collapsible trigger/content recipes, measured orientation geometry, disclosure state, and exact rendered output |
| Accordion | overview, comparison cells, appearance scopes, customization shell/preview, and stress panels | Accordion item/trigger/content recipes, measured orientation geometry, disclosure relationships, and exact rendered output |

## Shared and shell audit

### Already migrated

- `RenderedOutput` uses Surface for its complete outer boundary and Grid for
  preview/output arrangement.
- The packed Consumer uses Surface for the workspace region.

### Retain

- `RenderedOutput` preview cannot gain an inner Surface wrapper because its
  first child is the exact DOM node captured as rendered HTML.
- `RenderedOutput` and route source specimens now compose Code Block; their
  technical surface paint, overflow, and source semantics remain Code Block-owned.
- `.evidence-review-header`, sidebar, navigation links, and scenario
  navigation are application shell or future Sidebar/Nav List ownership.
- scenario target borders are navigation state.
- phone frames and viewport constraints are technical evidence.
- raw diagnostic borders used to expose Grid, Stack, Container, or Surface
  geometry remain local.

## Non-Surface cleanup findings

These are not Surface migrations but should be corrected in the same staged
playground pass:

1. Popover CSS retains a historical raw-input paint rule followed by a
   neutralizing override. Remove the stale rule and keep Brick Input as owner.
2. Raw reference/demo controls should use Brick Button or Icon Button unless
   the route explicitly proves native output.
3. Repeated technical source displays use Code Block and are not disguised as
   Surface.
4. Repeated separator backgrounds between Grid cells may later use Divider,
   but Surface should own the outer boundary now.

## Implemented migration order

1. Shared `EvidenceSurface` owns the identical repeated cell/panel contract.
2. The forms family consumes that shared owner through `FormEvidence`.
3. Button and Icon Button use it as the reference action pages.
4. Text, Badge, Notification Badge, Avatar, Toggle, and Toggle Group use it for
   generic evidence.
5. Card and overlay pages use it without changing portals or positioning.
6. Stack, Grid, Container, Surface, and App Bar retain their classified
   diagnostic exceptions.
7. One late-loaded adoption stylesheet removes effective paint from Grid/Stack
   layout shells and lets Surface variables win over legacy page selectors.

## Completion gate

The migration is complete only when:

- every `Migrate` owner renders Brick Surface or is a layout-only shell whose
  effective paint is explicitly removed by the adoption stylesheet;
- migrated classes contain layout/technical CSS only;
- retained paint is represented in this audit;
- the Surface ownership verifier covers every migrated shared owner;
- all behavior, accessibility, visual, Consumer, and package gates pass; and
- representative desktop and mobile screenshots are visually reviewed.
