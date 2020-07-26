'use strict';

(function () {
  var RANDOM_PHOTO_COLLECTION_SIZE = 10;

  var FilterType = {
    DEFAULT: 'default',
    RANDOM: 'random',
    DESCEND: 'descending',
    ASCEND: 'ascending',
  };

  var descendingRangedPhotoCollection = [];

  function getFilteredArray(loadedPhotoCollection, filterType) {
    var defaultPhotoCollection = loadedPhotoCollection;
    var currentPhotoCollection = [];

    switch (filterType) {
      case FilterType.DEFAULT:
        currentPhotoCollection = defaultPhotoCollection;
        break;

      case FilterType.RANDOM:
        currentPhotoCollection = getRandomArray(defaultPhotoCollection);
        break;

      case FilterType.DESCEND:
        descendingRangedPhotoCollection = checkEmptyArray(descendingRangedPhotoCollection, defaultPhotoCollection, getDescendedArray);
        currentPhotoCollection = descendingRangedPhotoCollection;
        break;
    }
    return currentPhotoCollection;
  }

  function checkEmptyArray(array, defaultArray, getArray) {
    if (array.length !== 0) {
      return array;
    } else {
      array = getArray(defaultArray);
      return array;
    }
  }

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

  function getDescendedArray(inputArray) {
    var commentsNumberArray = [];
    var rangedArray = [];
    var rangedCommentsNumberArray;

    inputArray.forEach(function (inputArrayElement) {
      commentsNumberArray.push(inputArrayElement.comments.length);
    });

    rangedCommentsNumberArray = commentsNumberArray.sort(function (a, b) {
      return (b - a);
    });

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

  window.filterMethods = {
    getFilteredArray: getFilteredArray,
    FilterType: FilterType
  };

})();
