// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias, prefer-rest-params
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
