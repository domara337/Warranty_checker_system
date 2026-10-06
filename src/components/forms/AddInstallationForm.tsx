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
  const [installationDate, setInstallationDate] = useState(() => new Date().toISOString().split('T')[0]);
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
      console.error('Serial lookup failed', err);
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
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Form header */}
      <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-4 sm:px-6 dark:border-slate-800">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M11.42 15.17l-5.658 5.658a2.25 2.25 0 01-3.182-3.182l5.657-5.657m5.658-5.658a2.25 2.25 0 10-3.182 3.182l5.657 5.657L20.25 12.75l-8.829 8.829m0 0l-3.182-3.182m0 0L3.75 12.75l8.829-8.829"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Technician Entry: On-Site Installation
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">Match a unit, then record the deployed configuration.</p>
        </div>
      </div>

      <div className="space-y-6 px-5 py-6 sm:px-6">
        {/* Lookup */}
        <fieldset className="space-y-4">
          <legend className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Lookup Target Unit</legend>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Enter Serial Number..."
              value={serialQuery}
              onChange={(e) => setSerialQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLookup();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={handleLookup} isLoading={isSearching} className="shrink-0">
              Lookup
            </Button>
          </div>

          {matchedItem && (
            <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="min-w-0">
                <span className="font-semibold">Matched unit:</span> {matchedItem.model_name}
                <span className="block text-xs opacity-80">Customer: {matchedItem.customer_name}</span>
              </p>
            </div>
          )}
        </fieldset>

        {/* Configuration */}
        <fieldset className="space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
          <legend className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Configuration</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Firmware / Software Build Version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g., v3.8.2"
              required
            />
            <Input
              label="Hardware / Display Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g., 65-inch / Enterprise"
              required
            />
          </div>

          <Input
            label="Installation Date"
            type="date"
            value={installationDate}
            onChange={(e) => setInstallationDate(e.target.value)}
            required
          />
        </fieldset>

        {/* Notes */}
        <fieldset className="space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
          <legend className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Field Setup Notes</legend>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="installation-notes" className="sr-only">
              Field Setup Notes
            </label>
            <textarea
              id="installation-notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mounting setup details, IP configs, or custom settings..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-500"
            />
          </div>
        </fieldset>
      </div>

      {/* Form actions */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-slate-800/40">
        <p className="text-xs text-slate-500">
          {warrantyItemId ? 'Unit linked and ready to save.' : 'Look up a unit to enable saving.'}
        </p>
        <Button type="submit" isLoading={loading} disabled={!warrantyItemId} className="shrink-0">
          Log Installation Record
        </Button>
      </div>
    </form>
  );
};
