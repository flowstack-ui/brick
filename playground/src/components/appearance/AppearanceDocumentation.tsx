import { AppearanceProps, For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import {
  PropsTable,
  type DocsPropDefinition,
} from "../../shared/PropsTable.js";
import { appearanceSection } from "./sections.js";
import { AppearanceNested } from "./examples/AppearanceNested.js";
import AppearanceNestedSource from "./examples/AppearanceNested.tsx?raw";
import { AppearancePortalled } from "./examples/AppearancePortalled.js";
import AppearancePortalledSource from "./examples/AppearancePortalled.tsx?raw";
import { AppearancePageScope } from "./examples/AppearancePageScope.js";
import AppearancePageScopeSource from "./examples/AppearancePageScope.tsx?raw";
import { AppearanceNative } from "./examples/AppearanceNative.js";
import AppearanceNativeSource from "./examples/AppearanceNative.tsx?raw";
import { AppearanceComposition } from "./examples/AppearanceComposition.js";
import AppearanceCompositionSource from "./examples/AppearanceComposition.tsx?raw";
const examples = [
  {
    id: "nested",
    Demo: AppearanceNested,
    source: AppearanceNestedSource,
    description: "Nested boundaries restore their own light or dark values.",
  },
  {
    id: "portalled",
    Demo: AppearancePortalled,
    source: AppearancePortalledSource,
    description:
      "Apply the appearance to the portalled content, or use a container inside the intended scope.",
  },
  {
    id: "page",
    Demo: AppearancePageScope,
    source: AppearancePageScopeSource,
    description:
      "Scope an existing page host; persistence and the document preference remain application-owned.",
  },
  {
    id: "native",
    Demo: AppearanceNative,
    source: AppearanceNativeSource,
    description:
      "Native text inherits primary foreground. Secondary text and explicitly authored colors remain intentional. Native tags here demonstrate interoperability.",
  },
  {
    id: "composition",
    Demo: AppearanceComposition,
    source: AppearanceCompositionSource,
    description:
      "Appearance adds no background or spacing. Surface or the existing component owns paint.",
  },
] as const;
const props = [
  {
    name: "value",
    defaultLabel: '"inherit"',
    typeLabel: '"light" | "dark" | "inherit"',
    description:
      "Choose a local appearance. Inherit removes the local boundary; it follows the ancestor, not necessarily the operating system.",
  },
  {
    name: "children",
    typeLabel: "ReactElement",
    description:
      "One native or Brick host accepting DOM props and a ref. No Fragment, string or multiple direct children. Set native attributes and styles on this child.",
  },
] satisfies readonly DocsPropDefinition<AppearanceProps>[];
export function AppearanceDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...appearanceSection("usage")}
        description="Apply a light or dark token scope and inherited primary foreground to an existing element without adding a wrapper."
      >
        <ExampleSource
          label="Appearance import"
          source={'import { Appearance } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Appearance usage"
          source={
            '<Appearance value="dark">\n  <section>Content</section>\n</Appearance>'
          }
        />
      </DocsSection>
      <DocsSection {...appearanceSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...appearanceSection(id)}
                description={description}
              >
                <ExamplePreview
                  label={appearanceSection(id).title}
                  source={source}
                >
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...appearanceSection("guide")}>
        <Paragraph tone="secondary">
          Appearance selects light or dark within the active theme; it does not
          choose a brand, add a background, or save user preferences.
          Transparent content needs a compatible background supplied by its
          surroundings or Surface.
        </Paragraph>
        <Paragraph tone="secondary">
          Inherit follows the nearest ancestor. Only removing the document-root
          override returns to the system preference. Portals outside a branded
          scope may need both the theme attribute and Appearance on their visual
          roots.
        </Paragraph>
      </DocsSection>
      <DocsSection
        {...appearanceSection("props")}
        description="Appearance-owned props. Ref targets the existing host; native props belong on the child."
      >
        <PropsTable label="Appearance props" rows={props} />
      </DocsSection>
    </VStack>
  );
}
