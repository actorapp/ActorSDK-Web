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

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
*/

var CallAvatar = function (_Component) {
  (0, _inherits3.default)(CallAvatar, _Component);

  function CallAvatar() {
    (0, _classCallCheck3.default)(this, CallAvatar);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  CallAvatar.prototype.renderAnimation = function renderAnimation() {
    var _props = this.props;
    var callState = _props.callState;
    var small = _props.small;


    if (callState !== _ActorAppConstants.CallStates.CALLING && callState !== _ActorAppConstants.CallStates.CONNECTING) {
      return null;
    }

    var className = (0, _classnames2.default)('call__avatar__rings', {
      'call__avatar__rings--small': small
    });

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null),
      _react2.default.createElement('div', null)
    );
  };

  CallAvatar.prototype.render = function render() {
    var _props2 = this.props;
    var peerInfo = _props2.peerInfo;
    var small = _props2.small;


    return _react2.default.createElement(
      'div',
      { className: 'call__avatar' },
      _react2.default.createElement(_AvatarItem2.default, {
        size: small ? 'large' : 'big',
        title: peerInfo.name,
        image: peerInfo.avatar,
        placeholder: peerInfo.placeholder
      }),
      this.renderAnimation()
    );
  };

  return CallAvatar;
}(_react.Component);

CallAvatar.propTypes = {
  small: _react.PropTypes.bool,
  peerInfo: _react.PropTypes.shape({
    name: _react.PropTypes.string.isRequired,
    avatar: _react.PropTypes.string,
    placeholder: _react.PropTypes.string.isRequired
  }).isRequired,
  callState: _react.PropTypes.oneOf([_ActorAppConstants.CallStates.CALLING, _ActorAppConstants.CallStates.IN_PROGRESS, _ActorAppConstants.CallStates.CONNECTING, _ActorAppConstants.CallStates.ENDED]).isRequired
};
exports.default = CallAvatar;
//# sourceMappingURL=CallAvatar.react.js.map