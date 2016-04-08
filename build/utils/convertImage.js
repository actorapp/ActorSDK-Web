'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadImage(src) {
  return new _promise2.default(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
    } else {
      xhr.setRequestHeader('Accept-Charset', 'x-user-defined');
    }

    xhr.addEventListener('error', reject);
    xhr.addEventListener('load', function () {
      var binary = xhr.responseText.split('').map(function (e) {
        return String.fromCharCode(e.charCodeAt(0) & 0xff);
      }).join('');
      resolve(binary);
    });

    xhr.open('GET', src);
    xhr.send();
  });
} /* global WebPDecoder */


function binaryToArray(binary) {
  var result = new Array();
  for (var i = 0; i < binary.length; i++) {
    result.push(binary.charCodeAt(i));
  }

  return result;
}

function convertWebPText(data) {
  var buff = binaryToArray(data);

  var decoder = new WebPDecoder();
  var config = decoder.WebPDecoderConfig;
  var output_buffer = config.j;
  var bitstream = config.input;

  if (!decoder.WebPInitDecoderConfig(config)) {
    throw new Error('Library version mismatch!');
  }

  var status = decoder.WebPGetFeatures(buff, buff.length, bitstream);
  if (status !== 0) {
    throw new Error('Unable to decode webp image!', status);
  }

  output_buffer.J = 4;
  status = decoder.WebPDecode(buff, buff.length, config);

  if (status != 0) {
    throw new Error('WebP decoding failed.', status);
  }

  return {
    bitmap: output_buffer.c.RGBA.ma,
    height: output_buffer.height,
    width: output_buffer.width
  };
}

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

function convertWebPToPNG(src) {
  return loadImage(src).then(function (data) {
    var webp = convertWebPText(data);
    canvas.height = webp.height;
    canvas.width = webp.width;

    var output = context.createImageData(canvas.width, canvas.height);
    var outputData = output.data;

    for (var h = 0; h < webp.height; h++) {
      for (var w = 0; w < webp.width; w++) {
        outputData[0 + w * 4 + webp.width * 4 * h] = webp.bitmap[1 + w * 4 + webp.width * 4 * h];
        outputData[1 + w * 4 + webp.width * 4 * h] = webp.bitmap[2 + w * 4 + webp.width * 4 * h];
        outputData[2 + w * 4 + webp.width * 4 * h] = webp.bitmap[3 + w * 4 + webp.width * 4 * h];
        outputData[3 + w * 4 + webp.width * 4 * h] = webp.bitmap[0 + w * 4 + webp.width * 4 * h];
      }
    }

    context.putImageData(output, 0, 0);
    return canvas.toDataURL();
  });
}

var isWebPSupported = new _promise2.default(function (resolve) {
  var image = new Image();
  image.onload = function () {
    return resolve(image.width === 2 && image.height === 1);
  };
  image.onerror = function () {
    return resolve(false);
  };
  image.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
}).then(function (isSupported) {
  if (isSupported) {
    return true;
  }

  return new _promise2.default(function (resolve) {
    require.ensure(['../vendor/libwebp-0.2.0.min'], function (require) {
      require('../vendor/libwebp-0.2.0.min');
      resolve(false);
    });
  });
});

function convertImage(src) {
  return isWebPSupported.then(function (isSupported) {
    if (isSupported || !/\.webp\?/.test(src)) {
      return src;
    }

    return convertWebPToPNG(src);
  });
}

exports.default = (0, _lodash.memoize)(convertImage);
//# sourceMappingURL=convertImage.js.map