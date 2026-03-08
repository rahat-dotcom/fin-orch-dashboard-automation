const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CustomersPage extends BasePage {
    constructor(page) {
        super(page);

        // List view elements
        this.pageTitle = page.getByRole('heading', { name: 'Customers' });
        this.customerTypeDropdown = page.locator('button:has-text("Individual"), button:has-text("Business")').first();
        this.addCustomerBtn = page.getByRole('button', { name: /add customer/i });
        this.customerTable = page.getByRole('main').locator('div').filter({ hasText: /Customer/ }).filter({ hasText: /Status/ }).first();
        this.customerRows = this.customerTable.locator('a[href*="customers/"]').locator('..');

        // Step 1 Modal - Create Customer
        this.modal = page.locator('[role="dialog"], .modal');
        this.modalTitle = page.locator('[role="dialog"] h2, .modal-title');
        this.closeModalBtn = page.locator('[role="dialog"] button[aria-label="Close"], [role="dialog"] button:has-text("×")').first();

        // Customer type selection (radio buttons)
        this.individualTypeBtn = page.locator('radio:has-text("Individual"), [role="radio"]:has-text("Individual"), label:has-text("Individual")').first();
        this.businessTypeBtn = page.locator('radio:has-text("Business"), [role="radio"]:has-text("Business"), label:has-text("Business")').first();
        this.standardVerification = page.locator('radio:has-text("Standard"), [role="radio"]:has-text("Standard"), label:has-text("Standard")').first();
        this.relianceVerification = page.locator('radio:has-text("Reliance"), [role="radio"]:has-text("Reliance"), label:has-text("Reliance")').first();

        // Basic information fields
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
        this.middleNameInput = page.getByRole('textbox', { name: 'Middle name (Optional)' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.dobInput = page.getByRole('button', { name: /Calendar|Select date/i });
        this.dobDateInput = page.locator('input[type="date"]');
        this.ssnInput = page.getByRole('textbox', { name: 'SSN (TIN)' });
        this.phoneInput = page.getByRole('textbox', { name: 'Enter phone number' });

        // Basic information dropdowns
        this.countryOfResidenceDropdown = page.getByRole('textbox', { name: 'Country of residence' });
        this.nationalityDropdown = page.getByRole('textbox', { name: 'Nationality' });

        // Address fields
        this.streetInput = page.getByPlaceholder('123 Main St');
        this.cityInput = page.getByPlaceholder('New York');
        this.countryButton = page.getByPlaceholder('Select country').locator('..').locator('button').first();
        this.stateButton = page.getByPlaceholder('Select state').locator('..').locator('button').first();
        this.postalCodeInput = page.getByPlaceholder('10001');

        // Financial profile
        this.occupationDropdown = page.getByPlaceholder('Select occupation').locator('..').locator('button').first();
        this.sourceOfFundDropdown = page.getByPlaceholder('Select source of fund').locator('..').locator('button').first();
        this.purposeDropdown = page.getByPlaceholder('Select purpose').locator('..').locator('button').first();
        this.monthlyVolumeInput = page.getByPlaceholder('5000');

        // Metadata (optional)
        this.metadataFieldName = page.getByPlaceholder('e.g. source_reference');
        this.metadataValue = page.getByPlaceholder('e.g. ref-20260101-XYZ');

        // Continue button (Step 1)
        this.continueBtn = page.getByRole('button', { name: 'Continue' });

        // Step 2 Modal - Document Upload (appears after Step 1)
        this.uploadModal = page.locator('[role="dialog"]:has-text("Upload"), [role="dialog"]:has-text("Documents")').first();
        this.uploadModalTitle = page.getByRole('heading', { name: /Upload Documents|Documents/ });
        this.uploadModalCloseBtn = this.page.locator(
            '[role="dialog"]:has-text("Upload") button[aria-label="Close drawer"], ' +
            '[role="dialog"]:has-text("Documents") button[aria-label="Close drawer"]'
        ).first();

        this.identityDocTypeDropdown = page.locator('text=Proof of Identity').locator('..').locator('button:has-text("Select"), select').first();
        this.addressDocTypeDropdown = page.locator('section:has-text("Address Document")').locator('button:has-text("Select"), select').first();
        this.issuingCountryDropdown = page.locator('text=Issuing country').locator('..').locator('button, select').first();
        this.fileUploadArea = page.locator('text=Click to upload or drag and drop').first();
        this.uploadContinueBtn = page.getByRole('button', { name: /Upload & Continue/i });
    }

    // ==================== NAVIGATION ====================

    async goto() {
        await this.page.goto('/customers');
        await this.waitForPageLoad();
        await expect(this.pageTitle).toBeVisible();
    }

    // ==================== LIST VIEW ACTIONS ====================

    async selectIndividualFilter() {
        await this.customerTypeDropdown.click();
        await this.page.getByRole('option', { name: 'Individual' }).click();
        await this.waitForPageLoad();
    }

    async selectBusinessFilter() {
        await this.customerTypeDropdown.click();
        await this.page.getByRole('option', { name: 'Business' }).click();
        await this.waitForPageLoad();
    }

    async openAddCustomerModal() {
        await this.addCustomerBtn.click();
        await expect(this.modal).toBeVisible();
        await expect(this.modalTitle).toContainText(/Customer information|Basic information/i);
    }

    async getCustomerCount() {
        await this.page.waitForTimeout(500); // Wait for list to load
        return await this.customerRows.count();
    }

    // ==================== STEP 1: CREATE CUSTOMER FORM ====================

    async selectCustomerType(type) {
        if (type === 'Individual') {
            await this.individualTypeBtn.click();
        } else {
            await this.businessTypeBtn.click();
        }
    }

    async selectVerificationType(type) {
        if (type === 'Standard') {
            await this.standardVerification.click();
        } else {
            await this.relianceVerification.click();
        }
    }

    async selectCountryOfResidence(country) {
        await this.page.keyboard.type(country);
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
    }

    async selectNationality(nationality) {
        await this.page.keyboard.type(nationality);
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
    }

    async fillBasicInfo(data) {
        // Email
        await this.emailInput.click();
        await this.emailInput.fill(data.email);

        // First Name
        await this.firstNameInput.click();
        await this.firstNameInput.fill(data.firstName);

        // Last Name
        await this.lastNameInput.click();
        await this.lastNameInput.fill(data.lastName);

        // Date of Birth - using calendar picker
        await this.dobInput.click();
        await this.page.waitForTimeout(400);

        // Parse the date - support both YYYY-MM-DD and MM/DD/YYYY formats
        let month, day, year;
        if (data.dateOfBirth.includes('-')) {
            const [y, m, d] = data.dateOfBirth.split('-');
            year = y; month = m; day = d;
        } else if (data.dateOfBirth.includes('/')) {
            const parts = data.dateOfBirth.split('/');
            month = parts[0]; day = parts[1]; year = parts[2];
        } else {
            throw new Error(`Invalid date format. Expected MM/DD/YYYY or YYYY-MM-DD, got ${data.dateOfBirth}`);
        }

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = monthNames[parseInt(month) - 1];

        const monthNamesFull = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const fullMonthName = monthNamesFull[parseInt(month) - 1];
        const dayInt = parseInt(day);

        const suffix = dayInt === 1 || dayInt === 21 || dayInt === 31 ? 'st'
            : dayInt === 2 || dayInt === 22 ? 'nd'
                : dayInt === 3 || dayInt === 23 ? 'rd'
                    : 'th';

        // Click year combobox and select the year
        await this.page.getByRole('combobox').filter({ hasText: '2026' }).click();
        await this.page.waitForTimeout(200);
        await this.page.getByRole('option', { name: year }).click();
        await this.page.waitForTimeout(300);

        // Click month combobox and select the month
        await this.page.getByRole('combobox').filter({ hasText: 'Mar' }).click();
        await this.page.waitForTimeout(200);
        await this.page.getByRole('option', { name: monthName }).click();
        await this.page.waitForTimeout(300);

        // Click the day button using aria-label to avoid ambiguity with overflow days
        await this.page.getByRole('button', {
            name: new RegExp(`${fullMonthName} ${dayInt}${suffix},? ${year}`)
        }).click();
        await this.page.waitForTimeout(300);

        // SSN
        await this.ssnInput.click();
        await this.ssnInput.fill(data.ssn);

        // Phone
        await this.phoneInput.click();
        await this.phoneInput.fill(data.phone);

        // Country of Residence (dropdown)
        await this.countryOfResidenceDropdown.click();
        await this.page.waitForTimeout(500); // Wait for any dependent fields to load
        await this.page.keyboard.type(data.countryOfResidence);
        await this.page.keyboard.press('Enter');

        // Nationality (dropdown)
        await this.nationalityDropdown.click();
        await this.page.waitForTimeout(500); // Wait for any dependent fields to load
        await this.page.keyboard.type(data.nationality);
        await this.page.keyboard.press('Enter');
    }

    async fillAddress(data) {
        await this.streetInput.click();
        await this.streetInput.fill(data.street);

        await this.cityInput.click();
        await this.cityInput.fill(data.city);

        // Country (dropdown)
        await this.page.getByRole('textbox', { name: 'Country', exact: true }).click();
        await this.page.waitForTimeout(300);
        await this.page.keyboard.type(data.country);
        await this.page.keyboard.press('Enter');

        // State (dropdown) - wait for it to become enabled after country selection
        const stateInput = this.page.getByRole('textbox', { name: 'State' });
        await expect(stateInput).toBeEnabled({ timeout: 10000 });
        await stateInput.click();
        await this.page.waitForTimeout(300);
        await this.page.keyboard.type(data.state);

        // Click the matching dropdown option (rendered as buttons, not options)
        await this.page.getByRole('button', { name: data.state, exact: true }).click();

        await this.postalCodeInput.click();
        await this.postalCodeInput.fill(data.postalCode);
    }

    async fillFinancialProfile(data) {
        // Occupation (dropdown) - click to focus first
        await this.page.getByPlaceholder('Select occupation').click();
        await this.page.waitForTimeout(300);
        await this.page.keyboard.type(data.occupation);
        await this.page.keyboard.press('Enter');

        // Source of Fund (dropdown)
        await this.page.getByPlaceholder('Select source of fund').click();
        await this.page.waitForTimeout(300);
        await this.page.keyboard.type(data.sourceOfFund);
        await this.page.keyboard.press('Enter');

        // Purpose (dropdown)
        await this.page.getByPlaceholder('Select purpose').click();
        await this.page.waitForTimeout(300);
        await this.page.keyboard.type(data.purpose);
        await this.page.keyboard.press('Enter');

        await this.monthlyVolumeInput.click();
        await this.monthlyVolumeInput.fill(data.monthlyVolume);
    }

    async submitStep1() {
        console.log('📝 Submitting Step 1 form...');
        await this.continueBtn.click();

        // Wait a moment for the form to process
        await this.page.waitForTimeout(1000);

        // Check for validation errors
        const errorMessages = await this.page.locator('[role="alert"], .error, [class*="error"]').count();
        if (errorMessages > 0) {
            console.log(`⚠️ Found ${errorMessages} error messages on the form`);
            const errors = await this.page.locator('[role="alert"], .error, [class*="error"]').allTextContents();
            console.log('Errors:', errors);
        }

        // Wait for Step 1 modal to close or Step 2 to appear
        try {
            // First, wait for either the modal to close OR the upload modal to appear
            await Promise.race([
                this.modal.evaluate(el => !el.offsetHeight, { timeout: 5000 }).catch(() => false),
                this.uploadModal.isVisible({ timeout: 5000 }).catch(() => false)
            ]);
        } catch (e) {
            console.log('⚠️ Could not detect modal transition');
        }

        // Now wait specifically for Step 2 modal
        console.log('⏳ Waiting for Upload Documents modal...');
        await expect(this.uploadModal).toBeVisible({ timeout: 10000 });
        console.log('✅ Upload Documents modal appeared');
    }

    // ==================== STEP 2: DOCUMENT UPLOAD ====================

    async closeUploadModal() {
        const modal = this.page.getByRole('dialog', { name: /upload|documents/i });
        await modal.getByRole('button', { name: 'Close drawer' }).click();
        await expect(modal).not.toBeVisible();
    }

    async selectDate(modal, label, dateString) {
        // dateString format: "YYYY-MM-DD" e.g. "2020-01-15"
        const [year, month, day] = dateString.split('-');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[parseInt(month) - 1];

        // Click the date button within the labeled section
        const dateSection = modal.locator(`generic:has(> generic:text("${label}"))`);
        await modal.getByLabel(label).getByRole('button', { name: /Select date/i }).click();

        // Navigate the calendar to correct month/year
        // (adjust based on actual calendar component structure)
        // Then click the day
        await this.page.getByRole('button', { name: `${parseInt(day)}`, exact: true }).click();
    }

    async selectCalendarDate(modal, dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Always click the first "Select date" button (unfilled ones)
        await modal.getByRole('button', { name: 'Calendar Select date' }).first().click();

        // Calendar opens as a separate dialog
        const calendar = this.page.getByRole('dialog').last();

        // Select year via combobox
        const yearCombo = calendar.getByRole('combobox').nth(1);
        await yearCombo.click();
        await this.page.getByText(String(year), { exact: true }).click();

        // Select month via combobox
        const monthCombo = calendar.getByRole('combobox').nth(0);
        await monthCombo.click();
        await this.page.getByText(shortMonths[month - 1], { exact: true }).click();

        // Click the day
        await calendar.getByRole('gridcell').getByRole('button', {
            name: new RegExp(`${shortMonths[month - 1]}.*${day}.*${year}`, 'i')
        }).click();
    }



    async uploadDocuments(data) {
        const modal = this.page.getByRole('dialog', { name: 'Upload Documents' });
        const fileInputs = modal.locator('input[type="file"]');

        // === PROOF OF IDENTITY ===
        await modal.getByPlaceholder('Select document type').first().click();
        await this.page.getByText(data.identityDocType, { exact: true }).click();
        await fileInputs.nth(0).setInputFiles(data.identityFilePath);

        // === DOCUMENT DETAILS ===
        await modal.getByPlaceholder('e.g. A12345678').fill(data.documentNumber);

        await modal.getByPlaceholder('Select country').click();
        await this.page.keyboard.type(data.issuingCountry);
        await this.page.getByText(data.issuingCountry, { exact: true }).click();

        // Issue date — clicks the first available "Select date" button
        await this.selectCalendarDate(modal, data.issueDate);

        // Expiry date — the issue date button now shows "October 23rd, 2025",
        // so the first remaining "Select date" is the expiry button
        await this.selectCalendarDate(modal, data.expiryDate);


        // === PROOF OF ADDRESS ===
        await fileInputs.nth(1).setInputFiles(data.addressFilePath);

        // === ADDRESS DOCUMENT DETAILS ===
        await modal.getByPlaceholder('Select document type').last().click();
        await this.page.getByText(data.addressDetailDocType, { exact: true }).click();

        await modal.getByPlaceholder('Select issuing country').click();
        await this.page.keyboard.type(data.addressIssuingCountry);
        await this.page.getByText(data.addressIssuingCountry, { exact: true }).click();

        // Submit
        await modal.getByRole('button', { name: 'Upload & Continue' }).click();
        await expect(modal).not.toBeVisible({ timeout: 10000 });
    }


    // ==================== COMPLETE CUSTOMER CREATION ====================

    async createIndividualCustomer(data) {
        console.log(`📝 Creating customer: ${data.email}`);

        // Open modal
        await this.openAddCustomerModal();

        // Select customer type
        await this.selectCustomerType('Individual');
        await this.selectVerificationType(data.verificationType || 'Standard');

        // Fill all sections
        await this.fillBasicInfo(data);
        await this.fillAddress(data);
        await this.fillFinancialProfile(data);

        // Submit Step 1
        await this.submitStep1();
        console.log('✅ Step 1 completed - Customer created');

        // Close Step 2 modal (skip document upload)
        await this.closeUploadModal();
        console.log('✅ Step 2 modal closed - Customer in Incomplete status');

        return data.email;
    }

    async createIndividualCustomerWithDocuments(customerData, documentData) {
        console.log(`📝 Creating customer with documents: ${customerData.email}`);

        // Open modal
        await this.openAddCustomerModal();

        // Select customer type
        await this.selectCustomerType('Individual');
        await this.selectVerificationType(customerData.verificationType || 'Standard');

        // Fill all sections
        await this.fillBasicInfo(customerData);
        await this.fillAddress(customerData);
        await this.fillFinancialProfile(customerData);

        // Submit Step 1
        await this.submitStep1();
        console.log('✅ Step 1 completed - Customer created');

        // Complete Step 2 - Upload Documents
        await this.uploadDocuments(documentData);
        console.log('✅ Step 2 completed - Documents uploaded');

        return customerData.email;
    }

    // check if customer exists in the list by email
    async customerExistsInList(email) {
        try {
            await expect(this.page.getByText(email)).toBeVisible({ timeout: 5000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    // verify if the customer is successfully created by checking if it appears in the list
    async verifyCustomerCreated(email) {
        await this.goto();
        // Wait for list to actually render
        await expect(this.page.getByRole('heading', { name: 'Customers' })).toBeVisible();

        const exists = await this.customerExistsInList(email);

        if (exists) {
            console.log(`✅ Customer verified in list: ${email}`);
        } else {
            console.log(`❌ Customer NOT found in list: ${email}`);
        }
        return exists;
    }

}

module.exports = { CustomersPage };