'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ConnectionStateActionCreators = require('../actions/ConnectionStateActionCreators');

var _ConnectionStateActionCreators2 = _interopRequireDefault(_ConnectionStateActionCreators);

var _DraftActionCreators = require('../actions/DraftActionCreators');

var _DraftActionCreators2 = _interopRequireDefault(_DraftActionCreators);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _DialogStore = require('../stores/DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  createAppVisible: function createAppVisible() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_VISIBLE);
    _ActorClient2.default.onAppVisible();
    _ActorClient2.default.bindConnectState(_ConnectionStateActionCreators2.default.setState);
  },
  createAppHidden: function createAppHidden() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.APP_HIDDEN);
    var currentPeer = _DialogStore2.default.getCurrentPeer();
    _ActorClient2.default.onAppHidden();
    _ActorClient2.default.unbindConnectState(_ConnectionStateActionCreators2.default.setState);
    _DraftActionCreators2.default.saveDraft(currentPeer);
  }
};
//# sourceMappingURL=VisibilityActionCreators.js.map