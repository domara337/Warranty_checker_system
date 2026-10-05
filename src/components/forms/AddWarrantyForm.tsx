import React, { useState, useEffect } from 'react';
import type { Branch, Product } from '../../types';
import { getBranches, getProducts } from '../../api/masterData';
import { createWarranty } from '../../api/warranty';
import { CustomerSelect } from './CustomerSelect';
import { Input } from '../common/Input';
import { Button } from '../common/Button';





export const AddWarrantyForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [serialNumber, setSerialNumber] = useState('');
  const [labelId, setLabelId] = useState('');
  const [productId, setProductId] = useState<number | ''>('');
  const [branchId, setBranchId] = useState<number | ''>('');
  const [customerId, setCustomerId] = useState<number | ''>('');
  const [months, setMonths] = useState(24);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    getBranches().then(setBranches);
    getProducts().then(setProducts);
  }, []);

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

      await createWarranty({
        serial_number: serialNumber,
        label_id: labelId,
        product_id: Number(productId),
        branch_id: Number(branchId),
        customer_id: Number(customerId),
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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Storage Entry: Add Warranty</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Serial Number" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} required />
        <Input label="Label ID" value={labelId} onChange={(e) => setLabelId(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Product Model</label>
          <select
            value={productId}
            onChange={(e) => setProductId(Number(e.target.value))}
            className="p-2 border rounded-lg dark:bg-slate-900 dark:border-slate-700"
            required
          >
            <option value="">Select Product...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.model_name} ({p.part_number})</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Branch</label>
          <select
            value={branchId}
            onChange={(e) => setBranchId(Number(e.target.value))}
            className="p-2 border rounded-lg dark:bg-slate-900 dark:border-slate-700"
            required
          >
            <option value="">Select Branch...</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      <CustomerSelect
        value={customerId}
        onChange={(id) => setCustomerId(id === '' ? '' : Number(id))}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Warranty Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <Input label="Warranty Duration (Months)" type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} required />
      </div>

      <Button type="submit" isLoading={loading} className="w-full">Create Warranty Record</Button>
    </form>
  );
};