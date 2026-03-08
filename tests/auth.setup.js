const { test: setup } = require('@playwright/test');
const { LoginPage } = require('../src/pages/LoginPage');

const ADMIN_AUTH_FILE = 'playwright/.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  console.log('🔐 Starting admin authentication...');
  console.log(`📧 Email: ${process.env.ADMIN_EMAIL}`);
  console.log(`🌍 Environment: ${process.env.ENV_NAME}`);
  
  await loginPage.goto();
  await loginPage.expectLoginPageVisible();
  await loginPage.submitEmail(process.env.ADMIN_EMAIL);
  await loginPage.expectOtpPageVisible();
  console.log('📱 OTP page loaded, entering OTP...');
  await loginPage.submitOtp(process.env.ADMIN_OTP);
  await loginPage.expectLoggedIn();
  console.log('✅ Admin authentication successful!');
  
  await page.context().storageState({ path: ADMIN_AUTH_FILE });
  console.log(`💾 Auth state saved to ${ADMIN_AUTH_FILE}`);
});