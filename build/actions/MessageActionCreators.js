'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _MessageUtils = require('../utils/MessageUtils');

var _MessageStore = require('../stores/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                           */

var MessageActionCreators = function () {
  function MessageActionCreators() {
    _classCallCheck(this, MessageActionCreators);

    this.setMessages = (0, _lodash.throttle)(this.setMessages, 10);
  }

  MessageActionCreators.prototype.setMessageShown = function setMessageShown(peer, message) {
    _ActorClient2.default.onMessageShown(peer, message);
  };

  MessageActionCreators.prototype.sendTextMessage = function sendTextMessage(peer, text) {
    _ActorClient2.default.sendTextMessage(peer, (0, _MessageUtils.prepareTextMessage)(text));
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_TEXT, { peer: peer, text: text });
  };

  MessageActionCreators.prototype.editTextMessage = function editTextMessage(peer, rid, text) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_EDIT_END);
    _ActorClient2.default.editMessage(peer, rid, text).catch(function (e) {
      console.error(e);
    });
  };

  MessageActionCreators.prototype.deleteMessage = function deleteMessage(peer, rid) {
    _ActorClient2.default.deleteMessage(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_DELETE, { peer: peer, rid: rid });
  };

  MessageActionCreators.prototype.sendFileMessage = function sendFileMessage(peer, file) {
    _ActorClient2.default.sendFileMessage(peer, file);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_FILE, { peer: peer, file: file });
  };

  MessageActionCreators.prototype.sendPhotoMessage = function sendPhotoMessage(peer, photo) {
    _ActorClient2.default.sendPhotoMessage(peer, photo);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_PHOTO, { peer: peer, photo: photo });
  };

  MessageActionCreators.prototype.sendAnimationMessage = function sendAnimationMessage(peer, file) {
    _ActorClient2.default.sendAnimationMessage(peer, file);
  };

  // Deprecated


  MessageActionCreators.prototype.sendClipboardPhotoMessage = function sendClipboardPhotoMessage(peer, photo) {
    _ActorClient2.default.sendClipboardPhotoMessage(peer, photo);
  };

  MessageActionCreators.prototype.sendVoiceMessage = function sendVoiceMessage(peer, duration, voice) {
    _ActorClient2.default.sendVoiceMessage(peer, duration, voice);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_SEND_VOICE, { peer: peer, duration: duration, voice: voice });
  };

  MessageActionCreators.prototype.addLike = function addLike(peer, rid) {
    _ActorClient2.default.addLike(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_LIKE_ADD, { peer: peer, rid: rid });
  };

  MessageActionCreators.prototype.removeLike = function removeLike(peer, rid) {
    _ActorClient2.default.removeLike(peer, rid);
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGE_LIKE_REMOVE, { peer: peer, rid: rid });
  };

  MessageActionCreators.prototype.setMessages = function setMessages(messages, overlay, isLoaded, receiveDate, readDate, readByMeDate) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_CHANGED, {
      messages: messages,
      overlay: overlay,
      isLoaded: isLoaded,
      receiveDate: receiveDate,
      readDate: readDate,
      readByMeDate: readByMeDate
    });
  };

  MessageActionCreators.prototype.toggleSelected = function toggleSelected(id) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_TOGGLE_SELECTED, { id: id });
  };

  MessageActionCreators.prototype.startEditMessage = function startEditMessage(message) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MESSAGES_EDIT_START, { message: message });
  };

  MessageActionCreators.prototype.editLastMessage = function editLastMessage() {
    var uid = _ActorClient2.default.getUid();

    var _MessageStore$getStat = _MessageStore2.default.getState();

    var messages = _MessageStore$getStat.messages;

    var message = (0, _MessageUtils.findLastEditableMessage)(messages, uid);

    if (message) {
      this.startEditMessage(message);
    }
  };

  return MessageActionCreators;
}();

exports.default = new MessageActionCreators();
//# sourceMappingURL=MessageActionCreators.js.map