'use strict';

define(['./gallery'], function(Gallery) {

  return function() {

    var initGallery = function() {
      var commenter = document.querySelectorAll('.picture-comments');
      var liker = document.querySelectorAll('.picture-likes');
      var imger = document.querySelectorAll('.picture img');
      var gallery = new Gallery(imger, commenter, liker);
      gallery.show(10);
    };

    var container = document.querySelector('.pictures');
    var pictureSquare = document.querySelectorAll('div.pictures > a');
    console.log(pictureSquare[10]);

    container.onclick = function(e) {
      e.preventDefault();
      initGallery();
    };

//    pictureSquare.onclick = function(e) {
//      e.preventDefault();
//      initGallery();
//    };
  };
});
