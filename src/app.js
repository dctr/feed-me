import feedFactory from 'feedFactory.js';

let countDownLatch,
  feeds,
  newOutputTag,
  outputArea,
  printFeeds;

countDownLatch = 0;
feeds = [];
outputArea = document.getElementById('output');

newOutputTag = content => {
  let result;

  result = document.createElement('p');
  result.innerHTML = content;
  return result;
};

printFeeds = feedArray => {
  console.log('Printing feeds: ' + feedArray.length);
  feedArray.forEach(currentValue => {
    outputArea.appendChild(newOutputTag(currentValue.feedTitle + ' -- <strong>' + currentValue.title + '</strong> -- ' + currentValue.dateTime.toLocaleString()));
  });
};

[
  'http://rss.golem.de/rss.php?feed=ATOM1.0',
  'http://www.heise.de/newsticker/heise-atom.xml',
  'https://www.tagesschau.de/xml/rss2'
].forEach(url => {
  countDownLatch++;
  console.log('Fetching: ' + url);
  feedFactory(url).then(data => {
    feeds = feeds.concat(data.getEntries());
    countDownLatch--;
    console.log(feeds.length + ' -- ' + countDownLatch);
    if (countDownLatch === 0) {
      console.log('Sorting ' + typeof feeds);
      feeds.sort((a, b) => {
        console.log('Returning ' + b.dateTime + ' - ' + a.dateTime + ' = ' + (b.dateTime - a.dateTime));
        return b.dateTime - a.dateTime;
      });
      printFeeds(feeds);
    }
  });
});
