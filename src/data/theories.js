// Psychology theories: prominent ideas + figures, global scope. relatedIds link to other theory ids.

export const REGIONS = [
  { id: 'western', label: 'Western', description: 'European & North American traditions' },
  { id: 'eastern', label: 'Eastern', description: 'Asian & Buddhist traditions' },
  { id: 'african', label: 'African', description: 'African & Afro-diasporic thought' },
  { id: 'latin', label: 'Latin American', description: 'Liberation & community psychology' },
  { id: 'indigenous', label: 'Indigenous', description: 'First peoples & holistic worldviews' },
];

export const THEORIES = [
  // —— Western: Psychoanalysis ——
  {
    id: 'freud',
    name: 'Psychoanalysis & the Unconscious',
    person: 'Sigmund Freud',
    region: 'western',
    era: '1856–1939',
    shortSummary: 'Mental life is driven by unconscious wishes and conflicts; early experience shapes personality.',
    keyPoints: [
      'Unconscious mind holds repressed desires and memories that influence behavior.',
      'Id (pleasure), Ego (reality), Superego (morality) are in constant tension.',
      'Defense mechanisms (denial, projection, repression) protect the ego from anxiety.',
      'Psychosexual stages (oral, anal, phallic, latency, genital) shape development.',
      'Free association and dream analysis can reveal unconscious content.',
    ],
    relatedIds: ['jung', 'adler', 'rogers', 'beck'],
  },
  {
    id: 'jung',
    name: 'Collective Unconscious & Archetypes',
    person: 'Carl Jung',
    region: 'western',
    era: '1875–1961',
    shortSummary: 'Beyond the personal unconscious, we share a collective unconscious filled with universal archetypes.',
    keyPoints: [
      'Collective unconscious: shared, inherited layer of the psyche across humanity.',
      'Archetypes are universal patterns (Hero, Shadow, Anima/Animus, Self).',
      'Individuation: lifelong process of integrating conscious and unconscious into wholeness.',
      'Persona (social mask) vs. Shadow (repressed parts) need balance.',
      'Dreams and myths reveal archetypal material; meaning is central to mental health.',
    ],
    relatedIds: ['freud', 'adler', 'eastern-mindfulness'],
  },
  {
    id: 'adler',
    name: 'Individual Psychology',
    person: 'Alfred Adler',
    region: 'western',
    era: '1870–1937',
    shortSummary: 'Striving for superiority and social interest, not sex or aggression, drive human behavior.',
    keyPoints: [
      'Inferiority feelings are universal; we compensate by striving for significance.',
      'Social interest (Gemeinschaftsgefühl): feeling of belonging and contributing to others.',
      'Birth order and family constellation influence style of life.',
      'Fictional finalism: we are pulled by goals and “as if” fictions we create.',
      'Style of life: unique way each person pursues belonging and mastery.',
    ],
    relatedIds: ['freud', 'jung', 'maslow', 'rogers'],
  },
  // —— Western: Behaviorism ——
  {
    id: 'pavlov',
    name: 'Classical Conditioning',
    person: 'Ivan Pavlov',
    region: 'western',
    era: '1849–1936',
    shortSummary: 'Neutral stimuli can become triggers for reflexes when paired with natural stimuli.',
    keyPoints: [
      'Unconditioned stimulus (e.g. food) → unconditioned response (salivation).',
      'Pair neutral stimulus (bell) with US → eventually bell alone elicits response (conditioned).',
      'Generalization, discrimination, and extinction explain how learning spreads or fades.',
      'Originally studied in dogs; principles apply to emotional and physiological learning.',
    ],
    relatedIds: ['watson', 'skinner', 'beck'],
  },
  {
    id: 'watson',
    name: 'Behaviorism',
    person: 'John B. Watson',
    region: 'western',
    era: '1878–1958',
    shortSummary: 'Psychology should study observable behavior; environment shapes people.',
    keyPoints: [
      '“Give me a dozen healthy infants…” — behavior can be shaped by control of environment.',
      'Rejected introspection and focus on mind; only behavior is measurable.',
      'Emotions can be conditioned (e.g. Little Albert and fear of furry objects).',
      'Stimulus–response (S–R) connections are the building blocks of behavior.',
    ],
    relatedIds: ['pavlov', 'skinner', 'bandura'],
  },
  {
    id: 'skinner',
    name: 'Operant Conditioning',
    person: 'B.F. Skinner',
    region: 'western',
    era: '1904–1990',
    shortSummary: 'Behavior is selected by its consequences: reinforcement and punishment shape what we do.',
    keyPoints: [
      'Reinforcement (positive or negative) increases behavior; punishment decreases it.',
      'Schedules of reinforcement (fixed, variable, ratio, interval) affect learning and persistence.',
      '“Skinner box” and programmed instruction showed precise control of behavior.',
      'Free will is an illusion; behavior is determined by environmental contingencies.',
    ],
    relatedIds: ['pavlov', 'watson', 'bandura', 'seligman'],
  },
  // —— Western: Humanistic ——
  {
    id: 'maslow',
    name: 'Hierarchy of Needs & Self-Actualization',
    person: 'Abraham Maslow',
    region: 'western',
    era: '1908–1970',
    shortSummary: 'Humans are motivated by a hierarchy of needs; growth toward self-actualization is the peak.',
    keyPoints: [
      'Needs hierarchy: physiological → safety → love/belonging → esteem → self-actualization.',
      'Deficiency needs vs. growth needs: we must satisfy lower needs before focusing on growth.',
      'Self-actualizers: creative, accepting, peak experiences, sense of purpose.',
      'Later added self-transcendence beyond the individual.',
    ],
    relatedIds: ['adler', 'rogers', 'seligman', 'eastern-mindfulness'],
  },
  {
    id: 'rogers',
    name: 'Person-Centered Therapy',
    person: 'Carl Rogers',
    region: 'western',
    era: '1902–1987',
    shortSummary: 'People have an innate tendency to grow; empathy and unconditional positive regard enable it.',
    keyPoints: [
      'Actualizing tendency: organism moves toward growth when conditions allow.',
      'Unconditional positive regard, empathy, and congruence are the core conditions for change.',
      'Conditions of worth (from others) can distort self-concept and block growth.',
      '“The good life” is a process, not a fixed state; fully functioning person is open to experience.',
    ],
    relatedIds: ['freud', 'adler', 'maslow', 'beck'],
  },
  // —— Western: Cognitive ——
  {
    id: 'piaget',
    name: 'Stages of Cognitive Development',
    person: 'Jean Piaget',
    region: 'western',
    era: '1896–1980',
    shortSummary: 'Children construct knowledge through stages; thinking changes qualitatively with age.',
    keyPoints: [
      'Sensorimotor (0–2), Preoperational (2–7), Concrete operational (7–11), Formal operational (11+).',
      'Assimilation (fit new info into existing schemes) and accommodation (change schemes).',
      'Object permanence, conservation, and abstract reasoning emerge in sequence.',
      'Active discovery and interaction with the world drive development.',
    ],
    relatedIds: ['vygotsky', 'beck'],
  },
  {
    id: 'vygotsky',
    name: 'Sociocultural Theory',
    person: 'Lev Vygotsky',
    region: 'western',
    era: '1896–1934',
    shortSummary: 'Thinking is shaped by culture and language; learning happens in the zone of proximal development.',
    keyPoints: [
      'Higher mental functions are internalized from social interaction and tools (especially language).',
      'Zone of proximal development (ZPD): what a learner can do with help but not alone.',
      'Scaffolding: skilled others support learning within the ZPD.',
      'Cultural-historical context is essential to understanding development.',
    ],
    relatedIds: ['piaget', 'bandura', 'ubuntu'],
  },
  {
    id: 'beck',
    name: 'Cognitive Therapy & Automatic Thoughts',
    person: 'Aaron T. Beck',
    region: 'western',
    era: '1921–2021',
    shortSummary: 'Depression and anxiety are maintained by distorted automatic thoughts and core beliefs.',
    keyPoints: [
      'Automatic thoughts flow from core beliefs and intermediate assumptions.',
      'Cognitive distortions: all-or-nothing, catastrophizing, mind reading, etc.',
      'Therapy: identify, evaluate, and modify thoughts; test beliefs with behavioral experiments.',
      'Cognitive triad (self, world, future) is negative in depression.',
    ],
    relatedIds: ['ellis', 'freud', 'rogers', 'seligman'],
  },
  {
    id: 'ellis',
    name: 'Rational Emotive Behavior Therapy (REBT)',
    person: 'Albert Ellis',
    region: 'western',
    era: '1913–2007',
    shortSummary: 'Emotional distress comes from irrational beliefs; disputing them leads to healthier emotions.',
    keyPoints: [
      'ABC model: Activating event → Beliefs → emotional/behavioral Consequences.',
      '“Musts” and “shoulds” (e.g. “I must be perfect”) create unnecessary distress.',
      'Disputing irrational beliefs and adopting flexible, preferential thinking.',
      'Humans are fallible; acceptance of self and reality reduces suffering.',
    ],
    relatedIds: ['beck', 'eastern-mindfulness'],
  },
  // —— Western: Social & Learning ——
  {
    id: 'bandura',
    name: 'Social Learning & Self-Efficacy',
    person: 'Albert Bandura',
    region: 'western',
    era: '1925–2021',
    shortSummary: 'We learn by observing others; beliefs about our capability (self-efficacy) shape what we do.',
    keyPoints: [
      'Observational learning: attention, retention, reproduction, motivation.',
      'Bobo doll studies: aggression can be learned by watching models.',
      'Self-efficacy: belief in one’s ability to succeed; affects effort and persistence.',
      'Reciprocal determinism: person, behavior, and environment influence each other.',
    ],
    relatedIds: ['skinner', 'vygotsky', 'watson'],
  },
  {
    id: 'milgram',
    name: 'Obedience to Authority',
    person: 'Stanley Milgram',
    region: 'western',
    era: '1933–1984',
    shortSummary: 'Under authority, ordinary people can inflict harm; situation often overrides personal morals.',
    keyPoints: [
      'Participants instructed to give “shocks” to a learner; many obeyed to dangerous levels.',
      'Proximity to victim, authority presence, and institutional context affected obedience.',
      'Agentic state: people see themselves as agents of authority, not responsible.',
      'Ethics of the studies remain debated; findings on situational power are influential.',
    ],
    relatedIds: ['zimbardo', 'asch'],
  },
  {
    id: 'zimbardo',
    name: 'Stanford Prison Experiment & Situation',
    person: 'Philip Zimbardo',
    region: 'western',
    era: '1933–',
    shortSummary: 'Assigned roles (guard/prisoner) and situation can override personality and produce abuse.',
    keyPoints: [
      'Randomly assigned “guards” and “prisoners” quickly adopted abusive or passive roles.',
      'Situation and system, not only “bad apples,” create harmful behavior.',
      'Deindividuation and diffusion of responsibility contribute to cruelty.',
      'Later work on time perspective and heroism as antidotes.',
    ],
    relatedIds: ['milgram', 'asch'],
  },
  {
    id: 'seligman',
    name: 'Learned Helplessness & Positive Psychology',
    person: 'Martin Seligman',
    region: 'western',
    era: '1942–',
    shortSummary: 'When we learn we cannot control outcomes, we give up; positive psychology studies flourishing.',
    keyPoints: [
      'Learned helplessness: repeated uncontrollable aversive events lead to passivity and depression.',
      'Explanatory style (optimistic vs. pessimistic) affects resilience.',
      'Positive psychology: study of well-being, strengths, meaning, and optimal functioning.',
      'PERMA: Positive emotion, Engagement, Relationships, Meaning, Accomplishment.',
    ],
    relatedIds: ['skinner', 'beck', 'maslow', 'eastern-mindfulness'],
  },
  // —— Eastern ——
  {
    id: 'eastern-mindfulness',
    name: 'Buddhist Psychology & Mindfulness',
    person: 'Buddhist tradition (e.g. Buddha, Nāgārjuna)',
    region: 'eastern',
    era: 'Ancient–present',
    shortSummary: 'Suffering arises from craving and ignorance; mindfulness and insight free the mind.',
    keyPoints: [
      'Four Noble Truths: suffering, its cause (craving/clinging), cessation, path (Eightfold Path).',
      'No fixed self (anattā): experience is process, not a permanent “I.”',
      'Mindfulness (sati): non-judgmental awareness of present experience.',
      'Compassion and equanimity as cultivated qualities; meditation as training.',
    ],
    relatedIds: ['jung', 'maslow', 'rogers', 'beck', 'ellis', 'seligman', 'yoga-psych'],
  },
  {
    id: 'yoga-psych',
    name: 'Yoga Psychology (Patañjali)',
    person: 'Patañjali (Yoga Sūtras)',
    region: 'eastern',
    era: 'Classical India',
    shortSummary: 'The mind’s fluctuations cause suffering; yoga stills the mind and reveals the true self.',
    keyPoints: [
      'Yoga is the cessation of the fluctuations of the mind (citta-vṛtti-nirodha).',
      'Eight limbs: ethics, discipline, posture, breath, withdrawal of senses, concentration, meditation, absorption.',
      'Kleśas (afflictions): ignorance, ego, attachment, aversion, fear of death.',
      'Practice and non-attachment lead to clarity and liberation (kaivalya).',
    ],
    relatedIds: ['eastern-mindfulness', 'confucian'],
  },
  {
    id: 'confucian',
    name: 'Confucian Psychology: Ren & Li',
    person: 'Confucius & Confucian tradition',
    region: 'eastern',
    era: 'Ancient China–present',
    shortSummary: 'Virtue (ren) and ritual (li) in relationship create a harmonious self and society.',
    keyPoints: [
      'Ren (benevolence, humanity): care and respect in relationships; self cultivated in community.',
      'Li (ritual, propriety): appropriate conduct that expresses and shapes virtue.',
      'Self is relational; identity formed through roles (ruler–subject, parent–child, friend–friend).',
      'Education and reflection (e.g. self-examination) support moral development.',
    ],
    relatedIds: ['ubuntu', 'vygotsky', 'yoga-psych'],
  },
  // —— African ——
  {
    id: 'ubuntu',
    name: 'Ubuntu: “I am because we are”',
    person: 'African philosophical tradition (e.g. Tutu, Mbiti)',
    region: 'african',
    era: 'Traditional–present',
    shortSummary: 'Personhood is realized in community; humanity is interconnected.',
    keyPoints: [
      'Ubuntu: humanity is shared; “a person is a person through other persons.”',
      'Community and reciprocity are central to identity and well-being.',
      'Restorative justice and reconciliation (e.g. Truth and Reconciliation) linked to ubuntu.',
      'Contrast with Western individualism; self and other are mutually constitutive.',
    ],
    relatedIds: ['confucian', 'vygotsky', 'fanon', 'liberation-psych'],
  },
  {
    id: 'fanon',
    name: 'Colonial Psychology & Decolonizing the Mind',
    person: 'Frantz Fanon',
    region: 'african',
    era: '1925–1961',
    shortSummary: 'Colonialism distorts identity and mental health; liberation requires political and psychological decolonization.',
    keyPoints: [
      'Black Skin, White Masks: internalized racism and alienation under colonialism.',
      'Colonial system produces psychological alienation and “colonial mentality.”',
      'Violence and revolution as (contested) means of reclaiming agency and identity.',
      'Psychology must address power, race, and structural oppression, not only the individual.',
    ],
    relatedIds: ['ubuntu', 'liberation-psych'],
  },
  // —— Latin American ——
  {
    id: 'liberation-psych',
    name: 'Liberation Psychology',
    person: 'Ignacio Martín-Baró',
    region: 'latin',
    era: '1942–1989',
    shortSummary: 'Psychology should serve the oppressed; social reality and collective action are central.',
    keyPoints: [
      'De-ideologization: uncover how dominant ideas hide oppression.',
      'Conscientization: critical awareness of social reality (influence from Freire).',
      'Preferential option for the oppressed; psychology as tool for liberation.',
      'Social memory and collective trauma; working with communities, not only individuals.',
    ],
    relatedIds: ['fanon', 'ubuntu', 'vygotsky'],
  },
  // —— Indigenous ——
  {
    id: 'indigenous-holistic',
    name: 'Indigenous Holistic Well-Being',
    person: 'Indigenous traditions (diverse peoples)',
    region: 'indigenous',
    era: 'Traditional–present',
    shortSummary: 'Health is balance of mind, body, spirit, and land; community and place are part of the person.',
    keyPoints: [
      'Well-being is holistic: physical, emotional, mental, spiritual, relational, and ecological.',
      'Connection to land, ancestors, and community is central to identity and healing.',
      'Collective and intergenerational trauma; healing is often communal and ceremonial.',
      'Knowledge is passed through story, ceremony, and relationship; respect for elders and nature.',
    ],
    relatedIds: ['ubuntu', 'eastern-mindfulness', 'confucian'],
  },
  // One more for social (Asch)
  {
    id: 'asch',
    name: 'Conformity & Group Pressure',
    person: 'Solomon Asch',
    region: 'western',
    era: '1907–1996',
    shortSummary: 'People often conform to the group even when the group is clearly wrong.',
    keyPoints: [
      'Line-judgment experiments: many participants gave wrong answers to match the group.',
      'Conformity increases with group size (up to a point) and unanimity.',
      'Normative influence (wanting acceptance) vs. informational influence (assuming others are right).',
      'One dissenter can greatly reduce conformity.',
    ],
    relatedIds: ['milgram', 'zimbardo'],
  },
];

export function getTheory(id) {
  return THEORIES.find((t) => t.id === id) || null;
}

export function getTheoriesByRegion(regionId) {
  if (!regionId) return THEORIES;
  return THEORIES.filter((t) => t.region === regionId);
}

export function getRelatedTheories(theory) {
  if (!theory?.relatedIds?.length) return [];
  return theory.relatedIds
    .map((id) => getTheory(id))
    .filter(Boolean);
}
