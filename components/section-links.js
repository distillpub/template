import Clipboard from 'clipboard';

const copySuccessClass = "clipboard-copy-success";
const sectionLinkClass = "section-link";

export default function(dom, data) {

  let locationWithoutAnchor = () => {
    return document.location.href.match(/(^[^#]*)/)[0];
  };

  // only add section links to headings that have declared ids
  let headings = [].slice.apply(dom.querySelectorAll("h2[id],h3[id],h4[id],h5[id],h6[id]"));
  headings.forEach( (heading) => {
    let url = locationWithoutAnchor() + '#' + heading.id;

    // TODO: do we usually use some kind of templates?
    let sectionLink = dom.createElement("span");
    let content = document.createTextNode("Copy link to this section into clipboard");
    sectionLink.appendChild(content);
    sectionLink.classList.add(sectionLinkClass);
    sectionLink.setAttribute('data-clipboard-text', url);
    heading.appendChild(sectionLink);
  });

  // add copy link to clipboard functionality
  let clipboard = new Clipboard('.' + sectionLinkClass);

  // show users that they copied a link to their clipboard
  clipboard.on('success', (event) => {
    // TODO: send an analytics event? This is almost as good as sharing.
    let sectionLink = event.trigger;
    let originalContent = sectionLink.textContent;
    sectionLink.textContent = "Copied link to clipboard!"
    sectionLink.classList.add(copySuccessClass);
    let resetSectionLink = () => {
      sectionLink.textContent = originalContent;
      sectionLink.classList.remove(copySuccessClass);
      sectionLink.parentElement.removeEventListener("mouseleave", resetSectionLink);
    }
    sectionLink.parentElement.addEventListener('mouseleave', resetSectionLink);
  });

  clipboard.on('error', (e) => {
    // TODO: send an analytics event here to track bugs?
    console.log(e);
  });

}
