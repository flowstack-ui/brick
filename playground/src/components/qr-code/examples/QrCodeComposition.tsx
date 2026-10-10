import { QrCode } from "@flowstack-ui/brick";
export function QrCodeComposition() {
  return (
    <QrCode.Root
      asChild
      unstyled
      value="https://example.com"
      id="composed-code"
    >
      <section>
        <QrCode.Frame asChild titleText="Composed unstyled code">
          <svg width="160" height="160">
            <QrCode.Pattern asChild>
              <path fill="black" />
            </QrCode.Pattern>
          </svg>
        </QrCode.Frame>
      </section>
    </QrCode.Root>
  );
}
