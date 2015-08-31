System.register(['AtomFeed.js', 'RssFeed.js'], function (_export) {
  'use strict';

  var AtomFeed, RssFeed, jsonPCallbackPrefix, jsonPTimeout;

  function buildYqlUrl(url, callback) {
    var base = 'https://query.yahooapis.com/v1/public/yql?q=';

    var params = undefined,
        query = undefined;

    query = 'select * from xml where url="' + url + '"';
    params = '&format=json&diagnostics=false&callback=' + callback;

    return base + encodeURIComponent(query) + params;
  }

  function createScriptTag(url) {
    var result = undefined;

    result = document.createElement('script');
    result.setAttribute('src', url);
    return result;
  }
  return {
    setters: [function (_AtomFeedJs) {
      AtomFeed = _AtomFeedJs['default'];
    }, function (_RssFeedJs) {
      RssFeed = _RssFeedJs['default'];
    }],
    execute: function () {
      jsonPCallbackPrefix = 'feedMeJsonP';
      jsonPTimeout = 10000;

      _export('default', function (url) {
        var appendedChild = undefined,
            body = undefined,
            resolvePromise = undefined;

        body = document.getElementsByTagName('body')[0];

        var jsonPCallback = jsonPCallbackPrefix + Math.round(Math.random() * 1000000);

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

        return new Promise(function (resolve, reject) {
          var resolved = undefined;

          resolved = false;

          resolvePromise = function (data) {
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

          setTimeout(function () {
            if (!resolved) {
              reject(new Error('Request timeout'));
              cleanUp(url);
            }
          }, jsonPTimeout);

          addScriptTagForUrl(buildYqlUrl(url, jsonPCallback));
        });
      });
    }
  };
});
//# sourceMappingURL=feedFactory.js.map
