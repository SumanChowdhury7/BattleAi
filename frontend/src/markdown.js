/**
 * Lightweight markdown-to-HTML renderer.
 * Supports: **bold**, *italic*, ### headings, - lists, 1. lists, `code`, > blockquote, ---
 */
export function renderMarkdown(text) {
  // Escape HTML
  let html = text
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
      if (/^<(h[1-6]|ul|ol|li|hr|blockquote)/.test(block)) return block;
      return `<p class="text-[#cbc3d7] mb-2 leading-relaxed">${block.replace(/\n/g, '<br/>')}</p>`;
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
