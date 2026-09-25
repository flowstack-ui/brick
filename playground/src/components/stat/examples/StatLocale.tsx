import { Stat, LocaleProvider, FormatByte } from "@flowstack-ui/brick";

export function StatLocale() {
  return (
    <LocaleProvider locale="de-DE">
      <Stat.Root>
        <Stat.Label>Storage used</Stat.Label>
        <Stat.ValueText>
          <FormatByte value={1250000000} />
        </Stat.ValueText>
        <Stat.HelpText>Across all workspaces</Stat.HelpText>
      </Stat.Root>
    </LocaleProvider>
  );
}
