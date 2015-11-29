'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _RouterContainer = require('../utils/RouterContainer');

var _RouterContainer2 = _interopRequireDefault(_RouterContainer);

var _DialogActionCreators = require('./DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlBase = 'https://quit.email'; /*
                                     * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                     */

exports.default = {
  joinGroupViaLink: function joinGroupViaLink(token) {
    var url = urlBase + '/join/' + token;

    var joinViaLink = function joinViaLink() {
      return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.joinGroupViaLink(url), {
        request: _ActorAppConstants.ActionTypes.GROUP_JOIN_VIA_LINK,
        success: _ActorAppConstants.ActionTypes.GROUP_JOIN_VIA_LINK_SUCCESS,
        failure: _ActorAppConstants.ActionTypes.GROUP_JOIN_VIA_LINK_ERROR
      }, { token: token });
    };

    var selectJoined = function selectJoined(peer) {
      return _DialogActionCreators2.default.selectDialogPeer(peer);
    };
    var goHome = function goHome() {
      return _RouterContainer2.default.get().replaceWith('/');
    };

    joinViaLink().then(selectJoined).catch(goHome);
  }
};