'use strict';

(function () {
  var PHOTO_DIRECTORY_PATH = 'photos';

  var previewTemplate = document.querySelector('#img-preview');

  function previewSetting(imgFile) {
    var selector = 'input[type="radio"][value="none"]';
    var effectsPointerBlock = window.preview.effectsPointerBlock;
    window.previewEffect.checkedEffectType = effectsPointerBlock.querySelector(selector);
    window.previewEffect.checkedEffectType.checked = true;
    window.formEscapePreventing.preventingEcapeOnInput();
    window.previewTabindex.setPreviewEditorTabindex();
    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    setNewImgPreview(imgPreview, imgFile.name);
    var previewEditor = window.preview.previewEditor;
    imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    previewEditor.classList.remove('hidden');
    window.modal.modalPreviewOpen();
    effectsPointerBlock.addEventListener('click', window.previewEffect.imgEffectClickHandler);
    window.previewScale.setImgScale('reset');
    var imgScaleBlock = window.previewScale.imgScaleBlock;
    var imgScaleClickHandler = window.previewScale.imgScaleClickHandler;
    imgScaleBlock.addEventListener('click', imgScaleClickHandler);
    var hashTagInput = window.preview.hashTagInput;
    var textAreaField = window.preview.textAreaField;
    var hashTagChangeHandler = window.previewForm.hashTagChangeHandler;
    var textAreaChangeHandler = window.previewForm.textAreaChangeHandler;
    hashTagInput.addEventListener('change', hashTagChangeHandler);
    textAreaField.addEventListener('input', textAreaChangeHandler);
  }

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
