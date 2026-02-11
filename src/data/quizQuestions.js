/**
 * "Who Am I" Psychology Profile Quiz — 18 scenario-based questions.
 *
 * Each answer contributes scores to one or more of 5 dimensions:
 *   selfAwareness : 'low' | 'developing' | 'high'
 *   challenge     : 'relationships' | 'decisions' | 'emotions' | 'motivation' | 'social-anxiety'
 *   learningStyle : 'stories' | 'research' | 'reflection' | 'exercises'
 *   introspection : 'low' | 'moderate' | 'high'
 *   goal          : 'self' | 'others' | 'professional' | 'curiosity'
 *
 * Scoring uses a tally system — each answer adds points to relevant buckets.
 * After all questions, the highest-scoring value in each dimension wins.
 */

export const QUIZ_QUESTIONS = [
  // ──────────── Self-Awareness (Q1–Q4) ────────────
  {
    id: 1,
    dimension: 'selfAwareness',
    scenario: 'When someone criticizes you, what typically happens?',
    options: [
      { label: 'I replay the conversation for days', scores: { selfAwareness: { developing: 1 }, challenge: { emotions: 1 } } },
      { label: 'I immediately dismiss it', scores: { selfAwareness: { low: 1 } } },
      { label: 'I consider whether it\'s valid, then decide', scores: { selfAwareness: { high: 1 }, introspection: { high: 1 } } },
      { label: 'I get defensive in the moment but reflect later', scores: { selfAwareness: { developing: 1 }, introspection: { moderate: 1 } } },
    ],
  },
  {
    id: 2,
    dimension: 'selfAwareness',
    scenario: 'You made a bad decision last week. Right now you\'re most likely to…',
    options: [
      { label: 'Beat myself up about it', scores: { selfAwareness: { developing: 1 }, challenge: { emotions: 1 } } },
      { label: 'Rationalize why it made sense at the time', scores: { selfAwareness: { low: 1 } } },
      { label: 'Analyze what led to it and what I\'d do differently', scores: { selfAwareness: { high: 1 }, challenge: { decisions: 1 } } },
      { label: 'Avoid thinking about it', scores: { selfAwareness: { low: 1 }, introspection: { low: 1 } } },
    ],
  },
  {
    id: 3,
    dimension: 'selfAwareness',
    scenario: 'A friend asks why you reacted so strongly to something minor. You…',
    options: [
      { label: 'Feel confused — you hadn\'t noticed it was strong', scores: { selfAwareness: { low: 1 } } },
      { label: 'Can explain exactly what triggered you and why', scores: { selfAwareness: { high: 1 }, introspection: { high: 1 } } },
      { label: 'Know it\'s connected to something deeper but can\'t quite name it', scores: { selfAwareness: { developing: 1 } } },
      { label: 'Get annoyed that they\'re pointing it out', scores: { selfAwareness: { low: 1 }, challenge: { relationships: 1 } } },
    ],
  },
  {
    id: 4,
    dimension: 'selfAwareness',
    scenario: 'You keep ending up in the same kind of argument. You think…',
    options: [
      { label: 'It\'s mostly the other person\'s fault', scores: { selfAwareness: { low: 1 }, challenge: { relationships: 1 } } },
      { label: 'I notice the pattern but don\'t know how to break it', scores: { selfAwareness: { developing: 1 }, challenge: { relationships: 1 } } },
      { label: 'I\'ve identified my role in it and I\'m working on it', scores: { selfAwareness: { high: 1 } } },
      { label: 'I just try to avoid those situations now', scores: { selfAwareness: { low: 1 }, challenge: { 'social-anxiety': 1 } } },
    ],
  },

  // ──────────── Primary Challenge (Q5–Q8) ────────────
  {
    id: 5,
    dimension: 'challenge',
    scenario: 'You\'re stressed right now. What does that most look like?',
    options: [
      { label: 'Tension in a close relationship that I can\'t resolve', scores: { challenge: { relationships: 2 } } },
      { label: 'Paralysis — too many options and I can\'t choose', scores: { challenge: { decisions: 2 } } },
      { label: 'Mood swings or emotional overwhelm I can\'t control', scores: { challenge: { emotions: 2 } } },
      { label: 'Feeling stuck with zero motivation to do anything', scores: { challenge: { motivation: 2 } } },
    ],
  },
  {
    id: 6,
    dimension: 'challenge',
    scenario: 'At a party, you\'re most likely to feel…',
    options: [
      { label: 'Worried people are judging me', scores: { challenge: { 'social-anxiety': 2 } } },
      { label: 'Energized but drained afterward', scores: { challenge: { emotions: 1 } } },
      { label: 'Frustrated if conversations stay shallow', scores: { challenge: { relationships: 1 }, introspection: { high: 1 } } },
      { label: 'Fine — I\'m more focused on other areas of life right now', scores: { challenge: { motivation: 1 } } },
    ],
  },
  {
    id: 7,
    dimension: 'challenge',
    scenario: 'You have an important deadline in two days. You haven\'t started. What\'s going on?',
    options: [
      { label: 'I\'m procrastinating because the task feels meaningless', scores: { challenge: { motivation: 2 } } },
      { label: 'I can\'t decide which approach to take', scores: { challenge: { decisions: 2 } } },
      { label: 'I\'m distracted by an argument I had earlier', scores: { challenge: { relationships: 1 }, challenge2: { emotions: 1 } } },
      { label: 'I\'m anxious about not doing it perfectly', scores: { challenge: { 'social-anxiety': 1 }, challenge2: { emotions: 1 } } },
    ],
  },
  {
    id: 8,
    dimension: 'challenge',
    scenario: 'Which of these frustrates you most about yourself?',
    options: [
      { label: 'I keep choosing the wrong people to trust', scores: { challenge: { relationships: 2 } } },
      { label: 'I overthink everything before acting', scores: { challenge: { decisions: 2 } } },
      { label: 'My emotions hijack my actions before I can think', scores: { challenge: { emotions: 2 } } },
      { label: 'I know what I should do but can\'t get myself to do it', scores: { challenge: { motivation: 2 } } },
    ],
  },

  // ──────────── Learning Style (Q9–Q12) ────────────
  {
    id: 9,
    dimension: 'learningStyle',
    scenario: 'You want to understand why people lie. You\'d rather…',
    options: [
      { label: 'Read a story about a famous con artist and what drove them', scores: { learningStyle: { stories: 2 } } },
      { label: 'See the research data on when and why people deceive', scores: { learningStyle: { research: 2 } } },
      { label: 'Journal about times you\'ve been dishonest and why', scores: { learningStyle: { reflection: 2 } } },
      { label: 'Try a lying-detection exercise with a friend', scores: { learningStyle: { exercises: 2 } } },
    ],
  },
  {
    id: 10,
    dimension: 'learningStyle',
    scenario: 'A new idea clicks for you best when…',
    options: [
      { label: 'Someone tells me a real-life example of it in action', scores: { learningStyle: { stories: 2 } } },
      { label: 'I see the evidence and studies behind it', scores: { learningStyle: { research: 2 } } },
      { label: 'I connect it to my own experience quietly', scores: { learningStyle: { reflection: 2 } } },
      { label: 'I can immediately try it and see if it works', scores: { learningStyle: { exercises: 2 } } },
    ],
  },
  {
    id: 11,
    dimension: 'learningStyle',
    scenario: 'You\'re bored on a Sunday. You reach for…',
    options: [
      { label: 'A biography or true-crime podcast', scores: { learningStyle: { stories: 1 } } },
      { label: 'A Wikipedia rabbit hole on some phenomenon', scores: { learningStyle: { research: 1 }, goal: { curiosity: 1 } } },
      { label: 'A notebook — write down what\'s on my mind', scores: { learningStyle: { reflection: 1 }, introspection: { high: 1 } } },
      { label: 'A new recipe, workout, or DIY project', scores: { learningStyle: { exercises: 1 } } },
    ],
  },
  {
    id: 12,
    dimension: 'learningStyle',
    scenario: 'You just learned about a cognitive bias. Your first instinct is to…',
    options: [
      { label: 'Think of someone famous who fell for it', scores: { learningStyle: { stories: 1 } } },
      { label: 'Look up the original study and sample size', scores: { learningStyle: { research: 1 } } },
      { label: 'Ask "where has this bias affected *my* choices?"', scores: { learningStyle: { reflection: 1 }, selfAwareness: { high: 1 } } },
      { label: 'Design a small experiment to test it on myself', scores: { learningStyle: { exercises: 1 } } },
    ],
  },

  // ──────────── Introspection Comfort (Q13–Q15) ────────────
  {
    id: 13,
    dimension: 'introspection',
    scenario: 'A therapist asks "How does that make you feel?" You…',
    options: [
      { label: 'Freeze — I genuinely don\'t know', scores: { introspection: { low: 2 } } },
      { label: 'Can name the feeling but it\'s uncomfortable to sit with it', scores: { introspection: { moderate: 2 } } },
      { label: 'Welcome the question — I find it clarifying', scores: { introspection: { high: 2 } } },
      { label: 'Deflect with humor or change the subject', scores: { introspection: { low: 1 }, selfAwareness: { low: 1 } } },
    ],
  },
  {
    id: 14,
    dimension: 'introspection',
    scenario: 'Before sleep, your mind usually…',
    options: [
      { label: 'Plans tomorrow — I think about tasks, not feelings', scores: { introspection: { low: 1 } } },
      { label: 'Replays the day — what went right, what went wrong', scores: { introspection: { moderate: 1 }, selfAwareness: { developing: 1 } } },
      { label: 'Explores big questions about myself and life', scores: { introspection: { high: 1 } } },
      { label: 'Goes blank — I fall asleep fast or distract myself', scores: { introspection: { low: 1 } } },
    ],
  },
  {
    id: 15,
    dimension: 'introspection',
    scenario: 'Someone gives you a self-help book. Your honest reaction?',
    options: [
      { label: 'It\'ll collect dust — I don\'t love navel-gazing', scores: { introspection: { low: 2 } } },
      { label: 'I\'ll skim it for useful tips', scores: { introspection: { moderate: 1 }, learningStyle: { exercises: 1 } } },
      { label: 'I\'ll read it and highlight everything that resonates', scores: { introspection: { high: 1 }, learningStyle: { reflection: 1 } } },
      { label: 'Depends — if it\'s evidence-based I\'m in', scores: { introspection: { moderate: 1 }, learningStyle: { research: 1 } } },
    ],
  },

  // ──────────── Application Goal (Q16–Q18) ────────────
  {
    id: 16,
    dimension: 'goal',
    scenario: 'You discover that your friend\'s behavior matches a classic psychology pattern. Your first thought is…',
    options: [
      { label: '"This explains so much about me too"', scores: { goal: { self: 2 } } },
      { label: '"I should share this with them — it could help"', scores: { goal: { others: 2 } } },
      { label: '"I could use this framework at work"', scores: { goal: { professional: 2 } } },
      { label: '"Fascinating — what other patterns exist?"', scores: { goal: { curiosity: 2 } } },
    ],
  },
  {
    id: 17,
    dimension: 'goal',
    scenario: 'If you could gain one ability overnight, you\'d choose…',
    options: [
      { label: 'Understanding why I do what I do', scores: { goal: { self: 2 }, introspection: { high: 1 } } },
      { label: 'Reading people\'s emotions and knowing how to help', scores: { goal: { others: 2 } } },
      { label: 'Persuading and leading people more effectively', scores: { goal: { professional: 2 } } },
      { label: 'Seeing the hidden patterns in human behavior', scores: { goal: { curiosity: 2 } } },
    ],
  },
  {
    id: 18,
    dimension: 'goal',
    scenario: 'You\'ve just finished learning about attachment theory. Your next move?',
    options: [
      { label: 'Think about my own attachment style and early relationships', scores: { goal: { self: 2 }, learningStyle: { reflection: 1 } } },
      { label: 'Observe how it shows up in people around me', scores: { goal: { others: 2 } } },
      { label: 'Consider how to apply it in management or coaching', scores: { goal: { professional: 2 } } },
      { label: 'Dive into the research — what\'s the evidence base?', scores: { goal: { curiosity: 2 }, learningStyle: { research: 1 } } },
    ],
  },
];

