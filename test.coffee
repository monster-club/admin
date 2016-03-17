_ = require 'lodash'

class Even
  constructor: (@list) ->
  filter: -> _.filter @list, (l) -> l % 2 == 0

module.exports = Even