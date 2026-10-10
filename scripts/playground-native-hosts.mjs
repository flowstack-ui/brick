import ts from "typescript";

// Native hosts are intentional in public host composition and Prose content.
// Resolve imports rather than exempting entire component directories.
export function nativeHostFindings(source, fileName) {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const brick = new Map();
  for (const statement of file.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    if (!/^@flowstack-ui\/brick(?:\/[^/]+)?$/u.test(statement.moduleSpecifier.text)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      for (const item of bindings.elements) brick.set(item.name.text, (item.propertyName ?? item.name).text);
    }
  }
  function owner(tag) {
    while (ts.isPropertyAccessExpression(tag)) tag = tag.expression;
    return ts.isIdentifier(tag) ? brick.get(tag.text) : undefined;
  }
  function composed(node) {
    const parent = node.parent;
    if (ts.isJsxElement(parent) && owner(parent.openingElement.tagName)) {
      if (parent.openingElement.attributes.properties.some((attribute) =>
        ts.isJsxAttribute(attribute) && attribute.name.getText(file) === "asChild" &&
        (!attribute.initializer || (ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression?.kind === ts.SyntaxKind.TrueKeyword)))) return true;
    }
    for (let current = parent; current; current = current.parent) {
      if (ts.isJsxAttribute(current) && current.name.getText(file) === "render") {
        const opening = current.parent.parent;
        if ((ts.isJsxOpeningElement(opening) || ts.isJsxSelfClosingElement(opening)) && owner(opening.tagName)) return true;
      }
      if (ts.isJsxElement(current) && owner(current.openingElement.tagName) === "Prose") return true;
    }
    return false;
  }
  const findings = [];
  function enclosingFunction(node) {
    for (let current = node.parent; current; current = current.parent) {
      if (ts.isFunctionDeclaration(current)) return current.name?.text;
    }
    return undefined;
  }
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(file);
      if (/^(?:h[1-6]|p|input|strong|small)$/u.test(tag)) {
        const element = ts.isJsxOpeningElement(node) ? node.parent : node;
        if (!composed(element)) findings.push({
          line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1,
          host: node.getText(file),
          functionName: enclosingFunction(node),
        });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return findings;
}
