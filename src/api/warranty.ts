import { apiClient } from './client';
import type { WarrantyItem, WarrantySearchResult } from '../types';

export const createWarranty = async (data: Partial<WarrantyItem>) => {
  const res = await apiClient.post('/warranty-items', data);
  return res.data;
};

export const searchWarranty = async (query: string): Promise<WarrantySearchResult[]> => {
  const res = await apiClient.get(`/warranty-items/search?term=${encodeURIComponent(query)}`);
  return res.data.data || res.data;
};


// export const uploadWarrantyExcel = async (file: File) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   const res = await apiClient.post('/upload/warranty-items', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return res.data;
// };