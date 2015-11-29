'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BannerActionCreators = require('../../actions/BannerActionCreators');

var _BannerActionCreators2 = _interopRequireDefault(_BannerActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Banner = (function (_Component) {
  _inherits(Banner, _Component);

  function Banner(props) {
    _classCallCheck(this, Banner);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Banner).call(this, props));

    _this.onClose = function () {
      _BannerActionCreators2.default.hide();
    };

    _this.onJump = function (os) {
      _BannerActionCreators2.default.jump(os);
      _this.onClose();
    };

    if (window.localStorage.getItem('banner_jump') === null) {
      _BannerActionCreators2.default.show();
    }
    return _this;
  }

  _createClass(Banner, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { className: 'banner' },
        _react2.default.createElement(
          'p',
          null,
          'Welcome to ',
          _react2.default.createElement(
            'b',
            null,
            'Actor Network'
          ),
          '! Check out our ',
          _react2.default.createElement(
            'a',
            { href: '//actor.im/ios', onClick: this.onJump.bind(this, 'IOS'), target: '_blank' },
            'iPhone'
          ),
          ' and ',
          _react2.default.createElement(
            'a',
            { href: '//actor.im/android', onClick: this.onJump.bind(this, 'ANDROID'), target: '_blank' },
            'Android'
          ),
          ' apps!'
        ),
        _react2.default.createElement(
          'a',
          { className: 'banner__hide', onClick: this.onClose },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'close'
          )
        )
      );
    }
  }]);

  return Banner;
})(_react.Component);

exports.default = Banner;