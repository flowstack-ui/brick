export const componentIds = [
  "alert-dialog",
  "app-bar",
  "avatar",
  "badge",
  "button",
  "card",
  "checkbox",
  "checkbox-group",
  "dialog",
  "drawer",
  "field",
  "fieldset",
  "form",
  "hover-card",
  "icon-button",
  "notification-badge",
  "popover",
  "toggle",
  "toggle-group",
  "tooltip",
];

export function componentTestPaths(componentId) {
  return {
    browser: `playground/tests/components/${componentId}/behavior.spec.ts`,
    types: `test/types/components/${componentId}.test.ts`,
    unit: `test/components/${componentId}/${componentId}.test.tsx`,
  };
}
