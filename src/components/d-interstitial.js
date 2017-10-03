import { Template } from '../mixins/template';

// This overlay is not secure.
// It is only meant as a social deterrent.

const T = Template('d-interstitial', `
<style>

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;

  opacity: 1;
  visibility: visible;

  display: flex;
  flex-flow: column;
  justify-content: center;
  z-index: 2147483647 /* MaxInt32 */

}

.overlay.transparent {
  background: hsla(0, 0%, 100%, 0.7);
  transition: background 1s;
}

.container {
  position: relative;
  left: 25%;
  width: 50%;
}

h1 {
  text-decoration: underline;
  text-decoration-color: hsl(0,100%,40%);
  margin-bottom: 1em;
}

input[type="password"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-border-radius: none;
  -moz-border-radius: none;
  -ms-border-radius: none;
  -o-border-radius: none;
  border-radius: none;
  outline: none;

  font-size: 18px;
  background: none;
  width: 25%;
  padding: 10px;
  border: none;
  border-bottom: solid 2px #999;
  transition: border .3s;
}

input[type="password"]:focus {
  border-bottom: solid 2px #333;
}

input[type="password"].wrong {
  border-bottom: solid 2px hsl(0,100%,40%);
}

p small {
  color: #888;
}

</style>

<div class="overlay">
  <div class="container">
    <h1>This article is in review.</h1>
    <p>Do not share this URL, or the contents of this article. Thank you!</p>
    <input id="interstitial-password-input" type="password" name="password" autofocus/>
    <p><small>Enter the password we shared with you as part of the review process to view the article.</small></p>
  </div>
</div>
`);

export class Interstitial extends T(HTMLElement) {

  connectedCallback() {
    const passwordInput = this.root.querySelector('#interstitial-password-input');
    passwordInput.oninput = (event) => this.passwordChanged(event);
    setTimeout(() => {
      this.article = document.querySelector('d-article');
      this.article.style = 'filter: blur(15px)';
      const overlay = this.root.querySelector('.overlay');
      overlay.classList.add('transparent');
    }, 500);
  }

  passwordChanged(event) {
    const entered = event.target.value;
    if (entered === this.password) {
      console.log('Correct password entered.');
      event.target.classList.add('right');
      this.article.style = '';
      this.parentElement.removeChild(this);
    }
  }

}
