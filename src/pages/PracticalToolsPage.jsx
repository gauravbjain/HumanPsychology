import { useState } from 'react';
import { Link } from 'react-router-dom';
import { THEORIES } from '../data/theories';
import { getElaboration } from '../data/elaborations';
import { GLOBAL_TOOLS } from '../data/practicalTools';
import { getTheory } from '../data/theories';
import '../App.css';
import './PracticalToolsPage.css';

export function PracticalToolsPage() {
  const [openGlobalId, setOpenGlobalId] = useState(null);
  const [openTheoryId, setOpenTheoryId] = useState(null);

  const theoriesWithTools = THEORIES.filter((t) => {
    const el = getElaboration(t.id);
    return el?.practicalTools?.length > 0;
  });

  return (
    <div className="app practical-tools-page">
      <header className="app-header practical-tools-page__header">
        <div className="app-header__hero" aria-hidden="true">
          <div className="app-header__hero-gradient" />
          <div className="app-header__hero-pattern" />
        </div>
        <div className="app-header__inner">
          <Link to="/" className="practical-tools-page__back">
            ← All ideas
          </Link>
          <h1 className="app-title">Practical tools</h1>
          <p className="app-tagline">
            Things you can use right away—from quick exercises to techniques from the ideas in this guide.
          </p>
        </div>
      </header>

      <main className="practical-tools-page__main">
        <section className="practical-tools-page__section" aria-labelledby="tools-global-title">
          <h2 id="tools-global-title" className="practical-tools-page__section-title">Quick tools (use anytime)</h2>
          <ul className="practical-tools-page__list">
            {GLOBAL_TOOLS.map((tool) => {
              const isOpen = openGlobalId === tool.id;
              return (
                <li key={tool.id} className="practical-tools-page__card">
                  <button
                    type="button"
                    className="practical-tools-page__card-head"
                    onClick={() => setOpenGlobalId(isOpen ? null : tool.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="practical-tools-page__card-title">{tool.title}</span>
                    <span className="practical-tools-page__card-meta">{tool.source}</span>
                    <span className="practical-tools-page__card-toggle">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="practical-tools-page__card-body" hidden={!isOpen}>
                    <p className="practical-tools-page__when"><strong>When:</strong> {tool.when}</p>
                    <ol className="practical-tools-page__steps">
                      {tool.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                    {tool.theoryIds?.length > 0 && (
                      <p className="practical-tools-page__links">
                        Explore:{' '}
                        {tool.theoryIds.map((tid) => getTheory(tid)).filter(Boolean).map((t, i) => (
                          <span key={t.id}>
                            {i > 0 && ', '}
                            <Link to={`/idea/${t.id}`} className="practical-tools-page__link">{t.name}</Link>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="practical-tools-page__section" aria-labelledby="tools-ideas-title">
          <h2 id="tools-ideas-title" className="practical-tools-page__section-title">Tools from the ideas</h2>
          <p className="practical-tools-page__section-intro">
            Each idea page may include practical tools. Here are the ones that do:
          </p>
          <ul className="practical-tools-page__list">
            {theoriesWithTools.map((theory) => {
              const el = getElaboration(theory.id);
              const tools = el?.practicalTools || [];
              const isOpen = openTheoryId === theory.id;
              return (
                <li key={theory.id} className="practical-tools-page__card">
                  <button
                    type="button"
                    className="practical-tools-page__card-head"
                    onClick={() => setOpenTheoryId(isOpen ? null : theory.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="practical-tools-page__card-title">{theory.name}</span>
                    <span className="practical-tools-page__card-meta">{theory.person}</span>
                    <span className="practical-tools-page__card-toggle">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="practical-tools-page__card-body" hidden={!isOpen}>
                    <ul className="practical-tools-page__tools-list">
                      {tools.map((tool, i) => (
                        <li key={i}>{tool}</li>
                      ))}
                    </ul>
                    <Link to={`/idea/${theory.id}`} className="practical-tools-page__link">
                      Open full idea →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
