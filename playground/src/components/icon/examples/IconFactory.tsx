import { createIcon, HStack, Text } from "@flowstack-ui/brick";
const MilestoneIcon = createIcon({
  displayName: "MilestoneIcon",
  viewBox: "0 0 32 32",
  path: (
    <>
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m9 16 5 5 9-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
});
export function IconFactory() {
  return (
    <HStack gap={2}>
      <MilestoneIcon tone="success" />
      <Text>Milestone complete</Text>
    </HStack>
  );
}
