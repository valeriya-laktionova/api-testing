const { BasePage } = require('./BasePage');
//TODO move locators to the constructor
class DatePickerPage extends BasePage {
  constructor(page) {
    super(page);
    this.dateInput = page.locator("#datePickerMonthYearInput");
  }

  async goto() {
    await this.open("https://demoqa.com/date-picker");
    await this.dateInput.waitFor({ state: "visible" });
  }
//TODO rewrite selectDate with dropowns
  async selectDate(dateString) {
    await this.dateInput.click();
    await this.dateInput.fill("");
    await this.dateInput.type(dateString);
    await this.dateInput.press("Enter");
    await this.page.waitForSelector(`#datePickerMonthYearInput[value="${dateString}"]`, {
      state: "attached",
      timeout: 3000
    });
  }

  async getSelectedDate() {
    return await this.dateInput.inputValue();
  }
}

module.exports = { DatePickerPage };
