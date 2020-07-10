'use strict';

// preview.js

(function () {
  var body = document.body;
  var imgUploadSection = document.querySelector('.img-upload');

  //  форма загрузки данных на сервер
  var imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
  var hashTagInput = imgUploadForm.querySelector('.text__hashtags');
  var textAreaField = imgUploadForm.querySelector('.text__description');
  var submitBtn = imgUploadForm.querySelector('.img-upload__submit');
  var hashTagErrorMessageField = imgUploadForm.querySelector('.error-message--hash');
  var textAreaErrorMessage = imgUploadForm.querySelector('.error-message--description');

  // кнопка загрузки фото
  var uploadFileBtn = imgUploadSection.querySelector('.img-upload__input');

  var previewEditor = imgUploadSection.querySelector('.img-upload__overlay');

  // кнопка отмены предпросмотра и редактирования
  var previewEditorCancelBtn = previewEditor.querySelector('.img-upload__cancel');

  // блок выбора эффекта для фото
  var effectsPointerBlock = previewEditor.querySelector('.img-upload__effects');

  // элементы слайдера изменения глубины эффекта
  var effectSlider = previewEditor.querySelector('.img-upload__effect-level');
  var effectSliderValue = effectSlider.querySelector('.effect-level__value');
  var effectSliderLine = effectSlider.querySelector('.effect-level__line');
  var effectSliderLineDepth = effectSlider.querySelector('.effect-level__depth');

  // блок масштабирования изображения
  var imgScaleBlock = previewEditor.querySelector('.img-upload__scale');
  // Кнопки управления масштабом
  var imgScaleSmaller = imgScaleBlock.querySelector('.scale__control--smaller');
  var imgScaleValue = imgScaleBlock.querySelector('.scale__control--value');
  var imgScaleBigger = imgScaleBlock.querySelector('.scale__control--bigger');


  //   возможно надо перенести в другой модуль
  window.preview = {
    body: body,
    hashTagInput: hashTagInput,
    textAreaField: textAreaField,
    submitBtn: submitBtn,
    hashTagErrorMessageField: hashTagErrorMessageField,
    textAreaErrorMessage: textAreaErrorMessage,

    imgScaleBlock: imgScaleBlock,
    imgScaleSmaller: imgScaleSmaller,
    imgScaleValue: imgScaleValue,
    imgScaleBigger: imgScaleBigger,

    effectSlider: effectSlider,
    effectSliderValue: effectSliderValue,
    effectSliderLine: effectSliderLine,
    effectSliderLineDepth: effectSliderLineDepth,
    previewEditor: previewEditor,
    uploadFileBtn: uploadFileBtn,
    previewEditorCancelBtn: previewEditorCancelBtn,
    effectsPointerBlock: effectsPointerBlock,
  };
})();
