# Distill Templates

## Development

Run `yarn start` to start a watching build rollup server.

## Testing

Run `yarn test`. That's it.


## TODO:

-[ ] auto detection/adding behavior
  * title
  * appendix
  * footnote list ?
-[x] should work without distill-appendix
-[x] YML author without ":" should work?
-[ ] throw warning on <hr>
-[ ] h numbering:
  h2: position relative
  a: position: absolute;
  right: calc(100% + 16px);
  /* text-align: right; */
  /* width: 80px; */
  /* font-size: 20px; */
  /* font-weight: 200; */


auto-added elements:
 title in front, no h1 -> add it
 no title in front, h1 -> read and put into frontMatter
 footnote -> footnote list
 break up bib
 if citation, no bib-list -> add citation-list
 if authors, no byline -> add byline
 no appendix -> add appendix
 