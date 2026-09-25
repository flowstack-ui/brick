import { For, FormatByte, HStack, LocaleProvider, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const formatByteScenarios = [{
  id: "format-byte.formats",
  number: 1,
  title: "Byte and bit formats",
  description: "Decimal and binary scaling use locale-aware platform units.",
}, { id: "format-byte.display", number: 2, title: "Display and scale", description: "The same value with each unit display and scaling system." },
{ id: "format-byte.locales", number: 3, title: "Locale and precision", description: "Locale-aware quantity labels and explicit precision." },
{ id: "format-byte.boundaries", number: 4, title: "Boundaries", description: "Zero, negative and scale-boundary values remain deterministic." }] as const;

export function FormatBytePage() {
  const preview = usePreviewContext();
  if (!preview && new URLSearchParams(window.location.search).get("qualification") !== "1") return <FormatByteDocumentation />;
  return <FormatByteEvidence />;
}

function FormatByteEvidence() {
  return (
    <VStack data-component-page="format-byte" gap="6">
      <Scenario {...formatByteScenarios[0]}>
        <Specimen label="Localized quantities">
          <HStack data-testid="format-byte-output" gap="5" wrap>
            <Text><FormatByte value={1450} /></Text>
            <Text><FormatByte value={2048} unitSystem="binary" /></Text>
            <Text><FormatByte value={1450} unit="bit" unitDisplay="long" /></Text>
          </HStack>
        </Specimen>
      </Scenario>
      <Scenario {...formatByteScenarios[1]}><VStack gap="4"><For each={["decimal", "binary"] as const}>{unitSystem => <Specimen key={unitSystem} label={unitSystem}><HStack gap="5" wrap><For each={["long", "short", "narrow"] as const}>{unitDisplay => <VStack key={unitDisplay} gap="2" align="start"><Text tone="secondary" variant="body-sm">{unitDisplay}</Text><Text><FormatByte value={1536} unitSystem={unitSystem} unitDisplay={unitDisplay} /></Text></VStack>}</For></HStack></Specimen>}</For></VStack></Scenario>
      <Scenario {...formatByteScenarios[2]}><HStack gap="4" wrap><For each={["en-US", "de-DE", "ar-EG"]}>{locale => <Specimen key={locale} label={locale}><LocaleProvider locale={locale}><Text><FormatByte value={1234567} precision={4} unitDisplay="long" /></Text></LocaleProvider></Specimen>}</For></HStack></Scenario>
      <Scenario {...formatByteScenarios[3]}><HStack gap="4" wrap><For each={[0, -1024, 999, 1000, 1024, 1000000]}>{value => <Specimen key={value} label={String(value)}><Text><FormatByte value={value} /></Text></Specimen>}</For></HStack></Scenario>
    </VStack>
  );
}
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { FormatByteDocumentation } from "./FormatByteDocumentation.js";
