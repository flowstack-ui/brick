import { For, FormatNumber, HStack, LocaleProvider, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const formatNumberScenarios = [{
  id: "format-number.formats",
  number: 1,
  title: "Common number formats",
  description: "Currency, percentage, and compact notation inherit surrounding typography.",
}, { id: "format-number.units", number: 2, title: "Units and precision", description: "Platform options control unit labels, fractional precision and signs." },
{ id: "format-number.locales", number: 3, title: "Locales and overrides", description: "The same amount follows its provider unless explicitly overridden." },
{ id: "format-number.values", number: 4, title: "Value boundaries", description: "Negative, zero and large values use the surrounding type recipe." }] as const;

export function FormatNumberPage() {
  const preview = usePreviewContext();
  if (!preview && new URLSearchParams(window.location.search).get("qualification") !== "1") return <FormatNumberDocumentation />;
  return <FormatNumberEvidence />;
}

function FormatNumberEvidence() {
  return (
    <VStack data-component-page="format-number" gap="6">
      <Scenario {...formatNumberScenarios[0]}>
        <Specimen label="Localized output">
          <HStack data-testid="format-number-output" gap="5" wrap>
            <Text><FormatNumber value={2499} formatOptions={{ style: "currency", currency: "USD" }} /></Text>
            <Text><FormatNumber value={0.42} formatOptions={{ style: "percent" }} /></Text>
            <Text><FormatNumber value={1200} formatOptions={{ notation: "compact" }} /></Text>
          </HStack>
        </Specimen>
      </Scenario>
      <Scenario {...formatNumberScenarios[1]}><HStack gap="4" wrap><Specimen label="Kilometers"><Text><FormatNumber value={1250.5} formatOptions={{ style: "unit", unit: "kilometer", unitDisplay: "long" }} /></Text></Specimen><Specimen label="Two fraction digits"><Text><FormatNumber value={1.2345} formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }} /></Text></Specimen><Specimen label="Signed change"><Text><FormatNumber value={0.125} formatOptions={{ style: "percent", signDisplay: "always", maximumFractionDigits: 1 }} /></Text></Specimen></HStack></Scenario>
      <Scenario {...formatNumberScenarios[2]}><HStack gap="4" wrap><For each={["en-US", "de-DE", "ar-EG"]}>{locale => <Specimen key={locale} label={locale}><LocaleProvider locale={locale}><VStack gap="2"><Text><FormatNumber value={1234.5} formatOptions={{ style: "currency", currency: "EUR" }} /></Text><Text tone="secondary" variant="body-sm">Explicit English: <FormatNumber value={1234.5} locale="en-US" /></Text></VStack></LocaleProvider></Specimen>}</For></HStack></Scenario>
      <Scenario {...formatNumberScenarios[3]}><HStack gap="4" wrap><For each={[-1234.5, 0, 123456789]}>{value => <Specimen key={value} label={String(value)}><Text variant="title-sm"><FormatNumber value={value} /></Text></Specimen>}</For></HStack></Scenario>
    </VStack>
  );
}
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { FormatNumberDocumentation } from "./FormatNumberDocumentation.js";
