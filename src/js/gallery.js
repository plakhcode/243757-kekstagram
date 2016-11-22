'use strict';

define(function() {

  var Gallery = function() {
    this.container = document.querySelector('.gallery-overlay');
    this.close = document.querySelector('.gallery-overlay-close');
    this.image = document.querySelector('.gallery-overlay-image');
    this.activePicture = 0;
    this.showNext = this.showNext.bind(this);
    this.closePic = this.closePic.bind(this);
    this.pictures = [];
  };

  Gallery.prototype = {
    setPictures: function(pictures) {
      this.pictures = pictures;
    },

    appendPictures: function(pictures) {
      this.pictures = this.pictures.concat(pictures);
    },

    showNext: function(e) {
      e.preventDefault();
      if (this.activePicture < this.pictures.length - 1) {
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
      this.image.addEventListener('click', this.showNext);
      this.close.addEventListener('click', this.closePic);
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
      if (this.pictures[showNum].preview) {
        this.image.src = this.pictures[showNum].preview;
      } else {
        this.image.src = this.pictures[showNum].url;
      }
      this.likes = document.querySelector('.likes-count');
      this.comments = document.querySelector('.comments-count');
      this.likes.textContent = this.pictures[showNum].likes;
      this.comments.textContent = this.pictures[showNum].comments;
    }
  };

  return new Gallery();

});
