'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ComposeActionCreators = require('../actions/ComposeActionCreators');

var _ComposeActionCreators2 = _interopRequireDefault(_ComposeActionCreators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  open: function open() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.EMOJI_SHOW);
    _ComposeActionCreators2.default.toggleAutoFocus(false);
  },
  close: function close() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.EMOJI_CLOSE);
    _ComposeActionCreators2.default.toggleAutoFocus(true);
  },
  insertEmoji: function insertEmoji(text, caretPosition, emoji) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.EMOJI_INSERT, { text: text, caretPosition: caretPosition, emoji: emoji });
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */
//# sourceMappingURL=EmojiActionCreators.js.map