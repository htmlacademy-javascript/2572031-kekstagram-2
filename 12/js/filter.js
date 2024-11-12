import { renderPictures } from './render-pictures.js';
import { debounce } from './utils.js';

const imgFilters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

let activeButton = filtersForm.querySelector('.img-filters__button--active');

filterButtons.forEach((button) => {

  button.addEventListener('click', () => {
    activeButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
    activeButton = filtersForm.querySelector('.img-filters__button--active');

  });
});

const filterDefault = function (array) {
  return array;
};

const filterRandom = function (array) {
  return array.toSorted(() => Math.random() - 0.5).slice(0,10);
};

const filterDiscussed = function (array) {
  return array.toSorted((a, b) => b.comments.length - a.comments.length);
};

const debounceRender = debounce(renderPictures);

const applyFilter = function(data){
  imgFilters.classList.remove('img-filters--inactive');
  filterDefaultButton.addEventListener('click', () => {
    debounceRender(filterDefault(data));
  });
  filterRandomButton.addEventListener('click', () => {
    debounceRender(filterRandom(data));
  });
  filterDiscussedButton.addEventListener('click', () => {
    debounceRender(filterDiscussed(data));
  });

  debounceRender(filterDefault(data));
};

export {applyFilter};
