'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _ConnectionState = require('./ConnectionState.react');

var _ConnectionState2 = _interopRequireDefault(_ConnectionState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EmptyScreen = (function (_Component) {
  _inherits(EmptyScreen, _Component);

  function EmptyScreen(props) {
    _classCallCheck(this, EmptyScreen);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EmptyScreen).call(this, props));
  }

  _createClass(EmptyScreen, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
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
      );
    }
  }]);

  return EmptyScreen;
})(_react.Component);

exports.default = EmptyScreen;
//# sourceMappingURL=EmptyScreen.react.js.map