'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  open: function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONTACT_LIST_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  close: function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONTACT_LIST_HIDE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  setContacts: function setContacts(contacts) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONTACT_LIST_CHANGED, { contacts: contacts });
  },
  addContact: function addContact(uid) {
    _ActorClient2.default.addContact(uid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONTACT_ADD, { uid: uid });
  },
  removeContact: function removeContact(uid) {
    _ActorClient2.default.removeContact(uid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONTACT_REMOVE, { uid: uid });
  },
  search: function search(query) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.CONTACT_LIST_SEARCH, { query: query });
  }
};
//# sourceMappingURL=ContactActionCreators.js.map