const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");

let browser, page;

Given("I open the drag and drop page", async () => {
  ({ browser, page } = await launchPage({ headless: false }));
  await page.goto("https://demoqa.com/droppable");

  const simpleTab = page.locator("#droppableExample-tab-simple");
  if (await simpleTab.isVisible()) {
    await simpleTab.click();
  }
});

When("I drag the source element to the target", async () => {
  const container = page.locator("#droppableExample-tabpane-simple");
  const source = container.locator("#draggable");
  const target = container.locator("#droppable");

  await source.waitFor({ state: "visible" });
  await target.waitFor({ state: "visible" });

  await source.dragTo(target);
});

Then("the drop should be successful", async () => {
  const dropText = await page
    .locator("#droppableExample-tabpane-simple #droppable p")
    .textContent();

  expect(dropText.trim()).toBe("Dropped!");

  await browser.close();
});
