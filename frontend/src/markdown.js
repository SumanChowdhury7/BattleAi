/**
 * Lightweight markdown-to-HTML renderer.
 * Supports: **bold**, *italic*, ### headings, - lists, 1. lists, `code`, > blockquote, ```, ---
 */
export function renderMarkdown(text) {
  const codeBlocks = [];

  let html = text.replace(/```(?:([a-zA-Z0-9_-]+)\n)?([\s\S]*?)```/gm, (_, lang = '', codeContent) => {
    const index = codeBlocks.length;
    codeBlocks.push({ lang, codeContent });
    return `__CODE_BLOCK_PLACEHOLDER_${index}__`;
  });

  // Escape HTML for everything outside code blocks
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Inline: code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-white/10 text-cyan-300 px-1 py-0.5 rounded text-sm">$1</code>');
  // Inline: bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[#e1e1f2] font-bold">$1</strong>');
  // Inline: italic
  html = html.replace(/\*([^*]+)\*/g, '<em class="text-cyan-300 italic">$1</em>');

  // Block: headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-[#d0bcff] font-bold text-[0.92rem] mt-4 mb-1 first:mt-0">$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="text-[#e1e1f2] font-semibold text-[0.85rem] mt-3 mb-1">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 class="text-[#d0bcff] font-bold text-[0.92rem] mt-4 mb-1 first:mt-0">$1</h3>');

  // Block: hr
  html = html.replace(/^---+$/gm, '<hr class="border-white/10 my-3"/>');

  // Lists
  html = processLists(html);

  // Blockquote
  html = html.replace(/^&gt; (.+)$/gm,
    '<blockquote class="border-l-2 border-white/30 pl-3 text-[#cbc3d7] italic my-2">$1</blockquote>');

  // Paragraphs (double newlines)
  html = html
    .split(/\n{2,}/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<(h[1-6]|ul|ol|li|hr|blockquote|pre)/.test(block)) return block;
      return `<p class="text-[#cbc3d7] mb-2 leading-relaxed">${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');

  // Restore fenced code blocks
  html = html.replace(/__CODE_BLOCK_PLACEHOLDER_(\d+)__/g, (_, idx) => {
    const { lang, codeContent } = codeBlocks[Number(idx)];
    const escapedCode = codeContent
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const highlightedCode = highlightCode(escapedCode, lang);
    const languageClass = lang ? `language-${lang}` : '';
    return `<pre class="rounded-2xl bg-[#111827] p-4 overflow-x-auto text-[0.85rem] leading-6 my-4"><code class="block font-mono whitespace-pre-wrap ${languageClass}">${highlightedCode}</code></pre>`;
  });

  return html;
}

function highlightCode(code, lang) {
  if (!lang) return code;

  const lowerLang = lang.toLowerCase();
  if (lowerLang === 'js' || lowerLang === 'javascript') {
    return code
      .replace(/(\/\/[^\n]*)/g, '<span class="token-comment">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="token-string">$1</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|async|await|import|from|export|default|class|extends|new|try|catch|finally|throw|typeof|instanceof|in|of|true|false|null|undefined)\b/g, '<span class="token-keyword">$1</span>')
      .replace(/\b(0x[0-9a-fA-F]+|\d+(?:\.\d+)?)\b/g, '<span class="token-number">$1</span>')
      .replace(/\b([A-Za-z_\$][A-Za-z0-9_\$]*)(?=\s*\()/g, '<span class="token-function">$1</span>');
  }

  return code;
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
      if (!inUl) { out.push('<ul class="list-disc pl-5 my-2 space-y-1">'); inUl = true; }
      if (inOl) { out.push('</ol>'); inOl = false; }
      out.push(`<li class="text-[#cbc3d7] text-sm leading-relaxed">${ulMatch[1]}</li>`);
    } else if (olMatch) {
      if (!inOl) { out.push('<ol class="list-decimal pl-5 my-2 space-y-1">'); inOl = true; }
      if (inUl) { out.push('</ul>'); inUl = false; }
      out.push(`<li class="text-[#cbc3d7] text-sm leading-relaxed">${olMatch[1]}</li>`);
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
