import { Prose } from "@flowstack-ui/brick";

export function ProseLists() {
  return (
    <Prose>
      <h2>Plan your workspace</h2>
      <ul>
        <li>
          <p>Create a project.</p>
          <p>Add a short description that explains its purpose.</p>
          <ul>
            <li>Invite your team.</li>
            <li>Assign clear responsibilities.</li>
          </ul>
        </li>
        <li>Review the first milestone.</li>
      </ul>
      <ol>
        <li>Draft</li>
        <li>Review</li>
        <li>Publish</li>
      </ol>
      <dl>
        <dt>Workspace</dt>
        <dd>A shared home for your team's projects.</dd>
        <dt>Project</dt>
        <dd>A focused collection of tasks and resources.</dd>
      </dl>
    </Prose>
  );
}
