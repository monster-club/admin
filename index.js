let _ = require('lodash');


let numbers = [1,2,3,4,5,6,7,8,9,10];
let filtered = _.filter(numbers, (n) => n % 2 === 0);
console.log(filtered);