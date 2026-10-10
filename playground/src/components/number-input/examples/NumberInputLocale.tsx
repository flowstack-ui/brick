import { Frame } from "@flowstack-ui/brick";
import { LocaleProvider, NumberInput } from "@flowstack-ui/brick";

export function NumberInputLocale() {
  return (
    <Frame maxInlineSize={200}>
      <LocaleProvider locale="de-DE">
        <NumberInput.Root defaultValue={1234.5}>
          <NumberInput.Input aria-label="German amount" />
          <NumberInput.Control />
        </NumberInput.Root>
      </LocaleProvider>
    </Frame>
  );
}
