'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  handleCall: function handleCall(event) {
    _ActorClient2.default.bindCall(event.id, this.setCall);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MODAL_OPEN, { event: event });
  },
  makeCall: function makeCall(uid) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.makeCall(uid), {
      request: _ActorAppConstants.ActionTypes.CALL,
      success: _ActorAppConstants.ActionTypes.CALL_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.CALL_ERROR
    }, { uid: uid });
  },
  setCall: function setCall(call) {
    console.debug('setCall', call);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_CHANGED, { call: call });

    switch (call.state) {
      case _ActorAppConstants.CallStates.ENDED:
        (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CALL_MODAL_HIDE);
        break;
      default:
    }
  }
}; /*
    * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=CallActionCreators.js.map