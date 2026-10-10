import { Button, HStack, Spinner } from "@flowstack-ui/brick";
export function ButtonCustomSpinner() {
  return (
    <HStack gap="3" wrap="wrap">
      <Button loading spinner={<Spinner size="inherit" thickness="thick" />}>
        Save changes
      </Button>
      <Button
        loading
        loadingText="Saving"
        spinner={<Spinner size="inherit" thickness="thin" />}
      >
        Save
      </Button>
    </HStack>
  );
}
