export default function(dom, data) {
  let head = dom.querySelector("head");
  
  appendHtml(head, `
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link href="/rss.xml" rel="alternate" type="application/rss+xml" title="Articles from Distill">
    <link rel="canonical" href="${data.url}">
    <title>${data.title}</title>
  `);

  appendHtml(head, `
    <!--  https://schema.org/Article -->
    <meta property="article:published" itemprop="datePublished" content="${data.publishedDate}" />
    <meta property="article:modified" itemprop="dateModified" content="${data.updatedDate}" />
  `);
  data.authors.forEach((a) => {
    appendHtml(head, `
      <meta property="article:author" content="${a.firstName} ${a.lastName}" />`)
  });

  appendHtml(head, `
    <!--  https://developers.facebook.com/docs/sharing/webmasters#markup -->
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="${data.title}"/>
    <meta property="og:description" content="${data.description}">
    <meta property="og:url" content="${data.url}"/>
    <meta property="og:image" content="${data.url}/thumbnail.png"/>
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Distill" />
  `);

  appendHtml(head, `
    <!--  https://dev.twitter.com/cards/types/summary -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.title}">
    <meta name="twitter:description" content="${data.description}">
    <meta name="twitter:url" content="${data.url}">
    <meta name="twitter:image" content="${data.url}/thumbnail.png">
    <meta name="twitter:image:width" content="560">
    <meta name="twitter:image:height" content="295">
  `);

  appendHtml(head, `
    <!--  https://scholar.google.com/intl/en/scholar/inclusion.html#indexing -->
    <meta name="citation_title" content="${data.title}">
    <meta name="citation_publication_date" content="${data.publishedYear}/${data.publishedMonthPadded}/${data.publishedDayPadded}">
    <meta name="citation_fulltext_html_url" content="${data.url}">
    <meta name="citation_volume" content="${data.volume}">
    <meta name="citation_issue" content="${data.issue}">
    <meta name="citation_journal_title" content="${data.journal.name}">
    <meta name="citation_journal_abbrev" content="${data.journal.nameAbbrev}"/>
    <meta name="citation_firstpage" content="e${data.doiSuffix}"/>
    <meta name="citation_doi" content="${data.doi}">
    <meta name="citation_issn" content="${data.journal.issn}">
    <meta name="citation_publisher" content="${data.journal.publisher}"/>
  `);
  data.authors.forEach((a) => {
    appendHtml(head, `
      <meta name="citation_author" content="${a.lastName}, ${a.firstName}" />
      <meta name="citation_author_institution" content="${a.affiliation}"/>
    `)
  });

  Object.keys(data.citations).forEach(key => {
    console.log(key);
    appendHtml(head, `
      <meta name="citation_reference" content="${citation_meta_content(data.citations[key])}" >
    `);
  });
}


function appendHtml(el, html) {
  el.innerHTML += html;
}

function citation_meta_content(ref){
  var content = `citation_title=${ref.title};`;
  ref.author.split(" and ").forEach(author => {
    content += `citation_author=${author.trim()};`;
  });
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
