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
        feeds.sort(function (val1, val2) {
          return val2.dateTime - val1.dateTime;
        });
        console.log('Printing entries: ' + feedArray.length);
        feedArray.forEach(function (feed) {
          outputArea.appendChild(newOutputTag(feed.feedTitle + ' -- <strong><a href="' + feed.link + '" target="_blank">' + feed.title + '</a></strong> -- ' + feed.dateTime.toLocaleString()));
        });
      };

      ['http://rss.golem.de/rss.php?feed=ATOM1.0', 'http://ticker.gulli.com/rss', 'http://www.bbc.co.uk/blogs/doctorwho/atom', 'http://www.heise.de/developer/rss/news-atom.xml', 'http://www.heise.de/netze/rss/netze-atom.xml', 'http://www.heise.de/newsticker/heise-atom.xml', 'http://www.heise.de/open/news/news-atom.xml', 'http://www.heise.de/security/news/news-atom.xml', 'http://www.pro-linux.de/rss/1/4/atom_alles.xml', 'https://mailbox.org/feed/', 'https://www.archlinux.org/feeds/news/', 'https://www.tagesschau.de/xml/rss2'].forEach(function (url) {
        countDownLatch++;
        console.log('Fetching: ' + url);
        feedFactory(url).then(function (data) {
          feeds = feeds.concat(data.getEntries());
          console.log(feeds.length + ' -- ' + countDownLatch);
          countDownLatch--;
          if (countDownLatch === 0) {
            printFeeds(feeds);
          }
        })['catch'](function (reason) {
          console.log('Could not load ' + url);
          console.log(reason);
          countDownLatch--;
          if (countDownLatch === 0) {
            printFeeds(feeds);
          }
        });
      });
    }
  };
});
//# sourceMappingURL=app.js.map
