import { Button, HStack } from "@flowstack-ui/brick";
export function ButtonSpinnerPlacement() {
  return (
    <HStack gap="3" wrap="wrap">
      <Button loading loadingText="Saving" spinnerPlacement="start">
        Save
      </Button>
      <Button loading loadingText="Saving" spinnerPlacement="end">
        Save
      </Button>
    </HStack>
  );
}
