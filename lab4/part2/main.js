const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageNameList = [
  'pic1.jpg',
  'pic2.jpg',
  'pic3.jpg',
  'pic4.jpg',
  'pic5.jpg',
];

/* Declaring the alternative text for each image file */
const imageAltList = [
  'Closeup of a human eye',
  'Stone patterns in nature',
  'Purple flowers',
  'Ancient Egypt',
  'Butterfly lands on the leaf',
];
/* Looping through images */
imageNameList.forEach((image, index) => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${image}`);
  newImage.setAttribute('alt', imageAltList[index]);
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', onImageClicked);

  function onImageClicked(element) {
    const src = element.target.getAttribute('src');
    const alt = element.target.getAttribute('alt');
    displayedImage.setAttribute('src', src);
    displayedImage.setAttribute('alt', alt);
  }
});

/* Wiring up the Darken/Lighten button */
