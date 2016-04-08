'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _Image = require('../../common/Image.react');

var _Image2 = _interopRequireDefault(_Image);

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

    _this.state = (0, _extends3.default)({
      isLoaded: _this.isCached()
    }, _this.calculateDementions());

    _this.onLoad = _this.onLoad.bind(_this);
    _this.isCached = _this.isCached.bind(_this);
    _this.setCached = _this.setCached.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  Sticker.prototype.onLoad = function onLoad() {
    this.setCached();
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  Sticker.prototype.isCached = function isCached() {
    return cache[this.props.fileUrl] === true;
  };

  Sticker.prototype.setCached = function setCached() {
    cache[this.props.fileUrl] = true;
  };

  Sticker.prototype.calculateDementions = function calculateDementions() {
    var _props = this.props;
    var w = _props.w;
    var h = _props.h;

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

    return { width: width, height: height };
  };

  Sticker.prototype.renderPreloader = function renderPreloader() {
    var isLoaded = this.state.isLoaded;

    if (isLoaded) return null;

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

  Sticker.prototype.renderSticker = function renderSticker() {
    var fileUrl = this.props.fileUrl;

    if (!fileUrl) return null;

    var _state = this.state;
    var width = _state.width;
    var height = _state.height;


    return _react2.default.createElement(_Image2.default, {
      src: fileUrl,
      width: width,
      height: height,
      onLoad: this.onLoad
    });
  };

  Sticker.prototype.render = function render() {
    var className = this.props.className;
    var _state2 = this.state;
    var isLoaded = _state2.isLoaded;
    var width = _state2.width;
    var height = _state2.height;

    var stickerClassName = (0, _classnames2.default)('sticker', {
      'sticker--loaded': isLoaded
    });

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: stickerClassName, style: { width: width, height: height } },
        this.renderPreloader(),
        this.renderSticker()
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