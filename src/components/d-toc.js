import {Template} from '../mixins/template';

const T = Template('d-toc', `
<style>
d-toc {
  display: block;
}
</style>
`, false);

export class TOC extends T(HTMLElement) {

}
