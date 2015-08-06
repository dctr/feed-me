import feedFactory from 'feedFactory.js';

let outputArea = document.getElementById('output');
let newPTag = content => {
  let result = document.createElement('p');
  result.innerHTML = content;
  return result;
};

feedFactory('http://rss.golem.de/rss.php?feed=ATOM1.0').then(data => {
  console.log('ATOM');
  console.log(data);
  outputArea.appendChild(newPTag(data));
  outputArea.appendChild(newPTag(data.getTitle()))
}).catch(error => {
  console.log('Promise rejected');
  console.log(error);
});

feedFactory('http://www.heise.de/newsticker/heise-atom.xml').then(data => {
  console.log('RSS');
  console.log(data);
  outputArea.appendChild(newPTag(data));
  outputArea.appendChild(newPTag(data.getTitle()))
}).catch(error => {
  console.log('Promise rejected');
  console.log(error);
});
