'use strict';

(function () {
  var COMMENTS_MAX_NUM = 5;
  var bigPictureSocial = window.bigPicture.bigPictureSocial;
  var bigPictureCommentCount = bigPictureSocial.querySelector('.social__comment-count');
  var bigPictureCommentCurrentCounter = bigPictureCommentCount.querySelector('.comments-count__current');
  var bigPictureCommentTotalCounter = bigPictureCommentCount.querySelector('.comments-count__total');
  var bigPictureCommentsLoader = bigPictureSocial.querySelector('.social__comments-loader');
  var bigPictureCommentList = bigPictureSocial.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment');
  var bigPictureCommentSendAuthor = window.bigPicture.bigPictureSocialFooter.querySelector('.social__picture');
  var startPoint;
  var blockSize;
  var comments;
  var commentsTotalNum;

  function getComments(commentArray) {
    bigPictureCommentsLoader.classList.remove('hidden');
    comments = commentArray;
    startPoint = 0;
    blockSize = 0;
    commentsTotalNum = comments.length;
    bigPictureCommentTotalCounter.textContent = comments.length;
    bigPictureCommentSendAuthor.setAttribute('src', window.bigPicture.AVATAR_SRC);
    bigPictureCommentSendAuthor.setAttribute('alt', window.bigPicture.USER_NAME);
    loadCommentBlock();
    bigPictureCommentsLoader.addEventListener('click', commentsLoaderClickHandler);
    bigPictureCommentsLoader.addEventListener('keydown', commentsLoaderKeydownHandler);
  }

  function loadCommentBlock() {
    if ((commentsTotalNum - startPoint) < 5) {
      blockSize = (commentsTotalNum - startPoint);
      bigPictureCommentsLoader.classList.add('hidden');
    } else {
      blockSize = (COMMENTS_MAX_NUM);
    }

    for (var i = startPoint; i <= (startPoint + blockSize - 1); i++) {
      var avatarSrc = comments[i].avatar;
      var commentText = comments[i].message;
      var avatarName = comments[i].name;
      setNewComment(avatarSrc, avatarName, commentText);
    }

    bigPictureCommentCurrentCounter.textContent = (startPoint + blockSize) + ' из ';
    startPoint += blockSize;
  }

  function setNewComment(avatarSrc, avatarName, commentText) {
    var commentFragment = document.createDocumentFragment();
    var commentItem = commentTemplate.content.querySelector('li');
    var newComment = commentItem.cloneNode(true);
    var avatarItem = newComment.querySelector('.social__picture');
    var textItem = newComment.querySelector('.social__text');

    avatarItem.setAttribute('src', avatarSrc);
    avatarItem.setAttribute('alt', avatarName);
    textItem.textContent = commentText;
    commentFragment.append(newComment);
    bigPictureCommentList.append(commentFragment);
  }

  function commentListChildrenRemove() {
    var commentListChildren = window.bigPictureComments.bigPictureCommentList.querySelectorAll('li');
    commentListChildren.forEach(function (elem) {
      elem.remove();
    });
  }

  function commentsLoaderClickHandler(evt) {
    if (evt.which !== 1) {
      return;
    }
    commentListChildrenRemove();
    loadCommentBlock();
  }

  function commentsLoaderKeydownHandler(evt) {
    if ((evt.code === 'Enter') || (evt.code === 'Space')) {
      evt.preventDefault();
      commentListChildrenRemove();
      loadCommentBlock();
    }
  }

  window.bigPictureComments = {
    getComments: getComments,
    bigPictureCommentList: bigPictureCommentList,
    commentListChildrenRemove: commentListChildrenRemove,
    bigPictureCommentsLoader: bigPictureCommentsLoader,
    commentsLoaderClickHandler: commentsLoaderClickHandler,
    commentsLoaderKeydownHandler: commentsLoaderKeydownHandler,
    setNewComment: setNewComment,
  };
})();
