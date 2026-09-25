import { Menubar } from "@flowstack-ui/brick";

export function MenubarRtl() {
  return (
    <Menubar.Root dir="rtl" aria-label="أوامر المستند">
      <Menubar.Menu value="file">
        <Menubar.Trigger>ملف</Menubar.Trigger>
        <Menubar.Content dir="rtl">
          <Menubar.Item value="new">مستند جديد</Menubar.Item>
          <Menubar.Sub>
            <Menubar.SubTrigger value="export">تصدير</Menubar.SubTrigger>
            <Menubar.SubContent dir="rtl">
              <Menubar.Item value="pdf">PDF</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>تحرير</Menubar.Trigger>
        <Menubar.Content dir="rtl">
          <Menubar.Item value="undo">تراجع</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
