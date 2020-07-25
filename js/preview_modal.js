'use strict';

(function () {
  var submitBtn = window.preview.submitBtn;
  var previewEditorCancelBtn = window.preview.previewEditorCancelBtn;
  var imgScaleBlock = window.preview.imgScaleBlock;

  function modalPreviewOpen() {
    document.body.classList.add('modal-open');
    window.preview.previewEditor.classList.remove('hidden');

    window.previewForm.setPreviewFormListeners();
    submitBtn.addEventListener('click', window.previewForm.submitBtnClickHandler);
    submitBtn.addEventListener('keydown', window.previewForm.submitBtnKeydownHandler);

    previewEditorCancelBtn.addEventListener('click', window.previewExit.previewEditorClickHandler);
    previewEditorCancelBtn.addEventListener('keydown', window.previewExit.previewEditorCloseKeydownHandler);
    document.addEventListener('keydown', window.previewExit.previewEditorEscapeHandler);

    imgScaleBlock.addEventListener('click', window.previewScale.imgScaleClickHandler);
    imgScaleBlock.addEventListener('keydown', window.previewScale.imgScaleKeydownHandler);

    window.previewTabindex.setPreviewEditorTabindex();
  }

  function modalPreviewClose() {
    document.body.classList.remove('modal-open');

    window.previewForm.removePreviewFormListeners();
    submitBtn.removeEventListener('click', window.previewForm.submitBtnClickHandler);
    submitBtn.removeEventListener('keydown', window.previewForm.submitBtnKeydownHandler);

    previewEditorCancelBtn.removeEventListener('click', window.previewExit.previewEditorClickHandler);
    previewEditorCancelBtn.removeEventListener('keydown', window.previewExit.previewEditorCloseKeydownHandler);

    imgScaleBlock.addEventListener('click', window.previewScale.imgScaleClickHandler);
    imgScaleBlock.addEventListener('keydown', window.previewScale.imgScaleKeydownHandler);

    document.removeEventListener('keydown', window.previewExit.previewEditorEscapeHandler);
    window.previewTabindex.resetPreviewEditorTabindex();
  }

  window.previewModal = {
    modalPreviewOpen: modalPreviewOpen,
    modalPreviewClose: modalPreviewClose,
  };
})();
