'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _EmojiUtils = require('../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                           */

var replaceColons = function replaceColons(text) {
  _EmojiUtils.emoji.change_replace_mode('unified');
  return _EmojiUtils.emoji.replace_colons(text);
};

var MessageActionCreators = function () {
  function MessageActionCreators() {
    _classCallCheck(this, MessageActionCreators);

    this.setMessages = (0, _lodash.debounce)(this.setMessages, 10, { maxWait: 50, leading: true });
  }

  MessageActionCreators.prototype.setMessageShown = function setMessageShown(peer, message) {
    _ActorClient2.default.onMessageShown(peer, message);
  };

  MessageActionCreators.prototype.sendTextMessage = function sendTextMessage(peer, text) {
    _ActorClient2.default.sendTextMessage(peer, replaceColons(text));
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_TEXT, { peer: peer, text: text });
  };

  MessageActionCreators.prototype.sendFileMessage = function sendFileMessage(peer, file) {
    _ActorClient2.default.sendFileMessage(peer, file);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_FILE, { peer: peer, file: file });
  };

  MessageActionCreators.prototype.sendPhotoMessage = function sendPhotoMessage(peer, photo) {
    _ActorClient2.default.sendPhotoMessage(peer, photo);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_PHOTO, { peer: peer, photo: photo });
  };

  // Deprecated


  MessageActionCreators.prototype.sendClipboardPhotoMessage = function sendClipboardPhotoMessage(peer, photo) {
    _ActorClient2.default.sendClipboardPhotoMessage(peer, photo);
  };

  MessageActionCreators.prototype.sendVoiceMessage = function sendVoiceMessage(peer, duration, voice) {
    _ActorClient2.default.sendVoiceMessage(peer, duration, voice);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_VOICE, { peer: peer, duration: duration, voice: voice });
  };

  MessageActionCreators.prototype.deleteMessage = function deleteMessage(peer, rid) {
    _ActorClient2.default.deleteMessage(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_DELETE, { peer: peer, rid: rid });
  };

  MessageActionCreators.prototype.addLike = function addLike(peer, rid) {
    _ActorClient2.default.addLike(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_LIKE_ADD, { peer: peer, rid: rid });
  };

  MessageActionCreators.prototype.removeLike = function removeLike(peer, rid) {
    _ActorClient2.default.removeLike(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_LIKE_REMOVE, { peer: peer, rid: rid });
  };

  MessageActionCreators.prototype.setMessages = function setMessages(messages, overlay, isLoaded, receiveDate, readDate) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_CHANGED, {
      messages: messages,
      overlay: overlay,
      isLoaded: isLoaded,
      receiveDate: receiveDate,
      readDate: readDate
    });
  };

  MessageActionCreators.prototype.toggleSelected = function toggleSelected(id) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_TOGGLE_SELECTED, { id: id });
  };

  return MessageActionCreators;
}();

exports.default = new MessageActionCreators();
//# sourceMappingURL=MessageActionCreators.js.map