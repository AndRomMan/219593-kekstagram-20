'use strict';

(function () {
  function previewEditorCloseKeydownHandler(evt) {
    window.eventChecker.checkEnterKeyEvent(evt, previewEditorCleaner);
  }

  function previewEditorEscapeHandler(evt) {
    window.eventChecker.checkEscapeKeyEvent(evt, previewEditorCleaner);
  }

  function previewEditorClickHandler(evt) {
    window.eventChecker.checkMouseEvent(evt, previewEditorCleaner);
  }

  function previewEditorCleaner() {
    window.previewModal.modalPreviewClose();
    window.formEscapePreventing.dismissPreventingEcapeOnInput();
    hidePreviewEditorElements();
    cleanImgPreview();
    cleanPreviewEditorForm();
    cleanEffectsPointerBlock();
    cleanSlider();
    cleanScaleBlock();
  }

  function hidePreviewEditorElements() {
    window.preview.previewEditor.classList.add('hidden');
    window.preview.effectSlider.classList.add('hidden');
  }

  function cleanImgPreview() {
    var imgPreview = window.preview.previewEditor.querySelector(window.preview.PREVIEW_IMG);
    imgPreview.removeAttribute('style');
    imgPreview.removeAttribute('class');
    var checkedEffectType = window.previewEffect.checkedEffectType;
    if (imgPreview.getAttribute('data-filter') !== '') {
      checkedEffectType.removeEventListener('keydown', window.previewEffect.startKeyModeHandler);
    }
    checkedEffectType.checked = false;
  }

  function cleanPreviewEditorForm() {
    window.preview.uploadFileBtn.value = '';
    var hashTagInput = window.preview.hashTagInput;
    var textAreaField = window.preview.textAreaField;
    hashTagInput.removeAttribute('value');
    textAreaField.removeAttribute('value');
    hashTagInput.removeEventListener('change', window.previewFormHashtag.hashTagChangeHandler);
    textAreaField.removeEventListener('input', window.previewFormTextarea.textareaChangeHandler);
    window.previewFormHashtag.hashTagAlarmOff();
    window.previewFormTextarea.textareaAlarmOff();
    window.previewFormTextarea.textareaWarningOff();
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
    previewEditorEscapeHandler: previewEditorEscapeHandler,
    previewEditorClickHandler: previewEditorClickHandler,
    previewEditorCloseKeydownHandler: previewEditorCloseKeydownHandler,

    previewEditorCleaner: previewEditorCleaner,

  };
})();
