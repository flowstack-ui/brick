import { Heading, Highlight } from "@flowstack-ui/brick";
export function HighlightMultiple() {
  return (
    <Heading level={3} variant="title-md">
      <Highlight
        text="Design, build, and share a durable design system."
        query={["design", "build", "share"]}
      />
    </Heading>
  );
}
