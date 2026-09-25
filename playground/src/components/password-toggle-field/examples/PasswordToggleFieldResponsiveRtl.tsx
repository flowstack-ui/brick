import {
  Field,
  Grid,
  LocaleProvider,
  PasswordToggleField,
} from "@flowstack-ui/brick";

export function PasswordToggleFieldResponsiveRtl() {
  return (
    <Grid.Root columns={{ initial: 1, md: 2 }} gap={6}>
      <Field.Root>
        <Field.Label>Responsive password</Field.Label>
        <PasswordToggleField.Root
          size={{ initial: "sm", md: "lg" }}
          variant={{ initial: "underline", md: "surface" }}
        >
          <PasswordToggleField.Input autoComplete="current-password" />
          <PasswordToggleField.Toggle />
        </PasswordToggleField.Root>
      </Field.Root>
      <LocaleProvider
        locale="ar"
        localeText={{
          hidePassword: "إخفاء كلمة المرور",
          showPassword: "إظهار كلمة المرور",
        }}
      >
        <div dir="rtl">
          <Field.Root>
            <Field.Label>كلمة المرور</Field.Label>
            <PasswordToggleField.Root>
              <PasswordToggleField.Input autoComplete="current-password" />
              <PasswordToggleField.Toggle />
            </PasswordToggleField.Root>
          </Field.Root>
        </div>
      </LocaleProvider>
    </Grid.Root>
  );
}
