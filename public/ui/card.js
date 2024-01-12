import { scramble } from "../scripts/scramble.js";

export const Card = class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    const article = this.querySelector("article");
    const h2 = article.querySelector("h2");

    article.onmouseenter = () => scramble(h2);
    observer.observe(article);
  }

  template({ head, desc, tags, link, media }) {
    return `
      <article>
        <section class="head">
          <h2>${head}</h2>
          <hr />
        </section>
        <section class="desc">
          <p>${desc}</p>
        </section>
        <section class="tags">
          <ul>
            ${tags
              .split(" ")
              .map((tag) => `<li>${tag}</li>`)
              .join("\n")}
          </ul>
          <a href="${link}">
            <i class="fa-solid fa-link"></i>
          </a>
        </section>
        <section class="media">
          <img alt="image" src="${media}"></img>
        </section>
      </article>
    `;
  }

  render() {
    this.innerHTML = this.template({
      head: this.getAttribute("head"),
      desc: this.getAttribute("desc"),
      media: this.getAttribute("media"),
      tags: this.getAttribute("tags"),
      link: this.getAttribute("link"),
    });
  }
};

customElements.define("ui-card", Card);

const animateCardIn = function (card, idx) {
  const keyframes = [
    { transform: "translateX(-100%)", opacity: 0 },
    { transform: "translateX(0)", opacity: 1 },
  ];

  const options = {
    delay: idx * 250,
    easing: "cubic-bezier(.42,0,.33,1.18)",
    duration: 750,
  };

  const animation = card.animate(keyframes, options);
  animation.onfinish = () => {
    card.style.transform = "";
    card.style.opacity = "1";
  };
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        animateCardIn(entry.target, idx);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);
