const { BasePage } = require("./BasePage");

class SelectMenuPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.selectValueDropdown = page.locator("#withOptGroup");
    this.selectValueMenu = page.locator(".css-26l3qy-menu");
    this.selectValueResult = page.locator("#withOptGroup [class*='singleValue']");

    this.selectOneDropdown = page.locator("#selectOne");
    this.selectOneMenu = page.locator(".css-26l3qy-menu");
    this.selectOneResult = page.locator("#selectOne [class*='singleValue']");

    this.oldSelectMenuDropdown = page.locator("#oldSelectMenu");

    this.multiSelectInput = page.locator("#react-select-4-input");
    this.multiSelectMenu = page.locator(".css-26l3qy-menu");
    this.multiSelectValues = page.locator(".css-1rhbuit-multiValue .css-12jo7m5");

    this.carsDropdown = page.locator("#cars");
  }

  async goto() {
    await this.open("https://demoqa.com/select-menu");
  }

  async selectFromSelectValue(optionText) {
    await this.selectValueDropdown.click();
    await this.selectValueMenu.locator(`text=${optionText}`).click();
  }

  async getSelectedSelectValue() {
    return (await this.selectValueResult.textContent()).trim();
  }

  async selectFromSelectOne(optionText) {
    await this.selectOneDropdown.click();
    await this.selectOneMenu.locator(`text=${optionText}`).click();
  }

  async getSelectedSelectOneValue() {
    return (await this.selectOneResult.textContent()).trim();
  }

  async selectFromOldSelectMenuByText(optionText) {
    const value = await this.oldSelectMenuDropdown
      .locator("option", { hasText: optionText })
      .evaluate((option) => option.value);

    if (!value) throw new Error(`Option with text "${optionText}" not found`);

    await this.oldSelectMenuDropdown.selectOption(value);
  }

  async getSelectedOldSelectMenuValue() {
    return (await this.oldSelectMenuDropdown.locator("option:checked").textContent()).trim();
  }

  async selectFromMultiSelectDropDown(options) {
    for (const option of options) {
      await this.multiSelectInput.fill(option);
      await this.multiSelectMenu.locator(`text=${option}`).click();
    }
  }

  async getSelectedMultiSelectDropDownValues() {
    return this.multiSelectValues.allTextContents();
  }

  async selectMultipleCars(options) {
    await this.carsDropdown.waitFor({ state: "visible" });

    for (const option of options) {
      await this.carsDropdown.locator(`option[value="${option}"]`).waitFor({ state: "visible" });
    }

    await this.carsDropdown.selectOption(options);
  }

  async getSelectedCarsValues() {
    return this.carsDropdown.locator("option:checked").allTextContents();
  }
}

module.exports = { SelectMenuPage };
