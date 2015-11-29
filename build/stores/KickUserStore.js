'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CHANGE_EVENT = 'change';

var _group = null,
    _kickUserState = [];

var KickUserStore = (function (_EventEmitter) {
  _inherits(KickUserStore, _EventEmitter);

  function KickUserStore() {
    _classCallCheck(this, KickUserStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(KickUserStore).apply(this, arguments));
  }

  _createClass(KickUserStore, [{
    key: 'emitChange',
    value: function emitChange() {
      this.emit(CHANGE_EVENT);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }, {
    key: 'getKickUserState',
    value: function getKickUserState(uid) {
      return _kickUserState[uid] || _ActorAppConstants.AsyncActionStates.PENDING;
    }
  }, {
    key: 'resetKickUserState',
    value: function resetKickUserState(uid) {
      delete _kickUserState[uid];
    }
  }]);

  return KickUserStore;
})(_events.EventEmitter);

var KickUserStoreInstance = new KickUserStore();

KickUserStoreInstance.dispatchToken = (0, _ActorAppDispatcher.register)(function (action) {
  switch (action.type) {
    case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
      if (action.peer.type === _ActorAppConstants.PeerTypes.GROUP) {
        _group = _ActorClient2.default.getGroup(action.peer.id);
        KickUserStoreInstance.emitChange();
      }
      break;

    case _ActorAppConstants.ActionTypes.KICK_USER:
      _kickUserState[action.uid] = _ActorAppConstants.AsyncActionStates.PROCESSING;
      KickUserStoreInstance.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.KICK_USER_SUCCESS:
      delete _kickUserState[action.uid];
      KickUserStoreInstance.emitChange();
      break;
    case _ActorAppConstants.ActionTypes.KICK_USER_ERROR:
      _kickUserState[action.uid] = _ActorAppConstants.AsyncActionStates.FAILURE;
      KickUserStoreInstance.emitChange();
      break;
  }
});

exports.default = KickUserStoreInstance;