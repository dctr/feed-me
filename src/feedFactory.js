import AtomFeed from 'AtomFeed.js';
import RssFeed from 'RssFeed.js';

const jsonPCallbackPrefix = 'feedMeJsonP';
const jsonPTimeout = 10000;

export default url => {
  const jsonPCallback = jsonPCallbackPrefix + Math.round(Math.random() * 1000000);

  let appendedChild,
    body,
    resolvePromise;

  body = document.getElementsByTagName('body')[0];

  function cleanUp() {
    delete window[jsonPCallback];
    body.removeChild(appendedChild);
  }

  function addScriptTagForUrl(url) {
    appendedChild = body.appendChild(createScriptTag(url));
  }

  function jsonPHandler(result) {
    resolvePromise(result.query.results);
  }

  window[jsonPCallback] = window[jsonPCallback] || jsonPHandler;

  return new Promise((resolve, reject) => {
    let resolved;

    resolved = false;

    resolvePromise = data => {
      resolved = true;
      if (!data) {
        reject(new Error('No data'));
      } else if (data.hasOwnProperty('rss')) {
        resolve(new RssFeed(data));
      } else if (data.hasOwnProperty('feed')) {
        resolve(new AtomFeed(data));
      } else {
        reject(new Error('Invalid data'));
      }
      cleanUp();
    };

    window.setTimeout(
      () => {
        if (!resolved) {
          reject(new Error('Request timeout'));
          cleanUp();
        }
      },
      jsonPTimeout
    );

    addScriptTagForUrl(buildYqlUrl(url, jsonPCallback));
  });
};

function buildYqlUrl(url, callback) {
  const base = 'https://query.yahooapis.com/v1/public/yql?q=';

  let params,
    query;

  query = 'select * from xml where url="' + url + '"';
  params = '&format=json&diagnostics=false&callback=' + callback;

  return base + encodeURIComponent(query) + params;
}

function createScriptTag(url) {
  let result;

  result = document.createElement('script');
  result.setAttribute('src', url);
  return result;
}