/**
 * Tally all scores from an answers array.
 * @param {number[]} answers — index of chosen option per question (0-based)
 * @returns {{ selfAwareness: object, challenge: object, learningStyle: object, introspection: object, goal: object }}
 */
export function tallyScores(answers) {
  const tallies = {
    selfAwareness: {},
    challenge: {},
    learningStyle: {},
    introspection: {},
    goal: {},
  };

  QUIZ_QUESTIONS.forEach((q, qi) => {
    const chosenIdx = answers[qi];
    if (chosenIdx == null) return;
    const option = q.options[chosenIdx];
    if (!option) return;

    const allScores = { ...option.scores };
    // Merge challenge2 into challenge (used for multi-dimension answers)
    if (allScores.challenge2) {
      if (!allScores.challenge) allScores.challenge = {};
      Object.entries(allScores.challenge2).forEach(([k, v]) => {
        allScores.challenge[k] = (allScores.challenge[k] || 0) + v;
      });
      delete allScores.challenge2;
    }

    Object.entries(allScores).forEach(([dim, buckets]) => {
      if (!tallies[dim]) return;
      Object.entries(buckets).forEach(([key, pts]) => {
        tallies[dim][key] = (tallies[dim][key] || 0) + pts;
      });
    });
  });

  return tallies;
}

/**
 * Pick the winning value from a tally object (highest score).
 * Ties go to the first-encountered key.
 */
export function pickWinner(tally) {
  let best = null;
  let bestScore = -1;
  Object.entries(tally).forEach(([key, score]) => {
    if (score > bestScore) {
      best = key;
      bestScore = score;
    }
  });
  return best;
}

/**
 * Resolve tallies into a clean dimensions object.
 */
export function resolveDimensions(tallies) {
  return {
    selfAwareness: pickWinner(tallies.selfAwareness) || 'developing',
    challenge: pickWinner(tallies.challenge) || 'emotions',
    learningStyle: pickWinner(tallies.learningStyle) || 'stories',
    introspection: pickWinner(tallies.introspection) || 'moderate',
    goal: pickWinner(tallies.goal) || 'self',
  };
}
