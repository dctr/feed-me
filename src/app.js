import feedsReloader from 'feedsReloader.js';

let
  clearOutputArea,
  createOutputElement,
  displayEntries,
  main,
  outputRootNode
  ;

outputRootNode = document.getElementById('output');

clearOutputArea = () => {
  while (outputRootNode.firstChild) {
    outputRootNode.removeChild(outputRootNode.firstChild);
  }
};

createOutputElement = (feedTitle, entryTitle, link, dateTime) => {
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

displayEntries = entries => {
  clearOutputArea();
  entries.forEach(entry => {
    outputRootNode.appendChild(createOutputElement(
      entry.feedTitle,
      entry.title,
      entry.link,
      entry.dateTime
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
  feedsReloader(queryObject, displayEntries);
};

main();
