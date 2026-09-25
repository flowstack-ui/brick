import { useState } from "react";
import {
  Button,
  FormatNumber,
  LocaleProvider,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function LocaleProviderDynamic() {
  const [locale, setLocale] = useState("en-US");
  return (
    <VStack gap="4">
      <Button
        variant="outline"
        onClick={() => setLocale(locale === "en-US" ? "de-DE" : "en-US")}
      >
        Switch locale
      </Button>
      <LocaleProvider locale={locale}>
        <Text>
          {locale}: <FormatNumber value={1234.5} />
        </Text>
      </LocaleProvider>
    </VStack>
  );
}
