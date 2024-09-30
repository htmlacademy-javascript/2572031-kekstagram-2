const messageText = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';
const firstNames = ['Антон', 'Василий', 'Петр', 'Кирилл', 'Илья', 'Станислав', 'Максим'];
const lastNames = ['Иванов', 'Сидоров', 'Петров', 'Кузнецов', 'Семенов', 'Джаваскриптов'];
const photoDescriptions = ['Космические линии', 'Игра света и тени', 'Цветовые пятна', 'Энергия движения', 'Сложные узоры', 'Необычные формы', 'Гармония цвета', 'Размытые контуры', 'Природные текстуры', 'Загадочный силуэт'];
let commentIdCounter = 1;
let photoIdCounter = 1;

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getMessage (text) {
  let result = String();
  const formattedText = text.split(RegExp('[.!]'));

  for (let i = 0; i < getRandomInteger(1,2); i++) {
    result += `${formattedText[getRandomInteger(0, formattedText.length - 1)].trim()}.`;
  }
  return result;
}

function getFullName () {
  return `${firstNames[getRandomInteger(0, firstNames.length - 1)]} ${lastNames[getRandomInteger(0,lastNames.length - 1)]}`;
}

function getPhotoDescription () {
  return photoDescriptions[getRandomInteger(0, photoDescriptions.length - 1)];
}

function generateComment () {
  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: getMessage(messageText),
    name: getFullName()
  };
}

function generatePhoto () {
  return {
    id: photoIdCounter++,
    url: `photos/${getRandomInteger(1,25)}.jpg`,
    decription: getPhotoDescription(),
    likes: getRandomInteger(15,200),
    comments: Array.from({length: getRandomInteger(0,5)}, generateComment)
  };
}

const photosArray = Array.from({length: 25}, generatePhoto);


//console.log(photosArray);
