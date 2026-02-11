import { Link } from 'react-router-dom';
import { getTheory } from '../data/theories';
import { DIMENSION_LABELS } from '../data/profileEngine';
import './ProfileCard.css';

export function ProfileCard({ profile, onRetake, onExport }) {
  if (!profile) return null;

  const { archetype, dimensions, startingConcepts, learningPace, weekOneCurriculum, recommendedFeatures } = profile;

  return (
    <div className="profile-card">
      {/* ── Archetype Hero ── */}
      <div className="profile-card__hero">
        <span className="profile-card__icon">{archetype.icon}</span>
        <h2 className="profile-card__archetype">{archetype.name}</h2>
        <p className="profile-card__desc">{archetype.description}</p>
        <div className="profile-card__traits">
          <div className="profile-card__trait">
            <span className="profile-card__trait-label">Strength</span>
            <span className="profile-card__trait-value">{archetype.strength}</span>
          </div>
          <div className="profile-card__trait">
            <span className="profile-card__trait-label">Growth edge</span>
            <span className="profile-card__trait-value">{archetype.growthEdge}</span>
          </div>
        </div>
      </div>

      {/* ── Dimensions ── */}
      <div className="profile-card__section">
        <h3 className="profile-card__section-title">Your Dimensions</h3>
        <div className="profile-card__dims">
          {Object.entries(dimensions).map(([key, value]) => {
            const meta = DIMENSION_LABELS[key];
            if (!meta) return null;
            const displayValue = meta.values[value] || value;
            return (
              <div key={key} className="profile-card__dim">
                <span className="profile-card__dim-label">{meta.label}</span>
                <span className="profile-card__dim-value">{displayValue}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Starting Concepts ── */}
      <div className="profile-card__section">
        <h3 className="profile-card__section-title">Start Here</h3>
        <p className="profile-card__section-hint">Your top 3 concepts, chosen for your challenge and awareness level.</p>
        <div className="profile-card__concepts">
          {startingConcepts.map((id, i) => {
            const t = getTheory(id);
            if (!t) return null;
            return (
              <Link key={id} to={`/idea/${id}`} className="profile-card__concept">
                <span className="profile-card__concept-num">{i + 1}</span>
                <div className="profile-card__concept-info">
                  <span className="profile-card__concept-name">{t.name}</span>
                  <span className="profile-card__concept-person">{t.person}</span>
                </div>
                <span className="profile-card__concept-arrow">&rarr;</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Learning Pace ── */}
      <div className="profile-card__section">
        <h3 className="profile-card__section-title">Your Pace</h3>
        <div className="profile-card__pace">
          <span className="profile-card__pace-label">{learningPace.label}</span>
          <p className="profile-card__pace-desc">{learningPace.description}</p>
        </div>
      </div>

      {/* ── Week One Curriculum ── */}
      <div className="profile-card__section">
        <h3 className="profile-card__section-title">Your First Week</h3>
        <p className="profile-card__section-hint">A personalized 7-day learning path based on your profile.</p>
        <ol className="profile-card__curriculum">
          {weekOneCurriculum.map((day) => {
            const t = getTheory(day.theoryId);
            return (
              <li key={day.day} className="profile-card__day">
                <div className="profile-card__day-header">
                  <span className="profile-card__day-num">Day {day.day}</span>
                  <span className="profile-card__day-label">{day.label}</span>
                </div>
                <Link to={`/idea/${day.theoryId}`} className="profile-card__day-theory">
                  {t ? t.name : day.theoryId}
                </Link>
                <p className="profile-card__day-reason">{day.reason}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── Recommended Features ── */}
      {recommendedFeatures.length > 0 && (
        <div className="profile-card__section">
          <h3 className="profile-card__section-title">Recommended For You</h3>
          <div className="profile-card__features">
            {recommendedFeatures.map((f) => (
              <div key={f.id} className="profile-card__feature">
                <span className="profile-card__feature-label">{f.label}</span>
                <span className="profile-card__feature-desc">{f.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Actions ── */}
      <div className="profile-card__actions">
        <button type="button" className="profile-card__btn profile-card__btn--primary" onClick={onExport}>
          Export as PDF
        </button>
        <button type="button" className="profile-card__btn profile-card__btn--secondary" onClick={onRetake}>
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
