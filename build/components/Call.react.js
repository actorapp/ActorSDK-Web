'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _utils = require('flux/utils');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

var _CallActionCreators = require('../actions/CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

var _CallStore = require('../stores/CallStore');

var _CallStore2 = _interopRequireDefault(_CallStore);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _UserStore = require('../stores/UserStore');

var _UserStore2 = _interopRequireDefault(_UserStore);

var _GroupStore = require('../stores/GroupStore');

var _GroupStore2 = _interopRequireDefault(_GroupStore);

var _CallBody = require('./call/CallBody.react');

var _CallBody2 = _interopRequireDefault(_CallBody);

var _CallControls = require('./call/CallControls.react');

var _CallControls2 = _interopRequireDefault(_CallControls);

var _ContactDetails = require('./common/ContactDetails.react');

var _ContactDetails2 = _interopRequireDefault(_ContactDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Call = function (_Component) {
  _inherits(Call, _Component);

  Call.getStores = function getStores() {
    return [_CallStore2.default, _DialogStore2.default];
  };

  Call.calculatePeerInfo = function calculatePeerInfo(peer) {
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
    var call = _CallStore2.default.getState();
    if (!call.isOpen || call.isFloating) {
      return { isOpen: false };
    }

    var dialogPeer = _DialogStore2.default.getCurrentPeer();
    var isSameDialog = _PeerUtils2.default.equals(dialogPeer, call.peer);
    if (!isSameDialog) {
      return { isOpen: false };
    }

    return {
      call: call,
      isOpen: true,
      peerInfo: Call.calculatePeerInfo(call.peer)
    };
  };

  function Call(props) {
    _classCallCheck(this, Call);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onAnswer = _this.onAnswer.bind(_this);
    _this.onEnd = _this.onEnd.bind(_this);
    _this.onMuteToggle = _this.onMuteToggle.bind(_this);
    _this.onClose = _this.onClose.bind(_this);
    _this.onFullscreen = _this.onFullscreen.bind(_this);
    _this.onUserAdd = _this.onUserAdd.bind(_this);
    _this.onVideo = _this.onVideo.bind(_this);
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin.shouldComponentUpdate.bind(_this);
    return _this;
  }

  Call.prototype.onAnswer = function onAnswer() {
    _CallActionCreators2.default.answerCall(this.state.call.id);
  };

  Call.prototype.onEnd = function onEnd() {
    _CallActionCreators2.default.endCall(this.state.call.id);
  };

  Call.prototype.onMuteToggle = function onMuteToggle() {
    _CallActionCreators2.default.toggleCallMute(this.state.call.id);
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

  Call.prototype.renderContactInfo = function renderContactInfo() {
    var _state = this.state;
    var call = _state.call;
    var peerInfo = _state.peerInfo;

    if (!peerInfo || call.peer.type === _ActorAppConstants.PeerTypes.GROUP) return null;

    return _react2.default.createElement(
      'section',
      { className: 'call__info' },
      _react2.default.createElement(_ContactDetails2.default, { peerInfo: peerInfo })
    );
  };

  Call.prototype.render = function render() {
    var _state2 = this.state;
    var isOpen = _state2.isOpen;
    var call = _state2.call;
    var peerInfo = _state2.peerInfo;

    if (!isOpen) {
      return _react2.default.createElement('section', { className: 'activity' });
    }

    return _react2.default.createElement(
      'section',
      { className: 'activity activity--shown' },
      _react2.default.createElement(
        'div',
        { className: 'activity__body call' },
        _react2.default.createElement(
          'section',
          { className: 'call__container' },
          _react2.default.createElement(_CallBody2.default, { peerInfo: peerInfo, callState: call.state }),
          _react2.default.createElement(_CallControls2.default, {
            callState: call.state,
            isOutgoing: call.isOutgoing,
            isMuted: call.isMuted,
            onEnd: this.onEnd,
            onAnswer: this.onAnswer,
            onMuteToggle: this.onMuteToggle,
            onFullscreen: this.onFullscreen,
            onUserAdd: this.onUserAdd,
            onVideo: this.onVideo,
            onClose: this.onClose
          })
        ),
        this.renderContactInfo()
      )
    );
  };

  return Call;
}(_react.Component);

exports.default = _utils.Container.create(Call);
//# sourceMappingURL=Call.react.js.map