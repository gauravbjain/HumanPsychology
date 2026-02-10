import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getRelatedTheories } from '../data/theories';
import { getImageForTheory, getBooksForTheory } from '../data/imagesAndBooks';
import './TheoryCard.css';

export function TheoryCard({ theory, onSelectRelated, isCompact, asLink }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const related = getRelatedTheories(theory);
  const imageUrl = getImageForTheory(theory.id);
  const books = getBooksForTheory(theory.id);
  const isLinkMode = asLink && !isCompact;

  return (
    <article
      className={`theory-card ${expanded ? 'theory-card--expanded' : ''} ${isCompact ? 'theory-card--compact' : ''} ${isLinkMode ? 'theory-card--link' : ''}`}
      data-region={theory.region}
    >
      <div className="theory-card__image-wrap">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt=""
            className="theory-card__image"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src="/placeholder.svg"
            alt=""
            className="theory-card__image theory-card__image--placeholder"
          />
        )}
      </div>
      <header className="theory-card__header" onClick={!isLinkMode ? () => setExpanded(!expanded) : undefined}>
        <span className="theory-card__region">{theory.region}</span>
        <h3 className="theory-card__name">{theory.name}</h3>
        <p className="theory-card__person">
          <span className="theory-card__person-label">Figure:</span> {theory.person}
          {theory.era && <span className="theory-card__era"> ({theory.era})</span>}
        </p>
        <p className="theory-card__summary">{theory.shortSummary}</p>
        {!isLinkMode && (
          <button type="button" className="theory-card__toggle" aria-expanded={expanded}>
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
        {isLinkMode && (
          <span className="theory-card__read-more">Read full page →</span>
        )}
      </header>

      {!isLinkMode && expanded && (
        <div className="theory-card__body">
          <section className="theory-card__points">
            <h4>Key ideas</h4>
            <ul>
              {theory.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>

          {books.length > 0 && (
            <section className="theory-card__books">
              <h4>Further reading</h4>
              <ul className="theory-card__books-list">
                {books.map((book, i) => (
                  <li key={i}>
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theory-card__book-link"
                    >
                      <span className="theory-card__book-title">{book.title}</span>
                      {book.author && <span className="theory-card__book-author"> — {book.author}</span>}
                      <span className="theory-card__book-arrow"> → Amazon</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="theory-card__related">
              <h4>How this connects</h4>
              <p className="theory-card__related-intro">
                These ideas relate to other traditions and theories:
              </p>
              <div className="theory-card__related-list">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/idea/${r.id}`}
                    className="theory-card__related-chip"
                  >
                    {r.person}: {r.name}
                  </Link>
                ))}
              </div>
            </section>
          )}
          <Link to={`/idea/${theory.id}`} className="theory-card__detail-link">
            View full page →
          </Link>
        </div>
      )}
    </article>
  );
}
