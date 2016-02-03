'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ImageUtils = require('../../../utils/ImageUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var cache = [];

/**
 * Class that represents a component for display photo message content
 * @todo move cache to store;
 */

var Photo = (function (_Component) {
  _inherits(Photo, _Component);

  function Photo(props) {
    _classCallCheck(this, Photo);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Photo).call(this, props));

    _this.openLightBox = function () {
      return _ImageUtils.lightbox.open(_this.props.content.fileUrl, 'message');
    };

    _this.onLoad = function () {
      _this.setCached();
      if (!_this.state.isImageLoaded) {
        _this.setState({ isImageLoaded: true });
      }
    };

    _this.isCached = function () {
      return cache[_this.props.content.fileUrl] === true;
    };

    _this.setCached = function () {
      cache[_this.props.content.fileUrl] = true;
    };

    _this.state = {
      isImageLoaded: _this.isCached()
    };
    return _this;
  }

  _createClass(Photo, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var content = _props.content;
      var className = _props.className;
      var loadedClassName = _props.loadedClassName;
      var isImageLoaded = this.state.isImageLoaded;

      var MAX_WIDTH = 300;
      var MAX_HEIGHT = 400;
      var width = content.w;
      var height = content.h;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      var original = null,
          preview = null,
          preloader = null;

      if (content.fileUrl) {
        original = _react2.default.createElement('img', { className: 'photo photo--original',
          height: content.h,
          onClick: this.openLightBox,
          onLoad: this.onLoad,
          src: content.fileUrl,
          width: content.w });
      }

      if (!this.isCached()) {
        preview = _react2.default.createElement('img', { className: 'photo photo--preview', src: content.preview });

        if (content.isUploading === true || isImageLoaded === false) {
          preloader = _react2.default.createElement(
            'div',
            { className: 'preloader' },
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null),
            _react2.default.createElement('div', null)
          );
        }
      }

      var imageClassName = isImageLoaded ? (0, _classnames2.default)(className, loadedClassName) : className;

      return _react2.default.createElement(
        'div',
        { className: imageClassName, style: { width: width, height: height } },
        preview,
        original,
        preloader,
        _react2.default.createElement('svg', { dangerouslySetInnerHTML: { __html: '<filter id="blur-effect"><feGaussianBlur stdDeviation="3"/></filter>' } })
      );
    }
  }]);

  return Photo;
})(_react.Component);

Photo.propTypes = {
  content: _react.PropTypes.object.isRequired,
  className: _react.PropTypes.string,
  loadedClassName: _react.PropTypes.string
};
exports.default = Photo;
//# sourceMappingURL=Photo.react.js.map