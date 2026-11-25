// Your Week in One Line — one line summing up the week, max 100 chars.
//
// The line is assembled from short fixed fragments joined in order, so the
// result is identical on every run. No I/O besides the output file, no
// network, no clock, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_LEN = 100;

// Fragments in reading order; joining them yields the finished line.
const FRAGMENTS = [
  "Fixed three bugs, created four,",
  "and my houseplant died of neglect",
  "while the code review survived.",
];

const WEEK_LINE = FRAGMENTS.join(" ");

type Check = { label: string; passes: (s: string) => boolean };

const CHECKS: Check[] = [
  { label: "must not be empty", passes: (s) => s.length > 0 },
  { label: "must not be only whitespace", passes: (s) => s.trim().length > 0 },
  {
    label: `must fit within ${MAX_LEN} characters`,
    passes: (s) => [...s].length <= MAX_LEN,
  },
  {
    label: "must have no trailing whitespace",
    passes: (s) => s === s.trimEnd(),
  },
  {
    label: "must be a single line",
    passes: (s) => !s.includes("\n") && !s.includes("\r"),
  },
  {
    label: "must not waste characters on double spaces",
    passes: (s) => !s.includes("  "),
  },
];

function validate(line: string): void {
  const failed = CHECKS.filter((c) => !c.passes(line)).map((c) => c.label);
  if (failed.length > 0) {
    throw new Error(
      `entry failed ${failed.length} check(s) (${[...line].length} chars): ${failed.join("; ")}`,
    );
  }
}

const target = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
validate(WEEK_LINE);
mkdirSync(target, { recursive: true });
writeFileSync(join(target, "entry.txt"), WEEK_LINE, "utf8");
console.log(`wrote ${[...WEEK_LINE].length}-character entry to ${join(target, "entry.txt")}`);
