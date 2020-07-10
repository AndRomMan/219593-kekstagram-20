'use strict';

// preview_effect.js

(function () {
  // класс для обозначения фокуса на слайдере в момент перехода в режим управления глубиной эффекта стрелками
  var KEY_MODE_SLIDER_CLASS = 'slider-key-mode';
  var effectSlider = window.preview.effectSlider;
  // параметры слайдера и фильтра
  var effectSliderVisibility;
  // переменная хранит ссылку на текущий выбранный эффект (кнопку)
  var checkedEffectType;

  // функция установки эффекта
  function imgEffectClickHandler(evt) {
    checkedEffectType = evt.target;
    var checkEffectValue = checkedEffectType.getAttribute('value');
    //  При событии click происходит 2 события: на span и на input
    if (checkedEffectType.getAttribute('type') !== 'radio') {
      return;
    }
    //  Определение параметров фильтра изображения
    switch (checkEffectValue) {
      case (window.effectParameters.effects[0].value):
        effectSliderVisibility = false;
        var effectTypeNum = 0;
        break;
      case (window.effectParameters.effects[1].value):
        effectSliderVisibility = true;
        effectTypeNum = 1;
        break;
      case (window.effectParameters.effects[2].value):
        effectSliderVisibility = true;
        effectTypeNum = 2;
        break;
      case (window.effectParameters.effects[3].value):
        effectSliderVisibility = true;
        effectTypeNum = 3;
        break;
      case (window.effectParameters.effects[4].value):
        effectSliderVisibility = true;
        effectTypeNum = 4;
        break;
      case (window.effectParameters.effects[5].value):
        effectSliderVisibility = true;
        effectTypeNum = 5;
        break;
    }
    checkedEffectType.addEventListener('keydown', startKeyModeHandler);
    window.effectSlider.setEffectSlider(effectSliderVisibility, effectTypeNum);
  }

  //  обработчик клавиш enter и space переводит в режим управления глубиной эффекта стрелками
  function startKeyModeHandler(evt) {
    if ((evt.code === 'Enter') || (evt.code === 'Space')) {
      evt.preventDefault();
      effectSlider.classList.add(KEY_MODE_SLIDER_CLASS);
      checkedEffectType.removeEventListener('keydown', startKeyModeHandler);
      checkedEffectType.addEventListener('keydown', arrowKeyHandler);
      document.addEventListener('click', clickArrowModeExitHandler);
    } else {
      return;
    }
  }

  function clickArrowModeExitHandler(evt) {
    if (evt.type) {
      stopKeyMode();
    }
  }

  //  функция перехватыват нажатия ArrowLeft ArrowRight и меняет глубину эффекта
  function arrowKeyHandler(evt) {
    evt.preventDefault();
    var step = 0;
    if ((evt.code === 'ArrowLeft') || (evt.code === 'ArrowRight')) {
      if (evt.code === 'ArrowLeft') {
        step = -1;
      } else if (evt.code === 'ArrowRight') {
        step = 1;
      }
      window.effectSlider.stepToPixelConverter(step);

    } else if ((evt.code === 'Enter') || (evt.code === 'Space')) {
      evt.preventDefault();
      stopKeyMode();
    } else {
      evt.preventDefault();
    }
  }

  //  функция выхода из режима управления глубиной эффекта стрелками
  function stopKeyMode() {
    effectSlider.classList.remove(KEY_MODE_SLIDER_CLASS);
    checkedEffectType.addEventListener('keydown', startKeyModeHandler);
    checkedEffectType.removeEventListener('keydown', arrowKeyHandler);
    checkedEffectType.focus();
    document.removeEventListener('click', clickArrowModeExitHandler);
  }

  window.previewEffect = {
    imgEffectClickHandler: imgEffectClickHandler,
    startKeyModeHandler: startKeyModeHandler,
    checkedEffectType: checkedEffectType,
  };
})();
