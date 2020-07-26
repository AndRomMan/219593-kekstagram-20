'use strict';

(function () {
  var DEFAULT_FILTER = 'input[type="radio"][value="none"]';

  var previewTemplate = document.querySelector('#img-preview');

  function setPreviewParameters(imgFile) {
    var effectsPointerBlock = window.preview.effectsPointerBlock;
    window.previewEffect.checkedEffectType = effectsPointerBlock.querySelector(DEFAULT_FILTER);
    window.previewEffect.checkedEffectType.checked = true;
    window.formEscapePreventing.preventingEcapeOnInput();
    window.previewTabindex.setPreviewEditorTabindex();

    var imgPreview = window.preview.previewEditor.querySelector(window.preview.PREVIEW_IMG);
    setNewImgPreview(imgPreview, imgFile);

    window.previewModal.modalPreviewOpen();
    effectsPointerBlock.addEventListener('click', window.previewEffect.imgEffectClickHandler);
    window.previewScale.setImgScale('reset');
  }

  function setNewImgPreview(oldImg, file) {
    var imgTemplate = previewTemplate.content.querySelector('img');
    var imgFragment = document.createDocumentFragment();
    var newImg = imgTemplate.cloneNode(true);

    var reader = new FileReader();
    reader.onloadend = function () {
      newImg.setAttribute('src', reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      newImg.setAttribute('src', '');
    }

    imgFragment.append(newImg);
    oldImg.replaceWith(imgFragment);
  }

  window.previewSetting = {
    setPreviewParameters: setPreviewParameters,
  };

})();
