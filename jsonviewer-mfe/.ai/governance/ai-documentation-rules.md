# AI Documentation Rules

## Rules

### Location of AI-Generated Documents
- **All AI-generated documentation MUST be stored in `.ai/`** directory
- **Never commit AI-generated documents to root or `docs/`** directories
- **Best practice: Store in `.ai/features/`** for feature-specific documentation

### Directory Structure
```
.ai/
├── features/           # Feature-specific documentation (RECOMMENDED)
│   ├── feature-name/
│   │   ├── README.md
│   │   ├── architecture.md
│   │   ├── testing-guide.md
│   │   └── manual-testing-guide.md
├── memory/            # Session memory and design decisions
├── workflows/         # Workflow scripts
└── governance/        # Project rules and standards
```

### What Belongs in .ai/features/
- Manual testing guides
- Architecture documentation
- Implementation plans
- Design decisions
- Testing strategies
- Development guides
- Feature specifications
- Code review reports

### What Does NOT Belong in .ai/
- Production code (belongs in `src/`)
- Test code (belongs in `src/test/`)
- Build configurations (belongs in root: `build.gradle`, etc.)
- README for human users (belongs in root)
- API documentation meant for external users

### Rationale
1. **Separation of concerns**: AI artifacts separate from production docs
2. **Gitignore compatibility**: `.ai/` is in global gitignore
3. **Team clarity**: Developers know where to find AI-generated context
4. **Avoid clutter**: Keeps root directory clean
5. **Version control**: AI docs can be versioned separately if needed

## Examples

### ✅ Correct
```
.ai/features/purpose-code-validation/local-testing-guide.md
.ai/features/purpose-code-validation/manual-testing-guide.md
.ai/features/purpose-code-api/implementation-summary.md
```

### ❌ Incorrect
```
LOCAL-TESTING-GUIDE.md                    # Root directory
docs/testing/manual-testing-guide.md      # Under docs/ (ignored by git)
README-TESTING.md                         # Root directory
```

## Enforcement
- AI assistants MUST follow these rules when creating documentation
- Code reviewers SHOULD flag violations
- CI/CD MAY add checks to prevent AI docs in wrong locations
