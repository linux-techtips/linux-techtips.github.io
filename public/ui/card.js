export const Card = class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.querySelectorAll("article").forEach((card) => {
      observer.observe(card);
    });
  }

  template({ head, desc, tags, link, media }) {
    return `
      <style>
        article {
          --border: 10px;
          --gap: 20px;

          display: grid;
          grid-template-columns: 55% 45%;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "head media"
            "desc media"
            "desc media"
            "tags media";

            background-color: var(--card-background-color);
            margin-bottom: 2rem;
            margin-top: 2rem;
            overflow: hidden;
            padding: 1.2rem; 

            box-shadow: 0 12px 18px rgba(0, 0, 0, 0.4);
            border-radius: var(--border);
            opacity: 0;

            transition:
              transform 300ms cubic-bezier(0.42, 0, 0.08, 1.15),
              box-shadow 300ms;
        }

        article:hover {
          transform: scale(1.05);
          box-shadow: 0 16px 24px rgba(0, 0, 0, 0.6);
        }

        article .head {
          grid-area: head;
          padding-right: var(--gap);
        }

        article .head h2 {
            font-family: var(--text-primary-font);
            color: var(--text-primary-color);
            font-size: 1.4rem;
        }

        article .head hr {
          background-color: var(--text-tertiary-color);
          margin: 1.5rem 0 1rem 0;
          border: none;
          height: 4px;
          width: 20px;
        }

        article .desc {
          grid-area: desc;
          padding-right: var(--gap);
        }

        article .desc p { 
          font-size: 1.2rem;
          margin-top: 0;
        }

        article .tags {
          grid-area: tags;
          display: flex;
          padding-right: var(--gap);
        }

        article .tags ul {
          display: flex;
          flex-direction: row;
          
          list-style-type: none;
          padding: 0;
          margin: 0;
          gap: 1rem;
        }

        article .tags ul li,
        article .tags a {
          background-color: var(--body-background-color);
          color: var(--text-primary-color);

          font-weight: bold;
          font-size: 1rem;

          border-radius: 10px;
          padding: 0.6rem;
        }

        article .tags a {
          margin-left: auto;
        }

        article .media {
          grid-area: media;

          display: flex;
          justify-content: center;
          align-items: center;
  
          overflow: hidden;
          border-radius: 10px;
        }

        article .media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 600px) {
          article .media {
            display: none;
          }

          article {
            grid-template-columns: 1fr;
            grid-template-areas:
              "head"
              "desc"
              "tags";
          }

          article .tags {
            padding-right: 0;
          }
        }
      </style>
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
