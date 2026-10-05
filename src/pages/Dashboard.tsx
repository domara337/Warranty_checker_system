import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { AddWarrantyForm } from '../components/forms/AddWarrantyForm';
import { AddInstallationForm } from '../components/forms/AddInstallationForm';


export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'warranty' | 'installation'>('warranty');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Operational Panel</h1>
            <p className="text-xs text-slate-500">Select an task tab or run a direct serial lookup above.</p>
          </div>
        </div>

        <div className="flex gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('warranty')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'warranty'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            + Warehouse: Log Warranty
          </button>
          <button
            onClick={() => setActiveTab('installation')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'installation'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            + Field Tech: Log Installation
          </button>
        </div>

        <div>
          {activeTab === 'warranty' ? (
            <AddWarrantyForm onSuccess={() => alert('Storage workflow complete!')} />
          ) : (
            <AddInstallationForm onSuccess={() => alert('Field deployment workflow complete!')} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};