'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var DialogInfoActionCreators = {
  changeNotificationsEnabled: function changeNotificationsEnabled(peer, isEnabled) {
    ActorClient.changeNotificationsEnabled(peer, isEnabled);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.NOTIFICATION_CHANGE, { peer: peer, isEnabled: isEnabled });
  }
};

exports.default = DialogInfoActionCreators;
//# sourceMappingURL=NotificationsActionCreators.js.map