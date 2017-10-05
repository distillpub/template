import base from './styles-base.css';
import layout from './styles-layout.css';
import print from './styles-print.css';
import { style as byline } from '../components/d-byline';
import { style as article } from '../components/d-article';
import math from './d-math.css';

export const styles = base + layout + byline + article + math + print;

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
