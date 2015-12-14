'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _DraftActionCreators = require('./DraftActionCreators');

var _DraftActionCreators2 = _interopRequireDefault(_DraftActionCreators);

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

exports.default = {
  cleanText: function cleanText() {
    _DraftActionCreators2.default.saveDraft('', true);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.COMPOSE_CLEAN);
  },
  insertMention: function insertMention(peer, text, caretPosition, mention) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.COMPOSE_MENTION_INSERT, { peer: peer, text: text, caretPosition: caretPosition, mention: mention });
  },
  closeMention: function closeMention() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.COMPOSE_MENTION_CLOSE);
  },
  onTyping: function onTyping(peer, text, caretPosition) {
    if (text !== '') {
      _ActorClient2.default.onTyping(peer);
    }

    _DraftActionCreators2.default.saveDraft(text);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.COMPOSE_TYPING, { peer: peer, text: text, caretPosition: caretPosition });
  }
};
//# sourceMappingURL=ComposeActionCreators.js.map