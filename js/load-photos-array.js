const loadPhotos = function(...arr){
    fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
     .then(response => response.json())
     .then(data => arr.forEach( (func) => func(data) ))
     .catch(err => console.error('Error:', err))
};

export {loadPhotos}