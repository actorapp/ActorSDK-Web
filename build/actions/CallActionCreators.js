'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _CallStore = require('../stores/CallStore');

var _CallStore2 = _interopRequireDefault(_CallStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

var HIDE_MODAL_AFTER = 3000;

exports.default = {
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MODAL_HIDE);
  },
  handleCall: function handleCall(event) {
    var _this = this;

    var id = event.id;
    var type = event.type;

    switch (type) {
      case _ActorAppConstants.CallTypes.STARTED:
        _ActorClient2.default.bindCall(id, this.setCall);
        (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MODAL_OPEN, { id: id });
        break;
      case _ActorAppConstants.CallTypes.ENDED:
        setTimeout(function () {
          _ActorClient2.default.unbindCall(id, _this.setCall);
          if (_CallStore2.default.isOpen()) (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MODAL_HIDE);
        }, HIDE_MODAL_AFTER);
        break;
      default:
    }
  },
  makeCall: function makeCall(peerId) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.makeCall(peerId), {
      request: _ActorAppConstants.ActionTypes.CALL,
      success: _ActorAppConstants.ActionTypes.CALL_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.CALL_ERROR
    }, { peerId: peerId });
  },
  makeGroupCall: function makeGroupCall(peerId) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.makeGroupCall(peerId), {
      request: _ActorAppConstants.ActionTypes.CALL,
      success: _ActorAppConstants.ActionTypes.CALL_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.CALL_ERROR
    }, { peerId: peerId });
  },
  setCall: function setCall(call) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_CHANGED, { call: call });
  },
  answerCall: function answerCall(id) {
    _ActorClient2.default.answerCall(id);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_ANSWER, { id: id });
  },
  endCall: function endCall(id) {
    _ActorClient2.default.endCall(id);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_END, { id: id });
  }
};
//# sourceMappingURL=CallActionCreators.js.map