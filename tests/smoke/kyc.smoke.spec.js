const { test, expect } = require('@playwright/test');
const { CustomersPage } = require('../../src/pages/CustomersPage');
const { CustomerDetailsPage } = require('../../src/pages/CustomerDetailsPage');

test.describe('🔥 Smoke Tests - KYC Documents', () => {

    test('KYC-SMOKE-001: Upload Documents button is visible for incomplete customers', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            await expect(detailsPage.uploadDocumentsBtn).toBeVisible();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-002: Tasks section displays for incomplete customers', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            await expect(detailsPage.tasksSection).toBeVisible();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-003: Tasks count is displayed', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            await expect(detailsPage.tasksCount).toBeVisible();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-004: Accept Terms of Service task is visible', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            const tosTask = page.locator('text=/Accept terms of service/i');
            const isTosVisible = await tosTask.isVisible().catch(() => false);
            expect(isTosVisible).toBeTruthy();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-005: Proof of Identity task is visible', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            const identityTask = page.locator('text=/Add proof of identity|Add proof of address/i');
            const isIdentityVisible = await identityTask.isVisible().catch(() => false);
            expect(isIdentityVisible).toBeTruthy();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-006: Upload Documents modal opens successfully', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            await detailsPage.openUploadDocumentsModal();
            await expect(detailsPage.uploadModal).toBeVisible();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-007: Document type dropdown is accessible in upload modal', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            await detailsPage.openUploadDocumentsModal();
            await expect(detailsPage.identityDocTypeDropdown).toBeVisible();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-008: Address document type dropdown is accessible', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            await detailsPage.openUploadDocumentsModal();
            await expect(detailsPage.addressDocTypeDropdown).toBeVisible();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-009: Issuing country dropdown is accessible', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            await detailsPage.openUploadDocumentsModal();
            await expect(detailsPage.issuingCountryDropdown).toBeVisible();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-010: Modal has continue button for document upload', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const incompleteRow = page.locator('tr:has-text("Incomplete")').first();

        if (await incompleteRow.isVisible()) {
            await incompleteRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            await detailsPage.openUploadDocumentsModal();
            await expect(detailsPage.uploadContinueBtn).toBeVisible();
        } else {
            test.skip(true, 'No incomplete customers available');
        }
    });

    test('KYC-SMOKE-011: Tasks section not visible for approved customers', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const approvedRow = page.locator('tr:has-text("Approved")').first();

        if (await approvedRow.isVisible()) {
            await approvedRow.locator('a').first().click();
            await page.waitForLoadState('networkidle');
            const tasksVisible = await detailsPage.tasksSection.isVisible().catch(() => false);
            expect(!tasksVisible).toBeTruthy();
        } else {
            test.skip(true, 'No approved customers available');
        }
    });

    test('KYC-SMOKE-012: Customer status badge displays correctly', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();

        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            const statusVisible = await detailsPage.customerStatus.isVisible().catch(() => false);
            expect(statusVisible).toBeTruthy();
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('KYC-SMOKE-013: Customer information card is visible', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();

        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            const infoCardVisible = await detailsPage.customerInfoCard.isVisible().catch(() => false);
            expect(infoCardVisible).toBeTruthy();
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('KYC-SMOKE-014: Back button returns to customers list', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();

        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.goBack();
            await expect(page).toHaveURL(/.*customers/);
        } else {
            test.skip(true, 'No customers available');
        }
    });
});
