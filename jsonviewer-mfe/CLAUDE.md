# CLAUDE.md

## Project AI System

All AI-related context, workflows, and agents are stored in:
    .ai/
You MUST follow this structure:

- Workflows: .ai/workflows/
- Features: .ai/features/
- Agents: .ai/agents/
- Memory: .ai/memory/

## Instructions

When working on a task:

1. Locate the relevant feature in `.ai/features/`
2. Read:
    - .agents.md
    - requirements.md
    - architecture.md
    - plan.yaml
3. Execute tasks according to `.ai/workflows/`
4. Do NOT infer system design outside `.ai/`

## Rules

- `.ai/` is the source of truth for system design
- Do not guess APIs — check `.ai/services/`
- Persist decisions in `.ai/memory/` or feature `decisions/`