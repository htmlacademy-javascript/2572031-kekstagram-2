const pictureTemplate = document.querySelector('#picture').content;

const imgFilters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button')
filterButtons.forEach((button) => {
   
   button.addEventListener('click', () => {
      let currentFilter = filtersForm.querySelector('.img-filters__button--active');
      currentFilter.classList.remove('img-filters__button--active');
      button.classList.add('img-filters__button--active');
   })
})

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

  arr.forEach((obj) => fragment.appendChild(makePicture(obj)));
  picturesContainer.appendChild(fragment);
}

export {renderPictures};
