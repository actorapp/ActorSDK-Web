'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppDispatcher2 = _interopRequireDefault(_ActorAppDispatcher);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _DialogStore = require('./DialogStore');

var _DialogStore2 = _interopRequireDefault(_DialogStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var DRAFT_LOAD_EVENT = 'draft_load';

var _draft = null;

var DraftStore = (0, _objectAssign2.default)({}, _events.EventEmitter.prototype, {
  emitLoadDraft: function emitLoadDraft() {
    this.emit(DRAFT_LOAD_EVENT);
  },
  addLoadDraftListener: function addLoadDraftListener(callback) {
    this.on(DRAFT_LOAD_EVENT, callback);
  },
  removeLoadDraftListener: function removeLoadDraftListener(callback) {
    this.removeListener(DRAFT_LOAD_EVENT, callback);
  },
  getDraft: function getDraft() {
    return _draft;
  }
});

DraftStore.dispatchToken = _ActorAppDispatcher2.default.register(function (action) {
  switch (action.type) {
    case _ActorAppConstants.ActionTypes.DRAFT_LOAD:
      _draft = _ActorClient2.default.loadDraft(action.peer);
      DraftStore.emitLoadDraft();
      break;

    case _ActorAppConstants.ActionTypes.DRAFT_SAVE:
      _draft = action.draft;
      if (action.saveNow) {
        var peer = _DialogStore2.default.getSelectedDialogPeer();
        _ActorClient2.default.saveDraft(peer, _draft);
      }
      break;

    case _ActorAppConstants.ActionTypes.SELECT_DIALOG_PEER:
      if (_draft !== null) {
        var lastPeer = _DialogStore2.default.getLastPeer();
        _ActorClient2.default.saveDraft(lastPeer, _draft);
      }
      _draft = _ActorClient2.default.loadDraft(action.peer);
      DraftStore.emitLoadDraft();
      break;

    default:
  }
});

exports.default = DraftStore;