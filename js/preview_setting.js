'use strict';

(function () {
  var PHOTO_DIRECTORY_PATH = 'photos';
  var DEFAULT_FILTER = 'input[type="radio"][value="none"]';

  var previewTemplate = document.querySelector('#img-preview');

  function setPreviewParameters(imgFile) {
    var effectsPointerBlock = window.preview.effectsPointerBlock;
    window.previewEffect.checkedEffectType = effectsPointerBlock.querySelector(DEFAULT_FILTER);
    window.previewEffect.checkedEffectType.checked = true;
    window.formEscapePreventing.preventingEcapeOnInput();
    window.previewTabindex.setPreviewEditorTabindex();

    var imgPreview = window.preview.previewEditor.querySelector(window.preview.PREVIEW_IMG);
    setNewImgPreview(imgPreview, imgFile.name);

    window.previewModal.modalPreviewOpen();
    effectsPointerBlock.addEventListener('click', window.previewEffect.imgEffectClickHandler);
    window.previewScale.setImgScale('reset');
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
    setPreviewParameters: setPreviewParameters,
  };

})();
