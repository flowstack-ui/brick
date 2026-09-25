import {
  FormatNumber,
  LocaleProvider,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function FormatNumberLocale() {
  return (
    <LocaleProvider locale="de-DE">
      <VStack gap="3">
        <Text>
          <FormatNumber value={1234.5} />
        </Text>
        <Text>
          English: <FormatNumber value={1234.5} locale="en-US" />
        </Text>
      </VStack>
    </LocaleProvider>
  );
}
