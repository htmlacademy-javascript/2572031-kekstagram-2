import {getRandomInteger,getRandomItem} from './utils.js';
import {messages, firstNames, lastNames, photoDescriptions} from './constants.js';

let commentIdCounter = 1;
let photoIdCounter = 0;

function getMessage (textArray) {
  let result = String();

  for (let i = 0; i < getRandomInteger(1,2); i++) {
    result += `${getRandomItem(textArray).trim()}`;
  }
  return result;
}

function getFullName () {
  return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
}

function getPhotoDescription () {
  return getRandomItem(photoDescriptions);
}

function generateComment () {
  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: getMessage(messages),
    name: getFullName()
  };
}

function generatePhoto () {
  return {
    id: ++photoIdCounter,
    url: `photos/${photoIdCounter}.jpg`,
    decription: getPhotoDescription(),
    likes: getRandomInteger(15,200),
    comments: Array.from({length: getRandomInteger(0,15)}, generateComment)
  };
}

function generatePhotosArray (len) {
  return Array.from({length: len}, generatePhoto);
}

export {generatePhotosArray};
