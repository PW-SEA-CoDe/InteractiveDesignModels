/**
 * Collection of functions used in creating HTML/CSS/JS elements
 */

/**
 *
 * @param {object} target object: defined Div
 * @param  {...dict} dicts dict: Collection of any series of style dicts
 */
export function UpdateStyle(target, ...dicts) {
  for (const dict of dicts) {
    for (const [key, value] of Object.entries(dict)) {
      target.style[key] = value;
    }
  }
}

/**
 *
 * @param {string} id string: div id
 * @param {dict} style dict: dict styling
 * @returns
 */
export function CreateDiv(id, style) {
  const div = document.createElement("div");
  div.id = id;
  UpdateStyle(div, style);
  return div;
}
