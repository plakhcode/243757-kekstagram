'use strict';

define(function() {

  var Gallery = function() {

    this.container = document.querySelector('.gallery-overlay');
    this.close = document.querySelector('.gallery-overlay-close');
    this.image = document.querySelector('.gallery-overlay-image');
    this.activePicture = 0;
    this.showNext = this.showNext.bind(this);
    this.closePic = this.closePic.bind(this);
    this.image.addEventListener('click', this.showNext);
    this.close.addEventListener('click', this.closePic);
  };

  Gallery.prototype = {
    setPictures: function(pict) {
      this.imageArr = pict;
    },

    showNext: function(e) {
      e.preventDefault();
      if (this.activePicture < this.imageArr.length - 1) {
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
      if (this.imageArr[showNum].preview) {
        this.image.src = this.imageArr[showNum].preview;
      } else {
        this.image.src = this.imageArr[showNum].url;
      }
      this.likes = document.querySelector('.likes-count');
      this.comments = document.querySelector('.comments-count');
      this.likes.textContent = this.imageArr[showNum].likes;
      this.comments.textContent = this.imageArr[showNum].comments;
    }
  };

  return new Gallery();

});
