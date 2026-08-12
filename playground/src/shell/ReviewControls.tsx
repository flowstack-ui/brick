import { Toolbar } from "@flowstack-ui/brick";
import type { Appearance, Direction, Theme } from "../shared/appearance.js";

export function ReviewControls({ appearance, direction, onAppearanceChange, onDirectionChange, onThemeChange, theme }: {
  appearance: Appearance;
  direction: Direction;
  onAppearanceChange: (appearance: Appearance) => void;
  onDirectionChange: (direction: Direction) => void;
  onThemeChange: (theme: Theme) => void;
  theme: Theme;
}) {
  return (
    <Toolbar.Root ariaLabel="Review controls" className="review-controls" size="sm" variant="plain">
      <Toolbar.ToggleGroup ariaLabel="Appearance" onValueChange={(value) => {
        if (value === "system" || value === "light" || value === "dark") onAppearanceChange(value);
      }} type="single" value={appearance}>
        {(["system", "light", "dark"] as const).map((value) => <Toolbar.ToggleItem key={value} value={value}>{value}</Toolbar.ToggleItem>)}
      </Toolbar.ToggleGroup>
      <Toolbar.Separator orientation="vertical" />
      <Toolbar.ToggleGroup ariaLabel="Theme" onValueChange={(value) => {
        if (value === "brick" || value === "qualification") onThemeChange(value);
      }} type="single" value={theme}>
        <Toolbar.ToggleItem value="brick">Brick</Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="qualification">Qualification</Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator orientation="vertical" />
      <Toolbar.ToggleGroup ariaLabel="Direction" onValueChange={(value) => {
        if (value === "ltr" || value === "rtl") onDirectionChange(value);
      }} type="single" value={direction}>
        <Toolbar.ToggleItem value="ltr">LTR</Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="rtl">RTL</Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
}
