System.register(['AtomFeed.js', 'RssFeed.js'], function (_export) {
  'use strict';

  var AtomFeed, RssFeed, jsonPCallbackPrefix, jsonPTimeout, buildYqlUrl, createScriptTag;
  return {
    setters: [function (_AtomFeedJs) {
      AtomFeed = _AtomFeedJs['default'];
    }, function (_RssFeedJs) {
      RssFeed = _RssFeedJs['default'];
    }],
    execute: function () {
      jsonPCallbackPrefix = 'feedMeJsonP';
      jsonPTimeout = 10000;
      buildYqlUrl = undefined;
      createScriptTag = undefined;

      _export('default', function (url) {
        var jsonPCallback = jsonPCallbackPrefix + Math.round(Math.random() * 1000000);

        var appendedScriptTag = undefined,
            appendScriptTag = undefined,
            body = undefined,
            cleanUp = undefined,
            jsonPHandler = undefined,
            rejectPromise = undefined,
            resolvePromise = undefined;

        body = document.getElementsByTagName('body')[0];

        appendScriptTag = function (url) {
          appendedScriptTag = body.appendChild(createScriptTag(url));
        };

        cleanUp = function () {
          delete window[jsonPCallback];
          body.removeChild(appendedScriptTag);
        };

        jsonPHandler = function (result) {
          if (result && result.query && result.query.results) {
            resolvePromise(result.query.results);
          } else {
            rejectPromise('No query result data', result);
          }
        };

        window[jsonPCallback] = window[jsonPCallback] || jsonPHandler;

        return new Promise(function (resolve, reject) {
          var resolved = undefined;

          resolved = false;

          rejectPromise = function (reason, data) {
            var error = undefined;

            resolved = true;

            error = new Error(reason);
            error.data = data;
            reject(error);

            cleanUp();
          };

          resolvePromise = function (data) {
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

          window.setTimeout(function () {
            if (!resolved) {
              rejectPromise('Request timeout', {});
            }
          }, jsonPTimeout);

          appendScriptTag(buildYqlUrl(url, jsonPCallback));
        });
      });

      buildYqlUrl = function (url, callback) {
        var base = 'https://query.yahooapis.com/v1/public/yql?q=';

        var params = undefined,
            query = undefined;

        query = 'select * from xml where url="' + url + '"';
        params = '&format=json&diagnostics=false&callback=' + callback;

        console.log(base + encodeURIComponent(query) + params);

        return base + encodeURIComponent(query) + params;
      };

      createScriptTag = function (url) {
        var result = undefined;

        result = document.createElement('script');
        result.setAttribute('src', url);
        return result;
      };
    }
  };
});
//# sourceMappingURL=feedFactory.js.map
