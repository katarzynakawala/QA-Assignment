# ADR-001: Testing Pyramid Approach

## Status
Accepted

## Context
The FedEx QA assignment requires comprehensive test automation with maintainability and scalability in mind. We need to decide on the overall testing strategy that balances thorough coverage with execution speed and maintenance overhead.

## Decision
We will implement a testing pyramid approach with three distinct layers:

1. **Unit Tests (Foundation)** - 39 tests
   - Component logic testing using Jasmine/Karma
   - Service and utility function testing
   - Fast execution, isolated dependencies
   - High coverage of business logic

2. **Contract Tests (Integration)** - 7 tests  
   - Live API testing against SWAPI endpoints
   - Validation of external service contracts
   - Ensures API compatibility and data structure integrity

3. **E2E Tests (UI)** - 3 critical scenarios
   - Playwright-based browser automation
   - Focus on critical business flows only
   - Complete user journey validation

## Consequences

### Positive
- **Fast feedback loop** - Unit tests provide immediate developer feedback
- **Comprehensive coverage** - Each layer tests different aspects effectively
- **Cost-effective** - Fewer expensive UI tests, more efficient unit tests
- **Maintainable** - Clear separation of concerns and test responsibilities
- **Scalable** - Easy to add tests at appropriate levels

### Negative
- **Complexity** - Multiple testing frameworks and tooling
- **Learning curve** - Team needs familiarity with different test types
- **Coordination** - Must ensure proper coverage across all layers

## Alternatives Considered
- **E2E-heavy approach**: Rejected due to slow execution and high maintenance
- **Unit-only approach**: Rejected due to lack of integration coverage