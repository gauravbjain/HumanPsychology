import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { THEORIES, REGIONS, SCHOOLS, getTheoriesByRegion, getTheoriesBySchool } from '../data/theories';
import { TheoryCard } from '../components/TheoryCard';
import { ConnectionsView } from '../components/ConnectionsView';
import '../App.css';

export function HomePage() {
  const [regionFilter, setRegionFilter] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [view, setView] = useState('sections');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = regionFilter ? getTheoriesByRegion(regionFilter) : THEORIES;
    if (schoolFilter) list = list.filter((t) => t.school === schoolFilter);
    return list;
  }, [regionFilter, schoolFilter]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__hero" aria-hidden="true">
          <div className="app-header__hero-gradient" />
          <div className="app-header__hero-pattern" />
          <div className="app-header__hero-image" />
        </div>
        <div className="app-header__inner">
          <h1 className="app-title">Psychology Across the World</h1>
          <p className="app-tagline">
            Prominent ideas, the people behind them, and how they connect — in small sections you can grasp.
          </p>
          <nav className="app-nav">
            <button
              type="button"
              className={`app-nav__btn ${view === 'sections' ? 'app-nav__btn--active' : ''}`}
              onClick={() => setView('sections')}
            >
              Browse sections
            </button>
            <button
              type="button"
              className={`app-nav__btn ${view === 'connections' ? 'app-nav__btn--active' : ''}`}
              onClick={() => setView('connections')}
            >
              Explore connections
            </button>
            <button
              type="button"
              className="app-nav__btn"
              onClick={() => navigate('/map')}
            >
              World map
            </button>
            <button
              type="button"
              className="app-nav__btn"
              onClick={() => navigate('/experiments')}
            >
              Try experiments
            </button>
            <button
              type="button"
              className="app-nav__btn"
              onClick={() => navigate('/tools')}
            >
              Practical tools
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {view === 'connections' ? (
          <ConnectionsView onBack={() => setView('sections')} />
        ) : (
          <>
            <aside className="app-filters">
              <div className="app-filters__group">
                <label className="app-filters__label">Filter by tradition</label>
                <select
                  className="app-filters__select"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  <option value="">All traditions ({THEORIES.length})</option>
                  {REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label} ({getTheoriesByRegion(r.id).length})
                    </option>
                  ))}
                </select>
              </div>
              <div className="app-filters__group">
                <label className="app-filters__label">Filter by school of thought</label>
                <select
                  className="app-filters__select"
                  value={schoolFilter}
                  onChange={(e) => setSchoolFilter(e.target.value)}
                >
                  <option value="">All schools ({THEORIES.length})</option>
                  {SCHOOLS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label} ({getTheoriesBySchool(s.id).length})
                    </option>
                  ))}
                </select>
              </div>
              <p className="app-filters__hint">
                {schoolFilter
                  ? SCHOOLS.find((s) => s.id === schoolFilter)?.description
                  : regionFilter
                    ? REGIONS.find((r) => r.id === regionFilter)?.description
                    : 'Psychoanalysis, behaviorism, cognitive, humanistic, evolutionary, and more.'}
              </p>
              <button
                type="button"
                className="app-filters__link"
                onClick={() => setView('connections')}
              >
                See how ideas connect →
              </button>
            </aside>

            <section className="app-grid" aria-label="Psychology theories">
              {filtered.map((theory) => (
                <Link
                  key={theory.id}
                  to={`/idea/${theory.id}`}
                  className="app-grid__link"
                >
                  <TheoryCard theory={theory} asLink />
                </Link>
              ))}
            </section>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          A concise guide to human psychology — from Freud to Ubuntu, behaviorism to mindfulness.
          Click any card to open its full page.
        </p>
      </footer>
    </div>
  );
}
