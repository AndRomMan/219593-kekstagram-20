'use strict';

(function () {
  var bigPictureCancelBtn = window.bigPicture.bigPictureCancelBtn;

  function modalBigPictureOpen() {
    document.body.classList.add('modal-open');

    bigPictureCancelBtn.addEventListener('click', window.bigPictureExit.bigPictureCloseClickHandler);
    bigPictureCancelBtn.addEventListener('keydown', window.bigPictureExit.bigPictureCloseKeydownHandler);
    document.addEventListener('keydown', window.bigPictureExit.bigPictureEscapeHandler);

    window.previewTabindex.setBigPictureTabindex();
  }

  function modalBigPictureClose() {
    document.body.classList.remove('modal-open');

    bigPictureCancelBtn.removeEventListener('click', window.bigPictureExit.bigPictureCloseClickHandler);
    bigPictureCancelBtn.removeEventListener('keydown', window.bigPictureExit.bigPictureCloseKeydownHandler);
    document.removeEventListener('keydown', window.bigPictureExit.bigPictureEscapeHandler);

    window.previewTabindex.resetBigPictureTabindex();
  }

  window.bogPictureModal = {
    modalBigPictureOpen: modalBigPictureOpen,
    modalBigPictureClose: modalBigPictureClose,
  };
})();
