import { findImage } from './utils.js';

const container = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').children[0];
const likesCount = document.querySelector('.likes-count');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTotalCount = document.querySelector('.social__comment-total-count');


function renderComments(comments){

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    commentElement.appendChild(socialPicture);


    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    commentElement.appendChild(socialText);


    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialPicture.width = '35';
    socialPicture.height = '35';

    socialText.textContent = comment.message;
    fragment.appendChild(commentElement);
  });

  return fragment;
}
function renderBigPicture(photosArray){
  container.addEventListener('click',(evt) =>{
    if(evt.target.classList.value === 'picture__img'){
      const imgUrl = evt.target.getAttribute('src');
      const imageObject = findImage(photosArray, imgUrl);
      const commentsContainer = document.querySelector('.social__comments');

      bigPictureImg.src = imgUrl;
      likesCount.textContent = imageObject.likes;
      commentTotalCount.textContent = imageObject.comments.length;


      commentsContainer.innerHTML = '';
      commentsContainer.appendChild(renderComments(imageObject.comments));

      document.querySelector('.social__comment-count').classList.add('hidden');
      document.querySelector('.comments-loader').classList.add('hidden');


      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  });

  cancelButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });


}

export {renderBigPicture};
