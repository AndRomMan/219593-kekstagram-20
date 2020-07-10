'use strict';

// effects_slider.js

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
    // обнуляем состояние картинки при смене эффекта
    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    imgPreview.removeAttribute('style');
    imgPreview.removeAttribute('class');

    if (effectSliderVisibility) {
    // для выбранных эффектов показываем слайдер
      effectSlider.classList.remove('hidden');
      effectSliderPin.addEventListener('mousedown', sliderPinDragHandler);

    } else {
    // для нулевого эффекта
      effectSlider.classList.add('hidden');
      window.previewScale.setImgScale('reset');
      imgPreview.setAttribute('data-filter', window.effectParameters.effects[0].value);
      effectSliderPin.removeEventListener('mousedown', sliderPinDragHandler);
      return;
    }

    // добавим к изображению класс, задающий эффект 100%
    var setEffectClass = window.effectParameters.effects[filterTypeNum].class;
    window.preview.previewEditor.querySelector('.img-upload__preview img').classList.add(setEffectClass);

    var effectSliderLine = window.preview.effectSliderLine;
    sliderLineParameters(window.preview.effectSliderLine);

    //  Начальное значение фильтра, отличное от заданного в классе эффекта
    var startPixelValue = sliderLinePixelWidth * EFFECT_DEPTH_START_POINT;
    //  вызовем функцию для:
    // 1) пересчета пикселов в проценты для определения сдвига ползунка
    //  2) для расчета соответственного значения value
    setEffectDepth(startPixelValue);

    //  на линию задания глубины эффекта вешаем обработчик событий - effect-level__line
    // это дает возможность изменить глубину эффекта кликом на линию слайдера
    effectSliderLine.addEventListener('mouseup', sliderMousePositionHandler);
  }

  function sliderLineParameters(effectSliderLine) {
    var effectLevelLineSize = effectSliderLine.getBoundingClientRect();
    // начальные и конечные координаты линии слайдера
    sliderPixelStartPoint = effectLevelLineSize.left;
    sliderPixelEndPoint = effectLevelLineSize.right;
    // длина линии слайдера, в пределах которой перемещается pin
    sliderLinePixelWidth = effectLevelLineSize.width;
    //  диапазон значений эффекта
    var minEffectValue = window.effectParameters.effects[filterTypeNum].min;
    var maxEffectValue = window.effectParameters.effects[filterTypeNum].max;
    var valueEffectRange = maxEffectValue - minEffectValue;
    //   число шагов изменения эффекта, приходящихся на заданный диапазон
    var effectValueStep = window.effectParameters.effects[filterTypeNum].step;
    var stepsNum = valueEffectRange / effectValueStep;
    //  пиксельный шаг, соответствующий шагу изменения эффекта
    effectPixelStep = sliderLinePixelWidth / stepsNum;
  }

  function stepToPixelConverter(step) {
    var pinPosition = effectSliderPin.getBoundingClientRect();
    var currentPosition = pinPosition.left + (pinPosition.right - pinPosition.left) / 2;
    setPinPosition(currentPosition + step * effectPixelStep);
  }

  //  функция отображает положение effectSliderLevelPin и линии глубины эффекта
  function setEffectDepth(pixelPinShift) {
    var effectValueStepNumbers = Math.round(pixelPinShift / effectPixelStep);
    //  Определяем значение, которое будет соответствовать позиции контрола слайдера (pin)
    var minEffectValue = window.effectParameters.effects[filterTypeNum].min;
    var effectValueStep = window.effectParameters.effects[filterTypeNum].step;
    var effectLevelValue = minEffectValue + effectValueStepNumbers * effectValueStep;

    //  функция записи в value атрибут
    setEffectValueAttribute(effectLevelValue);
    //  функция установки позиции pin
    setLevelLinePinPosition(effectValueStepNumbers);
  }

  //  функция передает данные о положении ползунка в атрибут value (input - effectSliderValue)
  function setEffectValueAttribute(value) {
    var effectValueUnit = window.effectParameters.effects[filterTypeNum].step;
    if (effectValueUnit === 'px') {
      value = value.toFixed(1);
    } else {
      value = value.toFixed(2);
    }
    // Передаем значение в input / атрибут value
    var effectSliderValue = window.preview.effectSliderValue;
    effectSliderValue.setAttribute('value', String(value));
    setImgEffectStyle(value);
  }

  //  функция записывает в атрибут style выбранный эффект с заданной глубиной
  function setImgEffectStyle(value) {
    var setEffectFilter = window.effectParameters.effects[filterTypeNum].filter;
    var effectValueUnit = window.effectParameters.effects[filterTypeNum].unit;
    var styleString = 'filter: ' + setEffectFilter + '(' + String(value) + effectValueUnit + '); ';

    var imgPreview = window.preview.previewEditor.querySelector('.img-upload__preview img');
    imgPreview.setAttribute('data-filter', styleString);
    imgPreview.setAttribute('style', styleString + imgPreview.getAttribute('data-transform'));
  }

  //  функция установки позиции pin c учетом заданного шага изменения глубины эффекта
  function setLevelLinePinPosition(stepNumbers) {
  //  Из значения value получаем значение для позиции контрола - задается в %
    var currentSliderPinShift = window.previewEffect.currentSliderPinShift;
    currentSliderPinShift = stepNumbers * effectPixelStep;
    var pinPercentPosition = ((currentSliderPinShift / sliderLinePixelWidth) * 100).toFixed(2);
    var pinPercentPositionString = (String(pinPercentPosition) + '%');
    effectSliderPin.setAttribute('style', 'left: ' + pinPercentPositionString + '; ');
    //  установим отображение глубины эффекта в виде закрашенной линии от позиции 0 до текущей позиции pin
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
