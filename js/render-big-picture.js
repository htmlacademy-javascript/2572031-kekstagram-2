import { findImage } from './utils.js';
import { socialPictureHeight, socialPictureWidth } from './constants.js';

const container = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').children[0];
const likesCount = document.querySelector('.likes-count');
const description = document.querySelector('.social__caption');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const commentShownCount = document.querySelector('.social__comment-shown-count');
const commentsLoader = document.querySelector('.social__comments-loader');

const generateComment = function(comment){
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  commentElement.appendChild(socialPicture);

  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = comment.message;
  commentElement.appendChild(socialText);

  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialPicture.width = socialPictureWidth;
  socialPicture.height = socialPictureHeight;

  return commentElement;
};

const addComments = function(comments){
  let commentsCounter = 0;

  return function () {
    commentsCounter += 5;
    const commentsArray = comments.slice(0,commentsCounter);
    const fragment = document.createDocumentFragment();
    commentsArray.forEach((comment) => {
      fragment.appendChild(generateComment(comment));
    });
    return fragment;
  };
};


const renderBigPicture = function(photosArray){
  container.addEventListener('click',(evt) =>{
    if(evt.target.classList.value === 'picture__img'){
      const imgUrl = evt.target.getAttribute('src');
      const imageObject = findImage(photosArray, imgUrl);
      description.textContent = imageObject.description
      const commentsContainer = document.querySelector('.social__comments');
      const addCommentsFragment = addComments(imageObject.comments);

      const renderComments = function() {
        commentsContainer.innerHTML = '';
        commentsContainer.appendChild(addCommentsFragment());
        commentShownCount.textContent = commentsContainer.children.length;
      };

      const hideLoadCommentsBtn = function(){
        if(+commentShownCount.textContent >= +commentTotalCount.textContent){
          commentsLoader.classList.add('hidden');
        }
      };

      const loadComments = function(){
        renderComments();
        hideLoadCommentsBtn();
      };

      const closeModal = function(){
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');
        commentsLoader.classList.remove('hidden');
        commentsLoader.removeEventListener('click', loadComments);
        commentShownCount.textContent = 0;
      };

      bigPictureImg.src = imgUrl;
      likesCount.textContent = imageObject.likes;
      commentTotalCount.textContent = imageObject.comments.length;
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');

      commentsLoader.addEventListener('click', loadComments);
      cancelButton.addEventListener('click',closeModal);
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeModal();
        }
      });
      renderComments();
      hideLoadCommentsBtn();
    }
  });
};

export {renderBigPicture};
