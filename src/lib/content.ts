// Loads the page copy from src/content/*.md (frontmatter only).
// Every text edit happens in those files, never in components.

type Data = Record<string, any>;

const modules = import.meta.glob<{ frontmatter: Data }>('../content/*.md', { eager: true });

export function section(name: string): Data {
  const mod = modules[`../content/${name}.md`];
  if (!mod) throw new Error(`Missing content file: src/content/${name}.md`);
  return mod.frontmatter;
}

/**
 * Copy modes:
 * - full:       Nataliya's original text.
 * - compact:    the shortened variant.
 * - expandable: compact text with a "Read more" control that reveals the full text.
 */
export type Mode = 'full' | 'compact' | 'expandable';

const site = section('site');

/** Preview pages for comparing copy versions (remove before launch). */
export const previewModes: Record<string, Mode> = { compact: 'compact', expandable: 'expandable' };

/** The copy mode for the current page: preview URL first, else `copy:` in site.md. */
export function copyMode(url: URL): Mode {
  const first = url.pathname.split('/').filter(Boolean)[0];
  if (first && previewModes[first]) return previewModes[first];
  return site.copy === 'compact' ? 'compact' : 'full';
}

/**
 * Returns the field to show. Short fields (titles, kickers, "For" lines) use the
 * compact text only in compact mode; in expandable mode they stay full.
 */
export function pick(obj: Data, key: string, mode: Mode): any {
  if (mode === 'compact' && obj[`${key}Compact`] !== undefined) return obj[`${key}Compact`];
  return obj[key];
}

/** For long text: both versions, when they differ. */
export function both(obj: Data, key: string): { full: any; short: any } {
  const full = obj[key];
  const short = obj[`${key}Compact`] ?? full;
  return { full, short };
}

/** Two-digit numeral: 1 → "01". */
export const num = (i: number) => String(i + 1).padStart(2, '0');

/** Minimal inline formatting: **bold**. Content is trusted (our own files). */
export const inline = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
