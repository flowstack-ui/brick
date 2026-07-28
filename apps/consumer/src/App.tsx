import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { AlertDialog } from "@flowstack-ui/brick/alert-dialog";
import { AppBar } from "@flowstack-ui/brick/app-bar";
import { Avatar } from "@flowstack-ui/brick/avatar";
import { Badge, NotificationBadge } from "@flowstack-ui/brick/badge";
import { Chip } from "@flowstack-ui/brick/chip";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Drawer } from "@flowstack-ui/brick/drawer";
import { IconButton } from "@flowstack-ui/brick/icon-button";
import { Icon } from "@flowstack-ui/brick/icon";
import { Image } from "@flowstack-ui/brick/image";
import { AspectRatio } from "@flowstack-ui/brick/aspect-ratio";
import { Toggle } from "@flowstack-ui/brick/toggle";
import { ToggleGroup } from "@flowstack-ui/brick/toggle-group";
import { Tooltip } from "@flowstack-ui/brick/tooltip";
import { HoverCard } from "@flowstack-ui/brick/hover-card";
import { Popover } from "@flowstack-ui/brick/popover";
import { Form } from "@flowstack-ui/brick/form";
import { Field } from "@flowstack-ui/brick/field";
import { Fieldset } from "@flowstack-ui/brick/fieldset";
import { Checkbox } from "@flowstack-ui/brick/checkbox";
import { CheckboxGroup } from "@flowstack-ui/brick/checkbox-group";
import { RadioGroup } from "@flowstack-ui/brick/radio-group";
import { Switch } from "@flowstack-ui/brick/switch";
import { Input } from "@flowstack-ui/brick/input";
import { Textarea } from "@flowstack-ui/brick/textarea";
import { Select } from "@flowstack-ui/brick/select";
import { Combobox } from "@flowstack-ui/brick/combobox";
import { MultiSelect } from "@flowstack-ui/brick/multi-select";
import { Text } from "@flowstack-ui/brick/text";
import { Link } from "@flowstack-ui/brick/link";
import { List } from "@flowstack-ui/brick/list";
import { Table } from "@flowstack-ui/brick/table";
import { DataGrid } from "@flowstack-ui/brick/data-grid";
import { TreeGrid } from "@flowstack-ui/brick/tree-grid";
import { Tree } from "@flowstack-ui/brick/tree";
import { Toolbar } from "@flowstack-ui/brick/toolbar";
import { Pagination } from "@flowstack-ui/brick/pagination";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Grid } from "@flowstack-ui/brick/grid";
import { Container } from "@flowstack-ui/brick/container";
import { Surface } from "@flowstack-ui/brick/surface";
import { Divider } from "@flowstack-ui/brick/divider";
import { ScrollArea } from "@flowstack-ui/brick/scroll-area";
import { Code } from "@flowstack-ui/brick/code";
import { CodeBlock } from "@flowstack-ui/brick/code-block";
import { NavList } from "@flowstack-ui/brick/nav-list";
import { Sidebar } from "@flowstack-ui/brick/sidebar";
import { Breadcrumb } from "@flowstack-ui/brick/breadcrumb";
import { Tabs } from "@flowstack-ui/brick/tabs";
import { Skeleton } from "@flowstack-ui/brick/skeleton";
import { Progress } from "@flowstack-ui/brick/progress";
import { ProgressCircle } from "@flowstack-ui/brick/progress-circle";
import { Collapsible } from "@flowstack-ui/brick/collapsible";
import { Accordion } from "@flowstack-ui/brick/accordion";
import { DropdownMenu } from "@flowstack-ui/brick/dropdown-menu";
import { ContextMenu } from "@flowstack-ui/brick/context-menu";
import { Menubar } from "@flowstack-ui/brick/menubar";
import { NavigationMenu } from "@flowstack-ui/brick/navigation-menu";
import { BottomNavigation } from "@flowstack-ui/brick/bottom-navigation";
import { VisuallyHidden } from "@flowstack-ui/brick/visually-hidden";
import { Toaster, toast } from "@flowstack-ui/brick/toast";

type Appearance = "light" | "dark";

const adaAvatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%236d5bd0'/%3E%3Cstop offset='1' stop-color='%23d86f85'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='96' height='96' rx='48' fill='url(%23g)'/%3E%3Ccircle cx='48' cy='36' r='16' fill='%23fff' fill-opacity='.92'/%3E%3Cpath d='M20 88c2-21 13-32 28-32s26 11 28 32' fill='%23fff' fill-opacity='.92'/%3E%3C/svg%3E";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M8 1.75 9.4 6.6 14.25 8 9.4 9.4 8 14.25 6.6 9.4 1.75 8 6.6 6.6 8 1.75Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="2.25" />
      <path d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M12.6 3.4l-.9.9M4.3 11.7l-.9.9" />
    </svg>
  );
}

