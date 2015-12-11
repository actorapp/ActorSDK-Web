'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var ConnectionStateActionCreators = {
  setState: function setState(state) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONNECTION_STATE_CHANGED, { state: state });
  }
};

exports.default = ConnectionStateActionCreators;
//# sourceMappingURL=ConnectionStateActionCreators.js.map