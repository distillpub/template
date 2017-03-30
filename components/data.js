import {timeFormat} from "d3-time-format";

export default function(dom, data) {

  //
  // Properties from source
  //

  //   title: 'Attention and Augmented Recurrent Neural Networks',
  //   description: 'A visual overview of neural attention, and the powerful extensions of neural networks being built on top of it.',
  //   url: 'http://distill.pub/2016/augmented-rnns',
  //   tags: [ 'rnn' ],
  //   doiSuffix: 1,
  //   doi: '10.23915/distill.00001',
  //   volume: 1,
  //   issue: 9,
  //   distillPath: '2016/augmented-rnns',
  //   githubPath: 'distillpub/post--augmented-rnns',
  //   githubCompareUpdatesUrl: 'https://github.com/distillpub/post--augmented-rnns/compare/1596e094d8943d2dc0ea445d92071129c6419c59...3bd9209e0c24d020f87cf6152dcecc6017cbc193',
  //   updatedDate: 2017-03-21T07:13:16.000Z,
  //   publishedDate: 2016-09-08T07:00:00.000Z,
  //   journal: {
  //     "title": "Distill",
  //     "full_title": "Distill",
  //     "abbrev_title": "Distill",
  //     "url": "http://distill.pub",
  //     "doi": "10.23915/distill",
  //     "publisherName": "Distill Working Group",
  //     "publisherEmail": "admin@distill.pub",
  //     "issn": "2476-0757",
  //     "editors": [...],
  //     "committee": [...]
  //   }

  //
  // Computed Properties
  //

  //   githubUrl: 'https://github.com/distillpub/post--augmented-rnns',
  //   previewURL: 'http://distill.pub/2016/augmented-rnns/thumbnail.jpg',
  //   publishedDateRFC: 'Thu, 08 Sep 2016 00:00:00 -0700',
  //   publishedYear: 2016,
  //   publishedMonth: 'Sept',
  //   publishedDay: 8,
  //   publishedMonthPadded: '09',
  //   publishedDayPadded: '08',
  //   updatedDateRFC: 'Tue, 21 Mar 2017 00:13:16 -0700',
  //   concatenatedAuthors: 'Olah & Carter',
  //   bibtexAuthors: 'Olah, Chris and Carter, Shan',
  //   slug: 'olah2016attention'
  //   authors: [
  //     {
  //       "personalURL": null,
  //       "name": "Chris Olah",
  //       "firstName": "Chris",
  //       "lastName": "Olah",
  //       "affiliationURL": null,
  //       "affiliation": "Google Brain"
  //     }
  //   ],
  //   bibliography: {
  //     "gregor2015draw": {
  //       "title": "DRAW: A recurrent neural network for image generation",
  //       "author": "Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan",
  //       "journal": "arXiv preprint arXiv:1502.04623",
  //       "year": "2015",
  //       "url": "https://arxiv.org/pdf/1502.04623.pdf",
  //       "type": "article"
  //     },
  //     ...
  //   },
  //   citations: [
  //     "gregor2015draw",
  //     "mercier2011humans",
  //     "dong2014image",
  //     "dumoulin2016guide",
  //     "mordvintsev2015inceptionism"
  //   ],


  // citations:
  let citations = [];
  var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
  citeTags.forEach(el => {
    let key = el.getAttribute("key");
    if (key) {
      let citationKeys = key.split(",");
      citationKeys.forEach(key => {
        if (citations.indexOf(key) == -1){
          citations.push(key);
          if (!(key in data.bibliography)){
            console.warn("No bibliography entry found for: " + key);
          }
        }
      });
    }
  });
  data.citations = citations;


  data.authors = data.authors || [];

  // paths
  if (!data.distillPath && !data.url) {
    data.url = "http://distill.pub/";
  } else if (!data.url) {
    data.url = "http://distill.pub/" + data.distillPath;
  }
  data.githubUrl = "https://github.com/" + data.githubPath;

  data.previewURL = data.previewURL ? data.previewURL : data.url + "/thumbnail.jpg"

  // Homepage
  //data.homepage = !post.noHomepage;
  data.journal = data.journal || {};

  // Dates
  if (data.publishedDate){//} && data.journal) {
    data.volume = data.publishedDate.getFullYear() - 2015;
    data.issue = data.publishedDate.getMonth() + 1;
  }

  data.publishedDate = data.publishedDate ? data.publishedDate : new Date("Invalid");
  data.updatedDate = data.updatedDate ? data.updatedDate : new Date("Invalid");

  data.publishedDateRFC
  let RFC = timeFormat("%a, %d %b %Y %H:%M:%S %Z");
  let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let zeroPad = (n) => { return n < 10 ? "0" + n : n; };
  data.publishedDateRFC = RFC(data.publishedDate);
  data.publishedYear = data.publishedDate.getFullYear();
  data.publishedMonth = months[data.publishedDate.getMonth()];
  data.publishedDay = data.publishedDate.getDate();
  data.publishedMonthPadded = zeroPad(data.publishedDate.getMonth() + 1);
  data.publishedDayPadded = zeroPad(data.publishedDate.getDate());
  data.updatedDateRFC = RFC(data.updatedDate);

  if (data.authors.length  > 2) {
    data.concatenatedAuthors = data.authors[0].lastName + ", et al.";
  } else if (data.authors.length === 2) {
    data.concatenatedAuthors = data.authors[0].lastName + " & " + data.authors[1].lastName;
  } else if (data.authors.length === 1) {
    data.concatenatedAuthors = data.authors[0].lastName
  }

  data.bibtexAuthors = data.authors.map(function(author){
    return author.lastName + ", " + author.firstName;
  }).join(" and ");

  data.slug = data.authors.length ? data.authors[0].lastName.toLowerCase() + data.publishedYear + data.title.split(" ")[0].toLowerCase() : "Untitled";

}
