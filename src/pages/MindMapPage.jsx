import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEORIES, REGIONS, SCHOOLS } from '../data/theories';
import { ForceGraph } from '../components/ForceGraph';
import './MindMapPage.css';

export function MindMapPage() {
  const navigate = useNavigate();
  const [regionFilter, setRegionFilter] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Measure container
  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: Math.floor(rect.width), height: Math.floor(rect.height) });
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const filteredTheories = useMemo(() => {
    let list = THEORIES;
    if (regionFilter) list = list.filter((t) => t.region === regionFilter);
    if (schoolFilter) list = list.filter((t) => t.school === schoolFilter);
    return list;
  }, [regionFilter, schoolFilter]);

  return (
    <div className="mind-map-page">
      <header className="mind-map-page__header">
        <div className="mind-map-page__header-bg" aria-hidden="true" />
        <div className="mind-map-page__header-inner">
          <button type="button" className="mind-map-page__back" onClick={() => navigate('/')}>
            ← Home
          </button>
          <h1 className="mind-map-page__title">Mind Map</h1>
          <p className="mind-map-page__subtitle">
            See how all {THEORIES.length} ideas connect. Drag nodes, zoom with scroll, and click to explore relationships.
          </p>
        </div>
      </header>

      <div className="mind-map-page__controls">
        <div className="mind-map-page__filters">
          <div className="mind-map-page__filter-group">
            <label className="mind-map-page__filter-label">Tradition</label>
            <select
              className="mind-map-page__filter-select"
              value={regionFilter}
              onChange={(e) => { setRegionFilter(e.target.value); setSelectedId(null); }}
            >
              <option value="">All ({THEORIES.length})</option>
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label} ({THEORIES.filter((t) => t.region === r.id).length})
                </option>
              ))}
            </select>
          </div>
          <div className="mind-map-page__filter-group">
            <label className="mind-map-page__filter-label">School</label>
            <select
              className="mind-map-page__filter-select"
              value={schoolFilter}
              onChange={(e) => { setSchoolFilter(e.target.value); setSelectedId(null); }}
            >
              <option value="">All schools</option>
              {SCHOOLS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mind-map-page__legend">
          <div className="mind-map-page__legend-item">
            <span className="mind-map-page__legend-line mind-map-page__legend-line--related" />
            <span>Related</span>
          </div>
          <div className="mind-map-page__legend-item">
            <span className="mind-map-page__legend-line mind-map-page__legend-line--contradicts" />
            <span>Contradicts</span>
          </div>
          <div className="mind-map-page__legend-item">
            <span className="mind-map-page__legend-line mind-map-page__legend-line--influenced" />
            <span>Influenced</span>
          </div>
        </div>
      </div>

      <div className="mind-map-page__canvas" ref={containerRef}>
        {dimensions.width > 0 && (
          <ForceGraph
            theories={filteredTheories}
            width={dimensions.width}
            height={dimensions.height}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        )}
      </div>

      <p className="mind-map-page__tip">
        Click a node to highlight its connections. Double-click to open the full theory page. Drag to reposition.
      </p>
    </div>
  );
}
