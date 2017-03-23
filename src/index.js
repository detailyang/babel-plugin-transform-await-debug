const placeholder = '__awaitdebug__';
const __awaitdebug__ = require("./debug").__awaitdebug__;

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
            t.Identifier(placeholder), [
              t.binaryExpression("+", t.Identifier("__filename"), t.StringLiteral(lineno)),
              path.node.argument,
              t.Identifier("arguments")
            ]
          )
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
            t.variableDeclaration("const",
              [
                t.variableDeclarator(t.identifier(placeholder),
                  t.memberExpression(
                    t.callExpression(
                      t.Identifier("require"),
                        [
                          t.StringLiteral("babel-plugin-transform-await-debug")
                        ]
                    ),
                    t.Identifier(placeholder)
                  )
                )
              ]
            ),
          ])
        }
      }
    }
  };
}

module.exports.__awaitdebug__ = __awaitdebug__;
