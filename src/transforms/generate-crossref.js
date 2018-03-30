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

//import xml from "xml";

export default function(data) {


  var date = data.publishedDate;

  var batch_timestamp = Math.floor(Date.now() / 1000);
  var batch_id = data.authors.length ? data.authors[0].lastName.toLowerCase().slice(0,20) : 'Anonymous';
  batch_id += '_' + date.getFullYear();
  batch_id += '_' + data.title.split(' ')[0].toLowerCase().slice(0,20) + '_' +  batch_timestamp;
  // generate XML
  var crf_data =
    {doi_batch : [

      { _attr: {
        version: '4.3.7',
        xmlns: 'http://www.crossref.org/schema/4.3.7',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': 'http://www.crossref.org/schema/4.3.7 http://www.crossref.org/schemas/crossref4.3.7.xsd',
      }},

      { head: [
        {doi_batch_id: batch_id},
        {timestamp: batch_timestamp},
        {depositor: [
          {depositor_name: data.journal.publisherName},
          {email_address: data.journal.publisherEmail},
        ]},
        {registrant: data.journal.publisherName},
      ]},

      {body: [
        {journal: [

          {journal_metadata: [
            {full_title: data.journal.full_title || data.journal.title},
            {abbrev_title: data.journal.abbrev_title || data.journal.title || data.journal.full_title},
            {issn: data.journal.issn},
            {doi_data: [
              {doi: data.journal.doi},
              {resource: data.journal.url},
            ]},
          ]},

          {journal_issue: [
            {publication_date: [
              {month: date.getMonth()+1},
              {year: date.getFullYear()},
            ]},
            {journal_volume: [
              {volume: data.volume},
            ]},
            {issue: data.issue},
          ]},

          {journal_article: [
            {titles: [
              {title: data.title},
            ]},
            { contributors:
              data.authors.map((author, ind) => (
                {person_name: [
                  { _attr: {
                    contributor_role: 'author',
                    sequence: (ind == 0)? 'first' : 'additional'
                  }},
                  {given_name: author.firstName},
                  {surname: author.lastName},
                  {affiliation: author.affiliation}
                  // TODO: ORCID?
                ]}
              ))
            },
            {publication_date: [
              {month: date.getMonth()+1},
              {day: date.getDate()},
              {year: date.getFullYear()}
            ]},
            { publisher_item: [
              {item_number: data.doi}
            ]},
            {doi_data: [
              {doi: data.doi},
              //{timestamp: ""},
              {resource: data.url},
            ]},
            {citation_list:
              data.citations.map(key =>
                citation_xml(key, data.bibliography[key]))
            }

          ]},

        ]},
      ]},
    ]};

  return xml(crf_data);
}

function citation_xml(key, ent){
  if (ent == undefined) return {};
  var info = [];
  info.push({_attr: {key: key}});
  if ('title' in ent)
    info.push({article_title: ent.title});
  if ('author' in ent)
    info.push({author: ent.author.split(' and ')[0].split(',')[0].trim()});
  if ('journal' in ent)
    info.push({journal_title: ent.journal});
  if ('booktitle' in ent)
    info.push({volume_title: ent.booktitle});
  if ('volume' in ent)
    info.push({volume: ent.volume});
  if ('issue' in ent)
    info.push({issue: ent.issue});
  if ('doi' in ent)
    info.push({doi: ent.doi});
  return {citation: info};
}

function xml(obj) {
  //console.log(typeof(obj), obj)
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'number') return ''+obj;
  let keys = Object.keys(obj);
  if (keys.length != 1) console.error('can\'t interpret ', obj, 'as xml');
  let name = keys[0];
  var full_content = obj[name];
  var attr = {};
  if (Array.isArray(full_content)){
    var content = [];
    for (var i in  full_content) {
      var obj = full_content[i];
      var obj_name = Object.keys(obj)[0];
      if ('_attr' == obj_name) {
        attr = obj['_attr'];
      } else {
        //console.log(Object.keys(obj)[0])
        content.push(obj);
      }
    }
  } else {
    content = full_content;
  }
  if (content == undefined){
    content = 'undefined';
  }

  let attr_string = '';
  for (var k in attr) {
    attr_string += ` ${k}=\"${attr[k]}\"`;
  }

  //console.log(typeof content, Array.isArray(content), content instanceof String, content)
  if (Array.isArray(content)){
    content = content.map(xml);
    content = content.join('\n').split('\n');
    content = content.map(s => '  ' + s).join('\n');
    var result = `<${name}${attr_string}>\n${content}\n</${name}>`;
  } else {
    content = xml(content);
    var result = `<${name}${attr_string}>${content}</${name}>`;
  }
  return result;
}
