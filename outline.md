# AI Native Development Workshop

## Building with Multi-Agent Systems & Context Engineering

---

## Agenda

- Introduction
- The AI Development Spectrum
- Tools & Environment Setup
- Working with Agents (Claude Code Deep Dive)
- Context Engineering
- MCP Servers & Integrations
- Multi-Agent & Parallel Workflows
- Advanced Techniques
- Live Demo: Building a Todo App

---

## Introduction

- Background & credentials
- AI Native Coding for 18+ months
- Early adopter of Cursor, Claude Code since launch
- 90%+ of code is AI generated
- Can ship 1-2 products per month

---

## The AI Development Spectrum

Three approaches to AI-assisted development:

**Vibe Coding** ← → **Code Assist** ← → **AI Native Development**

---

## Vibe Coding

- For non-technical roles (PMs, designers, marketers)
- Tools like Lovable & Replit turn ideas into prototypes
- Accelerates communication & iteration
- Risk: Technical debt, lack of understanding

---

## Code Assist

- For developers who primarily hand-code
- AI tools (GitHub Copilot) assist with completion, refactoring, debugging
- Developers write 50%+ of code, retaining control
- Limitation: Single-turn, no context persistence

---

## AI Native Development

- For technical teams
- Tools (Cursor, Claude Code) transform workflows
- Output & iteration speed increase 5-10x
- Engineering with AI at its core, not just prompting
- **This is what we're learning today**

---

## Categories of Coding Tools

| Category | Examples | Notes |
|----------|----------|-------|
| IDEs | Cursor, Antigravity, VS Code | Cursor has best agent mode, Antigravity good with Gemini |
| Terminals | Warp, Ghostty | Warp supports agentic features |
| Agents | Claude Code, Codex, Gemini CLI | Terminal-based AI agents |

---

## Why Warp for AI Agents

- **Built-in AI Agent Mode** - Natural language detection, seamless delegation
- **Modern UX** - Block-based navigation, IDE-like editing, smart auto-complete
- **Cross-Platform** - PowerShell, Git Bash, WSL support
- **Warp Drive** - Share runbooks, workflows, commands across teams
- **Performance** - Built in Rust, faster than traditional terminals

---

## Recommended AI-Native Coding Setup

1. **Terminal (Warp)** - Primary interface, tab management
2. **Multiple Agent Tabs** - Dedicate each tab to an AI agent
3. **IDE for Review** - Cursor/VS Code for final review, debugging, edits

This integrates AI agents directly into your terminal workflow.

---

## Model Selection Strategy

| Model | Strength | Use Case |
|-------|----------|----------|
| Heavy (Opus, o1) | Deep reasoning | Complex tasks, architecture, planning |
| Light (Sonnet, Flash) | Fast iterations | Quick refactors, small fixes |
| Gemini | Visual understanding | UI/design work |

**Default Strategy**: Start light; escalate only when blocked or quality demands it.

---

## Asking the Model to Think

When you need deeper reasoning, add cues:

- `think` - Normal depth reasoning
- `think more` - Slower, more detailed steps
- `ultrathink` - Maximum reasoning, high token cost

Use for design decisions, migrations, or root-cause analysis.

---

## Claude Code Overview

- CLI tool for terminal-based AI development
- Full codebase context
- Agentic capabilities
- MCP server support
- 200k token context window

```bash
npm install -g @anthropic-ai/claude-code
claude
```

---

## How Agents Work

Agents work through your code like a developer:

1. **Search & grep** files and folders
2. **Read documentation** and architectural rules
3. **Access tools** to execute tasks

---

## Plan Mode vs Agent Mode

| Plan Mode | Agent Mode |
|-----------|------------|
| Think first, execute later | Autonomous execution |
| Review before changes | Changes happen in real-time |
| Complex/risky changes | Well-defined tasks |

**Shift + Tab** to switch modes. When unsure → Start with Plan Mode.

---

## Organize Code for Agents

- **Clear File Naming** - Descriptive, consistent naming conventions
- **Logical Folder Structure** - Group related functionality together
- **Context Tags** - Tag important files/folders for quick identification

