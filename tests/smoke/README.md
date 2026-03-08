# Smoke Testing Suite

This directory contains comprehensive smoke tests for the Fin Orchestration Automation platform. Smoke tests are quick, high-level tests that verify the core functionality of the application works as expected.

## Test Files Overview

### 1. **auth.smoke.spec.js**

Tests for authentication and login functionality.

- Login page loads and displays correctly
- Email input accepts valid formats
- Continue button functionality
- OTP page navigation
- Responsive design across different viewports
- **Test Count**: 10 tests

### 2. **customers.smoke.spec.js**

Tests for customer management features.

- Customer list page accessibility
- Adding new customers
- Customer filtering by type (Individual/Business)
- Customer details navigation
- Tab functionality (Details, Transactions, Beneficiaries)
- Environment toggle (Sandbox/Production)
- **Test Count**: 22 tests organized in 4 describe blocks

### 3. **beneficiaries.smoke.spec.js**

Tests for beneficiary management functionality.

- Beneficiaries tab accessibility
- Add Beneficiary modal functionality
- Individual and Business type selection
- Form field validation
- Country and currency dropdown access
- Email and phone input handling
- **Test Count**: 11 tests

### 4. **kyc.smoke.spec.js**

Tests for KYC (Know Your Customer) document upload.

- Upload Documents button visibility
- Tasks section display for incomplete customers
- Tasks count display
- Terms of Service task visibility
- Proof of Identity task visibility
- Document type dropdown selection
- Issuing country selection
- Status badges and customer information display
- **Test Count**: 14 tests

### 5. **navigation.smoke.spec.js**

Tests for application navigation and layout.

- Sidebar navigation links
- Page transitions between sections
- Dashboard, Transactions, Webhooks, API Keys, Settings access
- Fin logo functionality
- Logout functionality
- Navigation consistency across pages
- Header element visibility
- **Test Count**: 20 tests

## Running the Tests

### Run all smoke tests:

```bash
npm run test:smoke
```

### Run specific smoke test file:

```bash
npm test tests/smoke/customers.smoke.spec.js
```

### Run with specific browser:

```bash
npm run test:chrome -- tests/smoke/
```

### Run in UI mode (interactive):

```bash
npm run test:ui
```

### Run in headed mode (see browser):

```bash
npm run test:headed -- tests/smoke/
```

### Run with debug mode:

```bash
npm run test:debug -- tests/smoke/
```

## Environment Variables

Make sure these environment variables are set before running tests:

```bash
# Test environment
TEST_ENV=staging  # or sandbox

# Admin credentials for authentication
ADMIN_EMAIL=your-test-email@test.com
ADMIN_OTP=000000  # OTP for testing

# Test data
TEST_EMAIL=smoke@test.com
```

## Test Statistics

| Test Suite     | Test Count | Coverage                                          |
| -------------- | ---------- | ------------------------------------------------- |
| Authentication | 10         | Login flow, email validation, OTP, responsiveness |
| Customers      | 22         | List view, modal, filtering, details, navigation  |
| Beneficiaries  | 11         | Add beneficiary, form fields, modals, selection   |
| KYC Documents  | 14         | Upload flow, tasks, document types, status        |
| Navigation     | 20         | Sidebar, page transitions, header, logout         |
| **TOTAL**      | **77**     | **Core platform functionality**                   |

## Test Structure

All smoke tests follow this structure:

- **Arrange**: Set up the page object and navigate to the page
- **Act**: Perform the action being tested
- **Assert**: Verify the expected outcome
- **Skip**: Skip tests when prerequisites (like data) are not available

## Key Features

✅ **Lightweight & Fast**: Smoke tests run quickly to catch major issues  
✅ **Skip Logic**: Tests automatically skip if prerequisites aren't met (no data)  
✅ **Error Handling**: Graceful error handling with `.catch()` for optional elements  
✅ **Responsive Testing**: Some tests verify mobile and tablet viewports  
✅ **Network Wait**: Tests wait for network idle state when navigating  
✅ **Organized**: Tests grouped by feature area with describe blocks

## Common Test Patterns

### Checking if element is visible:

```javascript
await expect(element).toBeVisible();
```

### Checking if element is clickable:

```javascript
await element.click();
```

### Navigating and waiting:

```javascript
await page.goto("/customers");
await page.waitForLoadState("networkidle");
```

### Conditional skipping:

```javascript
if (await element.isVisible()) {
  // Test continues
} else {
  test.skip(true, "Element not available");
}
```

## Troubleshooting

### Tests fail with "No customers available"

- This is expected when no customer data exists
- Tests automatically skip in this scenario
- Run regression tests first to populate data

### Login fails

- Ensure `ADMIN_EMAIL` and `ADMIN_OTP` are set correctly
- Check that `auth.setup.js` runs successfully
- Verify authentication token is saved

### Modal not visible

- Ensure the button to open modal is clicked
- Check that modal elements are properly targeted in page objects
- Look for JavaScript errors in the console

### URL mismatch in assertions

- Some dynamic URLs may have parameters
- Tests use regex patterns like `/.*customers/` to match flexible URLs
- Check browser console for redirect issues

## Maintenance Tips

1. **Keep tests independent**: Each test should work on its own
2. **Use descriptive names**: Test names clearly describe what is being tested
3. **Handle dynamic data**: Use `.catch()` or `.isVisible()` for optional elements
4. **Update page objects**: When UI changes, update corresponding page object methods
5. **Regular execution**: Run smoke tests frequently to catch regressions early
6. **Skip vs Fail**: Use skip for missing prerequisites, not for bugs

## Integration with CI/CD

Smoke tests are perfect for CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run smoke tests
  run: npm run test:smoke

- name: Generate report
  run: npm run report
```

## Best Practices

- ✅ Run smoke tests after each code deploy
- ✅ Run before running more intensive regression tests
- ✅ Keep smoke tests under 5 minutes total
- ✅ Focus on critical user paths only
- ✅ Review and update tests when features change
- ✅ Monitor test results for flakiness

## Related Files

- Page Objects: `src/pages/`
- Test Data Factory: `src/data/TestDataFactory.js`
- Base Page: `src/pages/BasePage.js`
- Authentication Setup: `tests/auth.setup.js`
- Playwright Config: `playwright.config.js`
