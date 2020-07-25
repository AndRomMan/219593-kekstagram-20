'use strict';

(function () {

  function getNewContentElement(template, newElementClass) {
    var newFragment = document.createDocumentFragment();
    var templateItem = template.content.querySelector('.' + newElementClass);
    var newBlock = templateItem.cloneNode(true);
    newFragment.append(newBlock);

    return newFragment;
  }

  window.newContent = {
    getNewContentElement: getNewContentElement,
  };

})();
