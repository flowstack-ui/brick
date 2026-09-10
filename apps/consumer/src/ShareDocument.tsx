import { useState } from "react";
import { Card } from "@flowstack-ui/brick/card";
import { QrCode } from "@flowstack-ui/brick/qr-code";
import { Link } from "@flowstack-ui/brick/link";
import { Text } from "@flowstack-ui/brick/text";
import { VStack } from "@flowstack-ui/brick/stack";

export function ShareDocument() {
  const [error, setError] = useState("");
  const destination = "https://example.com/shared/project-notes";
  return <Card.Root><Card.Content><VStack align="start" gap="4">
    <Text as="h2" variant="title-lg">Open project notes on another device</Text>
    <QrCode.Root value={destination} size="lg"><VStack align="start" gap="4">
      <QrCode.Frame titleText="Scan to open project notes" />
      <QrCode.DownloadTrigger fileName="project-notes.png" mimeType="image/png" exportSize={512}
        onDownloadError={() => setError("Unable to create the image. Use the document link instead.")}>Save sharing code</QrCode.DownloadTrigger>
    </VStack></QrCode.Root>
    <Link href={destination}>Open project notes</Link>
    {error && <Text role="status">{error}</Text>}
  </VStack></Card.Content></Card.Root>;
}
