import { scaleImage, hideEffects } from './edit-picture.js';

const FILE_TYPES = ['jpg', 'png', 'jpeg'];
const UPLOAD_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const uploadButtonElement = document.querySelector('.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const successTemplateElement = document.querySelector('#success');
const errorTemplateElement = document.querySelector('#error');

const formElement = document.querySelector('.img-upload__form');
formElement.setAttribute('method', 'POST');
formElement.setAttribute('enctype', 'multipart/form-data');
formElement.setAttribute('action', UPLOAD_URL);
const picturePreviewElement = formElement.querySelector('.img-upload__preview').childNodes[1];

const uploadFormCloseElement = document.querySelector('.img-upload__cancel');
const hashTagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateDescription = (comment) => comment.length >= 0 && comment.length <= 140;

const formatHashtagString = (input) => {
  const hashTagsArray = input.toLowerCase().split(' ');
  const tags = hashTagsArray.filter((tag) => tag.length > 0);
  return tags;
};

const validateHashTagLength = (input) => formatHashtagString(input).length <= 5;
const validateHashTagFormat = (input) => {
  let valid = true;
  const hashTagRegex = /^#[a-zа-я0-9]{1,19}$/;
  formatHashtagString(input).forEach((tag) => {
    if (!hashTagRegex.test(tag)) {
      valid = false;
    }
  });
  return valid;
};
const validateHashTagUnique = (input) => {
  let valid = true;
  const usedTags = new Set();
  formatHashtagString(input).forEach((tag) => {
    if (usedTags.has(tag)) {
      valid = false;
    }else{
      usedTags.add(tag);
    }
  });
  return valid;
};

pristine.addValidator(hashTagInputElement,validateHashTagUnique,'Теги не должны повторяться',1, true);
pristine.addValidator(hashTagInputElement,validateHashTagLength,'Не больше 5 тегов',3, true);
pristine.addValidator(hashTagInputElement,validateHashTagFormat,'Неправильный формат тега',2,true);
pristine.addValidator(descriptionInputElement,validateDescription, 'Длина комментария не больше 140 символов.');

const uploadFormOpen = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const uploadFormClose = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButtonElement.value = '';
  scaleImage('default');
  hideEffects();
  formElement.reset();
};


const addTemplates = (template) => {
  const modalElement = template.content.cloneNode(true);
  const sectionElement = modalElement.querySelector('section');
  const buttonElement = modalElement.querySelector('button');

  const onModalClose = (evt) => {
    if (evt.target === sectionElement || evt.key === 'Escape' || evt.target === buttonElement) {
      sectionElement.remove();
      sectionElement.removeEventListener('click', onModalClose);
      buttonElement.removeEventListener('click', onModalClose);
    }
  };

  buttonElement.addEventListener('click', onModalClose);
  sectionElement.addEventListener('click', onModalClose);

  document.body.appendChild(modalElement);
};

const uploadForm = () =>{
  const submitButtonElement = document.querySelector('.img-upload__submit');
  submitButtonElement.disabled = true;
  const formData = new FormData(formElement);
  fetch(UPLOAD_URL,{
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        pristine.reset();
        uploadFormClose();
        addTemplates(successTemplateElement);
      } else {
        addTemplates(errorTemplateElement);
      }
    })
    .finally(() => {
      submitButtonElement.disabled = false;
    });
};


uploadButtonElement.addEventListener('change', () => {
  const file = uploadButtonElement.files[0];
  const effectsPreviewElement = document.querySelectorAll('.effects__preview');
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it)=> fileName.endsWith(it));

  if (matches) {
    picturePreviewElement.src = URL.createObjectURL(file);
    effectsPreviewElement.forEach((effect) => {
      effect.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    uploadFormOpen();
  }

});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== hashTagInputElement && document.activeElement !== descriptionInputElement){
    if (document.querySelector('.error') !== null) {
      document.querySelector('.error').remove();
    } else if (document.querySelector('.success') !== null) {
      document.querySelector('.success').remove();
    } else {
      uploadFormClose();
    }
  }
});

uploadFormCloseElement.addEventListener('click', () =>{
  pristine.reset();
  uploadFormClose();
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadForm();
  }
});

