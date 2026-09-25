import { Link, Paragraph } from "@flowstack-ui/brick";

export function LinkResponsive() {
  return (
    <Paragraph variant="body-xl">
      <Link
        href="#responsive"
        size={{ sm: "sm", md: "md", lg: "lg", xl: "inherit" }}
      >
        Resize to see responsive typography
      </Link>
    </Paragraph>
  );
}
