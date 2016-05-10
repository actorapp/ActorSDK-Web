'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _createTimer = require('../utils/createTimer');

var _createTimer2 = _interopRequireDefault(_createTimer);

var _ActionCreators2 = require('./ActionCreators');

var _ActionCreators3 = _interopRequireDefault(_ActionCreators2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CallActionCreators = function (_ActionCreators) {
  _inherits(CallActionCreators, _ActionCreators);

  function CallActionCreators() {
    _classCallCheck(this, CallActionCreators);

    var _this = _possibleConstructorReturn(this, _ActionCreators.call(this));

    _this.handleCall = _this.handleCall.bind(_this);
    _this.setCall = _this.setCall.bind(_this);
    return _this;
  }

  CallActionCreators.prototype.hide = function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MODAL_HIDE);
  };

  CallActionCreators.prototype.handleCall = function handleCall(event) {
    var id = event.id;
    var type = event.type;

    switch (type) {
      case _ActorAppConstants.CallTypes.STARTED:
        this.setBindings('call', [_ActorClient2.default.bindCall(id, this.setCall)]);
        (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MODAL_OPEN, { id: id });
        break;
      case _ActorAppConstants.CallTypes.ENDED:
        if (this.timer) {
          this.timer.stop();
          this.timer = null;
        }

        this.removeBindings('call');
        (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MODAL_HIDE);
        break;
    }
  };

  CallActionCreators.prototype.makeCall = function makeCall(peerId) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.makeCall(peerId), {
      request: _ActorAppConstants.ActionTypes.CALL,
      success: _ActorAppConstants.ActionTypes.CALL_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.CALL_ERROR
    }, { peerId: peerId });
  };

  CallActionCreators.prototype.makeGroupCall = function makeGroupCall(peerId) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.makeGroupCall(peerId), {
      request: _ActorAppConstants.ActionTypes.CALL,
      success: _ActorAppConstants.ActionTypes.CALL_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.CALL_ERROR
    }, { peerId: peerId });
  };

  CallActionCreators.prototype.setCall = function setCall(call) {
    if (call.state === _ActorAppConstants.CallStates.IN_PROGRESS && !this.timer) {
      this.timer = (0, _createTimer2.default)(this.setCallTime);
    }

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_CHANGED, { call: call });
  };

  CallActionCreators.prototype.setCallTime = function setCallTime(time) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_TIME_CHANGED, { time: time });
  };

  CallActionCreators.prototype.answerCall = function answerCall(callId) {
    _ActorClient2.default.answerCall(callId);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_ANSWER, { callId: callId });
  };

  CallActionCreators.prototype.endCall = function endCall(callId) {
    _ActorClient2.default.endCall(callId);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_END, { callId: callId });
  };

  CallActionCreators.prototype.toggleCallMute = function toggleCallMute(callId) {
    _ActorClient2.default.toggleCallMute(callId);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MUTE_TOGGLE, { callId: callId });
  };

  CallActionCreators.prototype.toggleFloating = function toggleFloating() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_FLOAT_TOGGLE);
  };

  return CallActionCreators;
}(_ActionCreators3.default);

exports.default = new CallActionCreators();
//# sourceMappingURL=CallActionCreators.js.map