const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
    
    // Header elements
    this.logo = page.locator('img[alt*="Fin"]').first();
    this.sandboxToggle = page.getByRole('button', { name: 'Sandbox' });
    this.productionToggle = page.getByRole('button', { name: 'Production' });
    this.logoutBtn = page.getByRole('button', { name: /log out/i });
    
    // Sidebar navigation
    this.sidebar = page.locator('nav, [role="navigation"]').first();
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.customersLink = page.getByRole('link', { name: 'Customers' });
    this.transactionsLink = page.getByRole('link', { name: 'Transactions' });
    this.webhooksLink = page.getByRole('link', { name: 'Webhooks' });
    this.apiKeysLink = page.getByRole('link', { name: 'API keys' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.apiDocsLink = page.getByRole('link', { name: 'API docs' });
  }

  async goToDashboard() {
    await this.dashboardLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToCustomers() {
    await this.customersLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToTransactions() {
    await this.transactionsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToWebhooks() {
    await this.webhooksLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToApiKeys() {
    await this.apiKeysLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToSettings() {
    await this.settingsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async switchToSandbox() {
    await this.sandboxToggle.click();
    await this.page.waitForLoadState('networkidle');
  }

  async switchToProduction() {
    await this.productionToggle.click();
    await this.page.waitForLoadState('networkidle');
  }

  async logout() {
    await this.logoutBtn.click();
    await this.page.waitForURL('**/');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getToastMessage() {
    const toast = this.page.locator('[role="alert"], .toast, .notification').first();
    await toast.waitFor({ state: 'visible', timeout: 5000 });
    return await toast.textContent() || '';
  }

  async closeModal() {
    await this.page.locator('button[aria-label="Close"], button:has-text("×")').click();
  }
}

module.exports = { BasePage };