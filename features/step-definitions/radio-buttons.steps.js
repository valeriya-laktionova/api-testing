const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");

let browser, page;

Given("I open the radio button page", async () => {
  ({ browser, page } = await launchPage());
  await page.goto("https://demoqa.com/radio-button");
});

When("I select the {string} radio button", async (label) => {
  await page.locator(`label:has-text("${label}")`).click(); // заменили getByLabel
});

Then("the result should be {string}", async (expected) => {
  const result = await page.locator(".text-success").textContent();
  expect(result.trim()).toBe(expected);
  await browser.close();
});
