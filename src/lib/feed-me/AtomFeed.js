import AbstractFeed from 'AbstractFeed.js';
import AtomFeedEntries from 'AbstractFeedEntries.js';
import contentExtractor from 'contentExtractor.js';

export default class AtomFeed extends AbstractFeed {
  constructor(feed) {
    super(feed);
    this.source = feed.feed;
  }
  getEntries() {
    return new AtomFeedEntries(this.source.entry);
  }
  getTitle() {
    return contentExtractor(this.source.title);
  }
}
