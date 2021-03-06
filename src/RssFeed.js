import AbstractFeed from 'AbstractFeed.js';
import contentExtractor from 'contentExtractor.js';

export default class RssFeed extends AbstractFeed {
  constructor(feed) {
    super();

    let source;

    source = feed.rss.channel;
    this._title = contentExtractor(source.title);
    this._entries = [];

    source.item.forEach(entry => {
      this._entries.push({
        abstract: contentExtractor(entry.description),
        dateTime: new Date(contentExtractor(entry.pubDate)),
        feedTitle: this.title,
        link: contentExtractor(entry.link),
        title: contentExtractor(entry.title)
      });
    });
  }
  get entries() {
    return this._entries;
  }
  get title() {
    return this._title;
  }
}
