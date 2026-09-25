import { Popover, type PopoverDensity, type PopoverInset, type UsePopoverReturn, type PopoverRootProps } from "../../../src/popover.js";
void Popover;

const densities: PopoverDensity[] = ["comfortable", "compact"];
void densities;

// @ts-expect-error Popover density is closed.
const invalidDensity: PopoverDensity = "dense";
void invalidDensity;

const insets: PopoverInset[] = ["xs", "sm", "md", "lg"];
void insets;
const options: Omit<PopoverRootProps, "children"> = {
  positioning: { sameWidth: true, strategy: "fixed", offset: { mainAxis: 8 }, hideWhenDetached: true },
  lazyMount: true, unmountOnExit: false, hideMode: "activity",
  ids: { trigger: value => `trigger-${value}`, content: "settings" },
  onPointerDownOutside: event => event.preventDefault(),
};
void options;
function checkController(controller: UsePopoverReturn) {
  controller.setOpen(false);
  controller.reposition();
  // @ts-expect-error Controller state is read-only.
  controller.open = true;
  // @ts-expect-error Internal mutable refs are not public controller API.
  void controller.triggerRef;
}
void checkController;
