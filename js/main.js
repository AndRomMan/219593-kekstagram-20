/*  eslint-disable no-invalid-this */
'use strict';

var body = document.body;

// TODO Templates
var userImgTemplate = document.querySelector('#picture');
var previewTemplate = document.querySelector('#img-preview');


// TODO класс для обозначения перехода в режим управления глубиной эффекта стрелками
var KEY_MODE_SLIDER_CLASS = 'slider-key-mode';

// TODO параметры мастштабирования previewImg
var SCALE_START_VALUE = 1;
var SCALE_STOP_VALUE = 0.25;
var SCALE_STEP = 0.25;

// TODO создать объект для параметров фильтра
var EFFECT_DEPTH_START_POINT = 1;

var EFFECT_TYPE_0_VALUE = 'none';
var EFFECT_TYPE_0_CLASS = '';
var EFFECT_TYPE_0_FILTER = '';
var EFFECT_TYPE_0_MIN = 0;
var EFFECT_TYPE_0_MAX = 1;
var EFFECT_TYPE_0_UNIT = '';
var EFFECT_TYPE_0_STEP = 0.01;

var EFFECT_TYPE_1_VALUE = 'chrome';
var EFFECT_TYPE_1_CLASS = 'effects__preview--chrome';
var EFFECT_TYPE_1_FILTER = 'grayscale';
var EFFECT_TYPE_1_MIN = 0;
var EFFECT_TYPE_1_MAX = 1;
var EFFECT_TYPE_1_UNIT = '';
var EFFECT_TYPE_1_STEP = 0.01;

var EFFECT_TYPE_2_VALUE = 'sepia';
var EFFECT_TYPE_2_CLASS = 'effects__preview--sepia';
var EFFECT_TYPE_2_FILTER = 'sepia';
var EFFECT_TYPE_2_MIN = 0;
var EFFECT_TYPE_2_MAX = 1;
var EFFECT_TYPE_2_UNIT = '';
var EFFECT_TYPE_2_STEP = 0.01;

var EFFECT_TYPE_3_VALUE = 'marvin';
var EFFECT_TYPE_3_CLASS = 'effects__preview--marvin';
var EFFECT_TYPE_3_FILTER = 'invert';
var EFFECT_TYPE_3_MIN = 0;
var EFFECT_TYPE_3_MAX = 1;
var EFFECT_TYPE_3_UNIT = '';
var EFFECT_TYPE_3_STEP = 0.01;

var EFFECT_TYPE_4_VALUE = 'phobos';
var EFFECT_TYPE_4_CLASS = 'effects__preview--phobos';
var EFFECT_TYPE_4_FILTER = 'blur';
var EFFECT_TYPE_4_MIN = 0;
var EFFECT_TYPE_4_MAX = 3;
var EFFECT_TYPE_4_UNIT = 'px';
var EFFECT_TYPE_4_STEP = 0.5;

var EFFECT_TYPE_5_VALUE = 'heat';
var EFFECT_TYPE_5_CLASS = 'effects__preview--heat';
var EFFECT_TYPE_5_FILTER = 'brightness';
var EFFECT_TYPE_5_MIN = 1;
var EFFECT_TYPE_5_MAX = 3;
var EFFECT_TYPE_5_UNIT = '';
var EFFECT_TYPE_5_STEP = 0.01;


var MAX_COMMENT_LENGTH = 140;
var MAX_HASHTAG_NUMBER = 5;
var MAX_HASHTAG_LENGTH = 20;
var MIN_HASHTAG_LENGTH = 2;


var CUSTOMER_COLLECTION_SIZE = 25;

var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;

var AVATAR_LIST_SIZE = 6;
var COMMENT_LIST_SIZE = 3;

var PHOTO_DIRECTORY_PATH = 'photos';

var userPhotoCaptions = [];
var userNames = [];
var userMessages = [];

// =============================================================================
// TODO Формирование тестировочных данных: изображения, комментарии и т.д.
// =============================================================================

function getRandomIntNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayItem(arr) {
  return arr[getRandomIntNumber(0, arr.length - 1)];
}

