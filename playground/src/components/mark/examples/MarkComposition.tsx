import { Mark, Paragraph } from "@flowstack-ui/brick";
export function MarkComposition() {
  return (
    <Paragraph>
      Review the{" "}
      <Mark asChild>
        <mark title="Requires review">relevant passage</mark>
      </Mark>
      .
    </Paragraph>
  );
}
