import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-sm text-slate-400">The requested interface route does not exist.</p>
        <Link to="/" className="inline-block px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium">Return to Dashboard</Link>
      </div>
    </div>
  );
};