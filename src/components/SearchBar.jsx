import React, { memo } from 'react';

const SearchBar = memo(function SearchBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  totalResults,
  totalPhotos,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search photos by author name..."
          aria-label="Search photos by author name"
          className="w-full pl-11 pr-10 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-400 text-base"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            aria-label="Clear search query"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {searchQuery && (
        <p className="mt-2 text-xs text-gray-500 pl-1">
          Showing {totalResults} of {totalPhotos} photos matching &ldquo;{searchQuery}&rdquo;
        </p>
      )}
    </div>
  );
});

export default SearchBar;
