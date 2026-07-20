import { useEffect, useState, type FormEvent } from "react";
import { AlertDialog } from "@flowstack-ui/brick/alert-dialog";
import { AppBar } from "@flowstack-ui/brick/app-bar";
import { Avatar } from "@flowstack-ui/brick/avatar";
import { Badge, NotificationBadge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Drawer } from "@flowstack-ui/brick/drawer";
import { IconButton } from "@flowstack-ui/brick/icon-button";
import { Toggle } from "@flowstack-ui/brick/toggle";
import { ToggleGroup } from "@flowstack-ui/brick/toggle-group";
import { Tooltip } from "@flowstack-ui/brick/tooltip";
import { HoverCard } from "@flowstack-ui/brick/hover-card";
import { Popover } from "@flowstack-ui/brick/popover";

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
  const [removalStatus, setRemovalStatus] = useState("Project is active.");
  const [includeActive, setIncludeActive] = useState(true);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [filterOwner, setFilterOwner] = useState("any");
  const [filterStatus, setFilterStatus] = useState("Showing all active projects.");
  const [workspaceView, setWorkspaceView] = useState("cards");
  const [compactWorkspace, setCompactWorkspace] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.brickAppearance = appearance;
    document.documentElement.style.colorScheme = appearance;
  }, [appearance]);

  function handleInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    setInviteStatus(email ? `Invitation ready for ${email}.` : "Enter an email address.");
  }

  return (
    <Tooltip.Provider>
    <div id="top">
      <AppBar.Root aria-label="Primary" blurred className="site-header" position="sticky">
        <AppBar.Toolbar className="site-header-toolbar" density="compact">
          <AppBar.Start>
            <a className="brand" href="#top" aria-label="Brick Consumer home">
              <span className="brand-mark" aria-hidden="true">B</span>
              <span>Brick Consumer</span>
            </a>
          </AppBar.Start>

          <AppBar.Center>
            <nav className="site-nav" aria-label="Page sections">
              <a href="#workspace">Workspace</a>
              <a href="#invite">Invite</a>
            </nav>
          </AppBar.Center>

          <AppBar.End>
            <Tooltip.Root><Tooltip.Trigger asChild><IconButton aria-label="Jump to workspace" href="#workspace" size="sm"><ArrowIcon /></IconButton></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Jump to workspace<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root>
            <Popover.Root>
              <Popover.Trigger asChild><IconButton aria-label="Workspace settings" size="sm" tone="neutral" variant="ghost"><SettingsIcon /></IconButton></Popover.Trigger>
              <Popover.Portal>
                <Popover.Content align="end" size="sm">
                  <Popover.Title>Workspace settings</Popover.Title>
                  <Popover.Description>Change compact display options for this workspace.</Popover.Description>
                  <Popover.Body>
                    <label className="workspace-setting">
                      <input checked={compactWorkspace} onChange={(event) => setCompactWorkspace(event.currentTarget.checked)} type="checkbox" />
                      Compact project spacing
                    </label>
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

      <div className="site-shell">
        <main>
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">Independent package integration</p>
          <h1 id="hero-title">
            Build useful interfaces
            <span>with clear boundaries.</span>
          </h1>
          <p className="hero-copy">
            This small application consumes Brick exactly through its public package
            exports. Application layout stays here; finished component styling stays in Brick.
          </p>
          <div className="hero-actions">
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
                      <Button onPress={() => setPublishCount((count) => count + 1)}>
                        Publish now
                      </Button>
                    </Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <Button href="#workspace" tone="neutral" variant="outline">
              View workspace
            </Button>
          </div>
          <p className="activity" aria-live="polite">
            {publishCount === 0
              ? "Project has not been published."
              : `Published ${publishCount} ${publishCount === 1 ? "time" : "times"}.`}
          </p>
        </section>

        <section className="workspace" id="workspace" aria-labelledby="workspace-title">
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

          <p className="activity filter-status" aria-live="polite">{filterStatus}</p>

          <div className="workspace-grid" data-compact={compactWorkspace ? "true" : undefined} data-view={workspaceView}>
            <Card.Root
              aria-labelledby="project-title"
              as="article"
              className="project-panel"
              size="lg"
              variant="elevated"
            >
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
                          <a className="collaborator-link" href="#ada-profile">Ada Lovelace</a>
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
                <ul>
                  <li><span aria-hidden="true">✓</span> Mobile layout checked</li>
                  <li><span aria-hidden="true">✓</span> Keyboard path checked</li>
                  <li><span aria-hidden="true">✓</span> Package build checked</li>
                </ul>
              </Card.Content>
              <Card.Footer>
                <Button fullWidth tone="success" variant="soft">Review checklist</Button>
              </Card.Footer>
            </Card.Root>
          </div>
        </section>

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
              Collaboration · Use a normal application form with a finished Brick action.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <form onSubmit={handleInvite}>
              <label htmlFor="email">Work email</label>
              <div className="invite-controls">
                <input id="email" name="email" type="email" autoComplete="email" required />
                <Button type="submit">Prepare invitation</Button>
              </div>
              <p className="activity" aria-live="polite">{inviteStatus}</p>
            </form>
          </Card.Content>
        </Card.Root>
        </main>

        <footer>
          <p>Public Brick imports. Application-owned composition. No Core compatibility layer.</p>
          <Button href="#top" size="sm" tone="neutral" variant="ghost">
            Back to top
          </Button>
        </footer>
      </div>
    </div>
    </Tooltip.Provider>
  );
}
