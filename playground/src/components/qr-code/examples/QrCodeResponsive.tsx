import { QrCode, Frame } from "@flowstack-ui/brick";
export function QrCodeResponsive() {
  return (
    <Frame inlineSize="100%" maxInlineSize="20rem">
      <QrCode.Root
        value="https://example.com/share"
        size={{ initial: "full", md: "lg", xl: "2xl" }}
      >
        <QrCode.Frame titleText="Responsive shared document" />
      </QrCode.Root>
    </Frame>
  );
}
