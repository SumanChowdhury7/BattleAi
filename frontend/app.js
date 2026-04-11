/* ===================================================
   BattleAI — app.js
   Handles: question submission, mock API, markdown
   rendering, score animation, and UI state.
   =================================================== */

'use strict';

// ─── Sample data (the provided cricket example) ───────────────────────────────
const CRICKET_DATA = {
  problem: "Who is the king of cricket?",
  solution_1: `The title **"King of Cricket"** is often subjectively given to legendary players based on their dominance, records, and impact on the game. Here are the most common contenders:\n\n### **1. Sachin Tendulkar (India)**\n   - **Why?** The "God of Cricket" holds numerous records, including most runs in **Tests (15,921) & ODIs (18,426)**, and **100 international centuries**.\n   - **Era:** 1989–2013\n   - **Legacy:** Unmatched consistency across formats for **24 years**.\n\n### **2. Sir Don Bradman (Australia)**\n   - **Why?** The greatest **Test batsman ever** with a **career average of 99.94** (unmatched).\n   - **Era:** 1928–1948\n   - **Legacy:** His records (e.g., 6996 runs in 52 Tests) still stand after **80+ years**.\n\n### **3. Virat Kohli (India)**\n   - **Why?** The **"Chase Master"** with **80+ international centuries**, most ODI centuries (50), and dominance in all formats.\n   - **Era:** 2008–Present\n   - **Legacy:** Modern-day great with unmatched fitness and aggression.\n\n### **4. Sir Vivian Richards (West Indies)**\n   - **Why?** The most **dominant batsman of the 1970s–80s**, feared for his aggressive style.\n   - **Era:** 1974–1991\n   - **Legacy:** Strike rate was revolutionary for his time.\n\n### **5. Ricky Ponting (Australia)**\n   - **Why?** **2nd-highest Test runs (13,378)**, most wins as captain (220), and **3 World Cup titles**.\n   - **Era:** 1995–2012\n   - **Legacy:** One of the most successful captains ever.\n\n### **6. Brian Lara (West Indies)**\n   - **Why?** Holds the **highest individual Test score (400*)** and carried West Indies batting for over a decade.\n   - **Era:** 1990–2007\n   - **Legacy:** Single-handedly carried West Indies batting in the 90s–2000s.\n\n### **Who is the *Current* King?**\n- **Virat Kohli** (for modern-era dominance, records, and global fanbase).\n- **Babar Azam (Pakistan)** is also called the **"King of All Formats"** by some fans.\n\n### **All-Time King?**\n- **Don Bradman** (statistically unmatched in Tests).\n- **Sachin Tendulkar** (for longevity and global impact).\n\n**Final Verdict:**\nThere's no official "King," but **Sachin Tendulkar** and **Don Bradman** are the most universally respected.`,
  solution_2: `The title "King of Cricket" is often associated with **Don Bradman**, the legendary Australian cricketer. Bradman, who played from 1928 to 1948, is widely regarded as the greatest batsman in the history of the sport. His career batting average of **99.94** is considered one of the most extraordinary achievements in cricket and remains unmatched.\n\nIn modern times, **Sachin Tendulkar** from India is also often referred to as the "King of Cricket" due to his immense contributions to the sport, his records, and his global popularity. Tendulkar holds the record for the most runs and centuries in both Test and One Day International (ODI) cricket.\n\nBoth Bradman and Tendulkar are iconic figures in cricket, and the title "King of Cricket" is often used to honor their unparalleled contributions to the game.`,
  judge: {
    solution_1_score: 6,
    solution_2_score: 8,
    solution_1_reasoning: "Solution 1 provides a very comprehensive list of players often associated with the title and correctly identifies the modern context where Virat Kohli is specifically nicknamed 'King'. However, it contains significant factual errors in the 'Legacy' sections, which detract from its reliability.",
    solution_2_reasoning: "Solution 2 is factually accurate and identifies the two most iconic figures generally cited in the all-time debate (Bradman and Tendulkar). It correctly cites Bradman's average of 99.94. However, it is slightly less comprehensive because it fails to mention Virat Kohli, who is the player most commonly associated with the specific moniker 'King Kohli' or 'The King' in contemporary cricket discourse."
  }
};

