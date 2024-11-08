function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomItem (arr){
  return arr[getRandomInteger(0,arr.length - 1)];
}

function getDistinctIndex (arr) {
  const distinctIndices = new Set();
  while (distinctIndices.size < arr.length) {
    distinctIndices.add(getRandomInteger(0, arr.length - 1));
  }
  return Array.from(distinctIndices);
}

function findImage (arr, src) {
  return arr.find((item) => item.url === src);
}

export {getRandomInteger, getRandomItem, findImage, getDistinctIndex};
