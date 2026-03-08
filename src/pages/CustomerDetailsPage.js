const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CustomerDetailsPage extends BasePage {
  constructor(page) {
    super(page);

    // Header elements
    this.backBtn = page.getByRole('link', { name: 'Back' });
    this.customerAvatar = page.locator('.avatar, [class*="avatar"]').first();
    this.customerName = page.locator('h1, h2').first();
    this.customerStatus = page.locator('text=/Approved|On hold|Incomplete/i').first();
    this.customerType = page.locator('text=/Individual|Business/i').first();
    this.customerId = page.locator('text=/[a-f0-9-]{36}/i').first();
    this.copyIdBtn = page.locator('button[aria-label*="copy"]').first();
    this.uploadDocumentsBtn = page.getByRole('button', { name: /upload documents/i });
    this.enableUsdFeaturesBtn = page.getByRole('button', { name: /enable usd features/i });

    // Tabs
    this.detailsTab = page.getByRole('tab', { name: 'Details' }).or(page.locator('button:has-text("Details")'));
    this.transactionsTab = page.getByRole('tab', { name: 'Transactions' })
      .or(page.getByRole('button', { name: 'Transactions', exact: true }));

    this.beneficiariesTab = page.getByRole('tab', { name: 'Beneficiaries' }).or(page.locator('button:has-text("Beneficiaries")'));

    // Tasks section
    this.tasksSection = page.locator('section:has-text("Tasks"), div:has-text("Tasks")').first();
    this.tasksCount = page.locator('text=/Tasks \\(\\d+\\)/i');
    this.acceptTosTask = page.locator('text=/Accept terms of service/i').locator('..');
    this.tosProceedBtn = page.getByRole('button', { name: 'Proceed' });
    this.tosCopyBtn = page.getByRole('button', { name: 'Copy' });
    this.proofOfIdentityTask = page.locator('text=/Add proof of identity/i').locator('..');
    this.identityContinueBtn = this.proofOfIdentityTask.getByRole('button', { name: 'Continue' });

    // Customer info card
    this.customerInfoCard = page.getByRole('heading', { name: 'Customer information', level: 3 }).locator('..');


    // Capabilities section
    this.capabilitiesSection = page.locator('section:has-text("Capabilities")');
    this.onRampSection = page.locator('text=/On-ramp/i').locator('..');
    this.offRampSection = page.locator('text=/Off-ramp/i').locator('..');

    // Upload Documents Modal
    this.uploadModal = page.locator('[role="dialog"]:has-text("Upload Documents")');
    this.identityDocTypeDropdown = this.uploadModal.locator('select, button').filter({ hasText: /select document type/i }).first();
    this.addressDocTypeDropdown = this.uploadModal.locator('section:has-text("Address Document")').locator('select, button').first();
    this.issuingCountryDropdown = this.uploadModal.locator('text=/Issuing country/i').locator('..').locator('select, button');
    this.uploadContinueBtn = this.uploadModal.getByRole('button', { name: /upload.*continue/i });

    // Transactions tab
    this.allProductsFilter = page.getByRole('button', { name: /all products/i });
    this.allStatusesFilter = page.getByRole('button', { name: /all statuses/i });
    this.noTransactionsMsg = page.locator('text=/No transactions yet/i');

    // Beneficiaries tab
    this.addBeneficiaryBtn = page.getByRole('button', { name: /add beneficiary/i });
    this.noBeneficiariesMsg = page.locator('text=/No beneficiaries found/i');
  }

  async goBack() {
    await this.backBtn.click();
    await this.waitForPageLoad();
  }

  async clickDetailsTab() {
    await this.detailsTab.click();
    await this.waitForPageLoad();
  }

  async clickTransactionsTab() {
    await this.transactionsTab.click();
    await this.waitForPageLoad();
  }

  async clickBeneficiariesTab() {
    await this.beneficiariesTab.click();
    await this.waitForPageLoad();
  }

  async openUploadDocumentsModal() {
    await this.uploadDocumentsBtn.click();
    await expect(this.uploadModal).toBeVisible();
  }

  async selectIdentityDocType(type) {
    await this.identityDocTypeDropdown.click();
    await this.page.getByRole('option', { name: type }).click();
  }

  async selectAddressDocType(type) {
    await this.addressDocTypeDropdown.click();
    await this.page.getByRole('option', { name: type }).click();
  }

  async selectIssuingCountry(country) {
    await this.issuingCountryDropdown.click();
    await this.page.getByRole('option', { name: country }).click();
  }

  async submitDocuments() {
    await this.uploadContinueBtn.click();
    await this.waitForPageLoad();
  }

  async expectTasksVisible() {
    await expect(this.tasksSection).toBeVisible();
  }

  async expectTasksNotVisible() {
    await expect(this.tasksSection).not.toBeVisible();
  }

  async expectStatus(status) {
    await expect(this.page.locator(`text=${status}`).first()).toBeVisible();
  }

  async expectCustomerInfoVisible() {
    await expect(this.customerName).toBeVisible();
    await expect(this.customerStatus).toBeVisible();
    await expect(this.customerId).toBeVisible();
  }

  async expectDetailsTabContent() {
    await this.clickDetailsTab();
    await expect(this.customerInfoCard).toBeVisible();
  }

  async expectApprovedCustomerView() {
    await this.expectStatus('Approved');
    await this.expectCustomerInfoVisible();
    // Approved customers should NOT have pending tasks
    await expect(this.tasksSection).not.toBeVisible({ timeout: 5000 });
  }

}

module.exports = { CustomerDetailsPage };