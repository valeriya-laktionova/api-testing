export class TooltipsPage {
  constructor(page) {
    this.page = page;

    this.tooltipMap = {
      "#toolTipButton": "#buttonToolTip",
      "#toolTipTextField": "#textFieldToolTip",
      "#texToolTopContainer a:nth-child(1)": "#contraryTexToolTip",
      "#texToolTopContainer a:nth-child(2)": "#sectionToolTip",
    };
  }

  async goto() {
    await this.page.goto("https://demoqa.com/tool-tips");
  }

  async hoverAndCheckTooltip(selector, expectedText) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
    await this.page.hover(selector, { force: true });

    const tooltipId = this.tooltipMap[selector];
    const tooltip = this.page.locator(`${tooltipId} .tooltip-inner`);

    await tooltip.waitFor({ state: "visible", timeout: 15000 });

    const text = await tooltip.textContent();
    return text?.trim() === expectedText;
  }
}
