'use strict';

define(['./review', './load', './picture'], function(review, load, picture) {
  return function() {
    document.querySelector('.filters').classList.add('hidden');

    var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';

    var container = document.querySelector('.pictures');

    var drawPictures = function(myPictures) {
      myPictures.forEach(function(photo, i) {
        container.appendChild(review(photo, i));
        i += i;
      });
      picture();
    };

    load(PICTURES_DATA_URL, drawPictures);

//    document.addEventListener('DOMContentLoaded', picture());


/*    setTimeout(function() {
      picture();
    }, 3000); */



    document.querySelector('.filters').classList.remove('hidden');
  };
});
