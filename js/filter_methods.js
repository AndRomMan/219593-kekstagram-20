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
        randomArray.push(inputArray[newArrayElem]);
      }
    }
    return randomArray;
  }

  function getDescendedArray(inputArray) {
    var rangedArray = inputArray.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
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
