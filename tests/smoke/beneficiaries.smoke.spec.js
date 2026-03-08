const { test, expect } = require('@playwright/test');
const { CustomersPage } = require('../../src/pages/CustomersPage');
const { CustomerDetailsPage } = require('../../src/pages/CustomerDetailsPage');
const { BeneficiariesPage } = require('../../src/pages/BeneficiariesPage');
const { TestDataFactory } = require('../../src/data/TestDataFactory');

test.describe('🔥 Smoke Tests - Beneficiaries', () => {

    test('BENF-SMOKE-001: Beneficiaries page is accessible from customer details', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await expect(page).toHaveURL(/.*beneficiaries/);
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-002: Add Beneficiary button is visible on beneficiaries tab', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await expect(beneficiariesPage.addBeneficiaryBtn).toBeVisible();
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-003: Add Beneficiary modal opens successfully', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await beneficiariesPage.openAddBeneficiaryModal();
            await expect(beneficiariesPage.modal).toBeVisible();
            await expect(beneficiariesPage.modalTitle).toContainText(/beneficiary/i);
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-004: Individual and Business type options are selectable', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await beneficiariesPage.openAddBeneficiaryModal();

            await expect(beneficiariesPage.individualTypeBtn).toBeVisible();
            await expect(beneficiariesPage.businessTypeBtn).toBeVisible();

            await beneficiariesPage.individualTypeBtn.click();
            await beneficiariesPage.businessTypeBtn.click();
            await beneficiariesPage.individualTypeBtn.click();
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-005: Destination country dropdown is accessible', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await beneficiariesPage.openAddBeneficiaryModal();
            await expect(beneficiariesPage.destinationCountry).toBeVisible();
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-006: Currency dropdown is visible', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await beneficiariesPage.openAddBeneficiaryModal();
            await expect(beneficiariesPage.currency).toBeVisible();
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-007: First name input field is available', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await beneficiariesPage.openAddBeneficiaryModal();
            await expect(beneficiariesPage.firstNameInput).toBeVisible();
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-008: Email input field accepts valid email format', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await beneficiariesPage.openAddBeneficiaryModal();

            const testEmail = 'beneficiary@test.com';
            await beneficiariesPage.emailInput.fill(testEmail);
            const value = await beneficiariesPage.emailInput.inputValue();
            expect(value).toBe(testEmail);
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-009: Phone input field is optional and accepts format', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await beneficiariesPage.openAddBeneficiaryModal();

            const testPhone = '5551234567';
            await beneficiariesPage.phoneInput.fill(testPhone);
            const value = await beneficiariesPage.phoneInput.inputValue();
            expect(value).toBe(testPhone);
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-010: Modal close button closes the beneficiary form', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();
            await beneficiariesPage.openAddBeneficiaryModal();
            await beneficiariesPage.closeModalBtn.click();
            await expect(beneficiariesPage.modal).not.toBeVisible();
        } else {
            test.skip(true, 'No customers available');
        }
    });

    test('BENF-SMOKE-011: Beneficiary list displays if beneficiaries exist', async ({ page }) => {
        const customersPage = new CustomersPage(page);
        const detailsPage = new CustomerDetailsPage(page);
        const beneficiariesPage = new BeneficiariesPage(page);

        await customersPage.goto();
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await detailsPage.clickBeneficiariesTab();

            const tableVisible = await beneficiariesPage.beneficiaryTable.isVisible().catch(() => false);
            const rowCount = await beneficiariesPage.beneficiaryRows.count().catch(() => 0);
            expect(tableVisible || rowCount > 0).toBeTruthy();
        } else {
            test.skip(true, 'No customers available');
        }
    });
});
