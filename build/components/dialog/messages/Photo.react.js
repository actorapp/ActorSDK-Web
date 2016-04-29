'use strict';

exports.__esModule = true;

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

var Photo = function (_Component) {
  _inherits(Photo, _Component);

  function Photo(props) {
    _classCallCheck(this, Photo);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      isImageLoaded: _this.isCached()
    };

    _this.openLightBox = _this.openLightBox.bind(_this);
    _this.onLoad = _this.onLoad.bind(_this);
    _this.isCached = _this.isCached.bind(_this);
    _this.setCached = _this.setCached.bind(_this);
    _this.getDimentions = _this.getDimentions.bind(_this);
    return _this;
  }

  Photo.prototype.openLightBox = function openLightBox() {
    _ImageUtils.lightbox.open(this.props.fileUrl, 'message');
  };

  Photo.prototype.onLoad = function onLoad() {
    this.setCached();
    if (!this.state.isImageLoaded) {
      this.setState({ isImageLoaded: true });
    }
  };

  Photo.prototype.isCached = function isCached() {
    cache[this.props.fileUrl] === true;
  };

  Photo.prototype.setCached = function setCached() {
    cache[this.props.fileUrl] = true;
  };

  Photo.prototype.getDimentions = function getDimentions() {
    var _props = this.props;
    var w = _props.w;
    var h = _props.h;

    var MAX_WIDTH = 300;
    var MAX_HEIGHT = 400;
    var width = w;
    var height = h;

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

    return { width: width, height: height };
  };

  Photo.prototype.renderPreview = function renderPreview() {
    var preview = this.props.preview;


    if (this.isCached()) {
      return null;
    }

    return _react2.default.createElement('img', { className: 'photo photo--preview', src: preview });
  };

  Photo.prototype.renderPreloader = function renderPreloader() {
    var isUploading = this.props.isUploading;
    var isImageLoaded = this.state.isImageLoaded;


    if (this.isCached() || isUploading !== true || isImageLoaded !== false) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'preloader' },
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null)
    );
  };

  Photo.prototype.renderOriginal = function renderOriginal() {
    var _props2 = this.props;
    var fileUrl = _props2.fileUrl;
    var w = _props2.w;
    var h = _props2.h;


    if (!fileUrl) {
      return null;
    }

    return _react2.default.createElement('img', {
      className: 'photo photo--original',
      height: h,
      onClick: this.openLightBox,
      onLoad: this.onLoad,
      src: fileUrl,
      width: w
    });
  };

  Photo.prototype.render = function render() {
    var _props3 = this.props;
    var className = _props3.className;
    var loadedClassName = _props3.loadedClassName;
    var isImageLoaded = this.state.isImageLoaded;


    var imageClassName = isImageLoaded ? (0, _classnames2.default)(className, loadedClassName) : className;

    return _react2.default.createElement(
      'div',
      { className: imageClassName, style: this.getDimentions() },
      this.renderPreview(),
      this.renderOriginal(),
      this.renderPreloader(),
      _react2.default.createElement('svg', { dangerouslySetInnerHTML: { __html: '<filter id="blur-effect"><feGaussianBlur stdDeviation="3"/></filter>' } })
    );
  };

  return Photo;
}(_react.Component);

Photo.propTypes = {
  fileUrl: _react.PropTypes.string,
  w: _react.PropTypes.number.isRequired,
  h: _react.PropTypes.number.isRequired,
  preview: _react.PropTypes.string.isRequired,
  isUploading: _react.PropTypes.bool.isRequired,
  className: _react.PropTypes.string,
  loadedClassName: _react.PropTypes.string
};
exports.default = Photo;
//# sourceMappingURL=Photo.react.js.map