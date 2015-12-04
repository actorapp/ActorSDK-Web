'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorAppConstants2 = _interopRequireDefault(_ActorAppConstants);

var _DialogStore = require('./DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _events = require('events');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var ActionTypes = _ActorAppConstants2.default.ActionTypes;

var CHANGE_EVENT = 'change';

var _messages = [];
var _boundPeer = null;

var MessageStore = (0, _objectAssign2.default)({}, _events.EventEmitter.prototype, {
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function getAll() {
    return _messages;
  }
});

var _bindMessages = function _bindMessages(messages) {
  _messages = messages;
  MessageStore.emitChange();
};

MessageStore.dispatchToken = _ActorAppDispatcher2.default.register(function (action) {
  switch (action.type) {
    case ActionTypes.SELECT_DIALOG_PEER:
      if (_boundPeer != null) {
        _ActorClient2.default.unbindChat(_boundPeer, _bindMessages);
      }

      _ActorAppDispatcher2.default.waitFor([_DialogStore2.default.dispatchToken]);

      _boundPeer = action.peer;

      _ActorClient2.default.bindChat(action.peer, _bindMessages);

      break;
    default:

  }
});

exports.default = MessageStore;
//# sourceMappingURL=MessageStore.js.map