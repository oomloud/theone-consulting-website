// Loads the page copy from src/content/*.md (frontmatter only).
// Every text edit happens in those files, never in components.

type Data = Record<string, any>;

const modules = import.meta.glob<{ frontmatter: Data }>('../content/*.md', { eager: true });

export function section(name: string): Data {
  const mod = modules[`../content/${name}.md`];
  if (!mod) throw new Error(`Missing content file: src/content/${name}.md`);
  return mod.frontmatter;
}

const site = section('site');
export const compact = site.copy === 'compact';

/** Returns obj[`${key}Compact`] when the compact copy is selected and exists, else obj[key]. */
export function pick(obj: Data, key: string): any {
  if (compact && obj[`${key}Compact`] !== undefined) return obj[`${key}Compact`];
  return obj[key];
}

/** Two-digit numeral: 1 → "01". */
export const num = (i: number) => String(i + 1).padStart(2, '0');

/** Minimal inline formatting: **bold**. Content is trusted (our own files). */
export const inline = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
