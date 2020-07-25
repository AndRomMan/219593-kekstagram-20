'use strict';

(function () {
  var LOADING_INDICATOR_TIME = 500;
  var UPLOAD_MESSAGE = 'img-upload__message';
  var SUCCESS_MESSAGE = 'success';
  var ERROR_MESSAGE = 'error';
  var MESSAGE_SECTION = 'upload-message';
  var MESSAGE_BTN = 'message-button';
  var SUCCESS_TEMPLATE = 'success';
  var MESSAGES_TEMPLATE = 'messages';
  var ERROR_TEMPLATE = 'error';

  var main = document.querySelector('main');
  var uploadSuccessTemplate = document.querySelector('#' + SUCCESS_TEMPLATE);
  var uploadProgressTemplate = document.querySelector('#' + MESSAGES_TEMPLATE);
  var uploadErrorTemplate = document.querySelector('#' + ERROR_TEMPLATE);

  function removeContentBlock(removedElementClass) {
    var removedElement = document.querySelector('.' + removedElementClass);
    if (removedElement) {
      removedElement.remove();
      removeEscapeHandlers();
    }
  }

  function setEscapeHandlers() {
    document.removeEventListener('keydown', window.previewExit.previewEditorEscapeHandler);
    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentEscapeKeyHandler);
  }

  function removeEscapeHandlers() {
    document.addEventListener('keydown', window.previewExit.previewEditorEscapeHandler);
    document.removeEventListener('click', documentClickHandler);
    document.removeEventListener('keydown', documentEscapeKeyHandler);
  }

  function documentEscapeKeyHandler(evt) {
    window.eventChecker.checkEscapeKeyEvent(evt, function () {
      removeContentBlock(MESSAGE_SECTION);
    });
  }

  function documentClickHandler(evt) {
    window.eventChecker.checkMouseEvent(evt, function () {
      if ((evt.target.classList.contains(MESSAGE_SECTION)) || (evt.target.classList.contains(MESSAGE_BTN))) {
        removeContentBlock(MESSAGE_SECTION);
      }
    });
  }

  function getMessage(sectionClass, fragment) {
    removeContentBlock(sectionClass);
    main.append(fragment);
    setEscapeHandlers();
  }

  function uploadProgressMessageHandler() {
    var uploadFragment = window.newContent.getNewContentElement(uploadProgressTemplate, UPLOAD_MESSAGE);
    getMessage(MESSAGE_SECTION, uploadFragment);
  }

  function uploadSuccessMessageHandler() {
    var successFragment = window.newContent.getNewContentElement(uploadSuccessTemplate, SUCCESS_MESSAGE);
    setTimeout(function () {
      getMessage(MESSAGE_SECTION, successFragment);
    }, LOADING_INDICATOR_TIME);
    window.previewExit.previewEditorCleaner();
  }

  function uploadErrorMessageHandler() {
    var errorFragment = window.newContent.getNewContentElement(uploadErrorTemplate, ERROR_MESSAGE);
    getMessage(MESSAGE_SECTION, errorFragment);
  }

  window.previewUploadMessages = {
    uploadErrorMessageHandler: uploadErrorMessageHandler,
    uploadSuccessMessageHandler: uploadSuccessMessageHandler,
    uploadProgressMessageHandler: uploadProgressMessageHandler,
  };
})();
