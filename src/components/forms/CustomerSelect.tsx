import React, { useEffect, useState } from 'react';
import type { Customer } from '../../types';
import { getCustomers, createCustomer } from '../../api/masterData';


//define the props for the CustomerSelect component
interface CustomerSelectProps {
  value: number | string;
  onChange: (id: string|number) => void;
}


// CustomerSelect component allows users to select a customer from a dropdown or create a new one
export const CustomerSelect: React.FC<CustomerSelectProps> = ({ value, onChange }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');


  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Failed to load customers', err);
    }
  };

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
      alert('Failed to create customer');
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Customer</label>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          + New Customer
        </button>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Customer...</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {/* Fixed property name from c.phone to c.mobile to match the API payload */}
            {c.full_name} {c.mobile ? `(${c.mobile})` : ''}
          </option>
        ))}
      </select>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
          <form onSubmit={handleCreate} className="bg-white dark:bg-slate-800 p-5 rounded-xl max-w-sm w-full space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Add New Customer</h3>
            <input
              placeholder="Customer / Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded text-sm dark:bg-slate-900 dark:border-slate-700"
              required
            />
            <input
              placeholder="Mobile Phone"
              /* Fixed state variable from phone to mobile to match useState */
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded text-sm dark:bg-slate-900 dark:border-slate-700"
            />
            <div className="flex gap-2 justify-end">
              <button 
                type="button" 
                onClick={() => setShowModal(false)} 
                className="px-3 py-1 text-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};