import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const dataPath = new URL("youtube-library/video-library.data.js", root);
const source = fs.readFileSync(dataPath, "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);

const library = context.window.YEAR_10_METAL_VIDEO_LIBRARY;
const required = ["project", "projectId", "module", "theoryTitle", "videoId", "sourceUrl", "title", "channel", "overview", "watchFor", "rationale"];
const errors = [];
const ids = new Set();

if (!library || !Array.isArray(library.videos)) errors.push("Video data did not load.");
for (const [index, video] of (library?.videos || []).entries()) {
  for (const field of required) if (!String(video[field] || "").trim()) errors.push(`Video ${index + 1}: missing ${field}.`);
  if (!/^[A-Za-z0-9_-]{11}$/.test(video.videoId)) errors.push(`Video ${index + 1}: invalid YouTube ID.`);
  if (video.sourceUrl !== `https://www.youtube.com/watch?v=${video.videoId}`) errors.push(`Video ${index + 1}: source URL is not canonical.`);
  if (ids.has(video.videoId)) errors.push(`Video ${index + 1}: duplicate ID ${video.videoId}.`);
  ids.add(video.videoId);
}
if (library?.videos?.length !== 5) errors.push(`Expected 5 selected clips; found ${library?.videos?.length || 0}.`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`PASS: ${library.videos.length} unique, theory-linked YouTube clips validated.`);
