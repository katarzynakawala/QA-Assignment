# Introduction

Hi there! 👋 Welcome to the FedEx QA assignment. We're thrilled to have you here
and can't wait to see what you come up with for the assignment. Make sure to
carefully read the requirements, and if you need any assistance, feel free to
reach out to us at any time. We're here to help!

### Run the app
- Run `npm i` to install all the project dependencies.
- Run `npm start` to start the dev server.

### Testing Commands
- `npm test` - Run tests interactively in watch mode
- `npm run test:unit` - Run unit tests only (headless)
- `npm run test:contract` - Run contract tests only (live SWAPI API)
- `npm run test:all` - **Run complete test suite (unit + contract + E2E)**
- `npm run test:allure` - Run complete test suite with Allure reporting
- `npm run test:allure:report` - Run tests, generate report, and open it

### End-to-End Testing with Playwright
**Focused on critical business flows with Page Object Model:**
- `npm run e2e` - Run E2E tests (2 critical scenarios, headless)
- `npm run e2e:headed` - Run E2E tests with browser UI
- `npm run e2e:debug` - Run E2E tests in debug mode
- `npm run e2e:report` - View last E2E test report

**Features:**
- **Modern Playwright locators** (`getByRole`, `getByText`) for better accessibility and maintainability
- Page Object Model (POM) architecture for maintainability
- Automatic screenshots and videos on test failures
- Test isolation with browser state cleanup
- beforeEach/afterEach hooks for proper setup and teardown

### Code Quality & Linting
**Modern TypeScript-ESLint with flat config (optional):**
- `npm run lint` - Check code quality and style issues
- `npm run lint:fix` - Automatically fix linting issues where possible

**Features:**
- **TypeScript-ESLint** - Modern replacement for deprecated TSLint
- **ESLint v9** with flat configuration format
- **Test environment support** - Proper globals for Jasmine and Playwright
- **TypeScript-aware rules** - Better type checking and code quality
- **Not enforced in CI** - Available for development use without blocking merges [just for the sake of this interview task not to change most of the app code]

### CI/CD Pipeline
The GitHub Actions workflow automatically runs the complete test suite including:
- **Unit Tests (50)** - Component and service logic validation
- **Contract Tests (7)** - Live SWAPI API validation  
- **E2E Tests (2)** - Critical business flow validation
- **Allure Reporting** - Professional test visualization
- **Playwright Reports** - E2E test execution details

Triggers automatically on:
- **All branch pushes** - Provides immediate feedback during development
- **Pull requests** - Validates changes before merge
- **Main branch** - Ensures production readiness

### Allure Test Reports
This project includes comprehensive Allure reporting for enhanced test visualization:

- `npm run test:allure` - Run tests and generate Allure results
- `npm run allure:generate` - Generate HTML report from results
- `npm run allure:open` - Open the generated report in browser
- `npm run allure:serve` - Generate and serve report on the fly

The Allure reports provide:
- ✅ **Test Results Overview** - Pass/fail status with detailed metrics
- 📊 **Visual Dashboards** - Charts showing test distribution and trends
- 🔍 **Detailed Test Cases** - Step-by-step execution with screenshots/logs
- 📈 **Historical Trends** - Track test performance over time
- 🏷️ **Test Categories** - Organized by features and test types

### E2E Test Coverage
The Playwright end-to-end tests validate the **critical user journeys**:
- 🔍 **People Search Flow** - Complete search process for Star Wars characters  
- 🪐 **Planet Search Flow** - Complete search process for Star Wars planets

**Focus**: Business-critical paths only. Detailed functionality covered by unit and contract tests.

Reports are automatically generated in CI/CD pipeline and available as GitHub Actions artifacts.

# The Assessment
Feel free to showcase your impressive skills by thoroughly testing the app.
You have the freedom to automate test cases at **any** appropriate level. 
Be prepared though to motivate why you made the choices you made.

Detailed information is located in the [QA Engineer Assessment](./ASSESSMENT.MD)

### Important notes
- For e2e/integration testing, utilize **Playwright** with TypeScript as the automation tool.
- Maintainability and scalability are important.
- Design your test keeping the 'shift left' mindset.
- Undertaking this assignment obliges you to adhere to our confidentiality and data protection policies.s
  Disclosing any information to third parties (individuals, companies, or publicly on the internet) is strictly prohibited.

## Thank you
Thank you for taking our assignment.
We are looking forward to discuss your solution.
