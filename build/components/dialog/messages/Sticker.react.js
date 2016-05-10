'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _Image = require('../../common/Image.react');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var cache = {};

/**
 * Class that represents a component for display sticker message content
 */

var Sticker = function (_Component) {
  _inherits(Sticker, _Component);

  function Sticker(props) {
    _classCallCheck(this, Sticker);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = _extends({
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