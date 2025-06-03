class RadioButtonPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://demoqa.com/radio-button", {
      waitUntil: "domcontentloaded",
    });
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
