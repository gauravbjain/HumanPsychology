/**
 * Profile Engine — maps quiz dimension results to archetypes,
 * starting concepts, learning paths, and week-one curriculum.
 */

// ──────────── Archetypes ────────────

const ARCHETYPES = {
  reflector: {
    name: 'The Reflector',
    icon: '🪞',
    description: 'You look inward before looking out. You process the world through your own emotional landscape, and your greatest insights come from quiet self-examination.',
    strength: 'Deep emotional intelligence and pattern recognition in yourself.',
    growthEdge: 'Sometimes reflection becomes rumination — learning when to stop analyzing and start acting.',
  },
  analyst: {
    name: 'The Analyst',
    icon: '🔬',
    description: 'You seek frameworks, evidence, and logical structures. You believe understanding the mechanism is the first step to changing it.',
    strength: 'Systematic thinking and the ability to detach emotion from analysis.',
    growthEdge: 'Over-intellectualizing can become a way to avoid feeling — balance data with experience.',
  },
  seeker: {
    name: 'The Seeker',
    icon: '🧭',
    description: 'Driven by a hunger to understand the "why" behind everything. You\'re drawn to big questions about human nature, meaning, and the forces that shape us.',
    strength: 'Open-mindedness and a natural curiosity that crosses disciplines and cultures.',
    growthEdge: 'Breadth without depth can leave you scattered — focusing deeply on a few concepts yields more growth.',
  },
  pragmatist: {
    name: 'The Pragmatist',
    icon: '🛠️',
    description: 'You want tools, not theories. Psychology interests you when it helps you act: make better choices, build better habits, navigate real situations.',
    strength: 'Action-orientation and the ability to translate insight into immediate change.',
    growthEdge: 'Skipping the "why" for the "how" can mean applying solutions without fully understanding the problem.',
  },
};

/**
 * Determine archetype from resolved dimensions.
 */
export function determineArchetype(dims) {
  // Scoring heuristic based on dimension combinations
  const scores = { reflector: 0, analyst: 0, seeker: 0, pragmatist: 0 };

  // Introspection level
  if (dims.introspection === 'high') scores.reflector += 3;
  else if (dims.introspection === 'moderate') scores.analyst += 1;
  else scores.pragmatist += 2;

  // Learning style
  if (dims.learningStyle === 'reflection') scores.reflector += 3;
  else if (dims.learningStyle === 'research') scores.analyst += 3;
  else if (dims.learningStyle === 'stories') scores.seeker += 3;
  else if (dims.learningStyle === 'exercises') scores.pragmatist += 3;

  // Self-awareness level
  if (dims.selfAwareness === 'high') scores.reflector += 2;
  else if (dims.selfAwareness === 'developing') scores.seeker += 1;
  else scores.pragmatist += 1;

  // Goal
  if (dims.goal === 'self') scores.reflector += 2;
  else if (dims.goal === 'curiosity') scores.seeker += 2;
  else if (dims.goal === 'professional') scores.pragmatist += 2;
  else if (dims.goal === 'others') scores.analyst += 1;

  // Pick highest
  let best = 'seeker';
  let bestScore = -1;
  Object.entries(scores).forEach(([key, score]) => {
    if (score > bestScore) {
      best = key;
      bestScore = score;
    }
  });

  return ARCHETYPES[best];
}

// ──────────── Learning Pace ────────────

export function determinePace(dims) {
  if (dims.selfAwareness === 'low' || dims.introspection === 'low') {
    return {
      id: 'daily-micro',
      label: 'Daily Micro-Lessons',
      description: 'Short, focused 5-minute reads. One concept per day with a quick reflection prompt. Designed to build the habit of introspection gradually.',
    };
  }
  if (dims.learningStyle === 'research' || dims.introspection === 'high') {
    return {
      id: 'deep-dive',
      label: 'Deep Dives',
      description: 'Longer, comprehensive explorations. 2-3 concepts per week with detailed reading, connections between theories, and structured journaling.',
    };
  }
  return {
    id: 'balanced',
    label: 'Balanced Exploration',
    description: 'Mix of quick reads and deeper sessions. One concept every 2 days, with practical exercises on alternating days.',
  };
}

