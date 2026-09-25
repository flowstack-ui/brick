import { Accordion, Avatar } from "@flowstack-ui/brick";

export function AccordionAvatar() {
  return (
    <Accordion.Root>
      <Accordion.Item value={"details"}>
        <Accordion.Header>
          <Accordion.Trigger>
            <Avatar
              alt=""
              size="sm"
              src="https://i.pravatar.cc/80?img=47"
              fallback="JD"
            />
            Jamie Davis
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Accordion.ContentInner>
            Product designer · Available for collaboration.
          </Accordion.ContentInner>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
