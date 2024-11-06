import { renderPictures } from './render-pictures.js';
import { renderBigPicture } from './render-big-picture.js';
import './form.js';
import './edit-picture.js';
import { loadPhotos } from './load-photos-array.js';



loadPhotos(renderPictures,renderBigPicture);
