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
- `npm run test:unit` - Run unit tests (headless)
- `npm run test:contract` - Run contract tests against live SWAPI API
- `npm run test:allure` - Run all tests with Allure reporting
- `npm run test:allure:report` - Run tests, generate report, and open it

### CI/CD Pipeline
The GitHub Actions workflow automatically runs the complete test suite with Allure reporting on:
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
