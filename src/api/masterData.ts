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
//get products
export const getProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get('/products');
  return res.data.data || res.data;
};

//get customers
export const getCustomers = async (): Promise<Customer[]> => {
  const res = await apiClient.get('/customers');
  return res.data.data || res.data;
};

// Create a new customer
export const createCustomer = async (data: Omit<Customer, 'id'>): Promise<Customer> => {
  const res = await apiClient.post('/customers', data);
  return res.data.data || res.data;
};