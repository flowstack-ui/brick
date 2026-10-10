import { Input, LocaleProvider, NumberInput } from "@flowstack-ui/brick";

export function LocaleProviderNested() {
  return (
    <LocaleProvider locale="en-US" localeText={{ incrementValue: "Add one" }}>
      <LocaleProvider
        locale="de-DE"
        localeText={{ decrementValue: "Remove one" }}
      >
        <NumberInput.Root defaultValue={2}>
          <NumberInput.Input aria-label="Quantity" />
          <NumberInput.Control />
        </NumberInput.Root>
      </LocaleProvider>
    </LocaleProvider>
  );
}
