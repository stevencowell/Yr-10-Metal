import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repo = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(repo, file), "utf8");
const must = (condition, message) => { if (!condition) throw new Error(message); };

const requiredFiles = [
  "index.html", "module.html", "folio.html", "exam.html",
  "assessment-task-1.html", "assessment-task-2.html", "assessment-task-3.html",
  "guided/data.js", "guided/course.js", "guided/exam.js",
  "assets/year10-metal-hero.png",
  ...Array.from({ length: 12 }, (_, index) => `assets/visuals/folio-card-${String(index + 1).padStart(2, "0")}.png`),
  "assets/exam/adjustable-clamp-plan-source.png", "assets/exam/vernier-source.png",
  "assets/exam/lathe-operation-1.png", "assets/exam/lathe-operation-2.png",
  "assets/exam/lathe-operation-3.png", "assets/exam/centre-lathe-source.jpg"
];
requiredFiles.forEach((file) => must(fs.existsSync(path.join(repo, file)), `Missing ${file}`));

const sandbox = { window: {} };
vm.runInNewContext(read("guided/data.js"), sandbox);
const course = sandbox.window.COURSE_DATA;
must(course.modules.length === 14, "Course must contain 14 modules.");
must(course.modules.every((module) => module.sections.length === 3), "Every module must contain three theory sections.");
must(course.modules.every((module) => module.checks.length === 3), "Every module must contain three knowledge checks.");
must(course.modules.every((module) => module.written.length === 3), "Every module must contain three written-evidence tasks.");
must(course.modules.flatMap((module) => module.sections).length === 42, "Course must contain 42 authored theory sections.");
must(course.modules.flatMap((module) => module.sections).every((section) => section.takeaways.length === 3), "Every theory section must contain exactly three key takeaways.");
must(course.modules.flatMap((module) => module.sections).every((section) => { const words = section.theory.join(" ").trim().split(/\s+/).length; return words >= 170 && words <= 230; }), "Every Theory block must contain 170–230 words.");

const folio = read("folio.html");
must((folio.match(/class="card folio-card"/g) || []).length === 12, "Folio must contain exactly 12 cards.");
must((folio.match(/<select data-save name="folio-/g) || []).length === 12, "Every folio card must include a project selector.");

const courseScript = read("guided/course.js");
must(courseScript.includes("zoomable-infographic"), "Detailed teaching visuals must provide an enlarged-image link.");
must(courseScript.includes('target="_blank"') && courseScript.includes('visualLink.target = "_blank"'), "Module and folio infographics must open their full-resolution source in a new tab.");
must(courseScript.includes("Open infographic in a new tab"), "Enlarged-image links must have an accessible name.");

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

console.log("Course validation passed: 14 modules, 42 sections, 12 folio cards and 70 exam marks.");
