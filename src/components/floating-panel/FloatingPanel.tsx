"use client";

import { forwardRef } from "react";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { FloatingPanel as AtomFloatingPanel, useFloatingPanel as useAtomFloatingPanel,
  type FloatingPanelRootProps, type FloatingPanelOptions, type FloatingPanelPartProps,
  type FloatingPanelResizeTriggerProps, type FloatingPanelResizeTriggersProps } from "@flowstack-ui/atom/floating-panel";
import { For } from "../for/For.js";

export type { FloatingPanelRootProps, FloatingPanelRootProviderProps, FloatingPanelOptions, FloatingPanelController,
  FloatingPanelContextProps, FloatingPanelPartProps, FloatingPanelButtonProps, FloatingPanelStageTriggerProps,
  FloatingPanelResizeTriggerProps, FloatingPanelResizeTriggersProps, FloatingPanelPoint, FloatingPanelSize,
  FloatingPanelStage, FloatingPanelAxis, FloatingPanelChangeDetails, FloatingPanelChangeReason,
  FloatingPanelFocusTarget } from "@flowstack-ui/atom/floating-panel";
export { useFloatingPanelContext } from "@flowstack-ui/atom/floating-panel";

const minimum = { width: 240, height: 100 };
const cx = (base: string, className?: string) => className ? `${base} ${className}` : base;
export function useFloatingPanel(options: FloatingPanelOptions = {}) { return useAtomFloatingPanel({ minSize: minimum, ...options }); }
export function FloatingPanelRoot(props: FloatingPanelRootProps) { return <AtomFloatingPanel.Root minSize={minimum} {...props} />; }
export const FloatingPanelRootProvider = AtomFloatingPanel.RootProvider;
export const FloatingPanelContext = AtomFloatingPanel.Context;
export const FloatingPanelPortal = AtomFloatingPanel.Portal;
export const FloatingPanelTrigger = AtomFloatingPanel.Trigger;
export const FloatingPanelStageTrigger = AtomFloatingPanel.StageTrigger;
export const FloatingPanelCloseTrigger = AtomFloatingPanel.CloseTrigger;
function styled(Part: typeof AtomFloatingPanel.Content, className: string) {
  return forwardRef<HTMLDivElement, FloatingPanelPartProps>(function StyledPart({ className: extra, ...props }, ref) {
    return <Part {...props} ref={ref} className={cx(className, extra)} />;
  });
}
export const FloatingPanelPositioner = styled(AtomFloatingPanel.Positioner, "brick-floating-panel-positioner");
export type FloatingPanelContentProps = FloatingPanelPartProps & { radius?: Radius };
export const FloatingPanelContent = forwardRef<HTMLDivElement, FloatingPanelContentProps>(function FloatingPanelContent({className, radius, style, ...props}, ref) {
  return <AtomFloatingPanel.Content {...props} ref={ref} style={radiusStyle(radius, "--brick-floating-panel-radius", style)} className={cx("brick-floating-panel-content", className)} />;
});
export const FloatingPanelHeader = styled(AtomFloatingPanel.Header, "brick-floating-panel-header");
export const FloatingPanelBody = styled(AtomFloatingPanel.Body, "brick-floating-panel-body");
export const FloatingPanelTitle = styled(AtomFloatingPanel.Title, "brick-floating-panel-title");
export const FloatingPanelDescription = styled(AtomFloatingPanel.Description, "brick-floating-panel-description");
export const FloatingPanelControl = styled(AtomFloatingPanel.Control, "brick-floating-panel-control");
export const FloatingPanelDragTrigger = styled(AtomFloatingPanel.DragTrigger, "brick-floating-panel-drag-trigger");
export const FloatingPanelResizeTrigger = forwardRef<HTMLDivElement, FloatingPanelResizeTriggerProps>(function FloatingPanelResizeTrigger({className,...props},ref) {
  return <AtomFloatingPanel.ResizeTrigger {...props} ref={ref} className={cx("brick-floating-panel-resize-trigger",className)} />;
});
export function FloatingPanelResizeTriggers({axes=["n","s","e","w","ne","nw","se","sw"]}:FloatingPanelResizeTriggersProps) {
  return <For each={axes}>{axis=><FloatingPanelResizeTrigger key={axis} axis={axis} />}</For>;
}
export const FloatingPanel = { Root:FloatingPanelRoot, RootProvider:FloatingPanelRootProvider, Context:FloatingPanelContext,
  Portal:FloatingPanelPortal, Trigger:FloatingPanelTrigger, Positioner:FloatingPanelPositioner, Content:FloatingPanelContent,
  Header:FloatingPanelHeader, Body:FloatingPanelBody, Title:FloatingPanelTitle, Description:FloatingPanelDescription,
  Control:FloatingPanelControl, DragTrigger:FloatingPanelDragTrigger, StageTrigger:FloatingPanelStageTrigger,
  CloseTrigger:FloatingPanelCloseTrigger, ResizeTrigger:FloatingPanelResizeTrigger, ResizeTriggers:FloatingPanelResizeTriggers } as const;
