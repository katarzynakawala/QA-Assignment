# ADR-005: TypeScript-ESLint Migration

## Status
Accepted

## Context
Modern TypeScript projects should use TypeScript-ESLint for better performance, more rules, and active maintenance. Code quality tooling is essential for maintainable test automation.

## Decision
We will migrate from TSLint to TypeScript-ESLint with modern configuration:

1. **ESLint v9 with Flat Config**
   - Modern `eslint.config.js` format
   - TypeScript-aware rules and parsing
   - Better performance and configuration flexibility

2. **Test Environment Support**
   - Proper globals configuration for Jasmine and Playwright
   - Test-specific rule adjustments
   - Framework-aware linting

3. **Development-Only Enforcement**
   - Available for local development use
   - Not enforced in CI to avoid changing the code of the task too much, would enforce in the real project to keep quality standard

4. **Comprehensive Rule Set**
   - TypeScript-specific best practices
   - Code style consistency
   - Potential bug detection

## Consequences

### Positive
- **Modern tooling** - Active maintenance and new features
- **Better TypeScript support** - Native TypeScript understanding
- **Future-proof** - Aligned with current JavaScript/TypeScript ecosystem

### Negative
- **Migration effort** - Configuration changes required
- **Rule differences** - Some TSLint rules may behave differently
- **Learning curve** - Team familiarity with new rule names and config format

## Alternatives Considered
- **No linting**: Rejected due to code quality importance
- **Alternative linters**: Rejected due to ecosystem standardization on ESLint
