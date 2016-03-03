'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ConnectionStateActionCreators = require('../actions/ConnectionStateActionCreators');

var _ConnectionStateActionCreators2 = _interopRequireDefault(_ConnectionStateActionCreators);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  createAppVisible: function createAppVisible() {
    _ActorClient2.default.onAppVisible();
    _ActorClient2.default.bindConnectState(_ConnectionStateActionCreators2.default.setState);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_VISIBLE);
  },
  createAppHidden: function createAppHidden() {
    _ActorClient2.default.onAppHidden();
    _ActorClient2.default.unbindConnectState(_ConnectionStateActionCreators2.default.setState);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_HIDDEN);
  }
};
//# sourceMappingURL=VisibilityActionCreators.js.map