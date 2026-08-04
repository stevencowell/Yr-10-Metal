(function () {
  "use strict";
  const data = window.EXAM_DATA;
  const configuredPassword = window.YEAR10_METAL_EXAM_PASSWORD || "";
  const gate = document.querySelector("[data-exam-gate]");
  const paper = document.querySelector("[data-exam-paper]");
  const content = document.querySelector("[data-exam-content]");
  const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

  function render() {
    const multipleChoice = `<section><p class="eyebrow">Section 1 · 18 marks</p><h2>Multiple choice</h2>${data.multipleChoice.map(([question, options], index) => `<article class="card exam-question"><h3>${index + 1}. ${esc(question)} <span class="exam-marks">(1 mark)</span></h3>${options.map((option, optionIndex) => `<label class="option"><input data-save data-required type="radio" name="mc-${index}" value="${optionIndex}"> ${esc(option)}</label>`).join("")}</article>`).join("")}</section>`;
    const drawing = `<section><p class="eyebrow">Section 2 · 10 marks</p><h2>Drawing interpretation</h2><p>This source drawing is an assessment stimulus. It is not a BBQ or Folding Camping Shovel plan.</p><img class="exam-stimulus" src="assets/exam/adjustable-clamp-plan-source.png" alt="Source adjustable-clamp drawing"><div>${data.drawing.map(([question, marks], index) => `<article class="card exam-question"><h3>${index + 1}. ${esc(question)} <span class="exam-marks">(${marks} ${marks === 1 ? "mark" : "marks"})</span></h3><textarea data-save data-required name="drawing-${index}" aria-label="Drawing question ${index + 1} response"></textarea></article>`).join("")}</div></section>`;
    const short = `<section><p class="eyebrow">Section 3 · 42 marks</p><h2>Short response</h2>${data.short.map((item, index) => `<article class="card exam-question"><h3>${index + 1}. ${esc(item.q)} <span class="exam-marks">(${item.marks} ${item.marks === 1 ? "mark" : "marks"})</span></h3>${item.image ? `<img class="exam-stimulus" src="${item.image}" alt="${esc(item.alt)}">` : ""}${item.operations ? `<div class="operation-grid">${item.operations.map((src, operationIndex) => `<section><img src="${src}" alt="Source lathe-operation diagram ${operationIndex + 1}"><label>Process<select data-save data-required name="short-${index}-process-${operationIndex}"><option value="">Choose</option><option>Facing</option><option>Parallel turning</option><option>Taper turning</option><option>Parting off</option><option>Other – explain</option></select></label><label>Explanation<textarea data-save data-required name="short-${index}-explain-${operationIndex}"></textarea></label></section>`).join("")}</div>` : `<textarea data-save data-required name="short-${index}" aria-label="Short-response question ${index + 1}"></textarea>`}</article>`).join("")}</section>`;
    content.innerHTML = multipleChoice + drawing + short;
  }

  function loadState() { try { return JSON.parse(localStorage.getItem(data.storageKey) || "{}"); } catch (_) { return {}; } }
  function saveState() {
    const state = {};
    paper.querySelectorAll("[data-save]").forEach((field) => { if (field.type === "radio") { if (field.checked) state[field.name] = field.value; } else state[field.name] = field.value; });
    localStorage.setItem(data.storageKey, JSON.stringify(state));
    paper.querySelector("[data-save-state]").textContent = `Saved on this device at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    updateProgress();
  }
  function restore() {
    const state = loadState();
    paper.querySelectorAll("[data-save]").forEach((field) => { if (!Object.prototype.hasOwnProperty.call(state, field.name)) return; if (field.type === "radio") field.checked = state[field.name] === field.value; else field.value = state[field.name]; });
    updateProgress();
  }
  function updateProgress() {
    const names = [...new Set([...paper.querySelectorAll("[data-required]")].map((field) => field.name))];
    const complete = names.filter((name) => [...paper.querySelectorAll(`[name="${CSS.escape(name)}"]`)].some((field) => field.type === "radio" ? field.checked : String(field.value || "").trim())).length;
    const percent = Math.round((complete / names.length) * 100);
    paper.querySelector("[data-exam-progress]").textContent = `${percent}% answered`;
    paper.querySelector("[data-progress-fill]").style.width = `${percent}%`;
    const student = paper.querySelector('[name="student-name"]').value.trim();
    document.title = `${student ? `${student} · ` : ""}Year 10 Metal examination`;
  }
  function unlock() {
    const message = gate.querySelector("[data-gate-message]");
    if (!configuredPassword) { message.textContent = "Formal access is not configured. Your teacher must supply and publish the approved classroom password."; return; }
    if (gate.querySelector("[data-password]").value !== configuredPassword) { message.textContent = "That password is not correct."; return; }
    gate.hidden = true; paper.hidden = false; gate.querySelector("[data-password]").value = ""; restore(); paper.querySelector('[name="student-name"]').focus();
  }
  render();
  paper.querySelectorAll("[data-save]").forEach((field) => { field.addEventListener("input", saveState); field.addEventListener("change", saveState); });
  gate.querySelector("[data-unlock]").addEventListener("click", unlock);
  gate.querySelector("[data-password]").addEventListener("keydown", (event) => { if (event.key === "Enter") unlock(); });
  paper.querySelector("[data-relock]").addEventListener("click", () => { paper.hidden = true; gate.hidden = false; gate.querySelector("[data-password]").focus(); });
  paper.querySelector("[data-reset]").addEventListener("click", () => { if (!confirm("Clear every saved response for this examination on this device?")) return; localStorage.removeItem(data.storageKey); paper.querySelectorAll("[data-save]").forEach((field) => { if (field.type === "radio") field.checked = false; else field.value = ""; }); updateProgress(); });
})();
