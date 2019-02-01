export function domContentLoaded() {
  return ['interactive', 'complete'].indexOf(document.readyState) !== -1;
}
