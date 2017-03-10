import {Template} from "../mixins/template";

const T = Template("d-article", `
<style>
  d-article {
    display: block;
    color: rgba(0, 0, 0, 0.8);
    padding-top: 36px;
    padding-bottom: 72px;
    overflow: hidden;
    background: white;
    min-height: calc(100vh - 70px - 182px);
    font-size: 20px;
    line-height: 1.5rem;
  }

  @media(min-width: 1024px) {
    d-article {
      font-size: 20px;
    }
  }

  /* H2 */

  d-article h2 {
    font-weight: 400;
    font-size: 26px;
    line-height: 1.25em;
    margin-top: 36px;
    margin-bottom: 24px;
  }

  @media(min-width: 1024px) {
    d-article h2 {
      margin-top: 48px;
      font-size: 30px;
    }
  }

  d-article h1 + h2 {
    font-weight: 300;
    font-size: 20px;
    line-height: 1.4em;
    margin-top: 8px;
    font-style: normal;
  }

  @media(min-width: 1080px) {
    .centered h1 + h2 {
      text-align: center;
    }
    d-article h1 + h2 {
      margin-top: 12px;
      font-size: 24px;
    }
  }

  /* H3 */

  d-article h3 {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4em;
    margin-top: 36px;
    margin-bottom: 18px;
    font-style: italic;
  }

  d-article h1 + h3 {
    margin-top: 48px;
  }

  @media(min-width: 1024px) {
    d-article h3 {
      font-size: 26px;
    }
  }

  /* H4 */

  d-article h4 {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 1.4em;
  }

  d-article a {
    color: inherit;
  }

  d-article p,
  d-article ul,
  d-article ol {
    margin-bottom: 24px;
  }

  d-article p b,
  d-article ul b,
  d-article ol b {
    -webkit-font-smoothing: antialiased;
  }

  d-article a {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    text-decoration: none;
  }

  d-article a:hover {
    border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  }

  d-article .link {
    text-decoration: underline;
    cursor: pointer;
  }

  d-article ul,
  d-article ol {
    padding-left: 24px;
  }

  d-article li {
    margin-bottom: 24px;
    margin-left: 0;
    padding-left: 0;
  }

  d-article pre {
    font-size: 14px;
    margin-bottom: 20px;
  }


  d-article hr {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-top: 60px;
    margin-bottom: 60px;
  }

  d-article section {
    margin-top: 60px;
    margin-bottom: 60px;
  }


  /* Figure */

  d-article figure {
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media(min-width: 1024px) {
    d-article figure {
      margin-top: 48px;
      margin-bottom: 48px;
    }
  }

  d-article figure img {
    width: 100%;
  }

  d-article figure svg text,
  d-article figure svg tspan {
  }

  d-article figure figcaption {
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
    line-height: 1.5em;
  }
  @media(min-width: 1024px) {
    d-article figure figcaption {
      font-size: 13px;
    }
  }

  d-article figure.external img {
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
    padding: 18px;
    box-sizing: border-box;
  }

  d-article figure figcaption a {
    color: rgba(0, 0, 0, 0.6);
  }

  /*d-article figure figcaption::before {
    position: relative;
    display: block;
    top: -20px;
    content: "";
    width: 25px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }*/

  d-article span.equation-mimic {
    font-family: georgia;
    font-size: 115%;
    font-style: italic;
  }

  d-article figure figcaption b {
    font-weight: 600;
    color: rgba(0, 0, 0, 1.0);
  }

  d-article > d-code,
  d-article section > d-code  {
    display: block;
  }

  d-article .citation {
    color: #668;
    cursor: pointer;
  }

  d-include {
    width: auto;
    display: block;
  }
</style>
`, false);

export default class Article extends T(HTMLElement) {
  static get is() { return "d-article"; }
}

customElements.define(Article.is, Article);