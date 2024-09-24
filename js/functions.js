function lengthCheck (string, len) {
  if (string.length <= len){
    return true;
  }
  return false;
}

function palidromeCheck (string){
  string = string.replaceAll(' ','').toLowerCase();
  return string === string.split('').reverse().join('');
}

function findDigit (string) {
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))){
      result += string[i];
    }
  }
  return result;
}
