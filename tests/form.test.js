const { test, expect } = require("@playwright/test");
const { FormPage } = require("../pages/FormPage");

test.describe("Automation Practice Form", () => {
  test("should fill mandatory fields and submit form successfully", async ({
    page,
  }) => {
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.fillMandatoryFields();
    await formPage.submitForm();

    // Проверка
    await expect(formPage.modalTitle).toBeVisible();
    const modalText = await formPage.getModalText();
    expect(modalText).toContain("Thanks for submitting the form");
  });
});