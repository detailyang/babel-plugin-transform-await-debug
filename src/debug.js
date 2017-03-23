module.exports = {
  __awaitdebug__: async function(span, callee, args) {
    console.time(span);
    const rv = await callee;
    console.timeEnd(span);
    return rv;
  }
}
