const imgFilters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button')
console.log(filterButtons)
const loadPhotos = function(...arr){
    fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
     .then(response => response.json())
     .then(data => arr.forEach( (func) => func(data) ))
     .then(()=>{
        imgFilters.classList.remove('img-filters--inactive');
     })
     .catch(err => console.error('Error:', err))
};

export {loadPhotos}