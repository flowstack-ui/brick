import { Stack, Button, Input } from "@flowstack-ui/brick";

export function StackForm() {
  return (
    <Stack
      direction={{ initial: "column", lg: "row" }}
      align={{ lg: "center" }}
      gap={3}
    >
      <Stack.Item flex={{ initial: "content", lg: 1 }}>
        <Input
          aria-label="Project name"
          placeholder="A descriptive project name"
        />
      </Stack.Item>
      <Stack.Item flex="fixed">
        <Button>Save project changes</Button>
      </Stack.Item>
    </Stack>
  );
}
