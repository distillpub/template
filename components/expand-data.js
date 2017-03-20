import {timeFormat} from "d3-time-format";

export default function(dom, data) {

    data.authors = data.authors || [];

    // paths
    data.url = data.url ? data.url : "http://distill.pub/" + data.distillPath;
    data.githubUrl = "https://github.com/" + data.githubPath;

    data.previewURL = data.previewURL ? data.previewURL : data.url + "/thumbnail.jpg"

    // Homepage
    //data.homepage = !post.noHomepage;
    data.journal = data.journal || {};

    // Dates
    if (data.publishedDate){//} && data.journal) {
      data.volume = data.publishedDate.getFullYear() - 2015;
      data.issue = data.publishedDate.getMonth() + 1;
    }

    data.publishedDate = data.publishedDate ? data.publishedDate : new Date("Invalid");
    data.updatedDate = data.updatedDate ? data.updatedDate : new Date("Invalid");

    data.publishedDateRFC
    let RFC = timeFormat("%a, %d %b %Y %H:%M:%S %Z");
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let zeroPad = (n) => { return n < 10 ? "0" + n : n; };
    data.publishedDateRFC = RFC(data.publishedDate);
    data.publishedYear = data.publishedDate.getFullYear();
    data.publishedMonth = months[data.publishedDate.getMonth()];
    data.publishedDay = data.publishedDate.getDate();
    data.publishedMonthPadded = zeroPad(data.publishedDate.getMonth() + 1);
    data.publishedDayPadded = zeroPad(data.publishedDate.getDate());
    data.updatedDateRFC = RFC(data.updatedDate);

    if (data.authors.length  > 2) {
      data.concatenatedAuthors = data.authors[0].lastName + ", et al.";
    } else if (data.authors.length === 2) {
      data.concatenatedAuthors = data.authors[0].lastName + " & " + data.authors[1].lastName;
    } else if (data.authors.length === 1) {
      data.concatenatedAuthors = data.authors[0].lastName
    }

    data.bibtexAuthors = data.authors.map(function(author){
      return author.lastName + ", " + author.firstName;
    }).join(" and ");

    data.slug = data.authors.length ? data.authors[0].lastName.toLowerCase() + data.publishedYear + data.title.split(" ")[0].toLowerCase() : "Untitled";

}
