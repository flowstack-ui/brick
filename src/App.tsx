import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Dialog } from "@flowstack-ui/brick/dialog";

type Appearance = "light" | "dark";

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

function getInitialAppearance(): Appearance {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function App() {
  const [appearance, setAppearance] = useState<Appearance>(getInitialAppearance);
  const [publishCount, setPublishCount] = useState(0);
  const [inviteStatus, setInviteStatus] = useState("No invitation sent yet.");

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
    <div className="site-shell" id="top">
      <header className="site-header" aria-label="Primary">
        <a className="brand" href="#top" aria-label="Brick Consumer home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>Brick Consumer</span>
        </a>

        <nav className="site-nav" aria-label="Page sections">
          <a href="#workspace">Workspace</a>
          <a href="#invite">Invite</a>
        </nav>

        <Button
          className="appearance-button"
          size="sm"
          tone="neutral"
          variant="ghost"
          startIcon={<SparkIcon />}
          onPress={() => setAppearance((current) => current === "light" ? "dark" : "light")}
        >
          {appearance === "light" ? "Dark appearance" : "Light appearance"}
        </Button>
      </header>

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
            <span className="status">3 tasks ready</span>
          </div>

          <div className="workspace-grid">
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
              </Card.Header>
              <Card.Content>
                <dl className="project-stats">
                  <div><dt>Progress</dt><dd>78%</dd></div>
                  <div><dt>Reviewers</dt><dd>4</dd></div>
                  <div><dt>Due</dt><dd>Friday</dd></div>
                </dl>
              </Card.Content>
              <Card.Footer className="panel-actions">
                <Button size="sm" variant="soft">Open project</Button>
                <Button size="sm" tone="neutral" variant="ghost">View activity</Button>
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
  );
}
