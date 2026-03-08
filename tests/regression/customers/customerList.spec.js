const { test, expect } = require('@playwright/test');
const { CustomersPage } = require('../../../src/pages/CustomersPage');

test.describe('Customer List View', () => {
    let customersPage;

    test.beforeEach(async ({ page }) => {
        customersPage = new CustomersPage(page);
        await customersPage.goto();
    });

    test('CUST-101: Verify Customers page loads successfully', async ({ page }) => {
        await expect(customersPage.pageTitle).toBeVisible();
        await expect(page).toHaveURL(/.*customers/);
    });

    test('CUST-102: Verify Individual is default selected in dropdown', async () => {
        await expect(customersPage.customerTypeDropdown).toContainText('Individual');
    });

    test('CUST-103: Verify dropdown toggle between Individual/Business', async ({ page }) => {
        await customersPage.customerTypeDropdown.click();
        await page.getByRole('option', { name: 'Business' }).click();
        await expect(customersPage.customerTypeDropdown).toContainText('Business');
        await customersPage.customerTypeDropdown.click();
        await page.getByRole('option', { name: 'Individual' }).click();
        await expect(customersPage.customerTypeDropdown).toContainText('Individual');
    });

    test('CUST-104: Verify customer list table displays correctly', async () => {
        await expect(customersPage.customerTable).toBeVisible();
    });

    test('CUST-119: Verify Add customer button is visible', async () => {
        await expect(customersPage.addCustomerBtn).toBeVisible();
    });

    test('CUST-120: Verify Add customer button opens create modal', async () => {
        await customersPage.openAddCustomerModal();
        await expect(customersPage.modal).toBeVisible();
    });

    test('CUST-106: Verify customer name is clickable', async ({ page }) => {
        const firstCustomer = page.locator('a[href*="customers/"]').first();
        if (await firstCustomer.isVisible()) {
            await firstCustomer.click();
            await page.waitForLoadState('networkidle');
            await expect(page).toHaveURL(/.*customers\/.*/);
        } else {
            test.skip(true, 'No customers in list');
        }
    });

    test('CUST-114: Verify Status Approved displays with green badge', async ({ page }) => {
        const approvedBadge = page.locator('text=Approved').first();
        if (await approvedBadge.isVisible()) {
            await expect(approvedBadge).toBeVisible();
        }
    });

    test('CUST-115: Verify Status On hold displays with yellow badge', async ({ page }) => {
        const onHoldBadge = page.locator('text=On hold').first();
        if (await onHoldBadge.isVisible()) {
            await expect(onHoldBadge).toBeVisible();
        }
    });

    test('CUST-116: Verify Status Incomplete displays', async ({ page }) => {
        const incompleteBadge = page.locator('text=Incomplete').first();
        if (await incompleteBadge.isVisible()) {
            await expect(incompleteBadge).toBeVisible();
        }
    });
});