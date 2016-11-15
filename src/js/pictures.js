'use strict';

define(['./review', './load', './gallery', './picture'], function(review, load, Gallery) {
  return function() {
    document.querySelector('.filters').classList.add('hidden');

    var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';

    var container = document.querySelector('.pictures');

    var drawPictures = function(myPictures) {
      myPictures.forEach(function(photo, i) {
        container.appendChild(review(photo, i));
        i += i;
      });
    };

    load(PICTURES_DATA_URL, drawPictures);

    var showGallery = function() {
      var commenter = document.querySelectorAll('.picture-comments');
      var liker = document.querySelectorAll('.picture-likes');
      var imger = document.querySelectorAll('.picture img');
      var gallery = new Gallery(imger, commenter, liker);
      container.onclick = function() {
        gallery.show(10);
      };
    };

    setTimeout(function() {
      showGallery();
    }, 2000);

    document.querySelector('.filters').classList.remove('hidden');
  };
});
