import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EXPERIMENTS } from '../data/experiments';
import { getTheory } from '../data/theories';
import '../App.css';
import './ExperimentsPage.css';

export function ExperimentsPage() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="app experiments-page">
      <header className="app-header experiments-page__header">
        <div className="app-header__hero" aria-hidden="true">
          <div className="app-header__hero-gradient" />
          <div className="app-header__hero-pattern" />
        </div>
        <div className="app-header__inner">
          <Link to="/" className="experiments-page__back">
            ← All ideas
          </Link>
          <h1 className="app-title">Try it yourself</h1>
          <p className="app-tagline">
            Simple experiments you can do on yourself to experience psychology in action. Each links to ideas you can explore further.
          </p>
        </div>
      </header>

      <main className="experiments-page__main">
        <ul className="experiments-page__list" aria-label="Self-experiments">
          {EXPERIMENTS.map((exp) => {
            const isOpen = openId === exp.id;
            return (
              <li key={exp.id} className="experiments-page__card">
                <button
                  type="button"
                  className="experiments-page__card-head"
                  onClick={() => setOpenId(isOpen ? null : exp.id)}
                  aria-expanded={isOpen}
                  aria-controls={`exp-${exp.id}`}
                >
                  <span className="experiments-page__card-title">{exp.title}</span>
                  <span className="experiments-page__card-subtitle">{exp.subtitle}</span>
                  <span className="experiments-page__card-toggle" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={`exp-${exp.id}`}
                  className="experiments-page__card-body"
                  hidden={!isOpen}
                >
                  <p className="experiments-page__description">{exp.description}</p>
                  <div className="experiments-page__steps-wrap">
                    <h4 className="experiments-page__steps-title">Steps</h4>
                    <ol className="experiments-page__steps">
                      {exp.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <p className="experiments-page__takeaway">
                    <strong>Takeaway:</strong> {exp.takeaway}
                  </p>
                  {exp.theoryIds?.length > 0 && (
                    <div className="experiments-page__links">
                      <span className="experiments-page__links-label">Explore these ideas:</span>
                      <ul className="experiments-page__links-list">
                        {exp.theoryIds.map((tid) => {
                          const t = getTheory(tid);
                          return t ? (
                            <li key={tid}>
                              <Link to={`/idea/${tid}`} className="experiments-page__link">
                                {t.person}: {t.name}
                              </Link>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
