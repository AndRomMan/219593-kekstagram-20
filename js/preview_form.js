'use strict';

(function () {
  var MAX_COMMENT_LENGTH = 140;
  var MAX_HASHTAG_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_HASHTAG_LENGTH = 2;

  var textAreaField = window.preview.textAreaField;
  var hashTagInput = window.preview.hashTagInput;
  var submitBtn = window.preview.submitBtn;
  var hashTagErrorMessageField = window.preview.hashTagErrorMessageField;
  var textAreaErrorMessage = window.preview.textAreaErrorMessage;
  var hashTagInputValidityCheck = true;
  var textAreaFieldCheck = true;

  submitBtn.addEventListener('click', submitBtnClickHandler);

  function submitBtnClickHandler(evt) {
    evt.preventDefault();
    var validityCheck = hashTagInputValidityCheck && textAreaFieldCheck;
    if (validityCheck !== true) {
      return;
    }

    var outputObject = new FormData(window.preview.imgUploadForm);
    window.previewXHR.sendPreviewData(outputObject);
  }

  function hashTagChangeHandler(evt) {
    evt.preventDefault();
    var hashTagValue = hashTagInput.value;
    if (hashTagValue === '') {
      hashTagInputValidityCheck = true;
      hashTagAlarmOff();
      return;
    }
    var hashTags = trimHashTagValue(hashTagValue);
    hashTagAlarmOff();
    hashTagInputValidityCheck = hashTagArrayValidating(hashTags);
  }

  function trimHashTagValue(inputString) {
    var spaceRegExp = /\s+/g;
    inputString = inputString.replace(spaceRegExp, ' ').trim();
    return inputString.split(' ');
  }

  function hashTagArrayValidating(inputArray) {
    var hashTagErrorMessages = [];
    var sizeErrorsNumber = hashTagSizeValidating(inputArray, hashTagErrorMessages);
    var repeatedTagErrorNumber = hashTagRepeatedValidating(inputArray, hashTagErrorMessages);
    var lengthErrorNumber = hashTagLengthValidating(inputArray, hashTagErrorMessages);
    var patternErrorNumber = hashTagPatternValidating(inputArray, hashTagErrorMessages);
    var totalErrorNum = sizeErrorsNumber + repeatedTagErrorNumber + lengthErrorNumber + patternErrorNumber;

    if (totalErrorNum === 0) {
      hashTagInputValidityCheck = true;
      hashTagAlarmOff();
      return true;
    } else {
      hashTagInputValidityCheck = false;
      hashTagAlarmOn(hashTagErrorMessages);
      return false;
    }
  }

  function hashTagAlarmOn(errorMessages) {
    hashTagInput.classList.add('error-input');
    hashTagErrorMessageField.classList.remove('visually-hidden');
    errorMessages.forEach(function (elem) {
      var newString = elem + '<br>';
      hashTagErrorMessageField.insertAdjacentHTML('beforeend', newString);
    });
  }

  function hashTagAlarmOff() {
    hashTagInput.classList.remove('error-input');
    hashTagErrorMessageField.classList.add('visually-hidden');
    hashTagErrorMessageField.textContent = '';
  }

  function hashTagSizeValidating(inputArray, hashTagErrorMessages) {
    var arrayLength = inputArray.length;
    var tagNumberErrorCounter = 0;
    var tagNumberErrorMessage = 'Хэш-тегов не должно быть больше ' + MAX_HASHTAG_NUMBER + '.';
    tagNumberErrorCounter = (arrayLength > MAX_HASHTAG_NUMBER) ? ++tagNumberErrorCounter : tagNumberErrorCounter;

    if (tagNumberErrorCounter > 0) {
      hashTagErrorMessages.push(tagNumberErrorMessage);
    }
    return tagNumberErrorCounter;
  }

  function hashTagRepeatedValidating(inputArray, hashTagErrorMessages) {
    var arrayLength = inputArray.length;
    var repeatedTagErrorCounter = 0;
    var repeatedTagErrorMessage = 'Хэш-теги на должны повторяться!';

    inputArray.forEach(function (elem, index, array) {
      for (var i = index; i < (arrayLength - 1); i++) {
        repeatedTagErrorCounter = (elem === array[i + 1]) ? (repeatedTagErrorCounter + 1) : repeatedTagErrorCounter;
      }
    });

    if (repeatedTagErrorCounter > 0) {
      hashTagErrorMessages.push(repeatedTagErrorMessage);
    }
    return repeatedTagErrorCounter;
  }

  function hashTagLengthValidating(inputArray, hashTagErrorMessages) {
    var tagGreaterLengthErrorCounter = 0;
    var tagGreaterLengthErrorMessage = 'Количество символов в хэш-теге превышает ' + MAX_HASHTAG_LENGTH + '.';
    var tagLesserLengthErrorCounter = 0;
    var tagLesserLengthErrorMessage = 'Количество символов в хэш-теге меньше ' + MIN_HASHTAG_LENGTH + '.';

    inputArray.forEach(function (elem) {
      tagGreaterLengthErrorCounter = (elem.length > MAX_HASHTAG_LENGTH) ? (++tagGreaterLengthErrorCounter) : tagGreaterLengthErrorCounter;
      tagLesserLengthErrorCounter = (elem.length < MIN_HASHTAG_LENGTH) ? (++tagLesserLengthErrorCounter) : tagLesserLengthErrorCounter;
    });

    if (tagGreaterLengthErrorCounter > 0) {
      hashTagErrorMessages.push(tagGreaterLengthErrorMessage);
    }

    if (tagLesserLengthErrorCounter > 0) {
      hashTagErrorMessages.push(tagLesserLengthErrorMessage);
    }
    return tagGreaterLengthErrorCounter + tagLesserLengthErrorCounter;

  }

  function hashTagPatternValidating(inputArray, hashTagErrorMessages) {
    var patternErrorCounter = 0;
    var patternErrorMessage = 'Хэш-тег должен начинаться с символа #, и содержать только цифры и буквы.';
    var regExp = /^#{1}[a-zа-я0-9]{1,}$/i;
    inputArray.forEach(function (elem) {
      patternErrorCounter = (regExp.test(elem)) ? patternErrorCounter : ++patternErrorCounter;
    });
    if (patternErrorCounter > 0) {
      hashTagErrorMessages.push(patternErrorMessage);
    }
    return patternErrorCounter;
  }

  function textAreaChangeHandler(evt) {
    evt.preventDefault();
    var textAreaValue = textAreaField.value;
    var currentCommentLength = textAreaValue.length;

    if (currentCommentLength <= (MAX_COMMENT_LENGTH - 20)) {
      textAreaFieldCheck = true;
      textAreaAlarmOff();
      textAreaWarningOff();
    } else if ((currentCommentLength > (MAX_COMMENT_LENGTH - 20)) && (currentCommentLength <= MAX_COMMENT_LENGTH)) {
      textAreaAlarmOff();
      textAreaWarningOn(currentCommentLength, MAX_COMMENT_LENGTH);
      textAreaFieldCheck = true;
    } else if (currentCommentLength > MAX_COMMENT_LENGTH) {
      textAreaWarningOff();
      textAreaAlarmOn(currentCommentLength, MAX_COMMENT_LENGTH);
      textAreaFieldCheck = false;
    }
  }

  function textAreaWarningOn(counter, maxNum) {
    textAreaErrorMessage.classList.remove('visually-hidden');
    textAreaField.classList.add('error-warning');
    textAreaErrorMessage.textContent = 'Вами уже напечатано символов ' + counter + '. Всего можно будет ввести ' + maxNum + '.';
  }

  function textAreaWarningOff() {
    textAreaField.classList.remove('error-warning');
  }

  function textAreaAlarmOn(counter, maxNum) {
    textAreaField.classList.add('error-input');
    textAreaErrorMessage.textContent = 'Количество введенных символов превышает максимум на ' + (counter - maxNum) + ' !';
  }

  function textAreaAlarmOff() {
    textAreaErrorMessage.classList.add('visually-hidden');
    textAreaField.classList.remove('error-input');
    textAreaErrorMessage.textContent = '';
  }

  window.previewForm = {
    hashTagChangeHandler: hashTagChangeHandler,
    hashTagAlarmOff: hashTagAlarmOff,
    textAreaAlarmOff: textAreaAlarmOff,
    textAreaWarningOff: textAreaWarningOff,
    textAreaChangeHandler: textAreaChangeHandler,
  };

})();
