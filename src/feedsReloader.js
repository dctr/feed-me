import feedFactory from 'feedFactory.js';

let
  collectedEntries,
  collectEntries,
  fetchedFeeds,
  fetchFeed
  ;

collectedEntries = [];
fetchedFeeds = {};

export default (spec, callback) => {
  let args;

  args = JSON.parse(JSON.stringify(spec));

  args.feeds = args.feeds || [];
  args.reloadS = args.reloadS || 300;
  args.retries = args.retries || 0;

  console.log('Starting reloader with %o', args);

  args.reloadMS = args.reloadS * 1000;

  args.feeds.forEach(url => {
    fetchFeed(url, args.retries, callback);
    window.setInterval(() => {
      fetchFeed(url, args.retries, callback);
    }, args.reloadMS);
  });
};

collectEntries = () => {
  let url;

  collectedEntries = [];

  for (url in fetchedFeeds) {
    if (fetchedFeeds.hasOwnProperty(url)) {
      collectedEntries = collectedEntries.concat(fetchedFeeds[url].entries);
    }
  }

  collectedEntries.sort((entry0, entry1) => {
    return entry1.dateTime - entry0.dateTime;
  });
};

fetchFeed = (url, retries, callback) => {
  if (retries < 0) {
    return;
  }

  feedFactory(url).then(data => {
    fetchedFeeds[url] = data;
    collectEntries();
    callback(collectedEntries);
  }).catch(reason => {
    if (retries === 0) {
      console.error('Could not load "%s"; reason: "%s"; %o', url, reason.message, reason.data);
    }
    fetchFeed(url, retries - 1, callback);
  });
};
