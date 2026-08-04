import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";

const repo = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(repo, file), "utf8");
const must = (condition, message) => { if (!condition) throw new Error(message); };
const workshopPhotoFiles = [
  "guided/images/metal-tools/jenny-calipers.jpg",
  "guided/images/metal-tools/scribers.jpg",
  "guided/images/metal-tools/centre-punch.jpg",
  "guided/images/metal-tools/bossing-mallet.png",
  "guided/images/metal-tools/tinmans-mallet.png",
  "guided/images/metal-tools/ball-pein-hammer.jpg"
];

const requiredFiles = [
  "index.html", "module.html", "folio.html", "exam.html",
  "assessment-task-1.html", "assessment-task-2.html", "assessment-task-3.html",
  "guided/data.js", "guided/course.js", "guided/exam.js",
  "source-notes/VISUAL-SEMANTIC-AUDIT.md", "source-notes/QUESTION-BANK.json",
  "assets/year10-metal-hero.png",
  ...Array.from({ length: 12 }, (_, index) => `assets/visuals/folio-card-${String(index + 1).padStart(2, "0")}.png`),
  "assets/exam/adjustable-clamp-plan-source.png", "assets/exam/vernier-source.png",
  "assets/exam/lathe-operation-1.png", "assets/exam/lathe-operation-2.png",
  "assets/exam/lathe-operation-3.png", "assets/exam/centre-lathe-source.jpg",
  ...workshopPhotoFiles
];
requiredFiles.forEach((file) => must(fs.existsSync(path.join(repo, file)), `Missing ${file}`));

const sandbox = { window: {} };
vm.runInNewContext(read("guided/data.js"), sandbox);
const course = sandbox.window.COURSE_DATA;
must(course.modules.length === 14, "Course must contain 14 modules.");
must(course.modules.every((module) => module.sections.length === 3), "Every module must contain three theory sections.");
must(course.modules.every((module) => module.checks.length === 30), "Every module must contain 30 knowledge checks: 10 for each of its three theory sections.");
must(course.modules.every((module) => module.sections.every((_, theoryIndex) => module.checks.filter((check) => check.theoryIndex === theoryIndex).length === 10)), "Every named theory section must contain exactly 10 knowledge checks.");
must(course.modules.flatMap((module) => module.checks).length === 420, "Course must contain exactly 420 knowledge checks.");
must(course.modules.flatMap((module) => module.checks).every((check) => check.options.length === 3 && check.answerIndex >= 0 && check.answerIndex < check.options.length), "Every knowledge check must contain three options and a valid answer index.");
must(course.modules.flatMap((module) => module.checks).every((check) => check.question.trim() && check.explanation.trim()), "Every knowledge check must contain a question and useful answer feedback.");
must(course.modules.every((module) => module.sections.every((_, theoryIndex) => { const questions = module.checks.filter((check) => check.theoryIndex === theoryIndex).map((check) => check.question.trim().toLowerCase()); return new Set(questions).size === 10; })), "Each theory section must contain ten distinct questions.");
must(course.modules.every((module) => module.written.length === 3), "Every module must contain three written-evidence tasks.");
must(course.modules.flatMap((module) => module.sections).length === 42, "Course must contain 42 authored theory sections.");
must(course.modules.flatMap((module) => module.sections).every((section) => section.takeaways.length === 3), "Every theory section must contain exactly three key takeaways.");
must(course.modules.flatMap((module) => module.sections).every((section) => { const words = section.theory.join(" ").trim().split(/\s+/).length; return words >= 170 && words <= 230; }), "Every Theory block must contain 170–230 words.");

