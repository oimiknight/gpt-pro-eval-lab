const state = {
  scenarios: [],
  scores: {
    reasoning: 0,
    instruction: 0,
    verification: 0,
    clarity: 0,
    usefulness: 0
  }
};

const scoreLabels = {
  reasoning: "Reasoning depth",
  instruction: "Instruction fidelity",
  verification: "Verification quality",
  clarity: "Communication clarity",
  usefulness: "Practical usefulness"
};

const scenarioList = document.querySelector("#scenarioList");
const categoryFilter = document.querySelector("#categoryFilter");
const difficultyFilter = document.querySelector("#difficultyFilter");
const searchInput = document.querySelector("#searchInput");
const scoreRows = document.querySelector("#scoreRows");
const totalScore = document.querySelector("#totalScore");
const runNotes = document.querySelector("#runNotes");
const exportButton = document.querySelector("#exportReport");

async function loadScenarios() {
  const response = await fetch("scenarios.json");
  state.scenarios = await response.json();
  hydrateCategories();
  renderScenarios();
}

function hydrateCategories() {
  const categories = [...new Set(state.scenarios.map((scenario) => scenario.category))].sort();
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  }
}

function renderScenarios() {
  const template = document.querySelector("#scenarioTemplate");
  const category = categoryFilter.value;
  const difficulty = difficultyFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  scenarioList.replaceChildren();

  const filtered = state.scenarios.filter((scenario) => {
    const matchesCategory = category === "all" || scenario.category === category;
    const matchesDifficulty = difficulty === "all" || scenario.difficulty === difficulty;
    const searchable = `${scenario.title} ${scenario.description} ${scenario.category}`.toLowerCase();
    return matchesCategory && matchesDifficulty && searchable.includes(query);
  });

  for (const scenario of filtered) {
    const node = template.content.cloneNode(true);
    node.querySelector(".tag").textContent = scenario.category;
    node.querySelector(".difficulty").textContent = scenario.difficulty;
    node.querySelector("h2").textContent = scenario.title;
    node.querySelector(".description").textContent = scenario.description;
    node.querySelector("pre").textContent = scenario.prompt;

    const signals = node.querySelector(".signals");
    for (const signal of scenario.successSignals) {
      const item = document.createElement("li");
      item.textContent = signal;
      signals.append(item);
    }

    scenarioList.append(node);
  }

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "panel scenario-card";
    empty.textContent = "No scenarios match the current filters.";
    scenarioList.append(empty);
  }
}

function renderScorecard() {
  scoreRows.replaceChildren();

  for (const [key, label] of Object.entries(scoreLabels)) {
    const row = document.createElement("div");
    row.className = "score-row";

    const rangeLabel = document.createElement("label");
    rangeLabel.textContent = label;
    rangeLabel.htmlFor = `score-${key}`;

    const input = document.createElement("input");
    input.id = `score-${key}`;
    input.type = "range";
    input.min = "0";
    input.max = "5";
    input.step = "0.5";
    input.value = state.scores[key];

    const output = document.createElement("output");
    output.value = state.scores[key];
    output.textContent = Number(state.scores[key]).toFixed(1);

    input.addEventListener("input", () => {
      state.scores[key] = Number(input.value);
      output.value = input.value;
      output.textContent = Number(input.value).toFixed(1);
      persist();
      updateTotal();
    });

    const control = document.createElement("div");
    control.append(rangeLabel, input);
    row.append(control, output);
    scoreRows.append(row);
  }

  updateTotal();
}

function updateTotal() {
  const values = Object.values(state.scores);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  totalScore.textContent = average.toFixed(1);
}

function persist() {
  localStorage.setItem("gpt-pro-eval-lab", JSON.stringify({
    scores: state.scores,
    notes: runNotes.value
  }));
}

function restore() {
  const saved = JSON.parse(localStorage.getItem("gpt-pro-eval-lab") || "{}");
  if (saved.scores) {
    state.scores = { ...state.scores, ...saved.scores };
  }
  if (saved.notes) {
    runNotes.value = saved.notes;
  }
}

function exportReport() {
  const report = {
    generatedAt: new Date().toISOString(),
    totalScore: Number(totalScore.textContent),
    scores: state.scores,
    notes: runNotes.value,
    visibleScenarioCount: scenarioList.querySelectorAll(".scenario-card").length
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "gpt-pro-eval-report.json";
  link.click();
  URL.revokeObjectURL(url);
}

categoryFilter.addEventListener("change", renderScenarios);
difficultyFilter.addEventListener("change", renderScenarios);
searchInput.addEventListener("input", renderScenarios);
runNotes.addEventListener("input", persist);
exportButton.addEventListener("click", exportReport);

restore();
renderScorecard();
loadScenarios();
