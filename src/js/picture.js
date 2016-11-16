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

    var pictureSquare = document.querySelectorAll('div.pictures > a');
    console.log(pictureSquare[10]);
    for (var i = 0; i < pictureSquare.length; i++) {
      pictureSquare[i].onclick = function(e) {
        e.preventDefault();
        var num = e.target.getAttribute('number');
        console.log(num);
        initGallery();
      };
    }
  };
});
