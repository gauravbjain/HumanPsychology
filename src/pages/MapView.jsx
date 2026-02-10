import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { THEORIES } from '../data/theories';
import { getMapOrigin } from '../data/mapOrigins';
import { getImageForTheory } from '../data/imagesAndBooks';
import './MapView.css';

// Equirectangular: lon [-180,180], lat [-90,90] -> x,y as percentage 0-100
function coordsToPercent(lon, lat) {
  const x = ((Number(lon) + 180) / 360) * 100;
  const y = ((90 - Number(lat)) / 180) * 100;
  return { x, y };
}

export function MapView() {
  const theoriesWithOrigin = useMemo(
    () => THEORIES.filter((t) => getMapOrigin(t.id)),
    []
  );

  return (
    <div className="map-view">
      <header className="map-view__header">
        <Link to="/" className="map-view__back">
          ← All ideas
        </Link>
        <h1 className="map-view__title">Where ideas originated</h1>
        <p className="map-view__subtitle">
          Click a marker to open the full idea page. Each card shows the originator, time frame, and place.
        </p>
      </header>

      <div className="map-view__map-wrap">
        <div className="map-view__map" role="presentation">
          {/* Equirectangular world map: image (optional) + SVG fallback so map always shows */}
          <div className="map-view__world-bg" />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
            alt=""
            className="map-view__world-img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <svg
            className="map-view__world-svg"
            viewBox="0 0 360 180"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="map-sea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b8c9d9" />
                <stop offset="100%" stopColor="#9badc4" />
              </linearGradient>
            </defs>
            <rect width="360" height="180" fill="url(#map-sea)" />
          </svg>
          {/* Markers positioned by lat/lon */}
          {theoriesWithOrigin.map((theory) => {
            const origin = getMapOrigin(theory.id);
            const imageUrl = getImageForTheory(theory.id);
            if (!origin) return null;
            const [lon, lat] = origin.coordinates;
            const { x, y } = coordsToPercent(lon, lat);
            return (
              <Link
                key={theory.id}
                to={`/idea/${theory.id}`}
                className="map-view__marker"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                title={`${theory.person} (${theory.era}) — ${origin.place}`}
              >
                <span className="map-view__marker-pin" aria-hidden="true" />
                <span className="map-view__marker-card">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt=""
                      className="map-view__marker-img"
                    />
                  ) : (
                    <img
                      src="/placeholder.svg"
                      alt=""
                      className="map-view__marker-img map-view__marker-img--placeholder"
                    />
                  )}
                  <span className="map-view__marker-name">{theory.person}</span>
                  <span className="map-view__marker-era">{theory.era}</span>
                  <span className="map-view__marker-place">{origin.place}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <aside className="map-view__legend">
        <p>
          <strong>{theoriesWithOrigin.length}</strong> ideas with origin locations.
          Click a marker to read more.
        </p>
      </aside>
    </div>
  );
}
