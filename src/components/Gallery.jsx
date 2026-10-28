import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  initFavourites,
  FAVOURITE_ACTIONS,
  LOCAL_STORAGE_KEY,
} from '../reducers/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function Gallery() {
  const { photos, loading, error, refetch } = useFetchPhotos();
  const [searchQuery, setSearchQuery] = useState('');
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to persist favourites to localStorage:', err);
    }
  }, [favourites]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({
      type: FAVOURITE_ACTIONS.TOGGLE_FAVOURITE,
      payload: photoId,
    });
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) {
      return photos;
    }
    const normalizedQuery = searchQuery.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedQuery)
    );
  }, [photos, searchQuery]);

  const favouriteSet = useMemo(() => new Set(favourites), [favourites]);

  return (
    <section className="w-full">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        totalResults={filteredPhotos.length}
        totalPhotos={photos.length}
      />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favouriteSet.has(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      ) : searchQuery.trim() ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mx-auto text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            No matching photos found
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-4">
            No photographer matched &ldquo;{searchQuery}&rdquo;. Try another author name.
          </p>
          <button
            type="button"
            onClick={handleClearSearch}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
}
