// Standalone practical tools (not tied to a single theory). Theory-linked tools come from elaborations.practicalTools.

export const GLOBAL_TOOLS = [
  {
    id: 'one-minute-breath',
    title: 'One-minute breathing space',
    source: 'Mindfulness-based approaches',
    theoryIds: ['eastern-mindfulness', 'beck'],
    steps: [
      'Pause. Set a timer for 1 minute.',
      'For 20 seconds: notice what you feel in your body and what thoughts are present. Don’t change anything.',
      'For 20 seconds: focus only on the breath—one inhale, one exhale at a time.',
      'For 20 seconds: expand awareness to the whole body and the room, then resume your day.',
    ],
    when: 'Use when you’re stressed, reactive, or need to reset before a decision.',
  },
  {
    id: 'thought-record-simple',
    title: 'Simple thought record (CBT)',
    source: 'Cognitive therapy',
    theoryIds: ['beck', 'ellis'],
    steps: [
      'Situation: What happened? (One line.)',
      'Emotion: What did you feel? (e.g., anxious, angry.) Rate 0–10.',
      'Automatic thought: What went through your mind?',
      'Evidence for: What supports that thought?',
      'Evidence against: What doesn’t fit? Is there another explanation?',
      'Balanced thought: What’s a more accurate or helpful way to see it?',
      'Re-rate emotion 0–10.',
    ],
    when: 'Use when your mood drops or you’re stuck in a negative loop.',
  },
  {
    id: 'values-check',
    title: 'Quick values check',
    source: 'Humanistic / acceptance-based approaches',
    theoryIds: ['rogers', 'maslow', 'seligman'],
    steps: [
      'List 3–5 things that really matter to you (e.g., connection, honesty, growth).',
      'Ask: "In the last week, how much did I act in line with these?" Pick one value and one small action you could take today.',
    ],
    when: 'Use when you feel aimless or disconnected from what matters.',
  },
];

export function getGlobalTools() {
  return GLOBAL_TOOLS;
}
