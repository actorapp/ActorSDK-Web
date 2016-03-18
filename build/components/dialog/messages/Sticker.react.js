'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var cache = {};

/**
 * Class that represents a component for display sticker message content
 */

var Sticker = function (_Component) {
  (0, _inherits3.default)(Sticker, _Component);

  function Sticker(props) {
    (0, _classCallCheck3.default)(this, Sticker);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onLoad = function () {
      _this.setCached();
      if (!_this.state.isLoaded) {
        _this.setState({ isLoaded: true });
      }
    };

    _this.isCached = function () {
      return cache[_this.props.fileUrl] === true;
    };

    _this.setCached = function () {
      return cache[_this.props.fileUrl] = true;
    };

    _this.state = {
      isLoaded: _this.isCached()
    };
    return _this;
  }

  Sticker.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var w = _props.w;
    var h = _props.h;
    var fileUrl = _props.fileUrl;
    var isLoaded = this.state.isLoaded;

    var preloader = _react2.default.createElement(
      'div',
      { className: 'preloader' },
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null)
    );
    var stickerClassName = (0, _classnames2.default)('sticker', {
      'sticker--loaded': isLoaded
    });

    var MAX_WIDTH = 200;
    var MAX_HEIGHT = 200;
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

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: stickerClassName, style: { width: width, height: height } },
        preloader,
        _react2.default.createElement('img', { src: fileUrl,
          width: width,
          height: height,
          onLoad: this.onLoad })
      )
    );
  };

  return Sticker;
}(_react.Component);

Sticker.propTypes = {
  className: _react.PropTypes.string,
  fileUrl: _react.PropTypes.string,
  h: _react.PropTypes.number.isRequired,
  w: _react.PropTypes.number.isRequired
};
exports.default = Sticker;
//# sourceMappingURL=Sticker.react.js.map