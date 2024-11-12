import { applyFilter } from "./filter.js";
import { renderBigPicture } from "./render-big-picture.js";
const loadPhotos = function(){
    fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
     .then(response => response.json())
     .then((data)=>{
         if (data){
            applyFilter(data);
            renderBigPicture(data);
         }
     })
     .catch(() => {
      const modal = document.querySelector('#data-error').content.cloneNode(true);
      const section = modal.querySelector('section');
      document.body.appendChild(modal);
      setTimeout(() => {
        section.remove();
      }, 5000);
     })
};

export {loadPhotos}