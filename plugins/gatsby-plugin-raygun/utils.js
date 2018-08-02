'use strict';

exports.__esModule = true;
var tagsArrayToString = exports.tagsArrayToString = function tagsArrayToString(tags) {
  return '[' + tags.map(function (tag) {
    return '\'' + tag + '\'';
  }).join(', ') + ']';
};