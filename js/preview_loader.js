'use strict';

(function () {
  function imgUploadHandler() {
    var imgFile = getUploadedFile(window.preview.uploadFileBtn);

    if (imgFile) {
      if (imgFile.type.startsWith('image/') && !imgFile.type.startsWith('image/svg')) {
        window.previewSetting.previewSetting(imgFile);
      } else {
        return;
      }
    } else {
      return;
    }
  }

  function getUploadedFile(input) {
    var fileList = input.files;
    return fileList[0];
  }

  window.previewLoader = {
    imgUploadHandler: imgUploadHandler,
  };

})();
