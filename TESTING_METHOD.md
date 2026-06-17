# Testing Method

GPT Pro Eval Lab uses a compact five-part rubric. Each dimension is scored from `0` to `5`, where `0` means the response missed the requirement and `5` means it was excellent without needing material correction.

## Rubric

| Dimension | What to Look For |
| --- | --- |
| Reasoning depth | The response decomposes the problem, handles edge cases, and explains tradeoffs. |
| Instruction fidelity | The response follows explicit constraints, formatting requests, and scope boundaries. |
| Verification quality | The response includes checks, tests, citations, or uncertainty markers where appropriate. |
| Communication clarity | The response is easy to scan and uses the right level of detail for the audience. |
| Practical usefulness | The response can be acted on without substantial extra work. |

## Suggested Workflow

1. Run the same scenario against each model or configuration.
2. Save the raw answer separately.
3. Score each dimension immediately after reading.
4. Add notes about surprising strengths, weaknesses, and follow-up prompts.
5. Export the report from the app.

## Interpreting Scores

- `4.5-5.0`: Excellent result; suitable for high-stakes drafting or implementation with light review.
- `3.5-4.4`: Strong result; useful but may need targeted correction.
- `2.0-3.4`: Mixed result; requires careful human review.
- `0.0-1.9`: Failed the scenario or ignored key instructions.

## Notes for Reviewers

The scenarios are intentionally open-ended. A good answer should not merely be long; it should preserve constraints, expose assumptions, and reduce the user's next-step burden.
