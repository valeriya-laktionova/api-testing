const { Given, When, Then, After } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { SelectMenuPage } = require("../../pages/SelectMenuPage.js");
const { blockAds } = require("../../utils/adblock");

let browser, page, selectMenu;

Given("I open the select menu page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  selectMenu = new SelectMenuPage(page);
  await selectMenu.goto({ waitUntil: "domcontentloaded" });
});

When("I select {string} from select value", async (option) => {
  await selectMenu.selectFromSelectValue(option);
});

When("I select {string} from select one", async (option) => {
  await selectMenu.selectFromSelectOne(option);
});

When("I select {string} from old select menu", async (option) => {
  await selectMenu.selectFromOldSelectMenuByText(option);
});

When(
  "I select multiple values from multi select dropdown: {string}",
  async (options) => {
    const opts = options.split(/,\s*/);
    await selectMenu.selectFromMultiSelectDropDown(opts);
  }
);

Then(
  "Selected value in field {string} should contain {string}",
  async (field, expectedValue) => {
    let actualValues;

    switch (field.toLowerCase()) {
      case "select value":
        actualValues = await selectMenu.getSelectedSelectValue();
        expect(actualValues?.trim()).toContain(expectedValue);
        break;
      case "select one":
        actualValues = await selectMenu.getSelectedSelectOneValue();
        expect(actualValues?.trim()).toContain(expectedValue);
        break;
      case "old select menu":
        actualValues = await selectMenu.getSelectedOldSelectMenuValue();
        expect(actualValues?.trim()).toContain(expectedValue);
        break;
      case "multi select dropdown":
        actualValues = await selectMenu.getSelectedMultiSelectDropDownValues();
        expect(actualValues).toEqual(expect.arrayContaining([expectedValue]));
        break;
      case "cars":
        actualValues = await selectMenu.getSelectedCarsValues();
        expect(actualValues).toEqual(expect.arrayContaining([expectedValue]));
        break;
      default:
        throw new Error(`Unknown field name: ${field}`);
    }
  }
);

After(async () => {
  if (browser) {
    await browser.close();
  }
});