Good organization helps agents understand, modify, and extend your code.

---

## The DOCS Folder Pattern

Create a `docs/` folder to capture information agents can load:

```
docs/
├── rules/           # Reusable patterns, integrations (e.g., Clerk + Convex)
├── features/        # spec.md and progress.md per feature
└── learnings/       # Lessons discovered while solving problems
```

This gives agents reliable context, just like documentation for engineers.

---

## Managing Context with CLAUDE.md

`claude.md` serves as your project guide - conventions, scripts, entry points, do's and don'ts.

- **/init command** - Generate claude.md automatically
- **Subfolder claude.md** - Root for global, subfolders for tailored instructions
- **Dynamic Rule Loading** - Reference `docs/rules/*` and `docs/features/*`
- **# [remember this]** - Tell Claude to remember information

*Don't write claude.md yourself - let Claude Code generate and maintain it*

---

## Context Window Management

The agent operates within 200k tokens. Manage it:

- **/clear** - Reset context when looping or history is polluted
- **/compact** - Summarize and prune history, keep continuity
- **Subagents** - Isolated contexts reduce token pressure
- **Continue Sessions** - Resume via `-c` flag or Recent menu

---

## Custom Commands (Slash Commands)

Store commands in `.claude/commands/*.md`:

- `/start-feature` - Initialize feature branch, boilerplate
- `/fix-linter` - Auto-fix linting errors
- `/commit-merge` - Stage, commit, merge with conflict resolution
- `/review` - Code review workflow

Ask Claude Code to create these commands for you.

---

## Subagents & Task Delegation

Specialized subagents for different parts of the system:

- **Frontend Agent** - UI/UX, styling, design systems
- **Backend Agent** - APIs, databases, server logic
- **QA Agent** - Testing, quality assurance, bug detection

```bash
claude start [agent_name]
```

Configs stored in `.claude/agents/`

---

## Hooks for Automation

Hooks trigger follow-up actions when tasks complete:

1. Code completion
2. → Automated testing
3. → Quality review
4. → Deployment (if checks pass)

Examples: run tests, send notifications, auto-review code.

---

## Skills: Progressive Context Loading

Skills are markdown files that teach Claude domain-specific knowledge:

**When to use Skills:**
- Complex multi-step workflows
- Domain knowledge too extensive for CLAUDE.md
- Team conventions and best practices
- Tool-specific patterns

**Skills vs Commands**: Commands trigger actions; Skills provide knowledge
**Skills vs Subagents**: Subagents are isolated workers; Skills are shared context

*Skills load progressively - Claude reads them when relevant, not all upfront*

---

## Looping Until Done

Get agents to loop until task completion:

- **Build Fixing** - Read errors → fix code → build again → repeat
- **Frontend Testing** - Modify code → run Playwright tests → check screenshots → fix → repeat
- **Backend Development** - Write code → query database → verify → adjust → repeat

Combine with MCPs for QA or databases for continuous testing.

---

## What To Do When Stuck

- **Reset Context** - `/clear` and try again fresh
- **Switch Agents** - Move from Claude to Codex or vice versa
- **Consult Other Models** - Use Zen MCP for second opinions
- **Ask to THINK MORE** - Explicitly request deeper reasoning

---

## What is MCP?

**Model Context Protocol**

Standardized interfaces that connect AI agents to development environments - like a USB-C adapter for AI tools.

---

## Popular MCPs

| MCP | Use Case |
|-----|----------|
| **Playwright** | Browser automation, QA, screenshots |
| **Context7** | Semantic search across code & docs |
| **Figma** | Design file access, component specs |
| **Supabase/Convex** | Database queries, schema inspection |
| **GitHub** | Repo management, PR reviews, issues |
| **Zen** | Consult other AI models |

Find more at MCP Registry or `@modelcontextprotocol/server-*`

---

## MCP Configuration

```bash
claude mcp add server-name --scope project
claude mcp list
```

**Scope Levels:**
- **Project** - `.mcp.json` at repo root, shared via git
- **Global** - `~/.config/claude/mcp.json`, personal utilities

*Project for team tools, Global for personal tools*

---

## Working on Multiple Features in Parallel

