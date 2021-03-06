'use strict';

(function () {

  function main() {
    window.galleryXHR.galleryLoader();
    window.preview.uploadFileBtn.addEventListener('change', window.previewLoader.imgUploadHandler);
    window.gallery.userGallery.addEventListener('click', window.bigPictureSetting.galleryPictureClickHandler);
    window.gallery.userGallery.addEventListener('keydown', window.bigPictureSetting.galleryPictureKeydownHandler);
  }
  main();

})();
