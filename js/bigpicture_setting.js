'use strict';

(function () {
  var bigPictureSection = window.bigPicture.bigPictureSection;
  var sendCommentBtnClickHandler = window.bigPictureCommentSender.sendCommentBtnClickHandler;
  var sendCommentBtnKeydownHandler = window.bigPictureCommentSender.sendCommentBtnKeydownHandler;
  var bigPictureCommentSendBtn = window.bigPictureCommentSender.bigPictureCommentSendBtn;

  function galleryPictureClickHandler(evt) {
    if (evt.which !== 1) {
      return;
    }
    setFullscreen(evt);
  }

  function setFullscreen(evt) {
    var img;
    if (evt.target.classList.contains(window.bigPicture.PICTURE_CLASS)) {
      img = evt.target;
    } else if (evt.target.classList.contains(window.bigPicture.LINK_CLASS)) {
      img = evt.target.querySelector('img');
    } else {
      return;
    }

    var imgSrc = img.getAttribute('src');
    var imgClass = img.getAttribute('class');
    if (imgClass === 'picture__img') {
      bigPictureSection.classList.remove('hidden');
      window.modal.modalBigPictureOpen();
      window.gallery.getImgDescription(imgSrc);
      bigPictureCommentSendBtn.addEventListener('mousedown', sendCommentBtnClickHandler);
      bigPictureCommentSendBtn.addEventListener('keydown', sendCommentBtnKeydownHandler);
    }
  }

  window.bigPictureSetting = {
    galleryPictureClickHandler: galleryPictureClickHandler,
  };
})();
