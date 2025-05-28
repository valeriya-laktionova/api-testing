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
    const tooltipId = this.tooltipMap[selector];
    const tooltip = this.page.locator(`${tooltipId} .tooltip-inner`);

    await this.page.locator(selector).scrollIntoViewIfNeeded();
    await this.page.hover(selector, { force: true });
    await this.page.waitForTimeout(1000); 

    const isVisible = await tooltip.isVisible().catch(() => false);
    if (!isVisible) {
      console.warn(`❌ Tooltip "${tooltipId}" не виден`);
      return false;
    }

    const text = await tooltip.textContent().catch(() => "");
    const trimmed = text?.trim();
    const result = trimmed === expectedText;

    console.log(
      `🧪 Tooltip "${tooltipId}" = "${trimmed}" | expected: "${expectedText}" => ${result}`
    );
    return result;
  }
}
