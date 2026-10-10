# Docs example preview

`ExamplePreview.tsx` is an opt-in documentation composition, not a Brick API.
It pairs an inline React example with source imported from that exact file via
Vite `?raw`. Keep demonstration files small, independently importable, and free
of playground controls. The wrapper owns Tabs, Surface padding, CodeBlock and
the disabled StackBlitz action; the demo owns only the component composition.

Tabs use Brick's flat soft recipe with neutral tone, inside semantic-color focus
and no protective List padding. The preview shares the header's outer Container
gutter without a second narrower content measure. The external action is outside the
tablist. No iframe, source execution, external project creation or network
export is added. Enable StackBlitz only in a separately approved integration.

ExampleSource owns the headerless dark code composition and uses CodeBlock's
small recipe (14px at the default root size) for documentation source.
CodeBlock owns Clipboard; CopyTrigger asChild supplies a named IconButton with honest
state icons and status. ZStack positions the action, while HStack endSpacing
reserves its lane so neither long lines nor scrolling put code underneath it.
No custom CSS or second copy handler is needed. Syntax colors remain deferred.
Successful copying changes the button to a checkmark without adding visible
text or changing panel height. VisuallyHidden wraps the Clipboard status for
pending/success announcements; failures keep their visible explanatory status.

Aspect Ratio's introduction is the first opt-in. Its scenario keeps an anchor
and accessible name without the old Overview heading. Other examples and
component pages keep their existing presentation; do not migrate them implicitly.
Aspect Ratio omits the legacy scenario navigation strip so the opening tabs
follow the introduction. Other pages retain their navigation. Surface's current
md/xl inset recipes supply 24px/48px padding; no local 40px override is added.

Aspect Ratio Usage and Examples reuse `DocsSection` for native anchor headings,
`Code` inside explanatory Paragraphs, and `ExampleSource` for standalone Usage
snippets. Each media example remains a separate executable file paired with its
raw source. Embeds are native media content inside AspectRatio, not an iframe
around the preview system. Browser tests intercept external providers; live
network/player verification must be recorded separately. Keep scenario IDs
stable and avoid duplicate named region landmarks around the same heading.

DocsSection maps documentation H2 to Heading title-md (20px), H3 to title-sm
(18px), and descriptions to Paragraph body-md (16px). These are the closest
Brick recipes to Chakra docs' em-based 20.8px/19.2px/16px scale, not fractional
local overrides. It separates heading/description spacing (16px/8px) from
content spacing (24px for Usage, 32px for examples). Aspect Ratio places Usage
64px after the intro, Examples 32px after Usage, and example sections 64px
apart, using Stack spacing props only.
Headingless Scenario wrappers retain IDs and accessible labels but omit legacy
numbered-scenario CSS; that CSS adds padding and must not compound docs spacing.

Descriptions use Paragraph tone="secondary". Preview Surface uses level="canvas"
to match the page paint while preserving its border and inset; this is not
transparent paint. The code surface retains its separate dark appearance.

The Image, Video, and Responsive demos use Frame's `maxInlineSize` with asChild
to apply the constraint directly to the AspectRatio host without a wrapper.
Their normal block parent already provides available-width sizing; do not add
`inlineSize="100%"` defensively. Reassess sizing if a demo is moved into a
non-stretching flex or other intrinsically sized composition.
