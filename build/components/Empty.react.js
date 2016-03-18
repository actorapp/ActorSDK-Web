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

var _reactIntl = require('react-intl');

var _ConnectionState = require('./common/ConnectionState.react');

var _ConnectionState2 = _interopRequireDefault(_ConnectionState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyScreen = function (_Component) {
  (0, _inherits3.default)(EmptyScreen, _Component);

  function EmptyScreen(props) {
    (0, _classCallCheck3.default)(this, EmptyScreen);
    return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
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
              _react2.default.createElement('svg', { className: 'icon icon--gray',
                dangerouslySetInnerHTML: { __html: '<use xlink:href="assets/images/icons.svg#star"/>' } })
            ),
            _react2.default.createElement(
              'h2',
              null,
              _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'main.empty' })
            )
          )
        )
      )
    );
  };

  return EmptyScreen;
}(_react.Component); /*
                      * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                      */

exports.default = EmptyScreen;
//# sourceMappingURL=Empty.react.js.map