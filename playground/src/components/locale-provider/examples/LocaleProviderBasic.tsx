import { FormatNumber, LocaleProvider, Text } from "@flowstack-ui/brick";

export function LocaleProviderBasic() {
  return (
    <LocaleProvider locale="de-DE">
      <Text>
        <FormatNumber value={1234.5} />
      </Text>
    </LocaleProvider>
  );
}
