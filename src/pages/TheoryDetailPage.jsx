import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTheory, getRelatedTheories, REGIONS } from '../data/theories';
import { getImageForTheory, getBooksForTheory } from '../data/imagesAndBooks';
import { getElaboration } from '../data/elaborations';
import { getThemeForRegion } from '../data/themes';
import './TheoryDetailPage.css';

export function TheoryDetailPage() {
  const { id } = useParams();
  const [heroImgError, setHeroImgError] = useState(false);
  const theory = getTheory(id);
  const elaboration = theory ? getElaboration(theory.id) : null;
  const theme = theory ? getThemeForRegion(theory.region) : null;
  const imageUrl = theory ? getImageForTheory(theory.id) : null;
  const showHeroImage = imageUrl && !heroImgError;
  const books = theory ? getBooksForTheory(theory.id) : [];
  const related = theory ? getRelatedTheories(theory) : [];
  const regionLabel = theory ? REGIONS.find((r) => r.id === theory.region)?.label : '';

  if (!theory) {
    return (
      <div className="detail-page detail-page--missing">
        <p>This idea wasn’t found.</p>
        <Link to="/">← Back to all ideas</Link>
      </div>
    );
  }

  return (
    <div
      className="detail-page"
      data-region={theory.region}
      style={{
        '--theme-primary': theme?.primary,
        '--theme-primary-light': theme?.primaryLight,
        '--theme-accent': theme?.accent,
        '--theme-accent-muted': theme?.accentMuted,
        '--theme-bg-tint': theme?.bgTint,
        '--theme-gradient': theme?.gradient,
        '--theme-gradient-soft': theme?.gradientSoft,
        '--theme-border': theme?.border,
      }}
    >
      {/* Decorative graphics */}
      <div className="detail-page__graphic detail-page__graphic--topleft" aria-hidden="true" />
      <div className="detail-page__graphic detail-page__graphic--topright" aria-hidden="true" />
      <div className="detail-page__graphic detail-page__graphic--bottom" aria-hidden="true" />

      <header className="detail-page__hero">
        <div className="detail-page__hero-bg" />
        <div className="detail-page__hero-image-wrap">
          {showHeroImage ? (
            <img
              src={imageUrl}
              alt=""
              className="detail-page__hero-image"
              onError={() => setHeroImgError(true)}
            />
          ) : (
            <img
              src="/placeholder.svg"
              alt=""
              className="detail-page__hero-image detail-page__hero-image--placeholder"
            />
          )}
        </div>
        <div className="detail-page__hero-content">
          <Link to="/" className="detail-page__back">
            ← All ideas
          </Link>
          <span className="detail-page__region">{regionLabel}</span>
          <h1 className="detail-page__title">{theory.name}</h1>
          <p className="detail-page__person">
            {theory.person}
            {theory.era && <span className="detail-page__era"> ({theory.era})</span>}
          </p>
          <p className="detail-page__summary">{theory.shortSummary}</p>
        </div>
      </header>

      <main className="detail-page__main">
        {elaboration?.longDescription && (
          <section className="detail-page__section detail-page__section--intro">
            <h2 className="detail-page__section-title">Overview</h2>
            <div className="detail-page__prose">
              {elaboration.longDescription.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        )}

        <section className="detail-page__section">
          <h2 className="detail-page__section-title">Key ideas</h2>
          <ul className="detail-page__key-points">
            {theory.keyPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        {elaboration?.whyItMatters && (
          <section className="detail-page__section detail-page__section--highlight">
            <h2 className="detail-page__section-title">Why it matters</h2>
            <p className="detail-page__prose">{elaboration.whyItMatters}</p>
          </section>
        )}

        {elaboration?.inPractice && (
          <section className="detail-page__section">
            <h2 className="detail-page__section-title">In practice</h2>
            <p className="detail-page__prose">{elaboration.inPractice}</p>
          </section>
        )}

        {books.length > 0 && (
          <section className="detail-page__section">
            <h2 className="detail-page__section-title">Further reading</h2>
            <ul className="detail-page__books">
              {books.map((book, i) => (
                <li key={i}>
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-page__book-link"
                  >
                    <span className="detail-page__book-title">{book.title}</span>
                    {book.author && (
                      <span className="detail-page__book-author"> — {book.author}</span>
                    )}
                    <span className="detail-page__book-arrow"> → Amazon</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="detail-page__section">
            <h2 className="detail-page__section-title">Related ideas</h2>
            <p className="detail-page__related-intro">
              These traditions and theories connect to this one:
            </p>
            <div className="detail-page__related-grid">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/idea/${r.id}`}
                  className="detail-page__related-card"
                >
                  {getImageForTheory(r.id) && (
                    <img
                      src={getImageForTheory(r.id)}
                      alt=""
                      className="detail-page__related-img"
                    />
                  )}
                  <span className="detail-page__related-person">{r.person}</span>
                  <span className="detail-page__related-name">{r.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
