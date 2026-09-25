import { HStack, Toolbar } from "@flowstack-ui/brick";
export function ToolbarOrientation() {
  return (
    <HStack gap="6" align="start" wrap>
      <Toolbar.Root orientation="vertical" aria-label="Drawing tools">
        <Toolbar.Button>Move</Toolbar.Button>
        <Toolbar.Button>Draw</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Button>Erase</Toolbar.Button>
      </Toolbar.Root>
      <Toolbar.Root dir="rtl" aria-label="أدوات المستند">
        <Toolbar.Button>حفظ</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Link href="#usage">مساعدة</Toolbar.Link>
      </Toolbar.Root>
    </HStack>
  );
}
