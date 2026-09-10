import { useState } from "react";
import { Button, Field, For, IconButton, NativeSelect, Popover, Text, VStack } from "@flowstack-ui/brick";
import { usePlaygroundSettings } from "../settings/PlaygroundSettingsProvider.js";
import { settingOptions, settingsKeys } from "../settings/settings-model.js";
import { EnvironmentDiagnostics } from "../settings/EnvironmentDiagnostics.js";

const labels = { appearance: "Appearance", exampleDirection: "Example direction", theme: "Theme", accent: "Accent", radius: "Radius", font: "Font" };
const optionLabel = (value: string) => value === "default" ? "Theme default" : value === "ltr" || value === "rtl" ? value.toUpperCase() : value.charAt(0).toUpperCase() + value.slice(1);

export function PlaygroundSettingsPopover() {
  const { settings, update, reset, configuredUrl } = usePlaygroundSettings();
  const [status, setStatus] = useState("");
  return <Popover.Root>
    <Popover.Trigger asChild>
      <IconButton aria-label="Preview settings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="var(--brick-color-surface-canvas)"/><circle cx="15" cy="17" r="3" fill="var(--brick-color-surface-canvas)"/>
        </svg>
      </IconButton>
    </Popover.Trigger>
    <Popover.Portal><Popover.Content align="end">
      <Popover.Header>
        <Popover.Title>Preview settings</Popover.Title>
        <Popover.Description>Change the playground appearance. Direction applies to the examples, not the navigation.</Popover.Description>
      </Popover.Header>
      <Popover.Body><VStack gap="4">
        <For each={settingsKeys}>{key => <Field.Root key={key}>
          <Field.Label htmlFor={`playground-setting-${key}`}>{labels[key]}</Field.Label>
          <NativeSelect.Root size="md" disabled={settings.theme === "qualification" && (key === "accent" || key === "radius" || key === "font")}><NativeSelect.Field id={`playground-setting-${key}`} value={settings[key]} onChange={event => update({ [key]: event.target.value })}>
            <For each={settingOptions[key]}>{value => <option key={value} value={value}>{optionLabel(value)}</option>}</For>
          </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root>
        </Field.Root>}</For>
        {settings.theme === "qualification" && <Text variant="body-sm" tone="secondary">Qualification fixes its example palette, radius and font. Your ordinary preferences are restored when you return to Brick.</Text>}
        <Text variant="body-sm" tone="secondary">RTL changes direction, not language. Explicit appearance and locale specimens keep their authored settings. Qualification is a test theme, not another accent color.</Text>
        <EnvironmentDiagnostics />
        <Button variant="outline" size="sm" onPress={() => { reset(); setStatus("Preferences reset"); }}>Reset preferences</Button>
        <Button variant="ghost" size="sm" onPress={async () => {
          try { await navigator.clipboard.writeText(configuredUrl()); setStatus("Configured link copied"); }
          catch { setStatus("Clipboard unavailable. Copy the configured URL from the address bar."); }
        }}>Copy configured link</Button>
        <Text role="status" aria-live="polite" variant="body-sm">{status}</Text>
      </VStack></Popover.Body>
    </Popover.Content></Popover.Portal>
  </Popover.Root>;
}
