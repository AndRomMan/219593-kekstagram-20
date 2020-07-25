'use strict';

(function () {
  var bigPictureCommentSend = window.bigPicture.bigPictureSocialFooter;
  var bigPictureCommentSendText = bigPictureCommentSend.querySelector('.social__footer-text');
  var bigPictureCommentSendBtn = bigPictureCommentSend.querySelector('.social__footer-btn');

  function sendCommentBtnClickHandler(evt) {
    window.eventChecker.checkMouseEvent(evt, sendCommentText);
  }

  function sendCommentBtnKeydownHandler(evt) {
    window.eventChecker.checkEnterKeyEvent(evt, sendCommentText);
  }

  function sendCommentText() {
    var commentText = bigPictureCommentSendText.value;
    var avatarSrc = window.bigPicture.AVATAR_SRC;
    var avatarName = window.bigPicture.USER_NAME;
    window.bigPictureComments.setNewComment(avatarSrc, avatarName, commentText);
    bigPictureCommentSendText.value = '';
  }

  window.bigPictureCommentSender = {
    sendCommentBtnClickHandler: sendCommentBtnClickHandler,
    sendCommentBtnKeydownHandler: sendCommentBtnKeydownHandler,
    bigPictureCommentSendBtn: bigPictureCommentSendBtn,
    bigPictureCommentSendText: bigPictureCommentSendText,
  };
})();
