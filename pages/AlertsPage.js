const { BasePage } = require('./BasePage');

class AlertsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.alertButton = page.locator('#alertButton');
    this.timerAlertButton = page.locator('#timerAlertButton');
    this.confirmButton = page.locator('#confirmButton');
    this.promptButton = page.locator('#promtButton');
    this.confirmResult = page.locator('#confirmResult');
    this.promptResult = page.locator('#promptResult');
  }

  async goto() {
    await this.open('https://demoqa.com/alerts');
  }

  async clickAlertButton() {
    await this.alertButton.click();
  }

  async clickTimerAlertButton() {
    await this.timerAlertButton.click();
  }

  async clickConfirmButton() {
    await this.confirmButton.click();
  }

  async clickPromptButton() {
    await this.promptButton.click();
  }

  async getConfirmResult() {
    return this.confirmResult.textContent();
  }

  async getPromptResult() {
    return this.promptResult.textContent();
  }
}

module.exports = { AlertsPage };
