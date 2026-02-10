import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { THEORIES, getTheory } from '../data/theories';
import { SUGGESTED_COMPARISONS } from '../data/suggestedComparisons';
import { CompareTable } from '../components/CompareTable';
import './ComparePage.css';

function analyzeComparison(theories) {
  if (theories.length < 2) return null;
  const ids = theories.map((t) => t.id);

  // Shared related: theories referenced by 2+ selected theories (excluding the selected ones)
  const relatedCounts = {};
  theories.forEach((t) => {
    (t.relatedIds || []).forEach((rid) => {
      if (!ids.includes(rid)) {
        relatedCounts[rid] = (relatedCounts[rid] || 0) + 1;
      }
    });
  });
  const sharedRelated = Object.entries(relatedCounts)
    .filter(([, count]) => count >= 2)
    .map(([id]) => getTheory(id))
    .filter(Boolean);

  // Mutual contradictions
  const mutualContradictions = [];
  for (let i = 0; i < theories.length; i++) {
    for (let j = i + 1; j < theories.length; j++) {
      const aContra = (theories[i].contradictsIds || []).includes(theories[j].id);
      const bContra = (theories[j].contradictsIds || []).includes(theories[i].id);
      if (aContra || bContra) {
        mutualContradictions.push([theories[i].id, theories[j].id]);
      }
    }
  }

  // Influence chains
  const influenceLinks = [];
  for (let i = 0; i < theories.length; i++) {
    for (let j = 0; j < theories.length; j++) {
      if (i === j) continue;
      if ((theories[j].influencedBy || []).includes(theories[i].id)) {
        influenceLinks.push({ from: theories[i].id, to: theories[j].id });
      }
    }
  }

  const sameRegion = new Set(theories.map((t) => t.region)).size === 1;
  const sameSchool = new Set(theories.map((t) => t.school)).size === 1;

  return { sharedRelated, mutualContradictions, influenceLinks, sameRegion, sameSchool };
}

export function ComparePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [t1, setT1] = useState(searchParams.get('t1') || '');
  const [t2, setT2] = useState(searchParams.get('t2') || '');
  const [t3, setT3] = useState(searchParams.get('t3') || '');

  // Sync URL params
  useEffect(() => {
    const params = {};
    if (t1) params.t1 = t1;
    if (t2) params.t2 = t2;
    if (t3) params.t3 = t3;
    setSearchParams(params, { replace: true });
  }, [t1, t2, t3, setSearchParams]);

  const theories = useMemo(() => {
    return [t1, t2, t3].filter(Boolean).map((id) => getTheory(id)).filter(Boolean);
  }, [t1, t2, t3]);

  const analysis = useMemo(() => analyzeComparison(theories), [theories]);
  const canCompare = theories.length >= 2;

  function handleSuggestion(ids) {
    setT1(ids[0] || '');
    setT2(ids[1] || '');
    setT3(ids[2] || '');
  }

  function renderSelector(value, setter, label, exclude) {
    return (
      <div className="compare-page__selector-group">
        <label className="compare-page__selector-label">{label}</label>
        <select
          className="compare-page__selector-select"
          value={value}
          onChange={(e) => setter(e.target.value)}
        >
          <option value="">Choose a theory...</option>
          {THEORIES.filter((t) => !exclude.includes(t.id)).map((t) => (
            <option key={t.id} value={t.id}>{t.person}: {t.name}</option>
          ))}
        </select>
      </div>
    );
  }

  const exclude1 = [t2, t3].filter(Boolean);
  const exclude2 = [t1, t3].filter(Boolean);
  const exclude3 = [t1, t2].filter(Boolean);

  return (
    <div className="compare-page">
      <header className="compare-page__header">
        <div className="compare-page__header-bg" aria-hidden="true" />
        <div className="compare-page__header-inner">
          <button type="button" className="compare-page__back" onClick={() => navigate('/')}>
            ← Home
          </button>
          <h1 className="compare-page__title">Compare Ideas</h1>
          <p className="compare-page__subtitle">
            Place two or three theories side by side to see where they agree, disagree, and connect.
          </p>
        </div>
      </header>

      <div className="compare-page__selectors">
        {renderSelector(t1, setT1, 'Theory 1', exclude1)}
        {renderSelector(t2, setT2, 'Theory 2', exclude2)}
        {renderSelector(t3, setT3, 'Theory 3 (optional)', exclude3)}
      </div>

      <div className="compare-page__main">
        {canCompare ? (
          <CompareTable theories={theories} analysis={analysis} />
        ) : (
          <p className="compare-page__hint">Select at least two theories above to compare them.</p>
        )}

        <section className="compare-page__suggestions">
          <h2 className="compare-page__suggestions-title">Suggested comparisons</h2>
          <div className="compare-page__suggestion-grid">
            {SUGGESTED_COMPARISONS.map((s) => (
              <button
                key={s.ids.join('-')}
                type="button"
                className="compare-page__suggestion-card"
                onClick={() => handleSuggestion(s.ids)}
              >
                <span className="compare-page__suggestion-label">{s.label}</span>
                <span className="compare-page__suggestion-desc">{s.description}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
