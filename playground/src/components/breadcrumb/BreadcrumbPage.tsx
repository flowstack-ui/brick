import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { BreadcrumbEvidence } from "./BreadcrumbEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { breadcrumbScenarios } from "./BreadcrumbEvidence.js";
export function BreadcrumbPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <BreadcrumbEvidence />;
  return (
    <VStack gap={12} data-component-page="breadcrumb">
      <ExamplePreview label="Breadcrumb basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Breadcrumb"
        usage={basicSource}
        examples={examples}
        parts={parts}
        usageDescription="Compose a named navigation landmark, ordered ancestors and one current location."
        guide={
          <VStack gap={3}>
            <Paragraph>
              Use Root, List and Item to preserve hierarchy. Page marks the
              current location; Separator is decorative. Put Ellipsis inside
              Item. Ancestor destinations are native links; actions use Trigger.
            </Paragraph>
            <Paragraph>
              Keep names complete and the full trail readable at narrow widths.
              Menus own their keyboard and focus behavior. Native links retain
              Tab order and Enter activation. There is no breadcrumb arrow-key
              model.
            </Paragraph>
            <Paragraph>
              Migration: subtle retains the old plain interaction underline.
              Plain now stays undecorated. Sizes are compact, the default
              separator is a chevron, and current text uses regular weight.
              Semantic colors and local variables remain customizable.
            </Paragraph>
          </VStack>
        }
      />
    </VStack>
  );
}
