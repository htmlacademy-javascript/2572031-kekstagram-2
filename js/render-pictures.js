const pictureTemplateElement = document.querySelector('#picture').content;

const makePicture = (object) => {
  const pictureElement = pictureTemplateElement.querySelector('.picture').cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');
  imageElement.src = object.url;
  imageElement.alt = object.decription;
  const likesAmountElement = pictureElement.querySelector('.picture__likes');
  likesAmountElement.textContent = object.likes;
  const commentsAmountElement = pictureElement.querySelector('.picture__comments');
  commentsAmountElement.textContent = object.comments.length;
  return pictureElement;
};

const renderPictures = (pictures) => {
  const pictureElement = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  document.querySelectorAll('.picture').forEach((element) => element.remove());

  pictures.forEach((picture) => fragment.appendChild(makePicture(picture)));
  pictureElement.appendChild(fragment);
};

export {renderPictures};
