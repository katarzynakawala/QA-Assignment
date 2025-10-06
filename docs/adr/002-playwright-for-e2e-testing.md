# ADR-002: Playwright for E2E Testing

## Status
Accepted

## Context
The assignment specifically requires Playwright with TypeScript for E2E/integration testing. We need to determine the optimal Playwright configuration and implementation approach for reliable, maintainable end-to-end tests.

## Decision
We will use Playwright with the following configuration:

2. **Single Browser Focus**
   - Chromium only for faster CI execution
   - Cross-browser testing not required for this assignment scope

3. **Test Isolation**
   - Browser context cleanup between tests
   - Independent test data and state management
   - Proper beforeEach/afterEach hooks

4. **Failure Handling**
   - Automatic screenshots on failure
   - Video recording for debugging
   - Detailed error reporting

## Consequences

### Positive
- **Reliable tests** - Modern locators reduce flakiness
- **Fast execution** - Single browser reduces CI time
- **Better debugging** - Rich failure artifacts
- **Accessibility focus** - Locators improve app accessibility testing
- **TypeScript support** - Strong typing and IDE support

### Negative
- **Limited browser coverage** - Only testing Chromium behavior but no requirements about the browser in the task
- **Tool dependency** - Tied to Playwright ecosystem