export interface WarrantyItem {
  id?: string | number;
  serial_number: string;
  label_id: string;
  product_id: number;
  branch_id: number;
  customer_id: number;
  warranty_months: number;
  warranty_start_date: string;
  warranty_end_date: string;
  created_by?: number;
}

export interface WarrantySearchResult {
  warranty_id: string | number;
  serial_number: string;
  label_id: string;
  warranty_start_date: string;
  warranty_end_date: string;
  status: 'Active' | 'Expired';
  days_remaining: number;
  part_number: string;
  model_name: string;
  brand_name?: string;
  branch_name: string;
  customer_name: string;
  contact_person?: string;
  customer_mobile?: string;
  installations?: Array<{
    id: number | string;
    version: string;
    size: string;
    installation_date: string;
    notes: string;
  }>;
}