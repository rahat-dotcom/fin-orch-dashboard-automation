const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Login page elements
    this.logo = page.locator('img[alt*="Fin"]').first();
    this.emailInput = page.getByPlaceholder(/email/i).or(page.locator('input[type="email"]'));
    this.continueBtn = page.getByRole('button', { name: /continue/i });
    this.termsLink = page.getByRole('link', { name: /terms/i });
    this.privacyLink = page.getByRole('link', { name: /privacy/i });
    this.pageTitle = page.getByRole('heading', { name: /enter your email/i });
    
    // OTP page elements
    this.otpInput = page.locator('input[type="text"], input[inputmode="numeric"]').first();
    this.otpSubmitBtn = page.getByRole('button', { name: /verify|submit|continue/i });
    this.resendOtpLink = page.getByRole('button', { name: /resend/i });
    this.backBtn = page.getByRole('button', { name: /back/i });
    
    // Error messages
    this.emailError = page.locator('text=/email.*required|invalid.*email/i');
    this.otpError = page.locator('text=/invalid.*otp|incorrect.*code/i');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async submitEmail(email) {
    await this.enterEmail(email);
    await this.clickContinue();
    await this.page.waitForLoadState('networkidle');
  }

  async enterOtp(otp) {
    const inputs = this.page.locator('input[type="text"], input[inputmode="numeric"]');
    const count = await inputs.count();
    
    if (count === 6) {
      // Individual digit inputs
      for (let i = 0; i < 6; i++) {
        await inputs.nth(i).fill(otp[i]);
      }
    } else {
      // Single input field
      await this.otpInput.fill(otp);
    }
  }

  async submitOtp(otp) {
    await this.enterOtp(otp);
    const submitBtn = this.page.getByRole('button', { name: /next|submit|continue/i });
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, otp) {
    await this.goto();
    await this.submitEmail(email);
    await this.submitOtp(otp);
  }

  async loginAsAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const otp = process.env.ADMIN_OTP;
    await this.login(email, otp);
  }

  async loginAsDeveloper() {
    const email = process.env.DEV_EMAIL;
    const otp = process.env.DEV_OTP;
    await this.login(email, otp);
  }

  async expectLoginPageVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.continueBtn).toBeVisible();
  }

  async expectOtpPageVisible() {
    await expect(this.otpInput.or(this.page.locator('input[inputmode="numeric"]').first())).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.page.getByRole('link', { name: 'Customers' })).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { LoginPage };