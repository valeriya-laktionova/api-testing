const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class TooltipsPage extends BasePage {
  constructor(page) {
    super(page);

    this.elementsMap = {
      button: "#toolTipButton",
      textField: "#toolTipTextField",
      contraryLink: "#texToolTopContainer a:nth-child(1)",
      sectionLink: "#texToolTopContainer a:nth-child(2)",
    };
  }

  async goto() {
    await this.open("https://demoqa.com/tool-tips");
  }

  async hoverAndCheckTooltip(elementName, expectedText) {
    const elementSelector = this.elementsMap[elementName];
    if (!elementSelector) {
      throw new Error(`Unknown element name: ${elementName}`);
    }

    const element = this.page.locator(elementSelector);
    const tooltip = this.page.locator(".tooltip-inner");

    await element.scrollIntoViewIfNeeded();
    await element.waitFor({ state: "visible", timeout: 5000 });
    await element.hover();

    await expect(tooltip).toBeVisible({ timeout: 3000 });

    const text = await tooltip.textContent();
    const trimmed = text?.trim();
    return trimmed === expectedText;
  }
}

module.exports = { TooltipsPage };
