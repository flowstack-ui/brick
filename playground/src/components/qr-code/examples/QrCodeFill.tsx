import { QrCode } from "@flowstack-ui/brick";
export function QrCodeFill() {
  return (
    <QrCode.Root value="https://example.com">
      <QrCode.Frame
        titleText="Custom ink"
        fill="#351370"
        background="#fff8ee"
      />
    </QrCode.Root>
  );
}
