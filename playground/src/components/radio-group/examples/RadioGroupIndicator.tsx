import { Icon, RadioGroup } from "@flowstack-ui/brick";
import { Check } from "lucide-react";

export function RadioGroupIndicator() {
  return (
    <RadioGroup.Root aria-label="Delivery" defaultValue="standard">
      <RadioGroup.Item
        value="standard"
        indicator={
          <Icon size="inherit">
            <Check />
          </Icon>
        }
      >
        Standard
      </RadioGroup.Item>
      <RadioGroup.Item
        value="express"
        indicator={
          <Icon size="inherit">
            <Check />
          </Icon>
        }
      >
        Express
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}
