import { Frame, NavigationMenu } from "@flowstack-ui/brick";

export function NavigationMenuRtl() {
  return (
    <Frame minBlockSize="18rem">
      <NavigationMenu.Root aria-label="التنقل الرئيسي" dir="rtl">
        <NavigationMenu.List surface="raised">
          <NavigationMenu.Item value="learn">
            <NavigationMenu.Trigger>التوثيق</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="#usage">ابدأ هنا</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="examples">
            <NavigationMenu.Link href="#examples">الأمثلة</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Indicator />
        </NavigationMenu.List>
        <NavigationMenu.Viewport align="start" />
      </NavigationMenu.Root>
    </Frame>
  );
}
