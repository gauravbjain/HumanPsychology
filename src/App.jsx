import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TheoryDetailPage } from './pages/TheoryDetailPage';
import { MapView } from './pages/MapView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/idea/:id" element={<TheoryDetailPage />} />
      <Route path="/map" element={<MapView />} />
    </Routes>
  );
}

export default App;
