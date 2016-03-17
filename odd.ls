_ = require \lodash

class Odd
  filter: (list) -> _.filter list, (l) -> l % 2 != 0
  
module.exports = Odd