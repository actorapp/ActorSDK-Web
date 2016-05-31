'use strict';

exports.__esModule = true;
exports.search = search;

var _lodash = require('lodash');

function queryToRegExp(query) {
  var pattern = '^' + (0, _lodash.escapeRegExp)(query.trim()).replace(/\s+/g, '.*\\s+');

  return new RegExp(pattern, 'i');
} /*
   * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
   */

function search(query, items, getValues) {
  if (!query) {
    return [];
  }

  var pattern = queryToRegExp(query);
  return items.filter(function (item) {
    var values = getValues(item);
    return values.some(function (value) {
      return pattern.test(value);
    });
  });
}
//# sourceMappingURL=SearchUtils.js.map