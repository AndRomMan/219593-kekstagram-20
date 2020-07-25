'use strict';

(function () {
  var previewEditor = window.preview.previewEditor;
  var imgScaleValue = window.preview.imgScaleValue;
  var inputs = document.querySelectorAll('input');
  var buttons = document.querySelectorAll('button');
  var overlayButtons = previewEditor.querySelectorAll('button');
  var overlayInputs = previewEditor.querySelectorAll('input');
  var overlayTextareas = previewEditor.querySelectorAll('textarea');

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
    var links = document.querySelectorAll('a');
    [inputs, links, buttons].forEach(function (elements) {
      setTabindex(elements, -1);
    });
    [overlayButtons, overlayInputs, overlayTextareas].forEach(function (elements) {
      setTabindex(elements, 0);
    });
    imgScaleValue.setAttribute('tabindex', '-1');
  }

  function resetPreviewEditorTabindex() {
    var links = document.querySelectorAll('a');
    [inputs, links, buttons, overlayButtons, overlayInputs, overlayTextareas].forEach(function (elements) {
      removeTabindex(elements);
    });
    imgScaleValue.removeAttribute('tabindex');
  }

  var bigPictureSection = window.bigPicture.bigPictureSection;
  var bigPictureButtons = bigPictureSection.querySelectorAll('button');
  var bigPictureInputs = bigPictureSection.querySelectorAll('input');
  var bigPictureTextareas = bigPictureSection.querySelectorAll('textarea');

  function setBigPictureTabindex() {
    var links = document.querySelectorAll('a');
    [inputs, links, buttons].forEach(function (element) {
      setTabindex(element, -1);
    });

    [bigPictureButtons, bigPictureInputs, bigPictureTextareas].forEach(function (element) {
      setTabindex(element, 0);
    });
  }

  function resetBigPictureTabindex() {
    var links = document.querySelectorAll('a');
    [inputs, links, buttons, bigPictureButtons, bigPictureInputs, bigPictureTextareas].forEach(function (elements) {
      removeTabindex(elements);
    });
  }

  window.previewTabindex = {
    setPreviewEditorTabindex: setPreviewEditorTabindex,
    resetPreviewEditorTabindex: resetPreviewEditorTabindex,
    setBigPictureTabindex: setBigPictureTabindex,
    resetBigPictureTabindex: resetBigPictureTabindex
  };
})();
