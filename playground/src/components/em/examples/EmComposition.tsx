import { Em, Paragraph } from "@flowstack-ui/brick";
export function EmComposition() {
  return (
    <Paragraph>
      Review this{" "}
      <Em asChild>
        <em lang="en">before publishing</em>
      </Em>
      .
    </Paragraph>
  );
}
