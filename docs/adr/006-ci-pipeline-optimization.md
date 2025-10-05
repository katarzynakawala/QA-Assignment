# ADR-006: CI Pipelin2. **Minim3. **Strateg4. **No Br5. **Comprehensive Reporting**
   - Allure reports for professional presentation
   - Playwright reports for E2E debugging
   - GitHub Actions artifacts for result access

## Workflow Execution Details

### On Push to Any Branch (`push: branches: ['*']`)
**Purpose**: Immediate feedback during development
**Execution**: Complete test suite
- ✅ Unit tests (50) - Component and service validation
- ✅ Contract tests (7) - Live SWAPI API testing  
- ✅ E2E tests (2) - Critical user journey validation
- 📊 Allure report generation and artifact upload
- 🎭 Playwright report generation and artifact upload

### On Pull Request to Main (`pull_request: branches: [main]`)
**Purpose**: Gate-keeping for main branch quality
**Execution**: Identical complete test suite
- ✅ Same comprehensive testing as push events
- 🔒 Prevents broken code from reaching main branch
- 📋 Provides merge confidence with full validation
- 🚀 Ensures production readiness

**Rationale**: Both triggers run the same comprehensive suite because:
- Development branches need immediate feedback (push)
- Main branch protection requires full validation (PR)
- Consistent execution reduces "works on my machine" issues
- Complete coverage at both stages catches issues earlyr Caching**
   - Simple, predictable builds
   - Avoid caching complexity and potential issues
   - Fresh browser installation ensures consistency

5. **Comprehensive Reporting**t Execution**
   - Unit tests (50) - Fast execution, comprehensive coverage
   - Contract tests (7) - Live API validation
   - E2E tests (2) - Critical business flows only
   - Parallel execution where possible

4. **No Browser Caching**ser Installation**
   - Install only Chromium for Playwright tests
   - Use `npx playwright install chromium --with-deps`
   - Avoid downloading unused Firefox and WebKit browsers

3. **Strategic Test Execution**mization Strategy

## Status
Accepted

## Context
GitHub Actions CI pipeline needs to balance comprehensive testing coverage with execution speed. Interview assignments require demonstrating testing skills without excessive build times that could frustrate evaluators or block development workflow.

## Decision
We will optimize CI pipeline with targeted browser installation strategy:

1. **Trigger Strategy**
   - **All branch pushes (`push: branches: ['*']`)** - Complete test suite execution
     - Unit tests (50) + Contract tests (7) + E2E tests (2)
     - Allure and Playwright reporting
     - Provides immediate feedback during development
   - **Pull requests to main (`pull_request: branches: [main]`)** - Same complete suite
     - Validates changes before merge to main branch
     - Ensures production readiness
     - Prevents broken code from reaching main

2. **Minimal Browser Installation**
   - Install only Chromium for Playwright tests
   - Use `npx playwright install chromium --with-deps`
   - Avoid downloading unused Firefox and WebKit browsers

2. **Strategic Test Execution**
   - Unit tests (50) - Fast execution, comprehensive coverage
   - Contract tests (7) - Live API validation
   - E2E tests (2) - Critical business flows only
   - Parallel execution where possible

3. **No Browser Caching**
   - Simple, predictable builds
   - Avoid caching complexity and potential issues
   - Fresh browser installation ensures consistency

4. **Comprehensive Reporting**
   - Allure reports for professional presentation
   - Playwright reports for E2E debugging
   - GitHub Actions artifacts for result access

## Consequences

### Positive
- **Faster builds** - Only essential browser installation
- **Predictable execution** - No caching dependencies or failures
- **Complete coverage** - All test pyramid levels validated
- **Professional output** - Rich reporting for stakeholder review
- **Simple maintenance** - Straightforward CI configuration

### Negative
- **Browser download time** - Chromium installation on each run
- **No cross-browser testing** - Limited to Chromium behavior
- **Network dependency** - Requires stable internet for browser download

## Alternatives Considered
- **All browser installation**: Rejected due to unnecessary overhead
- **System browser usage**: Rejected due to Playwright compatibility issues
- **Browser caching**: Rejected due to complexity and potential cache issues
- **E2E test removal**: Rejected due to assignment requirements
