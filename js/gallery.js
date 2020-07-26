'use strict';

(function () {
  var userGallery = document.querySelector('.pictures');

  function renderGallery(loadedPhotoCollection) {
    window.galleryFilter.setFilterSection(loadedPhotoCollection);
    var photos = window.galleryFilter.setFilterSection.defaultPhotoCollection;

    renderFilteredCollection(window.galleryFilter.userPictureTemplate, photos);

    window.gallery.renderGallery = {
      renderFilteredCollection: renderFilteredCollection,
    };
  }

  function getUserPictureFragment(template, imgCollection) {
    var userPicturesFragment = document.createDocumentFragment();
    imgCollection.forEach(function (loadedImgObj) {
      var templateClone = template.cloneNode(true);
      setUserPictureAttributes(templateClone, loadedImgObj);
      userPicturesFragment.append(templateClone);
    });
    return userPicturesFragment;
  }

  function setUserPictureAttributes(element, loadedImgObj) {
    var imgElement = element.querySelector('.picture__img');
    var commentsElement = element.querySelector('.picture__comments');
    var likesElement = element.querySelector('.picture__likes');
    var imgUrl = loadedImgObj.url;
    var imgComments = loadedImgObj.comments;
    var imgLikes = loadedImgObj.likes;

    imgElement.setAttribute('src', imgUrl);
    commentsElement.textContent = (String(imgComments.length));
    likesElement.textContent = (String(imgLikes));
  }

  function renderFilteredCollection(template, filteredPhotoCollection) {
    clearGallery();
    userGallery.append(getUserPictureFragment(template, filteredPhotoCollection));
  }

  function clearGallery() {
    var galleryImgs = document.querySelectorAll('.' + window.bigPicture.LINK_CLASS);
    galleryImgs.forEach(function (galleryImg) {
      galleryImg.remove();
    });
  }

  window.gallery = {
    renderGallery: renderGallery,
    userGallery: userGallery,
  };

})();
