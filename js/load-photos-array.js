import { applyFilter } from "./filter.js";
import { renderBigPicture } from "./render-big-picture.js";
const loadPhotos = function(){
    fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
     .then(response => response.json())
     .then((data)=>{
        applyFilter(data);
        renderBigPicture(data);
     })
     .catch(err => console.error('Error:', err))
};

export {loadPhotos}