import { Template } from '../mixins/template';

const T = Template('d-references', `
<style>
d-references {
  display: block;
}
</style>
`, false);

export  class References extends T(HTMLElement) {

}
