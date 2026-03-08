const { test, expect } = require('@playwright/test');
const { CustomersPage } = require('../../../src/pages/CustomersPage');
const { CustomerDetailsPage } = require('../../../src/pages/CustomerDetailsPage');

test.describe('KYC Document Upload', () => {
  let customersPage;
  let detailsPage;

  test.beforeEach(async ({ page }) => {
    customersPage = new CustomersPage(page);
    detailsPage = new CustomerDetailsPage(page);
    await customersPage.goto();
  });

  async function navigateToIncompleteCustomer(page) {
    const incompleteRow = page.locator('tr:has-text("Incomplete")').first();
    if (await incompleteRow.isVisible()) {
      await incompleteRow.locator('a').first().click();
      await page.waitForLoadState('networkidle');
      return true;
    }
    return false;
  }

  async function navigateToApprovedCustomer(page) {
    const approvedRow = page.locator('tr:has-text("Approved")').first();
    if (await approvedRow.isVisible()) {
      await approvedRow.locator('a').first().click();
      await page.waitForLoadState('networkidle');
      return true;
    }
    return false;
  }

  test('TASK-101: Verify Tasks section visible for Incomplete customers', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await detailsPage.expectTasksVisible();
  });

  test('TASK-102: Verify Tasks count displayed', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await expect(page.locator('text=/Tasks \\(\\d+\\)/i')).toBeVisible();
  });

  test('TASK-104: Verify Accept terms of service task', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await expect(page.locator('text=/Accept terms of service/i')).toBeVisible();
  });

  test('TASK-108: Verify Add proof of identity task', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await expect(page.locator('text=/Add proof of identity/i')).toBeVisible();
  });

  test('TASK-111: Verify Upload documents button', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await expect(detailsPage.uploadDocumentsBtn).toBeVisible();
  });

  test('TASK-112: Verify Tasks section NOT visible for Approved', async ({ page }) => {
    const hasApproved = await navigateToApprovedCustomer(page);
    test.skip(!hasApproved, 'No approved customers');
    await detailsPage.expectTasksNotVisible();
  });

  test('TASK-201: Verify Upload Documents modal opens', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await detailsPage.openUploadDocumentsModal();
    await expect(detailsPage.uploadModal).toBeVisible();
  });

  test('TASK-202: Verify modal title Upload Documents', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await detailsPage.openUploadDocumentsModal();
    await expect(page.locator('text=/Upload Documents/i')).toBeVisible();
  });

  test('TASK-210: Verify upload area text', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await detailsPage.openUploadDocumentsModal();
    await expect(page.locator('text=/Click to upload or drag and drop/i')).toBeVisible();
  });

  test('TASK-211: Verify file format hint', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await detailsPage.openUploadDocumentsModal();
    await expect(page.locator('text=/PDF.*PNG.*JPG.*5MB/i')).toBeVisible();
  });

  test('TASK-302: Verify Passport option available', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await detailsPage.openUploadDocumentsModal();
    await detailsPage.identityDocTypeDropdown.click();
    await expect(page.getByRole('option', { name: 'Passport' })).toBeVisible();
  });

  test('TASK-303: Verify National Id option available', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await detailsPage.openUploadDocumentsModal();
    await detailsPage.identityDocTypeDropdown.click();
    await expect(page.getByRole('option', { name: 'National Id' })).toBeVisible();
  });

  test('TASK-304: Verify Drivers License option', async ({ page }) => {
    const hasIncomplete = await navigateToIncompleteCustomer(page);
    test.skip(!hasIncomplete, 'No incomplete customers');
    await detailsPage.openUploadDocumentsModal();
    await detailsPage.identityDocTypeDropdown.click();
    await expect(page.getByRole('option', { name: 'Drivers License' })).toBeVisible();
  });
});
