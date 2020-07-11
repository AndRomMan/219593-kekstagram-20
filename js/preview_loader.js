'use strict';

// preview_loader.js

(function () {
  // обработчик загрузки изображения
  function imgUploadHandler() {
    //  получаем параметры выбранного файла
    // eslint-disable-next-line no-invalid-this
    var imgFile = getUploadedFile(this);

    if (imgFile) {
      if (imgFile.type.startsWith('image/') && !imgFile.type.startsWith('image/svg')) {
        // если файл загружен - открываем окно редактирования и предпросмотра
        window.previewSetting.previewSetting(imgFile);
      } else {
      //  выдавать сообщение об ошибке:
      // 'Файлы данного типа не обрабатываются.\n\n    Выберете файл с расширением .png или .jpg.'
      }
    } else {
    //  выдавать сообщение об ошибке:
    // 'Файл не выбран.\n\n    Выберете файл изображения типа .png или .jpg.'
    }

  }

  // получает параметры файла, загруженного через uploadFileControl
  function getUploadedFile(input) {
    var fileList = input.files;
    return fileList[0];
  }

  window.previewLoader = {
    imgUploadHandler: imgUploadHandler,
  };

})();
