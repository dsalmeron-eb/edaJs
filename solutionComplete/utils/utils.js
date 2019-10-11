// https://www.codewars.com/kata/list-filtering/javascript
// In this kata you will create a function that takes
// a list of non-negative integers and strings and returns a new list with the strings filtered out.
const listFiltering = (list) => {
  return list.filter((el) => typeof el == 'number');
}

const expandedForm = (num) => {
  return num
    .toString()
    .split("")
    .reverse()
    .map((n, i) => n * 10**i)
    .filter(n => n)
    .reverse()
    .join(" + ");
}

module.exports = {
  expandedForm,
  listFiltering
}