var $ = require('jquery');
var _ = require('lodash');

$(document).ready(function() {
  $('#heading').text('Hi There');
  let nums = [1,2,3,4,5,6,7,8,9,10];
  
  let filteredNums = _.filter(nums, (n) => n % 2 === 0);
  console.log(filteredNums);
  let list = $('#list');
  _.each(filteredNums, (n) => list.append('<p>' + n + '</p>'));
});

