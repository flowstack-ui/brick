import {
  Frame,
  VStack,
  HStack,
  Button,
  Progress,
  useProgress,
} from "@flowstack-ui/brick";

export function ProgressController() {
  const progress = useProgress({ defaultValue: 20 });
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="4">
        <Progress.RootProvider value={progress}>
          <Progress.Label>Upload</Progress.Label>
          <Progress.Value />
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.RootProvider>
        <HStack gap="2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              progress.setValue(Math.min(100, (progress.value ?? 0) + 10))
            }
          >
            Advance
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => progress.setValue(0)}
          >
            Reset
          </Button>
        </HStack>
      </VStack>
    </Frame>
  );
}
