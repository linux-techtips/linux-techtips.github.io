export const swap = function (target, html) {
  document.querySelectorAll(target).forEach((elem) => {
    elem.innerHTML = html;
  });
};
