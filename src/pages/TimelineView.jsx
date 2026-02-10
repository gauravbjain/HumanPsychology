import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getTheoriesForTimeline } from '../data/theories';
import { getImageForTheory } from '../data/imagesAndBooks';
import { getThemeForRegion } from '../data/themes';
import '../App.css';
import './TimelineView.css';

export function TimelineView() {
  const items = useMemo(() => getTheoriesForTimeline(), []);

  // Group by period for section headers
  const byPeriod = useMemo(() => {
    const map = new Map();
    items.forEach(({ theory, sortYear, period }) => {
      if (!map.has(period)) map.set(period, []);
      map.get(period).push({ theory, sortYear });
    });
    const order = [
      'Ancient & classical',
      'Before 1800',
      '1800–1850',
      '1850–1900',
      '1900–1920',
      '1920–1950',
      '1950–1980',
      '1980–present',
    ];
    return order.filter((p) => map.has(p)).map((p) => ({ period: p, entries: map.get(p) }));
  }, [items]);

  return (
    <div className="timeline-view">
      <header className="timeline-view__header">
        <div className="timeline-view__header-bg" aria-hidden="true" />
        <div className="timeline-view__header-inner">
          <Link to="/" className="timeline-view__back">
            ← All ideas
          </Link>
          <h1 className="timeline-view__title">Ideas through time</h1>
          <p className="timeline-view__subtitle">
            Psychology’s key ideas and figures in chronological order. Click any card to explore.
          </p>
        </div>
      </header>

      <main className="timeline-view__main">
        <div className="timeline-view__line" aria-hidden="true" />

        {byPeriod.map(({ period, entries }) => (
          <section
            key={period}
            className="timeline-view__period"
            aria-labelledby={`period-${period.replace(/\s|–/g, '-')}`}
          >
            <h2 id={`period-${period.replace(/\s|–/g, '-')}`} className="timeline-view__period-title">
              {period}
            </h2>

            {entries.map(({ theory, sortYear }, index) => {
              const theme = getThemeForRegion(theory.region);
              const imageUrl = getImageForTheory(theory.id);
              const isEven = index % 2 === 0;

              return (
                <article
                  key={theory.id}
                  className={`timeline-view__entry timeline-view__entry--${isEven ? 'left' : 'right'}`}
                  data-region={theory.region}
                  style={{
                    '--entry-accent': theme.accent,
                    '--entry-primary': theme.primary,
                    '--entry-bg-tint': theme.bgTint,
                  }}
                >
                  <div className="timeline-view__dot" style={{ background: theme.accent }} aria-hidden="true" />
                  <Link to={`/idea/${theory.id}`} className="timeline-view__card">
                    <div className="timeline-view__card-inner">
                      {imageUrl && (
                        <div className="timeline-view__card-image-wrap">
                          <img
                            src={imageUrl}
                            alt=""
                            className="timeline-view__card-image"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div className="timeline-view__card-content">
                        <span className="timeline-view__card-era">{theory.era}</span>
                        <h3 className="timeline-view__card-title">{theory.name}</h3>
                        <p className="timeline-view__card-person">{theory.person}</p>
                        <p className="timeline-view__card-summary">{theory.shortSummary}</p>
                        <span className="timeline-view__card-cta">Read full page →</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </section>
        ))}
      </main>
    </div>
  );
}
