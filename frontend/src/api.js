/**
 * BattleAI API Service
 *
 * POST /api/battle  →  { problem, solution_1, solution_2, judge }
 *
 * Set VITE_API_BASE_URL in your .env file to point to your backend.
 * Default: http://localhost:8000
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Send a question to the backend and receive two AI solutions + judge verdict.
 * @param {string} question
 * @returns {Promise<{problem, solution_1, solution_2, judge}>}
 */
export async function fetchBattle(question) {
  const response = await fetch(`${BASE_URL}/use-graph`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problem: question }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Server error ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  // Validate expected shape
  if (!data.solution_1 || !data.solution_2 || !data.judge) {
    throw new Error('Invalid response format from backend.');
  }

  return data;
}
