class CheckboxPage {
  constructor(page) {
    this.page = page;
    this.expandAllButton = page.locator('button[title="Expand all"]');
  }

  async expandAll() {
    await this.expandAllButton.waitFor({ state: "attached", timeout: 5000 });
    await this.expandAllButton.click();
  }

  async selectCheckbox(label) {
    const labelLocator = this.page.locator(`.rct-node >> text=${label}`);
    await labelLocator.waitFor({ state: "visible", timeout: 10000 });
    await labelLocator.click();
  }

  async isCheckboxChecked(label) {
    const node = this.page.locator(`.rct-node >> text=${label}`);
    const checkIcon = node.locator("..").locator(".rct-icon-check");
    return await checkIcon.isVisible();
  }
}

module.exports = CheckboxPage;