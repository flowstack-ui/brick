import { createElement, createRef } from "react";
import {
  Toast,
  Toaster,
  toast,
  createToaster,
  type ToastApi,
  type ToastOptions,
  type ToastPosition,
  type ToastStacking,
  type ToastType,
  type ToastWidth,
} from "../../../src/toast.js";
import { Toaster as RootToaster } from "../../../src/index.js";

const ref = createRef<HTMLDivElement>();
const positions: ToastPosition[] = ["top-start", "top-center", "top-end", "bottom-start", "bottom-center", "bottom-end"];
const types: ToastType[] = ["default", "success", "error", "warning", "info", "loading"];
const widths: ToastWidth[] = ["responsive", "compact", "full"];
const stacking: ToastStacking[] = ["separated", "overlap"];
const api: ToastApi = toast;
const scoped = createToaster({ duration: 6000, removeDelay: 200 });
createElement(Toaster, { toaster: scoped, variant: "solid", tone: "accent", radius: "sm", gap: { initial: 2, md: 4 }, offsetInlineEnd: 6 });
scoped.pause(); scoped.resume(); scoped.remove("id"); scoped.expand(); scoped.collapse();
scoped("Saved", { onStatusChange: ({ status }) => void status, variant: "surface", tone: "contrast" });
const tracked: Promise<number> = scoped.track(() => Promise.resolve(1), { loading: "Loading", success: "Saved", error: "Failed" }).unwrap();
void tracked;
// @ts-expect-error arbitrary color strings are not tones
createElement(Toaster, { tone: "purple" });
const options: ToastOptions = { title: "Saved", description: "Available in history", action: { label: "View", onClick() {} }, icon: createElement("span") };
createElement(Toaster, { ref, position: "bottom-end", width: "full", stacking: "overlap", swipeDirection: "left", className: "custom" });
createElement(RootToaster, { portalDisabled: true });
createElement(Toast.Root, { type: "success" }, createElement(Toast.Icon, { type: "success" }), createElement(Toast.Content, null, createElement(Toast.Title, null, "Saved")));
api(options);
api.success("Saved", { description: "Done" });
const promise: Promise<number> = api.promise(Promise.resolve(1), { loading: "Loading", success: (value) => `${value}`, error: "Failed" });
api.update("id", { title: "Updated" });
// @ts-expect-error physical positions are excluded
createElement(Toaster, { position: "bottom-right" });
// @ts-expect-error custom types are excluded
api("Message", { type: "positive" });
// @ts-expect-error cancel is not part of Brick Toast
api({ title: "Message", cancel: { label: "Cancel", onClick() {} } });
// @ts-expect-error id is immutable during update
api.update("id", { id: "replacement" });
// @ts-expect-error action requires an onClick callback
api.success("Saved", { action: { label: "View" } });
void positions; void types; void widths; void stacking; void promise;
