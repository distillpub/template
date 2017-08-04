export default function(dom, data) {

  var fnTags = [].slice.apply(dom.querySelectorAll('dt-fn'));
  var fnContent = [];
  fnTags.forEach((el,n) => {
    var content = el.innerHTML;
    fnContent.push(content);
    n = (n+1)+'';
    var key = 'fn-'+n;
    var escaped_content = content.replace(/"/g, '&#39;');
    el.innerHTML = `<sup><span id="${key}" data-hover="${escaped_content}" style="cursor:pointer">${n}</span></sup>`;
  });

  let fnList = dom.querySelector('dt-fn-list');
  if (fnList) {
    let ol = dom.createElement('ol');
    fnContent.forEach(content => {
      let el = dom.createElement('li');
      el.innerHTML = content;
      ol.appendChild(el);
    });
    fnList.appendChild(ol);
  }

}
