'use strict';

// data_generator.js

(function () {
  var CUSTOMER_COLLECTION_SIZE = 25;
  var MIN_LIKES_COUNT = 15;
  var MAX_LIKES_COUNT = 200;

  var AVATAR_LIST_SIZE = 6;
  var COMMENT_LIST_SIZE = 3;

  function getRandomIntNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomArrayItem(arr) {
    return arr[getRandomIntNumber(0, arr.length - 1)];
  }

  function getCustomerPhotoCollection(collectionSize, userPhotoCaptionArray, commentArraySize, avatarArraySize, guestMessageArray, guestNameArray) {
    var array = [];
    for (var i = 0; i < collectionSize; i++) {
      var arrayItem = new GetPhotoDescription(i, userPhotoCaptionArray, commentArraySize, avatarArraySize, guestMessageArray, guestNameArray);
      array.push(arrayItem);
    }
    return array;
  }

  function GetPhotoDescription(counter, userPhotoCaptionArray, commentArraySize, avatarArraySize, guestMessageArray, guestNameArray) {
    this.url = getImgUrl(counter);
    this.description = getUserPhotoCaption(userPhotoCaptionArray);
    this.likes = getLikesCount(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
    this.comments = getCommentArray(commentArraySize, avatarArraySize, guestMessageArray, guestNameArray);
  }

  function getImgUrl(num) {
    return 'photos/' + (num + 1) + '.jpg';
  }

  function getUserPhotoCaption(arr) {
    return getRandomArrayItem(arr);
  }

  function getLikesCount(minCount, maxCount) {
    return getRandomIntNumber(minCount, maxCount);
  }

  function getCommentArray(commentArraySize, avatarArraySize, guestMessageArray, guestNameArray) {
    var array = [];
    for (var i = 0; i < commentArraySize; i++) {
      var arrayItem = new GetComment(avatarArraySize, guestMessageArray, guestNameArray);
      array.push(arrayItem);
    }
    return array;
  }

  function GetComment(avatarArraySize, guestMessageArray, guestNameArray) {
    this.avatar = getAvatarUrl(avatarArraySize);
    this.message = getUserMessage(guestMessageArray);
    this.name = getUserName(guestNameArray);
  }

  function getAvatarUrl(maxNum) {
    return 'img/avatar-' + getRandomIntNumber(1, maxNum) + '.svg';
  }

  function getUserMessage(userMessageArray) {
    return getRandomArrayItem(userMessageArray);
  }

  function getUserName(userNameArray) {
    return getRandomArrayItem(userNameArray);
  }

  var userPhotoCaptions = window.data.userPhotoCaptions;
  var userMessages = window.data.userMessages;
  var userNames = window.data.userNames;

  var customerPhotoCollection = getCustomerPhotoCollection(CUSTOMER_COLLECTION_SIZE, userPhotoCaptions, COMMENT_LIST_SIZE, AVATAR_LIST_SIZE, userMessages, userNames);

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

  window.dataGenerator = {
    customerPhotoCollection: customerPhotoCollection,
    setUserPictureAttributes: setUserPictureAttributes
  };
})();
