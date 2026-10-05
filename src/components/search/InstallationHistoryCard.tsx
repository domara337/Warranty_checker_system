import React from 'react';
import { formatDate } from '../../utils/formatters';

interface InstallationProps {
  installations?: Array<{
    id: number | string;
    version: string;
    size: string;
    installation_date: string;
    technician_name?: string;
    notes: string;
  }>;
}

export const InstallationHistoryCard: React.FC<InstallationProps> = ({ installations }) => {
  if (!installations || installations.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-dashed border-slate-300 dark:border-slate-700 text-center">
        <p className="text-sm text-slate-500">No on-site installation records logged for this item yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h4 className="text-md font-bold text-slate-900 dark:text-white mb-3">Installation & Technical Details</h4>
      <div className="space-y-4">
        {installations.map((inst, index) => (
          <div key={inst.id || index} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm space-y-2 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Date: {formatDate(inst.installation_date)}</span>
              <span>Tech: {inst.technician_name || 'Assigned Technician'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-medium text-slate-700 dark:text-slate-200">
              <div>Firmware/Version: <span className="font-normal">{inst.version}</span></div>
              <div>Display/Size: <span className="font-normal">{inst.size}</span></div>
            </div>
            {inst.notes && (
              <div className="text-xs bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                <strong>Notes:</strong> {inst.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 