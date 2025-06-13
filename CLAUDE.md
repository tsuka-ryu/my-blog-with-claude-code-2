# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a technical blog project built as a **monorepo using TurboRepo and pnpm**. The blog targets Japanese-speaking developers with planned English support, featuring a terminal/console-style design theme.

**Current Status**: Phase 1 - Project Foundation (basic monorepo structure established)

## Package Manager & Build System

- **Package Manager**: pnpm 10.12.1
- **Monorepo Tool**: TurboRepo 2.5.4
- **Target Framework**: Next.js 14+ with App Router (planned)

### Common Commands

Currently available:
```bash
# Check pnpm version
pnpm --version

# Install dependencies (when packages are added)
pnpm install

# Future TurboRepo commands (once packages are created):
# pnpm turbo build    # Build all packages
# pnpm turbo lint     # Lint all packages  
# pnpm turbo dev      # Start development servers
```

**Note**: Most development commands are not yet available as the actual application packages haven't been created yet.

## Architecture & Structure

### Current Structure
```
my-blog-with-claude-code/
├── package.json           # Root package configuration
├── turbo.json            # TurboRepo pipeline configuration
├── pnpm-workspace.yaml   # Workspace package definitions
├── TODO.md               # Comprehensive 8-phase development roadmap
└── memo/
    └── setup-decisions.md # Setup decision documentation
```

### Planned Structure (Phase 1.2)
```
my-blog-with-claude-code/
├── apps/
│   └── blog/             # Next.js 14+ main blog application
├── packages/
│   ├── ui/               # Shared UI components
│   ├── utils/            # Shared utilities
│   ├── config/           # Shared configuration & type definitions
│   └── docs/             # Documentation package
└── tools/                # Development tools
```

## Development Workflow

### Pipeline Configuration (turbo.json)
- **build**: Dependent builds with Next.js output caching (`.next/**` excluding cache)
- **lint**: Cascading lint execution across packages
- **dev**: Non-cached persistent development servers
- **globalDependencies**: Environment files (`**/.env.*local`)

### Next Immediate Tasks (Phase 1.1)
1. TypeScript configuration (strict mode)
2. Linting setup (oxlint + ESLint + Prettier)
3. Git hooks (lefthook + commitlint)
4. Create actual package directories

## Key Features (Planned)

### Design System
- Terminal/console-style theme with dark mode support
- Tailwind CSS with custom color palette
- Monospace font (等幅フォント)
- Responsive design with custom breakpoints

### Content Management
- MDX-based content with syntax highlighting
- Automatic table of contents generation
- Tag and category system
- Search functionality using fuse.js
- Multilingual support (Japanese/English)

### Technical Features
- SEO optimization with automatic OGP generation
- Accessibility compliance (Web Content Accessibility Guidelines AA)
- Comments system integration
- Performance optimization with Next.js 14 features

## Documentation References

- **TODO.md**: Complete 8-phase development roadmap with 200+ specific tasks
- **memo/setup-decisions.md**: Detailed setup decisions with rationale
- **TECHNICAL_BLOG_REQUIREMENTS.md**: Archived (consolidated into TODO.md)

## Development Notes

- The project uses **strict development practices** with comprehensive linting, formatting, and commit message conventions
- All major decisions are documented in the memo/ directory
- The TODO.md file serves as the primary development roadmap and should be consulted for task prioritization
- **Before committing**: Always update completed TODOs in TODO.md by marking them as `[x]` to track progress
- Package structure follows modern monorepo best practices with clear separation of concerns