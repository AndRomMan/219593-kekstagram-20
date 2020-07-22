'use strict';

(function () {
  var USER_NAME = 'Александр';
  var AVATAR_SRC = 'img/avatar-6.svg';
  var LINK_CLASS = 'picture';
  var PICTURE_CLASS = 'picture__img';

  var bigPictureSection = document.querySelector('.big-picture');
  var bigPicturePreview = bigPictureSection.querySelector('.big-picture__preview');
  var bigPictureCancelBtn = bigPictureSection.querySelector('.big-picture__cancel');
  var bigPictureSocial = bigPictureSection.querySelector('.big-picture__social');
  var bigPictureSocialFooter = bigPictureSocial.querySelector('.social__footer');


  window.bigPicture = {
    bigPictureSection: bigPictureSection,
    bigPicturePreview: bigPicturePreview,
    bigPictureCancelBtn: bigPictureCancelBtn,
    bigPictureSocial: bigPictureSocial,
    bigPictureSocialFooter: bigPictureSocialFooter,
    USER_NAME: USER_NAME,
    AVATAR_SRC: AVATAR_SRC,
    LINK_CLASS: LINK_CLASS,
    PICTURE_CLASS: PICTURE_CLASS,
  };
})();
