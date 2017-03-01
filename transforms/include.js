import fetch from "fetch";
let fetchUrl = fetch.fetchUrl

export default function(dom, data) {

  var includeTags = [].slice.apply(dom.querySelectorAll("dt-include"));

  includeTags.forEach(el => {
    let src = el.getAttribute("src");
    fetchUrl(src, (err, meta, body) => {
      console.log(err, meta, body);
      el.innerHTML = body.toString();
    })
  });
  data.bibliography = bibliography;
  data.citations = citations;

}
