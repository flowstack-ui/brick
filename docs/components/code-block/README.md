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
viewport and renders canonical `pre > code` markup. CopyTrigger is an Atom
Clipboard Trigger rendered through Brick Button. CopyIndicator and CopyStatus
expose authored progress and live-result wording. Optional parts render only
when authored.

## API

| Part or prop | Values | Default |
| --- | --- | --- |
| `Root.value` | copied plain-text source | required |
| `variant` | `subtle`, `bordered`, `plain` | `subtle` |
| `size` | `sm`, `md` | `md` |
| `Root.language` | explicit string | none |
| `wrap` | `scroll`, `wrap` | `scroll` |
| `focusable` | `boolean` | `true` |
| Clipboard behavior | `disabled`, `timeout`, `writeValue`, `onStatusChange` | Atom defaults |

Public parts are `Root`, `Header`, `Title`, `Language`, `Actions`, `Content`,
`CopyTrigger`, `CopyIndicator`, and `CopyStatus`. Direct exports are
`CodeBlockRoot`, `CodeBlockHeader`, `CodeBlockTitle`, `CodeBlockLanguage`,
`CodeBlockActions`, `CodeBlockContent`, `CodeBlockCopyTrigger`,
`CodeBlockCopyIndicator`, and `CodeBlockCopyStatus`. Their prop types are
`CodeBlockRootProps`, `CodeBlockHeaderProps`, `CodeBlockTitleProps`,
`CodeBlockLanguageProps`, `CodeBlockActionsProps`, `CodeBlockContentProps`,
`CodeBlockCopyTriggerProps`, `CodeBlockCopyIndicatorProps`, and
`CodeBlockCopyStatusProps`. Type exports also include `CodeBlockVariant`,
`CodeBlockSize`, and `CodeBlockWrap`.

## Visual recipes and states

`subtle` supplies a quiet filled surface, `bordered` a transparent bordered
surface, and `plain` removes surrounding paint. Size changes only component
rhythm and technical typography. Atom supplies `idle`, `copying`, `copied`,
and `error` copy states; the trigger is disabled when the clipboard contract
is disabled. Scroll and wrap differ only in long-line handling.

## Tokens and CSS hooks

Hooks include `.brick-code-block` and its part classes, Atom `data-state`, plus
`data-slot`, `data-language`, `data-size`, `data-variant`, and `data-wrap`.
Public variables are `--brick-code-block-background`,
`--brick-code-block-foreground`, `--brick-code-block-border-color`,
`--brick-code-block-border-width`, `--brick-code-block-radius`,
`--brick-code-block-header-padding`, `--brick-code-block-content-padding`,
`--brick-code-block-gap`, `--brick-code-block-font-family`,
`--brick-code-block-font-size`, `--brick-code-block-font-weight`,
`--brick-code-block-line-height`, `--brick-code-block-letter-spacing`,
`--brick-code-block-selection-background`, and
`--brick-code-block-selection-foreground`.

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
to Content while keeping Root `value` as the matching plain text. Unsafe HTML
is not accepted and Brick does not bundle a tokenizer.

## Responsive behavior

The root fills available inline space but owns no external dimensions or
breakpoints. `scroll` preserves long lines in the horizontal viewport; `wrap`
reflows them. Code defaults to LTR inside an RTL page while Header follows page
direction.

## Accessibility

Give focusable Content a specific `aria-label` or `aria-labelledby`; it is the
only scroll-region keyboard stop. CopyTrigger retains focus. Author concise
CopyStatus text for copying, success, and failure so Atom can announce truthful
results. Do not add `role="application"`.

## Composition, native props, and refs

Root forwards Atom Clipboard props and its `HTMLDivElement` ref. Structural
parts forward their native attributes and refs. Content's ref targets the
native Scroll Area viewport. Root `value` is authoritative for copying even
when Content receives highlighted nodes. The component composes Brick Code,
Scroll Area, and Button; consumers do not need to recreate those internals.

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
