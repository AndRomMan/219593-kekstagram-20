'use strict';

(function () {
  var KEY_MODE_SLIDER_CLASS = 'slider-key-mode';
  var effectSlider = window.preview.effectSlider;
  var effectSliderVisibility;
  var checkedEffectType;

  function imgEffectClickHandler(evt) {
    window.eventChecker.checkMouseEvent(evt, function() {
      checkedEffectType = evt.target;
      var effectTypeNum;

      var checkEffectValue = checkedEffectType.getAttribute('value');
      if (checkedEffectType.getAttribute('type') !== 'radio') {
        return;
      }

      switch (checkEffectValue) {
        case (window.effectParameters.effects[0].value):
          effectSliderVisibility = false;
          effectTypeNum = 0;
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
      });
  }

  function startKeyModeHandler(evt) {
     if (evt.code === 'Enter') {
      evt.preventDefault();
       effectSlider.classList.add(KEY_MODE_SLIDER_CLASS);
       checkedEffectType.removeEventListener('keydown', startKeyModeHandler);
       checkedEffectType.addEventListener('keydown', stopModeKeyHandler);
       checkedEffectType.addEventListener('keydown', arrowKeyHandler);
     }
  }

  function stopModeKeyHandler(evt) {
    if (evt.code === 'Enter') {
      evt.preventDefault();
      stopKeyMode();
    }
  }

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
    }
  }

  function stopKeyMode() {
    effectSlider.classList.remove(KEY_MODE_SLIDER_CLASS);
    checkedEffectType.addEventListener('keydown', startKeyModeHandler);
    checkedEffectType.removeEventListener('keydown', stopModeKeyHandler);
    checkedEffectType.removeEventListener('keydown', arrowKeyHandler);
    checkedEffectType.focus();
    document.removeEventListener('click', stopModeKeyHandler);
  }

  window.previewEffect = {
    imgEffectClickHandler: imgEffectClickHandler,
    startKeyModeHandler: startKeyModeHandler,
    checkedEffectType: checkedEffectType,
  };
})();
