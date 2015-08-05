const jsonPCallbackPrefix = 'feedMeJsonP';
const jsonPTimeout = 10000;

export function getFeed(url) {
  let appendedChild;
  let body = document.getElementsByTagName('body')[0];
  let resolvePromise;
  let now = new Date();

  const jsonPCallback = jsonPCallbackPrefix + now.getMinutes().toString() + now.getSeconds().toString() + now.getMilliseconds().toString();

  function cleanUp(url) {
    delete window[jsonPCallback];
    body.removeChild(appendedChild);
  }

  function addScriptTagForUrl(url) {
    appendedChild = body.appendChild(createScriptTag(url));
  }

  function jsonPHandler(result) {
    resolvePromise(JSON.stringify(result.query.results));
  }

  window[jsonPCallback] = window[jsonPCallback] || jsonPHandler;

  return new Promise((resolve, reject) => {
    let resolved = false;

    resolvePromise = data => {
      resolved = true;
      // TODO: Resolve with parsed data (either RSS class or ATOM class).
      resolve(data);
      cleanUp(url);
    };

    setTimeout(() => {
        if (!resolved) {
          reject(new Error('Request timeout'));
          cleanUp(url);
        }
      },
      jsonPTimeout
    );

    addScriptTagForUrl(buildYqlUrl(url, jsonPCallback));

  });

}

function buildYqlUrl(url, callback) {
  const base = 'https://query.yahooapis.com/v1/public/yql?q=';
  let query = 'select * from xml where url="' + url + '"';
  let params = '&format=json&diagnostics=false&callback=' + callback;

  return base + encodeURIComponent(query) + params;
}

function createScriptTag(url) {
  var result = document.createElement('script');
  result.setAttribute('src', url);
  return result;
}
