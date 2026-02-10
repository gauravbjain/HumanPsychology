/**
 * Calls an LLM API (OpenAI-compatible) to analyze a user situation and return structured JSON.
 * Set VITE_OPENAI_API_KEY and optionally VITE_OPENAI_API_URL in .env.
 */

const DEFAULT_URL = 'https://api.openai.com/v1/chat/completions';

function getApiConfig() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENAI_API_URL || DEFAULT_URL;
  return { apiKey, apiUrl };
}

function buildSystemPrompt() {
  return `You are a thoughtful psychological analyst. Analyze the following real situation submitted by a user.

Provide your analysis in valid JSON only, no markdown or extra text, using this exact structure:

{
  "reframe": "2-3 sentence objective summary of what is happening, non-judgmental",
  "frameworks": [
    {
      "name": "Framework or concept name",
      "explanation": "Brief explanation of the concept",
      "application": "How it applies to this situation"
    }
  ],
  "questions": ["Reflective question 1", "Reflective question 2", "Reflective question 3"],
  "strategies": [
    {
      "action": "Concrete action the person could take",
      "principle": "Psychological principle behind it",
      "outcome": "Expected result or benefit"
    }
  ],
  "deeper": {
    "alternatives": "Alternative ways to interpret the situation",
    "blindspots": "Potential blind spots or biases to consider",
    "patterns": "Broader patterns this might reflect"
  }
}

Keep the analysis non-judgmental, evidence-based, and focused on understanding. Use 2-4 frameworks, 3-5 questions, and 2-4 strategies.`;
}

function buildUserMessage(userInput) {
  return `Analyze this situation:\n\n${userInput}`;
}

/**
 * @param {string} userInput
 * @returns {Promise<{ reframe: string, frameworks: Array<{ name: string, explanation?: string, application?: string }>, questions: string[], strategies: Array<{ action: string, principle?: string, outcome?: string }>, deeper?: { alternatives?: string, blindspots?: string, patterns?: string } }>}
 */
export async function analyzeSituation(userInput) {
  const { apiKey, apiUrl } = getApiConfig();
  if (!apiKey?.trim()) {
    throw new Error('API key not configured. Add VITE_OPENAI_API_KEY to your .env file.');
  }

  const body = {
    model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserMessage(userInput) },
    ],
    temperature: 0.6,
  };
  // Optional: force JSON output (OpenAI and compatible APIs)
  if (import.meta.env.VITE_OPENAI_JSON_MODE !== 'false') {
    body.response_format = { type: 'json_object' };
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errBody = await response.text();
    let message = `API error: ${response.status}`;
    try {
      const j = JSON.parse(errBody);
      if (j.error?.message) message = j.error.message;
    } catch (_) {}
    throw new Error(message);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('No analysis returned from API');

  try {
    return JSON.parse(content);
  } catch (e) {
    // Try to extract JSON from markdown code block if present
    const match = content.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Invalid analysis format');
  }
}
