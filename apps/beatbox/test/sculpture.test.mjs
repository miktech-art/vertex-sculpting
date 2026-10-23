import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { makeDocument, resolveMappings } from '../../sculpt/src/model.js';
import { buildGeometry } from '../../sculpt/src/visual/sculpture.js';
import { BoxSculpture, sculpturePreview } from '../src/visual/sculpture.js';

test('box previews retain the saved sculpture geometry, custom mappings, and echo train', () => {
  const doc = makeDocument();
  Object.assign(doc.params, { delayMix: 0.14, delayTime: 0.32, feedback: 0.28, detune: 9 });
  const mapped = resolveMappings(doc.params, doc.routes);
  const source = buildGeometry(doc.params, mapped);
  const preview = sculpturePreview(doc);
  const vertices = source.echoLayout.copies.reduce((n, copy) => n + source.lines.reduce((sum, line) => {
    const alpha = Math.min(1, line.alpha * Math.min(3, line.filterGain ?? 1) ** 0.7 * copy.gain ** 0.7 * source.brightness);
    return sum + (alpha < 0.002 ? 0 : (line.points.length - 1) * 2);
  }, 0), 0);
  assert.equal(preview.lines.positions.length / 3, vertices);
  assert.equal(preview.lines.opacity.length, vertices);
  assert.ok(preview.size.x > source.length, 'include the saved delay echoes');
  assert.strictEqual(sculpturePreview(doc), preview, 'reuse immutable document geometry');
  const changed = structuredClone(doc);
  changed.routes = changed.routes.filter(route => !['body', 'twist', 'spread', 'grain'].includes(route.target));
  assert.notDeepEqual(sculpturePreview(changed).lines.positions, preview.lines.positions);
});

test('static previews fit resized boxes without stretching or changing their geometry', () => {
  const parent = new THREE.Group();
  parent.scale.set(2, 0.5, 3);
  const visual = new BoxSculpture(parent, 3);
  visual.setDocument(makeDocument());
  const bounds = new THREE.Box3(new THREE.Vector3(-2, 0, -1), new THREE.Vector3(2, 0.5, 1));
  const first = visual.group.children[0];
  const before = first.geometry.attributes.position.array.slice();
  for (let frame = 0; frame < 20; frame++) visual.fit(bounds, parent.scale, { idle: frame % 2 === 0, focus: 0.5 });
  assert.deepEqual(first.geometry.attributes.position.array, before);
  assert.strictEqual(visual.group.children[0], first, 'do not allocate geometry every frame');
  assert.deepEqual(visual.group.position.toArray(), [0, 0.25, 0]);
  const actual = visual.group.scale.clone().multiply(parent.scale);
  assert.ok(Math.abs(actual.x - actual.y) < 1e-12 && Math.abs(actual.y - actual.z) < 1e-12);
  const room = bounds.getSize(new THREE.Vector3()).multiply(parent.scale).multiplyScalar(0.78);
  const size = visual.preview.size.clone().multiply(actual);
  for (const axis of ['x', 'y', 'z']) assert.ok(size[axis] <= room[axis] + 1e-10);
  assert.ok(visual.group.children.every(object => object.layers.isEnabled(3)));
  visual.dispose();
});

test('switching sculptures and returning to a preset releases preview resources', () => {
  const parent = new THREE.Group(), visual = new BoxSculpture(parent, 3);
  const first = makeDocument(), second = structuredClone(first);
  second.params.pitch *= 2;
  visual.setDocument(first);
  const objects = [...visual.group.children];
  let released = 0;
  for (const object of objects) {
    object.geometry.addEventListener('dispose', () => released++);
    object.material.addEventListener('dispose', () => released++);
  }
  visual.setDocument(second);
  assert.equal(released, objects.length * 2);
  assert.strictEqual(visual.document, second);
  assert.ok(objects.every(object => object.parent === null));
  visual.dispose();
  assert.equal(parent.children.length, 0);
  assert.equal(visual.group.children.length, 0);
});

test('silent saved sculptures and degenerate box dimensions remain finite', () => {
  const document = makeDocument(); document.params.volume = 0;
  const visual = new BoxSculpture(new THREE.Group(), 3);
  visual.setDocument(document);
  visual.fit(new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), new THREE.Vector3());
  assert.equal(visual.group.children.length, 0);
  assert.ok(visual.group.scale.toArray().every(Number.isFinite));
  visual.dispose();
});
