'use strict';

// form_escape_preventing.js

(function () {
  var hashTagInput = window.preview.hashTagInput;
  var textAreaField = window.preview.textAreaField;

  var previewEditorCloseHandler = window.previewExit.previewEditorCloseHandler;

  // функция предотвращает срабатывание ESC, если курсор в поле ввода формы
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

  // функция снимает слушатель события escape
  function focusInputHandler() {
    document.removeEventListener('keydown', previewEditorCloseHandler);
  }
  // функция устанавливает слушатель события escape
  function blurInputHandler() {
    document.addEventListener('keydown', previewEditorCloseHandler);
  }

  window.formEscapePreventing = {
    preventingEcapeOnInput: preventingEcapeOnInput,
    dismissPreventingEcapeOnInput: dismissPreventingEcapeOnInput,
  };
})();
