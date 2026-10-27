// Original vector pictograms, rasterised to Stellaris-compatible BGRA DDS.
// No game assets copied. Requires sharp; optionally pass its node_modules folder:
// node tools/generate-message-icons.mjs [path/to/node_modules]
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {messageCategories} from './message-settings.mjs';

const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] ? path.resolve(process.argv[2], 'sharp') : 'sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'gfx/interface/icons/message');
fs.mkdirSync(path.join(output, 'source'), {recursive: true});
const cyan = '#b5eee9', gold = '#ffcd79';
const shapes = {
  firms: `<path d="M9 53V29l14 8V26l15 9V20h9v33Z"/><path d="M16 45h4m8 0h4m8 0h3"/><path stroke="${gold}" d="M10 20 25 8m-9 0h9v9"/>`,
  restructuring: `<path d="M10 25h37l-9-9m9 9-9 9"/><path stroke="${gold}" d="M54 41H17l9 9m-9-9 9-9"/>`,
  automation: `<rect x="12" y="20" width="40" height="33" rx="7"/><path d="M32 12v8M7 31v11m50-11v11M24 44h16"/><circle cx="32" cy="9" r="3" fill="${gold}" stroke="none"/><path stroke="${gold}" stroke-width="5" d="M23 31v3m18-3v3"/>`,
  crises: `<path stroke="${gold}" d="m32 8 25 45H7Z"/><path stroke="${gold}" stroke-width="5" d="M32 23v14"/><circle cx="32" cy="45" r="2.5" fill="${gold}" stroke="none"/>`,
  corporations: `<path d="M8 55h48M12 55V28h12m0 27V10h18v45m0-23h10v23"/><path stroke="${gold}" d="M31 19h4m-4 9h4m-4 9h4m-4 9h4M18 38v6m29-3v5"/>`,
  supply: `<g transform="rotate(-40 32 32)"><rect x="4" y="22" width="32" height="20" rx="10"/><rect stroke="${gold}" x="28" y="22" width="32" height="20" rx="10"/><path d="M23 32h18"/></g>`,
  stations: `<path d="m32 23 9 9-9 9-9-9ZM5 21h12v22H5Zm42 0h12v22H47ZM17 32h6m18 0h6M11 22v20m42-20v20M32 41v13"/><path stroke="${gold}" d="M32 7v10m-5-5h10"/>`,
  megastructures: `<circle cx="32" cy="32" r="10" fill="${gold}" stroke="none"/><path stroke="${gold}" d="M32 8v6m0 36v6M8 32h6m36 0h6M15 15l4 4m26 26 4 4M15 49l4-4m26-26 4-4"/><ellipse cx="32" cy="32" rx="28" ry="15" transform="rotate(-35 32 32)"/>`,
  habitats: `<ellipse cx="32" cy="37" rx="26" ry="12"/><path d="M14 35V30a18 18 0 0 1 36 0v5M7 40v7c10 12 40 12 50 0v-7"/><path stroke="${gold}" d="M23 26v7m9-10v10m9-7v7"/>`,
  military: `<path d="M32 7 53 15v18c0 12-12 21-21 25C23 54 11 45 11 33V15Z"/><path stroke="${gold}" fill="${gold}" stroke-width="1.5" d="m32 19 4 9 10 1-8 7 2 10-8-5-8 5 2-10-8-7 10-1Z"/>`,
  ownership: `<path d="M15 56V9m0 2c10-8 19 9 33 0v21c-14 8-23-8-33 0"/><path stroke="${gold}" d="M29 43h25l-6-6m6 6-6 6M32 54H10"/>`,
  patrons: `<path stroke="${gold}" d="M32 30C7 16 24 4 32 14 40 4 57 16 32 30Z"/><path d="M7 40h9l8-6h13a5 5 0 0 1 0 10H26m12-1 10-7c7-4 13 2 6 8L38 55H20l-4-5H7Z"/>`,
};
const svg = (body, size = 64) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><g fill="none" stroke="${cyan}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;

function dds(rgba, size) {
  const header = Buffer.alloc(128);
  for (const [offset, value] of [[0, 0x20534444], [4, 124], [8, 0x100f], [12, size], [16, size], [20, size * 4], [28, 1], [76, 32], [80, 0x41], [88, 32], [92, 0xff0000], [96, 0xff00], [100, 0xff], [104, 0xff000000], [108, 0x1000]]) header.writeUInt32LE(value, offset);
  const bgra = Buffer.from(rgba);
  for (let i = 0; i < bgra.length; i += 4) { bgra[i] = rgba[i + 2]; bgra[i + 2] = rgba[i]; }
  return Buffer.concat([header, bgra]);
}

let preview = '<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="700" viewBox="0 0 1120 700"><rect width="1120" height="700" fill="#101d28"/><style>text{font-family:Arial,sans-serif;fill:#e0eeef}</style><text x="40" y="48" font-size="24" font-weight="bold">PRIVATE ECONOMY · Nachrichtensymbole</text><text x="40" y="75" font-size="14" fill="#90a6ae">12 Themen · eigene Vektorsymbole · Meldungen 36 × 36 px · Menü 20 × 20 px</text>';
for (const [index, [category, label]] of messageCategories.entries()) {
  const source = svg(shapes[category]);
  fs.writeFileSync(path.join(output, 'source', `pe_message_${category}.svg`), source + '\n');
  for (const size of [36, 20]) {
    // Render oversized before reducing so small transparent icons have smooth edges.
    const pixels = await sharp(Buffer.from(source), {density: 288}).resize(size, size).ensureAlpha().raw().toBuffer();
    fs.writeFileSync(path.join(output, `pe_message_${category}${size === 20 ? '_text' : ''}.dds`), dds(pixels, size));
  }
  const x = 32 + (index % 4) * 272, y = 105 + Math.floor(index / 4) * 190;
  preview += `<rect x="${x}" y="${y}" width="256" height="172" rx="12" fill="#182b38" stroke="#29424d"/><svg x="${x + 94}" y="${y + 15}" width="68" height="68" viewBox="0 0 64 64"><g fill="none" stroke="${cyan}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${shapes[category]}</g></svg>`;
  const labels = label === 'Dyson-Schwärme und Arc Furnaces' ? ['Dyson-Schwärme', 'und Arc Furnaces'] : label === 'Flotten, Schutz und Zitadellen' ? ['Flotten, Schutz', 'und Zitadellen'] : [label];
  labels.forEach((line, n) => { preview += `<text x="${x + 128}" y="${y + 106 + n * 18}" text-anchor="middle" font-size="14">${line}</text>`; });
  // Preview actual exported DDS pixels (not another rendering of the vectors).
  for (const size of [36, 20]) {
    const raw = fs.readFileSync(path.join(output, `pe_message_${category}${size === 20 ? '_text' : ''}.dds`)).subarray(128);
    const rgba = Buffer.from(raw);
    for (let i = 0; i < raw.length; i += 4) { rgba[i] = raw[i + 2]; rgba[i + 2] = raw[i]; }
    const png = await sharp(rgba, {raw: {width: size, height: size, channels: 4}}).png().toBuffer();
    preview += `<image x="${x + (size === 36 ? 93 : 143)}" y="${y + 132}" width="${size}" height="${size}" href="data:image/png;base64,${png.toString('base64')}"/>`;
  }
}
preview += '</svg>';
fs.mkdirSync(path.join(root, 'docs'), {recursive: true});
await sharp(Buffer.from(preview)).png().toFile(path.join(root, 'docs/message-icons.png'));
console.log('Generated 12 original SVG pictograms, 24 DDS textures (36px messages / 20px inline) and docs/message-icons.png.');
