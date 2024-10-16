const pictureTemplate = document.querySelector('#picture').content;


function makePicture(arr){
  const picture = pictureTemplate.querySelector('.picture').cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = arr.url;
  img.alt = arr.decription;
  const likes = picture.querySelector('.picture__likes');
  likes.textContent = arr.likes;
  const comments = picture.querySelector('.picture__comments');
  comments.textContent = arr.comments.length;
  return picture;
}

function renderPictures(arr){
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  arr.forEach((obj) => fragment.appendChild(makePicture(obj)));
  picturesContainer.appendChild(fragment);
}

export {renderPictures};
