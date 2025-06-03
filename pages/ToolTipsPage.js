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

    await element.scrollIntoViewIfNeeded();
    await element.waitFor({ state: "visible", timeout: 5000 });
    await element.hover();

    const tooltip = this.page.locator(".tooltip-inner");
    await this.page.waitForSelector(".tooltip-inner", { timeout: 3000 });

    const actualText = await tooltip.textContent();
    const trimmed = actualText?.trim();

    if (trimmed !== expectedText) {
      await this.page.screenshot({ path: `mismatch-${elementName}.png`, fullPage: true });
      return false;
    }

    return true;
  }
}

module.exports = { TooltipsPage };
