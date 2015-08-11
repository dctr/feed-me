import AbstractFeed from 'AbstractFeed.js';
import contentExtractor from 'contentExtractor.js';

export default class RssFeed extends AbstractFeed {
  constructor(feed) {
    super(feed);
    this.source = feed.rss.channel;
  }
  getEntries() {
    let result;

    result = [];

    this.source.item.forEach(entry => {
      result.push({
        abstract: contentExtractor(entry.description),
        dateTime: contentExtractor(entry.pubDate),
        link: contentExtractor(entry.link),
        title: contentExtractor(entry.title)
      });
    });

    return result;
  }
  getTitle() {
    return contentExtractor(this.source.title);
  }
}
