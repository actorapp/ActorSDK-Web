'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('flux/utils');

var _reactIntl = require('react-intl');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _CallActionCreators = require('../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _CallStore = require('../stores/CallStore');

var _CallStore2 = _interopRequireDefault(_CallStore);

var _UserStore = require('../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _GroupStore = require('../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _CallHeader = require('./call/CallHeader.react');

var _CallHeader2 = _interopRequireDefault(_CallHeader);

var _CallBody = require('./call/CallBody.react');

var _CallBody2 = _interopRequireDefault(_CallBody);

var _CallControls = require('./call/CallControls.react');

var _CallControls2 = _interopRequireDefault(_CallControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Call = (function (_Component) {
  _inherits(Call, _Component);

  Call.calculatePeerInfo = function calculatePeerInfo() {
    var peer = _CallStore2.default.getPeer();
    if (peer) {
      if (peer.type === _ActorAppConstants.PeerTypes.USER) {
        return _UserStore2.default.getUser(peer.id);
      }

      if (peer.type === _ActorAppConstants.PeerTypes.GROUP) {
        return _GroupStore2.default.getGroup(peer.id);
      }
    }

    return null;
  };

  Call.calculateState = function calculateState() {
    return {
      isOpen: _CallStore2.default.isOpen(),
      isOutgoing: _CallStore2.default.isOutgoing(),
      callId: _CallStore2.default.getId(),
      callMembers: _CallStore2.default.getMembers(),
      callPeer: _CallStore2.default.getPeer(),
      callState: _CallStore2.default.getState(),
      peerInfo: Call.calculatePeerInfo()
    };
  };

  function Call(props) {
    _classCallCheck(this, Call);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onAnswer = _this.onAnswer.bind(_this);
    _this.onEnd = _this.onEnd.bind(_this);
    _this.onMuteToggle = _this.onMuteToggle.bind(_this);
    _this.onClose = _this.onClose.bind(_this);
    return _this;
  }

  Call.prototype.onAnswer = function onAnswer() {
    _CallActionCreators2.default.answerCall(this.state.callId);
  };

  Call.prototype.onEnd = function onEnd() {
    _CallActionCreators2.default.endCall(this.state.callId);
  };

  Call.prototype.onMuteToggle = function onMuteToggle() {
    _CallActionCreators2.default.toggleCallMute(this.state.callId);
  };

  Call.prototype.onClose = function onClose() {
    _CallActionCreators2.default.hide();
  };

  Call.prototype.onFullscreen = function onFullscreen() {
    console.debug('onFullscreen');
  };

  Call.prototype.onUserAdd = function onUserAdd() {
    console.debug('onUserAdd');
  };

  Call.prototype.onVideo = function onVideo() {
    console.debug('onVideo');
  };

  Call.prototype.renderContent = function renderContent() {
    var _state = this.state;
    var isOpen = _state.isOpen;
    var callState = _state.callState;
    var peerInfo = _state.peerInfo;
    var isOutgoing = _state.isOutgoing;

    if (!isOpen) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'activity__body' },
      _react2.default.createElement(
        'section',
        { className: 'call' },
        _react2.default.createElement(_CallHeader2.default, { isOutgoing: isOutgoing }),
        _react2.default.createElement(_CallBody2.default, { peerInfo: peerInfo, callState: callState }),
        _react2.default.createElement(_CallControls2.default, {
          callState: callState,
          isOutgoing: isOutgoing,
          onEnd: this.onEnd,
          onAnswer: this.onAnswer,
          onMuteToggle: this.onMuteToggle,
          onFullscreen: this.onFullscreen,
          onUserAdd: this.onUserAdd,
          onVideo: this.onVideo,
          onClose: this.onClose
        })
      )
    );
  };

  Call.prototype.render = function render() {
    var className = (0, _classnames2.default)('activity', {
      'activity--shown': this.state.isOpen
    });

    return _react2.default.createElement(
      'section',
      { className: className },
      this.renderContent()
    );
  };

  return Call;
})(_react.Component);

Call.getStores = function () {
  return [_CallStore2.default];
};

exports.default = _utils.Container.create(Call, { pure: false });
//# sourceMappingURL=Call.react.js.map