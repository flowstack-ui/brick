import { FormatByte, LocaleProvider, Text, VStack } from "@flowstack-ui/brick";

export function FormatByteLocale() {
  return (
    <LocaleProvider locale="de-DE">
      <VStack gap="3">
        <Text>
          <FormatByte value={1450} />
        </Text>
        <Text>
          <FormatByte value={0} unitDisplay="long" />
        </Text>
        <Text>
          English: <FormatByte value={1450} locale="en-US" />
        </Text>
      </VStack>
    </LocaleProvider>
  );
}
