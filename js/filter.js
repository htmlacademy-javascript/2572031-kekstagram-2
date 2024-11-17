import { renderPictures } from './render-pictures.js';
import { debounce } from './utils.js';

const imgFiltersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const filterButtonElements = filtersFormElement.querySelectorAll('.img-filters__button');

const filterDefaultButtonElement = document.querySelector('#filter-default');
const filterRandomButtonElement = document.querySelector('#filter-random');
const filterDiscussedButtonElement = document.querySelector('#filter-discussed');

let activeButton = filtersFormElement.querySelector('.img-filters__button--active');

filterButtonElements.forEach((button) => {

  button.addEventListener('click', () => {
    activeButton.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
    activeButton = filtersFormElement.querySelector('.img-filters__button--active');

  });
});

const filterDefault = (pictures) => pictures;

const filterRandom = (pictures) => pictures.toSorted(() => Math.random() - 0.5).slice(0,10);

const filterDiscussed = (pictures) => pictures.toSorted((a, b) => b.comments.length - a.comments.length);

const debounceRender = debounce(renderPictures);

const applyFilter = (data) => {
  imgFiltersElement.classList.remove('img-filters--inactive');
  filterDefaultButtonElement.addEventListener('click', () => {
    debounceRender(filterDefault(data));
  });
  filterRandomButtonElement.addEventListener('click', () => {
    debounceRender(filterRandom(data));
  });
  filterDiscussedButtonElement.addEventListener('click', () => {
    debounceRender(filterDiscussed(data));
  });

  debounceRender(filterDefault(data));
};

export {applyFilter};
