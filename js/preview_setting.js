'use strict';

// preview_setting.js

(function () {
  var previewTemplate = document.querySelector('#img-preview');
  var PHOTO_DIRECTORY_PATH = 'photos';

  function previewSetting(imgFile) {
    var selector = 'input[type="radio"][value="none"]';
    var effectsPointerBlock = window.preview.effectsPointerBlock;
    window.previewEffect.checkedEffectType = effectsPointerBlock.querySelector(selector);
    window.previewEffect.checkedEffectType.checked = true;

    window.formEscapePreventing.preventingEcapeOnInput();
    window.previewTabindex.setPreviewEditorTabindex();

    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    setNewImgPreview(imgPreview, imgFile.name);
    // запоминаем ссылку на изображение после замены на новое
    var previewEditor = window.preview.previewEditor;
    imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');

    // Включаем окно редактирования и предпросмотра
    previewEditor.classList.remove('hidden');
    window.preview.body.classList.add('modal-open');

    // очищаем поле value кнопки загрузки - иначе нельзя загрузить 2 раза подряд одно изображение
    window.preview.uploadFileBtn.value = '';

    var previewEditorCloseHandler = window.previewExit.previewEditorCloseHandler;
    var previewEditorCancelBtn = window.preview.previewEditorCancelBtn;
    // навешиваем обработчик кнопки закрытия формы редактирования и escape
    document.addEventListener('keydown', previewEditorCloseHandler);
    // навешиваем обработчик escape - закрытие формы редактирования
    previewEditorCancelBtn.addEventListener('click', previewEditorCloseHandler);

    // навешиваем обработчик блока выбора эффектов
    effectsPointerBlock.addEventListener('click', window.previewEffect.imgEffectClickHandler);

    // устанавливаем масштаб в исходное положение
    window.previewScale.setImgScale('reset');

    //  навешиваем обработчики блока масштабирования
    var imgScaleBlock = window.previewScale.imgScaleBlock;
    var imgScaleClickHandler = window.previewScale.imgScaleClickHandler;
    imgScaleBlock.addEventListener('click', imgScaleClickHandler);

    //  навешиваем обработчики события полей ввода
    var hashTagInput = window.preview.hashTagInput;
    var textAreaField = window.preview.textAreaField;
    var hashTagChangeHandler = window.previewForm.hashTagChangeHandler;
    var textAreaChangeHandler = window.previewForm.textAreaChangeHandler;
    hashTagInput.addEventListener('change', hashTagChangeHandler);
    textAreaField.addEventListener('input', textAreaChangeHandler);
  }

  // функция устаноавливает фрагмент с новым фото на место старого
  function setNewImgPreview(oldImg, newFileName) {
    var imgTemplate = previewTemplate.content.querySelector('img');
    var imgFragment = document.createDocumentFragment();
    var newImg = imgTemplate.cloneNode(true);
    var newImgFileName = PHOTO_DIRECTORY_PATH + '/' + newFileName;

    newImg.setAttribute('src', newImgFileName);
    imgFragment.append(newImg);
    oldImg.replaceWith(imgFragment);
  }

  window.previewSetting = {
    previewSetting: previewSetting,
  };

})();
