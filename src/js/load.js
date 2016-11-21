'use strict';

define(function() {
  return function(url, callback) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.addEventListener('load', function(evt) {
      try {
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      } catch(err) {
        console.log('JSON error');
      }
    });
    xhr.send();
  };
});

