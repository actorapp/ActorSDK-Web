'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('flux/utils');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactIntl = require('react-intl');

var _AvatarItem = require('../common/AvatarItem.react');

var _AvatarItem2 = _interopRequireDefault(_AvatarItem);

var _ActorAppConstants = require('../../constants/ActorAppConstants');

var _CallActionCreators = require('../../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _CallStore = require('../../stores/CallStore');

var _CallStore2 = _interopRequireDefault(_CallStore);

var _UserStore = require('../../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CallModal = (function (_Component) {
  _inherits(CallModal, _Component);

  function CallModal(props) {
    _classCallCheck(this, CallModal);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleClose = function () {
      return _CallActionCreators2.default.hide();
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _ActorAppConstants.KeyCodes.ESC) {
        event.preventDefault();
        _this.handleClose();
      }
    };

    _this.handleAnswer = function () {
      var callId = _this.state.callId;

      _CallActionCreators2.default.answerCall(callId);
    };

    _this.handleEnd = function () {
      var callId = _this.state.callId;

      _CallActionCreators2.default.endCall(callId);
      //this.handleClose();
    };

    _this.handleMute = function () {
      console.debug('handleMute');
    };

    return _this;
  }

  CallModal.calculateState = function calculateState() {
    return {
      isOpen: _CallStore2.default.isOpen(),
      isOutgoing: _CallStore2.default.isOutgoing(),
      callId: _CallStore2.default.getId(),
      callMembers: _CallStore2.default.getMembers(),
      callPeer: _CallStore2.default.getPeer(),
      callState: _CallStore2.default.getState()
    };
  };

  CallModal.prototype.render = function render() {
    var _state = this.state;
    var isOpen = _state.isOpen;
    var isOutgoing = _state.isOutgoing;
    var callPeer = _state.callPeer;
    var callMembers = _state.callMembers;
    var callState = _state.callState;

    var peerInfo = callPeer ? callPeer.type == 'user' ? _UserStore2.default.getUser(callPeer.id) : null : null;

    var modalStyles = {
      content: {
        position: null,
        top: null,
        left: null,
        right: null,
        bottom: null,
        border: null,
        background: null,
        overflow: null,
        outline: null,
        padding: null,
        borderRadius: null,
        width: 240,
        minWidth: 240
      }
    };

    var modalBody = peerInfo ? _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_AvatarItem2.default, { image: peerInfo.avatar, placeholder: peerInfo.placeholder,
        size: 'big', title: peerInfo.name }),
      _react2.default.createElement(
        'h4',
        { className: 'caller-name' },
        peerInfo.name
      )
    ) : null;

    var modalFooter = undefined;
    switch (callState) {
      case _ActorAppConstants.CallStates.CALLING:
        modalFooter = _react2.default.createElement(
          'div',
          null,
          isOutgoing ? null : _react2.default.createElement(
            'button',
            { className: 'button button--rised button--wide', onClick: this.handleAnswer },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.answer' })
          ),
          _react2.default.createElement(
            'button',
            { className: 'button button--rised button--wide', onClick: this.handleEnd },
            isOutgoing ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.cancel' }) : _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.decline' })
          )
        );
        break;
      case _ActorAppConstants.CallStates.IN_PROGRESS:
      case _ActorAppConstants.CallStates.CONNECTING:
        modalFooter = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { className: 'button button--rised button--wide', onClick: this.handleMute },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.mute' })
          ),
          _react2.default.createElement(
            'button',
            { className: 'button button--rised button--wide', onClick: this.handleEnd },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.end' })
          )
        );
        break;
      case _ActorAppConstants.CallStates.ENDED:
        modalFooter = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { className: 'button button--rised button--wide', onClick: this.handleClose },
            _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'button.close' })
          )
        );
        break;
      default:
    }

    if (isOpen) {
      return _react2.default.createElement(
        _reactModal2.default,
        { className: 'modal-new modal-new--call',
          closeTimeoutMS: 150,
          style: modalStyles,
          isOpen: isOpen },
        _react2.default.createElement(
          'div',
          { className: 'modal-new__header' },
          _react2.default.createElement(
            'h3',
            { className: 'modal-new__header__title' },
            isOutgoing ? _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.outgoing' }) : _react2.default.createElement(_reactIntl.FormattedMessage, { id: 'call.incoming' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-new__body' },
          modalBody
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-new__footer' },
          modalFooter
        )
      );
    } else {
      return null;
    }
  };

  return CallModal;
})(_react.Component);

CallModal.getStores = function () {
  return [_CallStore2.default];
};

exports.default = _utils.Container.create(CallModal, { pure: false });
//# sourceMappingURL=CallModal.react.js.map