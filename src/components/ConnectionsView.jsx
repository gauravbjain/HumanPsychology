import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { THEORIES, getTheory } from '../data/theories';
import { getImageForTheory } from '../data/imagesAndBooks';
import { TheoryCard } from './TheoryCard';
import './ConnectionsView.css';

export function ConnectionsView({ onBack }) {
  const [centerId, setCenterId] = useState(THEORIES[0]?.id ?? '');
  const { center, related, incoming } = useMemo(() => {
    const c = getTheory(centerId) || THEORIES[0];
    if (!c) return { center: null, related: [], incoming: [] };
    const relatedList = (c.relatedIds || []).map((id) => getTheory(id)).filter(Boolean);
    const incomingList = THEORIES.filter((t) => t.relatedIds?.includes(c.id));
    return { center: c, related: relatedList, incoming: incomingList };
  }, [centerId]);

  if (!center) return null;

  return (
    <div className="connections-view">
      <header className="connections-view__header">
        <button type="button" className="connections-view__back" onClick={onBack}>
          ← All sections
        </button>
        <h2 className="connections-view__title">How ideas connect</h2>
        <p className="connections-view__subtitle">
          Central idea and its links to other traditions
        </p>
        <label className="connections-view__center-label">
          Center on:
          <select
            className="connections-view__center-select"
            value={centerId}
            onChange={(e) => setCenterId(e.target.value)}
          >
            {THEORIES.map((t) => (
              <option key={t.id} value={t.id}>{t.person}: {t.name}</option>
            ))}
          </select>
        </label>
      </header>

      <div className="connections-view__layout">
        <section className="connections-view__incoming">
          <h3>Ideas that connect to this one</h3>
          {incoming.length > 0 ? (
            <div className="connections-view__node-list">
              {incoming.map((t) => (
                <Link
                  key={t.id}
                  to={`/idea/${t.id}`}
                  className="connections-view__node"
                >
                  {getImageForTheory(t.id) && (
                    <img src={getImageForTheory(t.id)} alt="" className="connections-view__node-img" />
                  )}
                  <span className="connections-view__node-text">
                    <span className="connections-view__node-person">{t.person}</span>
                    <span className="connections-view__node-name">{t.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="connections-view__empty">No other theories link here yet.</p>
          )}
        </section>

        <section className="connections-view__center">
          <h3>Central idea</h3>
          <TheoryCard theory={center} />
        </section>

        <section className="connections-view__related">
          <h3>Related ideas (this theory links to)</h3>
          {related.length > 0 ? (
            <div className="connections-view__node-list">
              {related.map((t) => (
                <Link
                  key={t.id}
                  to={`/idea/${t.id}`}
                  className="connections-view__node"
                >
                  {getImageForTheory(t.id) && (
                    <img src={getImageForTheory(t.id)} alt="" className="connections-view__node-img" />
                  )}
                  <span className="connections-view__node-text">
                    <span className="connections-view__node-person">{t.person}</span>
                    <span className="connections-view__node-name">{t.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="connections-view__empty">No outgoing links.</p>
          )}
        </section>
      </div>
    </div>
  );
}
