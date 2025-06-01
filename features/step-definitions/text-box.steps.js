const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { launchPage } = require("../../utils/setupPage");
const { TextBoxPage } = require("../../pages/TextBoxPage");
const { blockAds } = require("../../utils/adblock");

let browser, page, textBox;

Given("I open the text box page", { timeout: 20000 }, async () => {
  ({ browser, page } = await launchPage());
  await blockAds(page);
  textBox = new TextBoxPage(page);
  await textBox.goto({ waitUntil: "domcontentloaded" });
});

When(
  "I fill the text box form with random data",
  { timeout: 10000 },
  async () => {
    await textBox.fillFormWithRandomData();
  }
);

When("I submit the text box form", { timeout: 10000 }, async () => {
  await textBox.submitForm();
});

Then("the output should match the input data", { timeout: 10000 }, async () => {
  const output = await textBox.getOutputData();
  const input = textBox.data;
  expect(output.fullName).toContain(input.fullName);
  expect(output.email).toContain(input.email);
  expect(output.currentAddress).toContain(input.currentAddress);
  expect(output.permanentAddress).toContain(input.permanentAddress);
  await browser.close();
});
