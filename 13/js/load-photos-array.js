import { applyFilter } from './filter.js';
import { renderBigPicture } from './render-big-picture.js';
const DATA_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const loadPhotos = () => {
  fetch(DATA_URL)
    .then((response) => response.json())
    .then((data)=>{
      if (data){
        applyFilter(data);
        renderBigPicture(data);
      }
    })
    .catch(() => {
      const modalElement = document.querySelector('#data-error').content.cloneNode(true);
      const sectionElement = modalElement.querySelector('section');
      document.body.appendChild(modalElement);
      setTimeout(() => {
        sectionElement.remove();
      }, 5000);
    });
};

export {loadPhotos};
