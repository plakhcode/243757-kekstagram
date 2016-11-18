'use strict';

define(function() {

  var Gallery = function(galComm, galLikes) {

    this.setPictures = function(pict) {
      this.imageArr = pict;
      console.log(this.imageArr);
    };
    this.galComm = galComm;
    this.galLikes = galLikes;
    this.container = document.querySelector('.gallery-overlay');
    this.close = document.querySelector('.gallery-overlay-close');
    this.image = document.querySelector('.gallery-overlay-image');

    this.showNext = this.showNext.bind(this);
    this.closePic = this.closePic.bind(this);
    this.image.addEventListener('click', this.showNext);
    this.close.addEventListener('click', this.closePic);
  };

  Gallery.prototype = {

    showNext: function(e) {
      e.preventDefault();
      if (this.activePicture < (this.pictures.length - 1)) {
        this.activePicture = +this.activePicture + 1;
      } else {
        this.activePicture = 0;
      }
      this.setActivePicture(this.activePicture);
    },

    closePic: function() {
      this.hide();
    },

    show: function(number) {
      this.container.classList.remove('invisible');
      this.setActivePicture(number);
    },

    hide: function() {
      this.container.classList.add('invisible');
      this.close.removeEventListener('click', this.closePic);
      this.image.removeEventListener('click', this.showNext);
    },

    setActivePicture: function(showNum) {
      this.activePicture = showNum;
      console.log(showNum);
      console.log(this.imageArr);
      this.image.src = this.imageArr[showNum].url;
      this.likes = document.querySelector('.likes-count');
      this.comments = document.querySelector('.comments-count');
      this.likes.textContent = this.imageArr[showNum].likes;
      this.comments.textContent = this.imageArr[showNum].comments;
    }
  };

  return Gallery;

});
