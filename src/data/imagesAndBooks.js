// Images: stable placeholder URLs (picsum.photos with seed per theory so they always load).
// Replace with your own image URLs or Wikipedia thumb links if you host them.
// Keys match theory id in theories.js.

const PICSUM_BASE = 'https://picsum.photos/seed';

export const THEORY_IMAGES = {
  freud: `${PICSUM_BASE}/freud1/400/250`,
  jung: `${PICSUM_BASE}/jung1/400/250`,
  adler: `${PICSUM_BASE}/adler1/400/250`,
  pavlov: `${PICSUM_BASE}/pavlov1/400/250`,
  watson: `${PICSUM_BASE}/watson1/400/250`,
  skinner: `${PICSUM_BASE}/skinner1/400/250`,
  maslow: `${PICSUM_BASE}/maslow1/400/250`,
  rogers: `${PICSUM_BASE}/rogers1/400/250`,
  piaget: `${PICSUM_BASE}/piaget1/400/250`,
  vygotsky: `${PICSUM_BASE}/vygotsky1/400/250`,
  beck: `${PICSUM_BASE}/beck1/400/250`,
  ellis: `${PICSUM_BASE}/ellis1/400/250`,
  bandura: `${PICSUM_BASE}/bandura1/400/250`,
  milgram: `${PICSUM_BASE}/milgram1/400/250`,
  zimbardo: `${PICSUM_BASE}/zimbardo1/400/250`,
  seligman: `${PICSUM_BASE}/seligman1/400/250`,
  asch: `${PICSUM_BASE}/asch1/400/250`,
  'eastern-mindfulness': `${PICSUM_BASE}/mindfulness1/400/250`,
  'yoga-psych': `${PICSUM_BASE}/yoga1/400/250`,
  confucian: `${PICSUM_BASE}/confucian1/400/250`,
  ubuntu: `${PICSUM_BASE}/ubuntu1/400/250`,
  fanon: `${PICSUM_BASE}/fanon1/400/250`,
  'liberation-psych': `${PICSUM_BASE}/liberation1/400/250`,
  'indigenous-holistic': `${PICSUM_BASE}/indigenous1/400/250`,
  festinger: `${PICSUM_BASE}/festinger1/400/250`,
  bowlby: `${PICSUM_BASE}/bowlby1/400/250`,
  'evolutionary-psych': `${PICSUM_BASE}/evolution1/400/250`,
};

