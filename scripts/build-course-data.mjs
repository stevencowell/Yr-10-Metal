import fs from "node:fs";
import path from "node:path";

const repo = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.resolve(repo, "..", "..");
const theoryPath = path.join(sourceRoot, "..", "task-8a-year-10-metal-theory", "outputs", "YEAR-10-METAL-THEORY-INPUTS.md");
const briefPath = path.join(sourceRoot, "work", "workstreams", "content", "THEORY-BRIEFS.md");
const outputPath = path.join(repo, "guided", "data.js");
const questionBankPath = path.join(repo, "source-notes", "QUESTION-BANK.json");
const theoryText = fs.readFileSync(theoryPath, "utf8");
const briefText = fs.readFileSync(briefPath, "utf8");
const questionBank = JSON.parse(fs.readFileSync(questionBankPath, "utf8"));

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
if (questionBank.authoredVia !== "Signed-in ChatGPT in the in-app browser, one named theory section at a time") throw new Error("Question bank authoring provenance is missing.");
if (questionBank.sections?.length !== 42) throw new Error(`Expected 42 question-bank sections, found ${questionBank.sections?.length ?? 0}.`);

const questionSections = new Map(questionBank.sections.map((section) => [section.id, section]));
briefs.forEach((brief) => {
  const bankSection = questionSections.get(brief.id);
  if (!bankSection || bankSection.title !== brief.title) throw new Error(`Question bank does not match theory section ${brief.id}.`);
  if (bankSection.questions?.length !== 10) throw new Error(`Expected 10 authored questions for ${brief.id}.`);
  bankSection.questions.forEach((question, index) => {
    if (!question.question?.trim() || question.options?.length !== 3 || ![0, 1, 2].includes(question.answerIndex) || !question.feedback?.trim()) {
      throw new Error(`Invalid question ${index + 1} in ${brief.id}.`);
    }
  });
});

const sectionPhotos = {
  "2.3": [
    { image: "guided/images/metal-tools/jenny-calipers.jpg", alt: "Two examples of Jenny callipers, each with one straight leg and one inward-pointing marking leg", caption: "Jenny callipers: identification reference beside datum-controlled marking. Tool selection remains teacher-directed.", credit: "Glenn McKechnie, CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:OddlegCalipers.jpg" },
    { image: "guided/images/metal-tools/scribers.jpg", alt: "Assortment of straight and bent metalworking scribes with pointed steel tips", caption: "Metalworking scribes: identification reference only; the teacher demonstration controls selection and use.", credit: "Glenn McKechnie, CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Scribers.jpg" }
  ],
  "3.1": [
    { image: "guided/images/metal-tools/centre-punch.jpg", alt: "Single steel centre punch with a knurled body and pointed end", caption: "Centre punch example. This does not mean every hole is centre-punched; teacher-issued procedures control the process.", credit: "Luke Milburn, CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Centre_Punch.jpg" }
  ],
  "11.2": [
    { image: "guided/images/metal-tools/bossing-mallet.png", alt: "Wooden bossing mallet with a smooth rounded pear-shaped head and straight handle", caption: "Rounded bossing-mallet form: identification reference only; the teacher demonstration controls the forming setup.", credit: "Generated with OpenAI image generation, 4 August 2026", source: "" },
    { image: "guided/images/metal-tools/tinmans-mallet.png", alt: "Wooden tinman's mallet with a broad double-faced head mounted across a straight handle", caption: "Broad-faced tinman's-mallet form: identification reference only; the teacher demonstration controls the forming setup.", credit: "Generated with OpenAI image generation, 4 August 2026", source: "" },
    { image: "guided/images/metal-tools/ball-pein-hammer.jpg", alt: "Ball-pein hammer with a flat face and rounded pein on opposite ends of its metal head", caption: "Ball-pein hammer form: identification reference only; the teacher demonstration controls the forming setup.", credit: "Connie Posites, CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:Hammer_ball_peen_(12640076755).jpg" }
  ]
};

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
    return { ...section, visual: { alt: `Illustrative evidence-planning visual for ${brief.title}`, caption: "Illustrative, non-dimensional evidence prompt. Teacher-issued project sources control practical details.", image: `assets/visuals/folio-card-${visualNumber}.png` }, photos: sectionPhotos[brief.id] || [] };
  });
  return {
    project: moduleIndex < 9 ? "Project 1 · BBQ and Case" : "Project 2 · Folding Camping Shovel",
    projectModule: moduleIndex < 9 ? moduleIndex + 1 : moduleIndex - 8,
    weeks: meta[0], title: meta[1], summary: meta[2], sections,
    checks: sections.flatMap((section, theoryIndex) => questionSections.get(section.id).questions.map((question) => ({ theoryIndex, question: question.question, options: question.options, answerIndex: question.answerIndex, explanation: question.feedback }))),
    written: moduleBriefs.map((brief, theoryIndex) => ({ theoryIndex, title: `Evidence task · ${brief.id}`, prompt: brief.written, clarification: "Use your own project evidence. Name the source or checkpoint, explain the decision and identify anything still requiring teacher confirmation.", model: "A suitable response identifies the verified requirement or observation, names the evidence source, explains why the decision follows from it, and labels unresolved details as Teacher to confirm." }))
  };
});

const output = `window.COURSE_DATA = ${JSON.stringify({ shortTitle: "Year 10 Metalwork", storagePrefix: "year10-metal", modules }, null, 2)};\n`;
fs.writeFileSync(outputPath, output, "utf8");
console.log(`Built ${modules.length} modules with ${authored.size} ChatGPT-authored sections and ${modules.flatMap((module) => module.checks).length} section-specific questions.`);
