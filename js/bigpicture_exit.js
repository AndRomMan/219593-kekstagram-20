'use strict';

(function () {
  var bigPictureCommentsLoader = window.bigPictureComments.bigPictureCommentsLoader;
  var commentsLoaderClickHandler = window.bigPictureComments.commentsLoaderClickHandler;
  var commentsLoaderKeydownHandler = window.bigPictureComments.commentsLoaderKeydownHandler;
  var sendCommentBtnClickHandler = window.bigPictureCommentSender.sendCommentBtnClickHandler;
  var sendCommentBtnKeydownHandler = window.bigPictureCommentSender.sendCommentBtnKeydownHandler;
  var bigPictureCommentSendBtn = window.bigPictureCommentSender.bigPictureCommentSendBtn;

  function bigPictureCloseHandler(evt) {
    if (((evt.type) === 'click') || ((evt.code) === 'Escape')) {
      window.modal.modalBigPictureClose();
      window.bigPicture.bigPictureSection.classList.add('hidden');
      bigPictureCommentsLoader.removeEventListener('click', commentsLoaderClickHandler);
      bigPictureCommentsLoader.removeEventListener('keydown', commentsLoaderKeydownHandler);
      bigPictureCommentSendBtn.removeEventListener('click', sendCommentBtnClickHandler);
      bigPictureCommentSendBtn.removeEventListener('keydown', sendCommentBtnKeydownHandler);
      window.bigPictureComments.commentListChildrenRemove();
    }
  }

  window.bigPictureExit = {
    bigPictureCloseHandler: bigPictureCloseHandler,
  };
})();
