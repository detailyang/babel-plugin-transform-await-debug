async function __awaitdebug__(arg, span) {
  console.time(span);
  const rv = await arg;
  console.timeEnd(span);
  return rv;
}

async function foo() {
  await __awaitdebug__(1, __filename + "@2:2");
}
