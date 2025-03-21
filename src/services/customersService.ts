
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/document";

export async function getCustomers() {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching customers:', error);
    throw new Error(error.message);
  }
  
  return data || [];
}

export async function getCustomerById(id: string) {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching customer:', error);
    throw new Error(error.message);
  }
  
  return data;
}

export async function createCustomer(customer: Omit<Customer, 'id'>) {
  // Format the customer data for the database
  const customerData = {
    name: customer.name,
    email: customer.email,
    company: customer.company || null,
    street: customer.billingAddress?.street || null,
    city: customer.billingAddress?.city || null,
    state: customer.billingAddress?.state || null,
    zip_code: customer.billingAddress?.zipCode || null,
    country: customer.billingAddress?.country || null
  };
  
  const { data, error } = await supabase
    .from('customers')
    .insert(customerData)
    .select()
    .maybeSingle();
  
  if (error) {
    console.error('Error creating customer:', error);
    throw new Error(error.message);
  }
  
  // Format the returned data to match our app's Customer type
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    company: data.company || undefined,
    billingAddress: {
      street: data.street || '',
      city: data.city || '',
      state: data.state || '',
      zipCode: data.zip_code || '',
      country: data.country || ''
    }
  };
}

export async function updateCustomer(id: string, customer: Partial<Customer>) {
  // Format the customer data for the database
  const customerData: any = {};
  if (customer.name !== undefined) customerData.name = customer.name;
  if (customer.email !== undefined) customerData.email = customer.email;
  if (customer.company !== undefined) customerData.company = customer.company;
  
  if (customer.billingAddress) {
    if (customer.billingAddress.street !== undefined) customerData.street = customer.billingAddress.street;
    if (customer.billingAddress.city !== undefined) customerData.city = customer.billingAddress.city;
    if (customer.billingAddress.state !== undefined) customerData.state = customer.billingAddress.state;
    if (customer.billingAddress.zipCode !== undefined) customerData.zip_code = customer.billingAddress.zipCode;
    if (customer.billingAddress.country !== undefined) customerData.country = customer.billingAddress.country;
  }
  
  const { data, error } = await supabase
    .from('customers')
    .update(customerData)
    .eq('id', id)
    .select()
    .maybeSingle();
  
  if (error) {
    console.error('Error updating customer:', error);
    throw new Error(error.message);
  }
  
  // Format the returned data to match our app's Customer type
  return data ? {
    id: data.id,
    name: data.name,
    email: data.email,
    company: data.company || undefined,
    billingAddress: {
      street: data.street || '',
      city: data.city || '',
      state: data.state || '',
      zipCode: data.zip_code || '',
      country: data.country || ''
    }
  } : null;
}
