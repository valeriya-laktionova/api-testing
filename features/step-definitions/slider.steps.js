const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");

let browser, page;

Given("I open the slider page", async () => {
  ({ browser, page } = await launchPage());
  await page.goto("https://demoqa.com/slider");
});

When("I move the slider to {string}", { timeout: 10000 }, async (value) => {
  await page.locator('input[type="range"]').fill(value);
});

Then(
  "the slider should show value {string}",
  { timeout: 10000 },
  async (expectedValue) => {
    const value = await page.locator("#sliderValue").inputValue();
    expect(value).toBe(expectedValue);
    await browser.close();
  }
);
