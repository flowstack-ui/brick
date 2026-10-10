import {
  Icon,
  IconButton,
  Button,
  HStack,
  IconPropsProvider,
} from "@flowstack-ui/brick";

export function IconControls() {
  return (
    <IconPropsProvider value={{ size: "2xl" }}>
      <HStack gap={3} wrap>
        <Button
          size="sm"
          startIcon={
            <Icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </Icon>
          }
        >
          Save changes
        </Button>
        <Button
          size="sm"
          endIcon={
            <Icon asChild>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </Icon>
          }
        >
          Confirm
        </Button>
        <IconButton size="sm" aria-label="Save">
          <Icon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </Icon>
        </IconButton>
      </HStack>
    </IconPropsProvider>
  );
}
