'use strict';

define(['./gallery'], function(Gallery) {

  return function() {

    var gallery = new Gallery();

    var pictureSquare = document.querySelectorAll('div.pictures > a');

    for (var i = 0; i < pictureSquare.length; i++) {
      pictureSquare[i].onclick = function(e) {
        e.preventDefault();
        var num = e.target.getAttribute('number');
        gallery.show(num);
      };
    }
  };
});
