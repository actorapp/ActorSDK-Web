'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  open: function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.EMOJI_SHOW);
  },
  close: function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.EMOJI_CLOSE);
  },
  insertEmoji: function insertEmoji(text, caretPosition, emoji) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.EMOJI_INSERT, { text: text, caretPosition: caretPosition, emoji: emoji });
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=EmojiActionCreators.js.map