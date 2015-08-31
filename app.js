System.register(['feedFactory.js'], function (_export) {
  'use strict';

  var feedFactory, countDownLatch, feeds, newOutputTag, outputArea, printFeeds;
  return {
    setters: [function (_feedFactoryJs) {
      feedFactory = _feedFactoryJs['default'];
    }],
    execute: function () {
      countDownLatch = undefined;
      feeds = undefined;
      newOutputTag = undefined;
      outputArea = undefined;
      printFeeds = undefined;

      countDownLatch = 0;
      feeds = [];
      outputArea = document.getElementById('output');

      newOutputTag = function (content) {
        var result = undefined;

        result = document.createElement('p');
        result.innerHTML = content;
        return result;
      };

      printFeeds = function (feedArray) {
        console.log('Sorting entries: ' + feeds.length);
        feeds.sort(function (a, b) {
          return b.dateTime - a.dateTime;
        });
        console.log('Printing entries: ' + feedArray.length);
        feedArray.forEach(function (currentValue) {
          outputArea.appendChild(newOutputTag(currentValue.feedTitle + ' -- <strong>' + currentValue.title + '</strong> -- ' + currentValue.dateTime.toLocaleString()));
        });
      };

      ['http://rss.golem.de/rss.php?feed=ATOM1.0', 'http://www.heise.de/newsticker/heise-atom.xml', 'https://www.tagesschau.de/xml/rss2'].forEach(function (url) {
        countDownLatch++;
        console.log('Fetching: ' + url);
        feedFactory(url).then(function (data) {
          feeds = feeds.concat(data.getEntries());
          countDownLatch--;
          console.log(feeds.length + ' -- ' + countDownLatch);
          if (countDownLatch === 0) {
            printFeeds(feeds);
          }
        });
      });
    }
  };
});
//# sourceMappingURL=app.js.map