const questionBank = JSON.parse(read("source-notes/QUESTION-BANK.json"));
must(questionBank.authoredVia === "Signed-in ChatGPT in the in-app browser, one named theory section at a time", "Question bank must preserve its signed-in ChatGPT authoring provenance.");
must(questionBank.sections?.length === 42, "Question bank must contain exactly 42 named sections.");
must(questionBank.sections.reduce((total, section) => total + section.questions.length, 0) === 420, "Question bank must contain exactly 420 questions.");
const bankQuestionTexts = questionBank.sections.flatMap((section) => section.questions.map((question) => question.question.trim().toLowerCase()));
must(new Set(bankQuestionTexts).size === 420, "Question bank must contain 420 distinct question texts rather than repeated templates.");
const renderedSections = course.modules.flatMap((module) => module.sections);
questionBank.sections.forEach((bankSection, index) => {
  must(bankSection.id === renderedSections[index].id && bankSection.title === renderedSections[index].title, `Question-bank order or title mismatch at ${bankSection.id}.`);
  must(bankSection.questions.length === 10, `Question-bank section ${bankSection.id} must contain exactly ten questions.`);
});
const expectedPhotoCounts = new Map([["2.3", 2], ["3.1", 1], ["11.2", 3]]);
renderedSections.forEach((section) => {
  must((section.photos?.length || 0) === (expectedPhotoCounts.get(section.id) || 0), `Unexpected workshop-photo count for ${section.id}.`);
  (section.photos || []).forEach((photo) => must(photo.image && photo.alt && photo.caption && photo.credit, `Incomplete workshop-photo record in ${section.id}.`));
});

const folio = read("folio.html");
must((folio.match(/class="card folio-card"/g) || []).length === 12, "Folio must contain exactly 12 cards.");
must((folio.match(/<select data-save name="folio-/g) || []).length === 12, "Every folio card must include a project selector.");

const courseScript = read("guided/course.js");
must(courseScript.includes("zoomable-infographic"), "Detailed teaching visuals must provide an enlarged-image link.");
must(courseScript.includes('target="_blank"') && courseScript.includes('visualLink.target = "_blank"'), "Module and folio infographics must open their full-resolution source in a new tab.");
must(courseScript.includes("Open infographic in a new tab"), "Enlarged-image links must have an accessible name.");
must(courseScript.includes("tool-photo-gallery") && courseScript.includes("Open full-size tool photograph in a new tab"), "Section tool photographs must render with accessible full-size links.");

const visualAudit = read("source-notes/VISUAL-SEMANTIC-AUDIT.md");
must((visualAudit.match(/^\| (?:Hero|Card (?:0[1-9]|1[0-2])) \|/gm) || []).length === 13, "Visual semantic audit must cover the hero and all 12 folio cards.");
must(!/\bPENDING\b/.test(visualAudit), "Visual semantic audit contains an unresolved item.");
const auditedHashes = new Map([...visualAudit.matchAll(/^\| `([^`]+\.(?:png|jpg))` \| `([A-F0-9]{64})` \|$/gm)].map((match) => [match[1], match[2]]));
const auditedVisualFiles = ["assets/year10-metal-hero.png", ...Array.from({ length: 12 }, (_, index) => `assets/visuals/folio-card-${String(index + 1).padStart(2, "0")}.png`), ...workshopPhotoFiles];
must(auditedHashes.size === 19, "Visual semantic audit must contain 19 final SHA-256 hashes.");
auditedVisualFiles.forEach((file) => {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(repo, file))).digest("hex").toUpperCase();
  must(auditedHashes.get(file) === actual, `${file} does not match its audited SHA-256 hash.`);
});

const examSandbox = { window: {} };
vm.runInNewContext(read("guided/exam-data.js"), examSandbox);
const exam = examSandbox.window.EXAM_DATA;
must(exam.multipleChoice.length === 18, "Exam Section 1 must contain 18 questions.");
must(exam.drawing.reduce((sum, item) => sum + item[1], 0) === 10, "Exam Section 2 must total 10 marks.");
must(exam.short.reduce((sum, item) => sum + item.marks, 0) === 42, "Exam Section 3 must total 42 marks.");
must(18 + 10 + 42 === 70, "Exam total must equal 70 marks.");
must(!/answerIndex|correctAnswer|solution/i.test(read("guided/exam-data.js")), "Formal exam data must not expose an answer key.");

for (const file of requiredFiles.filter((file) => file.endsWith(".html"))) {
  const html = read(file);
  for (const match of html.matchAll(/(?:href|src)="([^"#?]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(target)) continue;
    must(fs.existsSync(path.resolve(repo, path.dirname(file), target)), `${file} links to missing ${target}`);
  }
}

console.log("Course validation passed: 14 modules, 42 sections, 420 knowledge checks, 12 audited folio cards and 70 exam marks.");
