'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

var Sticker = (function (_Component) {
  _inherits(Sticker, _Component);

  function Sticker(props) {
    _classCallCheck(this, Sticker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sticker).call(this, props));

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

  _createClass(Sticker, [{
    key: 'render',
    value: function render() {
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
    }
  }]);

  return Sticker;
})(_react.Component);

Sticker.propTypes = {
  className: _react.PropTypes.string,
  fileUrl: _react.PropTypes.string.isRequired,
  h: _react.PropTypes.number.isRequired,
  w: _react.PropTypes.number.isRequired
};
exports.default = Sticker;
//# sourceMappingURL=Sticker.react.js.map