import { EFFECTS } from './constants.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const formElement = document.querySelector('.img-upload__form');
const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const picturePreviewContainerElement = formElement.querySelector('.img-upload__preview');
const picturePreviewElement = picturePreviewContainerElement.childNodes[1];
const effectValueElement = formElement.querySelector('.effect-level__value');
const effectLevelElement = formElement.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = formElement.querySelector('.effect-level__slider');
const effectButtonElements = document.querySelectorAll('.effects__radio');
let currentEffect = '';

const scaleImage = (scaleFactor) => {
  const currentScale = parseInt(scaleValueElement.value, 10);

  if (scaleFactor === 'default') {
    scaleValueElement.value = DEFAULT_SCALE;
    picturePreviewElement.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  }
  if (scaleFactor === 'bigger' && currentScale >= MIN_SCALE && currentScale < MAX_SCALE){
    scaleValueElement.value = currentScale + SCALE_STEP;
    picturePreviewElement.style.transform = `scale(${scaleValueElement.value / 100})`;
  }
  if (scaleFactor === 'smaller' && currentScale > MIN_SCALE && currentScale <= MAX_SCALE){
    scaleValueElement.value = currentScale - SCALE_STEP;
    picturePreviewElement.style.transform = `scale(${scaleValueElement.value / 100})`;
  }
};

const hideEffects = () => {
  effectLevelSliderElement.style.visibility = 'hidden';
  effectLevelElement.style.visibility = 'hidden';
  picturePreviewElement.style.filter = '';
};

const showEffects = () => {
  effectLevelSliderElement.style.visibility = 'visible';
  effectLevelElement.style.visibility = 'visible';
};

noUiSlider.create(effectLevelSliderElement,{
  range:{
    'min': 0,
    'max': 1
  },
  step: 0.1,
  start: 0,
  connect : 'lower',
  behaviour: 'tap-drag',
});

hideEffects();
effectButtonElements.forEach((target) => {
  target.addEventListener('change', (evt) => {
    const type = evt.target.value;
    if (type === 'none') {
      hideEffects();
    } else {
      showEffects();
      currentEffect = EFFECTS[type];
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: EFFECTS[type].min,
          max: EFFECTS[type].max,
        },
        step: EFFECTS[type].step,
        start: EFFECTS[type].max,
      });

    }
  });
});

effectLevelSliderElement.noUiSlider.on('update', () => {
  effectValueElement.value = effectLevelSliderElement.noUiSlider.get();
  picturePreviewElement.style.filter = `${currentEffect.name}(${effectValueElement.value}${currentEffect.units})`;
});

scaleSmallerElement.addEventListener('click', () => scaleImage('smaller'));

scaleBiggerElement.addEventListener('click', () => scaleImage('bigger'));

export {scaleImage, hideEffects};
