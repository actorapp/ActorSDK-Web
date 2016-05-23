'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImageUtils = require('../../../utils/ImageUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MAX_WIDTH = 300;
var MAX_HEIGHT = 400;

var Photo = function (_Component) {
  _inherits(Photo, _Component);

  function Photo() {
    _classCallCheck(this, Photo);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Photo.prototype.onClick = function onClick(event) {
    event.preventDefault();
    _ImageUtils.lightbox.open(event.target.src, 'message');
  };

  Photo.prototype.getDimentions = function getDimentions() {
    var _props = this.props;
    var width = _props.w;
    var height = _props.h;

    if (width > height) {
      if (width > MAX_WIDTH) {
        return {
          width: MAX_WIDTH,
          height: height * (MAX_WIDTH / width)
        };
      }
    } else if (height > MAX_HEIGHT) {
      return {
        width: width * (MAX_HEIGHT / height),
        height: MAX_HEIGHT
      };
    }

    return { width: width, height: height };
  };

  Photo.prototype.render = function render() {
    var _props2 = this.props;
    var fileUrl = _props2.fileUrl;
    var preview = _props2.preview;

    var _getDimentions = this.getDimentions();

    var width = _getDimentions.width;
    var height = _getDimentions.height;


    return _react2.default.createElement('img', {
      className: 'message__photo',
      src: fileUrl || preview,
      width: width,
      height: height,
      onClick: this.onClick
    });
  };

  return Photo;
}(_react.Component);

Photo.propTypes = {
  fileUrl: _react.PropTypes.string,
  w: _react.PropTypes.number.isRequired,
  h: _react.PropTypes.number.isRequired,
  preview: _react.PropTypes.string.isRequired,
  isUploading: _react.PropTypes.bool.isRequired
};
exports.default = Photo;
//# sourceMappingURL=Photo.react.js.map