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
    /*
      //let RFC = d3.timeFormat("%a, %d %b %Y %H:%M:%S %Z");
      let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      let zeroPad = (n) => { return n < 10 ? "0" + n : n; };
      //data.publishedDateRFC = RFC(data.publishedDate);
      data.publishedYear = data.publishedDate.getFullYear();
      data.publishedMonth = months[data.publishedDate.getMonth()];
      data.publishedDay = data.publishedDate.getDate();
      data.publishedMonthPadded = zeroPad(data.publishedDate.getMonth() + 1);
      data.publishedDayPadded = zeroPad(data.publishedDate.getDate());
      data.volume = data.publishedDate.getFullYear() - 2015;
      data.issue = data.publishedDate.getMonth() + 1;
    }*/



}
