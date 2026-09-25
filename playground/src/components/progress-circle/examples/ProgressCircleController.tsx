import {
  VStack,
  HStack,
  Button,
  ProgressCircle,
  useProgress,
} from "@flowstack-ui/brick";

export function ProgressCircleController() {
  const progress = useProgress({ defaultValue: 20 });
  return (
    <VStack gap="4">
      <ProgressCircle.RootProvider value={progress} size="xl">
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Indicator />
        </ProgressCircle.Circle>
        <ProgressCircle.Value />
        <ProgressCircle.Label>Upload</ProgressCircle.Label>
      </ProgressCircle.RootProvider>
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
        <Button size="sm" variant="ghost" onClick={() => progress.setValue(0)}>
          Reset
        </Button>
      </HStack>
    </VStack>
  );
}
