'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _CallActionCreators = require('./CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventBusActionCreators = {
  broadcastEvent: function broadcastEvent(type, event) {
    //console.debug('broadcastEvent', type, event);
    switch (type) {
      case _ActorAppConstants.EventTypes.CALL:
        _CallActionCreators2.default.handleCall(event);
        break;
      default:
    }
  }
}; /*
    * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
    */

exports.default = EventBusActionCreators;
//# sourceMappingURL=EventBusActionCreators.js.map