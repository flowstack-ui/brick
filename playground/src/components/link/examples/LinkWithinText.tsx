import { Link, Paragraph } from "@flowstack-ui/brick";

export function LinkWithinText() {
  return (
    <Paragraph>
      Read our <Link href="#usage">getting started guide</Link> to build your
      first interface.
    </Paragraph>
  );
}
