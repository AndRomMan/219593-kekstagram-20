'use strict';

(function () {
  var EFFECT_DEPTH_START_POINT = 1;

  var sliderPixelStartPoint;
  var sliderPixelEndPoint;
  var sliderLinePixelWidth;
  var effectPixelStep;
  var filterTypeNum;
  var effectSlider = window.preview.effectSlider;
  var effectSliderPin = effectSlider.querySelector('.effect-level__pin');

  function setEffectSlider(effectSliderVisibility, effectTypeNum) {
    filterTypeNum = effectTypeNum;
    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    imgPreview.removeAttribute('style');
    imgPreview.removeAttribute('class');

    if (effectSliderVisibility) {
      effectSlider.classList.remove('hidden');
      effectSliderPin.addEventListener('mousedown', sliderPinDragHandler);

    } else {
      effectSlider.classList.add('hidden');
      window.previewScale.setImgScale('reset');
      imgPreview.setAttribute('data-filter', window.effectParameters.effects[0].value);
      effectSliderPin.removeEventListener('mousedown', sliderPinDragHandler);
      return;
    }

    var setEffectClass = window.effectParameters.effects[filterTypeNum].class;
    window.preview.previewEditor.querySelector('.img-upload__preview img').classList.add(setEffectClass);

    var effectSliderLine = window.preview.effectSliderLine;
    sliderLineParameters(window.preview.effectSliderLine);

    var startPixelValue = sliderLinePixelWidth * EFFECT_DEPTH_START_POINT;
    setEffectDepth(startPixelValue);

    effectSliderLine.addEventListener('mouseup', sliderMousePositionHandler);
  }

  function sliderLineParameters(effectSliderLine) {
    var effectLevelLineSize = effectSliderLine.getBoundingClientRect();
    sliderPixelStartPoint = effectLevelLineSize.left;
    sliderPixelEndPoint = effectLevelLineSize.right;
    sliderLinePixelWidth = effectLevelLineSize.width;
    var minEffectValue = window.effectParameters.effects[filterTypeNum].min;
    var maxEffectValue = window.effectParameters.effects[filterTypeNum].max;
    var valueEffectRange = maxEffectValue - minEffectValue;
    var effectValueStep = window.effectParameters.effects[filterTypeNum].step;
    var stepsNum = valueEffectRange / effectValueStep;
    effectPixelStep = sliderLinePixelWidth / stepsNum;
  }

  function stepToPixelConverter(step) {
    var pinPosition = effectSliderPin.getBoundingClientRect();
    var currentPosition = pinPosition.left + (pinPosition.right - pinPosition.left) / 2;
    setPinPosition(currentPosition + step * effectPixelStep);
  }

  function setEffectDepth(pixelPinShift) {
    var effectValueStepNumbers = Math.round(pixelPinShift / effectPixelStep);
    var minEffectValue = window.effectParameters.effects[filterTypeNum].min;
    var effectValueStep = window.effectParameters.effects[filterTypeNum].step;
    var effectLevelValue = minEffectValue + effectValueStepNumbers * effectValueStep;
    setEffectValueAttribute(effectLevelValue);
    setLevelLinePinPosition(effectValueStepNumbers);
  }

  function setEffectValueAttribute(value) {
    var effectValueUnit = window.effectParameters.effects[filterTypeNum].step;
    if (effectValueUnit === 'px') {
      value = value.toFixed(1);
    } else {
      value = value.toFixed(2);
    }
    var effectSliderValue = window.preview.effectSliderValue;
    effectSliderValue.setAttribute('value', String(value));
    setImgEffectStyle(value);
  }

  function setImgEffectStyle(value) {
    var setEffectFilter = window.effectParameters.effects[filterTypeNum].filter;
    var effectValueUnit = window.effectParameters.effects[filterTypeNum].unit;
    var styleString = 'filter: ' + setEffectFilter + '(' + String(value) + effectValueUnit + '); ';
    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    imgPreview.setAttribute('data-filter', styleString);
    imgPreview.setAttribute('style', styleString + imgPreview.getAttribute('data-transform'));
  }

  function setLevelLinePinPosition(stepNumbers) {
    var currentSliderPinShift = window.previewEffect.currentSliderPinShift;
    currentSliderPinShift = stepNumbers * effectPixelStep;
    var pinPercentPosition = ((currentSliderPinShift / sliderLinePixelWidth) * 100).toFixed(2);
    var pinPercentPositionString = (String(pinPercentPosition) + '%');
    effectSliderPin.setAttribute('style', 'left: ' + pinPercentPositionString + '; ');
    var effectSliderLineDepth = window.preview.effectSliderLineDepth;
    effectSliderLineDepth.setAttribute('style', 'width: ' + pinPercentPositionString + '; ');
  }

  function sliderPinDragHandler(evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', sliderMousePositionHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    sliderMousePositionHandler(evt);
    function mouseUpHandler() {
      document.removeEventListener('mouseup', mouseUpHandler);
      document.removeEventListener('mousemove', sliderMousePositionHandler);
    }
  }

  function sliderMousePositionHandler(evt) {
    if (evt.which !== 1) {
      return;
    }
    var currentPixelPinPosition = evt.clientX;
    setPinPosition(currentPixelPinPosition);
  }

  function setPinPosition(currentXPosition) {
    if (currentXPosition <= sliderPixelStartPoint) {
      currentXPosition = sliderPixelStartPoint;
    } else if (currentXPosition >= sliderPixelEndPoint) {
      currentXPosition = sliderPixelEndPoint;
    }
    setEffectDepth(currentXPosition - sliderPixelStartPoint);
  }

  window.effectSlider = {
    setEffectSlider: setEffectSlider,
    sliderMousePositionHandler: sliderMousePositionHandler,
    sliderPinDragHandler: sliderPinDragHandler,
    stepToPixelConverter: stepToPixelConverter,
    effectSliderPin: effectSliderPin,
  };

})();
