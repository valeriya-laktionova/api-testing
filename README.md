
# Test Automation Framework
## AutoTest

This project is designed for testing the [https://demoqa.com] web application. It demonstrates automated testing using Playwright/Cucumber.

---

##  Prerequisites

- Node.js (v22 or higher)
- npm or yarn
- Chrome and Firefox browsers installed

---

##  Installation

Clone the repository:

```
git clone https://github.com/AronAriel/AutoTest
cd AutoTest
```

Install dependencies:

```
npm install
```

---

## 🧪 How to Launch Tests and Reports

### Run cucumber tests:

```
npm test
```

### Run cucumber report:

```
npm report
```


### Run playwright tests:

```
npm run test:playwright
```

### Run playwright report:

```
npm run report:playwright
```

### Run with custom flags:

```
npx cross-env VIEPORT_WIDTH=1920 VIEPORT_HEIGHT=1080 npx playwright test --workers=2 --headed --grep "smoke" --project='chromium'
```

#### Where:

- `--workers=2`: Launch in parallel with 2 workers (default is 1).
- `--headed`: Launches browser visually (headless by default).
- `--grep "smoke"`: Run only tests marked with the keyword "smoke".
- `--project='chromium'`: Run tests in Chromium (by default runs in both Chromium and Firefox).
- `cross-env VIEPORT_WIDTH=1920 VIEPORT_HEIGHT=1080`: Sets custom viewport size (default: 1280x720).

---

## 📁 Project Structure

- `.github/workflows` - CI/CD file
- `features/step-definition` - cucumber tests
- `pages` - POM tests
- `support` - hooks
- `test/fixtures` - POM tests 
- `utils` - adblock and setup


---

## 🛠 Technologies

- Playwright
- GitHub Actions
- Cucumber
- Fakerator

---

## 🔁 CI/CD

UI tests run daily from the following branches:
- `main`
- `master`
- `ui-tests`

Also runs on every pull request to these branches.

---

## 📊 Test Reports

After each test run, a detailed report is generated.

- Local report: `playwright-report/`
- GitHub Actions: HTML report uploaded as an artifact
