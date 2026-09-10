# Focus presentation

Atom and the browser own keyboard modality, focus movement, active descendants
and semantics. Brick makes that state visible without changing layout.

## Actions

Button and IconButton accept `focusRing="outside" | "inside"`. Omission
preserves outside: canonical 2px outline and 4px gap. Use inside for an
intentional edge-to-edge action in a clipping region:

```tsx
<Button focusRing="inside" fullWidth>Open project</Button>
```

CloseButton inherits the IconButton option; DownloadTrigger forwards it through
Button presentation. Supported native hosts and composition preserve the option.
It is a scalar presentation choice, not a focus/blur or keyboard-mode setting.
There is no `none` recipe. Do not hide focus to repair alignment.

Inside uses the canonical width with a negative-width offset and the action's
paired foreground. This avoids an accent ring disappearing on a solid accent
fill. Theme text/fill contrast promises also protect this foreground; local
overrides must preserve focus contrast as well as readable content. Forced
colors uses system outline paint rather than relying only on shadows.

## Compound components

Tabs paints the shared semantic focus color inside Triggers and focusable
Content, independently of label tone. Soft List has no
protective focus padding; solid retains ordinary design inset. CodeBlock's
flush collapse action also paints inside. Generic Collapsible retains its
standalone treatment. ScrollArea owns viewport scrolling and its own focus;
it does not silently pad or restyle arbitrary descendants.

Normal layout spacing belongs to Stack/Grid and surface inset. Built-in
component clipping defects belong to Brick, not application overrides.
Raising z-index can resolve sibling overlap but cannot escape ancestor clipping.

## Specialized focus

Fields may draw focus on their shared wrapper. Menus, trees and grids may
display Atom's active or highlighted part while DOM focus stays elsewhere.
Checkboxes, switches and sliders may paint on a control or pseudo-element.
Do not replace these with a generic outline on every descendant or add tabindex
to passive content. Selection and focus must remain distinguishable.

## Qualification

Verify first and last items, selected/pressed fills, scrolling and rounded
clipping, light/dark scopes, RTL, actual keyboard traversal and forced colors.
Keep focus visible without layout shift. A computed outline or axe pass alone
does not establish visible focus. A 2px inset is not an automatic WCAG Focus
Appearance AAA claim; area and state-change contrast require separate checks.
