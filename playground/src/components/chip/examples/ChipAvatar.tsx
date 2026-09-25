import { Chip, Avatar } from "@flowstack-ui/brick";
export function ChipAvatar() {
  return (
    <Chip.Root radius="control" tone="accent">
      <Chip.StartElement>
        <Avatar
          src="https://i.pravatar.cc/80?img=47"
          alt=""
          fallback="AL"
          size="xs"
        />
      </Chip.StartElement>
      <Chip.Label>Alex Lee</Chip.Label>
    </Chip.Root>
  );
}
