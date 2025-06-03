const { BasePage } = require('./BasePage');

class DatePickerPage extends BasePage {
  constructor(page) {
    super(page);
    this.dateInput = page.locator("#datePickerMonthYearInput");
  }

  async goto() {
    await this.open("https://demoqa.com/date-picker");
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
