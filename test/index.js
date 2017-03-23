var path = require("path");
var fs = require("fs");
var assert = require("assert");
var transformFileSync = require("babel-core").transformFileSync;
var plugin = require("../lib");

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('Tests babel-plugin-transform-debug', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      var actualPath = path.join(fixtureDir, 'actual.js');
      const actual = transformFileSync(actualPath, {
        plugins: [
          plugin,
        ]
      }).code;

      if (path.sep === '\\') {
        // Specific case of windows, transformFileSync return code with '/'
        actualPath = actualPath.replace(/\\/g, '/');
      }

      const expected = fs.readFileSync(
        path.join(fixtureDir, 'expected.js')
      ).toString().replace(/%FIXTURE_PATH%/g, actualPath);

      assert.equal(trim(actual), trim(expected));
    });
  });
});
