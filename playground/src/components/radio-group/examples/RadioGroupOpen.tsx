import { RadioGroup, Link } from "@flowstack-ui/brick";

export function RadioGroupOpen() {
  return (
    <RadioGroup.Root defaultValue="standard">
      <RadioGroup.Label>Delivery</RadioGroup.Label>
      <RadioGroup.ItemRoot value="standard">
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemControl>
          <RadioGroup.ItemIndicator />
        </RadioGroup.ItemControl>
        <RadioGroup.ItemText>Standard delivery</RadioGroup.ItemText>
        <RadioGroup.ItemDescription>
          Arrives in three to five business days.
        </RadioGroup.ItemDescription>
      </RadioGroup.ItemRoot>
      <RadioGroup.ItemRoot value="express">
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemControl>
          <RadioGroup.ItemIndicator />
        </RadioGroup.ItemControl>
        <RadioGroup.ItemText>
          Express delivery ·{" "}
          <Link href="https://example.com/shipping" target="_blank">
            Shipping terms
          </Link>
        </RadioGroup.ItemText>
        <RadioGroup.ItemDescription>
          Arrives the next business day.
        </RadioGroup.ItemDescription>
      </RadioGroup.ItemRoot>
    </RadioGroup.Root>
  );
}
