# GPT Pro Eval Lab

A lightweight, browser-only lab for designing and scoring demanding GPT Pro test cases.

This project is intended for evaluating advanced model behavior on long-context reasoning, tool-use planning, writing quality, coding assistance, and multi-step problem solving. It ships as a static web app so reviewers can open it immediately from GitHub Pages or a local browser.

## Why This Project

GPT Pro testing benefits from repeatable prompts, clear scoring criteria, and transparent notes about failure modes. GPT Pro Eval Lab gives testers a simple workflow:

1. Choose a test scenario.
2. Review the expected capabilities and scoring rubric.
3. Record model observations.
4. Compare runs across categories.

## Features

- Curated benchmark-style scenarios for advanced GPT usage
- Category filters for reasoning, coding, writing, data analysis, and agentic workflows
- Scorecard with weighted dimensions
- Local-only notes panel using browser storage
- Exportable JSON report for sharing results
- No backend, no dependencies, no account required

## Repository Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── scenarios.json
├── TESTING_METHOD.md
└── LICENSE
```

## Run Locally

Open `index.html` in any modern browser.

If you prefer a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Testing Method

The included scenarios focus on tasks where a more capable model should show measurable advantages:

- Maintaining coherence over long instructions
- Following constraints without losing creativity
- Producing useful code with clear verification steps
- Handling ambiguous goals by making sensible assumptions
- Explaining tradeoffs and uncertainty without over-answering

See [TESTING_METHOD.md](TESTING_METHOD.md) for the full rubric.

## GitHub Pages

This is a static project. To publish it:

1. Open the repository settings.
2. Go to **Pages**.
3. Select the `main` branch and root folder.
4. Save.

## License

MIT
