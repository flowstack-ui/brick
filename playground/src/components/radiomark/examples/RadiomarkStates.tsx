import { Radiomark, HStack, VStack, Text } from "@flowstack-ui/brick";
export function RadiomarkStates() {
  return (
    <HStack gap={6} wrap>
      {[
        { label: "Unchecked" },
        { label: "Checked", checked: true },
        { label: "Disabled", checked: true, disabled: true },
        { label: "Invalid", invalid: true },
      ].map(({ label, ...state }) => (
        <VStack key={label} align="start" gap={2}>
          <Radiomark {...state} />
          <Text variant="body-sm">{label}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
