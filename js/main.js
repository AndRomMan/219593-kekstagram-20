'use strict';

(function () {
  function main() {
  // Навешиваем обработчик на кнопку загрузки изображения imgPreview
    var uploadFileBtn = window.preview.uploadFileBtn;
    var imgUploadHandler = window.previewLoader.imgUploadHandler;
    uploadFileBtn.addEventListener('change', imgUploadHandler);
  }

  main();

})();
