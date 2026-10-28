export const FAVOURITE_ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
  CLEAR_ALL: 'CLEAR_ALL',
};

export const LOCAL_STORAGE_KEY = 'celebrare_favourite_photos';

/**
 * Safely loads previously stored favourite IDs from localStorage during initial render.
 */
export function initFavourites(initialValue = []) {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading favourites from localStorage:', error);
  }
  return initialValue;
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITE_ACTIONS.TOGGLE_FAVOURITE: {
      const photoId = action.payload;
      const isAlreadyFavourite = state.includes(photoId);

      if (isAlreadyFavourite) {
        return state.filter((id) => id !== photoId);
      }
      return [...state, photoId];
    }

    case FAVOURITE_ACTIONS.CLEAR_ALL:
      return [];

    default:
      return state;
  }
}
