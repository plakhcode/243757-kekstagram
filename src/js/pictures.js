'use strict';

define(function() {

  document.querySelector('.filters').classList.add('hidden');

  require(['./review', './load'], function(review, load) {

    var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';

    var container = document.querySelector('.pictures');

    var setPictures = function(pictures) {
      pictures.forEach(function(photo) {
        container.appendChild(review(photo));
      });
    };

    load(PICTURES_DATA_URL, setPictures);
  });

  document.querySelector('.filters').classList.remove('hidden');

});
