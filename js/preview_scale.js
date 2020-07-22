'use strict';


(function () {
  var SCALE_START_VALUE = 1;
  var SCALE_STOP_VALUE = 0.25;
  var SCALE_STEP = 0.25;

  var imgScaleBlock = window.preview.imgScaleBlock;
  var imgScaleSmaller = window.preview.imgScaleSmaller;
  var imgScaleValue = window.preview.imgScaleValue;
  var imgScaleBigger = window.preview.imgScaleBigger;
  var scaleImgValue;

  function imgScaleClickHandler(evt) {
    var imgScalePressedBtn = evt.target;
    var scaleCommand;

    if (imgScalePressedBtn === imgScaleSmaller) {
      scaleCommand = 'down';
    } else if (imgScalePressedBtn === imgScaleBigger) {
      scaleCommand = 'up';
    }
    setImgScale(scaleCommand);
  }

  function setImgScale(scaleAction) {
    switch (scaleAction) {
      case 'down':
        scaleImgValue = (scaleImgValue <= SCALE_STOP_VALUE) ? SCALE_STOP_VALUE : (scaleImgValue - SCALE_STEP);
        break;
      case 'reset':
        scaleImgValue = SCALE_START_VALUE;
        break;
      case 'up':
        scaleImgValue = (scaleImgValue >= SCALE_START_VALUE) ? SCALE_START_VALUE : (scaleImgValue + SCALE_STEP);
        break;
    }

    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    var transformStyleString = 'transform: scale(' + String(scaleImgValue.toFixed(2)) + '); ';
    imgPreview.setAttribute('data-transform', transformStyleString);
    imgPreview.setAttribute('style', transformStyleString + imgPreview.getAttribute('data-filter'));
    imgScaleValue.setAttribute('value', String((scaleImgValue * 100).toFixed(0) + '%'));
  }

  window.previewScale = {
    imgScaleBlock: imgScaleBlock,
    setImgScale: setImgScale,
    imgScaleClickHandler: imgScaleClickHandler,
  };
})();
