const { test, expect } = require('@playwright/test');
const { CustomersPage } = require('../../../src/pages/CustomersPage');
const { TestDataFactory } = require('../../../src/data/TestDataFactory');

test.describe('Create Individual Customer', () => {
    let customersPage;

    test.beforeEach(async ({ page }) => {
        customersPage = new CustomersPage(page);
        await customersPage.goto();
    });

    // ==================== SUCCESSFUL CREATION TESTS ====================

    test.describe('CUST-4xx: Happy Path - Create Customer', () => {

        test('CUST-401: Create customer (Step 1 only)', async ({ page }) => {
            // Generate unique customer data with fixed values
            const customerData = TestDataFactory.createIndividualCustomer({
                email: TestDataFactory.uniqueEmail('rht')
            });

            // Create the customer
            const createdEmail = await customersPage.createIndividualCustomer(customerData);

            // Verify customer was created by checking the list
            const exists = await customersPage.verifyCustomerCreated(createdEmail);
            expect(exists).toBe(true);
        });


        test('CUST-402: Create & Upload customer (Step 1+2)', async ({ page }) => {
            // Generate unique customer data with fixed values
            const customerData = TestDataFactory.createIndividualCustomer({
                email: TestDataFactory.uniqueEmail('rht'),
            });

            const uploadData = TestDataFactory.createDocumentUpload({});

            // Create the customer and upload documents
            const createdEmail = await customersPage.createIndividualCustomerWithDocuments(customerData, uploadData);

            // Verify success message and customer email displayed
            await expect(page.getByText('Documents attached successfully')).toBeVisible();

            // Verify customer was created by checking the list
            const exists = await customersPage.verifyCustomerCreated(createdEmail);
            expect(exists).toBe(true);
        });
        
        /*
        test('CUST-403: Create & Upload mulitple customers (Step 1+2)', async ({ page }) => {
            // Generate unique customer data with fixed values
            const customerData = TestDataFactory.createIndividualCustomer({
                email: TestDataFactory.uniqueEmail('rht'),
            });

            const uploadData = TestDataFactory.createDocumentUpload({});

            // Create the customer and upload documents
            const createdEmail = await customersPage.createIndividualCustomerWithDocuments(customerData, uploadData);

            // Verify success message and customer email displayed
            await expect(page.getByText('Documents attached successfully')).toBeVisible();

            // Verify customer was created by checking the list
            const exists = await customersPage.verifyCustomerCreated(createdEmail);
            expect(exists).toBe(true);
        }); 
        */
    });
});

