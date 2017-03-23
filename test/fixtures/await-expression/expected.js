let foo = (() => {
  var _ref = _asyncToGenerator(function* () {
    yield __awaitdebug__(__filename + "@2:2", 1, arguments);
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const __awaitdebug__ = require("babel-plugin-transform-await-debug").__awaitdebug__;
