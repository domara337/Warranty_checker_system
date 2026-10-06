import { apiClient } from './client';
import type { Branch, Brand, Product, Customer } from '../types/hardware';

//get branches
export const getBranches = async (): Promise<Branch[]> => {
  const res = await apiClient.get('/branches');
  return res.data.data || res.data;
};

//get brands
export const getBrands = async (): Promise<Brand[]> => {
  const res = await apiClient.get('/brands');
  return res.data.data || res.data;
};


export const getProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get<Product[] | { data: Product[] }>('/products');
  
  // Explicitly extract array if wrapped, or fallback to res.data, or default to empty array
  if (Array.isArray(res.data)) {
    return res.data;
  }
  
  return res.data?.data ?? [];
};

//get customers
export const getCustomers = async (): Promise<Customer[]> => {
  const res = await apiClient.get('/customers');
  return res.data.data || res.data;
};

// Create a new customer.
// The backend's addCustomer reads `full_name` from the request body,
// while GET responses expose the same column as `name`.
export const createCustomer = async (data: {
  full_name: string;
  mobile?: string;
  city?: string;
  address?: string;
  contact_person?: string;
}): Promise<Customer> => {
  const res = await apiClient.post('/customers', data);
  return res.data.data || res.data;
};