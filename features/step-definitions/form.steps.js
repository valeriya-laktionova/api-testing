const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { FormPage } = require("../../pages/FormPage");

let browser, page, formPage;

Given("I open the automation practice form page", async () => {
  ({ browser, page } = await launchPage());
  formPage = new FormPage(page);
  await formPage.goto();
});

When("I fill all mandatory fields", { timeout: 20000 }, async () => {
  await formPage.fillMandatoryFields();
});

When("I submit the form", { timeout: 10000 }, async () => {
  await formPage.submitForm();
});

Then(
  "I should see a modal with text {string}",
  { timeout: 10000 },
  async (expectedText) => {
    await expect(formPage.modalTitle).toBeVisible({ timeout: 10000 });
    const modalText = await formPage.getModalText();
    expect(modalText).toContain(expectedText);
    await browser.close();
  }
);
