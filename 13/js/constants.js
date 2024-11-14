const SOCIAL_PICTURE_WIDTH = 35;
const SOCIAL_PICTURE_HEIGHT = 35;
const EFFECTS = {
  'chrome':{
    'name': 'grayscale',
    'units': '',
    'min': 0,
    'max': 1,
    'step': 0.1,
  },
  'sepia':{
    'name': 'sepia',
    'units': '',
    'min': 0,
    'max': 1,
    'step': 0.1,
  },
  'marvin':{
    'name': 'invert',
    'units': '%',
    'min': 0,
    'max': 100,
    'step': 1,
  },
  'phobos':{
    'name': 'blur',
    'units':'px',
    'min': 0,
    'max': 3,
    'step': 0.1,
  },
  'heat':{
    'name': 'brightness',
    'units':'',
    'min': 1,
    'max': 3,
    'step': 0.1,
  },
};

export {SOCIAL_PICTURE_WIDTH, SOCIAL_PICTURE_HEIGHT, EFFECTS};
