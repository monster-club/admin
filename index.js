var $ = require('jquery');
var _ = require('lodash');
var Even = require('./test.coffee');
var Odd = require('./odd.ls');

$(document).ready(function() {
  $('#heading').text('Hi There');
  let nums = [1,2,3,4,5,6,7,8,9,10];
  console.log('back to normal');
  let e = new Even([1,2,3]);
  let o = new Odd();
  console.log(e.filter());
  console.log(o.filter([1,2,3,4,5,6,7]));
 
  let filteredNums = _.filter(nums, (n) => n % 2 === 0);
  console.log(filteredNums);
  let list = $('#list');
  _.each(filteredNums, (n) => list.append('<p>' + n + '</p>'));
});