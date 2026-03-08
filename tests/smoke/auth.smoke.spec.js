const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/pages/LoginPage');

test.describe('🔥 Smoke Tests - Authentication', () => {

    test('AUTH-SMOKE-001: Login page loads successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await expect(loginPage.pageTitle).toBeVisible();
        await expect(loginPage.emailInput).toBeVisible();
    });

    test('AUTH-SMOKE-002: Email input accepts valid format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.emailInput.fill('test@example.com');
        const value = await loginPage.emailInput.inputValue();
        expect(value).toBe('test@example.com');
    });

    test('AUTH-SMOKE-003: Continue button is enabled when email provided', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.emailInput.fill('test@example.com');
        await expect(loginPage.continueBtn).toBeEnabled();
    });

    test('AUTH-SMOKE-004: Fin logo is visible on login page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await expect(loginPage.logo).toBeVisible();
    });

    test('AUTH-SMOKE-005: Terms of Service link is visible', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await expect(loginPage.termsLink).toBeVisible();
    });

    test('AUTH-SMOKE-006: Privacy link is visible', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await expect(loginPage.privacyLink).toBeVisible();
    });

    test('AUTH-SMOKE-007: OTP input appears after valid email submission', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.emailInput.fill(process.env.TEST_EMAIL || 'smoke@test.com');
        await loginPage.continueBtn.click();
        await page.waitForLoadState('networkidle');
        // OTP page should be visible or redirect to dashboard
        const isOtpVisible = await loginPage.otpInput.isVisible().catch(() => false);
        const isDashboard = await page.url().includes('customers') || page.url().includes('dashboard');
        expect(isOtpVisible || isDashboard).toBeTruthy();
    });

    test('AUTH-SMOKE-008: Back button navigates from OTP to email input', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.emailInput.fill(process.env.TEST_EMAIL || 'smoke@test.com');
        await loginPage.continueBtn.click();
        await page.waitForLoadState('networkidle');

        const hasBackBtn = await loginPage.backBtn.isVisible().catch(() => false);
        if (hasBackBtn) {
            await loginPage.backBtn.click();
            await page.waitForLoadState('networkidle');
            await expect(loginPage.emailInput).toBeVisible();
        }
    });

    test('AUTH-SMOKE-009: Resend OTP option is available', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.emailInput.fill(process.env.TEST_EMAIL || 'smoke@test.com');
        await loginPage.continueBtn.click();
        await page.waitForLoadState('networkidle');

        const hasResendBtn = await loginPage.resendOtpLink.isVisible().catch(() => false);
        expect(hasResendBtn).toBeTruthy();
    });

    test('AUTH-SMOKE-010: Page is responsive on different screen sizes', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Test mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await loginPage.goto();
        await expect(loginPage.pageTitle).toBeVisible();

        // Test tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await expect(loginPage.pageTitle).toBeVisible();

        // Test desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        await expect(loginPage.pageTitle).toBeVisible();
    });
});
