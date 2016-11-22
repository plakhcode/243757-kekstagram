'use strict';

define(['./gallery'], function(gallery) {

  return function() {

    var pictureSquare = document.querySelectorAll('div.pictures > a');
    console.log(pictureSquare);

    for (var i = 0; i < pictureSquare.length; i++) {
      pictureSquare[i].onclick = function(e) {
        e.preventDefault();
        var num = e.target.number;
        console.log(num);
        gallery.show(num);
      };
    }
  };
});
