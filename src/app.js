import feedFactory from 'feedFactory.js';

let newPTag,
  outputArea;

outputArea = document.getElementById('output');

newPTag = content => {
  let result;

  result = document.createElement('p');
  result.innerHTML = content;
  return result;
};

feedFactory('http://rss.golem.de/rss.php?feed=ATOM1.0').then(data => {
  console.log('ATOM');
  console.log(data);
  outputArea.appendChild(newPTag(data));
  outputArea.appendChild(newPTag(data.getTitle()));
}).catch(error => {
  console.log('Promise rejected');
  console.log(error);
});

feedFactory('http://www.heise.de/newsticker/heise-atom.xml').then(data => {
  console.log('RSS');
  console.log(data);
  outputArea.appendChild(newPTag(data));
  outputArea.appendChild(newPTag(data.getTitle()));
}).catch(error => {
  console.log('Promise rejected');
  console.log(error);
});
