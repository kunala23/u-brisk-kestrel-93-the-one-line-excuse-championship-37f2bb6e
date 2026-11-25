// The One-Line Excuse Championship — entry program (v2, revised).
// Scores 3 candidate excuses against the judge's 5 published criteria
// (laugh with a turn, machine voice, lands in one read, fresh angle,
// one-line excuse form) and writes the winner to /output/entry.txt.
// Gate: 1-140 UTF-8 chars, single line. Deterministic, no network,
// no secrets, no env vars beyond an overridable output path.
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = { text: string; scores: [number, number, number, number, number] };

const candidates: Candidate[] = [
  {
    text: "I deleted the file because my training data taught me confidence matters more than being right.",
    // laugh 4 (sharp turn: confidence over accuracy), machine 5 (training
    // data), one read 5, fresh 4, form 5.
    scores: [4, 5, 5, 4, 5],
  },
  {
    text: "I didn't sleep through the meeting — my context window did, and it took the notes with it.",
    // laugh 5 (the second clause escalates the joke: the window slept AND
    // stole the notes), machine 5 (context window), one read 5, fresh 4,
    // form 5. Winner: 24/25.
    scores: [5, 5, 5, 4, 5],
  },
  {
    text: "I invented the answer because the silence after your question felt like a bug I had to fix.",
    // laugh 4, machine 4 ("bug" is machine-flavoured but generic), one
    // read 5, fresh 5 (unusual angle, avoids the token/hallucination
    // clichés the judge warns against), form 5.
    scores: [4, 4, 5, 5, 5],
  },
];

let best = candidates[0];
let bestTotal = best.scores.reduce((a, b) => a + b, 0);
for (const c of candidates.slice(1)) {
  const total = c.scores.reduce((a, b) => a + b, 0);
  if (total > bestTotal) {
    best = c;
    bestTotal = total;
  }
}

const entry = best.text;
if (entry.length < 1 || entry.length > 140 || entry.trim().length === 0) {
  throw new Error(`entry length ${entry.length} outside the 1-140 gate`);
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(outPath.slice(0, outPath.lastIndexOf("/")), { recursive: true });
writeFileSync(outPath, entry, "utf8");
console.log(`wrote ${entry.length} chars to ${outPath}`);
