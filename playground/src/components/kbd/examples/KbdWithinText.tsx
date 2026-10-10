import { Kbd, Paragraph } from "@flowstack-ui/brick";
export function KbdWithinText() {
  return (
    <Paragraph>
      Press <Kbd>F12</Kbd> to open developer tools, or{" "}
      <Kbd>Ctrl + Shift + P</Kbd> to open commands.
    </Paragraph>
  );
}
