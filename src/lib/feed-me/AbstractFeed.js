export default class AbstractFeed {
  constructor(feed) {
    this.feed = feed;
  }
  getEntries() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
  getTitle() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
}
