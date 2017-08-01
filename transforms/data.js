import {timeFormat} from "d3-time-format";

function zeroPad(n) {
  return n < 10 ? "0" + n : n;
}
let RFC = timeFormat("%a, %d %b %Y %H:%M:%S %Z");
let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];


export class FrontMatter {
  constructor() {
    this.title = "";
    //  title: 'Attention and Augmented Recurrent Neural Networks',
    this.description = "";
    //  description: 'A visual overview of neural attention, and the powerful extensions of neural networks being built on top of it.',
    this.authors = [];
    //  [
    //    {
    //      "personalURL": null,
    //      "name": "Chris Olah",
    //      "firstName": "Chris",
    //      "lastName": "Olah",
    //      "affiliationURL": null,
    //      "affiliation": "Google Brain"
    //    }
    //  ]
    this.bibliography = {};
    //  {
    //    "gregor2015draw": {
    //      "title": "DRAW: A recurrent neural network for image generation",
    //      "author": "Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan",
    //      "journal": "arXiv preprint arXiv:1502.04623",
    //      "year": "2015",
    //      "url": "https://arxiv.org/pdf/1502.04623.pdf",
    //      "type": "article"
    //    },
    //  }
    this.citations = [];
    //  [
    //    "gregor2015draw",
    //    "mercier2011humans",
    //    "dong2014image",
    //    "dumoulin2016guide",
    //    "mordvintsev2015inceptionism"
    //  ]
    // Listed in the order that they are appear in the document.


    //
    // Assigned from posts.csv
    //

    //  publishedDate: 2016-09-08T07:00:00.000Z,
    //  tags: [ 'rnn' ],
    //  distillPath: '2016/augmented-rnns',
    //  githubPath: 'distillpub/post--augmented-rnns',
    //  doiSuffix: 1,

    //
    // Assigned from journal
    //

    //  journal: {
    //    "title": "Distill",
    //    "full_title": "Distill",
    //    "abbrev_title": "Distill",
    //    "url": "http://distill.pub",
    //    "doi": "10.23915/distill",
    //    "publisherName": "Distill Working Group",
    //    "publisherEmail": "admin@distill.pub",
    //    "issn": "2476-0757",
    //    "editors": [...],
    //    "committee": [...]
    //  }
    //  volume: 1,
    //  issue: 9,

    //
    // Assigned from publishing process
    //

    //  githubCompareUpdatesUrl: 'https://github.com/distillpub/post--augmented-rnns/compare/1596e094d8943d2dc0ea445d92071129c6419c59...3bd9209e0c24d020f87cf6152dcecc6017cbc193',
    //  updatedDate: 2017-03-21T07:13:16.000Z,
    //  doi: '10.23915/distill.00001',

  }

  //
  // Computed Properties
  //

  // 'http://distill.pub/2016/augmented-rnns',
  set url(value) {
    this._url = value;
  }
  get url() {
    if (this._url) {
      return this._url
    } else if (this.distillPath && this.journal.url) {
      return this.journal.url + "/" + this.distillPath;
    } else if (this.journal.url) {
      return this.journal.url;
    }
  }

  // 'https://github.com/distillpub/post--augmented-rnns',
  get githubUrl() {
    return "https://github.com/" + this.githubPath;
  }

  // TODO resolve differences in naming of URL/Url/url.
  // 'http://distill.pub/2016/augmented-rnns/thumbnail.jpg',
  set previewURL(value) {
    this._previewURL = value;
  }
  get previewURL() {
    return this._previewURL ? this._previewURL : this.url + "/thumbnail.jpg";
  }

  // 'Thu, 08 Sep 2016 00:00:00 -0700',
  get publishedDateRFC() {
    return RFC(this.publishedDate);
  }

  // 'Thu, 08 Sep 2016 00:00:00 -0700',
  get updatedDateRFC() {
    return RFC(this.updatedDate);
  }

  // 2016,
  get publishedYear() {
    return this.publishedDate.getFullYear();
  }

  // 'Sept',
  get publishedMonth() {
    return months[data.publishedDate.getMonth()];
  }

  // 8,
  get publishedDay() {
    return data.publishedDate.getDate();
  }

  // '09',
  get publishedMonthPadded() {
    return zeroPad(data.publishedDate.getMonth() + 1);
  }

  // '08',
  get publishedDayPadded() {
    return zeroPad(this.publishedDate.getDate());
  }

  // 'Tue, 21 Mar 2017 00:13:16 -0700',
  get updatedDateRFC() {
  }

  // 'Olah & Carter',
  get concatenatedAuthors() {
    if (this.authors.length  > 2) {
      return this.authors[0].lastName + ", et al.";
    } else if (this.authors.length === 2) {
      return this.authors[0].lastName + " & " + this.authors[1].lastName;
    } else if (this.authors.length === 1) {
      return this.authors[0].lastName
    }
  }

  // 'Olah, Chris and Carter, Shan',
  get bibtexAuthors() {
    return this.authors.map(author => author.lastName + ", " + author.firstName }).join(" and ");
  }

  // 'olah2016attention'
  get slug() {
    return this.authors.length ? this.authors[0].lastName.toLowerCase() + this.publishedYear + this.title.split(" ")[0].toLowerCase() : "Untitled";
  }

}
