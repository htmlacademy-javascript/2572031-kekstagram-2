function lengthCheck (string, len) {
  if (string.length <= len){
    return true;
  }
  return false;
}

lengthCheck('проверяемая строка', 20);
lengthCheck('проверяемая строка', 18);
lengthCheck('проверяемая строка', 10);


function palidromeCheck (string){
  string = string.replaceAll(' ','').toLowerCase();
  return string === string.split('').reverse().join('');
}

palidromeCheck ('топот');
palidromeCheck ('ДовОд');
palidromeCheck ('Кекс');
palidromeCheck ('Лёша на полке клопа нашёл ');

function findDigit (string) {
  string += '';
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))){
      result += string[i];
    }
  }
  return +result;
}

findDigit ('2023 год');
findDigit ('ECMAScript 2022');
findDigit ('1 кефир, 0.5 батона');
findDigit ('агент 007');
findDigit ('а я томат');
findDigit (2023);
findDigit (-1);
findDigit (1.5);
