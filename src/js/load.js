'use strict';

define(function() {
  return function(url, callback) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.addEventListener('load', function(evt) {
      console.log(evt.target);
      try {
        callback = JSON.parse(evt.target.response);
        console.log(JSON.stringify(callback));
        console.log(callback);
      } catch(err) {
        console.log('JSON error');
      }
    });
    xhr.send();
  };
});

