import AtomFeed from 'AtomFeed.js';
import RssFeed from 'RssFeed.js';

const
  jsonPCallbackPrefix = 'feedMeJsonP',
  jsonPTimeout = 10000
  ;

let
  buildYqlUrl,
  createScriptElement
  ;

/**
 * Retrieve a feed from a given URL
 *
 * This function uses YQL to retrieve the feed for a given URL.
 * Depending on the retrieved data it determines, which subclass of AbstractFeed should be used.
 * It returns a promise to an instance of AbstractFeed.
 * @param url The web feed URL to retrieve
 * @returns {Promise<AbstractFeed>} A promise to an instance of AbstractFeed
 */
export default url => {
  // Unique name for a JSONP callback function.
  const jsonPCallback = jsonPCallbackPrefix + Math.round(Math.random() * 1000000);

  let
    appendedScriptTag,
    appendScriptElement,
    body,
    cleanUp,
    jsonPHandler,
    rejectPromise,
    resolvePromise
    ;

  /**
   * The body DOM element, to append the JSONP script tag to.
   */
  body = document.getElementsByTagName('body')[0];

  /**
   * Append a script DOM element to the documents body.
   * @param url The src URL for the element
   */
  appendScriptElement = url => {
    appendedScriptTag = body.appendChild(createScriptElement(url));
  };

  /**
   * Remove the JSONP callback function and the YQL script element form the DOM.
   */
  cleanUp = () => {
    delete window[jsonPCallback];
    body.removeChild(appendedScriptTag);
  };

  /**
   * Handler function to register as JSONP callback.
   * @param result The data provided by the JSONP caller.
   */
  jsonPHandler = result => {
    if (result && result.query && result.query.results) {
      resolvePromise(result.query.results);
    } else {
      rejectPromise('No query result data', result);
    }
  };

  // Register the JSONP handler.
  window[jsonPCallback] = window[jsonPCallback] || jsonPHandler;

  return new Promise((resolve, reject) => {
    let resolved;

    resolved = false;

    // Wrapper around rejecting this promise, also available outside this closure.
    rejectPromise = (reason, data) => {
      let error;

      resolved = true;

      error = new Error(reason);
      error.data = data;
      reject(error);

      cleanUp();
    };

    // Wrapper around resolving this promise, also available outside this closure.
    resolvePromise = data => {
      resolved = true;

      // Determine the feed format.
      if (data.hasOwnProperty('rss')) {
        resolve(new RssFeed(data));
      } else if (data.hasOwnProperty('feed')) {
        resolve(new AtomFeed(data));
      } else {
        rejectPromise('Invalid data', data);
      }

      cleanUp();
    };

    // To avoid infinite waiting for a JSONP answer, set a timeout.
    window.setTimeout(
      () => {
        if (!resolved) {
          rejectPromise('Request timeout', {});
        }
      },
      jsonPTimeout
    );

    // Add the JSONP YQL query to the DOM.
    appendScriptElement(buildYqlUrl(url, jsonPCallback));
  });
};

/**
 * Build a YQL query URL that fetches an XML document as JSON and delivers it to a given callback
 * @param url The URL to query the XML from.
 * @param callback The callback's name to hand the data to via JSONP.
 * @returns {string} The full YQL URL to use.
 */
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

/**
 * Create a script DOM element with a given URL as src attribute
 * @param url The URl for the src attribute.
 * @returns {Element} A script DOM element.
 */
createScriptElement = url => {
  let result;

  result = document.createElement('script');
  result.setAttribute('src', url);
  return result;
};
