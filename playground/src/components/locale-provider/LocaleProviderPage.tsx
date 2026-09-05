import { FormatNumber, LocaleProvider, Text, VStack, useLocaleContext } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const localeProviderScenarios = [{
  id: "locale-provider.inheritance",
  number: 1,
  title: "Locale and direction inheritance",
  description: "Formatting and logical direction share one provider without an extra host.",
}] as const;

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
  return (
    <VStack data-component-page="locale-provider" gap="6">
      <Scenario {...localeProviderScenarios[0]}>
        <Specimen label="Arabic locale">
          <LocaleProvider locale="ar-EG">
            <LocaleOutput />
          </LocaleProvider>
        </Specimen>
      </Scenario>
    </VStack>
  );
}
