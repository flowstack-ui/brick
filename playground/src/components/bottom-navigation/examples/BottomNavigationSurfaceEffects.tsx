import { BottomNavigation } from "@flowstack-ui/brick";

export function BottomNavigationSurfaceEffects() {
  // Diagnostic artwork makes the difference between blur and plain alpha visible.
  return (
    <div
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #587cbd 0 24px, #d9b78b 24px 48px)",
        padding: "1.5rem",
      }}
    >
      <BottomNavigation.Root
        position="static"
        variant="surface"
        treatment="translucent"
        backgroundOpacity={0.82}
        backdropBlur="18px"
        borderOpacity={0.5}
        aria-label="Workspace views"
      >
        <BottomNavigation.Item value="projects" href="#projects">
          <BottomNavigation.Label>Projects</BottomNavigation.Label>
        </BottomNavigation.Item>
        <BottomNavigation.Item value="activity" href="#activity">
          <BottomNavigation.Label>Activity</BottomNavigation.Label>
        </BottomNavigation.Item>
      </BottomNavigation.Root>
    </div>
  );
}
