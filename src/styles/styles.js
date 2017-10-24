import base from './styles-base.css';
import layout from './styles-layout.css';
import print from './styles-print.css';
import byline from './d-byline.css';
import article from './d-article.css';
import title from './d-title.css';
import math from './d-math.css';

export const styles = base + layout + title + byline + article + math + print;

export function makeStyleTag(dom) {

  const styleTagId = 'distill-prerendered-styles';
  const prerenderedTag = dom.getElementById(styleTagId);
  if (!prerenderedTag) {
    const styleTag = dom.createElement('style');
    styleTag.id = styleTagId;
    styleTag.type = 'text/css';
    const cssTextTag = dom.createTextNode(styles);
    styleTag.appendChild(cssTextTag);
    const firstScriptTag = dom.head.querySelector('script');
    dom.head.insertBefore(styleTag, firstScriptTag);
  }

}
