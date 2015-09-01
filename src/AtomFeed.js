import AbstractFeed from 'AbstractFeed.js';
import contentExtractor from 'contentExtractor.js';

export default class AtomFeed extends AbstractFeed {
  constructor(feed) {
    super(feed);
    this._source = feed.feed;
  }
  getEntries() {
    let result;

    result = [];

    this._source.entry.forEach(entry => {
      result.push({
        abstract: contentExtractor(entry.summary),
        dateTime: new Date(contentExtractor(entry.updated)),
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
