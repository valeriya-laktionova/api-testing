const { test, expect } = require("@playwright/test");
const { TextBoxPage } = require("../pages/TextBoxPage");
const { enableAdBlock } = require('../utils/adblock');

test.describe("Text Box form on ToolsQA", () => {
  /** @type {import('../pages/TextBoxPage').TextBoxPage} */
  let textBoxPage;

  test.beforeEach(async ({ page }) => {
    await enableAdBlock(page)
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();
  });

  test("Fill in text box form with fixed data and verify output", async () => {
    await textBoxPage.fillForm();
    await textBoxPage.submitForm();

    await expect(textBoxPage.outputName).toContainText("Valeria Example");
    await expect(textBoxPage.outputEmail).toContainText("valeria@example.com");
    await expect(textBoxPage.outputCurrentAddress).toContainText("123 Main St");
    await expect(textBoxPage.outputPermanentAddress).toContainText(
      "456 Side Ave"
    );
  });
});
