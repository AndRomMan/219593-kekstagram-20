'use strict';

(function () {
  var textAreaField = window.preview.textAreaField;
  var hashTagInput = window.preview.hashTagInput;

  function submitBtnClickHandler(evt) {
    window.eventChecker.checkMouseEvent(evt, function () {
      evt.preventDefault();
      sendFormData();
    });
  }

  function submitBtnKeydownHandler(evt) {
    window.eventChecker.checkEnterKeyEvent(evt, function () {
      sendFormData();
    });
  }

  function sendFormData() {
    var hashTagInputValidityCheck = window.previewFormHashtag.hashTagChangeHandler();
    var textareaFieldCheck = window.previewFormTextarea.textareaChangeHandler();
    var validityCheck = hashTagInputValidityCheck && textareaFieldCheck;
    if (validityCheck !== true) {
      return;
    }
    var outputObject = new FormData(window.preview.imgUploadForm);
    window.previewXHR.sendPreviewData(outputObject);
  }

  function setPreviewFormListeners() {
    hashTagInput.addEventListener('change', window.previewFormHashtag.hashTagChangeHandler);
    textAreaField.addEventListener('input', window.previewFormTextarea.textareaChangeHandler);
  }

  function removePreviewFormListeners() {
    hashTagInput.removeEventListener('change', window.previewFormHashtag.hashTagChangeHandler);
    textAreaField.removeEventListener('input', window.previewFormTextarea.textareaChangeHandler);
  }

  window.previewForm = {
    submitBtnClickHandler: submitBtnClickHandler,
    submitBtnKeydownHandler: submitBtnKeydownHandler,

    setPreviewFormListeners: setPreviewFormListeners,
    removePreviewFormListeners: removePreviewFormListeners,
  };

})();
