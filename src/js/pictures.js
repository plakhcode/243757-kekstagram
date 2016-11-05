'use strict';

document.querySelector('.filters').classList.add('hidden');

var template = document.querySelector('template');
var container = document.querySelector('.pictures');
var templateContainer = 'content' in template ? template.content : template;

var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';

var getPictures = function(url, callback) {

  window.__jsonpCallback = function(data) {
    callback(data);
    script.parentNode.removeChild(script);
  };

  var script = document.createElement('script');

  script.onerror = function() {
    script.parentNode.removeChild(script);
  };

  script.src = url + (url.match(/\?/) ? '&' : '?') + 'callback=__jsonpCallback';
  document.body.appendChild(script);

};

var getPhotoElement = function(photos) {
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

var setPictures = function(pictures) {
  pictures.forEach(function(photo) {
    container.appendChild(getPhotoElement(photo));
  });
};

getPictures(PICTURES_DATA_URL, setPictures);

document.querySelector('.filters').classList.remove('hidden');
