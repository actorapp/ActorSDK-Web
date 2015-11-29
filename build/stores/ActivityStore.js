'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _DialogStore = require('./DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

var _events = require('events');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var CHANGE_EVENT = 'change';

var _isOpen = false,
    _activity = null;

var ActivityStore = (0, _objectAssign2.default)({}, _events.EventEmitter.prototype, {
  getActivity: function getActivity() {
    return _activity;
  },
  isOpen: function isOpen() {
    return _isOpen;
  },
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// TODO: move bindings ot action creators
var _cleanup = function _cleanup() {};

var _setActivityFromPeer = function _setActivityFromPeer() {
  _cleanup();

  var peer = _DialogStore2.default.getSelectedDialogPeer();
  switch (peer.type) {
    case _ActorAppConstants.PeerTypes.USER:
      {
        (function () {
          var change = function change(user) {
            _activity = {
              type: _ActorAppConstants.ActivityTypes.USER_PROFILE,
              user: user
            };

            ActivityStore.emitChange();
          };

          _cleanup = function () {
            _ActorClient2.default.unbindUser(peer.id, change);
          };

          _ActorClient2.default.bindUser(peer.id, change);
        })();
      }
      break;
    case _ActorAppConstants.PeerTypes.GROUP:
      {
        (function () {
          var change = function change(group) {
            _activity = {
              type: _ActorAppConstants.ActivityTypes.GROUP_PROFILE,
              group: group
            };

            ActivityStore.emitChange();
          };

          _cleanup = function () {
            _ActorClient2.default.unbindGroup(peer.id, change);
          };

          _ActorClient2.default.bindGroup(peer.id, change);
        })();
      }
      break;
    default:
      return;
  }
};

ActivityStore.dispatchToken = _ActorAppDispatcher2.default.register(function (action) {
  switch (action.type) {
    case _ActorAppConstants.ActionTypes.ACTIVITY_HIDE:
      _isOpen = false;
      ActivityStore.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.ACTIVITY_SHOW:
      _isOpen = true;
      ActivityStore.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
      _ActorAppDispatcher2.default.waitFor([_DialogStore2.default.dispatchToken]);
      _setActivityFromPeer();
      ActivityStore.emitChange();
      break;
    default:
      return;
  }
});

exports.default = ActivityStore;