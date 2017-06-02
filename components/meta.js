import favicon from './distill-favicon.base64';
import escape from 'escape-html';

export default function(dom, data) {
  let head = dom.querySelector("head");
  let appendHead = html => appendHtml(head, html);

  function meta(name, content, force) {
    if (content || force)
      appendHead(`    <meta name="${name}" content="${escape(content)}" >\n`);
  }

  appendHead(`
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <link rel="icon" type="image/png" href="data:image/png;base64,${favicon}">
    <link href="/rss.xml" rel="alternate" type="application/rss+xml" title="Articles from Distill">
    <link rel="canonical" href="${data.url}">
    <title>${data.title}</title>
  `);

  appendHead(`
    <!--  https://schema.org/Article -->
    <meta property="article:published" itemprop="datePublished" content="${data.publishedYear}-${data.publishedMonthPadded}-${data.publishedDayPadded}" />
    <meta property="article:created" itemprop="dateCreated" content="${data.publishedDate}" />
    <meta property="article:modified" itemprop="dateModified" content="${data.updatedDate}" />
  `);
  data.authors.forEach((a) => {
    appendHtml(head, `
      <meta property="article:author" content="${a.firstName} ${a.lastName}" />`)
  });

  appendHead(`
    <!--  https://developers.facebook.com/docs/sharing/webmasters#markup -->
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="${data.title}"/>
    <meta property="og:description" content="${data.description}">
    <meta property="og:url" content="${data.url}"/>
    <meta property="og:image" content="${data.previewURL}"/>
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Distill" />
  `);

  appendHead(`
    <!--  https://dev.twitter.com/cards/types/summary -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.title}">
    <meta name="twitter:description" content="${data.description}">
    <meta name="twitter:url" content="${data.url}">
    <meta name="twitter:image" content="${data.previewURL}">
    <meta name="twitter:image:width" content="560">
    <meta name="twitter:image:height" content="295">
  `);

  // if this is a proprer article, generate Google Scholar meta data
  if (data.doiSuffix){
    appendHead(`
      <!--  https://scholar.google.com/intl/en/scholar/inclusion.html#indexing -->\n`);

    meta("citation_title", data.title);
    //meta("citation_fulltext_html_url", data.url);
    meta("citation_volume", data.volume);
    meta("citation_issue", data.issue);
    meta("citation_firstpage", data.doiSuffix? `e${data.doiSuffix}` : undefined);
    meta("citation_doi", data.doi);

    let journal = data.journal || {};
    meta("citation_journal_title", journal.full_title || journal.title);
    meta("citation_journal_abbrev", journal.abbrev_title);
    meta("citation_issn", journal.issn);
    meta("citation_publisher", journal.publisher);
    meta("citation_fulltext_world_readable", "", true);

    if (data.publishedDate){
      let zeroPad = (n) => { return n < 10 ? "0" + n : n; };
      meta("citation_online_date", `${data.publishedYear}/${data.publishedMonthPadded}/${data.publishedDayPadded}`);
      // Should we do something different here?
      meta("citation_publication_date", `${data.publishedYear}/${data.publishedMonthPadded}/${data.publishedDayPadded}`);
    }

    (data.authors || []).forEach((a) => {
        meta("citation_author", `${a.lastName}, ${a.firstName}`);
        meta("citation_author_institution", a.affiliation);
    });

    if (data.citations) {
      data.citations.forEach(key => {
        let d = data.bibliography[key];
        if(!d) {
          console.warn("No bibliography data fround for " + key)
        } else {
          meta("citation_reference", citation_meta_content(data.bibliography[key]) )
        };
      });
    }
  }
}

function appendHtml(el, html) {
  el.innerHTML += html;
}

function citation_meta_content(ref){
  // Special test for arxiv
  var content = `citation_title=${ref.title};`;

  let name_strings = ref.author.split(" and ").forEach(name => {
    name = name.trim();
    if (name.indexOf(",") != -1){
      var last = name.split(",")[0].trim();
      var firsts = name.split(",")[1].trim();
    } else {
      var last = name.split(" ").slice(-1)[0].trim();
      var firsts = name.split(" ").slice(0,-1).join(" ");
    }
    content += `citation_author=${firsts} ${last};`;
  });

  if ("year" in ref) {
    content += `citation_publication_date=${ref.year};`;
  }

  var arxiv_id_search = /https?:\/\/arxiv\.org\/pdf\/([0-9]*\.[0-9]*)\.pdf/.exec(ref.url);
  arxiv_id_search = arxiv_id_search || /https?:\/\/arxiv\.org\/abs\/([0-9]*\.[0-9]*)/.exec(ref.url);
  arxiv_id_search = arxiv_id_search || /arXiv preprint arXiv:([0-9]*\.[0-9]*)/.exec(ref.journal);
  if (arxiv_id_search && arxiv_id_search[1]){
    content += `citation_arxiv_id=${arxiv_id_search[1]};`;
    return content;
  }
  if ("journal" in ref){
    content += `citation_journal_title=${ref.journal};`;
  }
  if ("volume" in ref) {
      content += `citation_volume=${ref.volume};`;
  }
  if ("issue" in ref || "number" in ref){
      content += `citation_number=${ref.issue || ref.number};`;
  }
  /*content += `citation_first_page=${};`;
  content += `citation_publication_date=${};`;*/
  return content;
}
