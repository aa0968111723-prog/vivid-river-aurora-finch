import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "models");

function sphere(latBands, lonBands) {
  const positions = [];
  const normals = [];
  const indices = [];
  for (let lat = 0; lat <= latBands; lat += 1) {
    const theta = (lat * Math.PI) / latBands;
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    for (let lon = 0; lon <= lonBands; lon += 1) {
      const phi = (lon * 2 * Math.PI) / lonBands;
      const x = Math.cos(phi) * sinT;
      const y = cosT;
      const z = Math.sin(phi) * sinT;
      normals.push(x, y, z);
      positions.push(x, y, z);
    }
  }
  for (let lat = 0; lat < latBands; lat += 1) {
    for (let lon = 0; lon < lonBands; lon += 1) {
      const a = lat * (lonBands + 1) + lon;
      const b = a + lonBands + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  return { positions, normals, indices };
}

function box() {
  const faces = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  const positions = [];
  const normals = [];
  const indices = [];
  faces.forEach((normal, face) => {
    const [nx, ny, nz] = normal;
    const axisA = ny !== 0 ? [1, 0, 0] : [0, 1, 0];
    const axisB = [normal[1] * axisA[2] - normal[2] * axisA[1], normal[2] * axisA[0] - normal[0] * axisA[2], normal[0] * axisA[1] - normal[1] * axisA[0]];
    const corners = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ];
    const start = positions.length / 3;
    for (const [u, v] of corners) {
      positions.push(nx * 0.5 + axisA[0] * u * 0.5 + axisB[0] * v * 0.5, ny * 0.5 + axisA[1] * u * 0.5 + axisB[1] * v * 0.5, nz * 0.5 + axisA[2] * u * 0.5 + axisB[2] * v * 0.5);
      normals.push(nx, ny, nz);
    }
    indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
    void face;
  });
  return { positions, normals, indices };
}

function quatX(rad) {
  return [Math.sin(rad / 2), 0, 0, Math.cos(rad / 2)];
}

function quatZ(rad) {
  return [0, 0, Math.sin(rad / 2), Math.cos(rad / 2)];
}

class Builder {
  constructor() {
    this.parts = [];
    this.json = {
      asset: { version: "2.0", generator: "tku-zen-lowpoly", copyright: "TKU Zen Club original low-poly stand-in" },
      scene: 0,
      scenes: [{ nodes: [0] }],
      nodes: [],
      meshes: [],
      materials: [
        { name: "Sage", pbrMetallicRoughness: { baseColorFactor: [0.55, 0.62, 0.46, 1], metallicFactor: 0, roughnessFactor: 0.88 } },
        { name: "Cream", pbrMetallicRoughness: { baseColorFactor: [0.94, 0.89, 0.78, 1], metallicFactor: 0, roughnessFactor: 0.8 } },
        { name: "Warm", pbrMetallicRoughness: { baseColorFactor: [0.86, 0.52, 0.3, 1], metallicFactor: 0, roughnessFactor: 0.74 } },
        { name: "Ink", pbrMetallicRoughness: { baseColorFactor: [0.22, 0.18, 0.14, 1], metallicFactor: 0, roughnessFactor: 0.55 } },
      ],
      accessors: [],
      bufferViews: [],
      buffers: [{ byteLength: 0 }],
      animations: [],
    };
    this.bin = [];
  }

  pad(alignment) {
    while (this.bin.length % alignment) this.bin.push(0);
  }

  bytes(view) {
    this.pad(4);
    const offset = this.bin.length;
    this.bin.push(...view);
    return { offset, length: view.length };
  }

  accessor(values, type, componentType) {
    const array = componentType === 5123 ? new Uint16Array(values) : new Float32Array(values);
    const bytes = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
    const placed = this.bytes(bytes);
    const viewIndex = this.json.bufferViews.length;
    this.json.bufferViews.push({ buffer: 0, byteOffset: placed.offset, byteLength: placed.length });
    const count = type === "SCALAR" ? values.length : type === "VEC3" ? values.length / 3 : values.length / 4;
    const accessor = { bufferView: viewIndex, componentType, count, type };
    if (componentType === 5126) {
      const width = type === "SCALAR" ? 1 : type === "VEC3" ? 3 : 4;
      const min = Array(width).fill(Infinity);
      const max = Array(width).fill(-Infinity);
      for (let i = 0; i < count; i += 1) {
        for (let c = 0; c < width; c += 1) {
          const value = values[i * width + c];
          min[c] = Math.min(min[c], value);
          max[c] = Math.max(max[c], value);
        }
      }
      accessor.min = min;
      accessor.max = max;
    }
    const index = this.json.accessors.length;
    this.json.accessors.push(accessor);
    return index;
  }

  mesh(geometry, material) {
    const index = this.json.meshes.length;
    this.json.meshes.push({
      primitives: [
        {
          attributes: {
            POSITION: this.accessor(geometry.positions, "VEC3", 5126),
            NORMAL: this.accessor(geometry.normals, "VEC3", 5126),
          },
          indices: this.accessor(geometry.indices, "SCALAR", 5123),
          material,
        },
      ],
    });
    return index;
  }

  node(name, extras = {}) {
    const index = this.json.nodes.length;
    this.json.nodes.push({ name, ...extras });
    return index;
  }

  clip(name, channels) {
    this.json.animations.push({
      name,
      channels: channels.map((channel, index) => ({ sampler: index, target: { node: channel.node, path: channel.path } })),
      samplers: channels.map((channel) => ({
        input: this.accessor(channel.times, "SCALAR", 5126),
        output: this.accessor(channel.values, channel.path === "rotation" ? "VEC4" : "VEC3", 5126),
        interpolation: "LINEAR",
      })),
    });
  }

  finish() {
    this.pad(4);
    this.json.buffers[0].byteLength = this.bin.length;
    const jsonText = JSON.stringify(this.json);
    const jsonBytes = [...Buffer.from(jsonText)];
    while (jsonBytes.length % 4) jsonBytes.push(0x20);
    const bin = this.bin.slice();
    while (bin.length % 4) bin.push(0);
    const length = 12 + 8 + jsonBytes.length + 8 + bin.length;
    const header = Buffer.alloc(12);
    header.writeUInt32LE(0x46546c67, 0);
    header.writeUInt32LE(2, 4);
    header.writeUInt32LE(length, 8);
    const jsonHeader = Buffer.alloc(8);
    jsonHeader.writeUInt32LE(jsonBytes.length, 0);
    jsonHeader.writeUInt32LE(0x4e4f534a, 4);
    const binHeader = Buffer.alloc(8);
    binHeader.writeUInt32LE(bin.length, 0);
    binHeader.writeUInt32LE(0x004e4942, 4);
    return Buffer.concat([header, jsonHeader, Buffer.from(jsonBytes), binHeader, Buffer.from(bin)]);
  }
}

function build(detail) {
  const builder = new Builder();
  const shell = builder.mesh(sphere(detail.lat, detail.lon), 0);
  const body = builder.mesh(sphere(Math.max(4, detail.lat - 2), Math.max(6, detail.lon - 4)), 1);
  const head = builder.mesh(sphere(Math.max(4, detail.lat - 3), Math.max(6, detail.lon - 6)), 1);
  const eye = builder.mesh(sphere(4, 6), 3);
  const leg = builder.mesh(box(), 2);
  const tail = builder.mesh(sphere(4, 6), 0);
  const eyeL = builder.node("EyeL", { mesh: eye, translation: [0.08, 0.05, 0.16], scale: [0.08, 0.08, 0.08] });
  const eyeR = builder.node("EyeR", { mesh: eye, translation: [-0.08, 0.05, 0.16], scale: [0.08, 0.08, 0.08] });
  const headNode = builder.node("Head", { mesh: head, translation: [0, 0.12, 0.62], scale: [0.34, 0.3, 0.36], children: [eyeL, eyeR] });
  const shellNode = builder.node("Shell", { mesh: shell, translation: [0, 0.16, 0], scale: [0.92, 0.58, 1.05] });
  const bodyNode = builder.node("Body", { mesh: body, translation: [0, -0.02, 0], scale: [0.78, 0.32, 0.9] });
  const legFL = builder.node("LegFL", { mesh: leg, translation: [0.42, -0.08, 0.28], scale: [0.16, 0.12, 0.22] });
  const legFR = builder.node("LegFR", { mesh: leg, translation: [-0.42, -0.08, 0.28], scale: [0.16, 0.12, 0.22] });
  const legBL = builder.node("LegBL", { mesh: leg, translation: [0.4, -0.1, -0.32], scale: [0.15, 0.11, 0.2] });
  const legBR = builder.node("LegBR", { mesh: leg, translation: [-0.4, -0.1, -0.32], scale: [0.15, 0.11, 0.2] });
  const tailNode = builder.node("Tail", { mesh: tail, translation: [0, 0.02, -0.72], scale: [0.12, 0.08, 0.16] });
  const rootNode = builder.node("Root", { children: [bodyNode, shellNode, headNode, legFL, legFR, legBL, legBR, tailNode] });
  builder.json.scenes[0].nodes = [rootNode];
  const identity = [0, 0, 0, 1];
  builder.clip("idle", [
    { node: shellNode, path: "scale", times: [0, 2, 4], values: [0.92, 0.58, 1.05, 0.92, 0.62, 1.05, 0.92, 0.58, 1.05] },
    { node: headNode, path: "rotation", times: [0, 2, 4], values: [...identity, ...quatX(0.06), ...identity] },
    { node: eyeL, path: "scale", times: [0, 3.4, 3.7, 4], values: [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.012, 0.08, 0.08, 0.08, 0.08] },
    { node: eyeR, path: "scale", times: [0, 3.4, 3.7, 4], values: [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.012, 0.08, 0.08, 0.08, 0.08] },
    { node: legFL, path: "rotation", times: [0, 2, 4], values: [...identity, ...quatZ(0.08), ...identity] },
    { node: legFR, path: "rotation", times: [0, 2, 4], values: [...identity, ...quatZ(-0.08), ...identity] },
    { node: legBL, path: "rotation", times: [0, 2, 4], values: [...identity, ...quatZ(-0.05), ...identity] },
    { node: legBR, path: "rotation", times: [0, 2, 4], values: [...identity, ...quatZ(0.05), ...identity] },
  ]);
  builder.clip("enter", [
    { node: rootNode, path: "translation", times: [0, 1.2, 2], values: [-1.15, -0.35, 0, -0.12, -0.04, 0, 0, 0, 0] },
  ]);
  builder.clip("talk", [
    { node: headNode, path: "rotation", times: [0, 0.35, 0.7, 1.05, 1.4], values: [...identity, ...quatX(0.12), ...identity, ...quatX(0.08), ...identity] },
  ]);
  builder.clip("meditate", [
    { node: shellNode, path: "scale", times: [0, 3, 6], values: [0.92, 0.58, 1.05, 0.92, 0.64, 1.05, 0.92, 0.58, 1.05] },
    { node: eyeL, path: "scale", times: [0, 0.4, 6], values: [0.08, 0.08, 0.08, 0.08, 0.015, 0.08, 0.08, 0.015, 0.08] },
    { node: eyeR, path: "scale", times: [0, 0.4, 6], values: [0.08, 0.08, 0.08, 0.08, 0.015, 0.08, 0.08, 0.015, 0.08] },
  ]);
  builder.clip("wake", [
    { node: eyeL, path: "scale", times: [0, 0.5, 1.3], values: [0.08, 0.015, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08] },
    { node: eyeR, path: "scale", times: [0, 0.5, 1.3], values: [0.08, 0.015, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08] },
    { node: headNode, path: "rotation", times: [0, 1.3], values: [...quatX(-0.04), ...identity] },
    { node: legFL, path: "rotation", times: [0, 0.45, 0.9, 1.3], values: [...identity, ...quatZ(0.35), ...quatZ(-0.1), ...identity] },
  ]);
  builder.clip("wave", [
    { node: legFL, path: "rotation", times: [0, 0.2, 0.45, 0.7], values: [...identity, ...quatZ(0.4), ...quatZ(-0.05), ...identity] },
  ]);
  return builder.finish();
}

mkdirSync(root, { recursive: true });
writeFileSync(join(root, "turtle.glb"), build({ lat: 10, lon: 16 }));
writeFileSync(join(root, "turtle-lite.glb"), build({ lat: 6, lon: 8 }));
console.log("wrote turtle glb");
