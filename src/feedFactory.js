import AtomFeed from 'AtomFeed.js';
import RssFeed from 'RssFeed.js';

const jsonPCallbackPrefix = 'feedMeJsonP';
const jsonPTimeout = 10000;

export default url => {
  let appendedChild,
    body,
    now,
    resolvePromise;

  body = document.getElementsByTagName('body')[0];
  now = new Date();

  const jsonPCallback = jsonPCallbackPrefix +
    now.getMinutes().toString() +
    now.getSeconds().toString() +
    now.getMilliseconds().toString();

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
      if (data.hasOwnProperty('rss')) {
        resolve(new RssFeed(data));
      } else if (data.hasOwnProperty('feed')) {
        resolve(new AtomFeed(data));
      } else {
        reject(new Error('Invalid data'));
      }
      cleanUp(url);
    };

    setTimeout(
      () => {
        if (!resolved) {
          reject(new Error('Request timeout'));
          cleanUp(url);
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