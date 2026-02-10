import { Link } from 'react-router-dom';
import { getTheory, SCHOOLS } from '../data/theories';
import { getThemeForRegion, REGION_THEMES } from '../data/themes';
import './CompareTable.css';

function renderChips(ids, sharedSet, mutualSet) {
  if (!ids || ids.length === 0) return <span className="compare-table__empty">None</span>;
  return (
    <div className="compare-table__chips">
      {ids.map((id) => {
        const t = getTheory(id);
        if (!t) return null;
        const isShared = sharedSet?.has(id);
        const isMutual = mutualSet?.has(id);
        let modifier = '';
        if (isMutual) modifier = ' compare-table__chip--mutual';
        else if (isShared) modifier = ' compare-table__chip--shared';
        return (
          <Link key={id} to={`/idea/${id}`} className={`compare-table__chip${modifier}`}>
            {t.person.split(' ').pop()}
          </Link>
        );
      })}
    </div>
  );
}

export function CompareTable({ theories, analysis }) {
  if (!theories || theories.length < 2) return null;

  const sharedRelatedIds = new Set((analysis?.sharedRelated || []).map((t) => t.id));
  const mutualContradictionIds = new Set();
  (analysis?.mutualContradictions || []).forEach(([a, b]) => {
    mutualContradictionIds.add(a);
    mutualContradictionIds.add(b);
  });

  const rows = [
    { key: 'person', label: 'Person' },
    { key: 'region', label: 'Tradition' },
    { key: 'era', label: 'Era' },
    { key: 'school', label: 'School' },
    { key: 'keyPoints', label: 'Key Ideas' },
    { key: 'relatedIds', label: 'Related Theories' },
    { key: 'contradictsIds', label: 'Contradictions' },
  ];

  function renderCell(theory, key) {
    const theme = getThemeForRegion(theory.region);
    switch (key) {
      case 'person':
        return theory.person;
      case 'region':
        return (
          <span className="compare-table__region-badge" style={{ color: theme.accent }}>
            {REGION_THEMES[theory.region]?.icon} {REGION_THEMES[theory.region]?.name || theory.region}
          </span>
        );
      case 'era':
        return theory.era;
      case 'school': {
        const school = SCHOOLS.find((s) => s.id === theory.school);
        return school ? school.label : theory.school;
      }
      case 'keyPoints':
        return (
          <ul className="compare-table__points">
            {(theory.keyPoints || []).map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        );
      case 'relatedIds':
        return renderChips(theory.relatedIds, sharedRelatedIds, null);
      case 'contradictsIds':
        return renderChips(theory.contradictsIds, null, mutualContradictionIds);
      default:
        return null;
    }
  }

  return (
    <div className="compare-table" style={{ '--col-count': theories.length }}>
      {/* Column headers */}
      <div className="compare-table__corner" />
      {theories.map((t) => {
        const theme = getThemeForRegion(t.region);
        return (
          <div
            key={t.id}
            className="compare-table__col-header"
            style={{ '--col-accent': theme.accent, '--col-primary': theme.primary }}
          >
            <span className="compare-table__col-region">{REGION_THEMES[t.region]?.icon} {REGION_THEMES[t.region]?.name}</span>
            <Link to={`/idea/${t.id}`} className="compare-table__col-name">{t.name}</Link>
            <span className="compare-table__col-person">{t.person}</span>
          </div>
        );
      })}

      {/* Data rows */}
      {rows.map((row) => (
        <div key={row.key} className="compare-table__row" role="row">
          <div className="compare-table__row-label">{row.label}</div>
          {theories.map((t) => (
            <div key={t.id} className="compare-table__cell" data-region={t.region}>
              {renderCell(t, row.key)}
            </div>
          ))}
        </div>
      ))}

      {/* Analysis row */}
      {analysis && (
        <div className="compare-table__analysis">
          {analysis.influenceLinks.length > 0 && (
            <p className="compare-table__analysis-item compare-table__analysis-item--influence">
              <strong>Influence:</strong>{' '}
              {analysis.influenceLinks.map((link, i) => {
                const from = getTheory(link.from);
                const to = getTheory(link.to);
                return (
                  <span key={i}>
                    {from?.person.split(' ').pop()} influenced {to?.person.split(' ').pop()}
                    {i < analysis.influenceLinks.length - 1 ? '; ' : ''}
                  </span>
                );
              })}
            </p>
          )}
          {analysis.mutualContradictions.length > 0 && (
            <p className="compare-table__analysis-item compare-table__analysis-item--contradicts">
              <strong>Tensions:</strong>{' '}
              {analysis.mutualContradictions.map(([a, b], i) => {
                const tA = getTheory(a);
                const tB = getTheory(b);
                return (
                  <span key={i}>
                    {tA?.person.split(' ').pop()} vs {tB?.person.split(' ').pop()}
                    {i < analysis.mutualContradictions.length - 1 ? '; ' : ''}
                  </span>
                );
              })}
            </p>
          )}
          {analysis.sharedRelated.length > 0 && (
            <p className="compare-table__analysis-item compare-table__analysis-item--shared">
              <strong>Common ground:</strong> Both connect to{' '}
              {analysis.sharedRelated.map((t, i) => (
                <span key={t.id}>
                  <Link to={`/idea/${t.id}`}>{t.person.split(' ').pop()}</Link>
                  {i < analysis.sharedRelated.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
          {analysis.sameRegion && (
            <p className="compare-table__analysis-item">Same tradition</p>
          )}
          {analysis.sameSchool && (
            <p className="compare-table__analysis-item">Same school of thought</p>
          )}
        </div>
      )}
    </div>
  );
}
