'use strict';

(function () {
  var userImgTemplate = document.querySelector('#picture');
  var userImgSection = document.querySelector('.pictures');
  var userPictureTemplate = userImgTemplate.content.querySelector('a');

  function getUserPictureBlocks(template, objectArray) {
    var userPicturesFragment = document.createDocumentFragment();

    objectArray.forEach(function (element) {
      var templateClone = template.cloneNode(true);

      var setUserPictureAttributes = window.dataGenerator.setUserPictureAttributes;
      setUserPictureAttributes(templateClone, element);
      userPicturesFragment.append(templateClone);
    });
    return userPicturesFragment;
  }

  var customerPhotoCollection = window.dataGenerator.customerPhotoCollection;
  userImgSection.append(getUserPictureBlocks(userPictureTemplate, customerPhotoCollection));
})();
