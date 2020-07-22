'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram';
  var TIMEOUT_MS = 5000;

  function addListeners(xhr) {
    xhr.addEventListener('load', loadHandler);
    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', timeoutHandler);
  }

  function loadHandler() {
    window.previewUploadMessages.uploadSuccessMessageHandler();
  }

  function errorHandler() {
    window.previewUploadMessages.uploadErrorMessageHandler();
  }

  function timeoutHandler() {
    window.previewUploadMessages.uploadErrorMessageHandler();
  }

  function uploadProgressHandler() {
    window.previewUploadMessages.uploadProgressMessageHandler();
  }

  function sendPreviewData(outputObject) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT_MS;
    addListeners(xhr);
    xhr.upload.addEventListener('progress', uploadProgressHandler);
    xhr.open('POST', URL);
    xhr.send(outputObject);
  }

  window.previewXHR = {
    sendPreviewData: sendPreviewData,
  };
})();
