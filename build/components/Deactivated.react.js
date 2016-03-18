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

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _ActorAppConstants = require('../constants/ActorAppConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var Deactivated = function (_Component) {
  (0, _inherits3.default)(Deactivated, _Component);

  function Deactivated(props) {
    (0, _classCallCheck3.default)(this, Deactivated);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    var SharedActor = _SharedContainer2.default.get();
    _this.appName = SharedActor.appName ? SharedActor.appName : _ActorAppConstants.appName;
    return _this;
  }

  Deactivated.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'deactivated row center-xs middle-xs' },
      _react2.default.createElement(
        'div',
        { className: 'deactivated__window' },
        _react2.default.createElement(
          'h2',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'main.deactivated.header' })
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'main.deactivated.text', values: { appName: this.appName } })
        )
      )
    );
  };

  return Deactivated;
}(_react.Component);

exports.default = Deactivated;
//# sourceMappingURL=Deactivated.react.js.map