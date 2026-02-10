// Maps framework/concept names from analysis to app theory ids for "Learn more" links.
// Keys are lowercased substrings; first match wins.


const NAME_TO_ID = [
  ['cognitive dissonance', 'festinger'],
  ['attachment', 'bowlby'],
  ['psychoanalysis', 'freud'],
  ['unconscious', 'freud'],
  ['freud', 'freud'],
  ['classical conditioning', 'pavlov'],
  ['pavlov', 'pavlov'],
  ['operant conditioning', 'skinner'],
  ['skinner', 'skinner'],
  ['behaviorism', 'watson'],
  ['watson', 'watson'],
  ['hierarchy of needs', 'maslow'],
  ['self-actualization', 'maslow'],
  ['maslow', 'maslow'],
  ['person-centered', 'rogers'],
  ['rogers', 'rogers'],
  ['cognitive therapy', 'beck'],
  ['automatic thoughts', 'beck'],
  ['cognitive triad', 'beck'],
  ['beck', 'beck'],
  ['rebt', 'ellis'],
  ['rational emotive', 'ellis'],
  ['ellis', 'ellis'],
  ['social learning', 'bandura'],
  ['self-efficacy', 'bandura'],
  ['bandura', 'bandura'],
  ['learned helplessness', 'seligman'],
  ['positive psychology', 'seligman'],
  ['perma', 'seligman'],
  ['seligman', 'seligman'],
  ['mindfulness', 'eastern-mindfulness'],
  ['buddhist', 'eastern-mindfulness'],
  ['conformity', 'asch'],
  ['asch', 'asch'],
  ['obedience', 'milgram'],
  ['milgram', 'milgram'],
  ['zimbardo', 'zimbardo'],
  ['stanford prison', 'zimbardo'],
  ['evolutionary psychology', 'evolutionary-psych'],
  ['evolutionary', 'evolutionary-psych'],
  ['jung', 'jung'],
  ['archetype', 'jung'],
  ['adler', 'adler'],
  ['individual psychology', 'adler'],
  ['piaget', 'piaget'],
  ['cognitive development', 'piaget'],
  ['vygotsky', 'vygotsky'],
  ['zone of proximal', 'vygotsky'],
  ['zpd', 'vygotsky'],
  ['ubuntu', 'ubuntu'],
  ['confucian', 'confucian'],
  ['yoga psychology', 'yoga-psych'],
  ['liberation psychology', 'liberation-psych'],
  ['fanon', 'fanon'],
  ['indigenous', 'indigenous-holistic'],
];

/**
 * @param {string} frameworkName
 * @returns {string|null} theory id or null
 */
export function getTheoryIdForFramework(frameworkName) {
  if (!frameworkName || typeof frameworkName !== 'string') return null;
  const lower = frameworkName.toLowerCase();
  for (const [keyword, id] of NAME_TO_ID) {
    if (lower.includes(keyword)) return id;
  }
  return null;
}

