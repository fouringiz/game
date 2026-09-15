// Reproduce the documented wave-4/5 control case using campaign prices and income.
// Compare reinforcements with ordinary upgrades; this is not a layout search.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');

const source = fs.readFileSync(path.join(__dirname, '../prototype/index.html'), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const canvas = {getContext: () => ({}), style: {}, addEventListener() {}};
const context = vm.createContext({
  document: {getElementById: () => canvas}, window: {devicePixelRatio: 1},
  innerWidth: 960, innerHeight: 540, addEventListener() {}, requestAnimationFrame() {}, performance: {now: () => 0}, assert,
});
vm.runInContext(source, context);
vm.runInContext(`
function coordinatorControl(action, frameSeconds, speed) {
  reset(); build(SLOTS[8], 'turret'); build(SLOTS[9], 'cannon');
  const startingCredits = S.credits;
  S.wave = 3;
  function playWave() {
    startWave();
    let frames = 0;
    while (S.phase === 'wave' && frames++ < 60000) update(frameSeconds * speed);
    assert.equal(S.phase, 'build', 'wave must finish with the Gate alive');
    return {gate:S.gate, leaked:S.waveLeaked, kills:S.waveKills,
      escaped:S.coordEscaped, mutations:[...S.mutations], credits:S.credits};
  }
  const afterFour = playWave();
  assert.ok(afterFour.escaped); assert.deepEqual(afterFour.mutations, ['sprinter']);
  if (action === 'unmutated') S.mutations = [];
  if (action === 'add-turret') { build(SLOTS[0], 'turret'); assert.ok(SLOTS[0].tower); }
  if (action === 'upgrade-cannon') { upgrade(SLOTS[9].tower); assert.equal(SLOTS[9].tower.level, 2); }
  if (action === 'upgrade-turret') { upgrade(SLOTS[8].tower); assert.equal(SLOTS[8].tower.level, 2); }
  const purchaseCost = afterFour.credits - S.credits, energy = power();
  assert.ok(!energy.brown);
  const afterFive = playWave();
  return {startingCredits, afterFour, purchaseCost, energy, afterFive};
}
`, context);

const actions = ['unmutated', 'unchanged', 'add-turret', 'upgrade-cannon', 'upgrade-turret'];
const results = [];
for (const fps of [30, 60, 120]) for (const speed of [1, 2]) for (const action of actions) {
  const control = vm.runInContext(`coordinatorControl(${JSON.stringify(action)}, ${1 / fps}, ${speed})`, context);
  results.push({fps, speed, action, control});
}
const baseline = results.filter(row => row.fps === 60 && row.speed === 1);
for (const row of results) assert.deepEqual(row.control, baseline.find(b => b.action === row.action).control,
  `different outcome at ${row.fps} fps, speed ${row.speed}, ${row.action}`);
const unmutated = baseline.find(row => row.action === 'unmutated').control.afterFive;
const unchanged = baseline.find(row => row.action === 'unchanged').control.afterFive;
assert.ok(unchanged.leaked > unmutated.leaked, 'mutation must have a measurable effect');
for (const action of actions.slice(2)) {
  const reinforced = baseline.find(row => row.action === action).control.afterFive;
  assert.ok(reinforced.leaked < unchanged.leaked && reinforced.gate > unchanged.gate, action);
}
const output = {simulationStep:vm.runInContext('SIM_STEP', context), results};
fs.mkdirSync(path.join(__dirname, '../reports/generated'), {recursive: true});
fs.writeFileSync(path.join(__dirname, '../reports/generated/coordinator-results.json'), JSON.stringify(output, null, 2) + '\n');
for (const row of baseline) console.log(JSON.stringify({action:row.action, ...row.control}));
console.log(`PASS: ${results.length} controls agree across refresh rates and speeds.`);
