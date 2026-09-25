import { Tag, Check } from "lucide-react";
import { Chip, Icon } from "@flowstack-ui/brick";
export function ChipRTL() {
  return (
    <Chip.Root radius="control" dir="rtl" tone="accent">
      <Chip.StartElement>
        <Icon>
          <Tag />
        </Icon>
      </Chip.StartElement>
      <Chip.Label>فريق التصميم</Chip.Label>
      <Chip.EndElement>
        <Icon>
          <Check />
        </Icon>
      </Chip.EndElement>
    </Chip.Root>
  );
}
