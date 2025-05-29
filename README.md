How to Run Automated Tests
Clone the repository:

bash
Копировать код
git clone https://github.com/AronAriel/AutoTest.git
cd AutoTest
Install dependencies:

bash
Копировать код
npm install
Run tests:

In headed mode (browser window visible):

bash
Копировать код
npx playwright test --headed
In headless mode (default, no browser window):

bash
Копировать код
npx playwright test
Report:

Test reports are saved in the /playwright-report/ directory. To open the last report:

bash
Копировать код
npx playwright show-report
Project Description
This project uses Playwright for UI test automation.

Ad blocking is implemented manually in adblock.js (without any external frameworks).

All test files are located in the /tests folder.

The configuration supports multiple browsers and screen sizes.

Note: Firefox may sometimes fail to trigger tooltips on hover due to inconsistent event handling. In Chromium-based browsers, all tooltips behave correctly.
