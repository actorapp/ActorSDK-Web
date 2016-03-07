'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var DraftActionCreators = {
  loadDraft: function loadDraft(peer) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DRAFT_LOAD, {
      peer: peer
    });
  },


  saveDraft: (0, _lodash.debounce)(function (draft) {
    var saveNow = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DRAFT_SAVE, { draft: draft, saveNow: saveNow });
  }, 300, { trailing: true })
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */

exports.default = DraftActionCreators;
//# sourceMappingURL=DraftActionCreators.js.map