// ──────────── Starting Concepts (Theory ID Mapping) ────────────

/**
 * Map challenge + selfAwareness + goal to 3 starting theory IDs.
 */
const CONCEPT_MAP = {
  relationships: {
    low: ['bowlby', 'rogers', 'asch'],
    developing: ['bowlby', 'beck', 'adler'],
    high: ['bowlby', 'freud', 'jung'],
  },
  decisions: {
    low: ['festinger', 'bandura', 'skinner'],
    developing: ['festinger', 'beck', 'piaget'],
    high: ['festinger', 'ellis', 'evolutionary-psych'],
  },
  emotions: {
    low: ['beck', 'rogers', 'eastern-mindfulness'],
    developing: ['beck', 'ellis', 'seligman'],
    high: ['ellis', 'freud', 'eastern-mindfulness'],
  },
  motivation: {
    low: ['maslow', 'skinner', 'bandura'],
    developing: ['maslow', 'adler', 'seligman'],
    high: ['maslow', 'adler', 'liberation-psych'],
  },
  'social-anxiety': {
    low: ['asch', 'bandura', 'rogers'],
    developing: ['asch', 'milgram', 'beck'],
    high: ['asch', 'zimbardo', 'eastern-mindfulness'],
  },
};

export function getStartingConcepts(dims) {
  const byChallenge = CONCEPT_MAP[dims.challenge] || CONCEPT_MAP.emotions;
  return byChallenge[dims.selfAwareness] || byChallenge.developing;
}

// ──────────── Recommended Features ────────────

export function getRecommendedFeatures(dims) {
  const features = [];

  if (dims.selfAwareness === 'low') {
    features.push({ id: 'reflection-prompts', label: 'Reflection Prompts', description: 'Guided questions after each concept to help you connect theory to your own life.' });
  }
  if (dims.learningStyle === 'reflection' || dims.introspection === 'high') {
    features.push({ id: 'journaling', label: 'Journaling', description: 'Use the Apply to Your Life feature to write about situations and get psychological insights.' });
  }
  if (dims.learningStyle === 'exercises') {
    features.push({ id: 'experiments', label: 'Try Experiments', description: 'Hands-on psychology exercises you can do right now.' });
  }
  if (dims.learningStyle === 'stories') {
    features.push({ id: 'case-studies', label: 'Case Studies', description: 'Start each concept by reading the real-world scenarios section.' });
  }
  if (dims.goal === 'others') {
    features.push({ id: 'spot-in-others', label: 'Spot It In Others', description: 'Pay attention to the "In Practice" section of each theory — it shows how patterns appear in people around you.' });
  }
  if (dims.goal === 'professional') {
    features.push({ id: 'workplace', label: 'Workplace Applications', description: 'Focus on the practical tools and strategies sections — they translate directly to work situations.' });
  }
  if (dims.learningStyle === 'research') {
    features.push({ id: 'further-reading', label: 'Further Reading', description: 'Each theory page includes book recommendations for deeper academic study.' });
  }

  // Always recommend at least 2
  if (features.length < 2) {
    features.push({ id: 'connections', label: 'Explore Connections', description: 'Use the Mind Map to see how your starting concepts connect to the broader landscape of psychology.' });
  }

  return features;
}

// ──────────── Week One Curriculum ────────────