function getCustomerPhotoCollection(collectionSize, userPhotoCaptionArray, commentArraySize, avatarArraySize, guestMessageArray, guestNameArray) {
  var array = [];
  for (var i = 0; i < collectionSize; i++) {
    var arrayItem = new GetPhotoDescription(i, userPhotoCaptionArray, commentArraySize, avatarArraySize, guestMessageArray, guestNameArray);
    array.push(arrayItem);
  }
  return array;
}

function GetPhotoDescription(counter, userPhotoCaptionArray, commentArraySize, avatarArraySize, guestMessageArray, guestNameArray) {
  this.url = getImgUrl(counter);
  this.description = getUserPhotoCaption(userPhotoCaptionArray);
  this.likes = getLikesCount(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  this.comments = getCommentArray(commentArraySize, avatarArraySize, guestMessageArray, guestNameArray);
}

function getImgUrl(num) {
  return 'photos/' + (num + 1) + '.jpg';
}

function getUserPhotoCaption(arr) {
  return getRandomArrayItem(arr);
}

function getLikesCount(minCount, maxCount) {
  return getRandomIntNumber(minCount, maxCount);
}

function getCommentArray(commentArraySize, avatarArraySize, guestMessageArray, guestNameArray) {
  var array = [];
  for (var i = 0; i < commentArraySize; i++) {
    var arrayItem = new GetComment(avatarArraySize, guestMessageArray, guestNameArray);
    array.push(arrayItem);
  }
  return array;
}

function GetComment(avatarArraySize, guestMessageArray, guestNameArray) {
  this.avatar = getAvatarUrl(avatarArraySize);
  this.message = getUserMessage(guestMessageArray);
  this.name = getUserName(guestNameArray);
}

function getAvatarUrl(maxNum) {
  return 'img/avatar-' + getRandomIntNumber(1, maxNum) + '.svg';
}

function getUserMessage(userMessageArray) {
  return getRandomArrayItem(userMessageArray);
}

function getUserName(userNameArray) {
  return getRandomArrayItem(userNameArray);
}

function setUserPictureAttributes(node, objectElement) {
  var imgElement = node.querySelector('.picture__img');
  var commentsElement = node.querySelector('.picture__comments');
  var likesElement = node.querySelector('.picture__likes');

  var imgUrl = objectElement.url;
  var imgComments = objectElement.comments;
  var imgLikes = objectElement.likes;

  imgElement.setAttribute('src', imgUrl);
  commentsElement.textContent = (String(imgComments.length));
  likesElement.textContent = (String(imgLikes));
}

var customerPhotoCollection = getCustomerPhotoCollection(CUSTOMER_COLLECTION_SIZE, userPhotoCaptions, COMMENT_LIST_SIZE, AVATAR_LIST_SIZE, userMessages, userNames);

// =============================================================================
// TODO  Section 2 : Контейнер для изображений от других пользователей
// =============================================================================
var userImgSection = document.querySelector('.pictures');
var userPictureTemplate = userImgTemplate.content.querySelector('a');

function getUserPictureBlocks(template, objectArray) {
  var userPicturesFragment = document.createDocumentFragment();

  objectArray.forEach(function (element) {
    var templateClone = template.cloneNode(true);
    setUserPictureAttributes(templateClone, element);
    userPicturesFragment.append(templateClone);
  });
  return userPicturesFragment;
}
userImgSection.append(getUserPictureBlocks(userPictureTemplate, customerPhotoCollection));

// =============================================================================
// TODO  Section 3 : Секция для загрузки нового изображения на сайт
// =============================================================================
var imgUploadSection = document.querySelector('.img-upload');

// TODO Кнопка загрузки фото
var uploadFileBtn = imgUploadSection.querySelector('.img-upload__input');

// TODO Форма предпрсмотра и редактирования: hidden по умолчанию
var previewEditor = imgUploadSection.querySelector('.img-upload__overlay');
var imgPreview = previewEditor.querySelector('.img-upload__preview img');

// Кнопка отмены предпросмотра и редактирования
var previewEditorCancelBtn = previewEditor.querySelector('.img-upload__cancel');

// TODO Блок мастштабирования изображения
var imgScaleBlock = previewEditor.querySelector('.img-upload__scale');
// Кнопки управления масштабом
var imgScaleSmaller = imgScaleBlock.querySelector('.scale__control--smaller');
var imgScaleValue = imgScaleBlock.querySelector('.scale__control--value');
var imgScaleBigger = imgScaleBlock.querySelector('.scale__control--bigger');

// TODO Блок выбора эффекта для фото
var effectsPointerBlock = previewEditor.querySelector('.img-upload__effects');

// TODO переменная хранит ссылку на текущий выбранный эффект (кнопку)
var checkedEffectType;

// TODO элементы слайдера изменения глубины эффекта
var effectSlider = previewEditor.querySelector('.img-upload__effect-level');
var effectSliderValue = effectSlider.querySelector('.effect-level__value');
var effectSliderLine = effectSlider.querySelector('.effect-level__line');
var effectSliderLineDepth = effectSlider.querySelector('.effect-level__depth');
var effectSliderPin = effectSlider.querySelector('.effect-level__pin');

// TODO Форма загрузки данных на сервер
var imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
var hashTagInput = imgUploadForm.querySelector('.text__hashtags');
var textAreaField = imgUploadForm.querySelector('.text__description');
var submitBtn = imgUploadForm.querySelector('.img-upload__submit');

var hashTagErrorMessageField = imgUploadForm.querySelector('.error-message--hash');
var textAreaErrorMessage = imgUploadForm.querySelector('.error-message--description');

// =============================================================================
// TODO Навешиваем обработчик на кнопку загрузки изображения imgPreview
uploadFileBtn.addEventListener('change', imgUploadHandler);

// TODO обработчик загрузки изображения
function imgUploadHandler() {
  // находим input value="none": кнопка без эффекта, ставим checked
  checkedEffectType = effectsPointerBlock.querySelectorAll('input[type="radio"][value="none"]');
  checkedEffectType.checked = true;
  // TODO получаем параметры выбранного файла
  var imgFile = getUploadedFile(this);

  // TODO если файл загружен - открываем окно редактирования и предпросмотра
  if (imgFile) {
    if (imgFile.type.startsWith('image/') && !imgFile.type.startsWith('image/svg')) {
      preventingEcapeOnInput();
      setPreviewEditorTabindex();
      setNewImgPreview(imgPreview, imgFile.name);
      imgPreview = previewEditor.querySelector('.img-upload__preview img');

      // TODO  Включаем окно редактирования и предпросмотра
      previewEditor.classList.remove('hidden');
      body.classList.add('modal-open');
      // TODO очищаем поле value кнопки загрузки.
      //  Иначе нельзя загрузить то-же самое изображение..
      uploadFileBtn.value = '';

      // TODO навешиваем обработчик кнопки закрытия формы редактирования и escape
      document.addEventListener('keydown', previewEditorCloseHandler);

      // TODO навешиваем обработчик escape - закрытие формы редактирования
      previewEditorCancelBtn.addEventListener('click', previewEditorCloseHandler);


      // TODO навешиваем обработчик блока выбора эффектов
      effectsPointerBlock.addEventListener('click', imgEffectClickHandler);

      setImgScale('reset');
      // TODO навешиваем обработчики блока масштабирования
      imgScaleBlock.addEventListener('click', imgScaleClickHandler);

      // TODO навешиваем обработчики события полей ввода
      hashTagInput.addEventListener('change', hashTagChangeHandler);
      textAreaField.addEventListener('input', textAreaChangeHandler);

    } else {
      // TODO заменить alert на окна с сообщением об ошибке
      // alert('    Файлы данного типа не обрабатываются.\n\n    Выберете файл с расширением .png или .jpg.');
      return;
    }
  } else {
    // TODO заменить alert на окна с сообщением об ошибке
    // alert('    Файл не выбран.\n\n    Выберете файл изображения типа .png или .jpg.');
    return;
  }
}

// =============================================================================
// TODO функции загрузки и формирования imgPreview - передаются в imgUploadHandler

// TODO функция получает параметры файла, загруженного через uploadFileControl
function getUploadedFile(input) {
  var fileList = input.files;
  return fileList[0];
}
// TODO функция устаноавливает фрагмент с новым фото на место старого
function setNewImgPreview(oldImg, newFileName) {
  var imgTemplate = previewTemplate.content.querySelector('img');
  var imgFragment = document.createDocumentFragment();
  var newImg = imgTemplate.cloneNode(true);
  var newImgFileName = PHOTO_DIRECTORY_PATH + '/' + newFileName;
  newImg.setAttribute('src', newImgFileName);
  imgFragment.append(newImg);
  oldImg.replaceWith(imgFragment);
}

// =============================================================================
// TODO функция предотвращает срабатывание ESC, если курсор в поле ввода формы
function preventingEcapeOnInput() {
  hashTagInput.addEventListener('focus', focusInputHandler);
  hashTagInput.addEventListener('blur', blurInputHandler);
  textAreaField.addEventListener('focus', focusInputHandler);
  textAreaField.addEventListener('blur', blurInputHandler);
}
function dismissPreventingEcapeOnInput() {
  hashTagInput.removeEventListener('focus', focusInputHandler);
  hashTagInput.removeEventListener('blur', blurInputHandler);
  textAreaField.removeEventListener('focus', focusInputHandler);
  textAreaField.removeEventListener('blur', blurInputHandler);
}

// TODO функция снимает слушатель события escape
function focusInputHandler() {
  document.removeEventListener('keydown', previewEditorCloseHandler);
}

// TODO функция устанавливает слушатель события escape
function blurInputHandler() {
  document.addEventListener('keydown', previewEditorCloseHandler);
}

// =============================================================================

var inputs = document.querySelectorAll('input');
var links = document.querySelectorAll('a');
var buttons = document.querySelectorAll('button');
var overlayButtons = previewEditor.querySelectorAll('button');
var overlayInputs = previewEditor.querySelectorAll('input');
var overlayTextareas = previewEditor.querySelectorAll('textarea');

// TODO функция устанавливает tabindex для исключения перехода с формы редактирования на основное поле
function setPreviewEditorTabindex() {
  inputs.forEach(function (activeElement) {
    activeElement.setAttribute('tabindex', '-1');
  });
  links.forEach(function (activeElement) {
    activeElement.setAttribute('tabindex', '-1');
  });
  buttons.forEach(function (activeElement) {
    activeElement.setAttribute('tabindex', '-1');
  });
  overlayButtons.forEach(function (activeElement) {
    activeElement.setAttribute('tabindex', '0');
  });
  overlayInputs.forEach(function (activeElement) {
    activeElement.setAttribute('tabindex', '0');
  });
  overlayTextareas.forEach(function (activeElement) {
    activeElement.setAttribute('tabindex', '0');
  });
  imgScaleValue.setAttribute('tabindex', '-1');
}
function resetPreviewEditorTabindex() {
  inputs.forEach(function (activeElement) {
    activeElement.removeAttribute('tabindex');
  });
  links.forEach(function (activeElement) {
    activeElement.removeAttribute('tabindex');
  });
  buttons.forEach(function (activeElement) {
    activeElement.removeAttribute('tabindex');
  });
  overlayButtons.forEach(function (activeElement) {
    activeElement.removeAttribute('tabindex');
  });
  overlayInputs.forEach(function (activeElement) {
    activeElement.removeAttribute('tabindex');
  });
  overlayTextareas.forEach(function (activeElement) {
    activeElement.removeAttribute('tabindex');
  });
  imgScaleValue.removeAttribute('tabindex');
}

// ======================================== // TODO масштабирование изображения

// TODO текущее значение коэффициента мастштабирования imgPreview
var scaleImgValue;

function imgScaleClickHandler(evt) {
  var imgScalePressedBtn = evt.target;
  if (imgScalePressedBtn === imgScaleSmaller) {
    var scaleCommand = 'down';
  } else if (imgScalePressedBtn === imgScaleBigger) {
    scaleCommand = 'up';
  }
  setImgScale(scaleCommand);
}

function setImgScale(scaleAction) {
  switch (scaleAction) {
    case 'down':
      scaleImgValue = (scaleImgValue <= SCALE_STOP_VALUE) ? SCALE_STOP_VALUE : (scaleImgValue - SCALE_STEP);
      break;
    case 'reset':
      scaleImgValue = SCALE_START_VALUE;
      break;
    case 'up':
      scaleImgValue = (scaleImgValue >= SCALE_START_VALUE) ? SCALE_START_VALUE : (scaleImgValue + SCALE_STEP);
      break;
  }

  var transformStyleString = 'transform: scale(' + String(scaleImgValue.toFixed(2)) + '); ';
  imgPreview.setAttribute('data-transform', transformStyleString);

  // TODO объединяем стили фильтра и стиль трансформации изображения
  imgPreview.setAttribute('style', transformStyleString + imgPreview.getAttribute('data-filter'));

  // TODO вписываем коэфф масштабирования в поле value индикатора
  imgScaleValue.setAttribute('value', String((scaleImgValue * 100).toFixed(0) + '%'));
}

// ======================================== // TODO блок выбора эффекта
// TODO Параметры слайдера и фильтра
var effectSliderVisibility;
// TODO класс, добавляемый к изображению, который включает 100% эффект
var effectClass;
// TODO тип фильтра создающего эффект
var setEffectFilter;

var minEffectValue;
var maxEffectValue;
var effectValueUnit;

var effectValueStep;
var effectPixelStep;

var sliderPixelStartPoint;
var sliderPixelEndPoint;

var sliderLinePixelWidth;
var currentSliderPinShift;

// TODO изменение эффектов изображения

// функция установки эффекта
function imgEffectClickHandler(evt) {
  checkedEffectType = evt.target;
  var checkEffectValue = checkedEffectType.getAttribute('value');

  // TODO При событии click происходит 2 события: на span и на input
  if (checkedEffectType.getAttribute('type') !== 'radio') {
    return;
  }

  // TODO Определение параметров фильтра изображения
  switch (checkEffectValue) {
    case EFFECT_TYPE_0_VALUE:
      effectSliderVisibility = false;
      effectClass = EFFECT_TYPE_0_CLASS;
      setEffectFilter = EFFECT_TYPE_0_FILTER;
      minEffectValue = EFFECT_TYPE_0_MIN;
      maxEffectValue = EFFECT_TYPE_0_MAX;
      effectValueUnit = EFFECT_TYPE_0_UNIT;
      effectValueStep = EFFECT_TYPE_0_STEP;
      break;

    case (EFFECT_TYPE_1_VALUE):
      effectSliderVisibility = true;
      effectClass = EFFECT_TYPE_1_CLASS;
      setEffectFilter = EFFECT_TYPE_1_FILTER;
      minEffectValue = EFFECT_TYPE_1_MIN;
      maxEffectValue = EFFECT_TYPE_1_MAX;
      effectValueUnit = EFFECT_TYPE_1_UNIT;
      effectValueStep = EFFECT_TYPE_1_STEP;
      break;

    case (EFFECT_TYPE_2_VALUE):
      effectSliderVisibility = true;
      effectClass = EFFECT_TYPE_2_CLASS;
      setEffectFilter = EFFECT_TYPE_2_FILTER;
      minEffectValue = EFFECT_TYPE_2_MIN;
      maxEffectValue = EFFECT_TYPE_2_MAX;
      effectValueUnit = EFFECT_TYPE_2_UNIT;
      effectValueStep = EFFECT_TYPE_2_STEP;
      break;

    case (EFFECT_TYPE_3_VALUE):
      effectSliderVisibility = true;
      effectClass = EFFECT_TYPE_3_CLASS;
      setEffectFilter = EFFECT_TYPE_3_FILTER;
      minEffectValue = EFFECT_TYPE_3_MIN;
      maxEffectValue = EFFECT_TYPE_3_MAX;
      effectValueUnit = EFFECT_TYPE_3_UNIT;
      effectValueStep = EFFECT_TYPE_3_STEP;
      break;

    case (EFFECT_TYPE_4_VALUE):
      effectSliderVisibility = true;
      effectClass = EFFECT_TYPE_4_CLASS;
      setEffectFilter = EFFECT_TYPE_4_FILTER;
      minEffectValue = EFFECT_TYPE_4_MIN;
      maxEffectValue = EFFECT_TYPE_4_MAX;
      effectValueUnit = EFFECT_TYPE_4_UNIT;
      effectValueStep = EFFECT_TYPE_4_STEP;
      break;

    case (EFFECT_TYPE_5_VALUE):
      effectSliderVisibility = true;
      effectClass = EFFECT_TYPE_5_CLASS;
      setEffectFilter = EFFECT_TYPE_5_FILTER;
      minEffectValue = EFFECT_TYPE_5_MIN;
      maxEffectValue = EFFECT_TYPE_5_MAX;
      effectValueUnit = EFFECT_TYPE_5_UNIT;
      effectValueStep = EFFECT_TYPE_5_STEP;
      break;
  }
  checkedEffectType.addEventListener('keydown', startEffectDepthKeyModeHandler);
  setEffectSlider();
}

// TODO обработчик клавиш enter и space переводит в режим управления глубиной эффекта стрелками
function startEffectDepthKeyModeHandler(evt) {
  if ((evt.code === 'Enter') || (evt.code === 'Space')) {
    evt.preventDefault();
    effectSlider.classList.add(KEY_MODE_SLIDER_CLASS);

    checkedEffectType.removeEventListener('keydown', startEffectDepthKeyModeHandler);

    checkedEffectType.addEventListener('keydown', arrowKeyHandler);
  } else {
    return;
  }
}

// TODO функция перехватыват нажатия ArrowLeft ArrowRight и меняет глубину эффекта
function arrowKeyHandler(evt) {
  evt.preventDefault();
  if ((evt.code === 'ArrowLeft') || (evt.code === 'ArrowRight')) {
    if (evt.code === 'ArrowLeft') {
      currentSliderPinShift -= effectPixelStep;

    } else if (evt.code === 'ArrowRight') {
      currentSliderPinShift += effectPixelStep;

    }

    if (currentSliderPinShift <= 0) {
      currentSliderPinShift = 0;
    } else if (currentSliderPinShift >= sliderLinePixelWidth) {
      currentSliderPinShift = sliderLinePixelWidth;
    }

    setEffectDepth(currentSliderPinShift.toFixed(0));

  } else if ((evt.code === 'Enter') || (evt.code === 'Space')) {
    evt.preventDefault();
    stopEffectDepthKeyMode();
  } else {
    evt.preventDefault();
  }
}

// TODO функция выхода из режима управления глубиной эффекта стрелками
function stopEffectDepthKeyMode() {
  effectSlider.classList.remove(KEY_MODE_SLIDER_CLASS);
  checkedEffectType.addEventListener('keydown', startEffectDepthKeyModeHandler);
  checkedEffectType.removeEventListener('keydown', arrowKeyHandler);
}


// ======================================== // TODO блок слайдера

// TODO создает слайдер
function setEffectSlider() {
  // TODO обнуляем состояние картинки при смене эффекта
  imgPreview.removeAttribute('style');
  imgPreview.removeAttribute('class');

  if (effectSliderVisibility) {
    // TODO Для эффектов показываем слайдер
    effectSlider.classList.remove('hidden');
    // TODO сбрасывать масштабирование при смене эффекта?

  } else {
    // TODO для нулевого эффекта
    effectSlider.classList.add('hidden');
    setImgScale('reset');
    imgPreview.setAttribute('data-filter', EFFECT_TYPE_0_VALUE);
    return;
  }

  // TODO добавим к изображению класс, задающий эффект 100%
  imgPreview.classList.add(effectClass);

  var effectLevelLineSize = effectSliderLine.getBoundingClientRect();
  // TODO начальные и конечные координаты линии слайдера
  sliderPixelStartPoint = effectLevelLineSize.left;
  sliderPixelEndPoint = effectLevelLineSize.right;
  // TODO длина линии слайдера, в пределах которой перемещается pin
  sliderLinePixelWidth = effectLevelLineSize.width;

  // TODO диапазон значений эффекта
  var valueEffectRange = maxEffectValue - minEffectValue;

  // TODO  число шагов изменения эффекта, приходящихся на заданный диапазон
  var stepsNum = valueEffectRange / effectValueStep;

  // TODO пиксельный шаг, соответствующий шагу изменения эффекта
  effectPixelStep = sliderLinePixelWidth / stepsNum;

  // TODO Начальное значение фильтра, отличное от заданного в классе эффекта
  var startPixelValue = sliderLinePixelWidth * EFFECT_DEPTH_START_POINT;

  // TODO вызовем функцию для:
  // 1) пересчета пикселов в проценты для определения сдвига ползунка
  //  2) для расчета соответственного значения value
  setEffectDepth(startPixelValue);

  // TODO на линию задания глубины эффекта вешаем обработчик событий - effect-level__line
  // это дает возможность изменить глубину эффекта кликом на линию слайдера
  effectSliderLine.addEventListener('click', effectSliderLineClickHandler);
}

function effectSliderLineClickHandler(evt) {
  var currentPixelPinPosition = evt.clientX;

  if (currentPixelPinPosition <= sliderPixelStartPoint) {
    currentPixelPinPosition = sliderPixelStartPoint;
  } else if (currentPixelPinPosition >= sliderPixelEndPoint) {
    currentPixelPinPosition = sliderPixelEndPoint;
  }
  setEffectDepth(currentPixelPinPosition - sliderPixelStartPoint);
}

// TODO функция отображает положение effectSliderLevelPin и линии глубины эффекта
function setEffectDepth(pixelPinShift) {
  var effectValueStepNumbers = Math.round(pixelPinShift / effectPixelStep);
  // TODO Определяем значение, которое будет соответствовать позиции Pin
  var effectLevelValue = minEffectValue + effectValueStepNumbers * effectValueStep;

  // TODO функция записи в value атрибут
  setEffectValueAttribute(effectLevelValue);
  // TODO функция установки позиции pin
  setLevelLinePinPosition(effectValueStepNumbers);
}

// TODO функция передает данные о положении ползунка в атрибут value (input - effectSliderValue)
function setEffectValueAttribute(value) {
  if (effectValueUnit === 'px') {
    value = value.toFixed(1);
  } else {
    value = value.toFixed(2);
  }
  // Передаем значение в input / атрибут value
  effectSliderValue.setAttribute('value', String(value));
  setImgEffectStyle(value);
}

// TODO функция записывает в атрибут style выбранный эффект с заданной глубиной
function setImgEffectStyle(value) {
  var styleString = 'filter: ' + setEffectFilter + '(' + String(value) + effectValueUnit + '); ';
  imgPreview.setAttribute('data-filter', styleString);
  imgPreview.setAttribute('style', styleString + imgPreview.getAttribute('data-transform'));
}

// TODO функция установки позиции pin c учетом заданного шага изменения глубины эффекта
function setLevelLinePinPosition(stepNumbers) {
  // TODO Из значения value получаем значение для позиции контрола - задается в %
  currentSliderPinShift = stepNumbers * effectPixelStep;
  var pinPercentPosition = ((currentSliderPinShift / sliderLinePixelWidth) * 100).toFixed(2);

  var pinPercentPositionString = (String(pinPercentPosition) + '%');

  effectSliderPin.setAttribute('style', 'left: ' + pinPercentPositionString + '; ');

  // TODO установим отображение глубины эффекта в виде закрашенной линии от позиции 0 до текущей позиции pin
  effectSliderLineDepth.setAttribute('style', 'width: ' + pinPercentPositionString + '; ');
}

// ======================================== // TODO Валидация полей формы
submitBtn.addEventListener('click', submitBtnClickHandler);

// Индикаторы валидности полей формы
var hashTagInputValidityCheck = true;
var textAreaFieldCheck = true;

function submitBtnClickHandler(evt) {
  evt.preventDefault();

  var outputObject = {
    imgSrc: '',
    imgStyle: '',
    hashTags: '',
    comment: ''
  };
  // TODO проверка валидации полей формы
  var validityCheck = hashTagInputValidityCheck && textAreaFieldCheck;

  if (validityCheck !== true) {
    return;
  }
  getFormOutputObject(outputObject);

}

// TODO функция формирования объекта для отправки на сервер
function getFormOutputObject(outputObject) {
  // TODO собираем поля value для формирования посылки на сервер
  outputObject.imageSrc = imgPreview.getAttribute('src');
  outputObject.imgStyle = imgPreview.getAttribute('style');
  outputObject.hashTag = trimHashTagValue(hashTagInput.value);
  outputObject.comment = textAreaField.value;
}

function hashTagChangeHandler(evt) {
  evt.preventDefault();

  var hashTagValue = hashTagInput.value;
  // TODO если поле input пустое - выключить сообщение об ошибке и установить признак валидации true
  if (hashTagValue === '') {
    hashTagInputValidityCheck = true;
    hashTagAlarmOff();
    return;
  }
  var hashTags = trimHashTagValue(hashTagValue);
  hashTagAlarmOff();
  hashTagInputValidityCheck = hashTagArrayValidating(hashTags);
}

// TODO функция формирует массив из hash-tag строки
function trimHashTagValue(inputString) {
  // TODO предварительно удаляем двойные пробелы и пробелы в начале и конце строки
  var spaceRegExp = /\s+/g;
  inputString = inputString.replace(spaceRegExp, ' ').trim();
  return inputString.split(' ');
}
// TODO функция вызывает модули валидации поля hash-tag по различным признакам и сводит ошибки для вывода сообщений
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

// TODO включает сообщение об ошибке в поле hash-tag
function hashTagAlarmOn(errorMessages) {
  hashTagInput.classList.add('error-input');
  hashTagErrorMessageField.classList.remove('visually-hidden');

  errorMessages.forEach(function (elem) {
    var newString = elem + '<br>';
    hashTagErrorMessageField.insertAdjacentHTML('beforeend', newString);
  });
}

// TODO ВЫключает сообщение об ошибке в поле hash-tag
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

// TODO валидация поля комментариев
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

// TODO включает предупреждение о приближении к разрешенному пределу длины коммента
function textAreaWarningOn(counter, maxNum) {
  textAreaErrorMessage.classList.remove('visually-hidden');
  textAreaField.classList.add('error-warning');
  textAreaErrorMessage.textContent = 'Вами уже напечатано символов ' + counter + '. Всего можно будет ввести ' + maxNum + '.';
}
// TODO ВЫключает предупреждение о приближении к разрешенному пределу длины коммента
function textAreaWarningOff() {
  textAreaField.classList.remove('error-warning');
}

// TODO включает сообщение об ошибке в поле комментариев
function textAreaAlarmOn(counter, maxNum) {
  textAreaField.classList.add('error-input');
  textAreaErrorMessage.textContent = 'Количество введенных символов превышает максимум на ' + (counter - maxNum) + ' !';
}
// TODO ВЫключает сообщение об ошибке в поле комментариев
function textAreaAlarmOff() {
  textAreaErrorMessage.classList.add('visually-hidden');
  textAreaField.classList.remove('error-input');
  textAreaErrorMessage.textContent = '';
}

// ======================================== // TODO функция закрытия окна предпросмотра и редактирования
function previewEditorCloseHandler(evt) {
  if (((evt.type) === 'click') || ((evt.code) === 'Escape')) {
    // Очищаем поля формы редактирования
    imgPreview.removeAttribute('style');
    imgPreview.removeAttribute('class');

    hashTagInput.removeAttribute('value');
    textAreaField.removeAttribute('value');

    body.classList.remove('modal-open');

    // TODO убираем обработчики событий
    document.removeEventListener('keydown', previewEditorCloseHandler);
    previewEditorCancelBtn.removeEventListener('click', previewEditorCloseHandler);
    effectsPointerBlock.removeEventListener('click', imgEffectClickHandler);

    effectSliderLine.removeEventListener('click', effectSliderLineClickHandler);
    imgScaleBlock.removeEventListener('click', imgScaleClickHandler);

    // TODO Проверяем, что был установлен обработчик режима клавиатуры для установки глубины эффекта
    if (imgPreview.getAttribute('data-filter') !== '') {
      checkedEffectType.removeEventListener('keydown', startEffectDepthKeyModeHandler);
    }

    previewEditor.classList.add('hidden');
    effectSlider.classList.add('hidden');

    checkedEffectType.checked = false;

    dismissPreventingEcapeOnInput();
    resetPreviewEditorTabindex();

    hashTagInput.removeEventListener('change', hashTagChangeHandler);
    textAreaField.removeEventListener('input', textAreaChangeHandler);

    hashTagAlarmOff();
    textAreaAlarmOff();
    textAreaWarningOff();
    hashTagInput.value = '';
    textAreaField.value = '';

  }
}
