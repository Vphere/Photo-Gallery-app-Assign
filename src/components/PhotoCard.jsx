import React, { useState, memo } from 'react';

const PhotoCard = memo(function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}

        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Photo unavailable</span>
          </div>
        ) : (
          <img
            src={thumbnailUrl}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      <div className="p-4 flex items-center justify-between gap-3 bg-white flex-grow">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-0.5">
            Photographer
          </p>
          <h3
            className="text-base font-semibold text-gray-900 truncate"
            title={photo.author}
          >
            {photo.author}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite
              ? `Remove ${photo.author} photo from favourites`
              : `Add ${photo.author} photo to favourites`
          }
          aria-pressed={isFavourite}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 transition-colors duration-150 ${
              isFavourite
                ? 'text-red-600 stroke-red-600 fill-red-600'
                : 'text-black stroke-black fill-none'
            }`}
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
});

export default PhotoCard;
