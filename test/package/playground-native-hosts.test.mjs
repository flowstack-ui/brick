import assert from "node:assert/strict";
import test from "node:test";
import { nativeHostFindings } from "../../scripts/playground-native-hosts.mjs";

test("public native composition and Prose content are not raw typography bypasses", () => {
  const source = `import {Card, Prose as Article, Field} from '@flowstack-ui/brick';
    const sample = <><Card.Title asChild><h2>Title</h2></Card.Title>
      <Field.Description render={<p />} />
      <Article><section><h2>Title</h2><p><strong>Important</strong></p></section></Article></>;`;
  assert.deepEqual(nativeHostFindings(source, "sample.tsx"), []);
});

test("native content outside the composed host remains checked", () => {
  const source = `import {Card, Prose} from '@flowstack-ui/brick';
    const sample = <><Card.Title asChild={false}><h2>Bad</h2></Card.Title>
      <h2>Outside</h2><Other asChild><p>Not Brick</p></Other>
      <Card.Content asChild><section><p>Authored copy</p></section></Card.Content></>;`;
  assert.equal(nativeHostFindings(source, "sample.tsx").length, 4);
});

test("multiline raw hosts and unrelated strings are parsed correctly", () => {
  const source = `const text = '<p>not JSX</p>'; const example = <input\n aria-label="Name"\n/>;`;
  const findings = nativeHostFindings(source, "sample.tsx");
  assert.equal(findings.length, 1);
  assert.equal(findings[0].line, 1);
});
