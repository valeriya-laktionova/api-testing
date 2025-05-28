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
    await this.page.goto("https://demoqa.com/tool-tips", {
      waitUntil: "domcontentloaded",
    });
  }

  async hoverAndCheckTooltip(selector, expectedText) {
    const tooltipId = this.tooltipMap[selector];
    const tooltipSelector = `${tooltipId} .tooltip-inner`;

    const element = this.page.locator(selector);

    await element.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300); 
    await element.hover({ force: true });
    await this.page.waitForTimeout(300); 
    await element.hover({ force: true }); 

    try {
      await this.page.waitForSelector(tooltipSelector, {
        timeout: 3000,
        state: "visible",
      });
    } catch {
      console.warn(`❌ Tooltip "${tooltipId}" not appiar`);
      return false;
    }

    const tooltip = this.page.locator(tooltipSelector);
    const text = await tooltip.textContent().catch(() => "");
    const trimmed = text?.trim();
    const result = trimmed === expectedText;

    console.log(
      `🧪 Tooltip "${tooltipId}" = "${trimmed}" | expected: "${expectedText}" => ${result}`
    );

    return result;
  }
}
