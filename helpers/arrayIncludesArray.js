// https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array
// checks if array includes all elemens of other array
// (to check if owned land includes all elements of selected land)
export const arrayIncludesArray = (arr, target) =>
  target.every((v) => arr.includes(v))
