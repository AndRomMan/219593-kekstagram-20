'use strict';

(function () {
  function previewEditorCloseHandler(evt) {
    if (((evt.type) === 'click') || ((evt.code) === 'Escape')) {
      window.modal.modalPreviewClose();

      cleanPreviewEditor();
      cleanImgPreview();
      cleanFormFields();
      cleanEffectsPointerBlock();
      cleanSlider();
      cleanScaleBlock();
    }
  }

  function cleanPreviewEditor() {
    window.preview.previewEditor.classList.add('hidden');
    window.preview.effectSlider.classList.add('hidden');
    window.formEscapePreventing.dismissPreventingEcapeOnInput();
  }

  function cleanImgPreview() {
    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    imgPreview.removeAttribute('style');
    imgPreview.removeAttribute('class');
    var checkedEffectType = window.previewEffect.checkedEffectType;
    if (imgPreview.getAttribute('data-filter') !== '') {
      checkedEffectType.removeEventListener('keydown', window.previewEffect.startKeyModeHandler);
    }
    checkedEffectType.checked = false;
  }

  function cleanFormFields() {
    window.preview.uploadFileBtn.value = '';
    var hashTagInput = window.preview.hashTagInput;
    var textAreaField = window.preview.textAreaField;
    hashTagInput.removeAttribute('value');
    textAreaField.removeAttribute('value');
    hashTagInput.removeEventListener('change', window.previewForm.hashTagChangeHandler);
    textAreaField.removeEventListener('input', window.previewForm.textAreaChangeHandler);
    window.previewForm.hashTagAlarmOff();
    window.previewForm.textAreaAlarmOff();
    window.previewForm.textAreaWarningOff();
    hashTagInput.value = '';
    textAreaField.value = '';
  }

  function cleanEffectsPointerBlock() {
    var effectsPointerBlock = window.preview.effectsPointerBlock;
    var imgEffectClickHandler = window.previewEffect.imgEffectClickHandler;
    effectsPointerBlock.removeEventListener('click', imgEffectClickHandler);
  }

  function cleanSlider() {
    var effectSliderLine = window.preview.effectSliderLine;
    var sliderMousePositionHandler = window.effectSlider.sliderMousePositionHandler;
    effectSliderLine.removeEventListener('mouseup', sliderMousePositionHandler);

    var effectSliderPin = window.effectSlider.effectSliderPin;
    var sliderPinDragHandler = window.effectSlider.sliderPinDragHandler;
    effectSliderPin.removeEventListener('mousedown', sliderPinDragHandler);
  }

  function cleanScaleBlock() {
    var imgScaleBlock = window.preview.imgScaleBlock;
    var imgScaleClickHandler = window.previewScale.imgScaleClickHandler;
    imgScaleBlock.removeEventListener('click', imgScaleClickHandler);
  }

  window.previewExit = {
    previewEditorCloseHandler: previewEditorCloseHandler,
  };
})();
