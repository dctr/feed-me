/**
 * Shallow-brained helper to extract the text of a Yahoo-JSON-ified feed element
 *
 * Yahoos API returns either {"key": "value"} or {"key": <Object>}.
 * In order to extract the value, this method plainly iterates all possible value-holding sub-elements.
 * @param element The element to extract content from.
 * @returns {string} The content possibly nested in the element.
 */
export default element => {
  if (!element) {
    return '';
  }
  return element.content || element.href || element;
};
