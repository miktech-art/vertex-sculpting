import * as THREE from 'three';
import { resolveMappings } from '../../../sculpt/src/model.js';
import { buildGeometry } from '../../../sculpt/src/visual/sculpture.js';

const previews = new WeakMap();
const limit = value => Math.max(0, Math.min(1, value));

// Use the saved mappings, spectrum, envelope and echo train, exactly as Sculpt does.
// Rotate its front view onto the box's XZ plane, retaining its actual third dimension.
export function sculpturePreview(document) {
  if (previews.has(document)) return previews.get(document);
  const source = buildGeometry(document.params, resolveMappings(document.params, document.routes));
  const lines = { positions: [], opacity: [] }, particles = { positions: [], opacity: [], sizes: [] };
  const point = (p, copy) => [
    p.x + copy.offset.x,
    -(p.z + copy.offset.z),
    p.y + copy.offset.y,
  ];
  for (const copy of source.echoLayout.copies) {
    const gain = copy.gain ** 0.7 * source.brightness;
    for (const line of source.lines) {
      const alpha = limit(line.alpha * Math.min(3, line.filterGain ?? 1) ** 0.7 * gain);
      if (alpha < 0.002) continue;
      for (let i = 1; i < line.points.length; i++) {
        lines.positions.push(...point(line.points[i - 1], copy), ...point(line.points[i], copy));
        lines.opacity.push(alpha, alpha);
      }
    }
    for (const p of source.particles) {
      const alpha = limit(p.alpha * gain);
      if (alpha < 0.002) continue;
      particles.positions.push(...point(p, copy));
      particles.opacity.push(alpha);
      particles.sizes.push(p.size);
    }
  }
  const bounds = new THREE.Box3();
  const p = new THREE.Vector3();
  for (const vertices of [lines.positions, particles.positions])
    for (let i = 0; i < vertices.length; i += 3) bounds.expandByPoint(p.fromArray(vertices, i));
  if (bounds.isEmpty()) bounds.set(new THREE.Vector3(), new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  for (const vertices of [lines.positions, particles.positions])
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i] -= center.x; vertices[i + 1] -= center.y; vertices[i + 2] -= center.z;
    }
  const result = { lines, particles, size: bounds.getSize(new THREE.Vector3()) };
  previews.set(document, result);
  return result;
}

function material(points) {
  return new THREE.ShaderMaterial({
    transparent: true, depthTest: false, depthWrite: false,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    uniforms: {
      // Ink violet stays readable against Beatbox's light canvas.
      uColor: { value: new THREE.Color('#49345e') },
      uOpacity: { value: 1 }, uPixelRatio: { value: 1 },
    },
    vertexShader: `attribute float aOpacity; varying float vOpacity;
      ${points ? 'attribute float aSize; uniform float uPixelRatio;' : ''}
      void main() {
        vOpacity = aOpacity;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        ${points ? 'gl_PointSize = max(1.0, aSize * 1.8) * uPixelRatio;' : ''}
      }`,
    fragmentShader: `uniform vec3 uColor; uniform float uOpacity; varying float vOpacity;
      void main() {
        float a = vOpacity * uOpacity;
        ${points ? 'a *= 1.0 - smoothstep(0.25, 0.5, length(gl_PointCoord - 0.5));' : ''}
        gl_FragColor = vec4(uColor * a, a);
      }`,
  });
}

export class BoxSculpture {
  constructor(parent, layer) {
    this.group = new THREE.Group();
    this.group.name = 'Static Sculpt instrument';
    this.layer = layer;
    parent.add(this.group);
  }

  setDocument(document) {
    if (this.document === document) return;
    this.clear();
    this.document = document;
    const preview = this.preview = sculpturePreview(document);
    for (const [kind, data] of Object.entries({ lines: preview.lines, particles: preview.particles })) {
      if (!data.positions.length) continue;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3));
      geometry.setAttribute('aOpacity', new THREE.Float32BufferAttribute(data.opacity, 1));
      const points = kind === 'particles';
      if (points) geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(data.sizes, 1));
      const object = points ? new THREE.Points(geometry, material(true)) : new THREE.LineSegments(geometry, material(false));
      object.layers.set(this.layer);
      object.frustumCulled = false;
      this.group.add(object);
    }
  }

  fit(bounds, worldScale, { idle = false, focus = 1, pixelRatio = 1 } = {}) {
    const size = bounds.getSize(new THREE.Vector3());
    const scale = new THREE.Vector3(Math.abs(worldScale.x), Math.abs(worldScale.y), Math.abs(worldScale.z));
    let fit = Infinity;
    for (const axis of ['x', 'y', 'z'])
      if (this.preview.size[axis] > 1e-6)
        fit = Math.min(fit, Math.max(1e-6, size[axis] * scale[axis]) * 0.78 / this.preview.size[axis]);
    if (!Number.isFinite(fit)) fit = 1;
    this.group.position.copy(bounds.getCenter(new THREE.Vector3()));
    // Counter nonuniform box scaling so the saved sculpture keeps its proportions.
    this.group.scale.set(fit / Math.max(1e-6, scale.x), fit / Math.max(1e-6, scale.y), fit / Math.max(1e-6, scale.z));
    for (const object of this.group.children) {
      object.material.uniforms.uOpacity.value = (idle ? 0.4 : 1) * (0.55 + 0.45 * focus);
      object.material.uniforms.uPixelRatio.value = pixelRatio;
    }
  }

  clear() {
    for (const object of [...this.group.children]) {
      object.geometry.dispose(); object.material.dispose(); this.group.remove(object);
    }
    this.document = null;
  }

  dispose() { this.clear(); this.group.removeFromParent(); }
}
