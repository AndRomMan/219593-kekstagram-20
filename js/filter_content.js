'use strict';

(function () {
  var RANDOM_PHOTO_COLLECTION_SIZE = 10;
  var SORTING_TYPE = 'DESCENDING';

  function getRandomArray(inputArray) {
    var indexRandomArray = [];
    var randomArray = [];
    var inputArrayLength = inputArray.length;

    while (indexRandomArray.length < RANDOM_PHOTO_COLLECTION_SIZE) {
      var newArrayElem = getRandomIntNumber(0, (inputArrayLength - 1));
      var checkArray = indexRandomArray.indexOf(newArrayElem, 0);
      if (checkArray === -1) {
        indexRandomArray.push(newArrayElem);
      }
    }

    indexRandomArray.forEach(function (elem) {
      randomArray.push(inputArray[elem]);
    });
    return randomArray;
  }

  function getRangedArray(inputArray, sortingType) {
    var commentsNumberArray = [];
    var rangedArray = [];
    var rangedCommentsNumberArray;

    inputArray.forEach(function (inputArrayElement) {
      commentsNumberArray.push(inputArrayElement.comments.length);
    });

    switch (sortingType) {
      case ('DESCENDING'):
        rangedCommentsNumberArray = commentsNumberArray.sort(function (a, b) {
          return (b - a);
        });
        break;
      case ('ASCENDING'):
        rangedCommentsNumberArray = commentsNumberArray.sort(function (a, b) {
          return (a - b);
        });
        break;
    }

    rangedCommentsNumberArray.forEach(function (commentNum) {
      inputArray.forEach(function (inputElem) {
        if (inputElem.comments.length === commentNum) {
          var checkArray = rangedArray.indexOf(inputElem, 0);
          if (checkArray === -1) {
            rangedArray.push(inputElem);
          }
        }
      });
    });
    return rangedArray;
  }

  function getRandomIntNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  window.filterContent = {
    getRandomArray: getRandomArray,
    getRangedArray: getRangedArray,
    SORTING_TYPE: SORTING_TYPE,
  };
})();
