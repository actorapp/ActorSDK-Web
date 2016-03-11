'use strict';

exports.__esModule = true;
exports.loggerAppend = loggerAppend;
exports.loggerToggle = loggerToggle;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

function loggerAppend(tag, type, message) {
  (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.LOGGER_APPEND, {
    payload: { type: type, tag: tag, message: message }
  });
}

function loggerToggle() {
  (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.LOGGER_TOGGLE);
}
//# sourceMappingURL=LoggerActionCreators.js.map