import { createElement, createRef } from "react";
import { Alert, type AlertRootProps } from "../../../src/alert.js";
createElement(Alert.Root, { status: "error", tone: "danger", ref: createRef<HTMLElement>(), role: "alert" });
// @ts-expect-error Palette and status vocabularies are separate.
const bad: AlertRootProps = { status: "danger" };
// @ts-expect-error Dismissal is application-owned.
const close: AlertRootProps = { onClose: () => {} };
// @ts-expect-error Recipe values are scalar.
const responsive: AlertRootProps = { size: { lg: "lg" } };
void [bad, close, responsive];
// @ts-expect-error Host projection requires one element child.
const missingHost: AlertRootProps = { asChild: true };
void missingHost;
