import {timeFormat} from "d3-time-format";

export default function(dom, data) {

    data.authors = data.authors || [];

    // paths
    //data.distillPath = post.distillPath;
    //data.githubPath = post.githubPath;
    //data.url = "http://distill.pub/" + post.distillPath;
    //data.githubUrl = "https://github.com/" + post.githubPath;

    // Homepage
    //data.homepage = !post.noHomepage;
    data.journal = data.journal || {};

    // Dates
    // TODO: fix updated date
    if (data.published){//} && data.journal) {
      data.volume = data.published.getFullYear() - 2015;
      data.issue = data.published.getMonth() + 1;
    }
    data.publishedDateRFC
    let RFC = timeFormat("%a, %d %b %Y %H:%M:%S %Z");
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let zeroPad = (n) => { return n < 10 ? "0" + n : n; };
    data.publishedDateRFC = RFC(data.published);
    data.publishedYear = data.published.getFullYear();
    data.publishedMonth = months[data.published.getMonth()];
    data.publishedDay = data.published.getDate();
    data.publishedMonthPadded = zeroPad(data.published.getMonth() + 1);
    data.publishedDayPadded = zeroPad(data.published.getDate());

    if (data.authors.length  > 2) {
      data.concatenatedAuthors = data.authors[0].lastName + ", et al.";
    } else if (data.authors.length === 2) {
      data.concatenatedAuthors = data.authors[0].lastName + " & " + data.authors[1].lastName;
    } else if (data.authors.length === 1) {
      data.concatenatedAuthors = data.authors[0].lastName
    }

}
