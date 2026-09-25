import { StrictMode, useState } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "@flowstack-ui/brick";

// Qualification-only document host, deliberately separate from the docs examples.
export function TooltipEnvironment() {
  const [body, setBody] = useState<HTMLElement | null>(null);
  return <>
    <iframe title="Tooltip owner document" srcDoc="<!doctype html><html><body></body></html>"
      width="480" height="280"
      onLoad={event => setBody(event.currentTarget.contentDocument!.body)} />
    {body && createPortal(<StrictMode><FrameTooltip body={body} /></StrictMode>, body)}
  </>;
}

function FrameTooltip({ body }: { body: HTMLElement }) {
  const [boundary, setBoundary] = useState<HTMLDivElement | null>(null);
  const [exits, setExits] = useState(0);
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  return <div ref={setBoundary} style={{ width: 240, height: 180, overflow: "hidden", position: "relative" }}>
    <output data-testid="exits">{exits}</output>
    <output data-testid="content-ref">{node?.tagName ?? "none"}</output>
    <Tooltip.Root openDelay={0} immediate unmountOnExit={false}
      onExitComplete={() => setExits(value => value + 1)}
      positioning={{ placement: "right", boundary: () => boundary ?? body, fitViewport: true }}>
      <Tooltip.Trigger asChild><button>Frame hint</button></Tooltip.Trigger>
      <Tooltip.Portal container={body}>
        <Tooltip.Content asChild ref={setNode}>
          <div>Owner document tooltip</div>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </div>;
}
