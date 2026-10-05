import React from 'react';
import type { WarrantySearchResult } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';

export const WarrantyDetailsCard: React.FC<{ data: WarrantySearchResult }> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-700 pb-3">
        <div>
          <span className="text-xs font-mono text-slate-400">SERIAL NUMBER</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{data.serial_number}</h3>
          <p className="text-xs text-slate-500">Label ID: {data.label_id || 'N/A'}</p>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-xs text-slate-400">Product Model</p>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{data.model_name}</p>
          <p className="text-xs text-slate-500">{data.part_number}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Branch</p>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{data.branch_name}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Days Remaining</p>
          <p className="font-semibold text-blue-600 dark:text-blue-400">{data.days_remaining} Days</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Warranty Period</p>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {formatDate(data.warranty_start_date)} - {formatDate(data.warranty_end_date)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Customer Name</p>
          <p className="font-medium text-slate-700 dark:text-slate-300">{data.customer_name}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Contact / Mobile</p>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            {data.contact_person || 'N/A'} ({data.customer_mobile || 'N/A'})
          </p>
        </div>
      </div>
    </div>
  );
};