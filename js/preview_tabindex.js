'use strict';

// preview_tabindex.js

(function () {
  var previewEditor = window.preview.previewEditor;
  var imgScaleValue = window.preview.imgScaleValue;

  var inputs = document.querySelectorAll('input');
  var links = document.querySelectorAll('a');
  var buttons = document.querySelectorAll('button');
  var overlayButtons = previewEditor.querySelectorAll('button');
  var overlayInputs = previewEditor.querySelectorAll('input');
  var overlayTextareas = previewEditor.querySelectorAll('textarea');


  // устанавливает tabindex для исключения перехода с формы редактирования на основное поле
  function setTabindex(elements, index) {
    elements.forEach(function (activeElement) {
      activeElement.setAttribute('tabindex', '' + index);
    });
  }

  function removeTabindex(elements) {
    elements.forEach(function (activeElement) {
      activeElement.removeAttribute('tabindex');
    });
  }

  function setPreviewEditorTabindex() {
    [inputs, links, buttons].forEach(function (elements) {
      setTabindex(elements, -1);
    });

    [overlayButtons, overlayInputs, overlayTextareas].forEach(function (elements) {
      setTabindex(elements, 0);
    });
    imgScaleValue.setAttribute('tabindex', '-1');
  }

  function resetPreviewEditorTabindex() {
    [inputs, links, buttons, overlayButtons, overlayInputs, overlayTextareas].forEach(function (elements) {
      removeTabindex(elements);
    });
    imgScaleValue.removeAttribute('tabindex');
  }

  window.previewTabindex = {
    setPreviewEditorTabindex: setPreviewEditorTabindex,
    resetPreviewEditorTabindex: resetPreviewEditorTabindex,
  };
})();
