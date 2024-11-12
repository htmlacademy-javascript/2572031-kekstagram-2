import { scaleImage, hideEffects } from './edit-picture.js';
const uploadButton = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const form = document.querySelector('.img-upload__form');
form.setAttribute('method', 'POST');
form.setAttribute('enctype', 'multipart/form-data');
form.setAttribute('action', 'https://31.javascript.htmlacademy.pro/kekstagram');

const uploadFormCloseButton = document.querySelector('.img-upload__cancel');
const hashTagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const uploadFormOpen = function () {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const uploadFormClose = function () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButton.value = '';
  scaleImage('default');
  hideEffects();
  form.reset();
};

const validateHashTag = function(input){
  const hashTagsArray = input.toLowerCase().split(' ');
  const hashTagRegex = /^#[a-zа-я0-9]{1,19}$/;
  const usedTags = new Set();
  let valid = true;

  const tags = hashTagsArray.filter((tag) => tag.length > 0);

  if (tags.length > 5) {
    valid = false;
  } else {
    tags.forEach((tag) => {
      if (!hashTagRegex.test(tag)) {
        valid = false;
      } else if (usedTags.has(tag)) {
        valid = false;
      } else {
        usedTags.add(tag);
      }
    });
  }
  return valid;
};

const validateDescription = function(comment){
  return comment.length >= 0 && comment.length <= 140;
};

pristine.addValidator(hashTagInput,validateHashTag,'Недопустимый хэштег');
pristine.addValidator(descriptionInput,validateDescription, 'Недопустимый комментарий');


uploadButton.addEventListener('change', () => {
  uploadFormOpen();
});

uploadFormCloseButton.addEventListener('click', () =>{
  pristine.reset();
  uploadFormClose();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== hashTagInput && document.activeElement !== descriptionInput){
    uploadFormClose();
  }
});

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
