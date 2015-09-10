import feedFactory from 'feedFactory.js';

let
  collectedEntries,
  createOutputTag,
  fetchCountDownLatch,
  fetchFeed,
  main,
  outputElement,
  printFeedEntries
  ;

collectedEntries = [];
fetchCountDownLatch = 0;
outputElement = document.getElementById('output');

createOutputTag = (feedTitle, entryTitle, link, dateTime) => {
  let
    col1,
    col2,
    col2Content,
    col3,
    result
    ;

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

fetchFeed = url => {
  console.time(url);
  fetchCountDownLatch++;
  feedFactory(url).then(data => {
    console.timeEnd(url);
    console.log('Received %i entries for %s', data.entries.length, url);
    collectedEntries = collectedEntries.concat(data.entries);
    fetchCountDownLatch--;
    if (fetchCountDownLatch === 0) {
      printFeedEntries();
    }
  }).catch(reason => {
    console.timeEnd(url);
    console.error('Could not load %s; reason: %s, %o', url, reason.message, reason.data);
    fetchCountDownLatch--;
    if (fetchCountDownLatch === 0) {
      printFeedEntries();
    }
  });
};

printFeedEntries = () => {
  console.log('Sorting %i entries', collectedEntries.length);
  collectedEntries.sort((val1, val2) => {
    return val2.dateTime - val1.dateTime;
  });
  console.log('Printing entries');
  collectedEntries.forEach(feedEntry => {
    outputElement.appendChild(createOutputTag(
      feedEntry.feedTitle,
      feedEntry.title,
      feedEntry.link,
      feedEntry.dateTime
    ));
  });
};

main = () => {
  let
    queryObject,
    queryString
    ;

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
