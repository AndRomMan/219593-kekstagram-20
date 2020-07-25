'use strict';

(function () {
  var PREVIEW_IMG = '.img-upload__preview img';

  var imgUploadSection = document.querySelector('.img-upload');
  var imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
  var hashTagInput = imgUploadForm.querySelector('.text__hashtags');
  var textAreaField = imgUploadForm.querySelector('.text__description');
  var submitBtn = imgUploadForm.querySelector('.img-upload__submit');
  var hashTagErrorMessageField = imgUploadForm.querySelector('.error-message--hash');
  var textAreaErrorMessage = imgUploadForm.querySelector('.error-message--description');
  var uploadFileBtn = imgUploadSection.querySelector('.img-upload__input');
  var previewEditor = imgUploadSection.querySelector('.img-upload__overlay');
  var previewEditorCancelBtn = previewEditor.querySelector('.img-upload__cancel');
  var effectsPointerBlock = previewEditor.querySelector('.img-upload__effects');
  var effectSlider = previewEditor.querySelector('.img-upload__effect-level');
  var effectSliderValue = effectSlider.querySelector('.effect-level__value');
  var effectSliderLine = effectSlider.querySelector('.effect-level__line');
  var effectSliderLineDepth = effectSlider.querySelector('.effect-level__depth');
  var imgScaleBlock = previewEditor.querySelector('.img-upload__scale');
  var imgScaleSmaller = imgScaleBlock.querySelector('.scale__control--smaller');
  var imgScaleValue = imgScaleBlock.querySelector('.scale__control--value');
  var imgScaleBigger = imgScaleBlock.querySelector('.scale__control--bigger');

  window.preview = {
    PREVIEW_IMG: PREVIEW_IMG,

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

    imgUploadForm: imgUploadForm,
  };
})();
