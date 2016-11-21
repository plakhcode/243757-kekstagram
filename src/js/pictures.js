'use strict';

define(['./review', './load', './gallery', './picture'], function(review, load, gallery, picture) {
  return function() {
    document.querySelector('.filters').classList.add('hidden');

    var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';

    var container = document.querySelector('.pictures');

    var drawPictures = function(myPictures) {
      console.log(myPictures);
      myPictures.forEach(function(photo, i) {
        container.appendChild(review(photo, i));
        i += i;
      });
      picture();
      gallery.setPictures(myPictures);
    };

    var currentPageNumber = 0;
    var pageSize = 12;
    var filter = 'filter-popular';

    load(PICTURES_DATA_URL, {
      from: currentPageNumber * pageSize,
      to: currentPageNumber * pageSize + pageSize,
      filter: filter
    }, drawPictures);

    document.querySelector('.filters').classList.remove('hidden');
  };
});
