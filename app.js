System.register(['feedFactory.js'], function (_export) {
  'use strict';

  var feedFactory, collectedEntries, createOutputTag, fetchCountDownLatch, fetchFeed, main, outputElement, printFeedEntries;
  return {
    setters: [function (_feedFactoryJs) {
      feedFactory = _feedFactoryJs['default'];
    }],
    execute: function () {
      collectedEntries = undefined;
      createOutputTag = undefined;
      fetchCountDownLatch = undefined;
      fetchFeed = undefined;
      main = undefined;
      outputElement = undefined;
      printFeedEntries = undefined;

      collectedEntries = [];
      fetchCountDownLatch = 0;
      outputElement = document.getElementById('output');

      createOutputTag = function (feedTitle, entryTitle, link, dateTime) {
        var col1 = undefined,
            col2 = undefined,
            col2Content = undefined,
            col3 = undefined,
            result = undefined;

        col1 = document.createElement('td');
        col1.textContent = feedTitle;

        col2 = document.createElement('td');
        col2Content = document.createElement('a');
        col2Content.href = link;
        col2Content.appendChild(document.createTextNode(entryTitle));
        col2.appendChild(col2Content);

        col3 = document.createElement('td');
        col3.textContent = dateTime.toLocaleString();

        result = document.createElement('tr');
        result.appendChild(col1);
        result.appendChild(col2);
        result.appendChild(col3);

        return result;
      };

      fetchFeed = function (url) {
        console.time(url);
        fetchCountDownLatch++;
        feedFactory(url).then(function (data) {
          console.timeEnd(url);
          console.log('Received %i entries for %s', data.entries.length, url);
          collectedEntries = collectedEntries.concat(data.entries);
          fetchCountDownLatch--;
          if (fetchCountDownLatch === 0) {
            printFeedEntries();
          }
        })['catch'](function (reason) {
          console.timeEnd(url);
          console.error('Could not load %s; reason: %s, %o', url, reason.message, reason.data);
          fetchCountDownLatch--;
          if (fetchCountDownLatch === 0) {
            printFeedEntries();
          }
        });
      };

      printFeedEntries = function () {
        console.log('Sorting %i entries', collectedEntries.length);
        collectedEntries.sort(function (val1, val2) {
          return val2.dateTime - val1.dateTime;
        });
        console.log('Printing entries');
        collectedEntries.forEach(function (feedEntry) {
          outputElement.appendChild(createOutputTag(feedEntry.feedTitle, feedEntry.title, feedEntry.link, feedEntry.dateTime));
        });
      };

      main = function () {
        var queryObject = undefined,
            queryString = undefined;

        queryString = window.location.search.slice(1);
        if (!queryString) {
          console.log('No query provided');
          return;
        }

        queryObject = JSON.parse(window.decodeURIComponent(queryString));
        console.log('Query object: %o', queryObject);
        queryObject.feeds.forEach(fetchFeed);
      };

      main();

      // myDefaultFeeds = {
      //  "feeds": [
      //    "http://rss.golem.de/rss.php?feed=ATOM1.0",
      //    "http://ticker.gulli.com/rss",
      //    "http://www.bbc.co.uk/blogs/doctorwho/atom",
      //    "http://www.heise.de/developer/rss/news-atom.xml",
      //    "http://www.heise.de/netze/rss/netze-atom.xml",
      //    "http://www.heise.de/newsticker/heise-atom.xml",
      //    "http://www.heise.de/open/news/news-atom.xml",
      //    "http://www.heise.de/security/news/news-atom.xml",
      //    "http://www.pro-linux.de/rss/1/4/atom_alles.xml",
      //    "https://mailbox.org/feed/",
      //    "https://www.archlinux.org/feeds/news/",
      //    "https://www.tagesschau.de/xml/rss2"
      //  ]
      // }
    }
  };
});
//# sourceMappingURL=app.js.map
