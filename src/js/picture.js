'use strict';

define(['./gallery'], function() {
  var readPhoto = [];

  return function() {
    readPhoto = document.querySelectorAll('.picture');
    console.log(readPhoto[0].getAttribute('number'));
  };
});
