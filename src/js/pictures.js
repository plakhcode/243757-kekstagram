'use strict';

define(['./review', './load'], function(review, load) {
  return function() {
    document.querySelector('.filters').classList.add('hidden');

    var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';

    var container = document.querySelector('.pictures');

    var drawPictures = function(pictures) {
      pictures.forEach(function(photo, i) {
        container.appendChild(review(photo, i));
        i += i;
      });
    };

    load(PICTURES_DATA_URL, drawPictures);

    document.querySelector('.filters').classList.remove('hidden');
  };
});
