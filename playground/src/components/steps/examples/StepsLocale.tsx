import { For, LocaleProvider, Steps } from "@flowstack-ui/brick";
export function StepsLocale() {
  return (
    <LocaleProvider locale="ar-EG">
      <Steps.Root count={3} defaultStep={1} dir="rtl">
        <Steps.List aria-label="مراحل الإعداد">
          <For each={["الحساب", "التفاصيل", "المراجعة"]}>
            {(title, index) => (
              <Steps.Item key={title} index={index}>
                <Steps.Trigger>
                  <Steps.Indicator />
                  <Steps.Title>{title}</Steps.Title>
                </Steps.Trigger>
                <Steps.Separator />
              </Steps.Item>
            )}
          </For>
        </Steps.List>
      </Steps.Root>
    </LocaleProvider>
  );
}
