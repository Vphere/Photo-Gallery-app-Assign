# Photo Gallery Web App — Celebrare Frontend Internship Assignment

A fast, responsive, and lightweight Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS**. The app fetches curated photos from the Picsum Photos API, displays them in an adaptive responsive grid, provides real-time client-side search by photographer name, and enables marking photos as favourites with persistent storage using React's `useReducer` and `localStorage`.

---

## 🚀 Key Requirements & Implementation

| # | Requirement | Implementation Detail |
|---|---|---|
| **1** | **Project Setup** | Built with React 18 + Vite + Tailwind CSS. No external UI component libraries used (pure Tailwind + clean SVG icons). Functional components with hooks only. |
| **2** | **Fetch Photos from API** | Fetches 30 photos on load from `https://picsum.photos/v2/list?limit=30`. Displays an animated loading spinner while fetching, and an error card with a retry button if the request fails. |
| **3** | **Responsive Grid** | Responsive Tailwind CSS grid: **4 columns on desktop** (`lg:grid-cols-4`), **2 columns on tablet** (`sm:grid-cols-2`), and **1 column on mobile** (`grid-cols-1`). Each card displays the photo, author name, and an interactive heart icon button. |
| **4** | **Search Filter** | Search input at top with real-time substring filtering on `author`. No page reload, no redundant network calls. |
| **5** | **Favourites with `useReducer`** | Favourites state managed strictly via `useReducer` (not `useState`). Toggles favourite status on click and synchronizes seamlessly to `localStorage` across page reloads. |
| **6** | **Custom Hook (`useFetchPhotos`)** | Data fetching encapsulated in `src/hooks/useFetchPhotos.js`. Returns `{ photos, loading, error }` (plus a `refetch` helper). UI component consumes this hook. |
| **7** | **`useCallback` + `useMemo`** | `useCallback` wraps the search filter change handler to preserve referential integrity for memoized child components. `useMemo` computes the filtered photos array to avoid wasteful computations on unrelated renders. |

---

## 📂 Project Structure

```text
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorMessage.jsx      # Error card displayed if API fetch fails
│   │   ├── Gallery.jsx           # Main gallery orchestrator component
│   │   ├── LoadingSpinner.jsx    # Visual loading spinner during data fetch
│   │   ├── PhotoCard.jsx         # Card component displaying photo, author, and heart button
│   │   └── SearchBar.jsx         # Search bar component with real-time feedback
│   ├── hooks/
│   │   └── useFetchPhotos.js     # Custom hook returning { photos, loading, error, refetch }
│   ├── reducers/
│   │   └── favouritesReducer.js  # Reducer and lazy initializer for favourite state
│   ├── App.jsx                   # Top-level application layout
│   ├── index.css                 # Tailwind CSS directives
│   └── main.jsx                  # React DOM entry point
├── index.html                    # Root HTML document
├── package.json                  # Dependencies and npm scripts
├── postcss.config.js             # PostCSS configuration for Tailwind
├── tailwind.config.js            # Tailwind CSS configuration
├── vite.config.js                # Vite build and test configuration
├── RECORDING_GUIDE.md            # 5-minute video demonstration script
└── README.md                     # Documentation and setup instructions
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation

1. Clone or open the repository folder.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:3000
```

### Running the Production Build

Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---