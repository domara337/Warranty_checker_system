import React from 'react';
import type { WarrantySearchResult } from '../../types';
import { WarrantyDetailsCard } from './WarrantyDetailsCard';
import { InstallationHistoryCard } from './InstallationHistoryCard';
import { Button } from '../common/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: WarrantySearchResult[];
  isLoading: boolean;
}

export const SearchResultsModal: React.FC<ModalProps> = ({ isOpen, onClose, results, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Warranty & System Lookup</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
        </div>

        {isLoading ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-500">Executing database lookup...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">No Record Found</p>
            <p className="text-sm text-slate-500">Double check the serial number or label ID and try again.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((item) => (
              <div key={item.warranty_id} className="space-y-4">
                <WarrantyDetailsCard data={item} />
                <InstallationHistoryCard installations={item.installations} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-right">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};