// ─── Generic AI response templates ────────────────────────────────────────────
const GENERIC_TEMPLATES = {
  science: {
    solution_1: `**From a scientific standpoint**, this is a fascinating question that has been debated by researchers for decades.\n\n### Key Perspectives\n1. **Classical View** — Traditional science suggests the answer involves fundamental principles dating back to Newton and Einstein.\n2. **Modern Research** — Recent studies from leading institutions have expanded our understanding significantly.\n3. **Quantum Mechanics** — At the subatomic level, the answer becomes even more nuanced and counterintuitive.\n\n### Current Consensus\n- Most scientists agree on the **core principles** but debate the finer details.\n- Emerging fields like **quantum computing** and **AI** are reshaping what we know.\n\n**Bottom line:** The scientific community leans toward a multi-faceted answer that depends heavily on the context and scale of observation.`,
    solution_2: `The answer to this revolves around **empirical evidence** gathered over centuries of scientific inquiry.\n\n**Core Findings:**\n- Multiple peer-reviewed studies confirm the primary hypothesis.\n- The evidence strongly supports a deterministic worldview at macroscopic scales.\n- However, statistical mechanics introduces probabilistic elements at smaller scales.\n\n**Practical Implications:**\nUnderstanding this helps us build better technologies and make more accurate predictions about the natural world.\n\n**Conclusion:** Science provides a clear framework, though the full picture continues to evolve as new discoveries are made.`,
    judge: { solution_1_score: 7, solution_2_score: 8, solution_1_reasoning: "Comprehensive but slightly verbose. Covers multiple perspectives well.", solution_2_reasoning: "Clear, evidence-based, and well-structured. Minor gaps in covering emerging research." }
  },
  tech: {
    solution_1: `**Technically speaking**, this is one of the most hotly debated topics in the software engineering community.\n\n### The Case FOR\n- **Performance:** Benchmarks consistently show superior throughput in controlled environments.\n- **Developer Experience:** High-quality tooling, extensive documentation, and large communities.\n- **Scalability:** Proven at hyperscale by companies like Google, Meta, and Netflix.\n\n### The Case AGAINST\n- **Learning Curve:** Steep initial investment required for mastery.\n- **Overhead:** Can be overkill for small projects.\n\n### Verdict\nFor **large-scale production systems**, this is the go-to choice. For small hobby projects, alternatives may serve you better.\n\n**Use it when:** You need reliability, performance, and team consensus.`,
    solution_2: `From a **pragmatic engineering perspective**, the answer depends entirely on your use case.\n\n**Key Considerations:**\n1. **Team Expertise** — Choose what your team knows best. Productivity beats theoretical superiority.\n2. **Project Scale** — A simple CRUD app vs. a distributed system require very different tools.\n3. **Ecosystem** — Consider available libraries, frameworks, and community support.\n\n**My Recommendation:**\n- For **startups**: Optimize for speed of development.\n- For **enterprises**: Optimize for maintainability and scale.\n- For **personal projects**: Use whatever you find fun!\n\n**Conclusion:** There is no universal "best." Context is king.`,
    judge: { solution_1_score: 7, solution_2_score: 9, solution_1_reasoning: "Strong technical depth but slightly opinionated without full context.", solution_2_reasoning: "Excellent balance of pragmatism and nuance. Highly applicable advice." }
  },
  default: {
    solution_1: `This is an excellent question that deserves a thorough analysis.\n\n### Overview\nThere are multiple ways to approach this question, each offering unique insights and perspectives.\n\n### Key Points\n1. **Historical Context** — Looking at how this topic has evolved over time gives us important baseline knowledge.\n2. **Current State** — Today, the landscape is significantly different from what it was a decade ago.\n3. **Future Outlook** — Trends suggest continued evolution in surprising directions.\n\n### Analysis\n- The most common answer tends to oversimplify the matter.\n- A deeper dive reveals layers of complexity that most casual observers miss.\n- Expert consensus, while not unanimous, points in a clear general direction.\n\n**My take:** The question is multifaceted, and any single answer will inevitably leave something important out. Browse multiple credible sources and form your own informed opinion.`,
    solution_2: `A direct answer to your question requires considering **three main angles**:\n\n**1. The Factual Angle**\nThe measurable, verifiable data points are clear: established facts and widely accepted evidence support a specific conclusion.\n\n**2. The Subjective Angle**\nPersonal preference, cultural background, and individual goals all play a significant role. What works brilliantly for one person may be entirely wrong for another.\n\n**3. The Contextual Angle**\nContext overrides almost everything. The "best" answer in one scenario may be the worst in another.\n\n**Putting it Together:**\nIf you had to choose one answer, the evidence-based consensus provides the strongest foundation. But remember: nuance matters. Always verify with current, reputable sources and adjust based on your specific situation.\n\n**Recommendation:** Start with the data, layer in your context, and make an informed decision.`,
    judge: { solution_1_score: 7, solution_2_score: 8, solution_1_reasoning: "Thorough and well-rounded coverage of the topic. Good use of structured points to explain complexity.", solution_2_reasoning: "Clear and highly structured response that provides a useful decision-making framework. Slightly more actionable than Solution 1." }
  }
};

