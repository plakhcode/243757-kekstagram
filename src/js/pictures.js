'use strict';

define(['./review', './load', './gallery', './picture'], function(review, load, Gallery, picture) {
  return function() {
    document.querySelector('.filters').classList.add('hidden');

    var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';

    var container = document.querySelector('.pictures');

    var gallery = new Gallery();

    var drawPictures = function(myPictures) {
      myPictures.forEach(function(photo, i) {
        container.appendChild(review(photo, i));
        i += i;
      });
      console.log(myPictures);
      gallery.setPictures(myPictures);
      picture();
    };

    load(PICTURES_DATA_URL, drawPictures);

    document.querySelector('.filters').classList.remove('hidden');
  };
});
