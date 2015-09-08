import feedFactory from 'feedFactory.js';

let countDownLatch,
  feeds,
  fetchFeed,
  inputFeeds,
  newOutputTag,
  outputArea,
  printFeeds;

countDownLatch = 0;
feeds = [];
outputArea = document.getElementById('output');

fetchFeed = url => {
  countDownLatch++;
  console.log('Fetching: ' + url);
  feedFactory(url).then(data => {
    feeds = feeds.concat(data.entries);
    console.log(feeds.length + ' -- ' + countDownLatch);
    countDownLatch--;
    if (countDownLatch === 0) {
      printFeeds(feeds);
    }
  }).catch(reason => {
    console.log('Could not load ' + url);
    console.log(reason);
    countDownLatch--;
    if (countDownLatch === 0) {
      printFeeds(feeds);
    }
  });
};

newOutputTag = (feedTitle, title, link, dateTime) => {
  let col1,
    col2,
    col2Content,
    col3,
    result;

  col1 = document.createElement('td');
  col1.innerHTML = feedTitle;
  col2 = document.createElement('td');
  col2Content = document.createElement('a');
  col2Content.title = title;
  col2Content.href = link;
  col2Content.appendChild(document.createTextNode(title));
  col2.appendChild(col2Content);
  col3 = document.createElement('td');
  col3.innerHTML = dateTime.toLocaleString();
  result = document.createElement('tr');
  result.appendChild(col1);
  result.appendChild(col2);
  result.appendChild(col3);
  return result;
};

printFeeds = feedArray => {
  console.log('Sorting entries: ' + feeds.length);
  feeds.sort((val1, val2) => {
    return val2.dateTime - val1.dateTime;
  });
  console.log('Printing entries: ' + feedArray.length);
  feedArray.forEach(feed => {
    outputArea.appendChild(newOutputTag(
      feed.feedTitle,
      feed.title,
      feed.link,
      feed.dateTime
    ));
  });
};

inputFeeds = [
  'http://rss.golem.de/rss.php?feed=ATOM1.0',
  'http://ticker.gulli.com/rss',
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
];

inputFeeds.forEach(fetchFeed);
