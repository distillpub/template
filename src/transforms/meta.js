// Copyright 2018 The Distill Template Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// TODO: rewrite as template to make order dependencies easier

import favicon from '../assets/distill-favicon.base64';
import escape from 'escape-html';

export default function(dom, data) {
  let head = dom.querySelector('head');
  let appendHead = html => appendHtml(head, html);

  function meta(name, content, force) {
    if (content || force)
      appendHead(`    <meta name="${name}" content="${escape(content)}" >\n`);
  }

  appendHead(`
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <link rel="icon" type="image/png" href="data:image/png;base64,${favicon}">
    <link href="/rss.xml" rel="alternate" type="application/rss+xml" title="Articles from Distill">
  `);

  if (data.title) {
    appendHead(`
    <title>${escape(data.title)}</title>
    `);
  }

  if (data.url) {
    appendHead(`
    <link rel="canonical" href="${data.url}">
    `);
  }


  if (data.publishedDate){
    appendHead(`
    <!--  https://schema.org/Article -->
    <meta property="description"       itemprop="description"   content="${escape(data.description)}" />
    <meta property="article:published" itemprop="datePublished" content="${data.publishedISODateOnly}" />
    <meta property="article:created"   itemprop="dateCreated"   content="${data.publishedISODateOnly}" />
    `);
  }

  if (data.updatedDate) {
    appendHead(`
    <meta property="article:modified"  itemprop="dateModified"  content="${data.updatedDate.toISOString()}" />
    `);
  }

  (data.authors || []).forEach((a) => {
    appendHtml(head, `
    <meta property="article:author" content="${escape(a.firstName)} ${escape(a.lastName)}" />`);
  });

  appendHead(`
    <!--  https://developers.facebook.com/docs/sharing/webmasters#markup -->
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="${escape(data.title)}"/>
    <meta property="og:description" content="${escape(data.description)}">
    <meta property="og:url" content="${data.url}"/>
    <meta property="og:image" content="${data.previewURL}"/>
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Distill" />
  `);

  appendHead(`
    <!--  https://dev.twitter.com/cards/types/summary -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escape(data.title)}">
    <meta name="twitter:description" content="${escape(data.description)}">
    <meta name="twitter:url" content="${data.url}">
    <meta name="twitter:image" content="${data.previewURL}">
    <meta name="twitter:image:width" content="560">
    <meta name="twitter:image:height" content="295">
  `);

  // if this is a proprer article, generate Google Scholar meta data
  if (data.doiSuffix){
    appendHead(`
      <!--  https://scholar.google.com/intl/en/scholar/inclusion.html#indexing -->\n`);

    meta('citation_title', data.title);
    meta('citation_fulltext_html_url', data.url);
    meta('citation_volume', data.volume);
    meta('citation_issue', data.issue);
    meta('citation_firstpage', data.doiSuffix ? `e${data.doiSuffix}` : undefined);
    meta('citation_doi', data.doi);

    let journal = data.journal || {};
    meta('citation_journal_title', journal.full_title || journal.title);
    meta('citation_journal_abbrev', journal.abbrev_title);
    meta('citation_issn', journal.issn);
    meta('citation_publisher', journal.publisher);
    meta('citation_fulltext_world_readable', '', true);

    if (data.publishedDate){
      meta('citation_online_date', `${data.publishedYear}/${data.publishedMonthPadded}/${data.publishedDayPadded}`);
      meta('citation_publication_date', `${data.publishedYear}/${data.publishedMonthPadded}/${data.publishedDayPadded}`);
    }

    (data.authors || []).forEach((a) => {
      meta('citation_author', `${a.lastName}, ${a.firstName}`);
      meta('citation_author_institution', a.affiliation);
    });
  } else {
    console.warn('No DOI suffix in data; not adding citation meta tags!');
  }

  if (data.citations) {
    data.citations.forEach(key => {
      if (data.bibliography && data.bibliography.has(key)) {
        const entry = data.bibliography.get(key);
        meta('citation_reference', citation_meta_content(entry) );
      } else {
        console.warn('No bibliography data found for ' + key);
      }
    });
  } else {
    console.warn('No citations found; not adding any references meta tags!');
  }
}

function appendHtml(el, html) {
  el.innerHTML += html;
}

function citation_meta_content(ref){
  var content = `citation_title=${ref.title};`;

  if (ref.author && ref.author !== '') {
    ref.author.split(' and ').forEach(name => {
      name = name.trim();
      let last, firsts;
      if (name.indexOf(',') != -1){
        last = name.split(',')[0].trim();
        firsts = name.split(',')[1].trim();
      } else {
        last = name.split(' ').slice(-1)[0].trim();
        firsts = name.split(' ').slice(0,-1).join(' ');
      }
      content += `citation_author=${firsts} ${last};`;
    });
  }

  if ('year' in ref) {
    content += `citation_publication_date=${ref.year};`;
  }

  // Special test for arxiv
  let arxiv_id_search = /https?:\/\/arxiv\.org\/pdf\/([0-9]*\.[0-9]*)\.pdf/.exec(ref.url);
  arxiv_id_search = arxiv_id_search || /https?:\/\/arxiv\.org\/abs\/([0-9]*\.[0-9]*)/.exec(ref.url);
  arxiv_id_search = arxiv_id_search || /arXiv preprint arXiv:([0-9]*\.[0-9]*)/.exec(ref.journal);
  if (arxiv_id_search && arxiv_id_search[1]){
    content += `citation_arxiv_id=${arxiv_id_search[1]};`;
    return content; // arXiv is not considered a journal, so we don't need journal/volume/issue
  }
  if ('journal' in ref){
    content += `citation_journal_title=${escape(ref.journal)};`;
  }
  if ('volume' in ref) {
    content += `citation_volume=${escape(ref.volume)};`;
  }
  if ('issue' in ref || 'number' in ref){
    content += `citation_number=${escape(ref.issue || ref.number)};`;
  }
  return content;
}
