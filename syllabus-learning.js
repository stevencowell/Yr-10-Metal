(function () {
  "use strict";

  const packages = {
    "resources-country": {
      title: "Resources, Country and responsible metal use",
      questions: [
        {
          id: "resource-life-cycle",
          prompt: "Which investigation gives the strongest account of a metal product's resource impact?",
          help: "#resources-source",
          options: [
            { id: "a", text: "Compare only the purchase prices of two metals", correct: false, feedback: "Purchase price is relevant, but it hides extraction, processing, service life and end-of-life effects." },
            { id: "b", text: "Trace extraction, processing, manufacture, use, repair, recycling and disposal", correct: true, feedback: "Correct. A life-cycle view follows resource and impact decisions from source through use and end of life." },
            { id: "c", text: "Choose the metal with the most recycled-content advertising", correct: false, feedback: "Recycled content may help, but an advertising claim alone does not test the complete life cycle or suitability." }
          ]
        },
        {
          id: "country-decision",
          prompt: "A proposed material source may affect Country and a local Aboriginal Community. What should happen first?",
          help: "#resources-country-community",
          options: [
            { id: "a", text: "Complete the design, then ask whether anyone objects", correct: false, feedback: "Consulting after the decision prevents cultural knowledge and impacts from genuinely shaping the proposal." },
            { id: "b", text: "Identify the correct authority, engage early and listen before fixing the decision", correct: true, feedback: "Correct. Early, authorised engagement allows Country, heritage and Community concerns to influence the decision." },
            { id: "c", text: "Use a general internet source to represent the Community's view", correct: false, feedback: "A general source cannot replace engagement with the relevant people and authority for that Country." }
          ]
        },
        {
          id: "icip",
          prompt: "Which action best respects Indigenous Cultural and Intellectual Property (ICIP)?",
          help: "#resources-country-community",
          options: [
            { id: "a", text: "Copy a cultural motif because it is already visible online", correct: false, feedback: "Public visibility is not permission. Cultural material still has authority, attribution and use considerations." },
            { id: "b", text: "Remove the source name so the motif appears universal", correct: false, feedback: "Removing attribution increases the problem by hiding whose knowledge or design is being used." },
            { id: "c", text: "Seek appropriate permission and agree on attribution and benefit where relevant", correct: true, feedback: "Correct. ICIP-respectful use depends on the right authority, permission, attribution and agreed conditions." }
          ]
        },
        {
          id: "circular-use",
          prompt: "Which proposal most directly supports material conservation?",
          help: "#resources-source",
          options: [
            { id: "a", text: "Use extra stock so there is no risk of running short", correct: false, feedback: "Unplanned extra stock may increase waste. Quantities should be justified and offcuts managed deliberately." },
            { id: "b", text: "Design for long life, efficient nesting, repair and recovery of useful metal", correct: true, feedback: "Correct. This keeps material useful longer and reduces unnecessary demand for new resource." },
            { id: "c", text: "Treat recycling as impact-free", correct: false, feedback: "Recycling is valuable, but it still requires collection, sorting, transport and energy." }
          ]
        },
        {
          id: "ferrous-choice",
          prompt: "What is the best basis for choosing between a ferrous and a nonferrous metal?",
          help: "#resources-selection",
          options: [
            { id: "a", text: "Use ferrous metal for every structural component", correct: false, feedback: "Some ferrous metals suit structural work, but the category alone does not settle corrosion, mass or forming needs." },
            { id: "b", text: "Use nonferrous metal whenever appearance matters", correct: false, feedback: "Nonferrous metals vary widely. Appearance is only one criterion alongside function, environment and processing." },
            { id: "c", text: "Compare required properties, form, processes, environment, cost and life cycle", correct: true, feedback: "Correct. A justified choice connects evidence about the specific material to the component's full requirements." }
          ]
        },
        {
          id: "alloy-reason",
          prompt: "Why might an alloy perform differently from a pure metal?",
          help: "#resources-selection",
          options: [
            { id: "a", text: "Alloying changes composition and can change mechanical or chemical properties", correct: true, feedback: "Correct. Adding elements can change properties such as strength, hardness or corrosion behaviour." },
            { id: "b", text: "All alloys are automatically lighter than pure metals", correct: false, feedback: "Mass depends on the specific composition; alloying does not guarantee a lighter material." },
            { id: "c", text: "An alloy is simply a different stock shape", correct: false, feedback: "Shape and composition are different ideas. An alloy is defined by its material composition." }
          ]
        },
        {
          id: "property-change",
          prompt: "Which statement about modifying metal properties is most accurate?",
          help: "#resources-selection",
          options: [
            { id: "a", text: "Heat treatment and hot or cold working can alter performance for an application", correct: true, feedback: "Correct. Processing can change structure and therefore properties, so the method must match the intended performance." },
            { id: "b", text: "Once refined, a metal's properties can never change", correct: false, feedback: "Metal properties can be modified through alloying, heat treatment and mechanical working." },
            { id: "c", text: "Every treatment improves every property at the same time", correct: false, feedback: "Property changes involve trade-offs; improving one quality can reduce another." }
          ]
        },
        {
          id: "finish-tradeoff",
          prompt: "How should a surface finish be justified?",
          help: "#resources-performance",
          options: [
            { id: "a", text: "Choose the glossiest finish because it signals quality", correct: false, feedback: "Gloss may affect appearance, but does not by itself prove protection, durability or responsible use." },
            { id: "b", text: "Compare protection, appearance, preparation, maintenance, cost and environmental effects", correct: true, feedback: "Correct. A finish is a performance and life-cycle decision as well as an aesthetic one." },
            { id: "c", text: "Avoid finishes because unfinished metal always lasts longer", correct: false, feedback: "Some finishes significantly improve durability. The choice depends on material, environment and use." }
          ]
        },
        {
          id: "complementary-material",
          prompt: "When is a secondary material a sound addition to a metal product?",
          help: "#resources-selection",
          options: [
            { id: "a", text: "When its properties and function improve the complete solution", correct: true, feedback: "Correct. Timber, polymers, ceramics or textiles should be selected because they meet a defined need." },
            { id: "b", text: "Whenever it makes the product look more complex", correct: false, feedback: "Complexity is not a design criterion. The addition needs a functional, aesthetic or life-cycle justification." },
            { id: "c", text: "Only when no metal is available", correct: false, feedback: "Complementary materials can be appropriate even when metal is available, provided the choice is justified." }
          ]
        },
        {
          id: "responsible-argument",
          prompt: "What makes a responsible material recommendation convincing?",
          help: "#resources-performance",
          options: [
            { id: "a", text: "A confident opinion with no comparison", correct: false, feedback: "Confidence is not evidence. A recommendation needs criteria, alternatives and traceable reasoning." },
            { id: "b", text: "A list of metal properties without linking them to the need", correct: false, feedback: "Properties become useful evidence only when connected to function, context and impacts." },
            { id: "c", text: "A comparison against performance, cultural, ethical, economic and life-cycle criteria", correct: true, feedback: "Correct. A multi-criteria comparison shows why the selected option is the best fit and what trade-offs remain." }
          ]
        }
      ],
      response: {
        prompt: "A community group is considering an outdoor metal information marker. Recommend a responsible material strategy. Compare at least two credible metal options and explain how the decision should respond to performance, Country, culture and the full resource life cycle. This is a design analysis only, not an instruction to make the object.",
        scaffold: [
          "Define the user's need, outdoor conditions and the criteria that matter most.",
          "Compare two metals or alloys using properties, stock form, durability, finish or maintenance, cost and end-of-life evidence.",
          "Explain how impacts on Country, Community and any ICIP would be identified and addressed before approval.",
          "Make a recommendation, acknowledge its trade-offs and name the evidence that could change your decision."
        ],
        criteria: [
          "Uses a reasoned comparison rather than a single unsupported preference.",
          "Connects material performance with ethical, cultural, economic and environmental consequences.",
          "States a justified recommendation, trade-offs and further evidence needed."
        ]
      }
    },

    "project-systems": {
      title: "Project systems, collaboration and communication",
      questions: [
        {
          id: "specification-purpose",
          prompt: "What is the main purpose of a project specification?",
          help: "#systems-brief",
          options: [
            { id: "a", text: "To make a finished concept look more detailed", correct: false, feedback: "Detail is useful only when it expresses requirements. A specification is not decoration." },
            { id: "b", text: "To turn the need and constraints into criteria for decisions and testing", correct: true, feedback: "Correct. Measurable specifications guide concept choice, production planning and evaluation." },
            { id: "c", text: "To prevent any design change once planning begins", correct: false, feedback: "Specifications support controlled revision; evidence may justify changing the design or the plan." }
          ]
        },
        {
          id: "risk-cycle",
          prompt: "Which sequence best represents continuing risk management?",
          help: "#systems-risk",
          options: [
            { id: "a", text: "Identify hazards, assess risk, control, then review effectiveness", correct: true, feedback: "Correct. Risk management continues through application and review, not just initial identification." },
            { id: "b", text: "Begin work, notice problems, then write a risk record", correct: false, feedback: "Risk must be considered before exposure, then monitored during the activity." },
            { id: "c", text: "Wear PPE and assume every remaining risk is controlled", correct: false, feedback: "PPE can be important but is only one type of control and does not remove every risk." }
          ]
        },
        {
          id: "safety-authority",
          prompt: "Which statement correctly describes this hub's safety role?",
          help: "#systems-risk",
          options: [
            { id: "a", text: "It replaces local demonstrations and standard operating procedures", correct: false, feedback: "This page is conceptual learning only and cannot replace current local instruction or authorisation." },
            { id: "b", text: "It authorises practical work once all questions are answered", correct: false, feedback: "Formative answers are not practical approval. Only the teacher and current local process can authorise work." },
            { id: "c", text: "It explains principles; students must follow teacher-approved local procedures", correct: true, feedback: "Correct. General principles support understanding, while exact procedures and authority remain local." }
          ]
        },
        {
          id: "materials-list",
          prompt: "What makes a materials list useful for project management?",
          help: "#systems-plan",
          options: [
            { id: "a", text: "It connects components to quantities, stock needs and costs", correct: true, feedback: "Correct. It turns design information into resource and cost planning that can be checked." },
            { id: "b", text: "It records only the name of the main metal", correct: false, feedback: "A single material name cannot support quantity, component, hardware or cost planning." },
            { id: "c", text: "It is prepared after production so actual use cannot vary", correct: false, feedback: "Planning requires an initial list before production, then actual use and changes can be recorded." }
          ]
        },
        {
          id: "plan-change",
          prompt: "A test fails and affects later tasks. What is the strongest project-management response?",
          help: "#systems-plan",
          options: [
            { id: "a", text: "Hide the failure and continue with the original schedule", correct: false, feedback: "Ignoring evidence can compound quality, time and resource problems." },
            { id: "b", text: "Record the result, review dependencies, revise the plan and explain why", correct: true, feedback: "Correct. A controlled revision makes the evidence, consequences and new decision visible." },
            { id: "c", text: "Restart every task whether it is affected or not", correct: false, feedback: "A good response traces dependencies and changes only what the evidence requires." }
          ]
        },
        {
          id: "quality-system",
          prompt: "Which comparison between quality assurance and quality control is most accurate?",
          help: "#systems-plan",
          options: [
            { id: "a", text: "Quality assurance plans reliable processes; quality control checks actual output", correct: true, feedback: "Correct. They work together: one builds quality into the system and the other detects variation in results." },
            { id: "b", text: "Quality assurance checks appearance; quality control checks price", correct: false, feedback: "Both can use many criteria; the key distinction is process planning versus checking output." },
            { id: "c", text: "They are two names for the final inspection", correct: false, feedback: "Final inspection is only one possible quality-control activity; assurance begins much earlier." }
          ]
        },
        {
          id: "collaborative-role",
          prompt: "Which role allocation gives a team the clearest handover?",
          help: "#systems-communication",
          options: [
            { id: "a", text: "Everyone helps with everything whenever possible", correct: false, feedback: "Shared help is valuable, but unclear ownership makes evidence, deadlines and handovers difficult to manage." },
            { id: "b", text: "One person controls all decisions and information", correct: false, feedback: "This creates a bottleneck and prevents genuine collaborative contribution." },
            { id: "c", text: "Each role names its output, evidence, due point and checker", correct: true, feedback: "Correct. Clear deliverables and checks make responsibilities and handovers visible." }
          ]
        },
        {
          id: "graphical-literacy",
          prompt: "Why might a drawing communicate more effectively than a paragraph?",
          help: "#systems-communication",
          options: [
            { id: "a", text: "It can show spatial relationships and dimensions in a shared visual form", correct: true, feedback: "Correct. Graphical literacy communicates shape, position, scale and relationships efficiently." },
            { id: "b", text: "Drawings never require conventions or explanation", correct: false, feedback: "Drawings depend on conventions, labels and audience understanding; ambiguity is still possible." },
            { id: "c", text: "A drawing is always more accurate than measured evidence", correct: false, feedback: "Accuracy depends on how the representation is produced and checked, not simply its format." }
          ]
        },
        {
          id: "data-practice",
          prompt: "Which digital practice best protects reliable project evidence?",
          help: "#systems-communication",
          options: [
            { id: "a", text: "Overwrite the only file so there is one version", correct: false, feedback: "Overwriting the only copy removes version history and makes recovery difficult." },
            { id: "b", text: "Use clear names, controlled access, version records and appropriate backups", correct: true, feedback: "Correct. These practices keep evidence findable, traceable, recoverable and privacy-aware." },
            { id: "c", text: "Share every file publicly so the team can always find it", correct: false, feedback: "Public access may expose information unnecessarily. Access should be authorised and proportionate." }
          ]
        },
        {
          id: "design-evaluation",
          prompt: "Which evaluation gives the strongest evidence about design effectiveness?",
          help: "#systems-brief",
          options: [
            { id: "a", text: "The designer says the result feels successful", correct: false, feedback: "Personal reflection can contribute, but it needs evidence and agreed criteria." },
            { id: "b", text: "The result is compared with specifications using tests, observations and user evidence", correct: true, feedback: "Correct. Multiple relevant evidence sources support a defensible judgement against the brief." },
            { id: "c", text: "Only the final appearance is rated", correct: false, feedback: "Appearance is one quality; function, cost, environmental effects and other criteria also matter." }
          ]
        }
      ],
      response: {
        prompt: "A team must plan a small metal-product concept for a defined user. Develop a project-system proposal that would keep the work coordinated, safe, communicable and open to evidence-based revision. This is planning only and does not authorise workshop work.",
        scaffold: [
          "Write the need and four measurable specifications that could guide concept evaluation.",
          "Outline a task sequence with dependencies, a materials-and-cost checkpoint and a planned review point.",
          "Allocate team roles with explicit outputs, handovers and a method for recording decisions.",
          "Explain the risk-management, quality-assurance, quality-control and data-management evidence the team would need; mark exact local procedures Teacher to confirm."
        ],
        criteria: [
          "Connects the brief, specifications, plan, roles and evidence as one coherent system.",
          "Distinguishes quality assurance from quality control and general safety principles from local authority.",
          "Explains how communication and documented revision would respond to new evidence."
        ]
      }
    },

    "industry-futures": {
      title: "Metal industry, enterprise and future technologies",
      questions: [
        {
          id: "enterprise-value",
          prompt: "Which action best demonstrates enterprise skill in a metal-industry context?",
          help: "#industry-enterprise",
          options: [
            { id: "a", text: "Make the most complex product possible regardless of need", correct: false, feedback: "Complexity does not guarantee value and can increase cost, waste and failure risk." },
            { id: "b", text: "Identify a genuine need, coordinate resources and deliver justified value responsibly", correct: true, feedback: "Correct. Enterprise combines opportunity, planning, communication, quality and ethical responsibility." },
            { id: "c", text: "Focus only on the lowest immediate production cost", correct: false, feedback: "Immediate cost is one factor; value also includes quality, people, impacts, service and product life." }
          ]
        },
        {
          id: "industry-ethics",
          prompt: "When are ethical, cultural and sustainability practices strongest?",
          help: "#industry-enterprise",
          options: [
            { id: "a", text: "When they shape sourcing, planning, production and evaluation decisions", correct: true, feedback: "Correct. They influence the whole system rather than appearing only in promotion." },
            { id: "b", text: "When they are added to advertising after production", correct: false, feedback: "Claims made after production cannot repair decisions that ignored people, culture or impact." },
            { id: "c", text: "When they are considered only if they reduce cost", correct: false, feedback: "Ethical and cultural responsibilities do not disappear when they carry a cost." }
          ]
        },
        {
          id: "process-system",
          prompt: "Why should industrial processes be considered as a connected sequence?",
          help: "#industry-processes",
          options: [
            { id: "a", text: "Because an earlier process can affect later accuracy, joining, finish and quality", correct: true, feedback: "Correct. Process choices interact, so sequence and capability influence the final product." },
            { id: "b", text: "Because every metal product uses exactly the same sequence", correct: false, feedback: "Sequences vary with material, form, design, scale and required quality." },
            { id: "c", text: "Because the most expensive process must always occur first", correct: false, feedback: "Cost does not determine sequence; technical dependencies and quality needs do." }
          ]
        },
        {
          id: "joining-choice",
          prompt: "What is a key reason to compare permanent and semi-permanent joining?",
          help: "#industry-processes",
          options: [
            { id: "a", text: "To decide whether strength, access, repair or disassembly is more important", correct: true, feedback: "Correct. The required service and maintenance conditions guide joining choice." },
            { id: "b", text: "To prove permanent joining is always stronger and therefore better", correct: false, feedback: "Strength depends on the specific joint and need; disassembly or maintenance may be important." },
            { id: "c", text: "To select the join with the most tools involved", correct: false, feedback: "Tool count is not a design criterion. Suitability and whole-life performance are what matter." }
          ]
        },
        {
          id: "advanced-technology",
          prompt: "When is an advanced manufacturing technology the better choice?",
          help: "#industry-technology",
          options: [
            { id: "a", text: "Whenever it is newer than the existing process", correct: false, feedback: "Newness is not evidence of suitability, value or lower impact." },
            { id: "b", text: "When evidence shows its capability fits quality, scale, cost and impact needs", correct: true, feedback: "Correct. Technology choice should be justified against the production context and alternatives." },
            { id: "c", text: "Whenever it removes all need for worker judgement", correct: false, feedback: "Digital systems still require setup, verification, interpretation, maintenance and responsible decisions." }
          ]
        },
        {
          id: "automation-work",
          prompt: "What is a likely workforce effect of increased automation?",
          help: "#industry-technology",
          options: [
            { id: "a", text: "Every metal-industry role disappears at the same rate", correct: false, feedback: "Technology affects tasks and sectors differently; it can remove, change and create work." },
            { id: "b", text: "Material knowledge and communication become irrelevant", correct: false, feedback: "People still need to interpret output, solve problems and work safely in real material contexts." },
            { id: "c", text: "Some routine tasks change while demand grows for digital, maintenance and verification skills", correct: true, feedback: "Correct. Automation often reshapes task mixes and creates new integration and assurance needs." }
          ]
        },
        {
          id: "sustainability-issue",
          prompt: "Which question most directly investigates resource sustainability in the metal industry?",
          help: "#industry-enterprise",
          options: [
            { id: "a", text: "How can supply, material efficiency, product life and recovery be improved together?", correct: true, feedback: "Correct. Resource sustainability links source security, efficient use, durability and circular pathways." },
            { id: "b", text: "Which metal currently has the most fashionable appearance?", correct: false, feedback: "Fashion may affect demand, but it does not investigate the sustainability of the resource system." },
            { id: "c", text: "How can more material be used in every product?", correct: false, feedback: "Using more material without a performance reason usually conflicts with conservation." }
          ]
        },
        {
          id: "industry-change",
          prompt: "Which explanation best shows why industry practices evolve?",
          help: "#industry-technology",
          options: [
            { id: "a", text: "Practices change only when a machine wears out", correct: false, feedback: "Equipment condition is one driver, but technology, markets, regulation, society and environment also matter." },
            { id: "b", text: "Technology, social expectations, environmental pressures and evidence alter what is viable", correct: true, feedback: "Correct. Industry evolves through interacting technical, social, economic and environmental drivers." },
            { id: "c", text: "Industry practice changes randomly, so evidence cannot help", correct: false, feedback: "Change is uncertain but drivers and consequences can still be investigated and reasoned about." }
          ]
        },
        {
          id: "career-investigation",
          prompt: "What makes a career investigation useful?",
          help: "#industry-careers",
          options: [
            { id: "a", text: "Choose a job title that sounds impressive", correct: false, feedback: "A title alone says little about daily work, training, conditions or future skill needs." },
            { id: "b", text: "Compare actual work, pathways, conditions, capabilities and likely technological change", correct: true, feedback: "Correct. This connects present requirements with a reasoned view of how the role may evolve." },
            { id: "c", text: "Assume current tasks will remain unchanged throughout a career", correct: false, feedback: "Roles evolve, so adaptability and continuing learning are important evidence in the comparison." }
          ]
        },
        {
          id: "reasoned-forecast",
          prompt: "Which statement is a reasoned industry forecast?",
          help: "#industry-careers",
          options: [
            { id: "a", text: "Robots will take every job soon", correct: false, feedback: "This is a broad claim without a defined driver, pathway, timeframe or evidence." },
            { id: "b", text: "Nothing important will change because metal is an old material", correct: false, feedback: "Materials can be established while processes, data systems, impacts and roles continue to change." },
            { id: "c", text: "Greater digital inspection may increase demand for workers who can interpret data and verify processes", correct: true, feedback: "Correct. It connects a plausible driver to changed work and identifies a specific skill consequence." }
          ]
        }
      ],
      response: {
        prompt: "A metal enterprise is considering a digitally controlled production technology to reduce material loss and improve consistency. Evaluate the proposal and recommend how the enterprise should respond. Your answer must consider production quality, resources, people, society, environment and future careers.",
        scaffold: [
          "Describe the proposed technology and the production problem it is intended to address.",
          "Compare it with a credible existing process using quality, scale, time, cost, material efficiency and environmental criteria.",
          "Analyse likely effects on workers, customers or Communities, including changed tasks and training needs.",
          "Recommend adopt, trial, modify or reject; state conditions, uncertainties and evidence needed to review the decision."
        ],
        criteria: [
          "Explains a chain from technology driver to production, social, environmental and career consequences.",
          "Uses a balanced comparison that acknowledges benefits, costs and uncertainty.",
          "Makes a justified recommendation with conditions and a way to evaluate impact."
        ]
      }
    }
  };

  const courseKey = document.body.dataset.course || "stage5-metal";
  const storagePrefix = `tas:${courseKey}:syllabus-learning:v1`;
  const storageAvailable = (() => {
    try {
      const probe = `${storagePrefix}:probe`;
      localStorage.setItem(probe, "1");
      localStorage.removeItem(probe);
      return true;
    } catch (error) {
      return false;
    }
  })();

  const stateByPackage = {};
  const saveTimers = {};

  function storageKey(packageId) {
    return `${storagePrefix}:${packageId}`;
  }

  function blankState() {
    return { answers: {}, checked: {}, response: "", updatedAt: "" };
  }

  function loadState(packageId) {
    if (!storageAvailable) return blankState();
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey(packageId)) || "null");
      if (!parsed || typeof parsed !== "object") return blankState();
      return {
        answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
        checked: parsed.checked && typeof parsed.checked === "object" ? parsed.checked : {},
        response: typeof parsed.response === "string" ? parsed.response : "",
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : ""
      };
    } catch (error) {
      return blankState();
    }
  }

  function safeText(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatSavedTime(value) {
    if (!value) return "Not saved yet";
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return "Saved in this browser";
    return `Saved ${date.toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" })}`;
  }

  function persist(packageId) {
    const state = stateByPackage[packageId];
    if (!state || !storageAvailable) {
      updateStatus(packageId);
      return;
    }
    state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(storageKey(packageId), JSON.stringify(state));
    } catch (error) {
      // The status message below remains honest if browser storage becomes unavailable.
    }
    updateStatus(packageId);
  }

  function scheduleSave(packageId) {
    clearTimeout(saveTimers[packageId]);
    saveTimers[packageId] = setTimeout(() => persist(packageId), 250);
  }

  function completionText(packageId) {
    const state = stateByPackage[packageId];
    const checkedCount = Object.values(state.checked).filter(Boolean).length;
    const responseLabel = state.response.trim() ? "written draft saved" : "written draft not started";
    return `${checkedCount}/10 questions checked · ${responseLabel}`;
  }

  function updateStatus(packageId) {
    const state = stateByPackage[packageId];
    document.querySelectorAll(`[data-save-status="${packageId}"]`).forEach((node) => {
      node.textContent = storageAvailable
        ? `${completionText(packageId)} · ${formatSavedTime(state.updatedAt)}`
        : `${completionText(packageId)} · browser storage unavailable`;
    });
    document.querySelectorAll(`[data-package-status="${packageId}"]`).forEach((node) => {
      node.textContent = completionText(packageId);
    });
  }

  function feedbackFor(packageId, question) {
    const state = stateByPackage[packageId];
    const feedback = document.querySelector(`[data-feedback="${packageId}:${question.id}"]`);
    if (!feedback) return;
    const selectedId = state.answers[question.id];
    if (!state.checked[question.id] || !selectedId) {
      feedback.hidden = true;
      feedback.textContent = "";
      feedback.classList.remove("correct");
      return;
    }
    const option = question.options.find((item) => item.id === selectedId);
    if (!option) return;
    feedback.innerHTML = `${safeText(option.feedback)} <a href="${question.help}">Review the relevant explanation ↑</a>`;
    feedback.classList.toggle("correct", option.correct);
    feedback.hidden = false;
  }

  function questionMarkup(packageId, question, index) {
    const optionMarkup = question.options.map((option) => `
      <label class="answer-option">
        <input type="radio" name="${safeText(packageId)}-${safeText(question.id)}" value="${safeText(option.id)}">
        <span>${safeText(option.text)}</span>
      </label>`).join("");
    return `
      <article class="question-card" data-question="${safeText(question.id)}">
        <fieldset>
          <legend>${index + 1}. ${safeText(question.prompt)}</legend>
          ${optionMarkup}
        </fieldset>
        <div class="question-actions screen-only">
          <button class="small-button primary" type="button" data-check-question="${safeText(question.id)}">Check this answer</button>
          <a class="small-button" href="${safeText(question.help)}">Need help? Review the explanation</a>
        </div>
        <p class="option-feedback" data-feedback="${safeText(packageId)}:${safeText(question.id)}" aria-live="polite" hidden></p>
      </article>`;
  }

  function responseMarkup(packageId, response) {
    return `
      <article class="written-response">
        <p class="eyebrow">Higher-order written response</p>
        <h3>Explain, evaluate and justify</h3>
        <p>${safeText(response.prompt)}</p>
        <h4>Build your response</h4>
        <ol>${response.scaffold.map((item) => `<li>${safeText(item)}</li>`).join("")}</ol>
        <h4>Success criteria</h4>
        <ul>${response.criteria.map((item) => `<li>${safeText(item)}</li>`).join("")}</ul>
        <label for="response-${safeText(packageId)}">Your formative written evidence</label>
        <textarea id="response-${safeText(packageId)}" data-written-response="${safeText(packageId)}" placeholder="Draft your response here. It saves in this browser only."></textarea>
        <div class="print-response" data-print-response="${safeText(packageId)}"></div>
        <div class="response-tools screen-only">
          <span class="save-status" data-save-status="${safeText(packageId)}" aria-live="polite"></span>
          <button class="small-button" type="button" data-reset-package="${safeText(packageId)}">Reset this topic's evidence</button>
        </div>
      </article>`;
  }

  function renderPackage(mount, packageId, config) {
    const state = loadState(packageId);
    stateByPackage[packageId] = state;
    mount.innerHTML = `
      <div class="evidence-label">
        <strong>Formative learning evidence</strong>
        <span class="save-status" data-save-status="${safeText(packageId)}" aria-live="polite"></span>
      </div>
      <p>Choose an answer, use the explanation if you need it, then check your choice. Each option gives specific feedback. Your work stays on this device unless you print or save it yourself.</p>
      <div class="question-list">${config.questions.map((question, index) => questionMarkup(packageId, question, index)).join("")}</div>
      ${responseMarkup(packageId, config.response)}`;

    config.questions.forEach((question) => {
      const selectedId = state.answers[question.id];
      if (selectedId) {
        const radio = mount.querySelector(`input[name="${packageId}-${question.id}"][value="${selectedId}"]`);
        if (radio) radio.checked = true;
      }
      feedbackFor(packageId, question);
    });

    const response = mount.querySelector(`[data-written-response="${packageId}"]`);
    const printResponse = mount.querySelector(`[data-print-response="${packageId}"]`);
    response.value = state.response;
    printResponse.textContent = state.response || "No written response saved.";

    mount.addEventListener("change", (event) => {
      const radio = event.target.closest("input[type='radio']");
      if (!radio) return;
      const questionCard = radio.closest("[data-question]");
      const questionId = questionCard.dataset.question;
      state.answers[questionId] = radio.value;
      state.checked[questionId] = false;
      const question = config.questions.find((item) => item.id === questionId);
      feedbackFor(packageId, question);
      scheduleSave(packageId);
    });

    mount.addEventListener("click", (event) => {
      const checkButton = event.target.closest("[data-check-question]");
      if (checkButton) {
        const questionId = checkButton.dataset.checkQuestion;
        const question = config.questions.find((item) => item.id === questionId);
        const feedback = mount.querySelector(`[data-feedback="${packageId}:${questionId}"]`);
        if (!state.answers[questionId]) {
          feedback.classList.remove("correct");
          feedback.textContent = "Choose one option first. If you are unsure, use the help link to revisit the exact explanation.";
          feedback.hidden = false;
          return;
        }
        state.checked[questionId] = true;
        feedbackFor(packageId, question);
        persist(packageId);
        return;
      }

      const resetButton = event.target.closest(`[data-reset-package="${packageId}"]`);
      if (resetButton) {
        const confirmed = window.confirm(`Reset the saved formative evidence for “${config.title}” on this browser?`);
        if (!confirmed) return;
        Object.assign(state, blankState());
        stateByPackage[packageId] = state;
        if (storageAvailable) localStorage.removeItem(storageKey(packageId));
        mount.querySelectorAll("input[type='radio']").forEach((radio) => { radio.checked = false; });
        mount.querySelectorAll("[data-feedback]").forEach((feedback) => {
          feedback.hidden = true;
          feedback.textContent = "";
          feedback.classList.remove("correct");
        });
        response.value = "";
        printResponse.textContent = "No written response saved.";
        updateStatus(packageId);
      }
    });

    response.addEventListener("input", () => {
      stateByPackage[packageId].response = response.value;
      printResponse.textContent = response.value || "No written response saved.";
      updateStatus(packageId);
      scheduleSave(packageId);
    });

    updateStatus(packageId);
  }

  document.querySelectorAll("[data-package]").forEach((mount) => {
    const packageId = mount.dataset.package;
    const config = packages[packageId];
    if (config) renderPackage(mount, packageId, config);
  });

  document.querySelectorAll("[data-open-package]").forEach((link) => {
    link.addEventListener("click", () => {
      const details = document.getElementById(`package-${link.dataset.openPackage}`);
      if (details) details.open = true;
    });
  });

  document.querySelectorAll("[data-print-page]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".learning-package").forEach((details) => { details.open = true; });
      window.print();
    });
  });
})();
