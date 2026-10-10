import assert from "node:assert/strict";
import React, { act, createRef } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { JSDOM } from "jsdom";
import { Timeline, TimelinePropsProvider } from "@flowstack-ui/brick";
import {
  Timeline as SubpathTimeline,
  TimelineRootPropsProvider,
} from "@flowstack-ui/brick/timeline";

assert.equal(Timeline, SubpathTimeline);
assert.equal(TimelinePropsProvider, TimelineRootPropsProvider);
const h = React.createElement;
const major = Number(React.version.split(".")[0]);
const forwarded = createRef();
let attached = 0,
  cleaned = 0,
  clicks = 0;
const childRef = (node) => {
  if (node) {
    attached++;
    if (major >= 19)
      return () => {
        cleaned++;
      };
  } else cleaned++;
};
function Example({ tag = "article" }) {
  return h(
    Timeline.PropsProvider,
    { value: { variant: "subtle", size: { md: "xl" }, layout: "compact" } },
    h(
      Timeline.Root,
      { "aria-label": "History" },
      h(
        Timeline.Item,
        { tone: "success" },
        h(
          Timeline.Connector,
          null,
          h(Timeline.Indicator, null, "1"),
          h(Timeline.Separator),
        ),
        h(
          Timeline.Content,
          {
            asChild: true,
            ref: forwarded,
            onClick: () => {
              clicks++;
            },
          },
          h(
            tag,
            {
              ref: childRef,
              onClick: () => {
                clicks++;
              },
            },
            h(Timeline.Title, null, "Delivered"),
          ),
        ),
      ),
    ),
  );
}
const markup = renderToString(h(Example));
assert.match(markup, /data-variant="subtle"/);
assert.match(markup, /data-size="md"/);
assert.match(markup, /data-size-md="xl"/);
assert.match(markup, /data-layout="compact"/);
assert.match(markup, /<ol/);
assert.match(markup, /<li/);
const dom = new JSDOM(`<div id="app">${markup}</div>`, {
  url: "http://localhost",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const errors = [];
let root;
await act(async () => {
  root = hydrateRoot(document.getElementById("app"), h(Example), {
    onRecoverableError: (error) => errors.push(error),
  });
});
assert.equal(forwarded.current.tagName, "ARTICLE");
await act(async () =>
  forwarded.current.dispatchEvent(
    new window.MouseEvent("click", { bubbles: true }),
  ),
);
assert.equal(clicks, 2);
await act(async () => root.render(h(Example, { tag: "section" })));
assert.equal(forwarded.current.tagName, "SECTION");
await act(async () => root.unmount());
assert.equal(forwarded.current, null);
assert.equal(attached, cleaned);
assert.equal(errors.length, 0);
dom.window.close();
console.log(
  `Timeline React ${React.version}: root/subpath exports, provider SSR, hydration, events, replacement and ref cleanup passed.`,
);
