const jsonPHandlerPrefix = 'feedMeJsonP';
const jsonPTimeout = 10000;

export function getFeed(url) {
  const promiseKey = encodeURIComponent(url);
  let feedPromiseResolve;
  let appendedChild;

  function cleanUp(url) {
    delete window[jsonPHandlerPrefix + promiseKey];
    document.removeChild(appendedChild);
    // TODO remove url after loaded.
  }

  function addTagForUrl(url) {
    appendedChild = document.getElementsByTagName('body')[0].appendChild(createScriptTag(url));
  }

  function jsonPHandler(result) {
    console.log(result);
    feedPromiseResolve(JSON.stringify(result.query.results));
  }

  window[jsonPHandlerPrefix + promiseKey] = window[jsonPHandlerPrefix + promiseKey] || jsonPHandler;

  return new Promise((resolve, reject) => {
    let resolved = false;

    feedPromiseResolve = function resolveWrapper(data) {
      resolved = true;
      resolve(data);
      cleanUp(url);
    };

    setTimeout(function rejectAfterTimeout() {
      if (!resolved) {
        reject();
        cleanUp(url);
      }
    }, jsonPTimeout);

    addTagForUrl(buildYqlUrl(url));

  });

}

function buildYqlUrl(url) {
  var base, query, params;
  base = 'https://query.yahooapis.com/v1/public/yql?q=';
  query = 'select * from xml where url="' + url + '"';
  params = '&format=json&diagnostics=false&callback=feedMe.handler';
  console.log(base + encodeURIComponent(query) + params);
  return base + encodeURIComponent(query) + params;
}

function createScriptTag(url) {
  var result = document.createElement('script');
  result.setAttribute('src', url);
  return result;
}
