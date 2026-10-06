import React, { useEffect, useState } from 'react';
import type { Customer } from '../../types';
import { getCustomers, createCustomer } from '../../api/masterData';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

interface CustomerSelectProps {
  value: number | string;
  onChange: (id: string | number) => void;
}

// CustomerSelect component allows users to select a customer from a dropdown or create a new one
export const CustomerSelect: React.FC<CustomerSelectProps> = ({ value, onChange }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Failed to load customers', err);
    }
  };

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCust = await createCustomer({
        full_name: name,
        mobile: mobile,
      });
      setCustomers([...customers, newCust]);
      onChange(newCust.id);
      setShowModal(false);
      setName('');
      setMobile('');
    } catch (err) {
      console.error('Failed to create customer', err);
      alert('Failed to create customer');
    }
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Customer</label>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1 rounded text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Customer
        </button>
      </div>

      <Select value={value} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}>
        <option value="">Select Customer...</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.full_name} {c.mobile ? `(${c.mobile})` : ''}
          </option>
        ))}
      </Select>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-customer-title"
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h3 id="add-customer-title" className="text-base font-semibold text-slate-900 dark:text-white">
                Add New Customer
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">Creates a customer record instantly.</p>
            </div>

            <form onSubmit={handleCreate}>
              <div className="space-y-4 px-5 py-5">
                <Input
                  label="Customer / Company Name"
                  placeholder="e.g., Acme Retail Ltd"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Mobile Phone"
                  placeholder="Optional"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/40">
                <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Customer</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
