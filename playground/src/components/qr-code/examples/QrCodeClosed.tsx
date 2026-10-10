import { QrCode, type QrCodeRootProps } from "@flowstack-ui/brick";
function ShareCode({ value, ...props }: QrCodeRootProps) {
  return (
    <QrCode.Root {...props} value={value}>
      <QrCode.Frame titleText="Open the shared destination" />
    </QrCode.Root>
  );
}
export function QrCodeClosed() {
  return <ShareCode value="https://example.com/share" size="lg" />;
}
