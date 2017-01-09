let assert = require("assert"),
    jsdom = require("jsdom").jsdom,
    distill = require("../dist/template.js");

describe("distill", () => {
  it("Should have a render function", () => {
    assert(distill.render);
  });
});

// var doc = jsdom("<script>var shan = 'testing'</script>");
// var window = doc.defaultView;
// console.log(window.shan);
