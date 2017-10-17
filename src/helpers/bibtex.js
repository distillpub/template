import bibtexParse from 'bibtex-parse-js';

function normalizeTag(string) {
  return string
    .replace(/[\t\n ]+/g, ' ')
    .replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g, (full, x, char) => char)
    .replace(/{\\([a-zA-Z])}/g, (full, char) => char);
}

export function parseBibtex(bibtex) {
  const bibliography = new Map();
  const parsedEntries = bibtexParse.toJSON(bibtex);
  for (const entry of parsedEntries) {
    // normalize tags; note entryTags is an object, not Map
    for (const [key, value] of Object.entries(entry.entryTags)) {
      entry.entryTags[key.toLowerCase()] = normalizeTag(value);
    }
    entry.entryTags.type = entry.entryType;
    // add to bibliography
    bibliography.set(entry.citationKey, entry.entryTags);
  }
  return bibliography;
}

export function serializeFrontmatterToBibtex(frontMatter) {
  return `@article{${frontMatter.slug},
  author = {${frontMatter.bibtexAuthors}},
  title = {${frontMatter.title}},
  journal = {${frontMatter.journal.title}},
  year = {${frontMatter.publishedYear}},
  note = {${frontMatter.url}}
}`;
}