export const THEORY_BOOKS = {
  freud: [
    { title: 'The Interpretation of Dreams', author: 'Sigmund Freud', amazonUrl: 'https://www.amazon.com/s?k=Interpretation+of+Dreams+Freud' },
    { title: 'Introductory Lectures on Psycho-Analysis', author: 'Sigmund Freud', amazonUrl: 'https://www.amazon.com/s?k=Introductory+Lectures+Psychoanalysis+Freud' },
  ],
  jung: [
    { title: 'Man and His Symbols', author: 'Carl Jung', amazonUrl: 'https://www.amazon.com/s?k=Man+and+His+Symbols+Jung' },
    { title: 'The Archetypes and the Collective Unconscious', author: 'Carl Jung', amazonUrl: 'https://www.amazon.com/s?k=Archetypes+Collective+Unconscious+Jung' },
  ],
  adler: [
    { title: 'Understanding Human Nature', author: 'Alfred Adler', amazonUrl: 'https://www.amazon.com/s?k=Understanding+Human+Nature+Adler' },
  ],
  pavlov: [
    { title: 'Conditioned Reflexes', author: 'Ivan Pavlov', amazonUrl: 'https://www.amazon.com/s?k=Conditioned+Reflexes+Pavlov' },
  ],
  watson: [
    { title: 'Behaviorism', author: 'John B. Watson', amazonUrl: 'https://www.amazon.com/s?k=Behaviorism+John+Watson' },
  ],
  skinner: [
    { title: 'Beyond Freedom and Dignity', author: 'B.F. Skinner', amazonUrl: 'https://www.amazon.com/s?k=Beyond+Freedom+and+Dignity+Skinner' },
    { title: 'Science and Human Behavior', author: 'B.F. Skinner', amazonUrl: 'https://www.amazon.com/s?k=Science+and+Human+Behavior+Skinner' },
  ],
  maslow: [
    { title: 'Motivation and Personality', author: 'Abraham Maslow', amazonUrl: 'https://www.amazon.com/s?k=Motivation+and+Personality+Maslow' },
    { title: 'Toward a Psychology of Being', author: 'Abraham Maslow', amazonUrl: 'https://www.amazon.com/s?k=Toward+Psychology+of+Being+Maslow' },
  ],
  rogers: [
    { title: 'On Becoming a Person', author: 'Carl Rogers', amazonUrl: 'https://www.amazon.com/s?k=On+Becoming+a+Person+Rogers' },
    { title: 'Client-Centered Therapy', author: 'Carl Rogers', amazonUrl: 'https://www.amazon.com/s?k=Client+Centered+Therapy+Rogers' },
  ],
  piaget: [
    { title: 'The Psychology of the Child', author: 'Jean Piaget', amazonUrl: 'https://www.amazon.com/s?k=Psychology+of+the+Child+Piaget' },
    { title: 'Psychology (intro textbook)', author: 'e.g. Gleitman, Myers', amazonUrl: 'https://www.amazon.com/s?k=Psychology+introductory+textbook' },
  ],
  vygotsky: [
    { title: 'Mind in Society', author: 'Lev Vygotsky', amazonUrl: 'https://www.amazon.com/s?k=Mind+in+Society+Vygotsky' },
  ],
  beck: [
    { title: 'Cognitive Therapy and the Emotional Disorders', author: 'Aaron T. Beck', amazonUrl: 'https://www.amazon.com/s?k=Cognitive+Therapy+Emotional+Disorders+Beck' },
    { title: 'Feeling Good', author: 'David Burns', amazonUrl: 'https://www.amazon.com/s?k=Feeling+Good+David+Burns' },
  ],
  ellis: [
    { title: 'A Guide to Rational Living', author: 'Albert Ellis', amazonUrl: 'https://www.amazon.com/s?k=Guide+to+Rational+Living+Ellis' },
  ],
  bandura: [
    { title: 'Self-Efficacy: The Exercise of Control', author: 'Albert Bandura', amazonUrl: 'https://www.amazon.com/s?k=Self+Efficacy+Bandura' },
  ],
  milgram: [
    { title: 'Obedience to Authority', author: 'Stanley Milgram', amazonUrl: 'https://www.amazon.com/s?k=Obedience+to+Authority+Milgram' },
  ],
  zimbardo: [
    { title: 'The Lucifer Effect', author: 'Philip Zimbardo', amazonUrl: 'https://www.amazon.com/s?k=Lucifer+Effect+Zimbardo' },
  ],
  seligman: [
    { title: 'Learned Optimism', author: 'Martin Seligman', amazonUrl: 'https://www.amazon.com/s?k=Learned+Optimism+Seligman' },
    { title: 'Flourish', author: 'Martin Seligman', amazonUrl: 'https://www.amazon.com/s?k=Flourish+Seligman' },
  ],
  asch: [
    { title: 'Social Psychology (textbook)', author: 'e.g. Aronson', amazonUrl: 'https://www.amazon.com/s?k=Social+Psychology+textbook' },
  ],
  'eastern-mindfulness': [
    { title: 'The Heart of the Buddha\'s Teaching', author: 'Thich Nhat Hanh', amazonUrl: 'https://www.amazon.com/s?k=Heart+Buddha+Teaching+Thich+Nhat+Hanh' },
    { title: 'Wherever You Go, There You Are', author: 'Jon Kabat-Zinn', amazonUrl: 'https://www.amazon.com/s?k=Wherever+You+Go+There+You+Are+Kabat-Zinn' },
  ],
  'yoga-psych': [
    { title: 'The Yoga Sutras of Patanjali', author: 'various translations', amazonUrl: 'https://www.amazon.com/s?k=Yoga+Sutras+Patanjali' },
  ],
  confucian: [
    { title: 'The Analects', author: 'Confucius', amazonUrl: 'https://www.amazon.com/s?k=Analects+Confucius' },
  ],
  ubuntu: [
    { title: 'No Future Without Forgiveness', author: 'Desmond Tutu', amazonUrl: 'https://www.amazon.com/s?k=No+Future+Without+Forgiveness+Tutu' },
  ],
  fanon: [
    { title: 'Black Skin, White Masks', author: 'Frantz Fanon', amazonUrl: 'https://www.amazon.com/s?k=Black+Skin+White+Masks+Fanon' },
    { title: 'The Wretched of the Earth', author: 'Frantz Fanon', amazonUrl: 'https://www.amazon.com/s?k=Wretched+of+the+Earth+Fanon' },
  ],
  'liberation-psych': [
    { title: 'Writings for a Liberation Psychology', author: 'Ignacio Martín-Baró', amazonUrl: 'https://www.amazon.com/s?k=Liberation+Psychology+Martin-Baro' },
  ],
  'indigenous-holistic': [
    { title: 'Decolonizing Trauma Work', author: 'Renee Linklater', amazonUrl: 'https://www.amazon.com/s?k=Decolonizing+Trauma+Work+Indigenous' },
  ],
  festinger: [
    { title: 'A Theory of Cognitive Dissonance', author: 'Leon Festinger', amazonUrl: 'https://www.amazon.com/s?k=Theory+of+Cognitive+Dissonance+Festinger' },
  ],
  bowlby: [
    { title: 'Attachment', author: 'John Bowlby', amazonUrl: 'https://www.amazon.com/s?k=Attachment+Bowlby' },
    { title: 'The Strange Situation', author: 'Mary Ainsworth', amazonUrl: 'https://www.amazon.com/s?k=Strange+Situation+Ainsworth' },
  ],
  'evolutionary-psych': [
    { title: 'The Evolution of Desire', author: 'David Buss', amazonUrl: 'https://www.amazon.com/s?k=Evolution+of+Desire+Buss' },
  ],
};

export function getImageForTheory(theoryId) {
  return THEORY_IMAGES[theoryId] || null;
}

export function getBooksForTheory(theoryId) {
  return THEORY_BOOKS[theoryId] || [];
}
