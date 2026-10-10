import { Code, Paragraph } from "@flowstack-ui/brick";
export function CodeComposition() {
  return (
    <Paragraph>
      Keep one semantic host:{" "}
      <Code asChild>
        <code title="Package import">import</code>
      </Code>
      .
    </Paragraph>
  );
}