const CURRICULUM_REASONS = {
  bowlby: { self: 'Understanding your early attachment patterns reveals why you connect (or disconnect) the way you do.', others: 'Learn to recognize attachment styles in the people you care about.', professional: 'Attachment dynamics show up in team trust and leadership loyalty.', curiosity: 'One of psychology\'s most elegant theories — evolution meets emotion.' },
  rogers: { self: 'Rogers believed you have everything you need to grow — this framework helps you trust that.', others: 'The three core conditions (empathy, genuineness, acceptance) are a blueprint for helping anyone.', professional: 'Person-centered principles transform management conversations.', curiosity: 'A radical counterpoint to Freud that reshaped therapy worldwide.' },
  beck: { self: 'Your thoughts aren\'t facts. Beck\'s framework helps you catch the distortions that shape your mood.', others: 'Understanding cognitive distortions helps you see why people react the way they do.', professional: 'CBT techniques are the most evidence-based tools for workplace stress management.', curiosity: 'The foundation of the most-studied therapy approach in history.' },
  ellis: { self: 'Ellis cuts through rumination — your beliefs, not events, create your emotional reactions.', others: 'The ABC model helps you guide others through emotional reactions.', professional: 'Disputing irrational beliefs is a core coaching and negotiation skill.', curiosity: 'A brash, provocative thinker who challenged the therapy establishment.' },
  freud: { self: 'Whether you agree or not, Freud\'s concepts (defense mechanisms, unconscious motives) illuminate hidden drivers.', others: 'Understanding projection and transference transforms how you read people.', professional: 'Defense mechanisms are everywhere in organizational politics.', curiosity: 'The origin story of modern psychology — love him or hate him, you need to know him.' },
  jung: { self: 'Jung\'s archetypes and shadow work are powerful tools for self-discovery.', others: 'Archetypes help you understand universal patterns in people\'s behavior.', professional: 'Persona vs. shadow dynamics drive leadership blind spots.', curiosity: 'A bridge between Western psychology and Eastern mysticism.' },
  adler: { self: 'Your drive to overcome inferiority feelings shapes more of your behavior than you think.', others: 'Adler\'s framework explains why people compensate and strive.', professional: 'Birth order and lifestyle concepts are surprisingly useful in team dynamics.', curiosity: 'The underrated third pillar of depth psychology, between Freud and Jung.' },
  maslow: { self: 'Map your needs hierarchy to understand what\'s actually missing in your life right now.', others: 'People can\'t grow until their basic needs are met — this changes how you support others.', professional: 'The most-used motivational framework in management for good reason.', curiosity: 'A theory so elegant it changed how we think about human potential.' },
  festinger: { self: 'The discomfort you feel when your actions contradict your beliefs? That\'s dissonance — and understanding it gives you power.', others: 'See why people double down on bad decisions instead of admitting mistakes.', professional: 'Cognitive dissonance is the hidden engine of organizational resistance to change.', curiosity: 'One of the most replicated and fascinating findings in all of psychology.' },
  bandura: { self: 'Your belief in your own capability shapes what you attempt and achieve.', others: 'Self-efficacy is the best predictor of whether someone will change.', professional: 'Building self-efficacy in teams is a superpower for leaders.', curiosity: 'Bridged behaviorism and cognition — a quiet revolution in psychology.' },
  seligman: { self: 'If you feel stuck, learned helplessness might explain why — and positive psychology offers the exit.', others: 'Understanding flourishing helps you support others beyond just fixing problems.', professional: 'PERMA is a research-backed framework for workplace well-being.', curiosity: 'The psychologist who pivoted from studying suffering to studying thriving.' },
  skinner: { self: 'Your habits are shaped by reinforcement patterns you may not be aware of.', others: 'Reinforcement schedules explain addictive behaviors and persistent habits.', professional: 'Incentive design is applied Skinner — every org uses it.', curiosity: 'The most controversial and misunderstood behaviorist — deeper than "rats in boxes."' },
  asch: { self: 'You conform more than you think — Asch reveals the invisible pull of group pressure.', others: 'Understanding conformity helps you see when others are going along to get along.', professional: 'Groupthink in meetings is Asch conformity at scale.', curiosity: 'Elegant experiments that revealed a fundamental truth about social influence.' },
  milgram: { self: 'Milgram forces you to ask: would I obey? The answer is more uncomfortable than you\'d think.', others: 'Authority dynamics shape behavior in every relationship.', professional: 'Understanding obedience is critical for ethical leadership.', curiosity: 'The most famous and disturbing experiment in psychology\'s history.' },
  zimbardo: { self: 'Your behavior is shaped more by your situation than your character — and that\'s both terrifying and freeing.', others: 'The power of roles and systems in shaping behavior.', professional: 'Systems thinking in organizations: why good people do bad things.', curiosity: 'The Stanford Prison Experiment — psychology\'s most debated study.' },
  piaget: { self: 'How you think now was built in stages — understanding them reveals your cognitive strengths and gaps.', others: 'Piaget\'s stages are essential for understanding children and learning.', professional: 'Stage theory transforms how you design training and onboarding.', curiosity: 'The developmental psychologist who changed how we think about thinking.' },
  vygotsky: { self: 'Growth happens in the zone between what you can do alone and what you can do with help.', others: 'Scaffolding is the most powerful teaching concept ever formulated.', professional: 'ZPD is a framework for mentoring and professional development.', curiosity: 'A Soviet psychologist who died at 37 but reshaped education worldwide.' },
  'eastern-mindfulness': { self: 'Mindfulness isn\'t relaxation — it\'s seeing your own mind clearly, without judgment.', others: 'Understanding Buddhist psychology deepens empathy and presence with others.', professional: 'Mindfulness-based interventions are now mainstream in corporate well-being.', curiosity: '2,500 years of psychological insight predating Western psychology.' },
  'yoga-psych': { self: 'The five kleshas (afflictions) map perfectly to modern sources of psychological distress.', others: 'Understanding yoga psychology adds a body-mind perspective to helping others.', professional: 'Breathwork and embodiment practices are evidence-based stress tools.', curiosity: 'A sophisticated psychology system embedded in an ancient physical practice.' },
  'evolutionary-psych': { self: 'Your anxieties, jealousies, and social instincts are ancient adaptations — not character flaws.', others: 'Evolutionary lenses explain universal human behaviors across cultures.', professional: 'Understanding evolved biases improves decision-making in any context.', curiosity: 'The most ambitious attempt to explain why humans are the way we are.' },
  ubuntu: { self: 'Your identity isn\'t just individual — it\'s built in relationship and community.', others: 'Ubuntu is a philosophy of radical interconnection that transforms how you see others.', professional: 'Communal identity challenges Western individualism in powerful ways for teams.', curiosity: 'A living philosophy that underpinned South Africa\'s Truth and Reconciliation.' },
  fanon: { self: 'If you\'ve ever felt your identity shaped by others\' perceptions, Fanon understood that deeply.', others: 'Fanon\'s work illuminates how systems shape individual psychology.', professional: 'Essential reading for anyone working in diverse, cross-cultural contexts.', curiosity: 'A psychiatrist-revolutionary whose ideas reshaped postcolonial thought.' },
  'liberation-psych': { self: 'Your personal struggles may have structural roots — liberation psychology names that.', others: 'Conscientization helps communities understand their own conditions.', professional: 'Critical for anyone working with marginalized populations.', curiosity: 'Psychology as a tool for social justice, not just individual adjustment.' },
  'indigenous-holistic': { self: 'Healing includes your connection to land, ancestors, and community — not just your thoughts.', others: 'Holistic well-being models offer what Western psychology often misses.', professional: 'Culturally responsive practice requires understanding indigenous perspectives.', curiosity: 'The oldest psychological traditions on Earth, still vital today.' },
  confucian: { self: 'Your virtues are built through practice and relationship, not discovered in isolation.', others: 'Confucian relational ethics offer a framework for harmonious interaction.', professional: 'Understanding Confucian values is essential for East Asian business contexts.', curiosity: 'A 2,500-year-old system that shaped billions of people\'s psychological lives.' },
};

