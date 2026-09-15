const fs = require('fs');
const path = require('path');

const dir = path.join('assets', 'icons');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.svg'));
const entries = [];

for (const file of files) {
  let key = file
    .replace(/\.svg$/i, '')
    .replace(/ Streamline Core(-\d+)?$/i, '$1')
    .replace(/--[^.]+/, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');

  let xml = fs
    .readFileSync(path.join(dir, file), 'utf8')
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^<\?xml[^>]*>/, '')
    .trim();

  entries.push({ key, file, xml });
}

const used = new Map();
for (const e of entries) {
  let k = e.key;
  let i = 2;
  while (used.has(k)) {
    k = `${e.key}_${i++}`;
  }
  used.set(k, true);
  e.exportKey = k;
}

const lines = [];
lines.push('/* Auto-generated from assets/icons — do not edit by hand */');
lines.push('export const ICON_XML = {');
for (const e of entries) {
  const escaped = e.xml.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  lines.push(`  ${JSON.stringify(e.exportKey)}: \`${escaped}\`,`);
}
lines.push('} as const;');
lines.push('');
lines.push('export type IconAssetName = keyof typeof ICON_XML;');
lines.push('');

fs.writeFileSync(path.join('src', 'components', 'avenra', 'icon-assets.ts'), lines.join('\n'));
console.log(`Wrote ${entries.length} icons`);
for (const e of entries) {
  console.log(`${e.exportKey} <= ${e.file}`);
}
