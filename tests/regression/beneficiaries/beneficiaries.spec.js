const { test, expect } = require('@playwright/test');
const { CustomersPage } = require('../../../src/pages/CustomersPage');
const { CustomerDetailsPage } = require('../../../src/pages/CustomerDetailsPage');
const { TestDataFactory } = require('../../../src/data/TestDataFactory');

test.describe('Beneficiaries Management', () => {
  let customersPage;
  let detailsPage;

  test.beforeEach(async ({ page }) => {
    customersPage = new CustomersPage(page);
    detailsPage = new CustomerDetailsPage(page);
    await customersPage.goto();
  });

  async function navigateToApprovedCustomer(page) {
    const approvedRow = page.locator('tr:has-text("Approved")').first();
    if (await approvedRow.isVisible()) {
      await approvedRow.locator('a').first().click();
      await page.waitForLoadState('networkidle');
      return true;
    }
    return false;
  }

  test('BENF-101: Verify Beneficiaries tab is clickable', async ({ page }) => {
    const hasApproved = await navigateToApprovedCustomer(page);
    test.skip(!hasApproved, 'No approved customers');
    await detailsPage.clickBeneficiariesTab();
    await expect(detailsPage.addBeneficiaryBtn.or(detailsPage.noBeneficiariesMsg)).toBeVisible();
  });

  test('BENF-103: Verify Add Beneficiary button is visible', async ({ page }) => {
    const hasApproved = await navigateToApprovedCustomer(page);
    test.skip(!hasApproved, 'No approved customers');
    await detailsPage.clickBeneficiariesTab();
    await expect(detailsPage.addBeneficiaryBtn).toBeVisible();
  });

  test('BENF-104: Verify empty state when no beneficiaries', async ({ page }) => {
    const hasApproved = await navigateToApprovedCustomer(page);
    test.skip(!hasApproved, 'No approved customers');
    await detailsPage.clickBeneficiariesTab();
    const hasBeneficiaries = await page.locator('table tbody tr').first().isVisible();
    if (!hasBeneficiaries) {
      await expect(detailsPage.noBeneficiariesMsg).toBeVisible();
    }
  });

  test('BENF-105: Verify empty state message', async ({ page }) => {
    const hasApproved = await navigateToApprovedCustomer(page);
    test.skip(!hasApproved, 'No approved customers');
    await detailsPage.clickBeneficiariesTab();
    const noBeneficiaries = await detailsPage.noBeneficiariesMsg.isVisible();
    if (noBeneficiaries) {
      await expect(page.locator('text=/Create your first beneficiary/i')).toBeVisible();
    }
  });
});