'use strict';

(function () {
  var hashTagInput = window.preview.hashTagInput;
  var textAreaField = window.preview.textAreaField;

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
    document.removeEventListener('keydown', window.previewExit.previewEditorEscapeHandler);
  }

  function blurInputHandler() {
    document.addEventListener('keydown', window.previewExit.previewEditorEscapeHandler);
  }

  window.formEscapePreventing = {
    preventingEcapeOnInput: preventingEcapeOnInput,
    dismissPreventingEcapeOnInput: dismissPreventingEcapeOnInput,
  };
})();
