import {Template} from "../mixins/template";
import {body} from "./layout";
import mustache from "mustache";


const T = Template("distill-appendix", `
<style>
d-appendix {
  display: block;
}
</style>
`, false);

let mustacheTemplate = `
<h3>Updates and Corrections</h3>
<p><a href="">View all changes</a> to this article since it was first published. If you see mistakes or want to suggest changes, please <a href="">create an issue on GitHub</a>.

<h3>Reuse</h3>
<p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/2.0/">CC-BY 2.0</a>, unless noted otherwise, with the <a class="github" href="https://github.com/distillpub/post--augmented-rnns">source available on GitHub</a>. The figures that have been reused from other sources don’t fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>

<h3>Citation</h3>
<p>For attribution in academic contexts, please cite this work as</p>
<pre class="citation short">Olah &amp; Carter, "Attention and Augmented Recurrent Neural Networks", Distill, 2016.</pre>
<p>BibTeX citation</p>
<pre class="citation long">@article{olah2016attention,
  author = {Olah, Chris and Carter, Shan},
  title = {Attention and Augmented Recurrent Neural Networks},
  journal = {Distill},
  year = {2016},
  note = {http://distill.pub/2016/augmented-rnns}
}</pre>
`;

export default class DistillAppendix extends T(HTMLElement) {
  static get is() { return "distill-appendix"; }
  render(data) {
    this.innerHTML = mustache.render(mustacheTemplate, data);
  }
}

customElements.define(DistillAppendix.is, DistillAppendix);
