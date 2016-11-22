'use strict';

define(['./review', './load', './gallery', './picture'], function(review, load, gallery, picture) {
  return function() {
    document.querySelector('.filters').classList.add('hidden');

    var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';
    var GAP = 300;
    var TROTTLE_TIMEOUT = 100;
    var container = document.querySelector('.pictures');
    var filters = document.querySelector('.filters');
    var footer = document.querySelector('.footer');
    var lastCall = Date.now();

    var drawPictures = function(myPictures) {
      myPictures.forEach(function(photo, i) {
        var k = i + (pageNumber * pageSize);
        container.appendChild(review(photo, k));
      });
      picture();
      if (pageNumber === 0) {
        gallery.setPictures(myPictures);
      } else {
        gallery.appendPictures(myPictures);
      }
      var height = container.offsetHeight;
      fillWindow(height);
    };

    var pageSize = 12;
    var pageNumber = 0;
    var activeFilter = 'filter-popular';

    var loadPictures = function(filter, currentPageNumber) {
      load(PICTURES_DATA_URL, {
        from: currentPageNumber * pageSize,
        to: currentPageNumber * pageSize + pageSize,
        filter: filter
      }, drawPictures);
    };

    loadPictures(activeFilter, pageNumber);

    var fillWindow = function(count) {
      if (count < window.innerHeight) {
        loadPictures(activeFilter, ++pageNumber);
      }
    };

    window.addEventListener('scroll', function() {
      if (Date.now() - lastCall >= TROTTLE_TIMEOUT) {
        if (footer.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
          loadPictures(activeFilter, ++pageNumber);
        }

        lastCall = Date.now();
      }
    }, true);

    var change = function(myFilter) {
      pageNumber = 0;
      activeFilter = myFilter;
      container.innerHTML = '';
      loadPictures(activeFilter, pageNumber);
    };

    filters.addEventListener('change', function(evt) {
      change(evt.target.id);
    });

    document.querySelector('.filters').classList.remove('hidden');
  };
});
