import { createElement, createRef } from "react";
import { Alert, type AlertRootProps } from "../../../src/alert.js";
createElement(Alert.Root, { status: "error", tone: "danger", ref: createRef<HTMLElement>(), role: "alert" });
// @ts-expect-error Palette and status vocabularies are separate.
const bad: AlertRootProps = { status: "danger" };
// @ts-expect-error Dismissal is application-owned.
const close: AlertRootProps = { onClose: () => {} };
const responsive: AlertRootProps = { size: { lg: "lg" } };
const visual: AlertRootProps = { variant: { sm: "outline", lg: "soft" }, inline: { md: true, xl: false }, align: { lg: "center" }, radius: "control", accentStart: true };
// @ts-expect-error Status remains scalar semantic intent.
const status: AlertRootProps = { status: { md: "error" } };
// @ts-expect-error Radius only accepts shared tokens.
const radius: AlertRootProps = { radius: "13px" };
// @ts-expect-error Responsive recipe objects cannot be empty.
const empty: AlertRootProps = { size: {} };
void [visual, status, radius, empty];
void [bad, close, responsive];
// @ts-expect-error Host projection requires one element child.
const missingHost: AlertRootProps = { asChild: true };
void missingHost;
