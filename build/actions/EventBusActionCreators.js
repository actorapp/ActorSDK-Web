'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _CallActionCreators = require('./CallActionCreators');

var _CallActionCreators2 = _interopRequireDefault(_CallActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

exports.default = {
  broadcastEvent: function broadcastEvent(type, event) {
    //console.debug('broadcastEvent', type, event);
    switch (type) {
      case _ActorAppConstants.EventTypes.CALLS:
        _CallActionCreators2.default.handleCall(event);
        break;
      default:
    }
  }
};
//# sourceMappingURL=EventBusActionCreators.js.map