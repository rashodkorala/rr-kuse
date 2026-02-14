export function createPageUrl(pageName: string): string {
  const normalized = pageName.toLowerCase().replace(/\s+/g, '-');
  return `/${normalized}`;
}

