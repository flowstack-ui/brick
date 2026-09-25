import { LocaleProvider, Text, VStack, useFilter } from "@flowstack-ui/brick";

function Filters() {
  const local = useFilter({ sensitivity: "base" });
  const english = useFilter({ locale: "en-US", sensitivity: "base" });
  return (
    <VStack gap="3">
      <Text>Turkish I/i: {String(local.startsWith("Istanbul", "i"))}</Text>
      <Text>English I/i: {String(english.startsWith("Istanbul", "i"))}</Text>
    </VStack>
  );
}
export function LocaleProviderOverride() {
  return (
    <LocaleProvider locale="tr">
      <Filters />
    </LocaleProvider>
  );
}
