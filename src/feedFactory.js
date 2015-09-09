import AtomFeed from 'AtomFeed.js';
import RssFeed from 'RssFeed.js';

const
  jsonPCallbackPrefix = 'feedMeJsonP',
  jsonPTimeout = 10000
  ;

let
  buildYqlUrl,
  createScriptTag
  ;

export default url => {
  const jsonPCallback = jsonPCallbackPrefix + Math.round(Math.random() * 1000000);

  let
    appendedScriptTag,
    appendScriptTag,
    body,
    cleanUp,
    jsonPHandler,
    rejectPromise,
    resolvePromise
    ;

  body = document.getElementsByTagName('body')[0];

  appendScriptTag = url => {
    appendedScriptTag = body.appendChild(createScriptTag(url));
  };

  cleanUp = () => {
    delete window[jsonPCallback];
    body.removeChild(appendedScriptTag);
  };

  jsonPHandler = result => {
    if (result && result.query && result.query.results) {
      resolvePromise(result.query.results);
    } else {
      rejectPromise('No query result data', result);
    }
  };

  window[jsonPCallback] = window[jsonPCallback] || jsonPHandler;

  return new Promise((resolve, reject) => {
    let resolved;

    resolved = false;

    rejectPromise = (reason, data) => {
      let error;

      resolved = true;

      error = new Error(reason);
      error.data = data;
      reject(error);

      cleanUp();
    };

    resolvePromise = data => {
      resolved = true;

      if (data.hasOwnProperty('rss')) {
        resolve(new RssFeed(data));
      } else if (data.hasOwnProperty('feed')) {
        resolve(new AtomFeed(data));
      } else {
        rejectPromise('Invalid data', data);
      }

      cleanUp();
    };

    window.setTimeout(
      () => {
        if (!resolved) {
          rejectPromise('Request timeout', {});
        }
      },
      jsonPTimeout
    );

    appendScriptTag(buildYqlUrl(url, jsonPCallback));
  });
};

buildYqlUrl = (url, callback) => {
  const base = 'https://query.yahooapis.com/v1/public/yql?q=';

  let
    params,
    query
    ;

  query = 'select * from xml where url="' + url + '"';
  params = '&format=json&diagnostics=false&callback=' + callback;

  return base + encodeURIComponent(query) + params;
};

createScriptTag = url => {
  let result;

  result = document.createElement('script');
  result.setAttribute('src', url);
  return result;
};
