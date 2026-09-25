import { readFileSync } from "node:fs";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "../evidence-test.js";
import {
  Input,
  Textarea,
  NativeSelect,
  Select,
  MultiSelect,
  NumberInput,
  PasswordToggleField,
  PinInput,
  Checkbox,
  Switch,
  Button,
  TagsInput,
  Combobox,
  ColorPicker,
  FileUpload,
  Rating,
  DateInput,
  Editable,
  Calendar,
  CheckboxCard,
  RadioCard,
  RadioGroup,
  Slider,
  parseDate,
} from "../../../dist/index.js";

const css = readFileSync(
  new URL("../../../dist/styles.css", import.meta.url),
  "utf8",
);
const cases = [
  {
    id: "input",
    boundary: ".brick-input",
    hit: "input",
    render: (disabled: boolean, variant: any) =>
      h(Input, { disabled, variant, defaultValue: "Example" }),
  },
  {
    id: "textarea",
    boundary: ".brick-textarea",
    hit: "textarea",
    render: (disabled: boolean, variant: any) =>
      h(Textarea.Root, { disabled, variant, defaultValue: "Example" }),
  },
  {
    id: "native-select",
    boundary: ".brick-native-select",
    hit: "select",
    render: (disabled: boolean, variant: any) =>
      h(
        NativeSelect.Root,
        { disabled, variant, children: null },
        h(NativeSelect.Field, null, h("option", null, "Example")),
        h(NativeSelect.Indicator),
      ),
  },
  {
    id: "select",
    boundary: ".brick-select-trigger",
    hit: "button",
    render: (disabled: boolean, variant: any) =>
      h(
        Select.Root,
        { disabled, variant, children: null },
        h(
          Select.Trigger,
          null,
          h(Select.Value, { placeholder: "Example" }),
        ),
      ),
  },
  {
    id: "multi-select",
    boundary: ".brick-multi-select-trigger",
    hit: "button",
    render: (disabled: boolean, variant: any) =>
      h(
        MultiSelect.Root,
        { disabled, variant, children: null },
        h(
          MultiSelect.Trigger,
          null,
          h(MultiSelect.Value, { placeholder: "Example" }),
        ),
      ),
  },
  {
    id: "number-input",
    boundary: ".brick-number-input",
    hit: "input:not([type=hidden])",
    render: (disabled: boolean, variant: any) =>
      h(
        NumberInput.Root,
        { disabled, variant, defaultValue: 3 },
        h(NumberInput.Input),
        h(NumberInput.Control),
      ),
  },
  {
    id: "password",
    boundary: ".brick-password-toggle-field",
    hit: "input",
    render: (disabled: boolean, variant: any) =>
      h(
        PasswordToggleField.Root,
        { disabled, variant, children: null },
        h(PasswordToggleField.Input),
        h(PasswordToggleField.Toggle),
      ),
  },
  {
    id: "pin",
    boundary: ".brick-pin-input-input",
    hit: "input:not([type=hidden])",
    render: (disabled: boolean, variant: any) =>
      h(
        PinInput.Root,
        { disabled, variant, length: 1, children: null },
        h(PinInput.Input, { index: 0 }),
      ),
  },
  {
    id: "button",
    boundary: ".brick-button",
    hit: "button",
    render: (disabled: boolean, variant: any) =>
      h(Button, { disabled, variant, children: null }, "Submit"),
  },
  {
    id: "combobox",
    boundary: ".brick-combobox-control",
    hit: "input:not([type=hidden])",
    render: (disabled: boolean, variant: any) =>
      h(
        Combobox.Root,
        { disabled, variant, options: [], children: null },
        h(Combobox.Control, null, h(Combobox.Input)),
      ),
  },
  {
    id: "tags",
    boundary: ".brick-tags-input",
    hit: ".brick-tags-input-input",
    render: (disabled: boolean, variant: any) =>
      h(
        TagsInput.Root,
        { disabled, variant, children: null },
        h(TagsInput.Control, null, h(TagsInput.Input)),
      ),
  },
  {
    id: "checkbox",
    boundary: ".brick-checkbox",
    hit: ".brick-checkbox",
    render: (disabled: boolean) =>
      h(Checkbox, { disabled, defaultChecked: true }, "Backups"),
  },
  {
    id: "switch",
    boundary: ".brick-switch",
    hit: ".brick-switch",
    render: (disabled: boolean) =>
      h(Switch.Root, { disabled, defaultChecked: true }, h(Switch.Thumb)),
  },
  {
    id: "color",
    boundary: ".brick-color-picker",
    hit: "input:not([type=hidden])",
    render: (disabled: boolean, variant: any) =>
      h(
        ColorPicker.Root,
        { disabled, variant, defaultValue: "#9333ea", children: null },
        h(
          ColorPicker.Control,
          null,
          h(ColorPicker.Input),
          h(ColorPicker.Trigger),
        ),
      ),
  },
  {
    id: "upload",
    boundary: ".brick-file-upload",
    hit: "button",
    render: (disabled: boolean) =>
      h(
        FileUpload.Root,
        { disabled, children: null },
        h(FileUpload.HiddenInput),
        h(FileUpload.Trigger, null, "Upload"),
      ),
  },
  {
    id: "rating",
    boundary: ".brick-rating",
    hit: ".brick-rating__item",
    render: (disabled: boolean) =>
      h(
        Rating.Root,
        { disabled, defaultValue: 1 },
        h(Rating.Item, { value: 1 }),
      ),
  },
  {
    id: "date",
    boundary: ".brick-date-input__control",
    hit: ".brick-date-input__control",
    render: (disabled: boolean, variant: any) =>
      h(DateInput.Root, {
        disabled,
        variant,
        referenceDate: parseDate("2026-09-18"),
        "aria-label": "Date",
      }),
  },
  {
    id: "editable",
    boundary: ".brick-editable",
    hit: ".brick-editable-preview",
    render: (disabled: boolean) =>
      h(
        Editable.Root,
        { disabled, defaultValue: "Title" },
        h(Editable.Area, null, h(Editable.Preview), h(Editable.Input)),
      ),
  },
  {
    id: "calendar",
    boundary: ".brick-calendar",
    hit: ".brick-calendar button",
    render: (disabled: boolean) =>
      h(Calendar.Root, {
        disabled,
        referenceDate: parseDate("2026-09-18"),
      }),
  },
  {
    id: "checkbox-card",
    boundary: ".brick-checkbox-card",
    hit: ".brick-checkbox-card",
    render: (disabled: boolean) =>
      h(
        CheckboxCard.Root,
        { disabled, defaultChecked: true },
        h(CheckboxCard.HiddenInput),
        h(
          CheckboxCard.Control,
          null,
          h(CheckboxCard.Label, null, "Backups"),
          h(CheckboxCard.Indicator),
        ),
      ),
  },
  {
    id: "radio-card",
    boundary: ".brick-radio-card__item",
    hit: ".brick-radio-card__item",
    render: (disabled: boolean) =>
      h(
        RadioCard.Root,
        { disabled, defaultValue: "team" },
        h(
          RadioCard.Item,
          { value: "team" },
          h(RadioCard.HiddenInput),
          h(
            RadioCard.Control,
            null,
            h(RadioCard.Title, null, "Team"),
            h(RadioCard.Indicator),
          ),
        ),
      ),
  },
  {
    id: "radio-group",
    boundary: ".brick-radio-group-item",
    hit: ".brick-radio-group-item",
    render: (disabled: boolean) =>
      h(
        RadioGroup.Root,
        { disabled, defaultValue: "email" },
        h(RadioGroup.Item, { value: "email", children: "Email" }),
      ),
  },
  {
    id: "slider",
    boundary: ".brick-slider",
    hit: ".brick-slider__thumb",
    render: (disabled: boolean) =>
      h(
        Slider.Root,
        { disabled, defaultValue: 40 },
        h(
          Slider.Control,
          null,
          h(Slider.Track, null, h(Slider.Range)),
          h(Slider.Thumb),
        ),
      ),
  },
];

