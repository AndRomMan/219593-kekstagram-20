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

  function setCommentBlock(commentArray) {
    bigPictureCommentsLoader.classList.remove('hidden');
    comments = commentArray;
    startPoint = 0;
    blockSize = 0;
    commentsTotalNum = comments.length;
    bigPictureCommentTotalCounter.textContent = comments.length;
    commentsRender();
    bigPictureCommentSendAuthor.setAttribute('src', window.bigPicture.AVATAR_SRC);
    bigPictureCommentSendAuthor.setAttribute('alt', window.bigPicture.USER_NAME);
    bigPictureCommentsLoader.addEventListener('click', commentsLoaderClickHandler);
    bigPictureCommentsLoader.addEventListener('keydown', commentsLoaderKeydownHandler);
  }

  function commentsRender() {
    commentListChildrenRemove();
    loadComments();
  }

  function loadComments() {
    if ((commentsTotalNum - startPoint) < 5) {
      bigPictureCommentsLoader.classList.add('hidden');
    }

    var commentsToShow = comments.slice(startPoint, startPoint + COMMENTS_MAX_NUM);

    commentsToShow.forEach(function (elem) {
      var avatarSrc = elem.avatar;
      var commentText = elem.message;
      var avatarName = elem.name;
      setNewComment(avatarSrc, avatarName, commentText);
    });

    startPoint += commentsToShow.length;

    bigPictureCommentCurrentCounter.textContent = (startPoint + blockSize) + ' из ';
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
    window.eventChecker.checkMouseEvent(evt, function () {
      commentsRender();
    });
  }

  function commentsLoaderKeydownHandler(evt) {
    if ((evt.code === 'Enter') || (evt.code === 'Space')) {
      commentsRender();
    }
  }

  window.bigPictureComments = {
    setCommentBlock: setCommentBlock,
    bigPictureCommentList: bigPictureCommentList,
    commentListChildrenRemove: commentListChildrenRemove,
    bigPictureCommentsLoader: bigPictureCommentsLoader,

    commentsLoaderClickHandler: commentsLoaderClickHandler,
    commentsLoaderKeydownHandler: commentsLoaderKeydownHandler,

    setNewComment: setNewComment,

  };
})();
