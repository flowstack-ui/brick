import { For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { CompiledEditorPreview } from "./CompiledEditorPreview.js";

const examples = [
  {
    id: "formatting",
    title: "Formatting",
    description:
      "Headings, font family and size, alignment, links, text color, highlight, and sub/superscript.",
  },
  {
    id: "document",
    title: "Document features",
    description:
      "Placeholder, counts and limit, nested tasks, image URL insertion, and editable code highlighting.",
  },
  {
    id: "contextual",
    title: "Contextual editing",
    description:
      "Select text for a formatting bubble; type @, #, : or / for suggestions. Move blocks with drag or keyboard-accessible arrow actions.",
  },
  {
    id: "workflow",
    title: "Controlled document",
    description:
      "Read-only mode and a debounced application save callback. The demonstration acknowledges changes without storing them.",
  },
  {
    id: "paste",
    title: "Paste policy",
    description:
      "An explicit plain-text paste policy preserves text without importing external formatting.",
  },
  {
    id: "workspace",
    title: "Document workspace",
    description:
      "A combined editor with sticky formatting controls and a reading preview.",
  },
];
export const richTextEditorSections = [
  { id: "getting-started", title: "Getting Started", level: 2 as const },
  { id: "usage", title: "Usage", level: 2 as const },
  { id: "examples", title: "Examples", level: 2 as const },
  ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
];

export function RichTextEditorPage() {
  return (
    <VStack gap="12">
      <CompiledEditorPreview example="intro" title="Basic editor" />
      <DocsSection id="getting-started" title="Getting Started">
        <Paragraph tone="secondary">
          Install the Rich Text Editor source from the authorized Blocks
          catalog, together with its declared Tiptap dependencies. It is a
          copy-owned composition, not an export from the Brick npm package.
        </Paragraph>
      </DocsSection>
      <DocsSection id="usage" title="Usage">
        <Paragraph tone="secondary">
          Start with the basic editor for structured document updates, or
          compose the editor Root, Controls, ControlGroup, Content and Footer
          around your configured Tiptap instance. Keep storage and upload
          policies in your application. Executable source and Code previews are
          available in the authorized Blocks catalog.
        </Paragraph>
      </DocsSection>
      <DocsSection
        id="examples"
        title="Examples"
        description="Explore formatting and document workflows built from Brick controls. Each demonstration keeps its own editable document."
      >
        <For each={examples}>
          {(example) => (
            <DocsSection
              key={example.id}
              id={example.id}
              title={example.title}
              level={3}
              description={example.description}
            >
              <CompiledEditorPreview
                example={example.id}
                title={`${example.title} editor`}
              />
            </DocsSection>
          )}
        </For>
      </DocsSection>
    </VStack>
  );
}