While agents loop (2-15 min), maximize your time:

1. **Multiple Agent Tabs** - Separate tabs per feature (risk: file conflicts)
2. **Separate Projects** - Different repos entirely
3. **Git Worktrees** - Replicate project to branch, merge when ready
4. **Conductor.build** - Automates worktrees, parallel agents, AI-assisted merging

---

## Conductor.build

- Spins up isolated git workspaces in the cloud
- Each agent gets its own branch
- Full codebase access, no conflicts
- Review diffs, merge when ready
- Think CI/CD for AI agents

---

## Agent Views in IDEs

**Cursor** - Switch between Agents and Editor mode, multiple parallel threads

**Antigravity** - Google's VS Code fork, agents across workspaces, inbox for updates

Monitor multiple agents, see progress in real-time.

---

## Code Reviews with Agents

- **Review locally** - Have agents review each other's code
- **CodeRabbit** - AI-powered PR reviews in GitHub/GitLab
- `/review` command for streamlined reviews

Agents can review, humans approve.

---

## Designing with AI Agents

1. **Prototype Features** - Have AI build until satisfied
2. **Extract Components** - Pull successful patterns into UI library
3. **Build Design System** - Create consistent component library
4. **Guide Future Development** - Point agents to your UI library

---

## UI Library Foundations

- **Radix UI** - Low-level, unstyled, accessible components
- **shadcn/ui** - Customizable, copy-paste components
- **Headless UI** - Unstyled, works with Tailwind
- **Tamagui** - Universal kit for React Native + web

---

## Speech-to-Text for Flow

Integrate speech-to-text to maintain focus:

- **Hands-free coding** - Dictate code, commands, comments
- **Streamlined documentation** - Speak commit messages, task descriptions
- **Voice-activated commands** - Navigate files, trigger builds
- **Tool**: Wispr Flow (wisprflow.ai)

---

## Comparing Terminal Agents

| Agent | Strengths | Context Window |
|-------|-----------|----------------|
| **Claude Code** | Most feature-rich, subagents, custom commands, robust MCP | 200k tokens |
| **Codex** | Good alternative, sometimes overthinks | ~1M tokens |
| **Gemini CLI** | Large context, can integrate as tool | ~1M tokens |

**Tip**: Don't rely on one agent. Switch when stuck.

---

## Picking the Right Stack

Monorepo > Microservices for small teams with AI agents:

- Reduced coordination costs
- Simplified CI/CD
- Full context for agents
- Faster local development
- Faster refactoring

---

## Recommended Stack

- **Next.js** - Web apps, file-based routing, great with AI
- **Expo** - Cross-platform mobile, unified toolchain
- **Convex** - Backend + database in monorepo, type-safe
- **Clerk** - Managed auth, web/mobile SDKs
- **Vercel AI SDK + BAML** - Streaming, tool calling, structured outputs

---

## Best Practices Summary

- Build small, testable features
- Start in plan mode for complex tasks
- Document specs & progress in .md files
- Commit frequently with `/commit`
- Keep feature scope small
- Review at checkpoints, not just at the end

---

## Key Takeaways

1. **Don't vibe code, get in the weeds** - Know how agents work internally
2. **Get out of the agent's way** - Set clear goals, provide context, let them run
3. **Generate and review code** - Focus on guiding AI, review output
4. **Organize code for agents** - Clear, modular code with explicit interfaces
5. **Stay up to date** - The space moves fast

---

## Live Demo Overview

**Building a Todo App**

- Next.js frontend
- Convex backend
- Claude Code with full setup
- Watch context engineering in action

---

## [LIVE DEMO]

Demo Steps:
1. Initialize Next.js + Convex project
2. Set up CLAUDE.md and docs/ structure
3. Plan mode: outline app structure
4. Agent mode: implement features
5. Use Context7 MCP for docs lookup
6. Looping for build fixes
7. Code review workflow

---

## Resources

- Claude Code documentation
- MCP server directory
- Conductor.build
- Context7
- Wispr Flow
- github.com/hypersocialinc/claude-code-agents

---

## Q&A

Questions?

---

## Thank You!
