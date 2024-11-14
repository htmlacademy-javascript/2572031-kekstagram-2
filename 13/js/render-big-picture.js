import { findImage } from './utils.js';
import { SOCIAL_PICTURE_HEIGHT, SOCIAL_PICTURE_WIDTH } from './constants.js';

const picturesContainerElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = document.querySelector('.big-picture__img').children[0];
const likesCountElement = document.querySelector('.likes-count');
const descriptionElement = document.querySelector('.social__caption');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const commentTotalCountElement = document.querySelector('.social__comment-total-count');
const commentShownCountElement = document.querySelector('.social__comment-shown-count');
const commentsLoaderElement = document.querySelector('.social__comments-loader');

const generateComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const socialPictureElement = document.createElement('img');
  socialPictureElement.classList.add('social__picture');
  commentElement.appendChild(socialPictureElement);

  const socialTextElement = document.createElement('p');
  socialTextElement.classList.add('social__text');
  socialTextElement.textContent = comment.message;
  commentElement.appendChild(socialTextElement);

  socialPictureElement.src = comment.avatar;
  socialPictureElement.alt = comment.name;
  socialPictureElement.width = SOCIAL_PICTURE_WIDTH;
  socialPictureElement.height = SOCIAL_PICTURE_HEIGHT;

  return commentElement;
};

const addComments = (comments) => {
  let commentsCounter = 0;

  return function () {
    commentsCounter += 5;
    const commentsArray = comments.slice(0,commentsCounter);
    const fragmentElement = document.createDocumentFragment();
    commentsArray.forEach((comment) => {
      fragmentElement.appendChild(generateComment(comment));
    });
    return fragmentElement;
  };
};


const renderBigPicture = (photosArray) => {
  picturesContainerElement.addEventListener('click',(evt) => {
    if(evt.target.classList.value === 'picture__img'){
      const imgUrl = evt.target.getAttribute('src');
      const imageObject = findImage(photosArray, imgUrl);
      descriptionElement.textContent = imageObject.description;
      const commentsElement = document.querySelector('.social__comments');
      const addCommentsFragment = addComments(imageObject.comments);

      const renderComments = () => {
        commentsElement.innerHTML = '';
        commentsElement.appendChild(addCommentsFragment());
        commentShownCountElement.textContent = commentsElement.children.length;
      };

      const hideLoadCommentsBtn = () => {
        if(+commentShownCountElement.textContent >= +commentTotalCountElement.textContent){
          commentsLoaderElement.classList.add('hidden');
        }
      };

      const onImageClick = () => {
        renderComments();
        hideLoadCommentsBtn();
      };

      const onCancelButtonClick = () => {
        bigPictureElement.classList.add('hidden');
        document.body.classList.remove('modal-open');
        commentsLoaderElement.classList.remove('hidden');
        commentsLoaderElement.removeEventListener('click', onImageClick);
        commentShownCountElement.textContent = 0;
      };

      bigPictureImgElement.src = imgUrl;
      likesCountElement.textContent = imageObject.likes;
      commentTotalCountElement.textContent = imageObject.comments.length;
      bigPictureElement.classList.remove('hidden');
      document.body.classList.add('modal-open');

      commentsLoaderElement.addEventListener('click', onImageClick);
      cancelButtonElement.addEventListener('click',onCancelButtonClick);
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          onCancelButtonClick();
        }
      });
      renderComments();
      hideLoadCommentsBtn();
    }
  });
};

export {renderBigPicture};
