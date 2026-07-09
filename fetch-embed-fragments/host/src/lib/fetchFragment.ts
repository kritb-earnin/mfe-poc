import * as cheerio from 'cheerio';

export type FragmentResult =
  | { ok: true; html: string }
  | { ok: false; error: string };

export async function fetchFragment(url: string): Promise<FragmentResult> {
  try {
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status} from ${url}` };
    }

    const pageHtml = await response.text();
    const $ = cheerio.load(pageHtml);
    const html = $('#fragment-root').prop('outerHTML');

    if (!html) {
      return { ok: false, error: `No #fragment-root found at ${url}` };
    }

    return { ok: true, html };
  } catch {
    return { ok: false, error: `Could not reach ${url}` };
  }
}

export async function fetchFragments(
  urls: Record<string, string>
): Promise<Record<string, FragmentResult>> {
  const entries = await Promise.all(
    Object.entries(urls).map(async ([key, url]) => [key, await fetchFragment(url)] as const)
  );

  return Object.fromEntries(entries);
}
