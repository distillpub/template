import base from './styles-base.css';
import layout from './styles-layout.css';
import article from './styles-article.css';
import print from './styles-print.css';
import { style as byline } from '../components/d-byline.js';

export const styles = base + layout + byline + article + print;
const styleTagId = 'distill-prerendered-styles';

export function makeStyleTag(dom) {
  const prerenderedTag = dom.getElementById(styleTagId);
  if (!prerenderedTag) {
    let styleTag = dom.createElement('style');
    styleTag.id = styleTagId;
    styleTag.textContent =  styles;
    dom.head.insertBefore(styleTag, dom.head.firstChild);
  }
}
