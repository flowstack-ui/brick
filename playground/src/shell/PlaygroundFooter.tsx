import { Button, Container, Stack, Text } from "@flowstack-ui/brick";

export function PlaygroundFooter() {
  return (
    <Container
      as="footer"
      className="evidence-footer"
      gutter="none"
      measure="wide"
    >
      <Stack
        align={{ initial: "start", md: "center" }}
        direction={{ initial: "column", md: "row" }}
        gap="4"
        justify="between"
      >
        <Text as="p" tone="secondary" variant="body-sm">
          This route is deterministic evidence. Component behavior
          belongs to Brick and Atom; application workflow remains
          outside the package.
        </Text>
        <Button href="#top" size="sm" tone="neutral" variant="ghost">
          Back to top
        </Button>
      </Stack>
    </Container>
  );
}
