[![Build Status](https://travis-ci.org/detailyang/babel-plugin-transform-await-debug.svg?branch=master)](https://travis-ci.org/detailyang/babel-plugin-transform-await-debug)

# Purpose

Every Node developers know Node is non-blocking IO model and ES2017 provide the `await`
to allow an asynchronous, non-blocking method call to be performed in a similar way to an ordinary synchronous method call.
Howevery many guys do not care `connect|read|write` timeout and so on. One day the ask that why My node application is hang :(.
The node event loop is waiting the io event happened forever without specify the timeout.
This plugin compiles `await` to insert debug function to record elapsed time as the following:

## =>in

```js
async function foo() {
  let a = await 1;
}
```


## =>out

```js
let foo = (() => {
  var _ref = _asyncToGenerator(function* () {
    let a = yield __awaitdebug__(__filename + "@2:10", 1, arguments);
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const __awaitdebug__ = require("babel-plugin-transform-await-debug").__awaitdebug__;
```

# Use

Install npm module `npm install --save-dev babel-plugin-transform-await-debug` and remember to add
`babel-plugin-transform-await-debug` plugin to babel config

# Custom Debug Function

You can rewrite `src/debug.js` then `npm run build` to generate your code as the following:

## origin

```js
module.exports = {
  __awaitdebug__: async function(span, callee, args) {
    console.time(span);
    const rv = await callee;
    console.timeEnd(span);
    return rv;
  }
}
```

## custom

```js
module.exports = {
  __awaitdebug__: async function(span, callee, args) {
    /*
     * you can do anything what you want to do
     */
    console.time(span);
    const rv = await callee;
    console.timeEnd(span);
    return rv;
  }
}
```

Contributing
------------

To contribute to babel-plugin-transform-await-debug, clone this repo locally and commit your code on a separate branch.

PS: PR Welcome :rocket: :rocket: :rocket: :rocket:


Author
------

> GitHub [@detailyang](https://github.com/detailyang)


License
-------
babel-plugin-transform-await-debug is licensed under the [MIT] license.

[MIT]: https://github.com/detailyang/ybw/blob/master/licenses/MIT
