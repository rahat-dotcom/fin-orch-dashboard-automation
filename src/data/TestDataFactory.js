const { faker } = require('@faker-js/faker');

class TestDataFactory {

  static createIndividualCustomer(overrides = {}) {

    return {
      customerType: 'Individual',
      email: this.uniqueEmail(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: '1975-10-23',
      ssn: '744-54-3462',
      phone: '2025551234',
      countryOfResidence: 'Argentina',
      street: '514 Blake Camp',
      country: 'Argentina',
      nationality: 'Argentina',
      city: 'Buenos Aires',
      state: 'Buenos Aires',
      postalCode: '1001',
      occupation: 'Actuary',
      sourceOfFund: 'Savings',
      purpose: 'Receive Income',
      monthlyVolume: '25000',
      verificationType: 'Standard',
      ...overrides,
    };
  }

  static createCustomerForCountry(countryCode) {
    const countryMap = {
      'US': { country: 'United States' },
      'GB': { country: 'United Kingdom' },
      'AU': { country: 'Australia' },
      'BD': { country: 'Bangladesh' },
      'JP': { country: 'Japan' },
      'DE': { country: 'Germany' },
      'HK': { country: 'Hong Kong' },
    };

    const { country } = countryMap[countryCode] || countryMap['US'];

    return this.createIndividualCustomer({
      countryOfResidence: country,
      nationality: country,
      country: country,
    });
  }

  static createInvalidCustomerData() {
    return {
      email: 'invalid-email',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      ssn: '',
      phone: '',
      postalCode: 'A',
    };
  }

  static createBeneficiary(overrides = {}) {
    return {
      type: 'Individual',
      destinationCountry: 'Australia',
      accountScheme: 'LOCAL',
      currency: 'AUD',
      paymentMethod: 'Bank transfer',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.string.numeric({ length: 10 }),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      ...overrides,
    };
  }

  static createDocumentUpload(overrides = {}) {
    return {
      identityDocType: 'Passport',
      identityFilePath: 'test-data/files/Germany-passport.jpg',
      documentNumber: 'A12345678',
      issuingCountry: 'Argentina',
      issueDate: '2025-10-23',
      expiryDate: '2030-01-15',
      addressIssuingCountry: 'Argentina',
      addressDetailDocType: 'Utility Bill',
      addressFilePath: 'test-data/files/germany-poa-green.jpg',
      issuingCountry: 'Argentina',
      ...overrides,
    };
  }

  static uniqueEmail(prefix = 'test') {
    const timestamp = Date.now();
    return `${prefix}${timestamp}@gmail.com`;
  }

  static boundaryTestData() {
    return {
      postalCode: {
        tooShort: 'A',
        minValid: 'AB',
        maxValid: 'ABCDEFGHIJ',
        tooLong: 'ABCDEFGHIJK',
      },
      email: {
        valid: 'test@example.com',
        noAt: 'testexample.com',
        noDomain: 'test@',
        noLocal: '@example.com',
      },
    };
  }
}

// Dropdown options for reference
TestDataFactory.dropdownOptions = {
  occupation: ['Software Engineer', 'Doctor', 'Teacher', 'Business Owner', 'Freelancer', 'Student', 'Retired', 'Other'],
  sourceOfFund: ['Employment', 'Business', 'Investments', 'Inheritance', 'Savings', 'Other'],
  purpose: ['Personal', 'Business', 'Investment', 'Family Support', 'Education', 'Other'],
  identityDocTypes: ['Passport', 'National Id', 'Drivers License'],
  addressDocTypes: ['Passport', 'National Id', 'Drivers License', 'Residence Permit', 'Utility Bill'],
  currencies: ['USD', 'EUR', 'GBP', 'AUD', 'BDT', 'INR', 'JPY', 'NPR', 'CAD', 'PKR', 'PHP', 'SGD'],
};

module.exports = { TestDataFactory };