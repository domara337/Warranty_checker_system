import React, { useState } from 'react';
import { createInstallation } from '../../api/installation';
import { searchWarranty } from '../../api/warranty';
import { Input } from '../common/Input';
import { Button } from '../common/Button';





export const AddInstallationForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [serialQuery, setSerialQuery] = useState('');
  const [warrantyItemId, setWarrantyItemId] = useState<string | number | null>(null);
  const [matchedItem, setMatchedItem] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const [version, setVersion] = useState('');
  const [size, setSize] = useState('');
  const [installationDate, setInstallationDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    if (!serialQuery) return;
    setIsSearching(true);
    
    
    try {
      const results = await searchWarranty(serialQuery);
      
      if (results && results.length > 0) {
        setWarrantyItemId(results[0].warranty_id);
        setMatchedItem(results[0]);
      } else {
        alert('No active warranty item found for that serial number.');
      }
    } catch (err) {
      alert('Error searching for serial number.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!warrantyItemId) {
      alert('Search and select a valid warranty item first.');
      return;
    }

    setLoading(true);
    try {
      await createInstallation({
        warranty_item_id: warrantyItemId,
        version,
        size,
        installation_date: installationDate,
        notes,
      });
      alert('Installation form saved!');
      onSuccess();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit installation data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Technician Entry: On-Site Installation</h2>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Lookup Target Unit</label>
        <div className="flex gap-2">
          <Input placeholder="Enter Serial Number..." value={serialQuery} onChange={(e) => setSerialQuery(e.target.value)} />
          <Button type="button" variant="outline" onClick={handleLookup} isLoading={isSearching}>Lookup</Button>
        </div>
        {matchedItem && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 rounded-lg text-xs text-emerald-800 dark:text-emerald-300">
            <strong>Matched Unit:</strong> {matchedItem.model_name} | Customer: {matchedItem.customer_name}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Firmware / Software Build Version" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="e.g., v3.8.2" required />
        <Input label="Hardware / Display Size" value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g., 65-inch / Enterprise" required />
      </div>

      <Input label="Installation Date" type="date" value={installationDate} onChange={(e) => setInstallationDate(e.target.value)} required />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Field Setup Notes</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Mounting setup details, IP configs, or custom settings..."
          className="p-3 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 text-sm"
        />
      </div>

      <Button type="submit" isLoading={loading} className="w-full" disabled={!warrantyItemId}>
        Log Installation Record
      </Button>
    </form>
  );
};