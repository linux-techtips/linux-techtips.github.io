const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*?";

const $ = function (select) {
  return document.querySelectorAll(select);
};

const scramble = function (elem) {
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

document.addEventListener("DOMContentLoaded", () => {
  const slideInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const elem = entry.target;

        elem.style.animation = `var(--card-animation) ${idx * 250}ms both`;

        const onAnimationEnd = function () {
          elem.style.removeProperty("animation");
          elem.removeEventListener("animationend", onAnimationEnd);
        };

        elem.addEventListener("animationend", onAnimationEnd);

        slideInObserver.unobserve(elem);
      }
    });
  });

  $("main article").forEach((card) => slideInObserver.observe(card));

  const scrambleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scramble(entry.target);
        }
      });
    },
    { threshold: 1.0 },
  );

  $(".scramble").forEach((elem) => {
    elem.dataset.scrambleText = elem.innerText;
    scrambleObserver.observe(elem);
  });

  let links = $("nav a");
  links.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      links.forEach((link) => link.classList.remove("active"));
      event.target.classList.add("active");
    });
  });

  $("nav a.scramble").forEach((elem) =>
    elem.addEventListener("mouseover", (event) => scramble(event.target)),
  );
});
