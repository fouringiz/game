// Search the actual prototype simulation for an affordable wave-4 defense that
// holds the swarm while allowing the Coordinator to return to the entrance.
// The broad 0.25-second scan is only a shortlist heuristic; conclusions come
// solely from the 1/60-second replays in `verified`.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '../prototype/index.html'), 'utf8');
const source = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const canvas = {getContext: () => ({}), style: {}, addEventListener() {}};
const context = vm.createContext({
  document: {getElementById: () => canvas}, window: {devicePixelRatio: 1},
  innerWidth: 960, innerHeight: 540, addEventListener() {}, requestAnimationFrame() {}, performance: {now: () => 0},
});
vm.runInContext(source, context);

const scenario = `
function coordinatorTrial(layout, counter, clearMutation, dt) {
  dt = dt || 0.25;
  reset(); S.credits = 10000;
  for (const item of layout) build(SLOTS[item.slot], item.type);
  S.credits = 0; S.wave = 3; startWave();
  let steps = 0;
  while (S.phase === 'wave' && steps++ < 30000) update(dt);
  const afterFour = {gate:S.gate, leaked:S.waveLeaked, escaped:S.coordEscaped, mutations:[...S.mutations], report:S.report};
  if (clearMutation) S.mutations = [];
  S.credits = 10000;
  for (const item of counter || []) build(SLOTS[item.slot], item.type);
  S.credits = 0;
  startWave(); steps = 0;
  while (S.phase === 'wave' && steps++ < 30000) update(dt);
  return {layout, counter:counter||[], afterFour, afterFive:{gate:S.gate, leaked:S.waveLeaked, mutations:[...S.mutations], report:S.report}, towers:S.towers.map(t=>({type:t.type,slot:SLOTS.indexOf(t.slot)}))};
}
function waveFour(layout) {
  reset(); S.credits = 10000;
  for (const item of layout) build(SLOTS[item.slot], item.type);
  S.credits = 0; S.wave = 3; startWave();
  let steps = 0;
  while (S.phase === 'wave' && steps++ < 4000) update(0.25);
  return {layout, gate:S.gate, leaked:S.waveLeaked, escaped:S.coordEscaped, mutations:[...S.mutations], report:S.report};
}
`;
vm.runInContext(scenario, context);
const run = (layout, counter, clearMutation=false, dt=0.25) => vm.runInContext(`coordinatorTrial(${JSON.stringify(layout)},${JSON.stringify(counter)},${clearMutation},${dt})`, context);
const waveFour = layout => vm.runInContext(`waveFour(${JSON.stringify(layout)})`, context);

const candidates = [];
// Affordable starting loadouts. Generators are unnecessary below 40 draw.
for (let a = 0; a < 16; a++) for (const ta of ['turret', 'cannon']) {
  for (let b = a + 1; b < 16; b++) for (const tb of ['turret', 'cannon']) {
    const layout = [{slot:a,type:ta},{slot:b,type:tb}];
    const cost = layout.reduce((n,x)=>n+(x.type==='turret'?60:110),0);
    if (cost > 200) continue;
    const r = run(layout);
    if (r.afterFour.escaped && r.afterFour.gate > 0) candidates.push({layout, gate:r.afterFour.gate, leaked:r.afterFour.leaked});
  }
}
// Also test one-tower starts and a third affordable Turret.
for (let a = 0; a < 16; a++) for (const type of ['turret','cannon']) {
  const r = run([{slot:a,type}]);
  if (r.afterFour.escaped && r.afterFour.gate > 0) candidates.push({layout:[{slot:a,type}], gate:r.afterFour.gate, leaked:r.afterFour.leaked});
}
for (let a = 0; a < 16; a++) for (let b = a + 1; b < 16; b++) for (let c = b + 1; c < 16; c++) {
  const r = run([{slot:a,type:'turret'},{slot:b,type:'turret'},{slot:c,type:'turret'}]);
  if (r.afterFour.escaped && r.afterFour.gate > 0) candidates.push({layout:[{slot:a,type:'turret'},{slot:b,type:'turret'},{slot:c,type:'turret'}], gate:r.afterFour.gate, leaked:r.afterFour.leaked});
}

// By wave four a player can have reinvested bounties, so scan denser layouts
// too. Search wave four only, then replay promising ones through wave five.
for (let a = 0; a < 16; a++) for (let b = a + 1; b < 16; b++) for (let c = b + 1; c < 16; c++) for (let d = c + 1; d < 16; d++) {
  const layout = [a,b,c,d].map(slot => ({slot,type:'turret'}));
  const r = waveFour(layout);
  if (r.escaped && r.gate > 0) candidates.push(r);
}
for (let cannon = 0; cannon < 16; cannon++) for (let a = 0; a < 16; a++) for (let b = a + 1; b < 16; b++) {
  if (cannon === a || cannon === b) continue;
  const layout = [{slot:cannon,type:'cannon'},{slot:a,type:'turret'},{slot:b,type:'turret'}];
  const r = waveFour(layout);
  if (r.escaped && r.gate > 0) candidates.push(r);
}

const shortlist = candidates.sort((a,b) => b.gate - a.gate || a.leaked - b.leaked).slice(0, 30);
const samples = shortlist.map(base => {
  const noCounter = run(base.layout);
  const withoutMutation = run(base.layout, [], true);
  const used = new Set(base.layout.map(x => x.slot));
  const counters = [];
  for (let slot = 0; slot < 16; slot++) if (!used.has(slot)) {
    const result = run(base.layout, [{slot,type:'turret'}]);
    counters.push(result);
  }
  counters.sort((a,b) => b.afterFive.gate - a.afterFive.gate || a.afterFive.leaked - b.afterFive.leaked);
  return {layout:base.layout, afterFour:noCounter.afterFour, withoutMutation:withoutMutation.afterFive, withoutCounter:noCounter.afterFive, bestTurretCounter:counters[0].afterFive,
          counterSlot:counters[0].counter[0].slot};
});
const verified = samples.map(sample => ({
  layout: sample.layout,
  counterSlot: sample.counterSlot,
  afterFour: run(sample.layout, [], false, 1/60).afterFour,
  withoutMutation: run(sample.layout, [], true, 1/60).afterFive,
  withoutCounter: run(sample.layout, [], false, 1/60).afterFive,
  withTurretCounter: run(sample.layout, [{slot:sample.counterSlot,type:'turret'}], false, 1/60).afterFive,
})).sort((a,b) => (b.withoutMutation.gate-b.withoutCounter.gate) - (a.withoutMutation.gate-a.withoutCounter.gate));
const output = {found:candidates.length, samples, verified};
console.log(JSON.stringify(output, null, 2));
