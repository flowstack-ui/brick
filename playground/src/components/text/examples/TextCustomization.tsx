import { Paragraph } from "@flowstack-ui/brick";

export function TextCustomization() {
  return (
    <Paragraph
      style={{
        fontSize: "1.25rem",
        lineHeight: 1.6,
        letterSpacing: "0.02em",
        textDecorationColor: "currentColor",
        textUnderlineOffset: "0.2em",
      }}
      decoration="underline"
    >
      Native style is the deliberate escape hatch for exceptional typography,
      not a replacement for everyday recipes.
    </Paragraph>
  );
}
