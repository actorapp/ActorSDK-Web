'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _DialogActionCreators = require('../actions/DialogActionCreators');

var _DialogActionCreators2 = _interopRequireDefault(_DialogActionCreators);

var _GroupProfileActionCreators = require('../actions/GroupProfileActionCreators');

var _GroupProfileActionCreators2 = _interopRequireDefault(_GroupProfileActionCreators);

var _events = require('events');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Do not use actions in stores

var CHANGE_EVENT = 'change',
    SELECT_EVENT = 'select',
    SELECTED_CHANGE_EVENT = 'selected_change',
    TYPING_EVENT = 'typing',
    NOTIFICATION_CHANGE_EVENT = 'notification_change'; /*
                                                        * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                        */

var _dialogs = [],
    _selectedDialogPeer = null,
    _selectedDialogInfo = null,
    _selectedDialogTyping = null,
    _currentPeer = null,
    _lastPeer = null;

var DialogStore = (0, _objectAssign2.default)({}, _events.EventEmitter.prototype, {
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitSelect: function emitSelect() {
    this.emit(SELECT_EVENT);
  },

  addSelectListener: function addSelectListener(callback) {
    this.on(SELECT_EVENT, callback);
  },

  removeSelectListener: function removeSelectListener(callback) {
    this.removeListener(SELECT_EVENT, callback);
  },

  emitSelectedChange: function emitSelectedChange() {
    this.emit(SELECTED_CHANGE_EVENT);
  },

  addSelectedChangeListener: function addSelectedChangeListener(callback) {
    this.on(SELECTED_CHANGE_EVENT, callback);
  },

  removeSelectedChangeListener: function removeSelectedChangeListener(callback) {
    this.removeListener(SELECTED_CHANGE_EVENT, callback);
  },

  emitTyping: function emitTyping() {
    this.emit(TYPING_EVENT);
  },

  addTypingListener: function addTypingListener(callback) {
    this.on(TYPING_EVENT, callback);
  },

  removeTypingListener: function removeTypingListener(callback) {
    this.removeListener(TYPING_EVENT, callback);
  },

  getSelectedDialogInfo: function getSelectedDialogInfo() {
    return _selectedDialogInfo;
  },

  getSelectedDialogPeer: function getSelectedDialogPeer() {
    return _selectedDialogPeer;
  },

  getSelectedDialogTyping: function getSelectedDialogTyping() {
    return _selectedDialogTyping;
  },

  getAll: function getAll() {
    return _dialogs;
  },

  // Notifications settings
  isNotificationsEnabled: function isNotificationsEnabled(peer) {
    return _ActorClient2.default.isNotificationsEnabled(peer);
  },

  emitNotificationChange: function emitNotificationChange() {
    this.emit(NOTIFICATION_CHANGE_EVENT);
  },
  addNotificationsListener: function addNotificationsListener(callback) {
    this.on(NOTIFICATION_CHANGE_EVENT, callback);
  },
  removeNotificationsListener: function removeNotificationsListener(callback) {
    this.removeListener(NOTIFICATION_CHANGE_EVENT, callback);
  },
  getLastPeer: function getLastPeer() {
    return _lastPeer;
  },
  isGroupMember: function isGroupMember(group) {
    return group.members.length > 0;
  },
  getCurrentPeer: function getCurrentPeer() {
    return _currentPeer;
  }
});

var onCurrentDialogInfoChange = function onCurrentDialogInfoChange(info) {
  _selectedDialogInfo = info;
  _DialogActionCreators2.default.createSelectedDialogInfoChanged(info);
};

var bindDialogInfo = function bindDialogInfo(peer) {
  switch (peer.type) {
    case _ActorAppConstants.PeerTypes.USER:
      _ActorClient2.default.bindUser(peer.id, onCurrentDialogInfoChange);
      break;
    case _ActorAppConstants.PeerTypes.GROUP:
      _ActorClient2.default.bindGroup(peer.id, onCurrentDialogInfoChange);
      break;
    default:
  }
};

var unbindCurrentDialogInfo = function unbindCurrentDialogInfo() {
  if (_currentPeer != null) {
    switch (_currentPeer.type) {
      case _ActorAppConstants.PeerTypes.USER:
        _ActorClient2.default.unbindUser(_currentPeer.id, onCurrentDialogInfoChange);
        break;
      case _ActorAppConstants.PeerTypes.GROUP:
        _ActorClient2.default.unbindGroup(_currentPeer.id, onCurrentDialogInfoChange);
        break;
      default:

    }
  }
};

var onCurrentDialogTypingChange = function onCurrentDialogTypingChange(typing) {
  _selectedDialogTyping = typing.typing;
  DialogStore.emitTyping();
};

var bindDialogTyping = function bindDialogTyping(peer) {
  _ActorClient2.default.bindTyping(peer, onCurrentDialogTypingChange);
};

var unbindCurrentDialogTyping = function unbindCurrentDialogTyping() {
  if (_currentPeer != null) {
    _ActorClient2.default.unbindTyping(_currentPeer, onCurrentDialogTypingChange);
  }
};

DialogStore.dispatchToken = _ActorAppDispatcher2.default.register(function (action) {
  switch (action.type) {
    case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
      unbindCurrentDialogInfo();
      unbindCurrentDialogTyping();

      _lastPeer = _currentPeer;
      _selectedDialogPeer = action.peer;
      _currentPeer = action.peer;

      // crutch check for membership
      // TODO: need method for membership check
      if (action.peer.type === _ActorAppConstants.PeerTypes.GROUP) {
        (function () {
          var group = _ActorClient2.default.getGroup(action.peer.id);
          setTimeout(function () {
            if (DialogStore.isGroupMember(group)) {
              bindDialogTyping(action.peer);
            }
            bindDialogInfo(action.peer);
          }, 0);
        })();
      } else {
        setTimeout(function () {
          bindDialogTyping(action.peer);
          bindDialogInfo(action.peer);
        }, 0);
      }
      // end crutch check for membership

      DialogStore.emitSelect();
      break;
    case _ActorAppConstants.ActionTypes.SELECTED_DIALOG_INFO_CHANGED:
      _selectedDialogInfo = action.info;
      DialogStore.emitSelectedChange();
      break;
    case _ActorAppConstants.ActionTypes.DIALOGS_CHANGED:
      _dialogs = action.dialogs;
      DialogStore.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.NOTIFICATION_CHANGE:
      _ActorClient2.default.changeNotificationsEnabled(action.peer, action.isEnabled);
      DialogStore.emitNotificationChange();
      break;
    default:

  }
});

exports.default = DialogStore;