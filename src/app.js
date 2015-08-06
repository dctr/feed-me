import feedFactory from 'feedFactory.js';

let outputArea = document.getElementById('output');

feedFactory('http://rss.golem.de/rss.php?feed=ATOM1.0').then(data => {
  console.log('ATOM');
  console.log(data);
  outputArea.innerHTML = data;
}).catch(error => {
  console.log('Promise rejected');
  console.log(error);
});

feedFactory('http://www.heise.de/newsticker/heise-atom.xml').then(data => {
  console.log('RSS');
  console.log(data);
  outputArea.innerHTML = data;
}).catch(error => {
  console.log('Promise rejected');
  console.log(error);
});
