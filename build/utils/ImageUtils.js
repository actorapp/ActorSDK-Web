'use strict';

exports.__esModule = true;
exports.dataURItoBlob = exports.lightbox = undefined;
exports.loadImage = loadImage;
exports.renderImageToCanvas = renderImageToCanvas;
exports.getDimentions = getDimentions;

require('../vendor/canvasBlurRect');

var _jsonlylightbox = require('jsonlylightbox');

var _jsonlylightbox2 = _interopRequireDefault(_jsonlylightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */
var lightbox = new _jsonlylightbox2.default();

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
function loadImage(source) {
  return new Promise(function (resolve, reject) {
    var image = document.createElement('img');
    image.onerror = reject;
    image.onload = function () {
      image.onerror = null;
      image.onload = null;
      resolve(image);
    };

    image.setAttribute('crossOrigin', 'anonymous');
    image.src = source;
  });
}

function renderImageToCanvas(source, canvas) {
  return loadImage(source).then(function (image) {
    var width = canvas.width = image.width;
    var height = canvas.height = image.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
    ctx._blurRect(0, 0, width, height, 4, 1);
  });
}

function getDimentions(width, height) {
  var maxWidth = arguments.length <= 2 || arguments[2] === undefined ? 300 : arguments[2];
  var maxHeight = arguments.length <= 3 || arguments[3] === undefined ? 400 : arguments[3];

  if (width > height) {
    if (width > maxWidth) {
      return {
        width: maxWidth,
        height: height * (maxWidth / width)
      };
    }
  } else if (height > maxHeight) {
    return {
      width: width * (maxHeight / height),
      height: maxHeight
    };
  }

  return { width: width, height: height };
}
//# sourceMappingURL=ImageUtils.js.map