'use strict';

var pictures = [];

document.querySelector('.filters').classList.add('hidden');

var template = document.querySelector('template');
var container = document.querySelector('.pictures');
var templateContainer = 'content' in template ? template.content : template;

var getPhoto = function(photos) {
  var photoElement = templateContainer.querySelector('.picture').cloneNode(true);

  var image = new Image();

  image.onload = function() {
    photoElement.querySelector('img').src = image.src;
  };

  image.onerror = function() {
    photoElement.classList.add('picture-load-failure');
  };

  if (photos.preview) {
    image.src = photos.preview;
  } else {
    image.src = photos.url;
  }

  photoElement.querySelector('.picture-comments').textContent = photos.comments;
  photoElement.querySelector('.picture-likes').textContent = photos.likes;

  return photoElement;
};

pictures.forEach(function(photo) {
  container.appendChild(getPhoto(photo));
});

document.querySelector('.filters').classList.remove('hidden');
