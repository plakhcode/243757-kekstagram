'use strict';

define(['./gallery'], function(Gallery) {

  return function() {
    var initGallery = function(number) {
      var commenter = document.querySelectorAll('.picture-comments');
      var liker = document.querySelectorAll('.picture-likes');
      var imger = document.querySelectorAll('.picture img');
      var gallery = new Gallery(imger, commenter, liker);
      gallery.show(number);
    };

    var pictureSquare = document.querySelectorAll('div.pictures > a');

    for (var i = 0; i < pictureSquare.length; i++) {
      pictureSquare[i].onclick = function(e) {
        e.preventDefault();
        var num = e.target.getAttribute('number');
        initGallery(num);
      };
    }
  };
});
