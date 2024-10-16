import {generatePhotosArray} from './generate-photos-array.js';
import {renderPictures} from './render-pictures.js';

const photosArray = generatePhotosArray(25);

renderPictures(photosArray);
