# AI Native Development Workshop

## Building with Multi-Agent Systems & Context Engineering

**Selcuk Atli**
selcuk.atli@gmail.com

---

## Agenda

- My AI Native Journey & Background
- The AI Development Spectrum
- Tools & Environment Setup
- Claude Code Deep Dive
- Context Engineering (CLAUDE.md, Skills, Docs)
- MCP Servers & Browser Automation
- Multi-Agent & Parallel Workflows
- Staying in Flow (Voice, Visual Feedback)
- Stack & Best Practices
- Live Demo: Building a Todo App

---

## My AI Native Journey

**AI Native Coding for 18+ months**
Early adopter of Cursor, Claude Code since March 2024

**90%+ of our code is AI generated**
Leveraging AI throughout the entire development lifecycle - from initial concept to final review

**Ship 1-2 products per month**
Rapidly delivering new products by leveraging AI-assisted development for accelerated iteration

---

## Background

**Fulbright Scholar** - BS and MS in Computer Science

**SocialWire** - Advertising platform acquired by Rakuten

**Boostable** - Y Combinator-backed advertising tool for marketplace sellers, acquired by Metric Collective

**Bunch** - Group video chat app for multiplayer games
- 10+ million downloads
- Raised $35M+ from General Catalyst, EA, Take-Two, Ubisoft, Tencent, Riot Games, Supercell

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

## Environment Setup with Agents

Let agents handle the tedious setup work:

**Project Bootstrapping**
- Agents scaffold new projects (React, Next.js, Expo, etc.)
- Handle initial tooling and configurations automatically

**Dependency Management**
- Install dependencies and resolve version conflicts
- No more "dependency hell" - agents figure it out

**Automated Troubleshooting**
- Agent reads error logs and fixes PATH issues, missing deps, misconfigurations
- Faster than manual debugging

**Testing Setup**
- Set up testing frameworks (Jest, Playwright, Vitest) from scratch
- Run tests and interpret failures

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

## Accessing Claude Code

Three ways to use Claude Code:

1. **Terminal of your choice** - Run `claude` in any terminal (Warp, iTerm, etc.)
2. **VS Code / Cursor Extension** - Integrated IDE experience
3. **Claude Code App** - Desktop app for local or remote access via GitHub


---

## How Agents Work

Agents work through your code like a developer:

1. **Search & grep** files and folders
2. **Read documentation** and architectural rules
3. **Access tools** to execute tasks

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

## Plan Mode vs Agent Mode

| Plan Mode | Agent Mode |
|-----------|------------|
| Think first, execute later | Autonomous execution |
| Review before changes | Changes happen in real-time |
| Complex/risky changes | Well-defined tasks |

**Shift + Tab** to switch modes. When unsure → Start with Plan Mode.

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

## Recovering from Mistakes

When the agent goes off track, you can rewind:

**Esc Esc (double-tap)** - Rewind conversation to a previous point
- Clears subsequent messages from history
- Note: Does NOT undo file changes (use git for that)

**Other useful shortcuts:**
- `Ctrl+C` - Cancel current generation
- `Ctrl+L` - Clear terminal screen (keeps conversation)
- `Up/Down` - Navigate through previous inputs

*Don't let a bad response derail your session - just rewind and try again*

---

## Asking the Model to Think

When you need deeper reasoning, add cues:

- `think` - Normal depth reasoning
- `think more` - Slower, more detailed steps
- `ultrathink` - Maximum reasoning, high token cost

Use for design decisions, migrations, or root-cause analysis.

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

**How to use:**
1. Create subagent files in `.claude/agents/` (markdown with name, description, tools)
2. Invoke by mentioning in your prompt:
   - "Use the test-runner subagent to fix failing tests"
   - "Have the code-reviewer subagent look at my changes"
3. Or use `/agents` command interactively

---

## Subagent Example: Extract Pattern

I built an `extract-pattern` subagent to search GitHub repos for implementation patterns.

**The problem:** Searching repos dumps raw results into main context, blowing up tokens

**Why a subagent?**
- **Isolated context** - Heavy search operations happen in subagent
- **Token efficiency** - ~8x cleaner context vs raw search results
- **Specialized prompts** - Optimized for code pattern extraction
- **Cost savings** - Can use lighter models (Sonnet) for research

**Use cases:**
- "How did we implement auth in project X?"
- "Find our Stripe checkout integration pattern"
- Onboarding new team members to existing patterns

