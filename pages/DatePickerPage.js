class DatePickerPage {
  constructor(page) {
    this.page = page;
    this.dateInput = page.locator("#datePickerMonthYearInput");
  }

  async goto() {
    await this.page.goto("https://demoqa.com/date-picker", {
      waitUntil: "domcontentloaded",
    });
    await this.dateInput.waitFor({ state: "visible" });
  }

  async selectDate(dateString) {
    await this.dateInput.click();
    await this.dateInput.fill("");
    await this.dateInput.type(dateString);
    await this.dateInput.press("Enter");
    await this.page.waitForTimeout(500);
  }

  async getSelectedDate() {
    return await this.dateInput.inputValue();
  }
}

module.exports = { DatePickerPage };