function getInitialAppearance(): Appearance {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function App() {
  const [appearance, setAppearance] = useState<Appearance>(getInitialAppearance);
  const [publishCount, setPublishCount] = useState(0);
  const [inviteStatus, setInviteStatus] = useState("No invitation sent yet.");
  const [inviteInvalid, setInviteInvalid] = useState(false);
  const [removalStatus, setRemovalStatus] = useState("Project is active.");
  const [includeActive, setIncludeActive] = useState(true);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [filterOwner, setFilterOwner] = useState("any");
  const [filterStatus, setFilterStatus] = useState("Showing all active projects.");
  const [workspaceView, setWorkspaceView] = useState("cards");
  const [compactWorkspace, setCompactWorkspace] = useState(false);
  const [preferenceStatus, setPreferenceStatus] = useState("Publishing preferences have not been saved.");
  const [planStatus, setPlanStatus] = useState("No billing plan submitted.");
  const [skillsStatus, setSkillsStatus] = useState("No team skills submitted.");
  const [channelStatus, setChannelStatus] = useState("No delivery channel submitted.");
  const [compactDestination, setCompactDestination] = useState("home");
  const [tableSort, setTableSort] = useState<"ascending" | "descending">("descending");
  const [reportPage, setReportPage] = useState(1);
  const [gridSort, setGridSort] = useState<"ascending" | "descending">("ascending");
  const [gridSelection, setGridSelection] = useState<string[]>(["atom"]);
  const [treeGridSort, setTreeGridSort] = useState<"ascending" | "descending">("ascending");
  const [treeGridExpanded, setTreeGridExpanded] = useState(["packages"]);
  const [treeGridSelection, setTreeGridSelection] = useState<string | null>("brick");
  const [reviewers, setReviewers] = useState(["Riley Chen", "Morgan Lee"]);

  useEffect(() => {
    document.documentElement.dataset.brickAppearance = appearance;
    document.documentElement.style.colorScheme = appearance;
  }, [appearance]);

  function handleInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    setInviteInvalid(!email);
    setInviteStatus(email ? `Invitation ready for ${email}.` : "Enter an email address.");
  }

  return (
    <Tooltip.Provider>
    <Toaster />
    <div id="top">
      <AppBar.Root aria-label="Primary" blurred className="site-header" position="sticky">
        <AppBar.Toolbar className="site-header-toolbar" density="compact">
          <AppBar.Start>
            <Link className="brand" href="#top" aria-label="Brick Consumer home" tone="inherit" variant="plain">
              <span className="brand-mark" aria-hidden="true">B</span>
              <span>Brick Consumer</span>
            </Link>
          </AppBar.Start>

          <AppBar.Center>
            <nav className="site-nav" aria-label="Page sections">
              <Link href="#workspace" tone="inherit" variant="plain">Workspace</Link>
              <Link href="#invite" tone="inherit" variant="plain">Invite</Link>
            </nav>
          </AppBar.Center>

          <AppBar.End>
            <Tooltip.Root><Tooltip.Trigger asChild><IconButton aria-label="Jump to workspace" href="#workspace" size="sm"><Icon size="xs"><ArrowIcon /></Icon></IconButton></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Jump to workspace<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root>
            <Popover.Root>
              <Popover.Trigger asChild><IconButton aria-label="Workspace settings" size="sm" tone="neutral" variant="ghost"><SettingsIcon /></IconButton></Popover.Trigger>
              <Popover.Portal>
                <Popover.Content align="end" size="sm">
                  <Popover.Title>Workspace settings</Popover.Title>
                  <Popover.Description>Change compact display options for this workspace.</Popover.Description>
                  <Popover.Body>
                    <HStack className="workspace-setting" gap="2">
                      <Switch.Root aria-label="Compact project spacing" checked={compactWorkspace} onCheckedChange={setCompactWorkspace}>
                        <Switch.Thumb />
                      </Switch.Root>
                      <Text>Compact project spacing</Text>
                    </HStack>
                  </Popover.Body>
                  <Popover.Footer><Popover.Close asChild><Button size="sm">Done</Button></Popover.Close></Popover.Footer>
                  <Popover.Arrow />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <Tooltip.Root><Tooltip.Trigger asChild><Toggle aria-label="Dark appearance" className="appearance-button" iconOnly size="sm" variant="ghost" pressed={appearance === "dark"} onPressedChange={(pressed) => setAppearance(pressed ? "dark" : "light")}><SparkIcon /></Toggle></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Toggle dark appearance<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root>
          </AppBar.End>
        </AppBar.Toolbar>
      </AppBar.Root>

      <Container className="site-shell" measure="wide">
        <NavList.Root aria-label="Workspace sections" orientation="horizontal" size="sm">
          <NavList.List>
            <NavList.Item><NavList.Link active href="#top">Overview</NavList.Link></NavList.Item>
            <NavList.Item><NavList.Link href="#workspace">Projects</NavList.Link></NavList.Item>
            <NavList.Item><NavList.Link href="#publishing-preferences">Publishing</NavList.Link></NavList.Item>
          </NavList.List>
        </NavList.Root>
        <Breadcrumb.Root ariaLabel="Current workspace path">
          <Breadcrumb.List>
            <Breadcrumb.Item><Breadcrumb.Link href="#top">Home</Breadcrumb.Link></Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item><Breadcrumb.Link href="#workspace">Projects</Breadcrumb.Link></Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item><Breadcrumb.Page>Mobile checkout refresh</Breadcrumb.Page></Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <main>
        <Sidebar.Root className="consumer-sidebar-proof" collapsedState="rail" size="sm">
          <Sidebar.Panel aria-label="Project settings sidebar">
            <Sidebar.Header><Text weight="semibold">Project settings</Text></Sidebar.Header>
            <Sidebar.Content>
              <NavList.Root aria-label="Project settings navigation" size="sm"><NavList.List><NavList.Item><NavList.Link active href="#workspace">Workspace</NavList.Link></NavList.Item><NavList.Item><NavList.Link href="#publishing-preferences">Publishing</NavList.Link></NavList.Item></NavList.List></NavList.Root>
            </Sidebar.Content>
          </Sidebar.Panel>
          <Sidebar.Main asChild><Surface as="section" inset="md" level="subtle"><HStack gap="3" wrap><Sidebar.Trigger aria-label="Toggle project settings sidebar">☰</Sidebar.Trigger><Text>Persistent project tools composed from the packed public artifact.</Text></HStack></Surface></Sidebar.Main>
        </Sidebar.Root>
        <VStack as="section" className="hero" aria-labelledby="hero-title" gap="4">
          <Text as="p" className="eyebrow" tone="accent" variant="caption" weight="semibold">
            Independent package integration
          </Text>
          <Text as="h1" className="hero-title" id="hero-title" variant="display">
            Build useful interfaces
            <span>with clear boundaries.</span>
          </Text>
          <Text as="p" className="hero-copy" tone="secondary" variant="body-lg">
            This small application consumes Brick exactly through its public package
            exports. Application layout stays here; finished component styling stays in Brick.
          </Text>
          <Toolbar.Root ariaLabel="Document view tools" size="sm" variant="outline">
            <Toolbar.Button>Refresh</Toolbar.Button>
            <Toolbar.Separator orientation="vertical" />
            <Toolbar.ToggleGroup ariaLabel="Document view" defaultValue="preview">
              <Toolbar.ToggleItem value="preview">Preview</Toolbar.ToggleItem>
              <Toolbar.ToggleItem value="outline">Outline</Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
            <Toolbar.Link href="#publishing-preferences">Publishing help</Toolbar.Link>
          </Toolbar.Root>
          <HStack className="hero-actions" gap="3" wrap>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button className="primary-action" endIcon={<ArrowIcon />}>
                  Publish project
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content size="sm">
                  <Dialog.Header>
                    <Dialog.Title>Publish project?</Dialog.Title>
                    <Dialog.Description>
                      Review the release summary before making it available to the team.
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Body>
                    <dl className="publish-summary">
                      <div><dt>Project</dt><dd>Mobile checkout refresh</dd></div>
                      <div><dt>Release</dt><dd>Candidate 8</dd></div>
                      <div><dt>Audience</dt><dd>Workspace reviewers</dd></div>
                    </dl>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close asChild>
                      <Button tone="neutral" variant="outline">Cancel</Button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <Button onPress={() => { setPublishCount((count) => count + 1); toast.success("Project published", { description: "The release is available to workspace reviewers." }); }}>
                        Publish now
                      </Button>
                    </Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <Link endIcon={<ArrowIcon />} href="#workspace" size="md">
              View workspace
            </Link>
          </HStack>
          <HStack gap="2">
            <Icon label={publishCount === 0 ? "Publication pending" : "Published"} size="xs" tone={publishCount === 0 ? "muted" : "success"}><SparkIcon /></Icon>
            <Text as="p" className="activity" aria-live="polite" tone="muted" variant="body-sm">
              {publishCount === 0
                ? "Project has not been published."
                : `Published ${publishCount} ${publishCount === 1 ? "time" : "times"}.`}
            </Text>
          </HStack>
        </VStack>

        <Surface as="section" bordered inset="lg" aria-labelledby="reviewers-title">
          <VStack gap="3">
            <VStack gap="1">
              <Text as="h2" id="reviewers-title" variant="title-lg">Release reviewers</Text>
              <Text tone="secondary">Authored values compose through the packed Chip subpath; this application owns their removal.</Text>
            </VStack>
            <HStack aria-label="Assigned release reviewers" gap="2" wrap>
              {reviewers.map((reviewer) => (
                <Chip.Root key={reviewer} tone="accent">
                  <Chip.Label>{reviewer}</Chip.Label>
                  <Chip.RemoveTrigger
                    ariaLabel={`Remove ${reviewer}`}
                    onPress={() => setReviewers((current) => current.filter((value) => value !== reviewer))}
                  />
                </Chip.Root>
              ))}
            </HStack>
            <Text aria-live="polite" data-testid="consumer-reviewer-status" tone="secondary" variant="body-sm">
              {reviewers.length === 0 ? "No reviewers assigned." : `${reviewers.length} ${reviewers.length === 1 ? "reviewer" : "reviewers"} assigned.`}
            </Text>
          </VStack>
        </Surface>

        <Surface as="section" bordered inset="lg" aria-labelledby="activity-title">
          <VStack gap="4">
            <VStack gap="1">
              <Text as="h2" id="activity-title" variant="title-lg">Recent activity</Text>
              <Text tone="secondary">Latest changes across the workspace.</Text>
            </VStack>
            <ScrollArea.Root className="recent-activity-scroll" scrollbarGutter="stable" scrollbarVisibility="interaction">
              <ScrollArea.Viewport aria-label="Recent workspace activity" focusable>
                <VStack as="ol" className="recent-activity-list" gap="2">
                  {Array.from({ length: 12 }, (_, index) => (
                    <Surface as="li" inset="sm" key={index} level="subtle">
                      <Text>Project update {index + 1} is ready for review.</Text>
                    </Surface>
                  ))}
                </VStack>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </VStack>
        </Surface>

        <Surface as="section" bordered inset="lg" aria-labelledby="install-title">
          <VStack gap="3">
            <Text as="h2" id="install-title" variant="title-lg">Install the workspace package</Text>
            <Text tone="secondary">Run <Code>npm install</Code> from your application.</Text>
            <CodeBlock.Root language="sh" value="npm install @flowstack-ui/brick">
              <CodeBlock.Header>
                <CodeBlock.Title>Install command</CodeBlock.Title>
                <CodeBlock.Language />
                <CodeBlock.Actions><CodeBlock.CopyTrigger>Copy</CodeBlock.CopyTrigger></CodeBlock.Actions>
              </CodeBlock.Header>
              <CodeBlock.Content aria-label="Brick install command" />
              <CodeBlock.CopyStatus>
                <CodeBlock.CopyIndicator when="copied">Copied command</CodeBlock.CopyIndicator>
                <CodeBlock.CopyIndicator when="error">Copy failed</CodeBlock.CopyIndicator>
              </CodeBlock.CopyStatus>
            </CodeBlock.Root>
          </VStack>
        </Surface>

        <Surface as="section" bordered inset="lg" aria-labelledby="plan-title">
          <Form
            aria-label="Billing plan chooser"
            onReset={() => setPlanStatus("Billing plan reset to Team.")}
            onSubmit={(event) => {
              event.preventDefault();
              const plan = String(new FormData(event.currentTarget).get("billingPlan") ?? "");
              setPlanStatus(`Billing plan submitted: ${plan}.`);
            }}
          >
            <VStack gap="3">
              <VStack gap="1">
                <Text as="h2" id="plan-title" variant="title-lg">Choose a billing plan</Text>
                <Text tone="secondary">One realistic packed-package Select with native submission and reset.</Text>
              </VStack>
              <Field.Root id="consumer-billing-plan" required>
                <Field.Label>Billing plan</Field.Label>
                <Select.Root defaultValue="team" name="billingPlan" required>
                  <Select.Trigger><Select.Value placeholder="Choose a plan" /><Select.Icon /></Select.Trigger>
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      <Select.Group>
                        <Select.Label>Available plans</Select.Label>
                        <Select.Item value="starter"><Select.ItemText>Starter</Select.ItemText><Select.ItemIndicator /></Select.Item>
                        <Select.Item value="team"><Select.ItemText>Team</Select.ItemText><Select.ItemIndicator /></Select.Item>
                        <Select.Item value="enterprise" disabled><Select.ItemText>Enterprise — contact sales</Select.ItemText><Select.ItemIndicator /></Select.Item>
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                    <Select.Arrow />
                  </Select.Content>
                </Select.Root>
                <Field.Description>Select one available workspace plan.</Field.Description>
                <Field.Error>Choose a billing plan.</Field.Error>
              </Field.Root>
              <HStack gap="2"><Button type="submit">Save plan</Button><Button tone="neutral" type="reset" variant="outline">Reset plan</Button></HStack>
              <Text aria-live="polite" data-testid="consumer-plan-status" tone="secondary">{planStatus}</Text>
            </VStack>
          </Form>
        </Surface>

        <Surface as="section" bordered inset="lg" aria-labelledby="city-title">
          <VStack gap="3">
            <VStack gap="1"><Text as="h2" id="city-title" variant="title-lg">Find a release city</Text><Text tone="secondary">A searchable choice composed through the packed Combobox subpath.</Text></VStack>
            <Combobox.Root defaultValue="chicago" options={[{ value: "boston", label: "Boston" }, { value: "chicago", label: "Chicago" }, { value: "lisbon", label: "Lisbon" }]}>
              <Combobox.Label>Release city</Combobox.Label>
              <Combobox.Control><Combobox.Input placeholder="Search cities" /><Combobox.Clear aria-label="Clear release city" /><Combobox.Indicator /></Combobox.Control>
              <Combobox.Portal><Combobox.Content><Combobox.Listbox><Combobox.Item label="Boston" value="boston">Boston</Combobox.Item><Combobox.Item label="Chicago" value="chicago">Chicago</Combobox.Item><Combobox.Item label="Lisbon" value="lisbon">Lisbon</Combobox.Item><Combobox.Empty>No matching cities</Combobox.Empty></Combobox.Listbox></Combobox.Content></Combobox.Portal>
            </Combobox.Root>
          </VStack>
        </Surface>

        <Surface as="section" bordered inset="lg" aria-labelledby="skills-title">
          <Form
            aria-label="Team skills chooser"
            onReset={() => setSkillsStatus("Team skills reset to Design and Engineering.")}
            onSubmit={(event) => {
              event.preventDefault();
              const skills = new FormData(event.currentTarget).getAll("skills").map(String);
              setSkillsStatus(`Team skills submitted: ${skills.join(", ")}.`);
            }}
          >
            <VStack gap="3">
              <VStack gap="1">
                <Text as="h2" id="skills-title" variant="title-lg">Choose team skills</Text>
                <Text tone="secondary">One realistic packed-package Multi Select with repeated-value submission and reset.</Text>
              </VStack>
              <Field.Root id="consumer-team-skills" required>
                <Field.Label>Team skills</Field.Label>
                <MultiSelect.Root defaultValue={["design", "engineering"]} name="skills" required>
                  <MultiSelect.Trigger><MultiSelect.Value placeholder="Choose skills" /><MultiSelect.Icon /></MultiSelect.Trigger>
                  <MultiSelect.Content>
                    <MultiSelect.Viewport>
                      <MultiSelect.Group>
                        <MultiSelect.Label>Disciplines</MultiSelect.Label>
                        <MultiSelect.Item value="design"><MultiSelect.ItemText>Design</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
                        <MultiSelect.Item value="engineering"><MultiSelect.ItemText>Engineering</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
                        <MultiSelect.Item value="research" disabled><MultiSelect.ItemText>Research</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
                        <MultiSelect.Item value="writing"><MultiSelect.ItemText>Writing</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
                      </MultiSelect.Group>
                    </MultiSelect.Viewport>
                    <MultiSelect.Arrow />
                  </MultiSelect.Content>
                </MultiSelect.Root>
                <Field.Description>Choose every discipline that applies.</Field.Description>
                <Field.Error>Choose at least one team skill.</Field.Error>
              </Field.Root>
              <HStack gap="2"><Button type="submit">Save skills</Button><Button tone="neutral" type="reset" variant="outline">Reset skills</Button></HStack>
              <Text aria-live="polite" data-testid="consumer-skills-status" tone="secondary">{skillsStatus}</Text>
            </VStack>
          </Form>
        </Surface>

        <Surface as="section" bordered inset="lg" aria-labelledby="channel-title">
          <Form
            aria-label="Delivery channel chooser"
            onReset={() => setChannelStatus("Delivery channel reset to Email reports.")}
            onSubmit={(event) => {
              event.preventDefault();
              setChannelStatus(`Delivery channel submitted: ${new FormData(event.currentTarget).get("delivery-channel")}.`);
            }}
          >
            <VStack gap="3">
              <Fieldset.Root id="consumer-delivery-channel" required>
                <Fieldset.Legend><Text as="span" id="channel-title" variant="title-lg">Delivery channel</Text></Fieldset.Legend>
                <Fieldset.Description>Choose exactly one destination for publishing reports.</Fieldset.Description>
                <RadioGroup.Root defaultValue="email" name="delivery-channel">
                  <RadioGroup.Item value="email">Email reports</RadioGroup.Item>
                  <RadioGroup.Item value="push">Push notifications</RadioGroup.Item>
                  <RadioGroup.Item disabled value="sms">Text messages unavailable</RadioGroup.Item>
                </RadioGroup.Root>
                <Fieldset.Error>Choose one delivery channel.</Fieldset.Error>
              </Fieldset.Root>
              <HStack gap="2"><Button type="submit">Save delivery channel</Button><Button tone="neutral" type="reset" variant="outline">Reset channel</Button></HStack>
              <Text aria-live="polite" data-testid="consumer-channel-status" tone="secondary">{channelStatus}</Text>
            </VStack>
          </Form>
        </Surface>

        <Surface
          as="section"
          bordered
          className="workspace"
          id="workspace"
          inset="lg"
          level="subtle"
          aria-labelledby="workspace-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Today</p>
              <h2 id="workspace-title">Launch workspace</h2>
            </div>
            <div className="workspace-tools">
              <ToggleGroup.Root
                ariaLabel="Workspace view"
                attached
                onValueChange={(next) => { if (next) setWorkspaceView(next); }}
                size="sm"
                value={workspaceView}
                variant="outline"
              >
                <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
                <ToggleGroup.Item value="list">List</ToggleGroup.Item>
              </ToggleGroup.Root>
              <Badge tone="success">3 tasks ready</Badge>
              <NotificationBadge count={3} tone="accent">
                <Button aria-label="Review tasks, 3 ready" size="sm" tone="neutral" variant="ghost">
                  Review tasks
                </Button>
              </NotificationBadge>
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <Button size="sm" tone="neutral" variant="outline">
                    Filter projects
                  </Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay />
                  <Drawer.Content placement="end" size="md">
                    <Drawer.Header>
                      <Drawer.Title>Filter workspace projects</Drawer.Title>
                      <Drawer.Description>
                        Choose which projects appear in this workspace view.
                      </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                      <form className="project-filter-form">
                        <fieldset>
                          <legend>Project status</legend>
                          <label>
                            <input
                              checked={includeActive}
                              onChange={(event) => setIncludeActive(event.currentTarget.checked)}
                              type="checkbox"
                            />
                            Active projects
                          </label>
                          <label>
                            <input
                              checked={includeArchived}
                              onChange={(event) => setIncludeArchived(event.currentTarget.checked)}
                              type="checkbox"
                            />
                            Archived projects
                          </label>
                        </fieldset>
                        <label className="filter-owner" htmlFor="filter-owner">
                          Owner
                          <select
                            id="filter-owner"
                            onChange={(event) => setFilterOwner(event.currentTarget.value)}
                            value={filterOwner}
                          >
                            <option value="any">Any owner</option>
                            <option value="ada">Ada Lovelace</option>
                            <option value="grace">Grace Hopper</option>
                          </select>
                        </label>
                      </form>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Button
                        onPress={() => {
                          setIncludeActive(true);
                          setIncludeArchived(false);
                          setFilterOwner("any");
                        }}
                        tone="neutral"
                        variant="ghost"
                      >
                        Reset filters
                      </Button>
                      <Drawer.Close asChild>
                        <Button
                          onPress={() => {
                            const statuses = [
                              includeActive ? "active" : null,
                              includeArchived ? "archived" : null,
                            ].filter(Boolean).join(" and ") || "no";
                            const owner = filterOwner === "any"
                              ? "all owners"
                              : filterOwner === "ada"
                                ? "Ada Lovelace"
                                : "Grace Hopper";
                            setFilterStatus(`Showing ${statuses} projects for ${owner}.`);
                          }}
                        >
                          Apply filters
                        </Button>
                      </Drawer.Close>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>
          </div>

          <Divider decorative={false} aria-label="Workspace projects" />
          <p className="activity filter-status" aria-live="polite">{filterStatus}</p>

          <Grid.Root
            className="workspace-grid"
            columns={3}
            data-compact={compactWorkspace ? "true" : undefined}
            data-view={workspaceView}
            gap="4"
          >
            <Grid.Item className="workspace-featured" columnSpan={2}>
              <Card.Root
              aria-labelledby="project-title"
              as="article"
              className="project-panel"
              size="lg"
              variant="elevated"
            >
              <Image.Root className="project-image" frame="subtle" radius="md" ratio={16 / 9} src="/workspace-image.svg">
                <Image.Content alt="Mobile checkout workspace preview" height={675} loading="lazy" width={1200} />
                <Image.Fallback>Workspace preview unavailable</Image.Fallback>
              </Image.Root>
              <AspectRatio.Root aria-label="Release preview frame" ratio={21 / 9} radius="md" variant="outline">
                <div style={{ alignItems: "center", blockSize: "100%", display: "flex", justifyContent: "center", padding: "1rem" }}>
                  <VStack gap="1">
                    <Badge size="sm" tone="success">Ready</Badge>
                    <Text as="span" variant="title-sm">Responsive release preview</Text>
                    <Text tone="secondary" variant="body-sm">21:9 geometry from the public packed subpath</Text>
                  </VStack>
                </div>
              </AspectRatio.Root>
              <Card.Header>
                <Card.Title as="h3" id="project-title">Mobile checkout refresh</Card.Title>
                <Card.Description>
                  Active project · Review the responsive purchase path and prepare the
                  release candidate.
                </Card.Description>
                <div className="project-collaborators" aria-label="Project collaborators">
                  <div className="collaborator" id="ada-profile">
                    <NotificationBadge count={2} tone="accent" overlap="circular">
                      <Avatar
                        alt="Ada Lovelace"
                        fallback="AL"
                        size="lg"
                        src={adaAvatar}
                        status="online"
                      />
                    </NotificationBadge>
                    <span>
                      <HoverCard.Root>
                        <HoverCard.Trigger asChild>
                          <Link className="collaborator-link" href="#ada-profile">Ada Lovelace</Link>
                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                          <HoverCard.Content className="collaborator-preview" size="md">
                            <div className="collaborator-preview-profile">
                              <Avatar alt="" fallback="AL" size="md" status="online" />
                              <div>
                                <strong>Ada Lovelace</strong>
                                <p>Lead reviewer · Online · 2 project updates.</p>
                                <Badge size="sm" tone="success">Available</Badge>
                              </div>
                            </div>
                            <HoverCard.Arrow />
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>
                      <small>Online · 2 updates</small>
                    </span>
                  </div>
                  <div className="collaborator">
                    <Avatar
                      alt="Grace Hopper"
                      fallback="GH"
                      shape="rounded"
                      size="lg"
                      src="/missing-grace-avatar.png"
                      status="busy"
                    />
                    <span><strong>Grace Hopper</strong><small>Busy · fallback shown</small></span>
                  </div>
                </div>
              </Card.Header>
              <Card.Content>
                <dl className="project-stats">
                  <div><dt>Progress</dt><dd>78%</dd></div>
                  <div><dt>Reviewers</dt><dd>4</dd></div>
                  <div><dt>Due</dt><dd>Friday</dd></div>
                </dl>
                <p className="activity removal-status" aria-live="polite">{removalStatus}</p>
              </Card.Content>
              <Card.Footer className="panel-actions">
                <Button size="sm" variant="soft">Open project</Button>
                <Button size="sm" tone="neutral" variant="ghost">View activity</Button>
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <Button size="sm" tone="danger" variant="outline">
                      Remove project
                    </Button>
                  </AlertDialog.Trigger>
                  <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content size="sm">
                      <AlertDialog.Header>
                        <AlertDialog.Title>Remove Mobile checkout refresh?</AlertDialog.Title>
                        <AlertDialog.Description>
                          This permanently removes the project from the workspace and
                          cannot be undone.
                        </AlertDialog.Description>
                      </AlertDialog.Header>
                      <AlertDialog.Body>
                        Four reviewers will lose access to this project.
                      </AlertDialog.Body>
                      <AlertDialog.Footer>
                        <AlertDialog.Cancel asChild>
                          <Button tone="neutral" variant="outline">Keep project</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                          <Button
                            onPress={() => setRemovalStatus("Project removal confirmed.")}
                            tone="danger"
                          >
                            Remove permanently
                          </Button>
                        </AlertDialog.Action>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog.Portal>
                </AlertDialog.Root>
              </Card.Footer>
              </Card.Root>
            </Grid.Item>

            <Card.Root
              aria-labelledby="checklist-title"
              as="section"
              className="checklist"
              variant="subtle"
            >
              <Card.Header>
                <Card.Title as="h3" id="checklist-title">Ready for review</Card.Title>
                <Card.Description>Release health</Card.Description>
              </Card.Header>
              <Card.Content>
                <List.Root marker="none">
                  <List.Item><List.Leading aria-hidden="true">✓</List.Leading><List.Content>Mobile layout checked</List.Content></List.Item>
                  <List.Item><List.Leading aria-hidden="true">✓</List.Leading><List.Content>Keyboard path checked</List.Content></List.Item>
                  <List.Item><List.Leading aria-hidden="true">✓</List.Leading><List.Content>Package build checked</List.Content></List.Item>
                </List.Root>
              </Card.Content>
              <Card.Footer>
                <Button fullWidth tone="success" variant="soft">Review checklist</Button>
              </Card.Footer>
            </Card.Root>
          </Grid.Root>
        </Surface>

        <Card.Root as="section" variant="outline">
          <Card.Header>
            <Card.Title as="h2">Release report</Card.Title>
            <Card.Description>Static Table composed from the packed public subpath.</Card.Description>
          </Card.Header>
          <Card.Content>
            <Table.Container>
              <Table.Root striped style={{ "--brick-table-min-inline-size": "38rem" } as CSSProperties}>
                <Table.Caption>Current package verification results</Table.Caption>
                <Table.Header><Table.Row><Table.Head>Package</Table.Head><Table.Head>Status</Table.Head><Table.Head sortDirection={tableSort}><Button size="xs" variant="ghost" onClick={() => setTableSort((value) => value === "ascending" ? "descending" : "ascending")}>Checks<Table.SortIndicator /></Button></Table.Head><Table.Head numeric>Coverage</Table.Head><Table.Head>Guide</Table.Head></Table.Row></Table.Header>
                <Table.Body>
                  {[{ name: "Atom", status: "Released", checks: 128, coverage: "99.4%" }, { name: "Brick", status: "Review", checks: 86, coverage: "96.8%" }].sort((a, b) => tableSort === "ascending" ? a.checks - b.checks : b.checks - a.checks).map((row) => <Table.Row key={row.name}><Table.Head scope="row">{row.name}</Table.Head><Table.Cell><Badge tone={row.status === "Released" ? "success" : "warning"}>{row.status}</Badge></Table.Cell><Table.Cell numeric>{row.checks}</Table.Cell><Table.Cell numeric>{row.coverage}</Table.Cell><Table.Cell><Link href="#top">Open {row.name} guide</Link></Table.Cell></Table.Row>)}
                </Table.Body>
                <Table.Footer><Table.Row><Table.Head scope="row" colSpan={2}>Total checks</Table.Head><Table.Cell numeric>214</Table.Cell><Table.Cell colSpan={2}>Packed artifact</Table.Cell></Table.Row></Table.Footer>
              </Table.Root>
            </Table.Container>
            <Pagination.Root aria-label="Release report pages" onPageChange={setReportPage} page={reportPage} totalPages={5} variant="outline">
              <Pagination.List><Pagination.Previous /><Pagination.Items /><Pagination.Next /></Pagination.List>
            </Pagination.Root>
          </Card.Content>
        </Card.Root>

        <Card.Root as="section" variant="outline">
          <Card.Header>
            <Card.Title as="h2">Release file matrix</Card.Title>
            <Card.Description>Hierarchical package records composed from the packed Tree Grid subpath.</Card.Description>
          </Card.Header>
          <Card.Content>
            <VStack gap="3">
              <Toolbar.Root ariaLabel="Release file filters" size="sm" variant="outline"><Toolbar.Button>All files</Toolbar.Button><Toolbar.Separator orientation="vertical" /><Toolbar.Button>Changed only</Toolbar.Button></Toolbar.Root>
              <TreeGrid.Container>
                <TreeGrid.Root aria-label="Release package files" columnCount={3} expandedValue={treeGridExpanded} onExpandedValueChange={setTreeGridExpanded} onValueChange={value => setTreeGridSelection(typeof value === "string" ? value : null)} rowCount={5} selectionMode="single" selectOnRowClick style={{ "--brick-tree-grid-min-inline-size": "40rem" } as CSSProperties} value={treeGridSelection} variant="outline">
                  <TreeGrid.Caption>Package files and packed sizes</TreeGrid.Caption>
                  <TreeGrid.Header><TreeGrid.Row rowIndex={1} selectable={false} value="header"><TreeGrid.ColumnHeader columnIndex={1} onAction={() => setTreeGridSort(value => value === "ascending" ? "descending" : "ascending")} sortDirection={treeGridSort}>Name<TreeGrid.SortIndicator /></TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={2}>Status</TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={3} numeric>Bytes</TreeGrid.ColumnHeader></TreeGrid.Row></TreeGrid.Header>
                  <TreeGrid.Body>
                    <TreeGrid.Row expandable level={1} rowIndex={2} selectable value="packages"><TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />packages</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}><Badge size="sm" tone="neutral" variant="soft">2 files</Badge></TreeGrid.Cell><TreeGrid.Cell columnIndex={3} numeric>—</TreeGrid.Cell></TreeGrid.Row>
                    {(treeGridSort === "ascending" ? [{ id: "atom", bytes: 528899, status: "published" }, { id: "brick", bytes: 412480, status: "ready" }] : [{ id: "brick", bytes: 412480, status: "ready" }, { id: "atom", bytes: 528899, status: "published" }]).map((row, index) => <TreeGrid.Row key={row.id} level={2} parentValue="packages" rowIndex={index + 3} selectable value={row.id}><TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />{row.id}.tgz</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}><Badge size="sm" tone="success">{row.status}</Badge></TreeGrid.Cell><TreeGrid.Cell columnIndex={3} numeric>{row.bytes.toLocaleString("en-US")}</TreeGrid.Cell></TreeGrid.Row>)}
                    <TreeGrid.Row level={1} rowIndex={5} selectable value="readme"><TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />README.md</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}><Badge size="sm" tone="neutral" variant="soft">docs</Badge></TreeGrid.Cell><TreeGrid.Cell columnIndex={3} numeric>2,874</TreeGrid.Cell></TreeGrid.Row>
                  </TreeGrid.Body>
                </TreeGrid.Root>
              </TreeGrid.Container>
              <Surface inset="md" level="subtle"><Text as="h3" variant="title-sm">Selected release record</Text><Text tone="secondary" variant="body-sm">{treeGridSelection ? `${treeGridSelection} is ready for package review.` : "Select a release file."}</Text></Surface>
            </VStack>
          </Card.Content>
        </Card.Root>

        <Card.Root as="section" variant="outline">
          <Card.Header>
            <Card.Title as="h2">Verification queue</Card.Title>
            <Card.Description>Navigable, selectable Data Grid with application-owned controls.</Card.Description>
          </Card.Header>
          <Card.Content>
            <Toolbar.Root ariaLabel="Verification queue tools" size="sm" variant="outline"><Toolbar.Button>Refresh queue</Toolbar.Button><Toolbar.Separator orientation="vertical" /><Toolbar.Button disabled={gridSelection.length === 0}>Review selected ({gridSelection.length})</Toolbar.Button></Toolbar.Root>
            <DataGrid.Container>
              <DataGrid.Root aria-label="Package verification queue" columnCount={3} rowCount={4} selectionMode="multiple" value={gridSelection} onValueChange={value => setGridSelection(Array.isArray(value) ? value : value ? [value] : [])} selectOnRowClick style={{ "--brick-data-grid-min-inline-size": "34rem" } as CSSProperties} variant="outline">
                <DataGrid.Caption>Use arrow keys to navigate and Space to select a package.</DataGrid.Caption>
                <DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1}>Package</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={2}>Status</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={3} numeric onAction={() => setGridSort(value => value === "ascending" ? "descending" : "ascending")} sortDirection={gridSort}>Checks<DataGrid.SortIndicator /></DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header>
                <DataGrid.Body>{[{ id: "atom", name: "Atom", status: "Released", checks: 492 }, { id: "brick", name: "Brick", status: "Review", checks: 238 }, { id: "consumer", name: "Consumer", status: "Ready", checks: 24 }].sort((a, b) => gridSort === "ascending" ? a.checks - b.checks : b.checks - a.checks).map((row, index) => <DataGrid.Row key={row.id} rowIndex={index + 2} selectable value={row.id}><DataGrid.Cell columnIndex={1}>{row.name}</DataGrid.Cell><DataGrid.Cell columnIndex={2}><Badge tone={row.status === "Review" ? "warning" : "success"}>{row.status}</Badge></DataGrid.Cell><DataGrid.Cell columnIndex={3} numeric>{row.checks}</DataGrid.Cell></DataGrid.Row>)}</DataGrid.Body>
              </DataGrid.Root>
            </DataGrid.Container>
            <Pagination.Root aria-label="Verification queue pages" page={1} totalPages={3} size="sm"><Pagination.List><Pagination.Previous /><Pagination.Items /><Pagination.Next /></Pagination.List></Pagination.Root>
          </Card.Content>
        </Card.Root>

        <Card.Root as="section" variant="outline">
          <Card.Header>
            <Card.Title as="h2">Release files</Card.Title>
            <Card.Description>Hierarchical selection composed from the packed Tree subpath.</Card.Description>
          </Card.Header>
          <Card.Content>
            <Tree.Root aria-label="Release files" defaultExpandedValue={["packages"]} defaultValue="brick" showGuide variant="outline">
              <Tree.Item value="packages"><Tree.ItemContent><Tree.Indicator /><Tree.ItemText>packages</Tree.ItemText><Badge size="sm" tone="neutral" variant="soft">2</Badge></Tree.ItemContent><Tree.Group>
                <Tree.Item value="atom"><Tree.ItemContent><Tree.Indicator /><Tree.ItemText>atom</Tree.ItemText></Tree.ItemContent></Tree.Item>
                <Tree.Item value="brick"><Tree.ItemContent><Tree.Indicator /><Tree.ItemText>brick</Tree.ItemText><Badge size="sm" tone="success">ready</Badge></Tree.ItemContent></Tree.Item>
              </Tree.Group></Tree.Item>
              <Tree.Item value="readme"><Tree.ItemContent><Tree.Indicator /><Tree.ItemText>README.md</Tree.ItemText></Tree.ItemContent></Tree.Item>
            </Tree.Root>
          </Card.Content>
        </Card.Root>

        <Card.Root
          aria-labelledby="invite-title"
          as="section"
          className="invite"
          id="invite"
          size="lg"
        >
          <Card.Header>
            <Card.Title as="h2" id="invite-title">Invite a teammate</Card.Title>
            <Card.Description>
              Collaboration · Complete public Form, Field, and Fieldset composition.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Form
              aria-label="Invite teammate"
              className="invite-form"
              onInvalid={() => {
                setInviteInvalid(true);
                setInviteStatus("Enter a valid work email address.");
              }}
              onReset={() => {
                setInviteInvalid(false);
                setInviteStatus("Invitation form reset.");
              }}
              onSubmit={handleInvite}
            >
              <Field.Root id="invite-email-field" invalid={inviteInvalid} required>
                <Field.Label htmlFor="invite-email">Work email</Field.Label>
                <Input
                  autoComplete="email"
                  clearable
                  endAdornment={<span aria-hidden="true">work</span>}
                  id="invite-email"
                  name="email"
                  required
                  type="email"
                />
                <Field.Description>
                  We use this address only for the workspace invitation.
                </Field.Description>
                <Field.Error>Enter a valid work email address.</Field.Error>
              </Field.Root>
              <Field.Root id="invite-note-field">
                <Field.Label>Invitation note</Field.Label>
                <Textarea.Root maxLength={160} name="note">
                  <Textarea.Count />
                </Textarea.Root>
                <Field.Description>
                  Add optional context for the teammate receiving the invitation.
                </Field.Description>
              </Field.Root>
              <Fieldset.Root id="invite-role" required>
                <Fieldset.Legend>Workspace role</Fieldset.Legend>
                <Fieldset.Description>
                  Choose the access level included with the invitation.
                </Fieldset.Description>
                <div className="invite-role-options">
                  <label><input defaultChecked name="role" type="radio" value="reviewer" /> Reviewer</label>
                  <label><input name="role" type="radio" value="editor" /> Editor</label>
                </div>
              </Fieldset.Root>
              <div className="invite-controls">
                <Button type="submit">Prepare invitation</Button>
                <Button tone="neutral" type="reset" variant="outline">Reset</Button>
              </div>
              <output className="activity" aria-live="polite">{inviteStatus}</output>
            </Form>
          </Card.Content>
        </Card.Root>

        <Card.Root as="section" className="publishing-preferences" id="publishing-preferences" size="lg" variant="outline">
          <Card.Header>
            <Card.Title as="h2">Publishing preferences</Card.Title>
            <Card.Description>Choose how this application confirms and reports future releases.</Card.Description>
          </Card.Header>
          <Card.Content>
            <Form
              aria-label="Publishing preferences"
              className="publishing-preferences-form"
              onReset={() => setPreferenceStatus("Publishing preferences reset.")}
              onSubmit={(event) => {
                const data = new FormData(event.currentTarget);
                setPreferenceStatus(`Preferences saved for ${data.getAll("publish-channel").join(", ")}.`);
              }}
              preventDefaultOnSubmit
            >
              <Field.Root id="publish-acknowledgement" required>
                <Field.Label>Release acknowledgement</Field.Label>
                <Checkbox name="publish-acknowledgement" required value="accepted">I reviewed the publishing checklist</Checkbox>
                <Field.Description>Required before saving delivery choices.</Field.Description>
                <Field.Error>Review the checklist before continuing.</Field.Error>
              </Field.Root>
              <Fieldset.Root id="publish-channels" required>
                <Fieldset.Legend>Result delivery</Fieldset.Legend>
                <Fieldset.Description>Choose one or more channels for publishing results.</Fieldset.Description>
                <CheckboxGroup.Root allValues={["email", "push"]} name="publish-channel">
                  <CheckboxGroup.Parent>Select every available channel</CheckboxGroup.Parent>
                  <CheckboxGroup.Item value="email">
                    <CheckboxGroup.ItemLabel>Email report</CheckboxGroup.ItemLabel>
                    <CheckboxGroup.ItemDescription>Build, package, and review details.</CheckboxGroup.ItemDescription>
                  </CheckboxGroup.Item>
                  <CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item>
                  <CheckboxGroup.Item disabled value="sms">SMS unavailable</CheckboxGroup.Item>
                </CheckboxGroup.Root>
                <Fieldset.Error>Choose at least one delivery channel.</Fieldset.Error>
              </Fieldset.Root>
              <div className="publishing-preferences-actions">
                <Button type="submit">Save publishing preferences</Button>
                <Button tone="neutral" type="reset" variant="outline">Reset preferences</Button>
              </div>
              <output aria-live="polite" className="activity">{preferenceStatus}</output>
            </Form>
          </Card.Content>
        </Card.Root>
        <Surface as="section" bordered inset="lg" aria-labelledby="component-preview-title">
          <VStack gap="4">
            <Text as="h2" id="component-preview-title" variant="title-lg">Workspace preview</Text>
            <Tabs.Root defaultValue="summary" variant="soft">
              <Tabs.List ariaLabel="Workspace preview sections">
                <Tabs.Trigger value="summary">Summary</Tabs.Trigger>
                <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="summary"><Text>Current workspace information is ready.</Text></Tabs.Content>
              <Tabs.Content value="loading"><Skeleton animation="wave" lines={3} /></Tabs.Content>
            </Tabs.Root>
          </VStack>
        </Surface>
        <Surface as="section" bordered inset="lg" aria-labelledby="progress-proof-title">
          <VStack gap="4">
            <Text as="h2" id="progress-proof-title" variant="title-lg">Publishing progress</Text>
            <Grid.Root minItemSize="lg" gap="5">
              <Progress.Root value={68} bufferValue={84}>
                <Progress.Label>Upload release assets</Progress.Label>
                <Progress.Value />
                <Progress.Track><Progress.Buffer /><Progress.Indicator /></Progress.Track>
              </Progress.Root>
              <HStack gap="5" wrap>
                <ProgressCircle.Root value={3} max={5} tone="success">
                  <ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle>
                  <ProgressCircle.Value>{({ value, max }) => `${value}/${max}`}</ProgressCircle.Value>
                  <ProgressCircle.Label>Verification steps</ProgressCircle.Label>
                </ProgressCircle.Root>
                <ProgressCircle.Root aria-label="Preparing package" value={null}>
                  <ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle>
                </ProgressCircle.Root>
              </HStack>
            </Grid.Root>
          </VStack>
        </Surface>
        <Surface as="section" bordered inset="lg" aria-labelledby="collapsible-proof-title">
          <VStack gap="3">
            <Text as="h2" id="collapsible-proof-title" variant="title-lg">Advanced workspace details</Text>
            <Collapsible.Root variant="outline">
              <Collapsible.Trigger>Release notifications<Collapsible.Indicator /></Collapsible.Trigger>
              <Collapsible.Content>
                <Collapsible.ContentInner><Text tone="secondary">Weekly release summaries are sent every Friday.</Text></Collapsible.ContentInner>
              </Collapsible.Content>
            </Collapsible.Root>
          </VStack>
        </Surface>
        <Surface as="section" bordered inset="lg" aria-labelledby="accordion-proof-title">
          <VStack gap="3">
            <Text as="h2" id="accordion-proof-title" variant="title-lg">Workspace preferences</Text>
            <Accordion.Root variant="outline" collapsible={false} defaultValue="account">
              <Accordion.Item value="account"><Accordion.Header><Accordion.Trigger>Account settings<Accordion.Indicator /></Accordion.Trigger></Accordion.Header><Accordion.Content><Accordion.ContentInner><Text tone="secondary">Update your profile and sign-in preferences.</Text></Accordion.ContentInner></Accordion.Content></Accordion.Item>
              <Accordion.Item value="billing"><Accordion.Header><Accordion.Trigger>Billing details<Accordion.Indicator /></Accordion.Trigger></Accordion.Header><Accordion.Content><Accordion.ContentInner><Text tone="secondary">Review invoices and payment methods.</Text></Accordion.ContentInner></Accordion.Content></Accordion.Item>
            </Accordion.Root>
          </VStack>
        </Surface>
        <Surface as="section" bordered inset="lg" aria-labelledby="menu-family-title">
          <VStack gap="4">
            <Text as="h2" id="menu-family-title" variant="title-lg">Workspace menus</Text>
            <NavigationMenu.Root aria-label="Workspace destinations" defaultValue="projects">
              <NavigationMenu.List>
                <NavigationMenu.Item value="projects">
                  <NavigationMenu.Trigger>Projects</NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <NavigationMenu.Link href="#workspace">Active workspace</NavigationMenu.Link>
                    <NavigationMenu.Link href="#recent-activity">Recent activity</NavigationMenu.Link>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="settings"><NavigationMenu.Link href="#publishing-preferences">Settings</NavigationMenu.Link></NavigationMenu.Item>
                <NavigationMenu.Indicator />
              </NavigationMenu.List>
              <NavigationMenu.Viewport />
            </NavigationMenu.Root>
            <Menubar.Root aria-label="Workspace commands">
              <Menubar.Menu value="file">
                <Menubar.Trigger>File</Menubar.Trigger>
                <Menubar.Content ariaLabel="File commands">
                  <Menubar.Item value="new"><Menubar.ItemLabel>New workspace</Menubar.ItemLabel></Menubar.Item>
                  <Menubar.Item value="archive"><Menubar.ItemLabel>Archive workspace</Menubar.ItemLabel></Menubar.Item>
                </Menubar.Content>
              </Menubar.Menu>
              <Menubar.Menu value="view">
                <Menubar.Trigger>View</Menubar.Trigger>
                <Menubar.Content ariaLabel="View commands"><Menubar.Item value="activity">Recent activity</Menubar.Item></Menubar.Content>
              </Menubar.Menu>
            </Menubar.Root>
            <HStack gap="3" wrap>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild><Button tone="neutral" variant="outline">Project actions</Button></DropdownMenu.Trigger>
                <DropdownMenu.Content ariaLabel="Project actions">
                  <DropdownMenu.Item value="duplicate">Duplicate project</DropdownMenu.Item>
                  <DropdownMenu.Item tone="danger" value="delete">Delete project</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              <ContextMenu.Root>
                <ContextMenu.Trigger asChild>
                  <Surface as="article" bordered inset="sm" tabIndex={0} aria-label="Quarterly report">Quarterly report · right-click</Surface>
                </ContextMenu.Trigger>
                <ContextMenu.Content ariaLabel="Quarterly report actions">
                  <ContextMenu.Item value="open">Open report</ContextMenu.Item>
                  <ContextMenu.Item value="duplicate">Duplicate report</ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            </HStack>
            <BottomNavigation.Root
              ariaLabel="Compact workspace destinations"
              className="consumer-bottom-navigation-proof"
              onChange={setCompactDestination}
              value={compactDestination}
            >
              <BottomNavigation.Item value="home">
                <BottomNavigation.Icon><Icon size="md"><SparkIcon /></Icon></BottomNavigation.Icon>
                <BottomNavigation.Label>Home</BottomNavigation.Label>
              </BottomNavigation.Item>
              <BottomNavigation.Item value="inbox">
                <BottomNavigation.Icon>
                  <NotificationBadge count={3} overlap="circular">
                    <Icon size="md"><ArrowIcon /></Icon>
                  </NotificationBadge>
                </BottomNavigation.Icon>
                <BottomNavigation.Label>Inbox</BottomNavigation.Label>
              </BottomNavigation.Item>
              <BottomNavigation.Item value="settings">
                <BottomNavigation.Icon><Icon size="md"><SettingsIcon /></Icon></BottomNavigation.Icon>
                <BottomNavigation.Label>Settings</BottomNavigation.Label>
              </BottomNavigation.Item>
            </BottomNavigation.Root>
          </VStack>
        </Surface>
        </main>

        <footer>
          <p>Public Brick imports. Application-owned composition. No private compatibility layer.</p>
          <Button href="#top" size="sm" tone="neutral" variant="ghost">
            Back to top<VisuallyHidden.Root> of Brick Consumer</VisuallyHidden.Root>
          </Button>
        </footer>
      </Container>
    </div>
    </Tooltip.Provider>
  );
}
