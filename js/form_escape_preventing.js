'use strict';

(function () {
  var hashTagInput = window.preview.hashTagInput;
  var textAreaField = window.preview.textAreaField;
  var previewEditorCloseHandler = window.previewExit.previewEditorCloseHandler;

  function preventingEcapeOnInput() {
    hashTagInput.addEventListener('focus', focusInputHandler);
    hashTagInput.addEventListener('blur', blurInputHandler);
    textAreaField.addEventListener('focus', focusInputHandler);
    textAreaField.addEventListener('blur', blurInputHandler);
  }

  function dismissPreventingEcapeOnInput() {
    hashTagInput.removeEventListener('focus', focusInputHandler);
    hashTagInput.removeEventListener('blur', blurInputHandler);
    textAreaField.removeEventListener('focus', focusInputHandler);
    textAreaField.removeEventListener('blur', blurInputHandler);
  }

  function focusInputHandler() {
    document.removeEventListener('keydown', previewEditorCloseHandler);
  }

  function blurInputHandler() {
    document.addEventListener('keydown', previewEditorCloseHandler);
  }

  window.formEscapePreventing = {
    preventingEcapeOnInput: preventingEcapeOnInput,
    dismissPreventingEcapeOnInput: dismissPreventingEcapeOnInput,
  };
})();
