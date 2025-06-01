const { Given, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { TooltipsPage } = require("../../pages/ToolTipsPage");
const { blockAds } = require("../../utils/adblock");

let browser, page, tooltipsPage;

Given("I open the tool tips page", async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  tooltipsPage = new TooltipsPage(page);
  await tooltipsPage.goto( { waitUntil: "domcontentloaded" });
});

Then(
  "the tooltip for {string} should be {string}",
  { timeout: 15000 },
  async (selector, expectedText) => {
    const result = await tooltipsPage.hoverAndCheckTooltip(
      selector,
      expectedText
    );
    expect(result).toBe(true);
  }
);

After(async () => {
  if (browser) {
    await browser.close();
  }
});
