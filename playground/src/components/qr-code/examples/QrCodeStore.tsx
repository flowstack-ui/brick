import { QrCode, useQrCode, Button, VStack, Text } from "@flowstack-ui/brick";
export function QrCodeStore() {
  const api = useQrCode({ defaultValue: "https://example.com" });
  return (
    <VStack align="start" gap={4}>
      <QrCode.RootProvider value={api}>
        <QrCode.Frame titleText="Shared controller" />
        <QrCode.Context>{(state) => <Text>{state.value}</Text>}</QrCode.Context>
      </QrCode.RootProvider>
      <Button
        size="sm"
        variant="outline"
        onClick={() => api.setValue("https://example.com/updated")}
      >
        Update destination
      </Button>
    </VStack>
  );
}
