class SliderPage {
  constructor(page) {
    this.page = page;
    this.slider = page.locator('input[type="range"]');
    this.sliderOutput = page.locator("#sliderValue");
  }

  async goto() {
    await this.page.goto("https://demoqa.com/slider", {
      waitUntil: "domcontentloaded",
    });
  }

  async setSliderValue(value) {
    await this.slider.waitFor({ state: "visible", timeout: 5000 });
    await this.slider.fill(value);
  }

  async getSliderValue() {
    return await this.sliderOutput.inputValue();
  }
}

module.exports = { SliderPage };
