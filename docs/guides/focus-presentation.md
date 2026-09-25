# Focus presentation

Atom and the browser own keyboard modality, focus movement, active descendants
and semantics. Brick makes that state visible without changing layout.

## Reset fallback

The optional `reset.css` styles otherwise unstyled `:focus-visible` targets
with the semantic focus color, width and offset. Token-free usage falls back
to a 2px system Highlight outline with a 4px offset. Forced colors uses
Highlight. The reset declares the shared cascade ordering and sits below
component styles regardless of whether reset or core CSS is imported first.

This is a fallback, not a replacement for component-owned focus on wrappers,
tracks or active descendants. Those owners must suppress a host outline only
when they supply their own visible indicator. Never globally remove outlines.
Application-owned section targets receive the fallback; scrolling does not
move their keyboard focus. Applications choose which element their IDs target.

## Action recipes

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
