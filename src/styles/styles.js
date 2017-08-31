import base from './styles-base.css';
import layout from './styles-layout.css';
import article from './styles-article.css';
import print from './styles-print.css';
import { style as byline } from '../components/d-byline.js';
import { style as math } from '../components/d-math.js';

export const styles = base + layout + byline + math + article + print;

export function makeStyleTag(dom) {

  const styleTagId = 'distill-prerendered-styles';
  const prerenderedTag = dom.getElementById(styleTagId);
  if (!prerenderedTag) {
    const styleTag = dom.createElement('style');
    styleTag.id = styleTagId;
    styleTag.type = 'text/css';
    const cssTextTag = dom.createTextNode(styles);
    styleTag.appendChild(cssTextTag);
    dom.head.insertBefore(styleTag, dom.head.firstChild);
  }

}
