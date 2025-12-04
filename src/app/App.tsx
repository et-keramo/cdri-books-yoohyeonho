import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../shared/ui/layout';
import { SearchPage } from '../pages/search';
import { FavoritesPage } from '../pages/favorites';
import './styles/App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/search" replace />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
