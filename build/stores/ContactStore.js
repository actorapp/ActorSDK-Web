'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _events = require('events');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ContactActionCreators = require('../actions/ContactActionCreators');

var _ContactActionCreators2 = _interopRequireDefault(_ContactActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTACTS_CHANGE_EVENT = 'contacts_change'; /*
                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                */

var _contacts = [];
var _isContactsOpen = false;

var ContactStore = (0, _objectAssign2.default)({}, _events.EventEmitter.prototype, {
  emitChange: function emitChange() {
    this.emit(CONTACTS_CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CONTACTS_CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CONTACTS_CHANGE_EVENT, callback);
  },

  getContacts: function getContacts() {
    return _contacts;
  },

  isContactsOpen: function isContactsOpen() {
    return _isContactsOpen;
  }
});

ContactStore.dispatchToken = (0, _ActorAppDispatcher.register)(function (action) {
  switch (action.type) {
    case _ActorAppConstants.ActionTypes.CONTACT_LIST_SHOW:
      _isContactsOpen = true;
      ContactStore.emitChange();
      break;

    case _ActorAppConstants.ActionTypes.CONTACT_LIST_HIDE:
      _isContactsOpen = false;
      ContactStore.emitChange();
      break;

    case _ActorAppConstants.ActionTypes.CONTACT_LIST_CHANGED:
      // Remove current user from contacts list
      _contacts = (0, _lodash.filter)(action.contacts, function (contact) {
        if (contact.uid != _ActorClient2.default.getUid()) {
          return contact;
        }
      });
      ContactStore.emitChange();
      break;

    case _ActorAppConstants.ActionTypes.CONTACT_ADD:
    case _ActorAppConstants.ActionTypes.CONTACT_REMOVE:
      ContactStore.emitChange();
      break;
    default:
  }
});

exports.default = ContactStore;