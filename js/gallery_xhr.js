'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var TIMEOUT_MS = 5000;
  var STATUS_CODE = {
    OK: 200
  };

  function galleryLoader() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE.OK) {
        window.gallery.getGallery(xhr.response);
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  }

  window.galleryXHR = {
    galleryLoader: galleryLoader,
  };
})();
