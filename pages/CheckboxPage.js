const { BasePage } = require('./BasePage');

class CheckboxPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.expandAllButton = page.locator('button[title="Expand all"]');
    this.nodeByLabel = (label) => page.locator(`.rct-node >> text=${label}`);
    this.checkIconByLabel = (label) =>
      page.locator(`.rct-node >> text=${label}`).locator('..').locator('.rct-icon-check');
  }

  async goto() {
    await this.open('https://demoqa.com/checkbox');
  }

  async expandAll() {
    await this.expandAllButton.waitFor({ state: 'attached', timeout: 5000 });
    await this.expandAllButton.click();
  }

  async selectCheckbox(label) {
    const labelLocator = this.nodeByLabel(label);
    await labelLocator.waitFor({ state: 'visible', timeout: 10000 });
    await labelLocator.click();
  }

  async isCheckboxChecked(label) {
    const checkIcon = this.checkIconByLabel(label);
    return await checkIcon.isVisible();
  }
}

module.exports = { CheckboxPage };
