'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ContactActionCreators = require('./ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

var _history = require('../utils/history');

var _history2 = _interopRequireDefault(_history);

var _PeerUtils = require('../utils/PeerUtils');

var _PeerUtils2 = _interopRequireDefault(_PeerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  open: function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONTACT_ADD_MODAL_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  close: function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONTACT_ADD_MODAL_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  findUsers: function findUsers(query) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.findUsers(query), {
      request: _ActorAppConstants.ActionTypes.CONTACT_FIND,
      success: _ActorAppConstants.ActionTypes.CONTACT_FIND_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.CONTACT_FIND_ERROR
    }, { query: query });
  },
  addToContacts: function addToContacts(uid, isContact) {
    var peer = _ActorClient2.default.getUserPeer(uid);
    if (!isContact) {
      _ContactActionCreators2.default.addContact(uid);
    }
    _history2.default.push('/im/' + _PeerUtils2.default.peerToString(peer));
  }
}; /*
    * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=AddContactActionCreators.js.map