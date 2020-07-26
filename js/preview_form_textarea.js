'use strict';

(function () {
  var MAX_COMMENT_LENGTH = 140;

  var textAreaField = window.preview.textAreaField;
  var textAreaErrorMessage = window.preview.textAreaErrorMessage;

  function textareaChangeHandler() {
    var textareaFieldCheck = true;
    var textAreaValue = textAreaField.value;
    var currentCommentLength = textAreaValue.length;

    if (currentCommentLength <= (MAX_COMMENT_LENGTH - 20)) {
      textareaFieldCheck = true;
      textareaAlarmOff();
      textareaWarningOff();
    } else if ((currentCommentLength > (MAX_COMMENT_LENGTH - 20)) && (currentCommentLength <= MAX_COMMENT_LENGTH)) {
      textareaAlarmOff();
      textAreaWarningOn(currentCommentLength, MAX_COMMENT_LENGTH);
      textareaFieldCheck = true;
    } else if (currentCommentLength > MAX_COMMENT_LENGTH) {
      textareaWarningOff();
      textAreaAlarmOn(currentCommentLength, MAX_COMMENT_LENGTH);
      textareaFieldCheck = false;
    }
    return textareaFieldCheck;
  }

  function textAreaWarningOn(counter, maxNum) {
    textAreaErrorMessage.classList.remove('visually-hidden');
    textAreaField.classList.add('error-warning');
    textAreaErrorMessage.textContent = 'Вами уже напечатано символов ' + counter + '. Всего можно будет ввести ' + maxNum + '.';
  }

  function textareaWarningOff() {
    textAreaField.classList.remove('error-warning');
  }

  function textAreaAlarmOn(counter, maxNum) {
    textAreaField.classList.add('error-input');
    textAreaErrorMessage.textContent = 'Количество введенных символов превышает максимум на ' + (counter - maxNum) + ' !';
  }

  function textareaAlarmOff() {
    textAreaErrorMessage.classList.add('visually-hidden');
    textAreaField.classList.remove('error-input');
    textAreaErrorMessage.textContent = '';
  }

  window.previewFormTextarea = {
    textareaChangeHandler: textareaChangeHandler,

    textareaAlarmOff: textareaAlarmOff,
    textareaWarningOff: textareaWarningOff,
  };
})();
