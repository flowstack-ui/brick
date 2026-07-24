import { Fieldset, ToggleGroup } from "@flowstack-ui/brick";
import type { Appearance, Direction } from "../shared/appearance.js";

export function ReviewControls({
  appearance,
  direction,
  onAppearanceChange,
  onDirectionChange,
}: {
  appearance: Appearance;
  direction: Direction;
  onAppearanceChange: (appearance: Appearance) => void;
  onDirectionChange: (direction: Direction) => void;
}) {
  return (
    <div aria-label="Review controls" className="review-controls">
      <Fieldset.Root className="review-control-group">
        <Fieldset.Legend>Appearance</Fieldset.Legend>
        <ToggleGroup.Root
          attached
          onValueChange={(value) => {
            if (value === "system" || value === "light" || value === "dark") {
              onAppearanceChange(value);
            }
          }}
          size="sm"
          type="single"
          value={appearance}
          variant="outline"
        >
          {(["system", "light", "dark"] as const).map((value) => (
            <ToggleGroup.Item key={value} value={value}>
              {value}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </Fieldset.Root>
      <Fieldset.Root className="review-control-group">
        <Fieldset.Legend>Direction</Fieldset.Legend>
        <ToggleGroup.Root
          attached
          onValueChange={(value) => {
            if (value === "ltr" || value === "rtl") {
              onDirectionChange(value);
            }
          }}
          size="sm"
          type="single"
          value={direction}
          variant="outline"
        >
          <ToggleGroup.Item value="ltr">
            LTR
          </ToggleGroup.Item>
          <ToggleGroup.Item value="rtl">
            RTL
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </Fieldset.Root>
    </div>
  );
}
