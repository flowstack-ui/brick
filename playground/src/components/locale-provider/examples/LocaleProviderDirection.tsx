import {
  FormatNumber,
  LocaleProvider,
  Text,
  useLocaleContext,
} from "@flowstack-ui/brick";

function Details() {
  const { locale, dir } = useLocaleContext();
  return (
    <Text lang={locale} dir={dir}>
      {locale} · {dir} · <FormatNumber value={1234.5} />
    </Text>
  );
}
export function LocaleProviderDirection() {
  return (
    <LocaleProvider locale="ar-EG">
      <Details />
    </LocaleProvider>
  );
}
