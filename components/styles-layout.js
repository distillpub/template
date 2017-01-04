export default `
.l-body,
.l-page,
dt-article > * {
  margin-left: 24px;
  margin-right: 24px;
  box-sizing: border-box;
}

@media(min-width: 768px) {
  .l-body,
  .l-page,
  dt-article > * {
    margin-left: 72px;
    margin-right: 72px;
  }
}

@media(min-width: 1080px) {
  .l-body,
  dt-article > * {
    margin-left: calc(50% - 984px / 2);
    width: 648px;
  }
  .l-body-outset,
  dt-article .l-body-outset {
    margin-left: calc(50% - 984px / 2 - 24px);
    width: calc(648px + 48px);
  }
  .l-middle,
  dt-article .l-middle {
    width: 816px;
    margin-left: calc(50% - 984px / 2);
  }
  .l-page,
  dt-article .l-page {
    width: 984px;
    margin-left: auto;
    margin-right: auto;
  }
  .l-page-outset,
  dt-article .l-page-outset {
    width: 1080px;
    margin-left: auto;
    margin-right: auto;
  }
  .l-screen,
  dt-article .l-screen {
    margin-left: auto;
    margin-right: auto;
    width: auto;
  }
  .l-screen-inset,
  dt-article .l-screen-inset {
    margin-left: 24px;
    margin-right: 24px;
    width: auto;
  }
  .l-gutter,
  dt-article .l-gutter {
    clear: both;
    float: right;
    margin-top: 0;
    margin-left: 24px;
    margin-right: calc((100vw - 960px) / 2);
    width: calc((984px - 648px) / 2 - 24px);
  }
  /* Side */
  .side.l-body,
  dt-article .side.l-body {
    clear: both;
    float: right;
    margin-top: 0;
    margin-left: 48px;
    margin-right: calc((100vw - 984px + 648px) / 2);
    width: calc(648px / 2 - 24px);
  }
  .side.l-body-outset,
  dt-article .side.l-body-outset {
    clear: both;
    float: right;
    margin-top: 0;
    margin-left: 48px;
    margin-right: calc((100vw - 984px + 648px - 48px) / 2);
    width: calc(648px / 2 - 48px + 24px);
  }
  .side.l-page,
  dt-article .side.l-page {
    clear: both;
    float: right;
    margin-top: 0;
    margin-left: 48px;
    margin-right: calc((100vw - 984px) / 2);
    width: calc(960px / 2 - 48px);
  }
}
`
