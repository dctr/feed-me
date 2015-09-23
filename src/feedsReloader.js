import feedFactory from 'feedFactory.js';

let
  collectedEntries,
  collectEntries,
  fetchedFeeds,
  fetchFeed,
  reportFeed
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
    reportFeed(url, args.retries, callback);
    window.setInterval(() => {
      reportFeed(url, args.retries, callback);
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

  console.log('Collected %i entries', collectedEntries.length);

  collectedEntries.sort((entry0, entry1) => {
    return entry1.dateTime - entry0.dateTime;
  });
};

fetchFeed = url => {
  return new Promise((resolve, reject) => {
    console.time(url);
    feedFactory(url).then(data => {
      console.timeEnd(url);
      resolve(data);
    }).catch(reason => {
      console.timeEnd(url);
      reject(reason);
    });
  });
};

reportFeed = (url, retries, callback) => {
  if (retries < 0) {
    console.error('Giving up fetching %s', url);
    return;
  }

  fetchFeed(url).then(data => {
    console.log('Received %i entries for %s', data.entries.length, url);
    fetchedFeeds[url] = data;
    collectEntries();
    callback(collectedEntries);
  }).catch(reason => {
    console.error('Could not load %s; reason: %s, %o', url, reason.message, reason.data);
    reportFeed(url, retries - 1, callback);
  });
};
