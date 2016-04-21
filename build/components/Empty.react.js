'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./common/SvgIcon.react');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _ConnectionState = require('./common/ConnectionState.react');

var _ConnectionState2 = _interopRequireDefault(_ConnectionState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EmptyScreen = function (_Component) {
  _inherits(EmptyScreen, _Component);

  function EmptyScreen() {
    _classCallCheck(this, EmptyScreen);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  EmptyScreen.prototype.render = function render() {
    return _react2.default.createElement(
      'section',
      { className: 'main' },
      _react2.default.createElement(
        'div',
        { className: 'flexrow' },
        _react2.default.createElement(
          'section',
          { className: 'dialog dialog--empty row center-xs middle-xs' },
          _react2.default.createElement(_ConnectionState2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'advice' },
            _react2.default.createElement(
              'div',
              { className: 'logo' },
              _react2.default.createElement(_SvgIcon2.default, { className: 'icon icon--gray', glyph: 'star' })
            )
          )
        )
      )
    );
  };

  return EmptyScreen;
}(_react.Component);

exports.default = EmptyScreen;
//# sourceMappingURL=Empty.react.js.map