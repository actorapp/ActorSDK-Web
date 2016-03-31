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

var _CallAvatar = require('./CallAvatar.react');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallBody = function (_Component) {
  (0, _inherits3.default)(CallBody, _Component);

  function CallBody() {
    (0, _classCallCheck3.default)(this, CallBody);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  CallBody.prototype.render = function render() {
    var _props = this.props;
    var small = _props.small;
    var peerInfo = _props.peerInfo;
    var callState = _props.callState;

    if (!peerInfo) {
      return null;
    }

    var titleClassName = (0, _classnames2.default)('call__title', {
      'call__title--small': small
    });

    return _react2.default.createElement(
      'div',
      { className: 'call__body' },
      _react2.default.createElement(_CallAvatar2.default, { peerInfo: peerInfo, callState: callState, small: small }),
      _react2.default.createElement(
        'h3',
        { className: titleClassName },
        peerInfo.name
      )
    );
  };

  return CallBody;
}(_react.Component); /*
                     * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                     */

CallBody.propTypes = {
  small: _react.PropTypes.bool,
  peerInfo: _react.PropTypes.object,
  callState: _react.PropTypes.string.isRequired
};
exports.default = CallBody;
//# sourceMappingURL=CallBody.react.js.map