# Code Block

Code Block presents structured multi-line source with native scrolling,
explicit language metadata, and truthful Atom-backed copy behavior.

## When and where to use

Use it for examples, configuration, commands, generated markup, and other
preserved multi-line technical content that may overflow its container.

## When not to use

Do not use it for inline literals, Markdown rendering, editable source,
terminal output, executable sandboxes, or accidental layout overflow.

## Installation and imports

```tsx
import { CodeBlock } from "@flowstack-ui/brick/code-block";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/code-block.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

`CodeBlock` and every direct part are also available from the package root.

## Quick start

```tsx
<CodeBlock.Root value={source} language="tsx">
  <CodeBlock.Header>
    <CodeBlock.Title>Button example</CodeBlock.Title>
    <CodeBlock.Language />
    <CodeBlock.Actions>
      <CodeBlock.CopyTrigger>Copy</CodeBlock.CopyTrigger>
    </CodeBlock.Actions>
  </CodeBlock.Header>
  <CodeBlock.Content aria-label="Button example source" />
</CodeBlock.Root>
```

## Anatomy and DOM ownership

Root owns Atom Clipboard state and the outer `div`. Header groups optional
Title, Language, and Actions. Content owns the one focusable Scroll Area
viewport and renders canonical `pre > code` markup. Line optionally carries
authored visual metadata. CollapsePreview, CollapseContent, and CollapseTrigger
compose Brick Collapsible around bounded and full Content views without adding
a second state model.
CopyTrigger is an Atom
Clipboard Trigger rendered through Brick Button. CopyIndicator and CopyStatus
expose authored progress and live-result wording. Optional parts render only
when authored.

## API

| Part or prop                               | Values                                                | Default         |
| ------------------------------------------ | ----------------------------------------------------- | --------------- |
| `Root.value`                               | copied plain-text source                              | required        |
| `variant`                                  | `subtle`, `bordered`, `plain`                         | `subtle`        |
| `size`                                     | `sm`, `md`                                            | `md`            |
| `Root.language`                            | explicit string                                       | none            |
| `wrap`                                     | `scroll`, `wrap`                                      | `scroll`        |
| `focusable`                                | `boolean`                                             | `true`          |
| `Content.maxLines`                         | positive whole number                                 | unbounded       |
| `Root.adapter`                             | synchronous trusted-node adapter                      | none            |
| `Line.lineNumber`                          | positive whole number                                 | none            |
| `Line.highlighted`, `Line.focused`         | `boolean`                                             | `false`         |
| `Line.change`                              | `added`, `removed`                                    | none            |
| `CollapseTrigger.closedLabel`, `openLabel` | state-specific React nodes                            | static children |
| Clipboard behavior                         | `disabled`, `timeout`, `writeValue`, `onStatusChange` | Atom defaults   |

Public parts are `Root`, `Header`, `Title`, `Language`, `Actions`, `Content`,
`Line`, `Collapse`, `CollapsePreview`, `CollapseContent`, `CollapseTrigger`,
`CopyTrigger`, `CopyIndicator`, and
`CopyStatus`. Direct exports are
`CodeBlockRoot`, `CodeBlockHeader`, `CodeBlockTitle`, `CodeBlockLanguage`,
`CodeBlockActions`, `CodeBlockContent`, `CodeBlockLine`, `CodeBlockCollapse`,
`CodeBlockCollapsePreview`, `CodeBlockCollapseContent`,
`CodeBlockCollapseTrigger`, `CodeBlockCopyTrigger`,
`CodeBlockCopyIndicator`, and `CodeBlockCopyStatus`. Their prop types are
`CodeBlockRootProps`, `CodeBlockHeaderProps`, `CodeBlockTitleProps`,
`CodeBlockLanguageProps`, `CodeBlockActionsProps`, `CodeBlockContentProps`,
`CodeBlockLineProps`, `CodeBlockCollapseProps`,
`CodeBlockCollapsePreviewProps`, `CodeBlockCollapseContentProps`,
`CodeBlockCollapseTriggerProps`,
`CodeBlockCopyTriggerProps`, `CodeBlockCopyIndicatorProps`, and
`CodeBlockCopyStatusProps`. Type exports also include `CodeBlockAdapter`,
`CodeBlockAdapterContext`, `CodeBlockLineChange`, `CodeBlockVariant`,
`CodeBlockSize`, and `CodeBlockWrap`.

## Visual recipes and states

`subtle` supplies a quiet filled surface, `bordered` a transparent bordered
surface, and `plain` removes surrounding paint. Size changes only component
rhythm and technical typography. Atom supplies `idle`, `copying`, `copied`,
and `error` copy states; the trigger is disabled when the clipboard contract
is disabled. Scroll and wrap differ only in long-line handling. Line metadata
can combine highlighting or focus with an added/removed state. Bounded Content
scrolls independently. An expandable composition swaps its bounded preview for
real Collapsible Content, so only one source view is exposed at a time.

## Tokens and CSS hooks

Hooks include `.brick-code-block` and its part classes, Atom `data-state`, plus
`data-slot`, `data-language`, `data-size`, `data-variant`, `data-wrap`,
`data-max-lines`, `data-line-number`, `data-highlighted`, `data-focused`, and
`data-change`.
Public variables are `--brick-code-block-background`,
`--brick-code-block-foreground`, `--brick-code-block-border-color`,
`--brick-code-block-border-width`, `--brick-code-block-radius`,
`--brick-code-block-header-padding`, `--brick-code-block-content-padding`,
`--brick-code-block-content-padding-block`,
`--brick-code-block-content-padding-inline`, `--brick-code-block-gap`,
`--brick-code-block-font-family`,
`--brick-code-block-font-size`, `--brick-code-block-font-weight`,
`--brick-code-block-line-height`, `--brick-code-block-letter-spacing`,
`--brick-code-block-selection-background`,
`--brick-code-block-selection-foreground`, and
`--brick-code-block-max-block-size`. Line variables are
`--brick-code-block-line-number-foreground`,
`--brick-code-block-line-number-width`,
`--brick-code-block-line-highlight-background`,
`--brick-code-block-line-focus-background`,
`--brick-code-block-line-added-background`,
`--brick-code-block-line-added-border`,
`--brick-code-block-line-removed-background`, and
`--brick-code-block-line-removed-border`.

The two Code Block selection variables default to Brick's shared opaque
selection pair. Override both together when a syntax surface needs a distinct
selection palette; never replace only the foreground or background.

## Customization

```tsx
<CodeBlock.Root
  value={source}
  style={{ "--brick-code-block-border-color": "rebeccapurple" }}