// ─── State ─────────────────────────────────────────────────────────────────────
let battleCount = 0;

// ─── DOM refs ──────────────────────────────────────────────────────────────────
const inputEl        = document.getElementById('question-input');
const battleBtn      = document.getElementById('battle-btn');
const welcomeSection = document.getElementById('welcome-section');
const loadingSection = document.getElementById('loading-section');
const resultsSection = document.getElementById('results-section');
const newBattleBtn   = document.getElementById('new-battle-btn');
const battleCountEl  = document.getElementById('battle-count');

// ─── Markdown renderer (lightweight) ─────────────────────────────────────────
function renderMarkdown(text) {
  let html = text
    // Escape HTML first (don't remove - safety)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // Code blocks
    .replace(/`([^`]+)`/g, '<code>$1</code>')

    // Bold **text**
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

    // Italic *text*
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')

    // ### Heading 3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')

    // #### Heading 4
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')

    // ## Heading 2
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')

    // Horizontal rule
    .replace(/^---+$/gm, '<hr>')

    // Blockquote
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

  // Numbered lists
  html = processLists(html);

  // Paragraphs (double newlines)
  html = html
    .split(/\n{2,}/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<(h[1-6]|ul|ol|li|hr|blockquote)/.test(block)) return block;
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');

  return html;
}

function processLists(text) {
  const lines = text.split('\n');
  const out = [];
  let inUl = false;
  let inOl = false;

  for (const line of lines) {
    const ulMatch = line.match(/^[ \t]*[-*] (.+)/);
    const olMatch = line.match(/^[ \t]*\d+\. (.+)/);

    if (ulMatch) {
      if (!inUl) { out.push('<ul>'); inUl = true; }
      if (inOl) { out.push('</ol>'); inOl = false; }
      out.push(`<li>${ulMatch[1]}</li>`);
    } else if (olMatch) {
      if (!inOl) { out.push('<ol>'); inOl = true; }
      if (inUl) { out.push('</ul>'); inUl = false; }
      out.push(`<li>${olMatch[1]}</li>`);
    } else {
      if (inUl) { out.push('</ul>'); inUl = false; }
      if (inOl) { out.push('</ol>'); inOl = false; }
      out.push(line);
    }
  }
  if (inUl) out.push('</ul>');
  if (inOl) out.push('</ol>');
  return out.join('\n');
}

// ─── Get data for a question ──────────────────────────────────────────────────
function getDataForQuestion(question) {
  const q = question.toLowerCase();

  // Exact cricket match — use real data
  if (/cricket|sachin|bradman|kohli|virat|babar/.test(q)) {
    return CRICKET_DATA;
  }

  // Categorize
  let category = 'default';
  if (/quantum|physics|chemistry|biology|science|atom|relativity|evolution|energy|space|gravity/.test(q)) {
    category = 'science';
  } else if (/programming|language|code|javascript|python|react|vue|angular|framework|developer|software|api|database|backend|frontend/.test(q)) {
    category = 'tech';
  }

  const template = GENERIC_TEMPLATES[category];
  return {
    problem: question,
    solution_1: template.solution_1,
    solution_2: template.solution_2,
    judge: template.judge
  };
}

// ─── Show loading ─────────────────────────────────────────────────────────────
function showLoading() {
  welcomeSection.classList.add('hidden');
  resultsSection.classList.add('hidden');
  loadingSection.classList.remove('hidden');
}

// ─── Animate score bar ────────────────────────────────────────────────────────
function animateBar(barEl, score) {
  requestAnimationFrame(() => {
    barEl.style.width = `${score * 10}%`;
  });
}

// ─── Animate score counter ────────────────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = target / 30;
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(interval);
  }, 25);
}

// ─── Show results ─────────────────────────────────────────────────────────────
function showResults(data) {
  const { problem, solution_1, solution_2, judge } = data;
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;

  // Set question
  document.getElementById('displayed-question').textContent = problem;

  // Render solutions
  document.getElementById('solution-1-content').innerHTML = renderMarkdown(solution_1);
  document.getElementById('solution-2-content').innerHTML = renderMarkdown(solution_2);

  // Scores in cards
  document.getElementById('champion-score-1').textContent = `${solution_1_score}/10`;
  document.getElementById('champion-score-2').textContent = `${solution_2_score}/10`;

  // Judge scores
  document.getElementById('judge-score-1').textContent = `${solution_1_score}/10`;
  document.getElementById('judge-score-2').textContent = `${solution_2_score}/10`;

  // Reasoning
  document.getElementById('reason-1-text').textContent = solution_1_reasoning;
  document.getElementById('reason-2-text').textContent = solution_2_reasoning;

  // Winner determination
  const winner = solution_1_score >= solution_2_score ? 1 : 2;
  const winnerScore = winner === 1 ? solution_1_score : solution_2_score;

  document.getElementById('winner-name').textContent = `AI Champion #${winner}`;
  document.getElementById('winner-label').textContent = `AI #${winner} WINS`;

  // Highlight winner row in judge card
  const judgeRow1 = document.getElementById('judge-row-1');
  const judgeRow2 = document.getElementById('judge-row-2');
  judgeRow1.classList.remove('winner-row');
  judgeRow2.classList.remove('winner-row');
  document.getElementById(`judge-row-${winner}`).classList.add('winner-row');

  // Add winner glow to winning card
  const card1 = document.getElementById('card-1');
  const card2 = document.getElementById('card-2');
  card1.classList.remove('card-winner');
  card2.classList.remove('card-winner');
  document.getElementById(`card-${winner}`).classList.add('card-winner');

  // Add crown to score badge of winner
  const scoreB1 = document.getElementById('champion-score-1');
  const scoreB2 = document.getElementById('champion-score-2');
  scoreB1.textContent = winner === 1 ? `👑 ${solution_1_score}/10` : `${solution_1_score}/10`;
  scoreB2.textContent = winner === 2 ? `👑 ${solution_2_score}/10` : `${solution_2_score}/10`;

  // Show section
  loadingSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');

  // Animate bars & counters after short delay
  setTimeout(() => {
    const s1El = document.getElementById('score-1');
    const s2El = document.getElementById('score-2');
    s1El.textContent = '0/10';
    s2El.textContent = '0/10';

    animateBar(document.getElementById('bar-1'), solution_1_score);
    animateBar(document.getElementById('bar-2'), solution_2_score);

    let c1 = 0, c2 = 0;
    const step1 = solution_1_score / 25, step2 = solution_2_score / 25;
    const intv = setInterval(() => {
      c1 = Math.min(c1 + step1, solution_1_score);
      c2 = Math.min(c2 + step2, solution_2_score);
      s1El.textContent = `${Math.round(c1)}/10`;
      s2El.textContent = `${Math.round(c2)}/10`;
      if (c1 >= solution_1_score && c2 >= solution_2_score) clearInterval(intv);
    }, 30);
  }, 200);
}

