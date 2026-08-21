export interface ProductValidationInput {
  name: string;
  salt: string;
  strength: string;
  pack: string;
  companyId: string;
  categoryId: string;
  therapyId: string;
  description?: string;
  image?: string;
}

export interface InquiryValidationInput {
  name: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  subject: string;
  message: string;
  productSlug?: string;
}

export function validateProductInput(input: Partial<ProductValidationInput>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Product name must be at least 2 characters.';
  }

  if (!input.salt || input.salt.trim().length < 2) {
    errors.salt = 'Active INN salt composition is required.';
  }

  if (!input.strength || input.strength.trim().length === 0) {
    errors.strength = 'Formulation strength is required.';
  }

  if (!input.pack || input.pack.trim().length === 0) {
    errors.pack = 'Packaging specifications are required.';
  }

  if (!input.companyId) {
    errors.companyId = 'Please select a manufacturing company.';
  }

  if (!input.categoryId) {
    errors.categoryId = 'Please select a dosage category.';
  }

  if (!input.therapyId) {
    errors.therapyId = 'Please select a therapy speciality.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateInquiryInput(input: Partial<InquiryValidationInput>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Full name is required.';
  }

  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Valid corporate email address is required.';
  }

  if (!input.company || input.company.trim().length < 2) {
    errors.company = 'Company / Enterprise name is required.';
  }

  if (!input.country || input.country.trim().length < 2) {
    errors.country = 'Country of operation is required.';
  }

  if (!input.subject || input.subject.trim().length < 3) {
    errors.subject = 'Inquiry subject is required.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
