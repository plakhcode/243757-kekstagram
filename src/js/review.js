'use strict';

define(function() {
  return function(photos, number) {

    var template = document.querySelector('template');
    var templateContainer = 'content' in template ? template.content : template;

    var photoElement = templateContainer.querySelector('.picture').cloneNode(true);

    var image = new Image();

    image.onload = function() {
      photoElement.querySelector('img').src = image.src;
      photoElement.setAttribute('number', number);
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
});
