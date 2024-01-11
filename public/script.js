const $ = function (select) {
  return document.querySelectorAll(select);
};

const scramble = function (elem) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*?";
  if (!elem.dataset.scrambleText) {
    elem.dataset.scrambleText = elem.innerText;
  }

  const data_text = elem.dataset.scrambleText;
  let iter = 0;

  const interval = setInterval(() => {
    elem.innerText = elem.innerText
      .split("")
      .map((letter, idx) => {
        if (idx < iter) {
          return data_text[idx];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iter >= data_text.length) clearInterval(interval);
    iter += Math.min(0.5, 10 / data_text.length);
  }, 40);
};

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

document.addEventListener("DOMContentLoaded", () => {
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

  $("article").forEach((card) => {
    const h2 = card.querySelector("h2");
    card.onmouseenter = () => {
      scramble(h2);
    };
    observer.observe(card);
  });

  $(".scramble").forEach((elem) => {
    elem.onmouseenter = () => {
      scramble(elem);
    };
  });
});