**Resource:** [github.com/hypersocialinc/claude-code-agents](https://github.com/hypersocialinc/claude-code-agents)

---

## Hooks for Automation

Hooks trigger follow-up actions when tasks complete:

1. Code completion
2. → Automated testing
3. → Quality review
4. → Deployment (if checks pass)

Examples: run tests, send notifications, auto-review code.

Configure via `/hooks` or in `.claude/settings.json`

---

## Skills: Progressive Context Loading

Skills are markdown files that teach Claude domain-specific knowledge:

**Where to add:**
- Store in `.claude/skills/` folder
- Structure: markdown with description, instructions, and optional resources

**When to use Skills:**
- Complex multi-step workflows
- Domain knowledge too extensive for CLAUDE.md
- Team conventions and best practices
- Tool-specific patterns

**Skills can include:**
- Step-by-step instructions
- Code examples and templates
- Links to external resources/docs
- Tool configurations

**Skills vs Commands**: Commands trigger actions; Skills provide knowledge
**Skills vs Subagents**: Subagents are isolated workers; Skills are shared context

*Skills load progressively - Claude reads them when relevant, not all upfront*

---

## Skills Example: Music Production App

Building a music app with Strudel required extensive domain knowledge:

**The problem:** Too much context would blow up the context window
- Strudel syntax and API
- Music theory fundamentals
- Genre-specific production styles (house, techno, ambient, etc.)

**The solution:** Organized skills by topic
```
.claude/skills/
├── strudel-syntax.md      # Core Strudel patterns & API
├── music-theory.md        # Scales, chords, progressions
└── genres/
    ├── house.md           # House production techniques
    ├── techno.md          # Techno patterns & sounds
    └── ambient.md         # Ambient textures & pads
```

**Result:** Agent picks up only relevant context based on current task

---

## Working with External Documentation

How to give agents the docs they need:

**Copy & Paste Markdown**
- Many modern tools have "Copy as MD" buttons (Stripe, Vercel, Supabase, etc.)
- Paste entire doc pages directly into the agent conversation
- Quick way to give context without leaving your flow

**Use Context7 MCP**
- Semantic search across library documentation
- Agent can look up docs on demand without you copying
- Works with most popular frameworks and tools

**Capture What Works**
- When you successfully implement something, use `# [remember this]`
- Save reusable patterns to `docs/rules/` for future use
- Build your own library of "how we do X" for the agent

---



## The AI-Native Development Loop

In AI-native development, agents iterate on tasks, guided by human review and feedback. This cycle refines agent performance over time.

**AI Generation** ⚡ → **Human Verification** 💬

- AI agents generate initial solutions or code based on tasks
- Humans review and validate the agent's output for accuracy

**Your goal: take yourself out of the loop as much as possible**

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

## Browser MCP in Claude Code

Give Claude Code the ability to browse and debug web apps:

**Chrome DevTools MCP** (Official from Google)
- Direct access to Chrome's developer tools
- Debugging, performance analysis, network inspection
- Real-time insights into your web app
- [developer.chrome.com/blog/chrome-devtools-mcp](https://developer.chrome.com/blog/chrome-devtools-mcp)

**Browser MCP** ([browsermcp.io](https://browsermcp.io))
- Chrome extension for browser automation
- Uses your real browser profile (stays logged in)
- Navigate, click, type, fill forms, take screenshots

**Use cases:** Test your app, debug UI issues, automate web tasks, verify deployments

---

## Native Browser in Cursor & Antigravity

Both IDEs have built-in browser capabilities - no MCP installation needed:

**Cursor:**
- Native browser tool for agents
- Take screenshots, interact with your running app
- Visual regression testing built-in
- Works across web, desktop, and mobile

**Antigravity:**
- Built-in browser preview and extension
- Agents interact directly with Chrome
- Automated UI testing and visual debugging
- Seamless integration with Gemini

*No extra setup - browser automation works out of the box*

---


## Claude Code Plugins & Marketplaces

Extend Claude Code with community plugins - commands, agents, MCP servers, and hooks:

**Adding a marketplace:**
```bash
/plugin marketplace add jeremylongshore/claude-code-plugins
```

**Installing a plugin:**
```bash
/plugin install [plugin_name]@[marketplace_name]
```

**Popular marketplaces:**
- [claudecodeplugins.io](https://claudecodeplugins.io) - 243+ production-ready plugins
- [claudecodemarketplace.net](https://claudecodemarketplace.net) - Community submissions
- [claudecodeplugin.com](https://claudecodeplugin.com) - Curated plugin directory

**For organizations:** Create a private GitHub repo with your plugins and share across teams - standardize workflows, commands, and best practices company-wide

**Why use plugins:** Skip writing boilerplate commands, leverage community best practices


---

## Remote & Async Coding

Work on code without your dev machine:

**Claude Code on the Web**
- Access via claude.ai → select a GitHub repo
- Agent works in a cloud environment
- Creates PRs you can review and merge later
- Great for quick fixes from your phone or tablet

**OpenAI Codex**
- Similar async workflow via GitHub
- Queue up tasks, review results later
- Background execution while you're away

**Use cases:**
- Fix a bug while commuting
- Kick off a feature overnight
- Review and iterate from anywhere

---


## Working on Multiple Features in Parallel

While agents loop (2-15 min), maximize your time:

1. **Multiple Agent Tabs** - Separate tabs per feature (risk: file conflicts)
2. **Separate Projects** - Different repos entirely
3. **Git Worktrees** - Replicate project to branch, merge when ready
4. **Conductor.build** - Automates worktrees, parallel agents, AI-assisted merging

---

## Multi-Agent Code Reviews

Use multiple agents to review each other's work before sharing with the team:

**The workflow:**
1. Claude Code works on a feature branch → creates a PR
2. Open a new tab with another Claude Code (or Codex)
3. Have the second agent do a local PR review
4. Human developer joins the review process
5. First agent fixes issues based on feedback
6. PR is ready for team review - already battle-tested

**Tools:**
- `/review` command for streamlined reviews
- **CodeRabbit** - AI-powered PR reviews in GitHub/GitLab

**Benefits:**
- Catch issues before human reviewers see them
- Different agents catch different things
- Faster iteration cycles
- Cleaner PRs = faster team approvals

---


## Cursor Agent Mode

- Switch between Agents and Editor mode
- Multiple parallel threads
- Background agents work while you code
- Monitor progress in real-time

---

## Antigravity

- Google's VS Code fork optimized for AI
- Agents work across workspaces
- Inbox for agent updates and notifications
- Deep Gemini integration

---

## Conductor.build

- Spins up isolated git workspaces in the cloud
- Each agent gets its own branch
- Full codebase access, no conflicts
- Review diffs, merge when ready
- Think CI/CD for AI agents

---

## Conductor Configuration

Define your workspace setup in `conductor.json` at repo root:

```json
{
  "scripts": {
    "setup": "cp ../../.env.local .env.local && cp ../../apps/next/.env.local apps/next/.env.local && npm install && npx convex dev --once",
    "run": "npm run dev"
  }
}
```

**Script types:**
- **setup** - Runs when workspace is created (copy env vars, install deps, init services)
- **run** - Starts your dev server in the isolated workspace

*Conductor reads this automatically - agents get fully configured environments*

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

## Staying in the Flow

Minimize context switching to maximize productivity:

Use your voice and visuals to communicate with agents:

- **Speech-to-text** - Talk to your agent instead of typing
- **Visual markup** - Show the agent what you mean with screenshots

*Keep your hands on the keyboard, your eyes on the code, and let the agent understand you faster*

---

## Speech-to-Text for Flow

**Wispr Flow** (wisprflow.ai) - Best-in-class speech-to-text for developers:

- **Context-aware transcription** - Understands code, technical terms, variable names
- **Works everywhere** - Any app, any text field, system-wide
- **Fast and accurate** - Real-time transcription with minimal latency
- **Privacy-focused** - Processes locally, no cloud dependency

**Use cases:**
- Dictate prompts to your AI agent
- Speak commit messages and documentation
- Voice-control your workflow without leaving the keyboard

---

## Visual Feedback for Agents

Give agents visual context by sharing screenshots and markups:

**The workflow:**
1. Take a screenshot of the issue (UI bug, design reference, error)
2. Mark it up with annotations (arrows, circles, text)
3. Copy to clipboard and paste into Claude Code

**Why it works:**
- Agents understand visual context instantly
- No need to describe complex UI issues in words
- Faster debugging of visual bugs
- Great for design implementation tasks

**Tools:** Shottr, CleanShot X, or any screenshot tool with markup

---

## Comparing Terminal Agents

| Agent | Strengths | Context Window |
|-------|-----------|----------------|
| **Claude Code** | Most feature-rich, subagents, custom commands, plugins, MCP | 200k tokens |
| **Codex** | Deep GitHub integration, background tasks, async workflows | Varies by model |
| **Gemini CLI** | Massive context, multimodal, Google ecosystem integration | 1-2M tokens |

**Tip**: Don't rely on one agent. Switch when stuck.

---

## Suggested Models based on Use Case

| Model | Use Case |
|-------|----------|
| Claude Opus 4.5 | Daily driver |
| Gemini 3.0 Pro | Great for UI/UX |
| Cursor Composer 1 | Quick easy tasks |
| Codex 5.1 | Code Reviews |

---

## Why Agents Love Monorepos

Co-locating code makes agents more effective:

- **Full visibility** - Agent sees frontend, backend, and shared code together
- **Type safety across boundaries** - Shared types prevent agent mistakes
- **Single context** - No jumping between repos, stays in context window
- **Easier refactoring** - Agent can update all references in one pass

*Not saying microservices are bad - just that agents work better with unified codebases*

---

## Our Stack (And Why It's Agent-Friendly)

Tools we use that work great with AI agents:

- **Next.js** - File-based routing = predictable structure agents understand
- **Expo** - Single codebase for iOS/Android/web = less context switching
- **Convex** - Backend + DB in same repo, type-safe end-to-end = fewer agent errors
- **Clerk** - Drop-in auth with clear docs = agents implement it correctly first try
- **Vercel AI SDK** - Well-documented patterns for streaming, tool calling

*These aren't the only good choices - pick tools with clear conventions and good docs*

---

## Refactoring with AI Agents

Big refactors become practical with AI agents as copilots:

**Systematic Code Changes**
- Large-scale transformations (API updates, class → function components)
- Precision across many files simultaneously

**Legacy Cleanup & Modernization**
- Update dependencies, coding patterns, error handling
- Bring older codebases up to modern standards

**Database Migrations**
- Generate and execute complex data migration scripts
- Schema changes with data integrity checks

**Why agents excel here:**
- They don't get bored or make typos on repetitive changes
- Can hold the full context of what needs to change
- Review the diff, not every line of code

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

1. **Context is everything** - CLAUDE.md, skills, and docs folders make or break agent effectiveness
2. **Get out of the loop** - Set up agents to iterate autonomously, review at checkpoints
3. **Use multiple agents** - Switch when stuck, use different agents for different tasks
4. **Stay in flow** - Voice input, visual markup, minimize context switching
5. **Organize for agents** - Monorepos, clear structure, type-safe boundaries

---

## Live Demo: Building a Todo App

**Stack:** Next.js + Convex + Claude Code

**What we'll cover:**
1. Set up CLAUDE.md and docs/ structure
2. Plan mode → Agent mode workflow
3. Context7 MCP for docs lookup
4. Looping until build passes
5. Multi-agent code review
6. Cursor agent view - parallel threads
7. Conductor.build - isolated git workspaces

---

## Resources

**Agents & Tools:**
- [Claude Code Docs](https://docs.anthropic.com/claude-code) - Official documentation
- [Cursor](https://cursor.com) - AI-native IDE
- [Warp](https://warp.dev) - AI-powered terminal
- [Codex](https://openai.com/codex) - OpenAI's coding agent

**MCP & Integrations:**
- [MCP Registry](https://github.com/modelcontextprotocol) - Official MCP servers
- [Context7](https://context7.com) - Documentation search MCP
- [Browser MCP](https://browsermcp.io) - Browser automation
- [Chrome DevTools MCP](https://developer.chrome.com/blog/chrome-devtools-mcp) - Google's official MCP

**Plugins & Extensions:**
- [claudecodeplugins.io](https://claudecodeplugins.io) - Plugin marketplace
- [CodeRabbit](https://coderabbit.ai) - AI code reviews

**Productivity:**
- [Wispr Flow](https://wisprflow.ai) - Speech-to-text for developers
- [Conductor.build](https://conductor.build) - Parallel agent workspaces
- [Shottr](https://shottr.cc) - Screenshot markup tool

**My Resources:**
- [github.com/hypersocialinc/claude-code-agents](https://github.com/hypersocialinc/claude-code-agents) - Custom subagents

---

## Q&A & Thank You!

Questions?

**Selcuk Atli**
selcuk.atli@gmail.com
