import { AppBar, Paragraph, Button } from "@flowstack-ui/brick";

export function AppBarSurfaceEffects() {
  // Diagnostic artwork makes the difference between blur and plain alpha visible.
  return (
    <div
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #587cbd 0 24px, #d9b78b 24px 48px)",
        padding: "1.5rem",
      }}
    >
      <AppBar.Root
        treatment="translucent"
        backgroundOpacity={0.82}
        backdropBlur="18px"
        backdropSaturate={1.1}
        borderOpacity={0.5}
      >
        <AppBar.Toolbar>
          <AppBar.Start>
            <Paragraph>Project workspace</Paragraph>
          </AppBar.Start>
          <AppBar.End>
            <Button>Account</Button>
          </AppBar.End>
        </AppBar.Toolbar>
      </AppBar.Root>
    </div>
  );
}
