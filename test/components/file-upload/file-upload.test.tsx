import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { FileUpload } from "../../../src/file-upload.js";
import { IconButton } from "../../../src/icon-button.js";

function Upload({ onFilesChange = vi.fn() }: { onFilesChange?: (files: File[]) => void }) {
  return (
    <FileUpload.Root accept="image/*" multiple onFilesChange={onFilesChange}>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <span>Drop images here</span>
        <FileUpload.Trigger />
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        {(file, index) => (
          <FileUpload.Item file={file} index={index} key={`${file.name}-${index}`}>
            <FileUpload.ItemName />
            <FileUpload.ItemSize />
            <FileUpload.ItemDeleteTrigger />
          </FileUpload.Item>
        )}
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
}

describe("File Upload", () => {
  it("exposes non-clickable dropzone styling without disabling its browse action", async () => {
    const user = userEvent.setup();
    const { container } = render(<FileUpload.Root><FileUpload.HiddenInput />
      <FileUpload.Dropzone disableClick aria-label="Drop files"><FileUpload.Trigger>Browse</FileUpload.Trigger></FileUpload.Dropzone>
    </FileUpload.Root>);
    const zone = screen.getByRole("group", { name: "Drop files" });
    const click = vi.spyOn(container.querySelector("input")!, "click").mockImplementation(() => {});
    expect(zone).toHaveAttribute("data-click-disabled", "");
    await user.click(zone); expect(click).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Browse" })); expect(click).toHaveBeenCalledTimes(1);
  });
  it("shares Button recipes and composes one icon action without uploader paint", async () => {
    const user = userEvent.setup();
    const { container } = render(<FileUpload.Root><FileUpload.HiddenInput />
      <FileUpload.Trigger size={{ initial: "xs", md: "lg" }} tone="danger" variant="subtle" radius="sm">Choose document</FileUpload.Trigger>
      <FileUpload.Trigger asChild><IconButton aria-label="Choose image" variant="ghost" size="xs"><svg /></IconButton></FileUpload.Trigger>
    </FileUpload.Root>);
    const text = screen.getByRole("button", { name: "Choose document" });
    expect(text).toHaveClass("brick-button"); expect(text).toHaveAttribute("data-variant", "subtle");
    expect(text).toHaveAttribute("data-tone", "danger"); expect(text).toHaveAttribute("data-size", "xs");
    expect(container.querySelector("button button")).toBeNull();
    expect(container.querySelector(".brick-file-upload__trigger")).toBeNull();
    const input = container.querySelector("input")!;
    const click = vi.spyOn(input, "click").mockImplementation(() => {});
    const icon = screen.getByRole("button", { name: "Choose image" });
    await user.click(icon); expect(click).toHaveBeenCalledTimes(1);
    icon.focus(); await user.keyboard("{Enter}"); expect(click).toHaveBeenCalledTimes(2);
    await user.keyboard(" "); expect(click).toHaveBeenCalledTimes(3);
  });

  it("provides ready-made list, clear, and filename text", async () => {
    const user = userEvent.setup();
    const file = new File(["hello"], "notes.txt", { type: "text/plain" });
    render(<FileUpload.Root defaultFiles={[file]}><FileUpload.HiddenInput /><FileUpload.Trigger />
      <FileUpload.FileText /><FileUpload.List /><FileUpload.ClearTrigger size="sm">Clear selection</FileUpload.ClearTrigger>
    </FileUpload.Root>);
    expect(screen.getAllByText("notes.txt")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Remove notes.txt" })).toHaveClass("brick-icon-button");
    await user.click(screen.getByRole("button", { name: "Clear files" }));
    expect(screen.getByText("No file selected")).toBeVisible(); expect(screen.queryByRole("listitem")).toBeNull();
  });

  it("honors authored cancellation and prevents disabled/read-only picking", async () => {
    const user = userEvent.setup();
    const { container, rerender } = render(<FileUpload.Root><FileUpload.HiddenInput /><FileUpload.Trigger onClick={event => event.preventDefault()}>Choose</FileUpload.Trigger></FileUpload.Root>);
    const click = vi.spyOn(container.querySelector("input")!, "click").mockImplementation(() => {});
    await user.click(screen.getByRole("button", { name: "Choose" })); expect(click).not.toHaveBeenCalled();
    rerender(<FileUpload.Root readOnly><FileUpload.HiddenInput /><FileUpload.Trigger>Choose</FileUpload.Trigger></FileUpload.Root>);
    expect(screen.getByRole("button", { name: "Choose" })).toBeDisabled();
  });
  it("adapts every Atom part with visual defaults and default actions", async () => {
    const user = userEvent.setup();
    const onFilesChange = vi.fn();
    const { container } = render(<Upload onFilesChange={onFilesChange} />);
    const root = container.querySelector(".brick-file-upload")!;
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).toHaveAttribute("data-shape", "rounded");
    expect(root).toHaveAttribute("data-full-width", "");
    expect(screen.getByRole("button", { name: "Choose files" })).toBeVisible();
    const image = new File(["image"], "receipt.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [image] } });
    expect(onFilesChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText("receipt.png")).toBeVisible();
    expect(screen.getByText("5 B")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Remove receipt.png" }));
    expect(screen.queryByText("receipt.png")).not.toBeInTheDocument();
  });

  it("inherits one Field label, description, error, and state", () => {
    const { container } = render(
      <Field.Root id="attachments" invalid required>
        <Field.Label>Attachments</Field.Label>
        <FileUpload.Root name="attachments">
          <FileUpload.HiddenInput />
          <FileUpload.Dropzone><FileUpload.Trigger>Browse device</FileUpload.Trigger></FileUpload.Dropzone>
        </FileUpload.Root>
        <Field.Description>PDF or image, up to 5 MB.</Field.Description>
        <Field.Error>Add an attachment.</Field.Error>
      </Field.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Attachments Browse device" });
    const input = container.querySelector('input[type="file"]')!;
    expect(container.querySelectorAll("label")).toHaveLength(1);
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("aria-describedby", "attachments-description attachments-error");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("keeps rejected-file feedback separate from Field invalidity", async () => {
    const user = userEvent.setup();
    const onRejectedFilesChange = vi.fn();
    const { container } = render(
      <FileUpload.Root accept="image/*" onRejectedFilesChange={onRejectedFilesChange}>
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone><FileUpload.Trigger /></FileUpload.Dropzone>
      </FileUpload.Root>,
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const text = new File(["notes"], "notes.txt", { type: "text/plain" });
    fireEvent.change(input, { target: { files: [text] } });
    expect(onRejectedFilesChange).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".brick-file-upload")).toHaveAttribute("data-rejected", "");
    expect(container.querySelector(".brick-file-upload")).not.toHaveAttribute("data-invalid");
  });
});
