'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogInfoActionCreators = {
  changeNotificationsEnabled: function changeNotificationsEnabled(peer, isEnabled) {
    _ActorClient2.default.changeNotificationsEnabled(peer, isEnabled);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.NOTIFICATION_CHANGE, { peer: peer, isEnabled: isEnabled });
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

exports.default = DialogInfoActionCreators;
//# sourceMappingURL=NotificationsActionCreators.js.map