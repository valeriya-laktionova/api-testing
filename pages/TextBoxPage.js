class TextBoxPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.fullNameInput = page.locator("#userName");
    this.emailInput = page.locator("#userEmail");
    this.currentAddressInput = page.locator("#currentAddress");
    this.permanentAddressInput = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");

    this.outputName = page.locator("#output #name");
    this.outputEmail = page.locator("#output #email");
    this.outputCurrentAddress = page.locator("#output p", {
      hasText: "Current Address",
    });
    this.outputPermanentAddress = page.locator("#output p", {
      hasText: "Permananet Address",
    });
  }

  async goto() {
    await this.page.goto("https://demoqa.com/text-box", {
      waitUntil: "domcontentloaded",
    });
  }

  async fillForm() {
    await this.fullNameInput.fill("Valeria Example");
    await this.emailInput.fill("valeria@example.com");
    await this.currentAddressInput.fill("123 Main St, City");
    await this.permanentAddressInput.fill("456 Side Ave, Region");
  }

  async submitForm() {
    await this.submitButton.click();
  }
}

module.exports = { TextBoxPage };
