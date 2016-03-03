'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

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

var CallBody = (function (_Component) {
  _inherits(CallBody, _Component);

  function CallBody() {
    _classCallCheck(this, CallBody);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CallBody.prototype.render = function render() {
    var peerInfo = this.props.peerInfo;

    if (!peerInfo) {
      return null;
    }

    var avatarRingsClassName = (0, _classnames2.default)('call__avatar__rings', {
      'call__avatar__rings--animated': this.props.callState === _ActorAppConstants.CallStates.CALLING || this.props.callState === _ActorAppConstants.CallStates.CONNECTING
    });

    return _react2.default.createElement(
      'div',
      { className: 'call__body' },
      _react2.default.createElement(
        'div',
        { className: 'call__avatar' },
        _react2.default.createElement(_AvatarItem2.default, {
          size: 'big',
          image: peerInfo.avatar,
          title: peerInfo.name,
          placeholder: peerInfo.placeholder
        }),
        _react2.default.createElement(
          'div',
          { className: avatarRingsClassName },
          _react2.default.createElement('div', null),
          _react2.default.createElement('div', null),
          _react2.default.createElement('div', null)
        )
      ),
      _react2.default.createElement(
        'h3',
        { className: 'call__title' },
        peerInfo.name
      )
    );
  };

  return CallBody;
})(_react.Component);

CallBody.propTypes = {
  peerInfo: _react2.default.PropTypes.object,
  callState: _react.PropTypes.oneOf([_ActorAppConstants.CallStates.CALLING, _ActorAppConstants.CallStates.IN_PROGRESS, _ActorAppConstants.CallStates.CONNECTING, _ActorAppConstants.CallStates.ENDED])
};
exports.default = CallBody;
//# sourceMappingURL=CallBody.react.js.map