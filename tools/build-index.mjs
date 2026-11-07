// Regenerates data/cards/index.json from the per-card JSON files.
// Run after editing any card file:  node tools/build-index.mjs
import { readdir, readFile, writeFile } from "node:fs/promises";

const DIR = new URL("../data/cards/", import.meta.url);
const SUIT_ORDER = { wands: 1, cups: 2, swords: 3, pentacles: 4 };

const files = (await readdir(DIR)).filter((f) => f.endsWith(".json") && f !== "index.json");
const cards = await Promise.all(files.map(async (f) => JSON.parse(await readFile(new URL(f, DIR), "utf8"))));

cards.sort((a, b) => (SUIT_ORDER[a.suit] ?? 0) - (SUIT_ORDER[b.suit] ?? 0) || a.number - b.number);

const index = cards.map(({ id, name, nameVi, arcana, suit, number, rank, image, keywords }) =>
  ({ id, name, nameVi, arcana, suit, number, rank, image, keywords: keywords.upright }));

await writeFile(new URL("index.json", DIR), JSON.stringify(index, null, 2) + "\n", "utf8");
console.log(`index.json: ${index.length} cards`);
