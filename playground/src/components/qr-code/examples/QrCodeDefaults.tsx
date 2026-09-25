import { QrCode, HStack } from "@flowstack-ui/brick";
export function QrCodeDefaults() {
  return (
    <QrCode.PropsProvider value={{ size: "lg" }}>
      <HStack gap={6} wrap>
        <QrCode.Root value="https://example.com/a">
          <QrCode.Frame titleText="Inherited large code" />
        </QrCode.Root>
        <QrCode.Root value="https://example.com/b" size="sm">
          <QrCode.Frame titleText="Explicit small code" />
        </QrCode.Root>
      </HStack>
    </QrCode.PropsProvider>
  );
}
