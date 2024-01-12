import { Route } from "./ui/route.js";
import { Card } from "./ui/card.js";
import { Nav } from "./ui/nav.js";

import { scramble } from "./scripts/scramble.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".scramble").forEach((elem) => {
    elem.onmouseenter = () => {
      scramble(elem);
    };
  });
});
