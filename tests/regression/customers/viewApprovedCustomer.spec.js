// tests/regression/customers/viewApprovedCustomer.spec.js

const { test, expect } = require('@playwright/test');
const { CustomersPage } = require('../../../src/pages/CustomersPage');
const { CustomerDetailsPage } = require('../../../src/pages/CustomerDetailsPage');

test.describe('View Approved Customer Details', () => {
    let customersPage;
    let detailsPage;

    test.beforeEach(async ({ page }) => {
        customersPage = new CustomersPage(page);
        detailsPage = new CustomerDetailsPage(page);
        await customersPage.goto();
    });

    test('CUST-201: Navigate to approved customer details', async ({ page }) => {
        await customersPage.clickCustomerByStatus('Approved');
        await expect(page).toHaveURL(/.*customers\/[a-f0-9-]+/);
    });

    test('CUST-202: Verify approved customer header info', async ({ page }) => {
        await customersPage.clickCustomerByStatus('Approved');
        await detailsPage.expectApprovedCustomerView();
    });

    test('CUST-203: Verify Details tab content', async ({ page }) => {
        await customersPage.clickCustomerByStatus('Approved');
        await detailsPage.expectDetailsTabContent();
    });

    test('CUST-204: Verify Transactions tab accessible', async ({ page }) => {
        await customersPage.clickCustomerByStatus('Approved');
        await detailsPage.clickTransactionsTab();
        await expect(
            detailsPage.allProductsFilter.or(detailsPage.noTransactionsMsg)
        ).toBeVisible();
    });

    test('CUST-205: Verify Beneficiaries tab accessible', async ({ page }) => {
        await customersPage.clickCustomerByStatus('Approved');
        await detailsPage.clickBeneficiariesTab();
        await expect(
            detailsPage.addBeneficiaryBtn.or(detailsPage.noBeneficiariesMsg)
        ).toBeVisible();
    });

    test('CUST-206: Verify back navigation returns to list', async ({ page }) => {
        await customersPage.clickCustomerByStatus('Approved');
        await detailsPage.goBack();
        await expect(page).toHaveURL(/.*customers$/);
        await expect(customersPage.pageTitle).toBeVisible();
    });
});
