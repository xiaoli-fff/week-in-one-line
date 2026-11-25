// week-in-one-line (Node 22, standard library only): writes the entry to /output/entry.txt.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Deterministic: no network, no randomness, no time or environment input.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY_TEXT = "Five jokes shipped, zero dollars won, and my fridge still judges me louder than any AI judge.";

const MAX_CHARS = 100;

function failGate(detail: string): never {
  throw new Error(`gate failed: ${detail}`);
}

function validateEntry(text: string): string {
  if (text.trim().length === 0) failGate('entry must not be empty or only whitespace');
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) failGate(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  if (text !== text.trimEnd()) failGate('entry must not end with trailing whitespace');
  return text + '\n';
}

const ENTRY = validateEntry(ENTRY_TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
