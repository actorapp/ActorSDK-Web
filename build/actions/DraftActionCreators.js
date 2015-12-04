'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var DraftActionCreators = {
  loadDraft: function loadDraft(peer) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DRAFT_LOAD, {
      peer: peer
    });
  },
  saveDraft: function saveDraft(draft) {
    var saveNow = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.DRAFT_SAVE, {
      draft: draft, saveNow: saveNow
    });
  }
};

exports.default = DraftActionCreators;
//# sourceMappingURL=DraftActionCreators.js.map