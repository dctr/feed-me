import AbstractFeed from 'AbstractFeed.js';
import contentExtractor from 'contentExtractor.js';

export default class RssFeed extends AbstractFeed {
  constructor(feed) {
    super(feed);
    this._source = feed.rss.channel;
  }
  getEntries() {
    let result;

    result = [];

    this._source.item.forEach(entry => {
      result.push({
        abstract: contentExtractor(entry.description),
        dateTime: new Date(contentExtractor(entry.pubDate)),
        feedTitle: this.getTitle(),
        link: contentExtractor(entry.link),
        title: contentExtractor(entry.title)
      });
    });

    return result;
  }
  getTitle() {
    return contentExtractor(this._source.title);
  }
}
