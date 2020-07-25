'use strict';

(function () {
  var MAX_HASHTAG_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_HASHTAG_LENGTH = 2;
  var REG_EXP = /^#{1}[a-zа-я0-9]{1,}$/i;

  var hashTagInput = window.preview.hashTagInput;
  var hashTagErrorMessageField = window.preview.hashTagErrorMessageField;

  function hashTagChangeHandler() {
    var hashTagInputValidityCheck = true;
    var hashTagValue = hashTagInput.value;
    hashTagAlarmOff();

    if (hashTagValue === '') {
      hashTagInputValidityCheck = true;
      return hashTagInputValidityCheck;
    }

    var hashTags = trimHashTagValue(hashTagValue);
    hashTagInputValidityCheck = hashTagArrayValidating(hashTags);
    return hashTagInputValidityCheck;
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
      hashTagAlarmOff();
      return true;
    } else {
      hashTagAlarmOn(hashTagErrorMessages);
      return false;
    }
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
    inputArray.forEach(function (elem) {
      patternErrorCounter = (REG_EXP.test(elem)) ? patternErrorCounter : ++patternErrorCounter;
    });
    if (patternErrorCounter > 0) {
      hashTagErrorMessages.push(patternErrorMessage);
    }
    return patternErrorCounter;
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

  window.previewFormHashtag = {
    hashTagChangeHandler: hashTagChangeHandler,

    hashTagAlarmOff: hashTagAlarmOff,
  };
})();
