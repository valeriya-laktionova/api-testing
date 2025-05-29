const { test, expect } = require("@playwright/test");
const { TextBoxPage } = require("../pages/TextBoxPage");
const { blockAds } = require("../utils/adblock");

test.describe("Text Box form", () => {
  /** @type {TextBoxPage} */
  let textBox;

  test.beforeEach(async ({ page }) => {
    textBox = new TextBoxPage(page);
    await blockAds(page);
    await textBox.goto();
  });

  test("Submit filled form and verify output", async () => {
    await textBox.fillFormWithRandomData();
    await textBox.submitForm();

    const output = await textBox.getOutputData();
    const input = textBox.data;

    expect(output.fullName).toContain(input.fullName);
    expect(output.email).toContain(input.email);
    expect(output.currentAddress).toContain(input.currentAddress);
    expect(output.permanentAddress).toContain(input.permanentAddress);
  });
});
