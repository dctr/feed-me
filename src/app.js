import getFeed from 'feedFactory';

let outputArea = document.getElementById('output');

getFeed('http://rss.golem.de/rss.php?feed=ATOM1.0').then(
  function onThen(data) {
    console.log('Promise resolved');
    console.log(data);
    outputArea.innerHTML = data;
  }
).catch(
  function onCatch(error) {
    console.log('Promise rejected');
    console.log(error);
  }
);
