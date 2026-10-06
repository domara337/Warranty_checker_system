import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { AddWarrantyForm } from '../components/forms/AddWarrantyForm';
import { AddInstallationForm } from '../components/forms/AddInstallationForm';

const TABS = [
  {
    id: 'warranty' as const,
    label: 'Log Warranty',
    role: 'Warehouse',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M8.25 7.5V6a2.25 2.25 0 012.25-2.25h3A2.25 2.25 0 0115.75 6v1.5m-8.25 0h9m-9 0H4.875c-.621 0-1.125.504-1.125 1.125v.375m12 0h1.875c.621 0 1.125.504 1.125 1.125v.375"
      />
    ),
  },
  {
    id: 'installation' as const,
    label: 'Log Installation',
    role: 'Field Tech',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M11.42 15.17l-5.658 5.658a2.25 2.25 0 01-3.182-3.182l5.657-5.657m5.658-5.658a2.25 2.25 0 10-3.182 3.182l5.657 5.657L20.25 12.75l-8.829 8.829m0 0l-3.182-3.182m0 0L3.75 12.75l8.829-8.829"
      />
    ),
  },
];

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'warranty' | 'installation'>('warranty');

  const activeMeta = TABS.find((tab) => tab.id === activeTab)!;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Operational Panel</h1>
            <p className="mt-1 text-sm text-slate-500">
              Choose a workflow tab, or run a direct serial lookup from the search bar above.
            </p>
          </div>

          <dl className="flex shrink-0 items-center gap-6 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <dt className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Active role</dt>
              <dd className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">{activeMeta.role}</dd>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <dt className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Workflow</dt>
              <dd className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">{activeMeta.label}</dd>
            </div>
          </dl>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Entry workflows"
          className="inline-flex w-full gap-1 rounded-xl border border-slate-200 bg-white p-1 sm:w-auto dark:border-slate-800 dark:bg-slate-900"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors sm:flex-none ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <svg
                  className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {tab.icon}
                </svg>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div role="tabpanel">
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
