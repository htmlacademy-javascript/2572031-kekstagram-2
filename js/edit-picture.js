import { effects } from './constants.js';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const form = document.querySelector('.img-upload__form');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const picturePreviewContainer = form.querySelector('.img-upload__preview');
const picturePreview = picturePreviewContainer.childNodes[1];
const effectValue = form.querySelector('.effect-level__value');
const effectLevel = form.querySelector('.img-upload__effect-level');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectButtons = document.querySelectorAll('.effects__radio');
let currentEffect = '';

const scaleImage = function(scaleFactor) {
  const currentScale = parseInt(scaleValue.value, 10);

  if (scaleFactor === 'default') {
    scaleValue.value = DEFAULT_SCALE;
    picturePreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  }
  if (scaleFactor === 'bigger' && currentScale >= MIN_SCALE && currentScale < MAX_SCALE){
    scaleValue.value = currentScale + SCALE_STEP;
    picturePreview.style.transform = `scale(${scaleValue.value / 100})`;
  }
  if (scaleFactor === 'smaller' && currentScale > MIN_SCALE && currentScale <= MAX_SCALE){
    scaleValue.value = currentScale - SCALE_STEP;
    picturePreview.style.transform = `scale(${scaleValue.value / 100})`;
  }
};

const hideEffects = function (){
  effectLevelSlider.style.visibility = 'hidden';
  effectLevel.style.visibility = 'hidden';
  picturePreview.style.filter = '';
};

const showEffects = function (){
  effectLevelSlider.style.visibility = 'visible';
  effectLevel.style.visibility = 'visible';
};

noUiSlider.create(effectLevelSlider,{
  range:{
    'min': 0,
    'max': 1
  },
  step: 0.1,
  start: 0,
  connect: true,
  behaviour: 'tap-drag',
});

hideEffects();
effectButtons.forEach((target) => {
  target.addEventListener('change', (evt) => {
    const type = evt.target.value;
    if (type === 'none') {
      hideEffects();
    } else {
      showEffects();
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: effects[type].min,
          max: effects[type].max,
        },
        step: effects[type].step,
        start: effects[type].min,
      });
      currentEffect = effects[type];
    }
  });
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectValue.value = effectLevelSlider.noUiSlider.get();
  picturePreview.style.filter = `${currentEffect.name}(${effectValue.value}${currentEffect.units})`;
});

scaleSmallerButton.addEventListener('click', () => scaleImage('smaller'));

scaleBiggerButton.addEventListener('click', () => scaleImage('bigger'));

export {scaleImage, hideEffects};
