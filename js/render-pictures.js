const pictureTemplate = document.querySelector('#picture').content;

function makePicture(object){
  const picture = pictureTemplate.querySelector('.picture').cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = object.url;
  img.alt = object.decription;
  const likesAmount = picture.querySelector('.picture__likes');
  likesAmount.textContent = object.likes;
  const commentsAmount = picture.querySelector('.picture__comments');
  commentsAmount.textContent = object.comments.length;
  return picture;
}

function renderPictures(arr){
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  document.querySelectorAll('.picture').forEach((element) => element.remove());

  arr.forEach((obj) => fragment.appendChild(makePicture(obj)));
  picturesContainer.appendChild(fragment);
}

export {renderPictures};
