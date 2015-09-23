import feedFactory from 'feedFactory.js';

let
  collectedEntries,
  collectEntries,
  fetchedFeeds,
  fetchFeed
  ;

collectedEntries = [];
fetchedFeeds = {};

/**
 * The spec needed for this function
 * @typdef {Object} feedReloaderSpec
 * @property {Array} feeds A string array of URLs to web feeds.
 * @property {Number} [reloadS=300] The interval in seconds after which to reload the feeds.
 * @property {Number} [retries=0] The number to times to retry a fetch of a URL.
 */

/**
 * Resiliently load and reload a list of web feeds
 *
 * This function aims to load a list of feeds, retry on failure and reload after a timeout.
 * It calls the provided callback with the latest list of all combined entries each time a feed was loaded successfully.
 * @param {feedReloaderSpec} spec The specs for the (re-)loading.
 * @param callback A function to call again and again with the latest entries.
 */
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

/**
 * Collect and sort all available feed entries from all cached feeds
 */
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

/**
 * Try fetch feed data from a given URL, cache the data and provide all entries from all cached feeds to the callback
 * @param url The URL to fetch now.
 * @param retries The number of retries to do.
 * @param callback The function to call with all available feed entries.
 */
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
