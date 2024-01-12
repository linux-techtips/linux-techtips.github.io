const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*?";

export const scramble = function (elem) {
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
