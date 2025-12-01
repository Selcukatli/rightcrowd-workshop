# AI Native Development Workshop

## Project Overview

This is a workshop project teaching AI-native development practices to engineers. The workshop covers multi-agent systems, context engineering, and building applications with Claude Code.

## Workshop Focus Areas

- **AI Development Spectrum**: Understanding vibe coding vs code assist vs AI-native development
- **Context Engineering**: The core skill for effective AI-assisted development
- **Multi-Agent Workflows**: Orchestrating parallel agents for complex tasks
- **MCP Servers**: Extending AI capabilities with external integrations

## Tech Stack for Demo

- **Frontend**: Next.js
- **Backend**: Convex
- **AI Tooling**: Claude Code CLI
- **MCP**: Context7 for documentation lookup

## Key Concepts to Demonstrate

### Plan Mode vs Agent Mode
- Use **Plan Mode** for complex or risky changes - think first, execute later
- Use **Agent Mode** for well-defined tasks with autonomous execution
- When unsure, start with Plan Mode

### Context Engineering Principles
- Input quality determines output quality
- Structure rules files well
- Provide relevant examples
- Reference existing patterns in the codebase
- Manage token limits by prioritizing relevant information

### Model Selection
- **Opus 4.5**: Deep reasoning, complex architecture decisions
- **Fast models**: Quick refactors, small fixes
- **Gemini 3.0**: Visual/UI understanding
- Match the model to the task at hand

## Workshop Best Practices

1. Break down tasks effectively
2. Set clear boundaries for each agent
3. Review at checkpoints, not just at the end
4. Stay in control - automation serves you
5. Use @mentions strategically to manage context

## File Structure

```
.claude/
  commands/     # Custom slash commands (/review, /test, /deploy)
  mcp.json      # MCP server configuration
  rules.md      # Project-specific rules (alternative to CLAUDE.md)
```

## MCP Servers Used

- **Context7**: Real-time documentation lookup during coding
- Additional servers can be configured in `.claude/mcp.json`

## Demo Flow

1. Initialize Next.js + Convex project
2. Set up context rules
3. Plan mode: outline app structure
4. Agent mode: implement features
5. Use Context7 MCP for docs lookup
6. Code review workflow
7. Iterate based on feedback
