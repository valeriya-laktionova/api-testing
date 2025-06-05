const { BasePage } = require("./BasePage");

class RadioButtonPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.radioLabel = (label) => page.locator(`label:has-text("${label}")`);
    this.resultText = page.locator(".text-success");
  }

  async goto() {
    await this.open("https://demoqa.com/radio-button");
  }

  async selectRadio(label) {
    const radioButton = this.radioLabel(label);
    await radioButton.waitFor({ state: "visible", timeout: 10000 });
    await radioButton.click();
  }

  async getResultText() {
    return (await this.resultText.textContent()).trim();
  }
}

module.exports = { RadioButtonPage };
