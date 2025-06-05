const { faker } = require("@faker-js/faker");
const { BasePage } = require("./BasePage");

class FormPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.genderMale = page.locator('label[for="gender-radio-1"]');
    this.mobile = page.locator("#userNumber");
    this.dobInput = page.locator("#dateOfBirthInput");
    this.dobDay15 = page.locator(".react-datepicker__day--015:not(.react-datepicker__day--outside-month)");
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
    this.fakeName = "";
    this.fakeSurname = "";
    this.fakeEmail = "";
    this.fakeMobile = "";
    this.fakeAddress = "";
  }

  async goto() {
    await this.open("https://demoqa.com/automation-practice-form");
  }

  async fillMandatoryFields() {
    this.fakeName = faker.person.firstName();
    this.fakeSurname = faker.person.lastName();
    this.fakeEmail = faker.internet.email();
    this.fakeMobile = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();
    this.fakeAddress = faker.location.streetAddress();

    await this.firstName.fill(this.fakeName);
    await this.lastName.fill(this.fakeSurname);
    await this.email.fill(this.fakeEmail);
    await this.genderMale.click();
    await this.mobile.fill(this.fakeMobile);

    await this.dobInput.scrollIntoViewIfNeeded();
    await this.dobInput.click();
    await this.dobDay15.click();

    await this.address.fill(this.fakeAddress);

    await this.state.scrollIntoViewIfNeeded();
    await this.state.click();
    await this.stateOption.first().click();

    await this.city.scrollIntoViewIfNeeded();
    await this.city.click();
    await this.cityOption.first().click();
  }

  async submitForm() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click({ force: true });
  }

  async isSubmissionSuccessful() {
    return this.modalTitle.isVisible();
  }

  async getModalText() {
    return this.modal.textContent();
  }
}

module.exports = { FormPage };
