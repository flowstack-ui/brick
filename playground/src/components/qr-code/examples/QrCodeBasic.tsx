import { QrCode, Link, VStack } from "@flowstack-ui/brick";
export function QrCodeBasic() {
  return (
    <VStack align="start" gap={3}>
      <QrCode.Root value="https://example.com/share">
        <QrCode.Frame titleText="Open shared document" />
      </QrCode.Root>
      <Link href="https://example.com/share">Open shared document</Link>
    </VStack>
  );
}
