/* eslint-disable no-console, no-console*/
/* eslint-disable no-alert, no-console*/
'use strict';

var CUSTOMER_COLLECTION_SIZE = 25;

var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;

var AVATAR_LIST_SIZE = 6;
var COMMENT_LIST_SIZE = 3;

var userPhotoCaptions = [
  'Я не верю в будущее, я верю в сегодня',
  'Моя жизнь – мои правила',
  'Я не везунчик, я просто талантливый',
  'Я построил замок из тех камней, которые в меня бросали',
  'Просто живу так, как считаю нужным',
  'Мы всегда остаемся неразгаданными',
  'Рождена, чтобы блистать',
  'Работать. Копить. Путешествовать. Повторить.',
  'Время приключений!',
  'Ни на что не променял бы это место',
  'Открываю для себя мир. Скоро вернусь',
  'Можно вычеркнуть эту страну из списка',
  'Свободный разум, свободная жизнь',
  'Позвольте жизни вас удивить',
  'Говорю “да” новым приключениям',
  'Так благодарен за все',
  'Путешествие – всегда лучшая часть',
  'Не сожалей о том, чего не сделал. Просто пойди и сделай!',
  'Всегда прислушивайся к своему сердцу',
  'Будь благодарен. Ни о чем не жалей.',
  'Все только начинает становиться действительно хорошим.',
  'Утром, только одна хорошая мысль меняет смысл целого дня.',
  'Это просто моя жизнь в моем неповторимом стиле.',
  'Не заботьтесь ни о чем, больше улыбайтесь.',
  'Лучшее еще впереди.',
  'Жизнь похожа на фотографию. Мы развиваемся только из негативов.',
  'Это моя жизнь, и мне так повезло ее жить.',
  'Историю составляют только люди, нарушающие правила.',
  'Когда ты найдешь себя, жизнь меняется.'
];
var userNames = [
  'Александра',
  'Алина',
  'Алла',
  'Анастасия',
  'Анжела',
  'Анна',
  'Антонина',
  'Валентина',
  'Валерия',
  'Вероника',
  'Виктория',
  'Галина',
  'Дарья',
  'Евгения',
  'Екатерина',
  'Елена',
  'Елизавета',
  'Карина',
  'Кира',
  'Клавдия',
  'Кристина',
  'Ксения',
  'Лидия',
  'Любовь',
  'Людмила',
  'Маргарита',
  'Марина',
  'Мария',
  'Надежда',
  'Наталья',
  'Нина',
  'Оксана',
  'Олеся',
  'Ольга',
  'Полина',
  'Светлана',
  'Таисия',
  'Тамара',
  'Татьяна',
  'Эвелина',
  'Эльвира',
  'Юлиана',
  'Юлия',
  'Яна',
  'Александр',
  'Алексей',
  'Анатолий',
  'Андрей',
  'Антон',
  'Аркадий',
  'Артем',
  'Борислав',
  'Вадим',
  'Валентин',
  'Валерий',
  'Василий',
  'Виктор',
  'Виталий',
  'Владимир',
  'Вячеслав',
  'Геннадий',
  'Георгий',
  'Григорий',
  'Даниил',
  'Денис',
  'Дмитрий',
  'Евгений',
  'Егор',
  'Иван',
  'Игорь',
  'Илья',
  'Кирилл',
  'Лев',
  'Максим',
  'Михаил',
  'Никита',
  'Николай',
  'Олег',
  'Семен',
  'Сергей',
  'Станислав',
  'Степан',
  'Федор',
  'Юрий'
];
var userMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Твоё фото изначально можно назвать профессиональным – безупречность во всём, созданная только тобой!',
  'Этому фото от меня ни куда не деться, я поставлю его в рамочку в виде сердца!',
  'Твоё фото как магнит, тянет и тянет, и не смысла и сил для сопротивления!',
  'Идеальное фото! (Но это не точно).',
  'Фото могло бы получиться получше. Но камера должна быть не в ваших руках. Здесь ничего не исправить',
  'Талантливый человек талантлив во всем. Фото на выставку!',
  'Нравицца! Аффтар давай ищо.',
  'Ну такое себе...',
  'Ничего так. Мило. Но видели и получше.',
  'Прррелестно! Пррросто прррелестно! Шедеврально!',
  'Фото - огонь!',
  'Как это развидеть?!',
  'Лица стерты, краски тусклы...',
];

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
  // return 'photos/{{' + (num + 1) + '}}.jpg';
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
  // return 'img/avatar-{{' + getRandomIntNumber(1, maxNum) + '}}.svg';
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

var userPictureTemplate = document.querySelector('#picture').content.querySelector('a');

var targetSectionForIntegration = document.querySelector('.pictures');

function getUserPictureBlocks(template, objectArray) {
  var userPicturesFragment = document.createDocumentFragment();

  objectArray.forEach(function (element) {
    var templateClone = template.cloneNode(true);
    setUserPictureAttributes(templateClone, element);
    userPicturesFragment.appendChild(templateClone);
  });
  return userPicturesFragment;
}


targetSectionForIntegration.appendChild(getUserPictureBlocks(userPictureTemplate, customerPhotoCollection));
