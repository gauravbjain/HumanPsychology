// Self-experiments: simple exercises users can do to experience psychology in action.
// Each links to relevant theory ids for further reading.

export const EXPERIMENTS = [
  {
    id: 'stroop',
    title: 'Stroop effect',
    subtitle: 'When words and colors conflict',
    theoryIds: ['beck', 'piaget'],
    description: 'Your brain can automate reading so strongly that it interferes with naming colors. This demonstrates automatic vs. controlled processing—a key idea in cognitive psychology.',
    steps: [
      'Get a timer (phone or watch).',
      'List 1: Say the color of the ink for each word below, left to right, as fast as you can. Time yourself. RED BLUE GREEN RED GREEN BLUE (the words are printed in matching ink).',
      'List 2: Now say the color of the ink when the word names a different color. Time yourself. RED BLUE GREEN RED GREEN BLUE (e.g., the word RED might be printed in blue ink).',
      'Most people are slower on List 2. Reading the word is so automatic that it competes with naming the color.',
    ],
    takeaway: 'We have many automatic processes that run without conscious control. Becoming aware of them is the first step to changing unhelpful ones (e.g., in cognitive therapy).',
  },
  {
    id: 'conformity-check',
    title: 'Conformity awareness',
    subtitle: 'Notice when you go along with the group',
    theoryIds: ['asch', 'milgram'],
    description: 'Asch showed that people often conform to the group even when the group is wrong. You can notice this in daily life without a lab.',
    steps: [
      'Pick a low-stakes situation: a meeting, a group chat, or a casual discussion.',
      'Before anyone states a view, write down your own view or answer (e.g., "Which option do we prefer?").',
      'Listen to what others say. Notice if you change your stated view or stay silent when yours differs.',
      'Reflect: Did you conform? Was it to fit in (normative) or because you assumed others knew better (informational)?',
    ],
    takeaway: 'One dissenter can reduce conformity. Being aware of the pull to conform helps you choose when to speak up and when to go along.',
  },
  {
    id: 'cognitive-dissonance-mini',
    title: 'Cognitive dissonance in 5 minutes',
    subtitle: 'Feel the tension of conflicting beliefs',
    theoryIds: ['festinger', 'ellis'],
    description: 'When your behavior and your beliefs don’t match, you feel tension. Festinger called this cognitive dissonance. We usually reduce it by changing a belief or adding a justification.',
    steps: [
      'Think of a small habit you don’t value (e.g., scrolling too much, skipping exercise).',
      'Write one sentence: "I believe that [your value, e.g., health] is important."',
      'Write another: "Yesterday I [behavior that conflicts, e.g., didn’t move at all]."',
      'Sit for a minute and notice what your mind does. Do you minimize the conflict? Blame circumstances? Decide to change? That’s dissonance reduction in action.',
    ],
    takeaway: 'We often rationalize to reduce dissonance. Noticing this can help you either change the behavior or honestly revise the belief instead of kidding yourself.',
  },
  {
    id: 'abc-model',
    title: 'ABC of your emotions',
    subtitle: 'Event → Belief → Consequence (Ellis)',
    theoryIds: ['ellis', 'beck'],
    description: 'Ellis’s ABC model: A = Activating event, B = Beliefs about it, C = emotional and behavioral Consequences. It’s B that we can change.',
    steps: [
      'Recall a recent time you felt strong distress (anger, anxiety, sadness).',
      'Write A: What actually happened? (Just the facts.)',
      'Write C: What did you feel and do?',
      'Write B: What were you telling yourself? (e.g., "They must not respect me," "This is a disaster.")',
      'Consider: Would a different belief (e.g., "I don’t know their reason yet") lead to a different C?',
    ],
    takeaway: 'We can’t always change A. We can often change B. That’s the basis of cognitive and rational-emotive therapy—and something you can use in everyday life.',
  },
  {
    id: 'gratitude-scan',
    title: 'Three good things (positive psychology)',
    subtitle: 'Boost mood with a 2-minute practice',
    theoryIds: ['seligman', 'maslow'],
    description: 'Seligman and others found that regularly noting what went well can improve mood and shift attention from deficit to growth.',
    steps: [
      'Set a timer for 2 minutes.',
      'Write down three things that went well today (or this week). They can be small: "Had a good coffee," "Finished one task."',
      'For each, add one sentence: why you think it happened or what it meant to you.',
      'Repeat for a few days. Notice if your focus on positives increases.',
    ],
    takeaway: 'Attention is selective. Training it on good events doesn’t deny problems but can balance a tendency to ruminate on the negative—a simple tool from positive psychology.',
  },
];

export function getExperiment(id) {
  return EXPERIMENTS.find((e) => e.id === id) || null;
}
