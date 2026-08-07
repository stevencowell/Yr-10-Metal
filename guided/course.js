(function () {
  "use strict";

  const course = window.COURSE_DATA;
  if (!course) return;
  const esc = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const key = (scope) => `${course.storagePrefix}:${scope}:v1`;
  const load = (scope) => { try { return JSON.parse(localStorage.getItem(key(scope)) || "{}"); } catch (_) { return {}; } };
  const save = (scope, data) => {
    localStorage.setItem(key(scope), JSON.stringify(data));
    document.querySelectorAll("[data-save-state]").forEach((node) => { node.textContent = `Saved on this device at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`; });
  };

  function fieldValue(field) {
    if (field.type === "radio") return field.checked ? field.value : undefined;
    if (field.type === "checkbox") return field.checked;
    return field.value;
  }

  function bindAutosave(scope, root = document) {
    const state = load(scope);
    const fields = [...root.querySelectorAll("[data-save]")];
    fields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(state, field.name)) {
        if (field.type === "radio") field.checked = state[field.name] === field.value;
        else if (field.type === "checkbox") field.checked = Boolean(state[field.name]);
        else field.value = state[field.name];
      }
      field.addEventListener("input", collect);
      field.addEventListener("change", collect);
    });
    function collect() {
      const next = {};
      fields.forEach((field) => { const value = fieldValue(field); if (value !== undefined) next[field.name] = value; });
      save(scope, next);
      updateProgress(root);
    }
    updateProgress(root);
  }

  function updateProgress(root = document) {
    const required = [...new Set([...root.querySelectorAll("[data-required]")].map((field) => field.name))];
    if (!required.length) return;
    const complete = required.filter((name) => {
      const fields = [...root.querySelectorAll(`[name="${CSS.escape(name)}"]`)];
      return fields.some((field) => field.type === "radio" ? field.checked : String(fieldValue(field) || "").trim());
    }).length;
    const percent = Math.round((complete / required.length) * 100);
    const fill = root.querySelector("[data-progress-fill]");
    const text = root.querySelector("[data-progress-text]");
    if (fill) fill.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}% evidence entered`;
  }

  function toolPhotosHtml(section) {
    if (!section.photos?.length) return "";
    return `<div class="tool-photo-gallery" aria-label="Workshop tool identification references">${section.photos.map((photo) => `<figure class="tool-photo-card"><a class="tool-photo-link zoomable-infographic" href="${esc(photo.image)}" target="_blank" rel="noopener" aria-label="Open full-size tool photograph in a new tab: ${esc(photo.alt)}"><img src="${esc(photo.image)}" alt="${esc(photo.alt)}"><span class="infographic-open-label">Open larger <span aria-hidden="true">↗</span></span></a><figcaption>${esc(photo.caption)} <span class="tool-photo-credit">${photo.source ? `<a href="${esc(photo.source)}" target="_blank" rel="noopener">${esc(photo.credit)}</a>` : esc(photo.credit)}</span></figcaption></figure>`).join("")}</div>`;
  }

  function planGuidanceHtml(section) {
    const guidance = section.planGuidance;
    if (!guidance) return "";
    const id = `plan-guidance-${section.id.replace(".", "-")}`;
    const sheets = guidance.sheets.map((sheet) => `<figure class="plan-sheet-card"><a class="plan-preview-link zoomable-infographic" href="${esc(sheet.open)}" target="_blank" rel="noopener" aria-label="Open larger original sheet in a new tab: ${esc(sheet.title)}"><img src="${esc(sheet.preview)}" alt="${esc(sheet.alt)}"><span class="infographic-open-label">Open larger <span aria-hidden="true">↗</span></span></a><figcaption><strong>${esc(sheet.title)}</strong><span>${esc(sheet.caption)}</span><span class="plan-actions"><a class="plan-open-link" href="${esc(sheet.open)}" target="_blank" rel="noopener">Open larger original sheet <span aria-hidden="true">↗</span></a>${sheet.original ? `<a class="plan-download-link" href="${esc(sheet.original)}" download>Download original DWG</a>` : ""}</span></figcaption></figure>`).join("");
    return `<section class="plan-guidance" aria-labelledby="${id}"><p class="eyebrow">Verified project plans</p><h3 id="${id}">${esc(guidance.heading)}</h3>${guidance.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}<h4>Plan-reading takeaways</h4><ul>${guidance.takeaways.map((item) => `<li>${esc(item)}</li>`).join("")}</ul><div class="callout"><strong>Drawing source boundary:</strong> ${esc(guidance.boundary)}</div><div class="plan-sheet-gallery">${sheets}</div></section>`;
  }

  function theoryHtml(section, index, moduleNumber) {
    return `<section class="card theory-section" id="theory-${moduleNumber}-${index + 1}" tabindex="-1">
      <p class="eyebrow">Theory ${index + 1}</p><h2>${esc(section.title)}</h2>
      <figure class="theory-visual${index % 2 ? " theory-visual--left" : ""}"><a class="theory-visual__link zoomable-infographic" href="${esc(section.visual.image)}" target="_blank" rel="noopener" aria-label="Open infographic in a new tab: ${esc(section.visual.alt)}"><div class="theory-visual__image" aria-hidden="true" style="background-image:url('${esc(section.visual.image)}')"><span class="infographic-open-label">Open larger <span aria-hidden="true">↗</span></span></div></a><figcaption>${esc(section.visual.caption)}</figcaption></figure>
      <h3 class="theory-chunk-heading">Theory</h3>${section.theory.map((p) => `<p>${esc(p)}</p>`).join("")}
      ${planGuidanceHtml(section)}
      ${toolPhotosHtml(section)}
      <h3 class="theory-chunk-heading">Key takeaways</h3><ul>${section.takeaways.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      <div class="callout"><strong>Source boundary:</strong> ${esc(section.boundary)}</div>
    </section>${checksHtml(course.modules[moduleNumber - 1], moduleNumber, index)}${writtenHtml(course.modules[moduleNumber - 1], moduleNumber, index)}`;
  }

  function helpHtml(id, sectionIndex, module, moduleNumber) {
    const section = module.sections[sectionIndex];
    return `<div class="question-help"><button class="hint-toggle" type="button" aria-expanded="false" aria-controls="${id}-hint" data-toggle="${id}-hint">Need a hint?</button><div class="theory-direction" id="${id}-hint" hidden><a href="#theory-${moduleNumber}-${sectionIndex + 1}">Revisit ${esc(section.title)}</a><p>${esc(section.takeaways[0])}</p></div></div>`;
  }

  function checksHtml(module, moduleNumber, theoryIndex) {
    if (!Number.isInteger(theoryIndex)) return "";
    const indexedChecks = module.checks.map((check, index) => ({ check, index }));
    const section = module.sections[theoryIndex];
    const questions = indexedChecks.filter(({ check }) => check.theoryIndex === theoryIndex);
    const group = `<section class="check-group" id="check-group-${moduleNumber}-${theoryIndex}" aria-labelledby="check-group-title-${moduleNumber}-${theoryIndex}"><p class="eyebrow">Theory ${theoryIndex + 1} · 10 questions</p><h3 id="check-group-title-${moduleNumber}-${theoryIndex}">${esc(section.title)}</h3>${questions.map(({ check, index }, questionIndex) => `<div class="check"><h4>${questionIndex + 1}. ${esc(check.question)}</h4>${check.options.map((option, optionIndex) => `<label class="option"><input data-save data-required type="radio" name="check-${index}" value="${optionIndex}"> ${esc(option)}</label>`).join("")}${helpHtml(`check-${moduleNumber}-${index}`, check.theoryIndex, module, moduleNumber)}<button class="btn ghost" type="button" data-check-button="${index}">Check answer</button><div class="feedback" aria-live="polite" data-check-feedback="${index}"></div></div>`).join("")}</section>`;
    const id = theoryIndex === 0 ? "knowledge-checks" : `knowledge-checks-${moduleNumber}-${theoryIndex + 1}`;
    return `<section class="card theory-section" id="${id}"><p class="eyebrow">Knowledge checks</p><h2>Ten questions for every theory section</h2><p>Complete each source-grounded set, use the hints when needed, and check your feedback before moving to the written evidence.</p>${group}</section>`;
  }

  function writtenHtml(module, moduleNumber, theoryIndex) {
    if (!Number.isInteger(theoryIndex)) return "";
    return module.written.map((item, index) => ({ item, index })).filter(({ item }) => item.theoryIndex === theoryIndex).map(({ item, index }) => `<section class="card theory-section written-evidence"><p class="eyebrow">Written evidence ${index + 1}</p><h2>${esc(item.title)}</h2><p>${esc(item.prompt)}</p><button class="clarification-button" type="button" data-toggle="written-${moduleNumber}-${index}-plain" aria-expanded="false">What is this asking?</button><div class="clarification-panel" id="written-${moduleNumber}-${index}-plain" hidden>${esc(item.clarification)}</div>${helpHtml(`written-${moduleNumber}-${index}`, item.theoryIndex, module, moduleNumber)}<textarea data-save data-required name="written-${index}" aria-label="${esc(item.title)} response"></textarea><button class="btn ghost" type="button" data-model-toggle="model-${moduleNumber}-${index}" aria-expanded="false">Appropriate response example</button><div class="model-feedback" id="model-${moduleNumber}-${index}"><strong>Appropriate response example:</strong> ${esc(item.model)}</div></section>`).join("");
  }

  function renderModule() {
    const host = document.querySelector("[data-module-host]");
    if (!host) return;
    const number = Math.max(1, Math.min(course.modules.length, Number(new URLSearchParams(location.search).get("module")) || 1));
    const module = course.modules[number - 1];
    document.title = `${module.title} | ${course.shortTitle}`;
    document.querySelector("[data-module-kicker]").textContent = `${module.project} · Module ${module.projectModule} · Weeks ${module.weeks}`;
    document.querySelector("[data-module-title]").textContent = module.title;
    document.querySelector("[data-module-summary]").textContent = module.summary;
    host.innerHTML = `<section class="card progress-panel"><strong data-progress-text>0% evidence entered</strong><div class="progress-track"><div class="progress-fill" data-progress-fill></div></div><div class="student-grid"><label>Student name<input data-save data-required name="student-name" type="text" autocomplete="name"></label><label>Class<input data-save data-required name="student-class" type="text"></label></div><p class="save-state" data-save-state>Autosaves on this browser and device.</p></section>${module.sections.map((section, index) => theoryHtml(section, index, number)).join("")}${checksHtml(module, number)}${writtenHtml(module, number)}<section class="card theory-section completion-box"><h2>Module completion</h2><label class="option"><input data-save type="checkbox" name="module-complete"> I have completed the theory, checks and written evidence, then saved or printed it as directed.</label><button class="btn" type="button" onclick="window.print()">Print / Save PDF</button></section><nav class="module-nav" aria-label="Module navigation">${number > 1 ? `<a class="btn ghost" href="module.html?module=${number - 1}">← Previous module</a>` : `<a class="btn ghost" href="index.html">← Course home</a>`}${number < course.modules.length ? `<a class="btn" href="module.html?module=${number + 1}">Next module →</a>` : `<a class="btn" href="folio.html">Open folio →</a>`}</nav>`;
    module.checks.forEach((check, index) => host.querySelector(`[data-check-button="${index}"]`).addEventListener("click", () => { const selected = host.querySelector(`input[name="check-${index}"]:checked`); const feedback = host.querySelector(`[data-check-feedback="${index}"]`); if (!selected) { feedback.className = "feedback bad"; feedback.textContent = "Choose an answer first."; return; } const correct = Number(selected.value) === check.answerIndex; feedback.className = `feedback ${correct ? "good" : "bad"}`; feedback.textContent = `${correct ? "Correct. " : "Not yet. "}${check.explanation}`; }));
    host.querySelectorAll("[data-toggle]").forEach((button) => button.addEventListener("click", () => { const panel = host.querySelector(`#${CSS.escape(button.dataset.toggle)}`); panel.hidden = !panel.hidden; button.setAttribute("aria-expanded", String(!panel.hidden)); }));
    host.querySelectorAll("[data-model-toggle]").forEach((button) => button.addEventListener("click", () => { const panel = host.querySelector(`#${CSS.escape(button.dataset.modelToggle)}`); panel.classList.toggle("open"); button.setAttribute("aria-expanded", String(panel.classList.contains("open"))); }));
    bindAutosave(`module-${number}`, host);
  }

  function bindFolio() {
    const root = document.querySelector("[data-folio]");
    if (!root) return;
    const cards = [...root.querySelectorAll(".folio-card")];
    cards.forEach((card, index) => {
      const visual = card.querySelector(".folio-visual");
      const visualLink = document.createElement("a");
      const visualPath = `assets/visuals/folio-card-${String(index + 1).padStart(2, "0")}.png`;
      visualLink.className = `${visual.className} zoomable-infographic`;
      visualLink.href = visualPath;
      visualLink.target = "_blank";
      visualLink.rel = "noopener";
      visualLink.setAttribute("aria-label", `Open infographic in a new tab: ${visual.getAttribute("aria-label")}`);
      visualLink.innerHTML = '<span class="infographic-open-label">Open larger <span aria-hidden="true">↗</span></span>';
      visual.replaceWith(visualLink);
      const select = card.querySelector("select");
      select.dataset.required = "";
      select.dataset.projectControl = String(index);
      card.querySelectorAll("textarea[data-save]").forEach((field) => { field.dataset.folioField = ""; field.setAttribute("aria-label", `${card.querySelector("h2").textContent.trim()} response`); });
      card.insertAdjacentHTML("beforeend", `<label>Evidence caption<textarea data-folio-field data-required name="folio-${index + 1}-caption" placeholder="This evidence shows…"></textarea></label><label>Source or teacher checkpoint<textarea data-folio-field data-required name="folio-${index + 1}-source" placeholder="Drawing, brief, SOP, demonstration or feedback used…"></textarea></label><label class="option"><input data-folio-field type="checkbox" name="folio-${index + 1}-complete"> Evidence checked and ready</label><label>Optional authorised photo<input type="file" accept="image/*" data-photo></label><div class="photo-preview" data-photo-preview hidden></div>`);
    });
    const saved = load("folio");
    const state = { shared: saved.shared || {}, selected: saved.selected || {}, projects: saved.projects || { "BBQ and Case": {}, "Folding Camping Shovel": {} } };
    const sharedFields = [...root.querySelectorAll(".progress-panel [data-save]")];
    sharedFields.forEach((field) => { if (Object.prototype.hasOwnProperty.call(state.shared, field.name)) field.value = state.shared[field.name]; field.addEventListener("input", saveShared); });
    function persist() { save("folio", state); updateFolioProgress(); }
    function saveShared() { sharedFields.forEach((field) => { state.shared[field.name] = field.value; }); persist(); }
    function showProject(card, index, project) {
      const fields = [...card.querySelectorAll("[data-folio-field], textarea[data-save]")];
      const projectState = state.projects[project] || {};
      fields.forEach((field) => { const value = projectState[field.name]; if (field.type === "checkbox") field.checked = Boolean(value); else field.value = value || ""; });
      state.selected[index] = project;
      persist();
    }
    cards.forEach((card, index) => {
      const select = card.querySelector("select");
      const initial = state.selected[index] || "";
      select.value = initial;
      if (initial) showProject(card, index, initial);
      select.addEventListener("change", () => { if (select.value) showProject(card, index, select.value); else { state.selected[index] = ""; persist(); } });
      [...card.querySelectorAll("[data-folio-field], textarea[data-save]")].forEach((field) => {
        field.removeAttribute("data-save");
        const collect = () => { const project = select.value; if (!project) return; state.projects[project] ||= {}; state.projects[project][field.name] = field.type === "checkbox" ? field.checked : field.value; persist(); };
        field.addEventListener("input", collect); field.addEventListener("change", collect);
      });
      card.querySelector("[data-photo]").addEventListener("change", (event) => { const file = event.target.files?.[0]; const preview = card.querySelector("[data-photo-preview]"); if (!file) { preview.hidden = true; preview.innerHTML = ""; return; } const reader = new FileReader(); reader.onload = () => { preview.innerHTML = `<img src="${reader.result}" alt="Authorised student evidence preview"><p>This preview prints but is not retained after the page closes. Keep the original file.</p>`; preview.hidden = false; }; reader.readAsDataURL(file); });
    });
    function updateFolioProgress() { const total = cards.length; const complete = cards.filter((card, index) => { const project = state.selected[index]; if (!project) return false; const responseName = `folio-${String(index + 1).padStart(2, "0")}`; const response = state.projects[project]?.[responseName] || ""; const caption = state.projects[project]?.[`folio-${index + 1}-caption`] || ""; const source = state.projects[project]?.[`folio-${index + 1}-source`] || ""; return String(response).trim() && caption.trim() && source.trim(); }).length; const percent = Math.round((complete / total) * 100); root.querySelector("[data-save-state]").textContent = `${percent}% of the twelve evidence cards have their core fields entered. Autosaved on this device.`; }
    updateFolioProgress();
    root.querySelector("[data-export]")?.addEventListener("click", () => { const payload = { course: course.shortTitle, version: 1, savedAt: new Date().toISOString(), data: state }; const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "year-10-metal-folio-backup.json"; link.click(); URL.revokeObjectURL(link.href); });
    root.querySelector("[data-import]")?.addEventListener("change", async (event) => { const file = event.target.files?.[0]; if (!file) return; try { const payload = JSON.parse(await file.text()); if (!payload.data || typeof payload.data !== "object") throw new Error(); localStorage.setItem(key("folio"), JSON.stringify(payload.data)); location.reload(); } catch (_) { alert("That file is not a valid Year 10 Metal folio backup."); } });
  }

  renderModule();
  bindFolio();
})();
