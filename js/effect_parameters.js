'use strict';

(function () {
  var effects = [
    {
      value: 'none',
      class: '',
      filter: '',
      min: 0,
      max: 1,
      unit: '',
      step: 0.01,
    },
    {
      value: 'chrome',
      class: 'effects__preview--chrome',
      filter: 'grayscale',
      min: 0,
      max: 1,
      unit: '',
      step: 0.01,
    },
    {
      value: 'sepia',
      class: 'effects__preview--sepia',
      filter: 'sepia',
      min: 0,
      max: 1,
      unit: '',
      step: 0.01,
    },
    {
      value: 'marvin',
      class: 'effects__preview--marvin',
      filter: 'invert',
      min: 0,
      max: 1,
      unit: '',
      step: 0.01,
    },
    {
      value: 'phobos',
      class: 'effects__preview--phobos',
      filter: 'blur',
      min: 0,
      max: 3,
      unit: 'px',
      step: 0.5,
    },
    {
      value: 'heat',
      class: 'effects__preview--heat',
      filter: 'brightness',
      min: 1,
      max: 3,
      unit: '',
      step: 0.01,
    }
  ];

  window.effectParameters = {
    effects: effects,
  };
})();
