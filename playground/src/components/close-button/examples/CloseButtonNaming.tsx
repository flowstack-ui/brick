import { CloseButton, LocaleProvider } from "@flowstack-ui/brick";

export function CloseButtonNaming() {
  return (
    <LocaleProvider locale="fr" localeText={{ close: "Fermer" }}>
      <CloseButton />
      <CloseButton aria-label="Dismiss notice" />
    </LocaleProvider>
  );
}
