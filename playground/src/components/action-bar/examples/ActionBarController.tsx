import {
  ActionBar,
  Button,
  CloseButton,
  Text,
  useActionBar,
} from "@flowstack-ui/brick";
export function ActionBarController() {
  const actions = useActionBar();
  return (
    <>
      <Button size="sm" variant="outline" onPress={() => actions.setOpen(true)}>
        Open with controller
      </Button>
      <ActionBar.RootProvider value={actions}>
        <ActionBar.Portal>
          <ActionBar.Positioner>
            <ActionBar.Content aria-label="Controller actions">
              <Text variant="body-sm">Controlled outside the root</Text>
              <ActionBar.CloseTrigger asChild>
                <CloseButton size="sm" />
              </ActionBar.CloseTrigger>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </ActionBar.Portal>
      </ActionBar.RootProvider>
    </>
  );
}
