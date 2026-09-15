const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(require('node:path').join(__dirname, '../prototype/index.html'), 'utf8');
const canvas = {getContext: () => ({}), style: {}, addEventListener() {}};
const context = vm.createContext({document: {getElementById: () => canvas}, window: {devicePixelRatio: 1}, innerWidth: 960, innerHeight: 540, addEventListener() {}, requestAnimationFrame() {}, performance: {now: () => 0}, assert});
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], context);
const cases = {
  'Sprinter control lab makes the candidate counterplay measurable': `
    startSprinterLab(false);
    for (let i = 0; i < 6000 && S.phase === 'wave'; i++) update(1/60);
    assert.equal(S.lab.kind, 'sprinter'); assert.equal(S.gate, 10); assert.equal(S.waveLeaked, 10);
    startSprinterLab(true);
    for (let i = 0; i < 6000 && S.phase === 'wave'; i++) update(1/60);
    assert.equal(S.gate, GATE_MAX); assert.equal(S.waveLeaked, 0); assert.equal(S.win, true);
  `,
  'leech hunts across the map and retargets after a sale without teleporting': `
    reset(); S.credits = 1000; build(SLOTS[15], 'generator'); build(SLOTS[13], 'generator');
    S.phase = 'wave'; S.wave = 5;
    const e = makeEnemy('leech', 5); S.enemies = [e];
    const nearest = S.towers.reduce((a,b) => Math.hypot(a.x-e.x,a.y-e.y) < Math.hypot(b.x-e.x,b.y-e.y) ? a : b);
    update(0.05); assert.equal(e.gen, nearest); assert.equal(e.state, 'seek');
    assert.ok(e.y > 90); assert.equal(e.d, 0);
    for (let i = 0; i < 100; i++) update(0.05);
    let x = e.x, y = e.y; sell(nearest); update(0.05);
    assert.notEqual(e.gen, nearest); assert.ok(e.gen); assert.ok(Math.hypot(e.x-x,e.y-y) <= e.speed*0.05 + 0.001);
    sell(e.gen); x = e.x; y = e.y; update(0.05);
    assert.equal(e.gen, null); assert.ok(Math.hypot(e.x-x,e.y-y) <= e.speed*0.05 + 0.001);
  `,
  'without generators a leech follows the lane to the gate': `
    reset(); S.phase = 'wave'; S.wave = 5;
    const e = makeEnemy('leech', 5); S.enemies = [e];
    for (let i = 0; i < 2000 && !e.dead; i++) {
      update(0.05); const p = posAt(e.d); assert.equal(e.x,p.x); assert.equal(e.y,p.y);
    }
    assert.ok(e.dead); assert.equal(S.gate, GATE_MAX-e.T.gateDmg);
  `,
  'a sated leech releases power and returns smoothly to the lane': `
    reset(); build(SLOTS[15], 'generator'); S.phase = 'wave'; S.wave = 5;
    const e = makeEnemy('leech',5); S.enemies = [e];
    for (let i=0; i<2000 && !e.sated; i++) update(0.05);
    assert.ok(e.sated); assert.equal(power().prod,80); assert.equal(e.gen,null);
    for (let i=0; i<2000 && !e.dead; i++) {
      const x=e.x,y=e.y; update(0.05);
      assert.ok(Math.hypot(e.x-x,e.y-y) <= e.speed*1.24*0.05+0.001);
    }
    assert.ok(e.dead);
  `,
  'a lone leech can attach to a generator in every build slot': `
    for (let slotIndex = 0; slotIndex < SLOTS.length; slotIndex++) {
      reset(); build(SLOTS[slotIndex], 'generator'); S.phase = 'wave'; S.wave = 5;
      const e = makeEnemy('leech', 5); S.enemies = [e];
      let attached = false;
      for (let i = 0; i < 2000 && !e.dead; i++) {
        update(0.05);
        if (e.state === 'attached') { attached = true; break; }
      }
      assert.ok(attached, 'Leech missed generator in slot ' + slotIndex + ' at ' + SLOTS[slotIndex].x + ',' + SLOTS[slotIndex].y);
    }
  `,
  'artillery leads a retreating coordinator backwards': `
    reset(); build(SLOTS[0], 'cannon');
    const e = makeEnemy('coordinator', 1); e.d = 400; e.dir = -1;
    Object.assign(e, posAt(e.d));
    fireArc(S.towers[0], tstats(S.towers[0]), e);
    const expected = posAt(e.d - e.effSpeed * 0.65);
    assert.equal(S.shells[0].tx, expected.x); assert.equal(S.shells[0].ty, expected.y);
  `,
  'generator stays powered during approach and recovers after feeding': `
    reset(); build(SLOTS[0], 'generator'); S.phase = 'wave'; S.wave = 1;
    const g = S.towers[0], e = makeEnemy('leech', 1);
    e.d = 140; Object.assign(e, posAt(e.d)); S.enemies.push(e);
    update(0.01); assert.equal(e.state, 'seek'); assert.equal(power().prod, 80);
    e.x = g.x; e.y = g.y; update(0.01);
    assert.equal(e.state, 'attached'); assert.equal(power().prod, 40);
    damage(e, 10000, null); assert.equal(power().prod, 80);
  `,
  'reserved damage excludes priority targets and resumes after a miss': `
    reset(); build(SLOTS[0], 'cannon'); const t = S.towers[0], st = tstats(t);
    const e = makeEnemy('coordinator', 1); e.dir = -1; e.x = t.x + 100; e.y = t.y; e.hp = 20; e.incoming = 45;
    const other = makeEnemy('forager', 1); other.x = t.x + 120; other.y = t.y;
    S.enemies = [e, other]; assert.equal(pickTarget(t, st), other);
    e.type = 'leech'; e.state = 'attached'; assert.equal(pickTarget(t, st), other);
    S.enemies = [e]; assert.equal(pickTarget(t, st), null);
    e.incoming = 0; assert.equal(pickTarget(t, st), e);
  `,
  'retreating coordinator actually takes shell damage': `
    reset(); build(SLOTS[0], 'cannon'); const t = S.towers[0];
    const e = makeEnemy('coordinator', 1); e.d = 400; e.dir = -1;
    Object.assign(e, posAt(e.d)); S.enemies = [e]; S.phase = 'wave'; S.wave = 1;
    fireArc(t, tstats(t), e); t.paused = true;
    const initial = e.hp;
    for (let i = 0; i < 14; i++) update(0.05);
    assert.equal(e.hp, initial - tstats(t).dmg); assert.equal(e.incoming, 0);
  `,
  'a missed shell releases its reservation so firing can resume': `
    reset(); build(SLOTS[0], 'cannon'); const t = S.towers[0], st = tstats(t);
    const e = makeEnemy('coordinator', 1); e.d = 350; e.dir = -1; e.hp = 20;
    Object.assign(e, posAt(e.d)); S.enemies = [e]; S.phase = 'wave'; S.wave = 1;
    fireArc(t, st, e); t.paused = true;
    S.shells[0].tx = -1000; S.shells[0].ty = -1000;
    assert.equal(pickTarget(t, st), null);
    for (let i = 0; i < 14; i++) update(0.05);
    assert.equal(e.hp, 20); assert.equal(e.incoming, 0); assert.equal(pickTarget(t, st), e);
  `,
};
let failed = 0;
for (const [name, source] of Object.entries(cases)) {
  try { vm.runInContext(`{${source}}`, context); console.log('PASS', name); }
  catch (error) { failed++; console.error('FAIL', name, error.message); }
}
process.exitCode = failed ? 1 : 0;
