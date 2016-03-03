'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  archiveChat: function archiveChat(peer) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.archiveChat(peer), {
      request: _ActorAppConstants.ActionTypes.ARCHIVE_ADD,
      success: _ActorAppConstants.ActionTypes.ARCHIVE_ADD_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.ARCHIVE_ADD_ERROR
    }, { peer: peer });
  },
  loadArchivedDialogs: function loadArchivedDialogs() {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.loadArchivedDialogs(), {
      request: _ActorAppConstants.ActionTypes.ARCHIVE_LOAD,
      success: _ActorAppConstants.ActionTypes.ARCHIVE_LOAD_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.ARCHIVE_LOAD_ERROR
    });
  },
  loadMoreArchivedDialogs: function loadMoreArchivedDialogs() {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.loadMoreArchivedDialogs(), {
      request: _ActorAppConstants.ActionTypes.ARCHIVE_LOAD_MORE,
      success: _ActorAppConstants.ActionTypes.ARCHIVE_LOAD_MORE_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.ARCHIVE_LOAD_MORE_ERROR
    });
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=ArchiveActionCreators.js.map