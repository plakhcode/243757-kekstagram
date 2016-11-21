'use strict';

define(['./review', './load', './gallery', './picture'], function(review, load, gallery, picture) {
  return function() {
    document.querySelector('.filters').classList.add('hidden');

    var PICTURES_DATA_URL = 'http://localhost:1507/api/pictures';
    var GAP = 100;
    var TROTTLE_TIMEOUT = 100;
    var container = document.querySelector('.pictures');
    var filters = document.querySelector('.filters');
    var footer = document.querySelector('.footer');
    var lastCall = Date.now();

    var drawPictures = function(myPictures) {
      myPictures.forEach(function(photo, i) {
        container.appendChild(review(photo, i));
        i += i;
      });
      picture();
      gallery.setPictures(myPictures);
    };

    var pageSize = 12;
    var pageNumber = 0;
    var activeFilter = 'without-filter';

    var loadPictures = function(filter, currentPageNumber) {
      load(PICTURES_DATA_URL, {
        from: currentPageNumber * pageSize,
        to: currentPageNumber * pageSize + pageSize,
        filter: filter
      }, drawPictures);
    };

    loadPictures(activeFilter, pageNumber);

    window.onload = function() {
      console.log('Размер окна: ' + window.innerHeight + '; Размер контейнера: ' + container.offsetHeight);
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

    filters.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('filters-radio')) {
        change(evt.target.id);
      }
    });

    document.querySelector('.filters').classList.remove('hidden');
  };
});
