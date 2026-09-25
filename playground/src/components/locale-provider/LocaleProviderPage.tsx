import { CloseButton, DateInput, FormatByte, FormatNumber, HStack, LocaleProvider, Text, VStack, parseDate, useLocaleContext } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const localeProviderScenarios = [{
  id: "locale-provider.inheritance",
  number: 1,
  title: "Locale and direction inheritance",
  description: "Formatting and logical direction share one provider without an extra host.",
}, { id: "locale-provider.nesting", number: 2, title: "Nested providers", description: "Nested locales override formatting while partial control text merges." },
{ id: "locale-provider.controls", number: 3, title: "Control labels", description: "Provider-owned labels and explicit instance names remain separate." }] as const;

function LocaleOutput() {
  const { dir } = useLocaleContext();
  return (
    <VStack data-testid="locale-provider-output" dir={dir} gap="2">
      <Text>اتجاه ومحتوى محلي</Text>
      <FormatNumber value={123456.78} />
    </VStack>
  );
}

export function LocaleProviderPage() {
  const preview = usePreviewContext();
  if (!preview && new URLSearchParams(window.location.search).get("qualification") !== "1") return <LocaleProviderDocumentation />;
  return <LocaleProviderEvidence />;
}

function LocaleProviderEvidence() {
  return (
    <VStack data-component-page="locale-provider" gap="6">
      <Scenario {...localeProviderScenarios[0]}>
        <Specimen label="Arabic locale">
          <LocaleProvider locale="ar-EG">
            <LocaleOutput />
          </LocaleProvider>
        </Specimen>
      </Scenario>
      <Scenario {...localeProviderScenarios[1]}><Specimen label="French parent, German child"><LocaleProvider locale="fr-FR" localeText={{ close: "Fermer", clearDate: "Effacer la date" }}><VStack gap="4"><Text>French amount: <FormatNumber value={1234.5} /></Text><LocaleProvider locale="de-DE"><HStack gap="4" wrap><Text>German amount: <FormatNumber value={1234.5} /></Text><Text><FormatByte value={1234567} unitDisplay="long" /></Text><CloseButton /></HStack></LocaleProvider></VStack></LocaleProvider></Specimen></Scenario>
      <Scenario {...localeProviderScenarios[2]}><Specimen label="Translated controls"><LocaleProvider locale="fr-FR" localeText={{ close: "Fermer", clearDate: "Effacer la date" }}><VStack gap="3"><DateInput.Root referenceDate={parseDate("2026-09-05")} defaultValue={parseDate("2026-09-05")}><DateInput.Label>Date de livraison</DateInput.Label><DateInput.Control><DateInput.SegmentGroup><DateInput.Segments /></DateInput.SegmentGroup><DateInput.ClearTrigger /></DateInput.Control></DateInput.Root><HStack gap="3"><CloseButton /><CloseButton aria-label="Fermer les paramètres" /></HStack></VStack></LocaleProvider></Specimen></Scenario>
    </VStack>
  );
}
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { LocaleProviderDocumentation } from "./LocaleProviderDocumentation.js";
