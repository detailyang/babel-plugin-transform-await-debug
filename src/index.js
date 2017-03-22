const placeholder = '__awaitdebug__';

module.exports = function(babel) {
  const t = babel.types;
  const AwaitExpressionVisitor = function(path) {
    if (path.awaitdebug) return;
    if (path.scope.block.type == 'FunctionDeclaration') {
      if (path.scope.block.id.name == placeholder) {
        return;
      }
    }

    path.awaitdebug = true;

    var lineno = "@" + path.node.loc.start.line + ":" + path.node.loc.start.column;

    path.replaceWith(
        t.awaitExpression(
          t.callExpression(
            t.Identifier(placeholder), [path.node.argument,
            t.binaryExpression("+", t.Identifier("__filename"), t.StringLiteral(lineno))])
        )
    );
  };

  return {
    visitor: {
      AwaitExpression: AwaitExpressionVisitor,
      Program: {
        enter(path) {
          path.traverse({
            AwaitExpression: AwaitExpressionVisitor
          });
          path.unshiftContainer('body', [
            t.functionDeclaration(t.Identifier(placeholder), [t.Identifier("arg"), t.Identifier("span")],
              t.BlockStatement([
                t.expressionStatement(t.callExpression(t.memberExpression(t.Identifier("console"), t.Identifier("time")), [t.Identifier("span")])),
                t.variableDeclaration("const",
                  [t.variableDeclarator(t.identifier("rv"),t.awaitExpression(t.Identifier("arg")))]),
                t.expressionStatement(t.callExpression(t.memberExpression(t.Identifier("console"), t.Identifier("timeEnd")), [t.Identifier("span")])),
                t.returnStatement(t.Identifier("rv"))
              ]),
            false, true)
          ]);
        }
      }
    }
  };
}
