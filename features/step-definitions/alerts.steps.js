const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { AlertsPage } = require("../../pages/AlertsPage");

let browser, page, alerts;

Given("I open the alerts page", async () => {
  ({ browser, page } = await launchPage());
  alerts = new AlertsPage(page);
  await alerts.goto();
});

When("I click the alert button", async () => {
  await alerts.clickAlertButton();
});

Then("I should see an alert with message {string}", async (message) => {
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe(message);
    await dialog.accept();
  });

  await page.waitForTimeout(500);
  await browser.close();
});

When("I click the timer alert button", async () => {
  await alerts.clickTimerAlertButton();
});

When("I click the confirm button", async () => {
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });
  await alerts.clickConfirmButton();
  await page.waitForTimeout(500);
});

Then("the confirm result should be {string}", async (result) => {
  const text = await alerts.getConfirmResult();
  expect(text).toContain(result);
  await browser.close();
});

When("I click the prompt button", async () => {
  page.once("dialog", async (dialog) => {
    await dialog.accept("Test User");
  });
  await alerts.clickPromptButton();
  await page.waitForTimeout(500);
});

Then("the prompt result should be {string}", async (result) => {
  const text = await alerts.getPromptResult();
  expect(text).toContain(result);
  await browser.close();
});

When("I accept the confirm alert", async () => {
 
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });
  
  await alerts.clickConfirmButton();
  await page.waitForTimeout(500);
});

When("I enter {string} in the prompt alert", async (input) => {
  
  page.once("dialog", async (dialog) => {
    await dialog.accept(input);
  });
  
  await alerts.clickPromptButton();
  await page.waitForTimeout(500);
});
