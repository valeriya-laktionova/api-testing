const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { launchPage } = require("../../utils/setupPage");

let page;
let browser;

Given("I open the date picker page", async () => {
  ({ browser, page } = await launchPage());
  await page.goto("https://demoqa.com/date-picker");
});

When("I select the date {string}", async function (date) {
  const input = page.locator("#datePickerMonthYearInput");
  await input.click();
  await input.fill(date);
  await input.press("Enter");
});

Then("the selected date should be {string}", async function (expectedDate) {
  const input = page.locator("#datePickerMonthYearInput");
  const value = await input.inputValue();
  expect(value).toBe(expectedDate);
  await browser.close();
});
