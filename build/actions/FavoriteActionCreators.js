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
  favoriteChat: function favoriteChat(peer) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.favoriteChat(peer), {
      request: _ActorAppConstants.ActionTypes.FAVORITE_ADD,
      success: _ActorAppConstants.ActionTypes.FAVORITE_ADD_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.FAVORITE_ADD_ERROR
    }, { peer: peer });
  },
  unfavoriteChat: function unfavoriteChat(peer) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.unfavoriteChat(peer), {
      request: _ActorAppConstants.ActionTypes.FAVORITE_REMOVE,
      success: _ActorAppConstants.ActionTypes.FAVORITE_REMOVE_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.FAVORITE_REMOVE_ERROR
    }, { peer: peer });
  }
}; /*
    * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=FavoriteActionCreators.js.map