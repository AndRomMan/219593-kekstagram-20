'use strict';

(function () {
  var HIDE_GALLERY_SECTION = 'img-filters--inactive';
  var ACTIVE_BTN = 'img-filters__button--active';
  var BOUNCE_PREVENTING_TIME_OUT = 500;

  var galleryFilterSection = document.querySelector('.img-filters');
  var galleryFilterForm = galleryFilterSection.querySelector('.img-filters__form');
  var galleryDefaultFilterBtn = galleryFilterSection.querySelector('.filter-default');
  var galleryRandomFilterBtn = galleryFilterSection.querySelector('.filter-random');
  var galleryDiscussedFilterBtn = galleryFilterSection.querySelector('.filter-discussed');
  var userGallery = document.querySelector('.pictures');
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('a');

  var filteredPhotoCollection;
  function getGallery(defaultPhotoCollection) {
    filteredPhotoCollection = defaultPhotoCollection;

    function openFilterSection() {
      galleryFilterSection.classList.remove(HIDE_GALLERY_SECTION);
      galleryFilterForm.addEventListener('click', galleryFilterSectionClickHandler);
    }

    function galleryFilterSectionClickHandler(evt) {
      if (evt.which !== 1) {
        return;
      }

      clearGallery();

      var target = evt.target;
      if (target.contains(galleryDefaultFilterBtn)) {
        addActiveBtnIndicator(galleryDefaultFilterBtn);
        filteredPhotoCollection = defaultPhotoCollection;
        userGallery.append(getUserPictureGallery(userPictureTemplate, filteredPhotoCollection));

      } else if (target.contains(galleryRandomFilterBtn)) {
        addActiveBtnIndicator(galleryRandomFilterBtn);
        filteredPhotoCollection = window.filterContent.getRandomArray(defaultPhotoCollection);
        userGallery.append(getUserPictureGallery(userPictureTemplate, filteredPhotoCollection));

      } else if (target.contains(galleryDiscussedFilterBtn)) {
        addActiveBtnIndicator(galleryDiscussedFilterBtn);
        var sortingType = window.filterContent.SORTING_TYPE;
        filteredPhotoCollection = window.filterContent.getRangedArray(defaultPhotoCollection, sortingType);
        userGallery.append(getUserPictureGallery(userPictureTemplate, filteredPhotoCollection));

      } else {
        return;
      }
    }

    function addActiveBtnIndicator(btn) {
      var deleteActive = galleryFilterForm.querySelector('.' + ACTIVE_BTN);
      deleteActive.classList.remove(ACTIVE_BTN);
      btn.classList.add(ACTIVE_BTN);
    }

    function getUserPictureGallery(template, objectArray) {
      var userPicturesFragment = document.createDocumentFragment();
      objectArray.forEach(function (element) {
        var templateClone = template.cloneNode(true);
        setUserPictureAttributes(templateClone, element);
        userPicturesFragment.append(templateClone);
      });
      return userPicturesFragment;
    }

    function setUserPictureAttributes(node, objectElement) {
      var imgElement = node.querySelector('.picture__img');
      var commentsElement = node.querySelector('.picture__comments');
      var likesElement = node.querySelector('.picture__likes');

      var imgUrl = objectElement.url;
      var imgComments = objectElement.comments;
      var imgLikes = objectElement.likes;

      imgElement.setAttribute('src', imgUrl);
      commentsElement.textContent = (String(imgComments.length));
      likesElement.textContent = (String(imgLikes));
    }

    function clearGallery() {
      var galleryImgs = document.querySelectorAll('.' + window.bigPicture.LINK_CLASS);
      setTimeout(function () {
        galleryImgs.forEach(function (galleryImg) {
          galleryImg.remove();
        });
      }, BOUNCE_PREVENTING_TIME_OUT);
    }

    openFilterSection(filteredPhotoCollection);
    userGallery.append(getUserPictureGallery(userPictureTemplate, filteredPhotoCollection));
  }

  var bigPictureImg = window.bigPicture.bigPictureSection.querySelector('.big-picture__img img');
  var bigPictureSocial = window.bigPicture.bigPictureSocial;
  var bigPictureSocialAvatar = bigPictureSocial.querySelector('.social__picture');
  var bigPictureSocialCaption = bigPictureSocial.querySelector('.social__caption');
  var bigPictureSocialLikes = bigPictureSocial.querySelector('.likes-count');

  function getImgDescription(imgSrc) {
    filteredPhotoCollection.forEach(function (collectionImg) {
      if (collectionImg.url === imgSrc) {
        bigPictureImg.setAttribute('src', collectionImg.url);
        bigPictureImg.setAttribute('alt', 'Фото из коллекции');

        bigPictureSocialAvatar.setAttribute('src', window.bigPicture.AVATAR_SRC);
        bigPictureSocialAvatar.setAttribute('alt', window.bigPicture.USER_NAME);

        bigPictureSocialCaption.textContent = collectionImg.description;
        bigPictureSocialLikes.textContent = collectionImg.likes;

        window.bigPictureComments.getComments(collectionImg.comments);
      }
    });
  }
  window.gallery = {
    getGallery: getGallery,
    userGallery: userGallery,
    filteredPhotoCollection: filteredPhotoCollection,
    getImgDescription: getImgDescription,
  };

})();