function getReasonForTheory(theoryId, goal) {
  const reasons = CURRICULUM_REASONS[theoryId];
  if (!reasons) return 'This concept connects to your primary challenge and will build understanding.';
  return reasons[goal] || reasons.self || reasons.curiosity;
}

/**
 * Build a 7-day curriculum from the starting concepts + related theories.
 */
export function buildCurriculum(startingConcepts, dims) {
  const goal = dims.goal || 'self';

  // Learning path extensions based on challenge
  const EXTENSIONS = {
    relationships: ['ubuntu', 'eastern-mindfulness', 'vygotsky', 'adler'],
    decisions: ['piaget', 'bandura', 'evolutionary-psych', 'skinner'],
    emotions: ['maslow', 'yoga-psych', 'seligman', 'rogers'],
    motivation: ['skinner', 'beck', 'festinger', 'vygotsky'],
    'social-anxiety': ['rogers', 'seligman', 'ubuntu', 'maslow'],
  };

  const extensions = EXTENSIONS[dims.challenge] || EXTENSIONS.emotions;

  // Build day sequence: 3 starting concepts + 4 extension concepts (avoiding duplicates)
  const used = new Set(startingConcepts);
  const remaining = extensions.filter((id) => !used.has(id));

  const sequence = [...startingConcepts];
  for (const id of remaining) {
    if (sequence.length >= 7) break;
    sequence.push(id);
    used.add(id);
  }

  // Fill to 7 if needed
  const FALLBACK = ['jung', 'freud', 'maslow', 'eastern-mindfulness', 'beck', 'seligman', 'bandura'];
  for (const id of FALLBACK) {
    if (sequence.length >= 7) break;
    if (!used.has(id)) {
      sequence.push(id);
      used.add(id);
    }
  }

  const dayLabels = [
    'Foundation',
    'Building awareness',
    'Going deeper',
    'New perspective',
    'Expanding the frame',
    'Connecting ideas',
    'Integration',
  ];

  return sequence.slice(0, 7).map((theoryId, i) => ({
    day: i + 1,
    label: dayLabels[i],
    theoryId,
    reason: getReasonForTheory(theoryId, goal),
  }));
}

