export const Route = class extends HTMLElement {
  constructor() {
    super();

    this.route = this.getAttribute("href");
  }

  connectedCallback() {
    this.render().then((html) => {
      this.innerHTML = html;
    });
  }

  async render() {
    return (await fetch(this.route)).text();
  }
};

customElements.define("ui-route", Route);
