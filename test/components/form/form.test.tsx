import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Form } from "../../../src/form.js";

describe("Form", () => {
  it("owns the native form surface and composition", () => {
    const ref = createRef<HTMLFormElement>();
    const onReset = vi.fn();
    const { rerender } = render(
      <Form
        action="/profiles"
        aria-label="Profile"
        autoComplete="off"
        className="consumer-form"
        data-slot="profile-form"
        encType="multipart/form-data"
        method="post"
        name="profile"
        noValidate
        onReset={onReset}
        ref={ref}
        style={{ paddingTop: 2 }}
        target="_self"
      >
        <button type="reset">Reset</button>
      </Form>,
    );
    expect(ref.current).toHaveClass("brick-form", "consumer-form");
    expect(ref.current).toHaveAttribute("action", "/profiles");
    expect(ref.current).toHaveAttribute("method", "post");
    expect(ref.current).toHaveAttribute("enctype", "multipart/form-data");
    expect(ref.current).toHaveAttribute("data-slot", "profile-form");
    expect(ref.current).toHaveStyle({ paddingTop: "2px" });
    fireEvent.reset(ref.current!);
    expect(onReset).toHaveBeenCalledOnce();

    rerender(
      <Form asChild><form data-adapter="as-child"><button>Save</button></form></Form>,
    );
    expect(screen.getByRole("button", { name: "Save" }).closest("form")).toHaveClass(
      "brick-form",
    );
    rerender(
      <Form render={<form data-adapter="render" />}><button>Render save</button></Form>,
    );
    expect(
      screen.getByRole("button", { name: "Render save" }).closest("form"),
    ).toHaveAttribute("data-adapter", "render");
  });

  it("owns async validation, submit state, submitted state, and reset", async () => {
    let finishSubmit!: () => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishSubmit = resolve;
        }),
    );
    const validateOnSubmit = vi.fn(() => true);
    render(
      <Form aria-label="Async profile" onSubmit={onSubmit} preventDefaultOnSubmit validateOnSubmit={validateOnSubmit}>
        <button type="submit">Save</button>
        <button type="reset">Reset</button>
      </Form>,
    );
    const form = screen.getByRole("form", { name: "Async profile" });
    fireEvent.submit(form);
    await waitFor(() => expect(form).toHaveAttribute("data-submitting"));
    expect(validateOnSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledOnce();
    finishSubmit();
    await waitFor(() => expect(form).toHaveAttribute("data-submitted"));
    fireEvent.reset(form);
    await waitFor(() => expect(form).not.toHaveAttribute("data-submitted"));
  });

  it("blocks submission when authored validation fails", async () => {
    const onSubmit = vi.fn();
    render(
      <Form aria-label="Invalid form" onSubmit={onSubmit} preventDefaultOnSubmit validateOnSubmit={() => false}>
        <button type="submit">Save</button>
      </Form>,
    );
    const form = screen.getByRole("form", { name: "Invalid form" });
    fireEvent.submit(form);
    await waitFor(() => expect(form).toHaveAttribute("data-invalid"));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
