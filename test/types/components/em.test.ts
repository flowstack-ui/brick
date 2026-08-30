import { Em, type EmProps } from "../../../src/em.js";

const props: EmProps = {
  children: "carefully",
  className: "consumer-em",
  slot: "stress",
};
void Em;
void props;

// @ts-expect-error Em keeps native emphasis semantics.
const invalidHost: EmProps = { as: "span", children: "carefully" };
// @ts-expect-error Em does not expose a decorative variant system.
const invalidVariant: EmProps = { variant: "accent", children: "carefully" };
void invalidHost;
void invalidVariant;
