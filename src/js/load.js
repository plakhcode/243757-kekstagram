'use strict';

define(function() {
  return function(url, callback) {

    window.__jsonpCallback = function(data) {
      callback(data);
      script.parentNode.removeChild(script);
    };

    var script = document.createElement('script');

    script.onerror = function() {
      script.parentNode.removeChild(script);
    };

    script.src = url + (url.match(/\?/) ? '&' : '?') + 'callback=__jsonpCallback';
    document.body.appendChild(script);
  };
});
