import AbstractFeed from 'AbstractFeed.js';

export default class RssFeed extends AbstractFeed{
  constructor(feed) {
    super(feed);
  }
  getTitle() {
    return getContent(this.feed.rss.channel.title);
  }
}
