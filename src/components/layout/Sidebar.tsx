import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 min-h-screen">
      <div className="space-y-6">
        <div className="px-2">
          <h1 className="text-xl font-bold text-white tracking-wide">ProTech Warranty</h1>
          <p className="text-xs text-slate-500">Asset & Service Tracking</p>
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg font-medium text-sm">
            Dashboard
          </a>
        </nav>
      </div>

      <div className="border-t border-slate-800 pt-4">
        <div className="px-2 py-1">
          <p className="text-xs text-slate-500">Mode</p>
          <p className="text-sm font-semibold text-slate-400">Development / Local</p>
        </div>
      </div>
    </aside>
  );
};