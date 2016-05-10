'use strict';

exports.__esModule = true;
exports.dataURItoBlob = exports.lightbox = undefined;

var _jsonlylightbox = require('jsonlylightbox');

var _jsonlylightbox2 = _interopRequireDefault(_jsonlylightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lightbox = new _jsonlylightbox2.default(); /*
                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                */


var dataURItoBlob = function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var buffer = new ArrayBuffer(byteString.length);

  var view = new Uint8Array(buffer);
  for (var i in byteString) {
    view[i] = byteString.charCodeAt(i);
  }

  return new Blob([view], { type: mimeString });
};

exports.lightbox = lightbox;
exports.dataURItoBlob = dataURItoBlob;
//# sourceMappingURL=ImageUtils.js.map