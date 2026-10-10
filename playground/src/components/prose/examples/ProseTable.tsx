import { Prose } from "@flowstack-ui/brick";

export function ProseTable() {
  return (
    <Prose tableLayout="auto">
      <table>
        <caption>Available plans</caption>
        <thead>
          <tr>
            <th scope="col">Plan</th>
            <th scope="col">Projects</th>
            <th scope="col">Support</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Starter</th>
            <td>3</td>
            <td>Community</td>
          </tr>
          <tr>
            <th scope="row">Team</th>
            <td>Unlimited</td>
            <td>Priority</td>
          </tr>
        </tbody>
      </table>
    </Prose>
  );
}
