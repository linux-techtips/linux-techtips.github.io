export const transition = function (callback) {
  if (!document.startViewTransition) {
    return;
  }

  return document.startViewTransition(callback);
};
