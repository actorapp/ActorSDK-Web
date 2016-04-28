'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _JoinGroupStore = require('../stores/JoinGroupStore');

var _JoinGroupStore2 = _interopRequireDefault(_JoinGroupStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function joinSuccess(peer) {
  (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_JOIN_VIA_LINK_SUCCESS);
  setTimeout(function () {
    return _history2.default.replace('/im/' + peer.key);
  }, 1000);
} /*
   * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
   */

function joinFailed(error) {
  (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_JOIN_VIA_LINK_ERROR, { error: error });
}

exports.default = {
  joinAfterLogin: function joinAfterLogin() {
    var _JoinGroupStore$getSt = _JoinGroupStore2.default.getState();

    var token = _JoinGroupStore$getSt.token;

    if (token) {
      _history2.default.push('/join/' + token);
    }
  },
  joinGroupViaLink: function joinGroupViaLink(token) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.GROUP_JOIN_VIA_LINK, { token: token });
    _ActorClient2.default.joinGroupViaToken(token).then(joinSuccess, joinFailed);
  }
};
//# sourceMappingURL=JoinGroupActions.js.map