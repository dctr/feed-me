export default class AbstractFeed {
  constructor(feed) {
    this.feed = feed;
  }
  static getContent(element) {
    return element.content || element;
  }
  getEntries() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
  getTitle() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
}
