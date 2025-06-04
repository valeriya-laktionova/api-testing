const { BasePage } = require("./BasePage");
//TODO move locators to the constructor
class RadioButtonPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async goto() {
    await this.open("https://demoqa.com/radio-button");
  }

  async selectRadio(label) {
    const radioButton = this.page.locator(`label:has-text("${label}")`);
    await radioButton.waitFor({ state: "visible", timeout: 10000 });
    await radioButton.click();
  }

  async getResultText() {
    const result = await this.page.locator(".text-success").textContent();
    return result.trim();
  }
}

module.exports = { RadioButtonPage };
