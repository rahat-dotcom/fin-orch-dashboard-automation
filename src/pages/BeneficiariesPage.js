const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class BeneficiariesPage extends BasePage {
  constructor(page) {
    super(page);
    
    this.addBeneficiaryBtn = page.getByRole('button', { name: /add beneficiary/i });
    this.beneficiaryTable = page.locator('table, [role="table"]');
    this.beneficiaryRows = page.locator('tbody tr, [role="row"]');
    this.modal = page.locator('[role="dialog"]:has-text("beneficiary")');
    this.modalTitle = page.locator('[role="dialog"] h2');
    this.closeModalBtn = page.locator('[role="dialog"] button[aria-label="Close"]');
    this.individualTypeBtn = page.getByRole('button', { name: 'Individual' });
    this.businessTypeBtn = page.getByRole('button', { name: 'Business' });
    this.destinationCountry = page.getByLabel(/destination country/i);
    this.accountScheme = page.getByLabel(/account scheme/i);
    this.currency = page.getByLabel(/currency/i);
    this.paymentMethod = page.getByLabel(/payment method/i);
    this.firstNameInput = page.getByLabel(/first name/i);
    this.lastNameInput = page.getByLabel(/last name/i);
    this.emailInput = page.getByLabel(/email/i);
    this.phoneInput = page.getByLabel(/phone/i);
    this.streetInput = page.getByLabel(/street/i);
    this.cityInput = page.getByLabel(/city/i);
    this.createBeneficiaryBtn = page.getByRole('button', { name: /create beneficiary/i });
  }

  async openAddBeneficiaryModal() {
    await this.addBeneficiaryBtn.click();
    await expect(this.modal).toBeVisible();
  }

  async selectBeneficiaryType(type) {
    if (type === 'Individual') {
      await this.individualTypeBtn.click();
    } else {
      await this.businessTypeBtn.click();
    }
  }

  async fillBeneficiaryDetails(data) {
    await this.selectDropdownOption(this.destinationCountry, data.destinationCountry);
    await this.selectDropdownOption(this.accountScheme, data.accountScheme);
    await this.selectDropdownOption(this.currency, data.currency);
    await this.selectDropdownOption(this.paymentMethod, data.paymentMethod);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    if (data.phone) await this.phoneInput.fill(data.phone);
    if (data.street) await this.streetInput.fill(data.street);
    if (data.city) await this.cityInput.fill(data.city);
  }

  async createBeneficiary(data) {
    await this.openAddBeneficiaryModal();
    await this.selectBeneficiaryType(data.type);
    await this.fillBeneficiaryDetails(data);
    await this.createBeneficiaryBtn.click();
    await this.waitForPageLoad();
  }

  async selectDropdownOption(dropdown, value) {
    await dropdown.click();
    await this.page.getByRole('option', { name: value }).click();
  }

  async getBeneficiaryCount() {
    return await this.beneficiaryRows.count();
  }
}

module.exports = { BeneficiariesPage };