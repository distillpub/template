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

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
const zeroPad = n => n < 10 ? '0' + n : n;

const RFC = function(date) {
  const day = days[date.getDay()].substring(0, 3);
  const paddedDate = zeroPad(date.getDate());
  const month = months[date.getMonth()].substring(0,3);
  const year = date.getFullYear().toString();
  const hours = date.getUTCHours().toString();
  const minutes = date.getUTCMinutes().toString();
  const seconds = date.getUTCSeconds().toString();
  return `${day}, ${paddedDate} ${month} ${year} ${hours}:${minutes}:${seconds} Z`;
};

const objectFromMap = function(map) {
  const object = Array.from(map).reduce((object, [key, value]) => (
    Object.assign(object, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
  ), {});
  return object;
};

const mapFromObject = function(object) {
  const map = new Map();
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      map.set(property, object[property]);
    }
  }
  return map;
};

class Author {

  // constructor(name='', personalURL='', affiliation='', affiliationURL='') {
  //   this.name = name; // 'Chris Olah'
  //   this.personalURL = personalURL; // 'https://colah.github.io'
  //   this.affiliation = affiliation; // 'Google Brain'
  //   this.affiliationURL = affiliationURL; // 'https://g.co/brain'
  // }

  constructor(object) {
    this.name = object.author; // 'Chris Olah'
    this.personalURL = object.authorURL; // 'https://colah.github.io'
    this.affiliation = object.affiliation; // 'Google Brain'
    this.affiliationURL = object.affiliationURL; // 'https://g.co/brain'
    this.affiliations = object.affiliations || []; // new-style affiliations
  }

  // 'Chris'
  get firstName() {
    const names = this.name.split(' ');
    return names.slice(0, names.length - 1).join(' ');
  }

  // 'Olah'
  get lastName() {
    const names = this.name.split(' ');
    return names[names.length -1];
  }
}

export function mergeFromYMLFrontmatter(target, source) {
  target.title = source.title;
  if (source.published) {
    if (source.published instanceof Date) {
      target.publishedDate = source.published;
    } else if (source.published.constructor === String) {
      target.publishedDate = new Date(source.published);
    }
  }
  if (source.publishedDate) {
    if (source.publishedDate instanceof Date) {
      target.publishedDate = source.publishedDate;
    } else if (source.publishedDate.constructor === String) {
      target.publishedDate = new Date(source.publishedDate);
    } else {
      console.error('Don\'t know what to do with published date: ' + source.publishedDate);
    }
  }
  target.description = source.description;
  target.authors = source.authors.map( (authorObject) => new Author(authorObject));
  target.katex = source.katex;
  target.password = source.password;
  if (source.doi) {
    target.doi = source.doi;
  }
}

export class FrontMatter {
  constructor() {
    this.title = 'unnamed article'; // 'Attention and Augmented Recurrent Neural Networks'
    this.description = ''; // 'A visual overview of neural attention...'
    this.authors = []; // Array of Author(s)

    this.bibliography = new Map();
    this.bibliographyParsed = false;
    //  {
    //    'gregor2015draw': {
    //      'title': 'DRAW: A recurrent neural network for image generation',
    //      'author': 'Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan',
    //      'journal': 'arXiv preprint arXiv:1502.04623',
    //      'year': '2015',
    //      'url': 'https://arxiv.org/pdf/1502.04623.pdf',
    //      'type': 'article'
    //    },
    //  }

    // Citation keys should be listed in the order that they are appear in the document.
    // Each key refers to a key in the bibliography dictionary.
    this.citations = []; // [ 'gregor2015draw', 'mercier2011humans' ]
    this.citationsCollected = false;

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
    this.journal = {};
    //  journal: {
    //    'title': 'Distill',
    //    'full_title': 'Distill',
    //    'abbrev_title': 'Distill',
    //    'url': 'http://distill.pub',
    //    'doi': '10.23915/distill',
    //    'publisherName': 'Distill Working Group',
    //    'publisherEmail': 'admin@distill.pub',
    //    'issn': '2476-0757',
    //    'editors': [...],
    //    'committee': [...]
    //  }
    //  volume: 1,
    //  issue: 9,

    this.katex = {};

    //
    // Assigned from publishing process
    //

    //  githubCompareUpdatesUrl: 'https://github.com/distillpub/post--augmented-rnns/compare/1596e094d8943d2dc0ea445d92071129c6419c59...3bd9209e0c24d020f87cf6152dcecc6017cbc193',
    //  updatedDate: 2017-03-21T07:13:16.000Z,
    //  doi: '10.23915/distill.00001',
    this.doi = undefined;
    this.publishedDate = undefined;
  }

