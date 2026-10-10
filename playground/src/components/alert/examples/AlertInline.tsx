import { Alert } from "@flowstack-ui/brick";
export function AlertInline() {
  return (
    <Alert.Root inline>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Export ready.</Alert.Title>
        <Alert.Description>
          You can download it from your files.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
