import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckboxGroup } from "@flowstack-ui/atom/checkbox-group";
import { Fieldset } from "../../../src/fieldset.js";

describe("Fieldset", () => {
  it("owns native grouping and descriptive relationships", () => {
    render(
      <Fieldset.Root id="topics">
        <Fieldset.Legend>Topics</Fieldset.Legend>
        <Fieldset.Description>Choose one.</Fieldset.Description>
        <CheckboxGroup.Root name="topics">
          <CheckboxGroup.Item value="news">News</CheckboxGroup.Item>
        </CheckboxGroup.Root>
      </Fieldset.Root>,
    );
    const fieldset = document.querySelector("#topics");
    expect(fieldset).toHaveClass("brick-fieldset");
    expect(fieldset).toHaveAttribute("aria-describedby", "topics-description");
  });
});
