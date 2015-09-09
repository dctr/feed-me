import AbstractFeed from 'AbstractFeed.js';
import contentExtractor from 'contentExtractor.js';

export default class AtomFeed extends AbstractFeed {
  constructor(feed) {
    super();

    let source;

    source = feed.feed;
    this._title = contentExtractor(source.title);
    this._entries = [];

    source.entry.forEach(entry => {
      this._entries.push({
        abstract: contentExtractor(entry.summary),
        dateTime: new Date(contentExtractor(entry.updated)),
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
