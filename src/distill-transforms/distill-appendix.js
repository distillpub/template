export default function(dom) {

  const appendixTag = dom.querySelector('d-appendix');
  if (!appendixTag) {
    console.warn('No appendix tag found!');
    return;
  }
  const distillAppendixTag = appendixTag.querySelector('distill-appendix');
  if (!distillAppendixTag) {
    const distillAppendix = dom.createElement('distill-appendix');
    appendixTag.appendChild(distillAppendix);
  }

}
