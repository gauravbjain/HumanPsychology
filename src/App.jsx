import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TheoryDetailPage } from './pages/TheoryDetailPage';
import { TimelineView } from './pages/TimelineView';
import { ExperimentsPage } from './pages/ExperimentsPage';
import { PracticalToolsPage } from './pages/PracticalToolsPage';
import { ApplyPage } from './pages/ApplyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/idea/:id" element={<TheoryDetailPage />} />
      <Route path="/timeline" element={<TimelineView />} />
      <Route path="/experiments" element={<ExperimentsPage />} />
      <Route path="/tools" element={<PracticalToolsPage />} />
      <Route path="/apply" element={<ApplyPage />} />
    </Routes>
  );
}

export default App;
