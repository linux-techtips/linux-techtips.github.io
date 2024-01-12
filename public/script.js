import { scramble } from "./scripts/scramble.js";

import { Include } from "./ui/include.js";
import { Button } from "./ui/button.js";
import { Card } from "./ui/card.js";
import { state } from "./ui/state.js";

window.scramble = scramble;

window.hirePlease = function (event) {
  document.querySelector("#hire").scrollIntoView({
    behavior: "smooth",
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".scramble").forEach((elem) => {
    elem.onmouseenter = () => scramble(elem);
  });

  let links = document.querySelectorAll("nav ui-button");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      for (let other of links) {
        other.classList.remove("active");
      }
      link.classList.add("active");
    });
  });
});
