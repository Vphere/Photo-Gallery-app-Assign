import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200 animate-ping opacity-25"></div>
        <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700">Loading photos...</p>
      <p className="text-sm text-gray-500">Fetching 30 curated images from Picsum</p>
    </div>
  );
}
