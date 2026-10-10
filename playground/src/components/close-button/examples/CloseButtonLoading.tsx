import { CloseButton, HStack, Spinner } from "@flowstack-ui/brick";

export function CloseButtonLoading() {
  return (
    <HStack gap="3">
      <CloseButton aria-label="Working" loading></CloseButton>
      <CloseButton
        aria-label="Unavailable working"
        loading
        disabled
      ></CloseButton>
      <CloseButton
        aria-label="Custom working"
        loading
        spinner={<Spinner size="inherit" />}
      ></CloseButton>
    </HStack>
  );
}
