import * as feedFactory from 'feedFactory.js';

let outputArea = document.getElementById('output');

feedFactory.getFeed('http://rss.golem.de/rss.php?feed=ATOM1.0').then(data => {
  console.log('Promise resolved');
  console.log(data);
  outputArea.innerHTML = data;
}).catch(error => {
  console.log('Promise rejected');
  console.log(error);
});
