'use strict';

(function () {
  var bigPictureImg = window.bigPicture.bigPictureSection.querySelector('.big-picture__img img');
  var bigPictureSocial = window.bigPicture.bigPictureSocial;
  var bigPictureSocialAvatar = bigPictureSocial.querySelector('.social__picture');
  var bigPictureSocialCaption = bigPictureSocial.querySelector('.social__caption');
  var bigPictureSocialLikes = bigPictureSocial.querySelector('.likes-count');

  function setDescription(imgSrc, filteredPhotoCollection) {
    filteredPhotoCollection.forEach(function (collectionImg) {
      if (collectionImg.url === imgSrc) {
        bigPictureImg.setAttribute('src', collectionImg.url);
        bigPictureImg.setAttribute('alt', 'Фото из коллекции');

        bigPictureSocialAvatar.setAttribute('src', window.bigPicture.AVATAR_SRC);
        bigPictureSocialAvatar.setAttribute('alt', window.bigPicture.USER_NAME);

        bigPictureSocialCaption.textContent = collectionImg.description;
        bigPictureSocialLikes.textContent = collectionImg.likes;

        window.bigPictureComments.setCommentBlock(collectionImg.comments);
      }
    });
  }
  window.galleryImg = {
    setDescription: setDescription,
  };

})();
