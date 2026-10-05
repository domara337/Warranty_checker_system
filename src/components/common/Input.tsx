import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>}
      <input
        className={`w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${error ? 'border-rose-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
    </div>
  );
};