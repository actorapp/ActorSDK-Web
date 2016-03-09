'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _DraftStore = require('../stores/DraftStore');

var _DraftStore2 = _interopRequireDefault(_DraftStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  loadDraft: function loadDraft(peer) {
    var draft = _ActorClient2.default.loadDraft(peer);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DRAFT_LOAD, { draft: draft });
  },
  saveDraft: function saveDraft(peer) {
    var draft = _DraftStore2.default.getDraft();
    _ActorClient2.default.saveDraft(peer, draft);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DRAFT_SAVE, { draft: draft });
  },


  changeDraft: (0, _lodash.debounce)(function (draft) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DRAFT_CHANGE, { draft: draft });
  }, 300, { trailing: true })
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=DraftActionCreators.js.map