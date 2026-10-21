export function fixture({
  hand = "Right",
  closed = true,
  indexStraight = true,
  y = 0.5,
  x = 0.5,
  score = 0.99,
  pinch = false,
} = {}) {
  const p = Array.from({ length: 21 }, () => ({ x: 0, y: 0, z: 0 }));
  p[1] = { x: 0.45, y: -0.25, z: 0 };
  p[2] = { x: 0.75, y: -0.5, z: 0 };
  p[3] = { x: 1.05, y: -0.75, z: 0 };
  p[4] = { x: 1.35, y: -1, z: 0 };
  for (const [f, mcp] of [5, 9, 13, 17].entries()) {
    const xx = [0.45, 0, -0.3, -0.6][f],
      yy = [-1, -1.1, -1, -0.85][f],
      folded = f === 0 ? !indexStraight : closed;
    p[mcp] = { x: xx, y: yy, z: 0 };
    p[mcp + 1] = { x: xx, y: yy - 0.6, z: folded ? 0.1 : 0 };
    p[mcp + 2] = { x: xx, y: yy + (folded ? -0.3 : -1), z: folded ? 0.6 : 0 };
    p[mcp + 3] = {
      x: xx,
      y: yy + (folded ? 0.35 : -1.4),
      z: folded ? 0.05 : 0,
    };
  }
  if (pinch) {
    p[8] = { x: 0.45, y: -0.8, z: 0.2 };
    p[4] = { x: 0.5, y: -0.8, z: 0.2 };
  }
  const image = p.map((v) => ({
    x: x + v.x * 0.08,
    y: 0.75 + v.y * 0.12,
    z: v.z * 0.08,
  }));
  if (closed && !pinch) image[8].y = y;
  return {
    handedness: [[{ categoryName: hand, score }]],
    worldLandmarks: [p],
    landmarks: [image],
  };
}
export function combine(...results) {
  return Object.fromEntries(
    ["handedness", "worldLandmarks", "landmarks"].map((key) => [
      key,
      results.flatMap((r) => r[key]),
    ]),
  );
}
export function releaseFixture({ leftX = 0.2, rightX = 0.65 } = {}) {
  return combine(
    fixture({ hand: "Left", closed: false, x: leftX }),
    fixture({ pinch: true, indexStraight: false, x: rightX }),
  );
}
