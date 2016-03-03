'use strict';

exports.__esModule = true;

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _EmojiUtils = require('../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

var replaceColons = function replaceColons(text) {
  _EmojiUtils.emoji.change_replace_mode('unified');
  return _EmojiUtils.emoji.replace_colons(text);
};

exports.default = {
  setMessageShown: function setMessageShown(peer, message) {
    _ActorClient2.default.onMessageShown(peer, message);
  },
  sendTextMessage: function sendTextMessage(peer, text) {
    _ActorClient2.default.sendTextMessage(peer, replaceColons(text));
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_TEXT, { peer: peer, text: text });
  },
  sendFileMessage: function sendFileMessage(peer, file) {
    _ActorClient2.default.sendFileMessage(peer, file);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_FILE, { peer: peer, file: file });
  },
  sendPhotoMessage: function sendPhotoMessage(peer, photo) {
    _ActorClient2.default.sendPhotoMessage(peer, photo);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_PHOTO, { peer: peer, photo: photo });
  },
  sendClipboardPhotoMessage: function sendClipboardPhotoMessage(peer, photo) {
    _ActorClient2.default.sendClipboardPhotoMessage(peer, photo);
  },
  sendVoiceMessage: function sendVoiceMessage(peer, duration, voice) {
    _ActorClient2.default.sendVoiceMessage(peer, duration, voice);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_VOICE, { peer: peer, duration: duration, voice: voice });
  },
  deleteMessage: function deleteMessage(peer, rid) {
    _ActorClient2.default.deleteMessage(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_DELETE, { peer: peer, rid: rid });
  },
  addLike: function addLike(peer, rid) {
    _ActorClient2.default.addLike(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_LIKE_ADD, { peer: peer, rid: rid });
  },
  removeLike: function removeLike(peer, rid) {
    _ActorClient2.default.removeLike(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_LIKE_REMOVE, { peer: peer, rid: rid });
  },
  setMessages: function setMessages(messages, overlay, isLoaded) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_CHANGED, { messages: messages, overlay: overlay, isLoaded: isLoaded });
  },
  setSelected: function setSelected(selectedMesages) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_SET_SELECTED, { selectedMesages: selectedMesages });
  }
};
//# sourceMappingURL=MessageActionCreators.js.map