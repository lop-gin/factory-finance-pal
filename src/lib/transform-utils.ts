
import { Customer } from "@/types/document";

// Transform customer data from database to frontend type
export function transformCustomerFromDB(dbCustomer: any): Customer {
  return {
    id: dbCustomer.id,
    name: dbCustomer.name,
    email: dbCustomer.email || '',
    company: dbCustomer.company || undefined,
    billingAddress: {
      street: dbCustomer.street || '',
      city: dbCustomer.city || '',
      state: dbCustomer.state || '',
      zipCode: dbCustomer.zip_code || '',
      country: dbCustomer.country || ''
    }
  };
}

// Additional transform functions can be added here as needed
