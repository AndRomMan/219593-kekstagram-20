'use strict';

(function () {
  var bigPictureCloseHandler = window.bigPictureExit.bigPictureCloseHandler;
  var bigPictureCancelBtn = window.bigPicture.bigPictureCancelBtn;

  function modalBigPictureOpen() {
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', bigPictureCloseHandler);
    bigPictureCancelBtn.addEventListener('click', bigPictureCloseHandler);
    window.previewTabindex.setBigPictureTabindex();
  }

  function modalBigPictureClose() {
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', bigPictureCloseHandler);
    bigPictureCancelBtn.removeEventListener('click', bigPictureCloseHandler);
    window.previewTabindex.resetBigPictureTabindex();
  }

  var previewEditorCloseHandler = window.previewExit.previewEditorCloseHandler;
  var previewEditorCancelBtn = window.preview.previewEditorCancelBtn;

  function modalPreviewOpen() {
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', previewEditorCloseHandler);
    previewEditorCancelBtn.addEventListener('click', previewEditorCloseHandler);
    window.previewTabindex.setPreviewEditorTabindex();
  }

  function modalPreviewClose() {
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', previewEditorCloseHandler);
    previewEditorCancelBtn.removeEventListener('click', previewEditorCloseHandler);
    window.previewTabindex.resetPreviewEditorTabindex();
  }

  window.modal = {
    modalBigPictureOpen: modalBigPictureOpen,
    modalBigPictureClose: modalBigPictureClose,
    modalPreviewOpen: modalPreviewOpen,
    modalPreviewClose: modalPreviewClose,
  };
})();
