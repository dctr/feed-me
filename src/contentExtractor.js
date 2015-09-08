export default element => {
  if (!element) {
    return '';
  }
  return element.content || element.href || element;
};
