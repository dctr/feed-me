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
  console.log('Sorting entries: ' + feeds.length);
  feeds.sort((a, b) => {
    return b.dateTime - a.dateTime;
  });
  console.log('Printing entries: ' + feedArray.length);
  feedArray.forEach(currentValue => {
    outputArea.appendChild(newOutputTag(
      currentValue.feedTitle +
      ' -- <strong><a href="' + currentValue.link + '" target="_blank">' + currentValue.title + '</a></strong> -- ' +
      currentValue.dateTime.toLocaleString()
    ));
  });
};

[
  'http://newspresso.gulli.com/rss',
  'http://rss.golem.de/rss.php?feed=ATOM1.0',
  'http://www.bbc.co.uk/blogs/doctorwho/atom',
  'http://www.heise.de/developer/rss/news-atom.xml',
  'http://www.heise.de/netze/rss/netze-atom.xml',
  'http://www.heise.de/newsticker/heise-atom.xml',
  'http://www.heise.de/open/news/news-atom.xml',
  'http://www.heise.de/security/news/news-atom.xml',
  'http://www.pro-linux.de/rss/1/4/atom_alles.xml',
  'https://mailbox.org/feed/',
  'https://www.archlinux.org/feeds/news/',
  'https://www.tagesschau.de/xml/rss2'
].forEach(url => {
  countDownLatch++;
  console.log('Fetching: ' + url);
  feedFactory(url).then(data => {
    feeds = feeds.concat(data.getEntries());
    countDownLatch--;
    console.log(feeds.length + ' -- ' + countDownLatch);
    if (countDownLatch === 0) {
      printFeeds(feeds);
    }
  });
});
