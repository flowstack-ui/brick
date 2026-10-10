import { useRef, useState } from "react";
import { AppBar, Button, Text } from "@flowstack-ui/brick";
export function AppBarFixed() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={triggerRef} variant="outline" onClick={() => setOpen(true)}>
        Show fixed bar
      </Button>
      {open && (
        <AppBar.Root asChild position="fixed" offset={4} elevation="medium">
          <div aria-label="Fixed preview">
            <AppBar.Toolbar layout="flex">
              <AppBar.Start>
                <Text truncate>Viewport bar</Text>
              </AppBar.Start>
              <AppBar.End>
                <Button
                  size="sm"
                  variant="outline"
                  tone="neutral"
                  onClick={() => {
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                >
                  Close fixed bar
                </Button>
              </AppBar.End>
            </AppBar.Toolbar>
          </div>
        </AppBar.Root>
      )}
    </>
  );
}
