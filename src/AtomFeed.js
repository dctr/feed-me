import AbstractFeed from 'AbstractFeed.js';

export default class AtomFeed extends AbstractFeed {
  constructor(feed) {
    super(feed);
  }
  getEntries() {

  }
  getTitle() {
    return getContent(this.feed.feed.title);
  }
}