// ─── Reset to welcome ─────────────────────────────────────────────────────────
function resetToWelcome() {
  resultsSection.classList.add('hidden');
  loadingSection.classList.add('hidden');
  welcomeSection.classList.remove('hidden');
  inputEl.value = '';
  inputEl.focus();
}

// ─── Simulate API call ────────────────────────────────────────────────────────
function simulateBattle(question) {
  showLoading();

  // Simulate network delay (1.5–2.5s)
  const delay = 1500 + Math.random() * 1000;

  setTimeout(() => {
    const data = getDataForQuestion(question);
    showResults(data);
    battleCount++;
    battleCountEl.textContent = battleCount;
  }, delay);
}

// ─── Start battle ─────────────────────────────────────────────────────────────
function startBattle() {
  const question = inputEl.value.trim();
  if (!question) {
    inputEl.focus();
    inputEl.style.animation = 'none';
    requestAnimationFrame(() => {
      inputEl.style.animation = 'shake .3s ease-in-out';
    });
    return;
  }
  simulateBattle(question);
}

// ─── Event listeners ──────────────────────────────────────────────────────────
battleBtn.addEventListener('click', startBattle);

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') startBattle();
});

newBattleBtn.addEventListener('click', resetToWelcome);

// Suggestion chips
document.querySelectorAll('.suggestion-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const q = chip.dataset.q;
    inputEl.value = q;
    startBattle();
  });
});

// Shake animation for empty input
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);
