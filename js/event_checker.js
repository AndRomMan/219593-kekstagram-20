'use strict';

(function () {
  var MOUSE_KEY = 1;

  function checkMouseEvent(evt, cb) {
    if (evt.which !== MOUSE_KEY) {
      return;
    }
    cb(evt);
  }

  function checkEnterKeyEvent(evt, cb) {
    if ((evt.code === 'Enter') || (evt.code === 'Space')) {
      cb(evt);
    }
  }

  function checkEscapeKeyEvent(evt, cb) {
    if ((evt.code === 'Escape')) {
      cb(evt);
    }
  }

  window.eventChecker = {
    checkMouseEvent: checkMouseEvent,
    checkEnterKeyEvent: checkEnterKeyEvent,
    checkEscapeKeyEvent: checkEscapeKeyEvent,
  };
})();
