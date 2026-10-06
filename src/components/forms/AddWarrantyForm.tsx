import React, { useState, useEffect } from 'react';
import type { Branch, Product } from '../../types';
import { getBranches, getProducts } from '../../api/masterData';
import { createWarranty } from '../../api/warranty';
import { CustomerSelect } from './CustomerSelect';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';



export const AddWarrantyForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
 // State variables for form fields and data
  const [branches, setBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [serialNumber, setSerialNumber] = useState('');
  const [labelId, setLabelId] = useState('');
  const [productId, setProductId] = useState<string | number | ''>('');
  const [branchId, setBranchId] = useState<string | number | ''>('');
  const [customerId, setCustomerId] = useState<string | number | ''>('');
  const [months, setMonths] = useState(24);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Fetch branches and products on component mount
  useEffect(() => {
    getBranches().then(setBranches);
    
    getProducts().then(setProducts);
  }, []);


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !branchId || !customerId) {
      alert('Please fill in all mandatory dropdown fields.');
      return;
    }

    setLoading(true);
    try {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setMonth(end.getMonth() + Number(months));

      // Call API to create warranty record
      await createWarranty({
        serial_number: serialNumber,
        label_id: labelId,
        product_id: productId,
        branch_id: branchId,
        customer_id: customerId,
        warranty_months: Number(months),
        warranty_start_date: startDate,
        warranty_end_date: end.toISOString().split('T')[0],
      });

      alert('Warranty record successfully created!');
      onSuccess();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create warranty record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Form header */}
      <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-4 sm:px-6 dark:border-slate-800">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M8.25 7.5V6a2.25 2.25 0 012.25-2.25h3A2.25 2.25 0 0115.75 6v1.5m-8.25 0h9"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Storage Entry: Add Warranty</h2>
          <p className="mt-0.5 text-sm text-slate-500">Register a unit received into the warehouse and set its cover.</p>
        </div>
      </div>

      <div className="space-y-6 px-5 py-6 sm:px-6">
        {/* Unit identity */}
        <fieldset className="space-y-4">
          <legend className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Unit Identity</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Serial Number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="e.g., SN-000123"
              required
            />
            <Input
              label="Label ID"
              value={labelId}
              onChange={(e) => setLabelId(e.target.value)}
              placeholder="Optional"
            />
          </div>
        </fieldset>

        {/* Assignment */}
        <fieldset className="space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
          <legend className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Assignment</legend>
          
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Product Model"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">Select Product...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.model_name} ({p.part_number})
                </option>
              ))}
            </Select>

            <Select
              label="Branch"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              required
            >
              <option value="">Select Branch...</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Select>
          </div>

          <CustomerSelect
            value={customerId}
            onChange={(id) => setCustomerId(id)}
          />
        </fieldset>

        {/* Coverage */}
        <fieldset className="space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
          <legend className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Coverage</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Warranty Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <Input
              label="Warranty Duration (Months)"
              type="number"
              min={1}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              required
            />
          </div>
        </fieldset>
      </div>

      {/* Form actions */}
      <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-slate-800/40">
        <Button type="submit" isLoading={loading}>
          Create Warranty Record
        </Button>
      </div>
    </form>
  );
};
