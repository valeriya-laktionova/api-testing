const { faker } = require("@faker-js/faker");

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
    this.outputBox = page.locator("#output");
    this.outputName = page.locator("#name");
    this.outputEmail = page.locator("#email");
    this.outputCurrentAddress = page.locator("p#currentAddress");
    this.outputPermanentAddress = page.locator("p#permanentAddress");
  }

  async goto() {
    await this.page.goto("https://demoqa.com/text-box", {
      waitUntil: "domcontentloaded",
    });
  }

  async fillFormWithRandomData() {
    this.data = {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      currentAddress: faker.location.streetAddress(),
      permanentAddress: faker.location.secondaryAddress(),
    };

    await this.fullNameInput.fill(this.data.fullName);
    await this.emailInput.fill(this.data.email);
    await this.currentAddressInput.fill(this.data.currentAddress);
    await this.permanentAddressInput.fill(this.data.permanentAddress);
  }

  async submitForm() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async getOutputData() {
    return {
      fullName: await this.outputName.textContent(),
      email: await this.outputEmail.textContent(),
      currentAddress: await this.outputCurrentAddress.textContent(),
      permanentAddress: await this.outputPermanentAddress.textContent(),
    };
  }
}

module.exports = { TextBoxPage };
