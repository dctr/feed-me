import AbstractFeed from 'AbstractFeed.js';
import RssFeedEntries from 'RssFeedEntries.js';
import contentExtractor from 'contentExtractor.js';

export default class RssFeed extends AbstractFeed{
  constructor(feed) {
    super(feed);
    this.source = this.feed.rss.channel;
  }
  getEntries() {
    return new RssFeedEntries(this.source.item)
  }
  getTitle() {
    return contentExtractor(this.source.title);
  }
}
