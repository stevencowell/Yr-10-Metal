import fs from "node:fs";
import path from "node:path";

const repo = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.resolve(repo, "..", "..");
const theoryPath = path.join(sourceRoot, "..", "task-8a-year-10-metal-theory", "outputs", "YEAR-10-METAL-THEORY-INPUTS.md");
const briefPath = path.join(sourceRoot, "work", "workstreams", "content", "THEORY-BRIEFS.md");
const outputPath = path.join(repo, "guided", "data.js");
const theoryText = fs.readFileSync(theoryPath, "utf8");
const briefText = fs.readFileSync(briefPath, "utf8");

function parseFields(block) {
  const field = (name) => block.match(new RegExp(`- \\*\\*${name}:\\*\\*\\s*([^\\r\\n]+)`, "i"))?.[1].trim() || "";
  return { check: field("Linked knowledge-check concept"), written: field("Written-evidence concept") };
}

const briefHeads = [...briefText.matchAll(/^###\s+(\d+\.\d+)\s+(.+)$/gm)];
const briefs = briefHeads.map((match, index) => {
  const block = briefText.slice(match.index, briefHeads[index + 1]?.index ?? briefText.length);
  return { id: match[1], title: match[2].trim(), ...parseFields(block) };
});

const sectionPattern = /^##\s+(\d+\.\d+) (.+)\r?\n\r?\n### Theory\r?\n\r?\n([\s\S]*?)\r?\n\r?\n### Key takeaways\r?\n\r?\n([\s\S]*?)\r?\n\r?\n### Source boundary\r?\n\r?\n([\s\S]*?)(?=\r?\n\r?\n---|\s*$)/gm;
const authored = new Map([...theoryText.matchAll(sectionPattern)].map((match) => [match[1], {
  id: match[1], title: match[2].trim(), theory: match[3].trim().split(/\r?\n\r?\n/), takeaways: match[4].trim().split(/\r?\n/).map((line) => line.replace(/^-\s*/, "")), boundary: match[5].trim()
}]));

if (authored.size !== 42) throw new Error(`Expected 42 authored theory sections, found ${authored.size}.`);

const moduleMeta = [
  ["1–2", "Brief, evidence and materials", "Translate the approved brief into a safe, source-backed production and folio plan."],
  ["3–4", "Drawings, rails and accurate setup", "Use verified drawings, stock information, datums and quality gates before irreversible work."],
  ["5–6", "Joining and controlled assembly", "Connect drilled features, teacher-approved processes and inspection evidence."],
  ["7–8", "WMS and repeatable work", "Plan lathe work, dimensional control and teacher review through documented hold points."],
  ["9–10", "Costs, flowcharts and terminology", "Coordinate plate, grill and guard production using verified references and fit-up checks."],
  ["11–12", "Industry and environmental responsibility", "Control stability and assembly while considering supported industry and environmental evidence."],
  ["13–14", "Preparation and finishes", "Prepare surfaces and apply the teacher-specified finish system through controlled stages."],
  ["15–16", "Case development and quality", "Interpret developments, control bending and verify case relationships without inventing geometry."],
  ["17–18", "Problem solving and final evidence", "Diagnose production issues and complete evidence-based evaluation for Project 1."],
  ["1–2", "Brief, modifications and job planning", "Start Project 2 with verified requirements, approved changes and a traceable job plan."],
  ["3–4", "Risk, WMS and time/action planning", "Connect risk controls, current procedures, hold points and time decisions."],
  ["5–6", "Alloys and shovel-head production", "Relate material properties, forming and industry practice to the authorised shovel project."],
  ["7–8", "Fits, threads and machining", "Plan source-controlled fits, threads and machining evidence."],
  ["9–10", "Pivot, RPM, assembly and evaluation", "Apply calculations, verify assembly quality and complete the final evidence trail."]
];

const modules = moduleMeta.map((meta, moduleIndex) => {
  const moduleBriefs = briefs.slice(moduleIndex * 3, moduleIndex * 3 + 3);
  const sections = moduleBriefs.map((brief, sectionIndex) => {
    const section = authored.get(brief.id);
    if (!section) throw new Error(`Missing authored section ${brief.id}.`);
    const visualNumber = String(((moduleIndex * 3 + sectionIndex) % 12) + 1).padStart(2, "0");
    return { ...section, visual: { alt: `Illustrative evidence-planning visual for ${brief.title}`, caption: "Illustrative, non-dimensional evidence prompt. Teacher-issued project sources control practical details.", image: `assets/visuals/folio-card-${visualNumber}.png` } };
  });
  return {
    project: moduleIndex < 9 ? "Project 1 · BBQ and Case" : "Project 2 · Folding Camping Shovel",
    projectModule: moduleIndex < 9 ? moduleIndex + 1 : moduleIndex - 8,
    weeks: meta[0], title: meta[1], summary: meta[2], sections,
    checks: moduleBriefs.map((brief, theoryIndex) => ({ theoryIndex, question: brief.check, options: ["Use the verified source, explain the decision and record any unresolved detail.", "Estimate missing details from a similar project so work can continue.", "Rely on appearance and add the evidence after production."], answerIndex: 0, explanation: "Year 10 decisions must remain traceable to verified sources, teacher approval and recorded evidence." })),
    written: moduleBriefs.map((brief, theoryIndex) => ({ theoryIndex, title: `Evidence task · ${brief.id}`, prompt: brief.written, clarification: "Use your own project evidence. Name the source or checkpoint, explain the decision and identify anything still requiring teacher confirmation.", model: "A suitable response identifies the verified requirement or observation, names the evidence source, explains why the decision follows from it, and labels unresolved details as Teacher to confirm." }))
  };
});

const output = `window.COURSE_DATA = ${JSON.stringify({ shortTitle: "Year 10 Metalwork", storagePrefix: "year10-metal", modules }, null, 2)};\n`;
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Built ${modules.length} modules with ${authored.size} ChatGPT-authored sections.`);