// ──────────── Main Profile Builder ────────────

/**
 * Build a complete profile from resolved dimensions.
 * @param {object} dims — { selfAwareness, challenge, learningStyle, introspection, goal }
 * @returns {object} Full profile object
 */
export function buildProfile(dims) {
  const archetype = determineArchetype(dims);
  const pace = determinePace(dims);
  const startingConcepts = getStartingConcepts(dims);
  const recommendedFeatures = getRecommendedFeatures(dims);
  const weekOneCurriculum = buildCurriculum(startingConcepts, dims);

  return {
    archetype,
    dimensions: dims,
    startingConcepts,
    learningPace: pace,
    weekOneCurriculum,
    recommendedFeatures,
  };
}

// ──────────── Dimension Labels (for display) ────────────

export const DIMENSION_LABELS = {
  selfAwareness: {
    label: 'Self-Awareness',
    values: { low: 'Emerging', developing: 'Developing', high: 'Strong' },
  },
  challenge: {
    label: 'Primary Challenge',
    values: { relationships: 'Relationships', decisions: 'Decision-Making', emotions: 'Emotional Regulation', motivation: 'Motivation', 'social-anxiety': 'Social Anxiety' },
  },
  learningStyle: {
    label: 'Learning Style',
    values: { stories: 'Stories & Examples', research: 'Research & Data', reflection: 'Self-Reflection', exercises: 'Practical Exercises' },
  },
  introspection: {
    label: 'Introspection Comfort',
    values: { low: 'Action-Oriented', moderate: 'Balanced', high: 'Deeply Reflective' },
  },
  goal: {
    label: 'Application Goal',
    values: { self: 'Understand Myself', others: 'Help Others', professional: 'Professional Growth', curiosity: 'Pure Curiosity' },
  },
};
