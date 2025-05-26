const { faker } = require("@faker-js/faker");

class FormPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.genderMale = page.locator('label[for="gender-radio-1"]');
    this.mobile = page.locator("#userNumber");
    this.dobInput = page.locator("#dateOfBirthInput");
    this.subjectInput = page.locator("#subjectsInput");
    this.hobbiesCheckbox = page.locator('label[for="hobbies-checkbox-1"]');
    this.uploadPicture = page.locator("#uploadPicture");
    this.address = page.locator("#currentAddress");
    this.state = page.locator("#state");
    this.stateOption = page.locator('div[id^="react-select-3-option"]');
    this.city = page.locator("#city");
    this.cityOption = page.locator('div[id^="react-select-4-option"]');
    this.submitButton = page.locator("#submit");
    this.modalTitle = page.locator("#example-modal-sizes-title-lg");
    this.modal = page.locator(".modal-content");
  }

  async goto() {
    await this.page.goto("https://demoqa.com/automation-practice-form", {
      waitUntil: "domcontentloaded",
    });
    await this.page.evaluate(() => {
      const fixedBan = document.querySelector("#fixedban");
      const footer = document.querySelector("footer");
      if (fixedBan) fixedBan.remove();
      if (footer) footer.remove();
    });
  }

  async fillMandatoryFields() {
    const fakeName = faker.person.firstName();
    const fakeSurname = faker.person.lastName();
    const fakeEmail = faker.internet.email();
    const fakeMobile = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();
    const fakeAddress = faker.location.streetAddress();

    await this.firstName.fill(fakeName);
    await this.lastName.fill(fakeSurname);
    await this.email.fill(fakeEmail);
    await this.genderMale.click();
    await this.mobile.fill(fakeMobile);

    // Заполнение даты рождения
    await this.dobInput.click();
    await this.page.locator(".react-datepicker__day--015:not(.react-datepicker__day--outside-month)").click();

    await this.address.fill(fakeAddress);

    await this.state.click();
    await this.stateOption.first().click();
    await this.city.click();
    await this.cityOption.first().click();
  }

  async submitForm() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async isSubmissionSuccessful() {
    return this.modalTitle.isVisible();
  }

  async getModalText() {
    return this.modal.textContent();
  }
}

module.exports = { FormPage };
