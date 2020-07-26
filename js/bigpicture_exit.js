'use strict';

(function () {
  var bigPictureCommentsLoader = window.bigPictureComments.bigPictureCommentsLoader;
  var commentsLoaderClickHandler = window.bigPictureComments.commentsLoaderClickHandler;
  var commentsLoaderKeydownHandler = window.bigPictureComments.commentsLoaderKeydownHandler;
  var sendCommentBtnClickHandler = window.bigPictureCommentSender.sendCommentBtnClickHandler;
  var sendCommentBtnKeydownHandler = window.bigPictureCommentSender.sendCommentBtnKeydownHandler;
  var bigPictureCommentSendBtn = window.bigPictureCommentSender.bigPictureCommentSendBtn;

  function bigPictureCloseClickHandler(evt) {
    window.eventChecker.checkMouseEvent(evt, cleanBigPicture);
  }

  function bigPictureEscapeHandler(evt) {
    window.eventChecker.checkEscapeKeyEvent(evt, cleanBigPicture);
  }

  function bigPictureCloseKeydownHandler(evt) {
    window.eventChecker.checkEnterKeyEvent(evt, cleanBigPicture);
  }


  function cleanBigPicture() {
    window.bogPictureModal.modalBigPictureClose();
    window.bigPictureComments.commentListChildrenRemove();
    window.bigPicture.bigPictureSection.classList.add('hidden');

    bigPictureCommentsLoader.removeEventListener('click', commentsLoaderClickHandler);
    bigPictureCommentsLoader.removeEventListener('keydown', commentsLoaderKeydownHandler);

    bigPictureCommentSendBtn.removeEventListener('click', sendCommentBtnClickHandler);
    bigPictureCommentSendBtn.removeEventListener('keydown', sendCommentBtnKeydownHandler);

    window.bigPictureCommentSender.bigPictureCommentSendText.value = '';
  }

  window.bigPictureExit = {
    bigPictureCloseClickHandler: bigPictureCloseClickHandler,
    bigPictureEscapeHandler: bigPictureEscapeHandler,
    bigPictureCloseKeydownHandler: bigPictureCloseKeydownHandler,
  };
})();