  // Example:
  // title: Demo Title Attention and Augmented Recurrent Neural Networks
  // published: Jan 10, 2017
  // authors:
  // - Chris Olah:
  // - Shan Carter: http://shancarter.com
  // affiliations:
  // - Google Brain:
  // - Google Brain: http://g.co/brain

  //
  // Computed Properties
  //

  // 'http://distill.pub/2016/augmented-rnns',
  set url(value) {
    this._url = value;
  }
  get url() {
    if (this._url) {
      return this._url;
    } else if (this.distillPath && this.journal.url) {
      return this.journal.url + '/' + this.distillPath;
    } else if (this.journal.url) {
      return this.journal.url;
    }
  }

  // 'https://github.com/distillpub/post--augmented-rnns',
  get githubUrl() {
    if (this.githubPath) {
      return 'https://github.com/' + this.githubPath;
    } else {
      return undefined;
    }
  }

  // TODO resolve differences in naming of URL/Url/url.
  // 'http://distill.pub/2016/augmented-rnns/thumbnail.jpg',
  set previewURL(value) {
    this._previewURL = value;
  }
  get previewURL() {
    return this._previewURL ? this._previewURL : this.url + '/thumbnail.jpg';
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
    return months[this.publishedDate.getMonth()];
  }

  // 8,
  get publishedDay() {
    return this.publishedDate.getDate();
  }

  // '09',
  get publishedMonthPadded() {
    return zeroPad(this.publishedDate.getMonth() + 1);
  }

  // '08',
  get publishedDayPadded() {
    return zeroPad(this.publishedDate.getDate());
  }

  get publishedISODateOnly() {
    return this.publishedDate.toISOString().split('T')[0];
  }

  get volume() {
    const volume = this.publishedYear - 2015;
    if (volume < 1) {
      throw new Error('Invalid publish date detected during computing volume');
    }
    return volume;
  }

  get issue() {
    return this.publishedDate.getMonth() + 1;
  }

  // 'Olah & Carter',
  get concatenatedAuthors() {
    if (this.authors.length > 2) {
      return this.authors[0].lastName + ', et al.';
    } else if (this.authors.length === 2) {
      return this.authors[0].lastName + ' & ' + this.authors[1].lastName;
    } else if (this.authors.length === 1) {
      return this.authors[0].lastName;
    }
  }

  // 'Olah, Chris and Carter, Shan',
  get bibtexAuthors() {
    return this.authors.map(author => {
      return author.lastName + ', ' + author.firstName;
    }).join(' and ');
  }

  // 'olah2016attention'
  get slug() {
    let slug = '';
    if (this.authors.length) {
      slug += this.authors[0].lastName.toLowerCase();
      slug += this.publishedYear;
      slug += this.title.split(' ')[0].toLowerCase();
    }
    return slug || 'Untitled';
  }

  get bibliographyEntries() {
    return new Map(this.citations.map( citationKey => {
      const entry = this.bibliography.get(citationKey);
      return [citationKey, entry];
    }));
  }

  set bibliography(bibliography) {
    if (bibliography instanceof Map) {
      this._bibliography = bibliography;
    } else if (typeof bibliography === 'object') {
      this._bibliography = mapFromObject(bibliography);
    }
  }

  get bibliography() {
    return this._bibliography;
  }

  static fromObject(source) {
    const frontMatter = new FrontMatter();
    Object.assign(frontMatter, source);
    return frontMatter;
  }

  assignToObject(target) {
    Object.assign(target, this);
    target.bibliography = objectFromMap(this.bibliographyEntries);
    target.url = this.url;
    target.doi = this.doi;
    target.githubUrl = this.githubUrl;
    target.previewURL = this.previewURL;
    if (this.publishedDate) {
      target.volume = this.volume;
      target.issue = this.issue;
      target.publishedDateRFC = this.publishedDateRFC;
      target.publishedYear = this.publishedYear;
      target.publishedMonth = this.publishedMonth;
      target.publishedDay = this.publishedDay;
      target.publishedMonthPadded = this.publishedMonthPadded;
      target.publishedDayPadded = this.publishedDayPadded;
    }
    if (this.updatedDate) {
      target.updatedDateRFC = this.updatedDateRFC;
    }
    target.concatenatedAuthors = this.concatenatedAuthors;
    target.bibtexAuthors = this.bibtexAuthors;
    target.slug = this.slug;
  }

}
