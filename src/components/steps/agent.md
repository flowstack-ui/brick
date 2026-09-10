# Steps agent guide

## Purpose

Present ordered workflow progress while Atom owns progression, guards, current state and panel visibility.

## Use when

- A known sequence has one current workflow stage and optional next/previous or direct navigation.

## Choose something else when

- All numbered documentation instructions stay visible without state. Use List and layout composition.
- Independent related panels are selected without progression. Use Tabs.

## Required composition

- For a vertical workflow with content beside the list, compose one content/action wrapper as a sibling of List. Root wraps the two regions when constrained without duplicating the workflow tree.
- Root owns count and optional controlled step. List contains indexed Items with Indicator, Title, optional Description and Separator. Trigger is optional; never nest interactive content inside it.
- Compose NextTrigger and PrevTrigger asChild with Button for finished actions. Place action groups outside switching Content. Indicator already renders a localized number or completed check; do not add a duplicate.

## Rules

- **MUST:** Keep branching, async validation, persistence, routing and actual completion in the application. Positional completion is not successful submission.
- **MUST:** Use unique contiguous zero-based indexes below count and matching Title/Content or an explicit content name. Inactive content is retained and hidden by default.
- **MUST:** Use size xs/sm/md/lg, solid/subtle and accent/neutral recipes before token overrides. Workflow indicators are deliberately circular; static documentation marker radius belongs to its own composition.
- **MUST:** Load styles.css or core.css plus steps.css and the CSS of separately composed Buttons/layout. Steps modular CSS includes its default Checkmark presentation.
- **MUST:** Retain size-selected semantic typography: caption for xs/sm, body-sm for md, body-md for lg. Use the public size recipe before overriding instance typography tokens.

## Common mistakes

- **Avoid:** Using Steps for static instructions, duplicating its number/check or treating completion as saved state. **Instead:** Choose List for static content, use the default Indicator and keep domain outcomes application-owned.

## Validation checklist

- Verify all sizes and states, text wrapping, marker containment, vertical connector geometry, both appearances, RTL, forced colors and keyboard focus.
- Verify inherited numbering locale, controlled validation, retained panel state and no duplicated responsive tree.

## Related guidance

- `tabs`
- `list`
- `button`
- `checkmark`
- `format-number`
- `stack`