for (const appearance of ["light", "dark"]) {
  test(`disabled controls retain variant paint and fade exactly once (${appearance})`, async ({
    page,
  }) => {
    const children = cases.flatMap((c) =>
      ["outline", "soft"].flatMap((variant) =>
        [false, true].map((disabled) =>
          h(
            "div",
            {
              id: `${c.id}-${variant}-${disabled}`,
              key: `${c.id}-${variant}-${disabled}`,
            },
            c.render(disabled, variant),
          ),
        ),
      ),
    );
    await page.setContent(
      `<html data-brick-appearance="${appearance}"><head><style>${css}</style></head><body>${renderToStaticMarkup(h("main", null, children))}</body></html>`,
    );
    for (const c of cases)
      for (const variant of ["outline", "soft"]) {
        const enabled = page
          .locator(`#${c.id}-${variant}-false ${c.boundary}`)
          .first();
        const disabled = page
          .locator(`#${c.id}-${variant}-true ${c.boundary}`)
          .first();
        await expect(disabled, `${c.id} fade`).toHaveCSS("opacity", "0.5");
        for (const property of [
          "background-color",
          "border-top-color",
          "color",
        ]) {
          const paint = await enabled.evaluate(
            (el, p) => getComputedStyle(el).getPropertyValue(p),
            property,
          );
          await expect(disabled, `${c.id} ${property}`).toHaveCSS(
            property,
            paint,
          );
        }
        const hit = page.locator(`#${c.id}-${variant}-true ${c.hit}`).first();
        await expect(hit).toHaveCSS("cursor", "not-allowed");
        const opacity = await hit.evaluate((el) => {
          let result = 1;
          for (let node: Element | null = el; node; node = node.parentElement)
            result *= Number(getComputedStyle(node).opacity);
          return result;
        });
        expect(opacity, `${c.id} effective opacity`).toBe(0.5);
      }
  });
}

test("native fieldset inheritance paints wrappers and cannot be mistaken for read-only", async ({
  page,
}) => {
  await page.setContent(
    `<style>${css}</style>${renderToStaticMarkup(h("fieldset", { disabled: true }, h(Input), h(Textarea.Root), h(NativeSelect.Root, null, h(NativeSelect.Field, null, h("option", null, "Example")))))} `,
  );
  for (const selector of [
    ".brick-input",
    ".brick-textarea",
    ".brick-native-select",
  ])
    await expect(page.locator(selector)).toHaveCSS("opacity", "0.5");
  for (const el of await page.locator("input, textarea, select").all()) {
    await expect(el).toBeDisabled();
    await expect(el).toHaveCSS("cursor", "not-allowed");
  }
});

test("disabled Fieldset labels and controls fade independently, including forced colors", async ({
  page,
}) => {
  await page.goto("/fieldset?appearance=light");
  const region = page.locator("#disabled");
  await expect(region.locator("fieldset")).toHaveCSS("opacity", "1");
  for (const selector of [
    "legend",
    ".brick-field-label",
    ".brick-input",
    ".brick-textarea",
    ".brick-native-select",
  ]) {
    for (const el of await region.locator(selector).all())
      await expect(el).toHaveCSS("opacity", "0.5");
  }
  await page.emulateMedia({ forcedColors: "active" });
  for (const el of await region
    .locator(
      "legend, .brick-field-label, .brick-input, .brick-textarea, .brick-native-select",
    )
    .all())
    await expect(el).toHaveCSS("opacity", "1");
});
