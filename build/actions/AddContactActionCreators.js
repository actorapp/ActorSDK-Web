'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ContactActionCreators = require('./ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

var _DialogActionCreators = require('./DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

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
    _DialogActionCreators2.default.selectDialogPeer(peer);
  }
};
//# sourceMappingURL=AddContactActionCreators.js.map