const uploadButton = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imagePreview = document.querySelector('.img-upload__preview');
function form(){

const form = document.querySelector('.img-upload__form');
form.setAttribute('method', 'POST');
form.setAttribute('enctype', 'multipart/form-data');
form.setAttribute('action', 'https://31.javascript.htmlacademy.pro/kekstagram');

uploadButton.addEventListener('change', function() {
    const file = this.files[0]
    console.log(file);
    console.log(form);
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    

});

const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(form.querySelector('.text__hashtags'));
pristine.addValidator(form.querySelector('.text__description'));


form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    pristine.validate();
    
    if (isValid) {
        console.log('Можно отправлять');
    } else {
        console.log('Форма невалидна');
    }
});

}




export {form}

