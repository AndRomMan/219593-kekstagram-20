'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var TIMEOUT_MS = 5000;
  var StatusCode = {
    OK: 200
  };

  function galleryLoader() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        window.gallery.renderGallery(xhr.response);
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  }

  window.galleryXHR = {
    galleryLoader: galleryLoader,
  };
})();
