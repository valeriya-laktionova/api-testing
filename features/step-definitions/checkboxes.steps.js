const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");

let browser, page;

Given("I open the checkbox page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await page.goto("https://demoqa.com/checkbox", {
    waitUntil: "domcontentloaded",
  });
});

When("I expand all checkboxes", async () => {
  await page.click('button[title="Expand all"]');
});

When("I check the {string} checkbox", { timeout: 10000 }, async (label) => {
  const labelLocator = page.locator(`.rct-node >> text=${label}`);
  await labelLocator.waitFor({ state: "visible", timeout: 10000 });
  await labelLocator.click();
});

Then("{string} checkbox should be checked", async (label) => {
  const checked = await page
    .locator(`.rct-node >> text=${label}`)
    .locator("..")
    .locator(".rct-icon-check")
    .isVisible();
  expect(checked).toBe(true);
  await browser.close();
});
