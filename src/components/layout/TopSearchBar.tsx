import React, { useState } from 'react';
import { searchWarranty } from '../../api/warranty';
import type { WarrantySearchResult } from '../../types';
import { SearchResultsModal } from '../search/SearchResultsModal';

export const TopSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WarrantySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
 
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setIsModalOpen(true);
 
    try {
      const data = await searchWarranty(query);
      setResults(data);
 
    } catch (err) {
      console.error('Search failed', err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="Search by Serial Number, Label ID, or Customer..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-20 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
        />
        <svg className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold transition-all"
        >
          Search
        </button>
      </form>

      <SearchResultsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        results={results}
        isLoading={isLoading}
      />
    </>
  );
};