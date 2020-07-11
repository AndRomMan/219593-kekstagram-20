'use strict';

// preview_exit.js

(function () {
  // функция закрытия окна предпросмотра и редактирования
  function previewEditorCloseHandler(evt) {
    if (((evt.type) === 'click') || ((evt.code) === 'Escape')) {
      cleanPreviewEditor();
      cleanImgPreview();
      cleanFormFields();
      cleanEffectsPointerBlock();
      cleanSlider();
      cleanScaleBlock();
    }
  }

  function cleanPreviewEditor() {
    window.preview.body.classList.remove('modal-open');
    window.preview.previewEditorCancelBtn.removeEventListener('click', previewEditorCloseHandler);
    document.removeEventListener('keydown', previewEditorCloseHandler);

    window.preview.previewEditor.classList.add('hidden');
    window.preview.effectSlider.classList.add('hidden');

    window.formEscapePreventing.dismissPreventingEcapeOnInput();
    window.previewTabindex.resetPreviewEditorTabindex();
  }
  function cleanImgPreview() {
    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    imgPreview.removeAttribute('style');
    imgPreview.removeAttribute('class');
    // Проверяем, что был установлен обработчик режима клавиатуры для установки глубины эффекта
    var checkedEffectType = window.previewEffect.checkedEffectType;
    if (imgPreview.getAttribute('data-filter') !== '') {
      checkedEffectType.removeEventListener('keydown', window.previewEffect.startKeyModeHandler);
    }
    checkedEffectType.checked = false;
  }
  function cleanFormFields() {
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
    // блок выбора эффектов
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
