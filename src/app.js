(function (global) {
  var addTagForUrl,
    buildYqlUrl,
    handler,
    initialize,
    output,
    scriptTag;

  addTagForUrl = function addTagForUrl(url) {
    document.getElementsByTagName('body')[0].appendChild(scriptTag(url));
  };

  buildYqlUrl = function buildYqlUrl(url) {
    var base, query, params;
    base = 'https://query.yahooapis.com/v1/public/yql?q=';
    query = 'select * from xml where url="' + url + '"';
    params = '&format=json&diagnostics=false&callback=feedMe.handler';
    console.log(base + encodeURIComponent(query) + params);
    return base + encodeURIComponent(query) + params;
  };

  handler = function handler(result) {
    console.log(result);
    output.innerHTML = JSON.stringify(result.query.results);
  };

  initialize = function initialize() {
    global.feedMe = global.feedMe || {};
    global.feedMe.handler = global.feedMe.handler || handler;

    output = document.getElementById('output');
    addTagForUrl(buildYqlUrl('http://rss.golem.de/rss.php?feed=ATOM1.0'));
  };

  scriptTag = function scriptTag(url) {
    var result = document.createElement('script');
    result.setAttribute('src', url);
    return result;
  };

  initialize();

}(this));