>
  <CodeBlock.Content aria-label="Customized source" />
</CodeBlock.Root>
```

Language highlighting is consumer-owned. Pass trusted highlighted React nodes
to Content, or provide a synchronous adapter that receives Root's exact
`value` and `language`. Keep Root `value` as the matching plain text. Explicit
Content children override the adapter. Unsafe HTML is not accepted and Brick
does not bundle or load a tokenizer. Keep the adapter pure; Root evaluates it
lazily at most once per source/language/adapter identity and reuses its result
across views. Explicit children do not invoke it.

## Responsive behavior

The root fills available inline space but owns no external dimensions or
breakpoints. `scroll` preserves long lines in the horizontal viewport; `wrap`
reflows them. `maxLines` bounds the same named viewport and remains vertically
scrollable when used alone. CollapsePreview deliberately clips that bounded
view because CollapseContent provides the full source through its native
disclosure lifecycle. Scrollable source normalizes mobile browser text adjustment so
short and long examples retain the selected Code Block size. Code defaults to
LTR inside an RTL page while Header follows page direction.

For expandable source, the preview establishes the opening height floor while
Collapsible Content grows to its measured full height. This avoids a transient
collapse-to-zero frame. Author `closedLabel` and `openLabel` when the control
must change from an expansion action to a collapse action.

## Accessibility

Give focusable Content a specific `aria-label` or `aria-labelledby`; it is the
only scroll-region keyboard stop. CopyTrigger retains focus. Author concise
CopyStatus text for copying, success, and failure so Atom can announce truthful
results. When initially clipping bounded source, pair CollapsePreview and
CollapseContent with CollapseTrigger so the full source has a keyboard and
screen-reader path. The real Collapsible Content owns `aria-controls`, labeling,
mounting, and hidden state. Do not add
`role="application"`.

## Composition, native props, and refs

Root forwards Atom Clipboard props and its `HTMLDivElement` ref. Structural
parts forward their native attributes and refs. Content's ref targets the
native Scroll Area viewport. Root `value` is authoritative for copying even
when Content receives highlighted nodes. The component composes Brick Code,
Scroll Area, Button, and optional Collapsible; consumers do not need to
recreate those internals.

## Examples

### Copy feedback

```tsx
<CodeBlock.CopyStatus>
  <CodeBlock.CopyIndicator when="copying">Copying…</CodeBlock.CopyIndicator>
  <CodeBlock.CopyIndicator when="copied">Copied</CodeBlock.CopyIndicator>
  <CodeBlock.CopyIndicator when="error">Copy failed</CodeBlock.CopyIndicator>
</CodeBlock.CopyStatus>
```

### Wrapped content

```tsx
<CodeBlock.Root value={longLine} language="text">
  <CodeBlock.Content wrap="wrap" aria-label="Wrapped example" />
</CodeBlock.Root>
```

### Trusted adapter and line metadata

```tsx
const adapter: CodeBlockAdapter = ({ value }) =>
  value.split("\n").map((line, index) => (
    <CodeBlock.Line
      key={index}
      lineNumber={index + 1}
      highlighted={index === 2}
      change={index === 4 ? "added" : undefined}
    >
      {line}
    </CodeBlock.Line>
  ));

<CodeBlock.Root adapter={adapter} value={source} language="tsx">
  <CodeBlock.Content aria-label="Adapted TypeScript source" />
</CodeBlock.Root>;
```

### Bounded source with expansion

```tsx
<CodeBlock.Collapse>
  <CodeBlock.Root value={source}>
    <CodeBlock.CollapsePreview>
      <CodeBlock.Content
        aria-label="Configuration source preview"
        maxLines={8}
      />
    </CodeBlock.CollapsePreview>
    <CodeBlock.CollapseContent>
      <CodeBlock.Content aria-label="Full configuration source" />
    </CodeBlock.CollapseContent>
    <CodeBlock.CollapseTrigger
      closedLabel="Show full source"
      openLabel="Hide full source"
    >
      Show full source
    </CodeBlock.CollapseTrigger>
  </CodeBlock.Root>
</CodeBlock.Collapse>
```

## Evidence

- [Playground route source](../../../playground/src/components/code-block/)
- [Focused component tests](../../../test/components/code-block/)
- [Type tests](../../../test/types/components/code-block.test.ts)
- [Browser behavior](../../../playground/tests/components/code-block/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/code-block/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/code-block.md)

## Changelog

See the [Code Block changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
