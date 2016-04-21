'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var CallAvatar = function (_Component) {
  _inherits(CallAvatar, _Component);

  function CallAvatar() {
    _classCallCheck(this, CallAvatar);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
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