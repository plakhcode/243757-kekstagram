'use strict';

define(function() {

  var getSearchString = function(params) {
    return Object.keys(params).map(function(param) {
      return [param, params[param]].join('=');
    }).join('&');
  };

  return function(url, params, callback) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url + '?' + getSearchString(params));

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

