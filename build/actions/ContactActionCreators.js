'use strict';

exports.__esModule = true;

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
    return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.addContact(uid), {
      request: _ActorAppConstants.ActionTypes.CONTACT_ADD,
      success: _ActorAppConstants.ActionTypes.CONTACT_ADD_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.CONTACT_ADD_ERROR
    }, { uid: uid });
  },
  removeContact: function removeContact(uid) {
    return (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.removeContact(uid), {
      request: _ActorAppConstants.ActionTypes.CONTACT_REMOVE,
      success: _ActorAppConstants.ActionTypes.CONTACT_REMOVE_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.CONTACT_REMOVE_ERROR
    }, { uid: uid });
  }
};
//# sourceMappingURL=ContactActionCreators.js.map