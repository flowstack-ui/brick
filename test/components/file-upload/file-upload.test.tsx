import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../src/field.js";
import { FileUpload } from "../../../src/file-upload.js";

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
