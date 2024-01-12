import { transition } from "../scripts/transition.js";
import { swap } from "../scripts/swap.js";

import { state } from "./state.js";

export const Button = class extends HTMLElement {
  constructor() {
    super();

    const before = new Function(this.getAttribute("before"));
    const after = new Function(this.getAttribute("after"));
    const target = this.getAttribute("target");
    const href = this.getAttribute("href");

    this.onclick = async (event) => {
      event.preventDefault();

      before(event);

      if (state.route !== href) {
        state.route = href;

        fetch(href)
          .then((resp) => resp.text())
          .then((html) =>
            transition(() => {
              if (target) {
                swap(target, html);
              } else {
                this.innerHTML = html;
              }

              after(event);
            }),
          );
      } else {
        after(event);
      }
    };
  }
};

customElements.define("ui-button", Button);
