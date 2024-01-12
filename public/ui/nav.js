import { transition } from "../scripts/transition.js";

export const Nav = class extends HTMLElement {
  constructor() {
    super();

    this.main = document.querySelector("main");
    this.curr = "";
  }

  connectedCallback() {
    this.innerHTML = this.render();
    this.querySelectorAll("a").forEach((anchor) => {
      anchor.addEventListener("click", (event) =>
        transition(this.handleNavClick(event)),
      );
    });
  }

  handleNavClick(event) {
    event.preventDefault();

    const href = event.target.getAttribute("href");

    if (href === this.curr) {
      return;
    }

    fetch(href)
      .then((resp) => resp.text())
      .then((html) => {
        this.main.innerHTML = html;
      });

    this.curr = href;
  }

  render() {
    return `
      <nav>
        <a href="./routes/blog.html" class="scramble">blog</a>
        <span>/</span>
        <a href="./routes/whoami.html" class="scramble">whoami</a>
        <span>/</span>
        <a href="./routes/hire.html" class="scramble">hire?</a>
      </nav>
    `;
  }
};

customElements.define("ui-nav", Nav);
