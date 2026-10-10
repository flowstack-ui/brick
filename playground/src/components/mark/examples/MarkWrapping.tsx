import { Frame, Mark, Paragraph } from "@flowstack-ui/brick";
export function MarkWrapping() {
  return (
    <Frame maxInlineSize={320}>
      <Paragraph>
        This{" "}
        <Mark>
          long marked passage wraps across lines while keeping its background on
          each fragment
        </Mark>{" "}
        in the sentence.
      </Paragraph>
    </Frame>
  );
}
