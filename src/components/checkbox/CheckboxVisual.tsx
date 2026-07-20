import { Checkbox as AtomCheckbox } from "@flowstack-ui/atom/checkbox";

export function CheckboxVisual() {
  return (
    <span aria-hidden="true" className="brick-checkbox-control">
      <AtomCheckbox.Indicator
        className="brick-checkbox-indicator"
        data-slot="checkbox-indicator"
        forceMount
      >
        <svg
          aria-hidden="true"
          className="brick-checkbox-mark"
          focusable="false"
          viewBox="0 0 16 16"
        >
          <path
            className="brick-checkbox-check"
            d="m3.25 8.1 3.05 3.05 6.45-6.45"
          />
          <path className="brick-checkbox-mixed" d="M3.5 8h9" />
        </svg>
      </AtomCheckbox.Indicator>
    </span>
  );
}
